import { exceedsHemisphere, intersect, isGeoJSON, isMultiPolygon, isPolygon, MultiPolygon, Point, Polygon, Position } from "@konfirm/geojson";
import { Evaluator } from "../../Compiler";
import { cartesianDegrees, haversine, MONGO_SPHERE_RADIUS } from "./Distance";
import { isLegacy, isLegacyBox, isLegacyPoint, isLegacyPolygon, LegacyBox, legacyBoxToGeoJSON, LegacyPolygon, legacyToGeoJSON } from "./Legacy";
import { is } from '../../../BSON';
import { hasStrictWindingCRS, validateCRS } from "./Winding";

type GeoWithinOptions = {
    $geometry?: Polygon | MultiPolygon;
    $box?: LegacyBox;
    $polygon?: LegacyPolygon;
    $center?: [Position, number];
    $centerSphere?: [Position, number];
}
type GeoWithinRequire<T extends keyof GeoWithinOptions> = Required<Pick<GeoWithinOptions, T>> & Omit<GeoWithinOptions, T>;
type GeoWithinGeometry = GeoWithinRequire<'$geometry'>;
type GeoWithinBox = GeoWithinRequire<'$box'>;
type GeoWithinPolygon = GeoWithinRequire<'$polygon'>;
type GeoWithinCenter = GeoWithinRequire<'$center'>;
type GeoWithinCenterSphere = GeoWithinRequire<'$centerSphere'>;;

export type GeoWithinQuery
    = GeoWithinGeometry
    | GeoWithinBox
    | GeoWithinPolygon
    | GeoWithinCenter
    | GeoWithinCenterSphere;

const isNumber = is('int', 'double', 'long');

/**
 * Compile a $geometry query
 *
 * @param {GeoWithinGeometry} { $geometry }
 * @return {*}  {Evaluator}
 */
function $geometry({ $geometry }: GeoWithinGeometry): Evaluator {
    if (!(isPolygon($geometry) || isMultiPolygon($geometry))) {
        throw new Error(`$within not supported with provided geometry ${JSON.stringify($geometry)}`);
    }

    validateCRS($geometry);

    const strictWinding = isPolygon($geometry) && hasStrictWindingCRS($geometry);
    const matches = (point: any) => {
        const result = intersect(point, $geometry);

        return strictWinding && exceedsHemisphere($geometry.coordinates[0]) ? !result : result;
    };

    return (input: any) => (isGeoJSON(input) && matches(input) || (isLegacy(input) && matches(legacyToGeoJSON(input))));
}

/**
 * Compile a $box query
 *
 * @param {GeoWithinBox} { $box }
 * @return {*}  {Evaluator}
 */
function $box({ $box }: GeoWithinBox): Evaluator {
    if (!isLegacyBox($box)) {
        throw new Error('Point must be an array or object');
    }

    // $geometry's own returned evaluator already accepts either a GeoJSON-
    // or legacy-shaped document field internally (confirmed via
    // mongo-catalog ground truth, geoWithinIntersectsMatrix, 2026-09-22:
    // real MongoDB matches a GeoJSON-shaped field against a legacy $box
    // query just fine) — wrapping it in an isLegacy(input)-only gate here
    // was both redundant and wrong: it excluded GeoJSON input, and even if
    // it hadn't, legacyToGeoJSON(input) below would throw on GeoJSON input
    // anyway (it only accepts Legacy shapes).
    //
    // Deliberately legacyBoxToGeoJSON(), not the generic legacyToGeoJSON():
    // a $box with more than 2 corners is a valid LegacyPolygon shape too
    // (isLegacyPolygon accepts 3+ points same as isLegacyBox does), and
    // legacyToGeoJSON()'s generic dispatch checks isLegacyPolygon first —
    // so a 3+-corner $box would silently get converted into the polygon
    // connecting all its points instead of the rectangle from just the
    // first 2 (confirmed via ground truth, geoWithinIntersectsMatrix,
    // 2026-09-24). $box's own compiler already knows it's a box; it
    // shouldn't go through shape-guessing at all.
    return $geometry({ $geometry: legacyBoxToGeoJSON($box) } as GeoWithinGeometry);
}

/**
 * Compile a $polygon query
 *
 * @param {GeoWithinPolygon} { $polygon }
 * @return {*}  {Evaluator}
 */
function $polygon({ $polygon }: GeoWithinPolygon): Evaluator {
    if (!isLegacyPolygon($polygon)) {
        throw new Error('Polygon must have at least 3 points');
    }
    // see $box's matching comment above — $geometry's evaluator already
    // handles both shapes, no wrapper needed.
    return $geometry({ $geometry: legacyToGeoJSON($polygon) } as GeoWithinGeometry);
}

/**
 * Compile a $center query
 *
 * @param {GeoWithinCenter} { $center }
 * @return {*}  {Evaluator}
 */
function $center({ $center }: GeoWithinCenter): Evaluator {
    if (!Array.isArray($center)) {
        throw new Error(`unknown geo specifier: $center: ${JSON.stringify($center)}`);
    }
    const [center, radius] = $center;
    if (!isLegacyPoint(center)) {
        throw new Error('Point must be an array or object');
    }
    if (!isNumber(radius) || radius < 0) {
        throw new Error('radius must be a non-negative number');
    }
    const { coordinates: origin } = <Point>legacyToGeoJSON(center);

    // confirmed via mongo-catalog ground truth (geoWithinIntersectsMatrix,
    // 2026-09-22): real MongoDB matches a GeoJSON-shaped field against a
    // legacy $center query too — mirrors $centerSphere's existing
    // dual-shape pattern just below, which already does this correctly.
    return (input: any) =>
        (isGeoJSON(input) && cartesianDegrees(origin, (<Point>input).coordinates) <= radius) ||
        (isLegacyPoint(input) && cartesianDegrees(origin, (<Point>legacyToGeoJSON(input)).coordinates) <= radius);
}

/**
 * Compile a $centerSphere query
 *
 * @param {GeoWithinCenterSphere} { $centerSphere }
 * @return {*}  {Evaluator}
 */
function $centerSphere({ $centerSphere }: GeoWithinCenterSphere): Evaluator {
    if (!Array.isArray($centerSphere)) {
        throw new Error(`unknown geo specifier: $centerSphere: ${JSON.stringify($centerSphere)}`);
    }
    const [centerSphere, radius] = $centerSphere;
    if (!isLegacyPoint(centerSphere)) {
        throw new Error('Point must be an array or object');
    }
    if (!isNumber(radius) || radius < 0) {
        throw new Error('radius must be a non-negative number');
    }
    const point = <Point>legacyToGeoJSON(centerSphere);
    const maxMetres = radius * MONGO_SPHERE_RADIUS;

    return (input: any) => (isGeoJSON(input) && haversine(point, input) <= maxMetres) || (isLegacy(input) && haversine(point, <Point>legacyToGeoJSON(input)) <= maxMetres);
}

const compilers = { $geometry, $box, $polygon, $center, $centerSphere };

/**
 * Compile an evaluator for the specified $geoWithin query
 *
 * @param {GeoWithinQuery} query
 * @return {*}  {Evaluator}
 */
export function within(query: GeoWithinQuery): Evaluator {
    const keys = Object.keys(query);
    const unknown = keys.filter((key) => !(key in compilers))

    if (unknown.length) {
        throw new Error(`unknown geo specifier: ${unknown.join(', ')}`);
    }

    const evaluators = keys.map((key) => compilers[key as keyof typeof compilers](query as any));

    return (input: any): boolean => evaluators.length > 0 && evaluators.every((c) => c(input));
}
