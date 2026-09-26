import { test } from 'node:test';
import * as assert from 'node:assert/strict';
import * as Distance from './Distance';

test('Domain/Filter/Operator/Geospatial/Distance - exports', () => {
	const expected = ['MONGO_SPHERE_RADIUS', 'cartesianDegrees', 'haversine'];
	const actual = Object.keys(Distance);

	assert.equal(actual.length, expected.length, `contains ${expected.length} keys`);
	expected.forEach((key) => {
		assert.ok(key in Distance, `contains ${key}`);
	});
});

test('Domain/Filter/Operator/Geospatial/Distance - MONGO_SPHERE_RADIUS', () => {
	// MongoDB hardcodes this sphere radius for 2dsphere/$near/$nearSphere/
	// $centerSphere — distinct from @konfirm/geojson's own WGS84
	// mean-radius default; see https://github.com/konfirm/geojson/issues/13
	assert.equal(Distance.MONGO_SPHERE_RADIUS, 6_378_100);
});

test('Domain/Filter/Operator/Geospatial/Distance - cartesianDegrees', () => {
	assert.equal(Distance.cartesianDegrees([0, 0], [3, 4]), 5, 'computes raw Euclidean distance in coordinate-space degrees, ignoring curvature');
	assert.equal(Distance.cartesianDegrees([1, 1], [1, 1]), 0, 'zero distance between identical points');
	assert.equal(Distance.cartesianDegrees([-1, -1], [-1, -1]), 0, 'zero distance between identical negative points');
});

test('Domain/Filter/Operator/Geospatial/Distance - haversine', () => {
	const arnhem = { type: 'Point' as const, coordinates: [5.909662963872819, 51.9790545929402] as [number, number] };
	const berlin = { type: 'Point' as const, coordinates: [13.377711564851495, 52.51627850716736] as [number, number] };

	assert.equal(Distance.haversine(arnhem, arnhem), 0, 'zero distance between identical points');

	// computed independently against @konfirm/geojson's own haversine()
	// with an explicit MONGO_SPHERE_RADIUS, not derived from this module
	const expected = 512250.4595093529;
	const actual = Distance.haversine(arnhem, berlin);

	assert.ok(Math.abs(actual - expected) < 1e-6, `uses MongoDB's sphere radius (${expected}), not the library's WGS84 mean-radius default, got ${actual}`);
});
