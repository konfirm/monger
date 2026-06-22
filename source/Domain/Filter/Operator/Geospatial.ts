import { distance, GeoJSON, intersect, isGeoJSON, isPoint, Point } from '@konfirm/geojson';
import type { Query, CompileStep, Evaluator } from '../Compiler';
import { GeoWithinQuery, within } from './Geospatial/Within';
import { isLegacyPoint, LegacyPoint, legacyToGeoJSON } from './Geospatial/Legacy';

type GeoIntersectsQuery = {
	$geometry: GeoJSON;
}

type NearGeoJSONPoint = {
	$geometry: Point;
	$maxDistance?: number;
	$minDistance?: number;
}
type LegacyNearPointContext
	= { $near: LegacyPoint }
	& Omit<NearGeoJSONPoint, '$geometry'>;
type LegacyNearSpherePointContext
	= { $nearSphere: LegacyPoint }
	& Omit<NearGeoJSONPoint, '$geometry'>;
type NearQuery = NearGeoJSONPoint | LegacyPoint;

export type Operation = {
	$geoIntersects: Parameters<typeof $geoIntersects>[0];
	$geoWithin: Parameters<typeof $geoWithin>[0];
	$near: Parameters<typeof $near>[0];
	$nearSphere: Parameters<typeof $nearSphere>[0];
};

function between({ $minDistance: min = -Infinity, $maxDistance: max = Infinity }: NearGeoJSONPoint | LegacyNearPointContext): (n: number) => boolean {
	return (n: number): boolean => n >= min && n <= max;
}
function cartesian(a: Point, b: Point): number {
	return distance(a, b, 'cartesian');
}
function vincenty(a: Point, b: Point): number {
	return distance(a, b, 'vincenty');
}

/**
 * Selects geometries that intersect with a GeoJSON geometry.
 *
 * @param {GeoIntersectsQuery} { $geometry }
 * @return {*}  {Evaluator}
 */
export function $geoIntersects({ $geometry }: GeoIntersectsQuery): Evaluator {
	return (input: any) => isGeoJSON(input) && intersect(input, $geometry);
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

// @TODO: use this instead of the 'cartesian' distance from @konfirm/geojson
//        as MongoDB $near legacy distance is in degrees (raw Euclidean on
//        coordinate space), not the metre-converted cartesian formula
function legacyDistance([x1, y1]: N2, [x2, y2]: N2): number {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

// @TODO: GeoJSON $near and $nearSphere should use 'haversine' rather than
//        'vincenty' — matches MongoDB's spherical model, never throws,
//        3-4x faster, sufficient accuracy for proximity queries

// @TODO: legacy $nearSphere $maxDistance is in radians, not degrees —
//        convert haversine result (metres) by dividing by EARTH_RADIUS
//        before comparison

// @TODO: update tests — legacy $near expects degree-space distances,
//        not the metre values currently hardcoded as 'direct'


/**
 * Returns geospatial objects in proximity to a point.
 *
 * @param {NearQuery} query
 * @param {CompileStep} compile
 * @param {Partial<Query>} context
 * @return {*}  {Evaluator}
 */
export function $near(query: NearQuery, compile: CompileStep, context: Partial<Query>): Evaluator {
	if (isLegacyPoint(query)) {
		const { $near: _, ...rest } = <LegacyNearPointContext>context;

		return $near({ $geometry: <Point>legacyToGeoJSON(query), ...rest }, compile, context);
	}

	const { $geometry, ...rest } = query;
	const bound = between(<NearGeoJSONPoint>rest);

	return (input: any) => (isPoint(input) && bound(vincenty($geometry, input))) || (isLegacyPoint(input) && bound(cartesian($geometry, <Point>legacyToGeoJSON(input))));
}

/**
 * Returns geospatial objects in proximity to a point on a sphere.
 *
 * @param {NearQuery} query
 * @param {CompileStep} compile
 * @param {Partial<Query>} context
 * @return {*}  {Evaluator}
 */
export function $nearSphere(query: NearQuery, compile: CompileStep, context: Partial<Query>): Evaluator {
	if (isLegacyPoint(query)) {
		const { $nearSphere: _, ...rest } = <LegacyNearSpherePointContext>context;
		const $geometry = <Point>legacyToGeoJSON(query);

		return $nearSphere({ $geometry, ...rest }, compile, context);
	}

	const { $geometry, ...rest } = query;
	const bound = between(<NearGeoJSONPoint>rest);

	return (input: any) => bound(vincenty($geometry, isPoint(input) ? input : <Point>legacyToGeoJSON(input)));
}
