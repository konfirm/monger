import { GeoJSON, isStrictPosition, Polygon, Position } from "@konfirm/geojson";

export type LegacyPointArray = Position;
export type LegacyPointObject = { [key: string]: number };
export type LegacyPoint = LegacyPointArray | LegacyPointObject;
export type LegacyBox = [LegacyPoint, LegacyPoint];
export type LegacyPolygon = [LegacyPoint, LegacyPoint, LegacyPoint, ...Array<LegacyPoint>];
export type Legacy = LegacyPoint | LegacyBox | LegacyPolygon;

export function isLegacyPointArray(input: any): input is LegacyPointArray {
    return isStrictPosition(input);
}

export function isLegacyPointObject(input: any): input is LegacyPointObject {
    return typeof input === 'object' && !Array.isArray(input) && Object.keys(input).every((key) => typeof input[key] === 'number');
}


export function isLegacyPoint(input: any): input is LegacyPoint {
    return isLegacyPointArray(input) || isLegacyPointObject(input);
}

export function isLegacyBox(input: any): input is LegacyBox {
    return Array.isArray(input) && input.length >= 2 && input.every(isLegacyPoint);
}

export function isLegacyPolygon(input: any): input is LegacyPolygon {
    return Array.isArray(input) && input.length >= 3 && input.every(isLegacyPoint);
}

export function isLegacy(input: any): input is Legacy {
    return isLegacyPoint(input) || isLegacyBox(input) || isLegacyPolygon(input);
}

export function getLegacyPointCoordinates(input: LegacyPoint): Position {
    return isLegacyPointArray(input)
        ? input
        : Object.keys(input).slice(0, 2).map((key) => input[key]) as Position
}

export function getLegacyBoxCoordinates(input: LegacyBox): [Position, Position] {
    return input.slice(0, 2).map(getLegacyPointCoordinates) as [Position, Position];
}

export function getLegacyPolygonCoordinates(input: LegacyPolygon): [Position, Position, Position, Position, ...Array<Position>] {
    const mapped = input.map(getLegacyPointCoordinates);
    const append = mapped[mapped.length - 1].every((v, i) => v === mapped[0][i])
        ? mapped[0]
        : [];

    return mapped.concat(append) as [Position, Position, Position, Position, ...Array<Position>];
}

export function legacyToGeoJSON(legacy: Legacy): GeoJSON {
    if (isLegacyPoint(legacy)) {
        return { type: 'Point', coordinates: getLegacyPointCoordinates(legacy) };
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