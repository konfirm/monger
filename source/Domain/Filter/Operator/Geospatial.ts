import {
	type GeoJSON,
	intersect,
	isGeoJSON,
	isLineString,
	isPoint,
	isPolygon,
	type Point,
} from "@konfirm/geojson";
import type { CompileContext, CompileStep, Evaluator } from "../Compiler";
import { isObject, render } from "../../BSON";
import {
	cartesianDegrees,
	haversine,
	MONGO_SPHERE_RADIUS,
} from "./Geospatial/Distance";
import {
	isLegacy,
	isLegacyPoint,
	type LegacyPoint,
	legacyToGeoJSON,
} from "./Geospatial/Legacy";
import { resolveNearGeometry } from "./Geospatial/NearGeometry";
import { type GeoWithinQuery, within } from "./Geospatial/Within";

type GeoIntersectsQuery = {
	$geometry: GeoJSON;
};

type NearGeoJSONPoint = {
	$geometry: Point;
	$maxDistance?: number;
	$minDistance?: number;
};
type LegacyNearPointContext = { $near: LegacyPoint } & Omit<
	NearGeoJSONPoint,
	"$geometry"
>;
type LegacyNearSpherePointContext = { $nearSphere: LegacyPoint } & Omit<
	NearGeoJSONPoint,
	"$geometry"
>;
type NearQuery = NearGeoJSONPoint | LegacyPoint;

export type Operation = {
	$geoIntersects: Parameters<typeof $geoIntersects>[0];
	$geoWithin: Parameters<typeof $geoWithin>[0];
	$near: Parameters<typeof $near>[0];
	$nearSphere: Parameters<typeof $nearSphere>[0];
};

function between({
	$minDistance,
	$maxDistance,
}: NearGeoJSONPoint | LegacyNearPointContext): (n: number) => boolean {
	// confirmed via mongo-catalog ground truth (geoNearMatrix, 2026-09-18):
	// negative and non-numeric $minDistance/$maxDistance are rejected by
	// real MongoDB; zero and min > max are not errors (the latter just
	// yields no matches, which the comparison below already does for free).
	([
		['$minDistance', $minDistance],
		['$maxDistance', $maxDistance],
	] as const).forEach(([key, value]) => {
		if (value === undefined) {
			return;
		}
		if (typeof value !== 'number' || Number.isNaN(value)) {
			throw new Error(`${key} must be a number`);
		}
		if (value < 0) {
			throw new Error(`${key} must be non-negative`);
		}
	});

	const min = $minDistance ?? -Infinity;
	const max = $maxDistance ?? Infinity;

	return (n: number): boolean => n >= min && n <= max;
}

/**
 * Selects geometries that intersect with a GeoJSON geometry.
 *
 * @param {GeoIntersectsQuery} { $geometry }
 * @return {*}  {Evaluator}
 */
export function $geoIntersects({ $geometry }: GeoIntersectsQuery): Evaluator {
	if (!isGeoJSON($geometry)) {
		throw new Error(
			`Can't canonicalize query: BadValue bad geo query: { $geoIntersects: ${JSON.stringify($geometry)}`,
		);
	}

	// confirmed via mongo-catalog ground truth (geoWithinIntersectsMatrix,
	// 2026-09-22): real MongoDB matches a legacy-shaped field against
	// $geoIntersects's GeoJSON $geometry too — mirrors $geoWithin's
	// $geometry/$centerSphere dual-shape pattern.
	return (input: any) =>
		(isGeoJSON(input) && intersect(input, $geometry)) ||
		(isLegacy(input) && intersect(legacyToGeoJSON(input), $geometry));
}

/**
 * Selects geometries within a bounding GeoJSON geometry.
 *
 * @param {GeoWithinQuery} query
 * @return {*}  {Evaluator}
 */
export function $geoWithin(query: GeoWithinQuery): Evaluator {
	return within(query);
}

/**
 * Returns geospatial objects in proximity to a point.
 *
 * @param {NearQuery} query
 * @param {CompileStep} compile
 * @param {CompileContext} context
 * @return {*}  {Evaluator}
 */
export function $near(
	query: NearQuery,
	compile: CompileStep,
	context: CompileContext,
): Evaluator {
	if (isLegacyPoint(query)) {
		const { $near: _, ...rest } = <LegacyNearPointContext>context.query;
		const bound = between(<NearGeoJSONPoint>rest);
		const { coordinates: origin } = <Point>legacyToGeoJSON(query);

		return (input: unknown) =>
			(isPoint(input) || isLegacyPoint(input)) &&
			bound(
				cartesianDegrees(
					origin,
					isPoint(input)
						? input.coordinates
						: (<Point>legacyToGeoJSON(input)).coordinates,
				),
			);
	}

	// confirmed via mongo-catalog ground truth (geoNearMatrix, 2026-09-18):
	// a literal `null` gets its own distinct message, unrelated to the
	// $geometry-argument family below.
	if (query === null) {
		throw new Error(`near must be first in: { $near: ${render(query, true)} }`);
	}
	// confirmed: any value with no `$geometry` key at all (and not already
	// handled as a legacy point above) is a different message family
	// entirely from a malformed $geometry — this is "you didn't even
	// attempt the GeoJSON form", not "your GeoJSON form is malformed".
	if (!isObject(query) || !('$geometry' in query)) {
		throw new Error(`invalid point provided to geo near query: ${render(query, true)}`);
	}

	const { $geometry: rawGeometry, ...rest } = query as { $geometry?: unknown } & Omit<NearGeoJSONPoint, '$geometry'>;
	const $geometry = resolveNearGeometry(rawGeometry);

	const bound = between(<NearGeoJSONPoint>rest);

	// confirmed via mongo-catalog ground truth (geoNearMatrix, 2026-09-18):
	// real MongoDB computes distance to the nearest point on a LineString/
	// Polygon-valued field too, not just a literal Point — @konfirm/geojson's
	// haversine() already handles this (LineStringPoint/PolygonPoint), the
	// guard here just needs to let those shapes through to it.
	return (input: unknown) =>
		((isPoint(input) || isLineString(input) || isPolygon(input)) &&
			bound(haversine($geometry, input))) ||
		(isLegacyPoint(input) &&
			bound(haversine($geometry, <Point>legacyToGeoJSON(input))));
}

