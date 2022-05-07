import { GeoJSON, intersect, MultiPolygon, Point, Polygon, Position } from '@konfirm/geojson';
import type { /*Query, CompileStep,*/ Evaluator } from '../Compiler';

type GeoIntersectsQuery = {
	$geometry: GeoJSON;
}

type GeoWithinQuery
	= { $geometry: Polygon | MultiPolygon }
	| { $box: [Position, Position] }
	| { $polygon: Array<Position> }
	| { $center: [Position, number] }
	| { $centerSphere: [Position, number] }

type NearQuery = {
	$geometry: Point;
	$maxDistance?: number;
	$minDistance?: number;
}

export type Operation = {
	$geoIntersects: Parameters<typeof $geoIntersects>[0];
	$geoWithin: Parameters<typeof $geoWithin>[0];
	$near: Parameters<typeof $near>[0];
	$nearSphere: Parameters<typeof $nearSphere>[0];
};

export function $geoIntersects(query: GeoIntersectsQuery /*, compile: CompileStep */): Evaluator {
	const { $geometry } = query;

	return (input: any) => intersect(input, $geometry);
}
export function $geoWithin(query: GeoWithinQuery /*, compile: CompileStep */): Evaluator {
	// TODO: this seems to be a job for our GeoJSON library
	return (input: any) => false;
}
export function $near(query: NearQuery /*, compile: CompileStep */): Evaluator {
	// TODO: this seems to be a job for our GeoJSON library
	return (input: any) => false;
}
export function $nearSphere(query: NearQuery /*, compile: CompileStep */): Evaluator {
	// TODO: this seems to be a job for our GeoJSON library
	return (input: any) => false;
}
