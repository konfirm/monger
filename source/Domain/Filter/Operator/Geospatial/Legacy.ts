import { GeoJSON, isStrictPosition, Position } from "@konfirm/geojson";

export type LegacyPointArray = Position;
export type LegacyPointObject = { [key: string]: number };
export type LegacyPoint = LegacyPointArray | LegacyPointObject;
export type LegacyBox = [LegacyPoint, LegacyPoint];
export type LegacyPolygon = [LegacyPoint, LegacyPoint, LegacyPoint, ...Array<LegacyPoint>];
export type Legacy = LegacyPoint | LegacyBox | LegacyPolygon;

/**
 * Type guard for LegacyPointArray
 *
 * @param {*} input
 * @return {*}  {input is LegacyPointArray}
 */
export function isLegacyPointArray(input: any): input is LegacyPointArray {
    return isStrictPosition(input);
}

/**
 * Type guard for LegacyPointObject
 *
 * @param {*} input
 * @return {*}  {input is LegacyPointObject}
 */
export function isLegacyPointObject(input: any): input is LegacyPointObject {
    return typeof input === 'object' && !Array.isArray(input) && Object.keys(input).every((key) => typeof input[key] === 'number');
}

/**
 * Type guard for LegacyPoint
 *
 * @param {*} input
 * @return {*}  {input is LegacyPoint}
 */
export function isLegacyPoint(input: any): input is LegacyPoint {
    return isLegacyPointArray(input) || isLegacyPointObject(input);
}

/**
 * Type guard for LegacyBox
 *
 * @param {*} input
 * @return {*}  {input is LegacyBox}
 */
export function isLegacyBox(input: any): input is LegacyBox {
    return Array.isArray(input) && input.length >= 2 && input.every(isLegacyPoint);
}

/**
 * Type guard for LegacyPolygon
 *
 * @param {*} input
 * @return {*}  {input is LegacyPolygon}
 */
export function isLegacyPolygon(input: any): input is LegacyPolygon {
    return Array.isArray(input) && input.length >= 3 && input.every(isLegacyPoint);
}

/**
 * Type guard for any legacy shape
 *
 * @param {*} input
 * @return {*}  {input is Legacy}
 */
export function isLegacy(input: any): input is Legacy {
    return isLegacyPoint(input) || isLegacyBox(input) || isLegacyPolygon(input);
}

/**
 * Convert legacy coordinates into GeoJSON Positions
 *
 * @param {LegacyPoint} input
 * @return {*}  {Position}
 */
export function getLegacyPointCoordinates(input: LegacyPoint): Position {
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
export function getLegacyBoxCoordinates(input: LegacyBox): [Position, Position] {
    return input.slice(0, 2).map(getLegacyPointCoordinates) as [Position, Position];
}

/**
 * Obtain GeoJSON Polygon coordinates from legacy ones
 * Coordinate arrays turn into Longitude/Latitude arrays, ring is closed
 *
 * @param {LegacyPolygon} input
 * @return {*}  {[Position, Position, Position, Position, ...Array<Position>]}
 */
export function getLegacyPolygonCoordinates(input: LegacyPolygon): [Position, Position, Position, Position, ...Array<Position>] {
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
export function legacyToGeoJSON(legacy: Legacy): GeoJSON {
    if (isLegacyPoint(legacy)) {
        return { type: 'Point', coordinates: getLegacyPointCoordinates(legacy) };
    }
    if (isLegacyPolygon(legacy)) {
        return { type: 'Polygon', coordinates: [getLegacyPolygonCoordinates(legacy)] };
    }
    if (isLegacyBox(legacy)) {
        const sort = (...values: Array<number>): Array<number> => values.sort((a, b) => a < b ? -1 : Number(a > b));
        const [[lonA, latA], [lonB, latB]] = getLegacyBoxCoordinates(legacy);
        const [lonMin, lonMax] = sort(lonA, lonB);
        const [latMin, latMax] = sort(latA, latB);

        return { type: 'Polygon', coordinates: [[[lonMin, latMin], [lonMin, latMax], [lonMax, latMax], [lonMax, latMin], [lonMin, latMin]]] };
    }

    throw new Error('not a legacy coordinate format');
}