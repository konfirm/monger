import type { Point } from '@konfirm/geojson';
import { isObject, render } from '../../../BSON';
import { isLegacyPoint, legacyToGeoJSON } from './Legacy';

// $near/$nearSphere's `$geometry` argument parsing is not one clean rule —
// MongoDB has (at least) three separate code paths depending on whether the
// value looks like an array, an object with a `type` key, or an object with
// only a `coordinates` key, and each path fails in its own specific way.
// These branches are MongoDB's actual, confirmed behavior — verified via
// mongo-catalog's geoNearMatrix catalog (real MongoDB 8.3.11 ground truth)
// plus direct docker verification against a live MongoDB 8.2.9 instance,
// 2026-09-18/19 — not a derived approximation. See
// plans/geospatial-completeness.md for the session notes.
//
// Every branch below traces to a specific confirmed input/output pair
// *except* array-form `coordinates` under a `type`/`coordinates` key with
// length > 3, which reuses the "must only contain two numeric elements"
// wording confirmed for the bare-array path, by strong analogy — the exact
// phrase repeats verbatim across otherwise-unrelated call sites (the
// bare-array path and the numeric-`type` legacy-object-fallback path both
// produce it), strongly suggesting one shared low-level validator, but the
// length>3-under-a-coordinates-key case itself was not directly collected.
//
// The value each message echoes back is rendered via BSON.ts's render(),
// matching MongoDB's own BSON debug-print format byte-for-byte (confirmed
// against all collected ground truth) rather than plain JSON. Note the
// explicit `true` (topLevelArrayAsObject): confirmed for this specific
// $geometry-echoing context, not assumed to be render()'s general default.

// confirmed: Feature/FeatureCollection are *not* recognized GeoJSON type
// names here — they report "but got type unknown" too, same as a
// genuinely made-up string. MongoDB's geo indexing only knows the pure
// Geometry types; Feature/FeatureCollection are GeoJSON wrapper types, not
// geometries, so they never even enter this enum.
const KNOWN_GEOJSON_TYPES = [
	'Point',
	'LineString',
	'Polygon',
	'MultiPoint',
	'MultiLineString',
	'MultiPolygon',
	'GeometryCollection',
];

function isFiniteNumber(value: unknown): value is number {
	return typeof value === 'number' && Number.isFinite(value);
}

function bsonTypeName(value: unknown): string {
	if (value === undefined) {
		return 'missing';
	}
	if (value === null) {
		return 'null';
	}
	if (Array.isArray(value)) {
		return 'array';
	}
	if (isObject(value)) {
		return 'object';
	}
	return typeof value;
}

// Two-pass, index-ordered check confirmed against every malformed-array
// case collected: first pass rejects on the first (index 0, then index 1)
// element that either doesn't exist or isn't typeof 'number'; only once
// both elements pass that does a second pass check finiteness. This
// ordering is what makes e.g. `[5.9]` ("...instead got type missing", index
// 1 doesn't exist) and `[[5.9, 52]]` ("...instead got type array", index 0
// itself is an array) produce different messages despite both having
// length 1.
// Takes explicit position-0/position-1 values (not an array + indices) so
// it works identically for a real array's [0]/[1] elements *and* an
// object's positional-lookup fallback (obj['0']/obj['1']) below — both are
// confirmed to fail the same way, including out-of-bounds/missing keys
// naturally producing `undefined` for either.
function invalidPositionElements($geometry: unknown, element0: unknown, element1: unknown): never {
	for (const element of [element0, element1]) {
		if (typeof element !== 'number') {
			throw new Error(
				`invalid point in geo near query $geometry argument: ${render($geometry, true)}  Point must only contain numeric elements, instead got type ${bsonTypeName(element)}`,
			);
		}
	}
	if (!Number.isFinite(element0 as number) || !Number.isFinite(element1 as number)) {
		throw new Error(
			`invalid point in geo near query $geometry argument: ${render($geometry, true)}  Point coordinates must be finite numbers`,
		);
	}
	throw new Error(
		`invalid point in geo near query $geometry argument: ${render($geometry, true)}  Point must only contain two numeric elements`,
	);
}

// Validates a value already known to specifically be a coordinate-position
// attempt (reached via a `coordinates` key, or `type: 'Point'`) — never
// falls back to the ambiguous "requires geojson point" rejection below,
// only ever a specific structural reason. Confirmed to accept both array
// ([lng, lat] or [lng, lat, altitude]) and numeric-object ({x, y}) legacy
// forms identically, regardless of whether `type` was present.
function position($geometry: unknown, value: unknown): Point['coordinates'] {
	if (isLegacyPoint(value)) {
		return (legacyToGeoJSON(value) as Point).coordinates;
	}
	if (!Array.isArray(value)) {
		throw new Error(
			`invalid point in geo near query $geometry argument: ${render($geometry, true)}  Point must be an array or object, instead got type ${bsonTypeName(value)}`,
		);
	}
	// confirmed: index-by-index, not length-first — a length-1 array whose
	// single element is itself non-numeric (e.g. a nested array) reports
	// *that element's* type, not "missing"; only an actually-absent index
	// reports "missing". value[0]/value[1] are `undefined` when
	// out-of-bounds, which invalidPositionElements already treats as
	// "missing" via bsonTypeName.
	return invalidPositionElements($geometry, value[0], value[1]);
}

