import { distance, intersect, isGeoJSON, isMultiPolygon, isPolygon, MultiPolygon, Polygon, Position } from "@konfirm/geojson";
import { Evaluator } from "../../Compiler";
import { isLegacy, isLegacyBox, isLegacyPoint, isLegacyPolygon, LegacyBox, LegacyPolygon, legacyToGeoJSON } from "./Legacy";

type GeoWithinOptions = {
    $geometry?: Polygon | MultiPolygon;
    $box?: LegacyBox;
    $polygon?: LegacyPolygon;
    $center?: [Position, number];
    $centerSphere?: [Position, number];
}
export type GeoWithinRequire<T extends keyof GeoWithinOptions> = Required<Pick<GeoWithinOptions, T>> & Omit<GeoWithinOptions, T>;
export type GeoWithinGeometry = GeoWithinRequire<'$geometry'>;
export type GeoWithinBox = GeoWithinRequire<'$box'>;
export type GeoWithinPolygon = GeoWithinRequire<'$polygon'>;
export type GeoWithinCenter = GeoWithinRequire<'$center'>;
export type GeoWithinCenterSphere = GeoWithinRequire<'$centerSphere'>;;

export type GeoWithinQuery
    = GeoWithinGeometry
    | GeoWithinBox
    | GeoWithinPolygon
    | GeoWithinCenter
    | GeoWithinCenterSphere;

const compilers = {
    $geometry({ $geometry }: GeoWithinGeometry): Evaluator {
        if (!(isPolygon($geometry) || isMultiPolygon($geometry))) {
            throw new Error(`unknown GeoJSON type: ${JSON.stringify($geometry)}`);
        }

        return (input: any) => (isGeoJSON(input) && intersect(input, $geometry) || (isLegacy(input) && intersect(legacyToGeoJSON(input), $geometry)));
    },

    $box({ $box }: GeoWithinBox): Evaluator {
        if (!isLegacyBox($box)) {
            throw new Error('Point must be an array or object');
        }

        const within = compilers.$geometry({ $geometry: legacyToGeoJSON($box) } as GeoWithinGeometry);

        return (input: any) => isLegacy(input) && within(legacyToGeoJSON(input));
    },

    $polygon({ $polygon }: GeoWithinPolygon): Evaluator {
        if (!isLegacyPolygon($polygon)) {
            throw new Error('Polygon must have at least 3 points');
        }
        const $geometry = legacyToGeoJSON($polygon);
        const within = compilers.$geometry({ $geometry } as GeoWithinGeometry);

        return (input: any) => isLegacy(input) && within(legacyToGeoJSON(input));
    },

    $center({ $center }: GeoWithinCenter): Evaluator {
        const [center, radius] = $center;
        if (!isLegacyPoint(center)) {
            throw new Error('Point must be an array or object');
        }
        const point = legacyToGeoJSON(center);

        return (input: any) => isLegacyPoint(input) && distance(point, legacyToGeoJSON(input), 'cartesian') <= radius;
    },

    $centerSphere({ $centerSphere }: GeoWithinCenterSphere): Evaluator {
        const [center, radius] = $centerSphere;
        if (!isLegacyPoint(center)) {
            throw new Error('Point must be an array or object');
        }
        const point = legacyToGeoJSON(center);

        return (input: any) => (isGeoJSON(input) && distance(point, input, 'cartesian') <= radius) || (isLegacy(input) && distance(point, legacyToGeoJSON(input), 'cartesian') <= radius);
    },
};

export function within(query: GeoWithinQuery): Evaluator {
    const keys = Object.keys(query);
    const unknown = keys.filter((key) => !(key in compilers))

    if (unknown.length) {
        throw new Error(`unknown $within shape: ${unknown.join(', ')}`);
    }

    const compiled = keys.map((key) => compilers[key as keyof typeof compilers](query as any));

    return (input: any): boolean => compiled.length > 0 && compiled.every((c) => c(input));
}
