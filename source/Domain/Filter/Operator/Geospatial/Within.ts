import { distance, intersect, isGeoJSON, isMultiPolygon, isPolygon, MultiPolygon, Polygon, Position } from "@konfirm/geojson";
import { Evaluator } from "../../Compiler";
import { isLegacy, isLegacyBox, isLegacyPoint, isLegacyPolygon, LegacyBox, LegacyPolygon, legacyToGeoJSON } from "./Legacy";
import { is } from '../../../BSON';

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

    return (input: any) => (isGeoJSON(input) && intersect(input, $geometry) || (isLegacy(input) && intersect(legacyToGeoJSON(input), $geometry)));
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

    const evaluate = $geometry({ $geometry: legacyToGeoJSON($box) } as GeoWithinGeometry);

    return (input: any) => isLegacy(input) && evaluate(legacyToGeoJSON(input));
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
    const evaluate = $geometry({ $geometry: legacyToGeoJSON($polygon) } as GeoWithinGeometry);

    return (input: any) => isLegacy(input) && evaluate(legacyToGeoJSON(input));
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
    const point = legacyToGeoJSON(center);

    return (input: any) => isLegacyPoint(input) && distance(point, legacyToGeoJSON(input), 'cartesian') <= radius;
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
    const point = legacyToGeoJSON(centerSphere);

    return (input: any) => (isGeoJSON(input) && distance(point, input, 'cartesian') <= radius) || (isLegacy(input) && distance(point, legacyToGeoJSON(input), 'cartesian') <= radius);
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