/**
 * Returns geospatial objects in proximity to a point on a sphere.
 *
 * @param {NearQuery} query
 * @param {CompileStep} compile
 * @param {CompileContext} context
 * @return {*}  {Evaluator}
 * @see https://www.mongodb.com/docs/manual/reference/operator/query/near/
 */
export function $nearSphere(
	query: NearQuery,
	compile: CompileStep,
	context: CompileContext,
): Evaluator {
	if (isLegacyPoint(query)) {
		const {
			$nearSphere: _,
			$minDistance,
			$maxDistance,
			...rest
		} = <LegacyNearSpherePointContext>context.query;
		const $geometry = <Point>legacyToGeoJSON(query);
		const metres = {
			...($minDistance !== undefined && {
				$minDistance: $minDistance * MONGO_SPHERE_RADIUS,
			}),
			...($maxDistance !== undefined && {
				$maxDistance: $maxDistance * MONGO_SPHERE_RADIUS,
			}),
		};
		const bound = between(<NearGeoJSONPoint>{ ...rest, ...metres });

		// confirmed via mongo-catalog ground truth (geoAntipodal, 2026-09-23) and
		// MongoDB's own source (mongo/src/mongo/db/exec/classic/geo_near.cpp,
		// expression_geo_parser.cpp): legacy-point $nearSphere queries are
		// explicitly non-wrapping ("GeoJSON points imply wrapping queries" —
		// legacy ones don't), because they run through the legacy 2d index's
		// flat, non-wrapping GeoHash grid rather than the 2dsphere/S2 path.
		// haversine() alone is too correct — it has no notion of that flat,
		// non-wrapping grid, so it wraps across the antimeridian when real
		// MongoDB structurally can't. This flat/Euclidean check approximates
		// that grid: a candidate must be within a generous, non-wrapping
		// degree-space radius of the origin *and* within the true spherical
		// bound. It's a heuristic, not a port of MongoDB's actual algorithm —
		// that algorithm caps its GeoHash cell coverage by a cell-count budget,
		// which produces genuinely non-monotonic-by-distance results near the
		// coordinate boundary at extreme (near-half-Earth) maxDistance values.
		// See research/nearsphere-legacy-antimeridian.md for the full trace
		// and the one known remaining case this can't reproduce (doc 7 in the
		// geoAntipodal catalog).
		const maxDistanceDegrees = Math.min($maxDistance ?? Math.PI, Math.PI) * (180 / Math.PI);
		const flatThreshold = Math.min(maxDistanceDegrees * 2, 355);

		// confirmed via mongo-catalog ground truth (geoNearMatrix, 2026-09-23):
		// real MongoDB matches line/polygon-valued fields against legacy
		// $nearSphere too, the same nearest-point support already present for
		// the GeoJSON $geometry form above. The flat/Euclidean antimeridian
		// gate above is only ever exercised by Point-shaped ground truth (see
		// the comment above it) — rather than invent untested behavior for
		// what a non-wrapping flat-grid "distance" to a whole shape would
		// even mean, only Point/legacy-point candidates go through it;
		// LineString/Polygon candidates rely on haversine() alone, same as
		// the GeoJSON-form branches, which never had this gate either.
		return (input: unknown) => {
			if (isLineString(input) || isPolygon(input)) {
				return bound(haversine($geometry, input));
			}
			if (!isPoint(input) && !isLegacyPoint(input)) {
				return false;
			}

			const point = isPoint(input) ? input : <Point>legacyToGeoJSON(input);

			return cartesianDegrees($geometry.coordinates, point.coordinates) <= flatThreshold && bound(haversine($geometry, point));
		};
	}

	if (query === null) {
		throw new Error(`near must be first in: { $nearSphere: ${render(query, true)} }`);
	}
	if (!isObject(query) || !('$geometry' in query)) {
		throw new Error(`invalid point provided to geo near query: ${render(query, true)}`);
	}

	const { $geometry: rawGeometry, ...rest } = query as { $geometry?: unknown } & Omit<NearGeoJSONPoint, '$geometry'>;
	const $geometry = resolveNearGeometry(rawGeometry);
	const bound = between(<NearGeoJSONPoint>rest);

	// see $near's matching comment above — same LineString/Polygon nearest-
	// point support, confirmed via the same ground truth.
	return (input: unknown) =>
		((isPoint(input) || isLineString(input) || isPolygon(input)) &&
			bound(haversine($geometry, input))) ||
		(isLegacyPoint(input) &&
			bound(haversine($geometry, <Point>legacyToGeoJSON(input))));
}