/**
 * Resolves $near/$nearSphere's `$geometry` argument to a GeoJSON Point,
 * throwing MongoDB's own confirmed error text when it can't.
 */
export function resolveNearGeometry($geometry: unknown): Point {
	// confirmed: this specific message always says "$near", literally,
	// even when reached from $nearSphere — the two operators clearly share
	// one internal validator that doesn't know which one called it.
	const notGeoJSON = (): never => {
		throw new Error(`$near requires geojson point, given ${render($geometry, true)}`);
	};

	if (Array.isArray($geometry)) {
		if ($geometry.length === 2 && $geometry.every(isFiniteNumber)) {
			// a bare array that's *exactly* shaped like a legacy point is
			// recognized as one — and rejected specifically for that, not
			// treated as a malformed-shape structural failure.
			return notGeoJSON();
		}
		if ($geometry.length > 2) {
			throw new Error(
				`invalid point in geo near query $geometry argument: ${render($geometry, true)}  Point must only contain two numeric elements`,
			);
		}
		return { type: 'Point', coordinates: invalidPositionElements($geometry, $geometry[0], $geometry[1]) };
	}

	if (!isObject($geometry)) {
		return notGeoJSON();
	}

	const obj = $geometry as Record<string, unknown>;

	if ('type' in obj) {
		const type = obj.type;

		if (typeof type === 'string') {
			if (type !== 'Point') {
				throw new Error(
					`invalid point in geo near query $geometry argument: ${render($geometry, true)}  Expected geojson geometry with type Point, but got type ${KNOWN_GEOJSON_TYPES.includes(type) ? type : 'unknown'}`,
				);
			}
			if (!('coordinates' in obj)) {
				throw new Error(
					`invalid point in geo near query $geometry argument: ${render($geometry, true)}  Point must be an array or object, instead got type missing`,
				);
			}
			return { type: 'Point', coordinates: position($geometry, obj.coordinates) };
		}

		if (typeof type === 'number') {
			// confirmed: a numeric `type` isn't recognized as an attempted
			// GeoJSON type string at all — MongoDB instead treats the whole
			// object as a legacy-point-object candidate, walking its own
			// field values in declaration order.
			const values = Object.values(obj);
			if (values.length === 2 && values.every(isFiniteNumber)) {
				return notGeoJSON();
			}
			const nonNumeric = values.find((value) => !isFiniteNumber(value));
			throw new Error(
				`invalid point in geo near query $geometry argument: ${render($geometry, true)}  Point must only contain numeric elements, instead got type ${bsonTypeName(nonNumeric)}`,
			);
		}

		// type present but neither a string nor a number (null, boolean,
		// array, object) — never recognized as an attempted type name.
		throw new Error(
			`invalid point in geo near query $geometry argument: ${render($geometry, true)}  Expected geojson geometry with type Point, but got type unknown`,
		);
	}

	if ('coordinates' in obj) {
		return { type: 'Point', coordinates: position($geometry, obj.coordinates) };
	}

	// neither `type` nor `coordinates` present. Confirmed: not simply "no
	// coordinates key -> requires geojson point" — an object whose own
	// values, by *position* (not key name — {x,y}/{lon,lat}/{a,b} all
	// behave identically), are exactly two finite numbers is recognized
	// as an attempted legacy point and rejected for that specifically.
	//
	// Otherwise there's a confirmed asymmetry unique to this branch (the
	// array and `coordinates`-nested paths above don't have it): position
	// 0 failing to be a number — including not existing at all, confirmed
	// identical for `{}`, `{foo:'bar'}` (string), and
	// `{notCoordinates:[...]}` (array) — *always* reports the fixed
	// "must be an array or object, instead got type missing", regardless
	// of what position 0 actually is. Only position 1 failing reports its
	// real type.
	const values = Object.values(obj);
	if (values.length === 2 && values.every(isFiniteNumber)) {
		return notGeoJSON();
	}
	if (typeof values[0] !== 'number') {
		throw new Error(
			`invalid point in geo near query $geometry argument: ${render($geometry, true)}  Point must be an array or object, instead got type missing`,
		);
	}
	if (typeof values[1] !== 'number') {
		throw new Error(
			`invalid point in geo near query $geometry argument: ${render($geometry, true)}  Point must only contain numeric elements, instead got type ${bsonTypeName(values[1])}`,
		);
	}
	throw new Error(
		`invalid point in geo near query $geometry argument: ${render($geometry, true)}  Point coordinates must be finite numbers`,
	);
}
