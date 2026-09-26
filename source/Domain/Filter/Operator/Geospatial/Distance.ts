import {
	cartesian as cartesianGeoJSON,
	type GeoJSON,
	haversine as haversineGeoJSON,
	type Point,
	type Position
} from '@konfirm/geojson';

// MongoDB hardcodes this sphere radius for 2dsphere
// ($near/$nearSphere/$centerSphere)
// see https://github.com/konfirm/geojson/issues/13
export const MONGO_SPHERE_RADIUS = 6_378_100;

function point(coordinates: Position): Point {
	return { type: 'Point', coordinates };
}

// legacy 2d distance: raw Euclidean on coordinate space (degrees), not the
// metre-converted cartesian formula
export function cartesianDegrees(a: Position, b: Position): number {
	return cartesianGeoJSON(point(a), point(b), 180 / Math.PI);
}

// MongoDB's spherical distance model, in metres
export function haversine(a: GeoJSON, b: GeoJSON): number {
	return haversineGeoJSON(a, b, MONGO_SPHERE_RADIUS);
}
