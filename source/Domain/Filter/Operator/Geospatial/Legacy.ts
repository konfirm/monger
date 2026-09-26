import { GeoJSON, isStrictPosition, Polygon, Position } from "@konfirm/geojson";
import { all, any, isArrayOfSize, isArrayOfType } from "@konfirm/guard";

export type LegacyPointArray = Position;
export type LegacyPointObject = { [key: string]: number };
export type LegacyPoint = LegacyPointArray | LegacyPointObject;
export type LegacyBox = [LegacyPoint, LegacyPoint, ...Array<LegacyPoint>];
export type LegacyPolygon = [LegacyPoint, LegacyPoint, LegacyPoint, ...Array<LegacyPoint>];
export type Legacy = LegacyPoint | LegacyBox | LegacyPolygon;

/**
 * Type guard for LegacyPointArray
 *
 * @param {*} input
 * @return {*}  {input is LegacyPointArray}
 */
export function isLegacyPointArray(input: unknown): input is LegacyPointArray {
    return isStrictPosition(input);
}

/**
 * Type guard for LegacyPointObject
 *
 * @param {*} input
 * @return {*}  {input is LegacyPointObject}
 */
export function isLegacyPointObject(input: unknown): input is LegacyPointObject {
    if (input && typeof input === 'object' && !Array.isArray(input)) {
        const keys = Object.keys(input) as Array<keyof typeof input>;

        return keys.length >= 2 && keys.every((key) => typeof input[key] === 'number');
    }

    return false;
}

/**
 * Type guard for LegacyPoint
 *
 * @param {*} input
 * @return {*}  {input is LegacyPoint}
 */
export const isLegacyPoint = any<LegacyPoint>(isLegacyPointArray, isLegacyPointObject);

/**
 * Type guard for LegacyBox
 *
 * @param {*} input
 * @return {*}  {input is LegacyBox}
 */
// confirmed via mongo-catalog ground truth (geoWithinIntersectsMatrix,
// 2026-09-22): a $box array with more than 2 elements is not an error —
// real MongoDB uses the first 2 and ignores the rest (getLegacyBoxCoordinates
// below already does exactly that via .slice(0, 2); the bug was this guard
// rejecting anything but exactly 2 before ever reaching it).
export const isLegacyBox = all<LegacyBox>(isArrayOfSize(2), isArrayOfType(isLegacyPoint));

/**
 * Type guard for LegacyPolygon
 *
 * @param {*} input
 * @return {*}  {input is LegacyPolygon}
 */
export const isLegacyPolygon = all<LegacyPolygon>(isArrayOfSize(3), isArrayOfType(isLegacyPoint));

/**
 * Type guard for any legacy shape
 *
 * @param {*} input
 * @return {*}  {input is Legacy}
 */
export const isLegacy = any<Legacy>(isLegacyPoint, isLegacyBox, isLegacyPolygon);

/**
 * Convert legacy coordinates into GeoJSON Positions
 *
 * @param {LegacyPoint} input
 * @return {*}  {Position}
 */
function getLegacyPointCoordinates(input: LegacyPoint): Position {
    return isLegacyPointArray(input)
        ? input
        : Object.keys(input).slice(0, 2).map((key) => input[key]) as Position
}

/**
 * Convert legacy $box coordinates into a Positions tuple
 *
 * @param {LegacyBox} input
 * @return {*}  {[Position, Position]}
 */
function getLegacyBoxCoordinates(input: LegacyBox): [Position, Position] {
    return input.slice(0, 2).map(getLegacyPointCoordinates) as [Position, Position];
}

/**
 * Obtain GeoJSON Polygon coordinates from legacy ones
 * Coordinate arrays turn into Longitude/Latitude arrays, ring is closed
 *
 * @param {LegacyPolygon} input
 * @return {*}  {[Position, Position, Position, Position, ...Array<Position>]}
 */
function getLegacyPolygonCoordinates(input: LegacyPolygon): [Position, Position, Position, Position, ...Array<Position>] {
    const mapped = input.map(getLegacyPointCoordinates);
    const append = mapped[mapped.length - 1].every((v, i) => v === mapped[0][i])
        ? []
        : [mapped[0]];

    return mapped.concat(append) as [Position, Position, Position, Position, ...Array<Position>];
}

/**
 * Convert legacy shapes to a GeoJSON Geometry
 * coordinates to a Point, $polygon and $box to a Polygon
 *
 * @param {Legacy} legacy
 * @return {*}  {GeoJSON}
 */
/**
 * Convert a legacy $box's two (or more, extras ignored) corner points into
 * the GeoJSON rectangle they describe.
 *
 * @param {LegacyBox} box
 * @return {*}  {Polygon}
 */
export function legacyBoxToGeoJSON(box: LegacyBox): Polygon {
    const sort = (...values: Array<number>): Array<number> => values.sort((a, b) => a < b ? -1 : Number(a > b));
    const [[lonA, latA], [lonB, latB]] = getLegacyBoxCoordinates(box);
    const [lonMin, lonMax] = sort(lonA, lonB);
    const [latMin, latMax] = sort(latA, latB);

    return { type: 'Polygon', coordinates: [[[lonMin, latMin], [lonMin, latMax], [lonMax, latMax], [lonMax, latMin], [lonMin, latMin]]] };
}

export function legacyToGeoJSON(legacy: Legacy): GeoJSON {
    if (isLegacyPoint(legacy)) {
        return { type: 'Point', coordinates: getLegacyPointCoordinates(legacy) };
    }
    if (isLegacyPolygon(legacy)) {
        return { type: 'Polygon', coordinates: [getLegacyPolygonCoordinates(legacy)] };
    }
    if (isLegacyBox(legacy)) {
        return legacyBoxToGeoJSON(legacy);
    }

    throw new Error('not a legacy coordinate format');
}
