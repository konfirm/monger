import type { /*Query, CompileStep,*/ Evaluator } from '../Compiler';
import * as Intersect from './Geospatial/Intersect';

export namespace GeoJSON {
	type Longitude = number;
	type Latitude = number;
	type Altitude = number;

	export type Position = [Longitude, Latitude, Altitude?];

	export namespace Geometry {
		export type Point = {
			type: 'Point';
			coordinates: Position;
		}
		export type MultiPoint = {
			type: 'MultiPoint';
			coordinates: Array<Point['coordinates']>
		}
		export type LineString = {
			type: 'LineString';
			coordinates: Array<Point['coordinates']>
		}
		export type MultiLineString = {
			type: 'MultiLineString';
			coordinates: Array<LineString['coordinates']>
		}
		type LinearRing
			= Array<LineString['coordinates']>;

		export type Polygon = {
			type: 'Polygon';
			coordinates: Array<LinearRing>
		}
		export type MultiPolygon = {
			type: 'MultiPolygon';
			coordinates: Array<Polygon['coordinates']>
		}
	}

	export type GeometryObject
		= Geometry.Point
		| Geometry.MultiPoint
		| Geometry.LineString
		| Geometry.MultiLineString
		| Geometry.Polygon
		| Geometry.MultiPolygon

	export type GeometryCollection = {
		type: 'GeometryCollection';
		geometries: Array<GeometryObject>
	}

	export type Feature = {
		type: 'Feature';
		geometry: GeometryObject;
	}

	export type FeatureCollection = {
		type: 'FeatureCollection';
		features: Array<Feature>;
	}
}

type GeoJSONType
	= GeoJSON.GeometryObject
	| GeoJSON.GeometryCollection
	| GeoJSON.Feature
	| GeoJSON.FeatureCollection;

type GeoIntersectsQuery = {
	$geometry: GeoJSONType;
}

type GeoWithinQuery
	= { $geometry: GeoJSON.Geometry.Polygon | GeoJSON.Geometry.MultiPolygon; }
	| { $box: [GeoJSON.Position, GeoJSON.Position] }
	| { $polygon: Array<GeoJSON.Position> }
	| { $center: [GeoJSON.Position, number] }
	| { $centerSphere: [GeoJSON.Position, number] }

type NearQuery = {
	$geometry: GeoJSON.Geometry.Point;
	$maxDistance?: number;
	$minDistance?: number;
}

export type Operation = {
	$geoIntersects: Parameters<typeof $geoIntersects>[0];
	$geoWithin: Parameters<typeof $geoWithin>[0];
	$near: Parameters<typeof $near>[0];
	$nearSphere: Parameters<typeof $nearSphere>[0];
};

function intersects(a: GeoJSONType, b: GeoJSONType): boolean {
	if (a.type === 'GeometryCollection') {
		return a.geometries.some((geometry) => intersects(geometry, b));
	}
	if (a.type === 'Feature') {
		return intersects(a.geometry, b);
	}
	if (a.type === 'FeatureCollection') {
		return a.features.some((feature) => intersects(feature, b));
	}
	if (b.type === 'GeometryCollection') {
		return b.geometries.some((geometry) => intersects(a, geometry));
	}
	if (b.type === 'Feature') {
		return intersects(b.geometry, b);
	}
	if (b.type === 'FeatureCollection') {
		return b.features.some((feature) => intersects(a, feature));
	}

	const { [`${a.type}${b.type}`]: ab, [`${b.type}${a.type}`]: ba } = Intersect as { [key: string]: Function };

	return ab ? ab(a.coordinates, b.coordinates) : ba ? ba(b.coordinates, a.coordinates) : false;
}

export function $geoIntersects(query: GeoIntersectsQuery /*, compile: CompileStep */): Evaluator {
	const { $geometry } = query;

	return (input: any) => intersects(input, $geometry);
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
