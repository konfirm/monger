import { test } from 'node:test';
import * as assert from 'node:assert/strict';
import * as Within from './Within';

test('Domain/Filter/Operator/Geospatial/Within - exports', () => {
	const expected = [
		'within',
	];
	const actual = Object.keys(Within);

	assert.equal(actual.length, expected.length, `contains ${expected.length} keys`);
	expected.forEach((key) => {
		assert.equal(typeof Within[<keyof typeof Within>key], 'function', `contains function ${key}`);
	});
});

const point = { type: 'Point', coordinates: [1, 2] };
const multipoint = { type: 'MultiPoint', coordinates: [point.coordinates, [3, 4]] };
const linestring = { type: 'LineString', coordinates: [[5, 7], [8, 9]] };
const multilinestring = { type: 'LineString', coordinates: [multipoint.coordinates, linestring.coordinates] };
const polygon = { type: 'Polygon', coordinates: [[point.coordinates, ...multipoint.coordinates, point.coordinates]] };
const multipolygon = { type: 'MultiPolygon', coordinates: [[point.coordinates, ...linestring.coordinates, point.coordinates]] };
const feature = { type: 'Feature', properties: null, geometry: polygon };
const featurecollection = { type: 'FeatureCollection', features: [feature] };
const geometrycollection = { type: 'GeometryCollection', geometries: [polygon, multipolygon] };

test('Domain/Filter/Operator/Geospatial/Within - within', () => {
	const { within } = Within;

	// $unknown
	assert.throws(() => within(<any>{ $unknown: 'does not matter' }), /unknown geo specifier: \$unknown/, 'throws on $unknown');

	// $geometry
	const geometryError = /\$within not supported with provided geometry/;
	[point, multipoint, linestring, multilinestring, feature, featurecollection, geometrycollection]
		.forEach((geojson) => {
			assert.throws(() => within(<any>{ $geometry: geojson }), geometryError, `throws ${geometryError} on $geometry with ${geojson.type}`);
		});
	[polygon, multipolygon]
		.forEach((geojson) => {
			assert.doesNotThrow(() => within(<any>{ $geometry: polygon }), geometryError, `does not throw ${geometryError} on $geometry with ${geojson.type}`);
		});

	// $box
	const boxError = /Point must be an array or object/;
	[[], [[1]], [[1, 2]], [[1, 2], [3]], [[1, 2], [3, 4], [5]]]
		.forEach(($box) => {
			assert.throws(() => within(<any>{ $box }), boxError, `throws ${boxError} on invalid $box: ${JSON.stringify($box)}`);
		});
	assert.doesNotThrow(() => within(<any>{ $box: [[1, 2], [3, 4]] }), boxError, `does not throw ${boxError} on valid $box: [[1,2],[3,4]]`);
	// confirmed via mongo-catalog ground truth (geoWithinIntersectsMatrix,
	// 2026-09-22): extra elements beyond the first 2 are not an error, real
	// MongoDB ignores them the same way monger's getLegacyBoxCoordinates
	// already did (.slice(0, 2)) — the bug was isLegacyBox's own size guard
	// rejecting the array before ever reaching that.
	assert.doesNotThrow(() => within(<any>{ $box: [[1, 2], [3, 4], [5, 6]] }), boxError, `does not throw ${boxError} on $box with an extra ignored element: [[1,2],[3,4],[5,6]]`);

	// $polygon
	const polygonError = /Polygon must have at least 3 points/;
	[[], [[1]], [[1, 2]], [[1, 2], [3]], [[1, 2], [3, 4], [5]], [[1, 2], [3, 4], [5, 7], [8]]]
		.forEach(($polygon) => {
			assert.throws(() => within(<any>{ $polygon }), polygonError, `throws ${polygonError} on invalid $polygon: ${JSON.stringify($polygon)}`);
		});
	assert.doesNotThrow(() => within(<any>{ $polygon: [[1, 2], [3, 4], [5, 6]] }), polygonError, `does not throw ${polygonError} on valid $polygon: [[1,2],[3,4],[5,6]]`);
	assert.doesNotThrow(() => within(<any>{ $polygon: [[1, 2], [3, 4], [5, 6], [7, 8]] }), polygonError, `does not throw ${polygonError} on valid $polygon: [[1,2],[3,4],[5,6]]`);

	// $center
	const specifierError = /unknown geo specifier: \$center/;
	const pointError = /Point must be an array or object/;
	const invalidRadius = /radius must be a non-negative number/;

	[null, undefined, {}, { a: 1 }]
		.forEach(($center) => {
			assert.throws(() => within(<any>{ $center }), specifierError, `throws ${specifierError} on invalid $center: ${JSON.stringify($center)}`);
		});
	[[], [1], [{ a: 1 }]]
		.forEach(($center) => {
			assert.throws(() => within(<any>{ $center }), pointError, `throws ${pointError} on invalid $center: ${JSON.stringify($center)}`);
		});
	[undefined, null, '1', -2, true].forEach((radius) => {
		assert.throws(() => within(<any>{ $center: [[1, 2], radius] }), invalidRadius, `throws ${invalidRadius} on $center: ${JSON.stringify({ $center: [[1, 2], radius] })}`);
		assert.throws(() => within(<any>{ $center: [{ a: 3, b: 4 }, radius] }), invalidRadius, `throws ${invalidRadius} on $center: ${JSON.stringify({ $center: [{ a: 3, b: 4 }, radius] })}`);
	});
	[[[1, 2], 1000], [{ a: 1, b: 2 }, 2000]].forEach(($center) => {
		assert.doesNotThrow(() => within(<any>{ $center }), `does not throw on valid $center: ${JSON.stringify($center)}`);
	});

	// $centerSphere
	[null, undefined, {}, { a: 1 }]
		.forEach(($centerSphere) => {
			assert.throws(() => within(<any>{ $centerSphere }), specifierError, `throws ${specifierError} on invalid $centerSphere: ${JSON.stringify($centerSphere)}`);
		});
	[[], [1], [{ a: 1 }]]
		.forEach(($centerSphere) => {
			assert.throws(() => within(<any>{ $centerSphere }), pointError, `throws ${pointError} on invalid $centerSphere: ${JSON.stringify($centerSphere)}`);
		});
	[undefined, null, '1', -2, true].forEach((radius) => {
		assert.throws(() => within(<any>{ $centerSphere: [[1, 2], radius] }), invalidRadius, `throws ${invalidRadius} on $centerSphere: ${JSON.stringify({ $centerSphere: [[1, 2], radius] })}`);
		assert.throws(() => within(<any>{ $centerSphere: [{ a: 3, b: 4 }, radius] }), invalidRadius, `throws ${invalidRadius} on $centerSphere: ${JSON.stringify({ $centerSphere: [{ a: 3, b: 4 }, radius] })}`);
	});
	[[[1, 2], 1000], [{ a: 1, b: 2 }, 2000]].forEach(($centerSphere) => {
		assert.doesNotThrow(() => within(<any>{ $centerSphere }), `does not throw on valid $centerSphere: ${JSON.stringify($centerSphere)}`);
	});
});
