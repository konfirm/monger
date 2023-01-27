import { intersect, isGeoJSON, isMultiPolygon, isPolygon, MultiPolygon, Polygon, Position } from "@konfirm/geojson";
import { Evaluator } from "../../Compiler";
import { getLegacyBoxCoordinates, isLegacy, isLegacyBox, LegacyBox, LegacyPolygon, legacyToGeoJSON } from "./Legacy";

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
            throw new Error(`$within not supported with provided geometry: ${JSON.stringify($geometry)}`);
        }

        return (input: any) => isGeoJSON(input) && intersect(input, $geometry);
    },

    $box({ $box }: GeoWithinBox): Evaluator {
        if (!isLegacyBox($box)) {
            throw new Error('$box must be a legacy coordinate box');
        }

        const within = compilers.$geometry({ $geometry: legacyToGeoJSON($box) } as GeoWithinGeometry);

        return (input: any) => isLegacy(input) && within(legacyToGeoJSON(input));
    },

    $polygon({ $polygon }: GeoWithinPolygon): Evaluator {
        return (input: any) => false;
    },

    $center({ $center }: GeoWithinCenter): Evaluator {
        return (input: any) => false;
    },

    $centerSphere({ $centerSphere }: GeoWithinCenterSphere): Evaluator {
        return (input: any) => false;
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
