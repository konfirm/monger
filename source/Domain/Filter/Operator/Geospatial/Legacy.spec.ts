import { test } from 'node:test';
import * as assert from 'node:assert/strict';
import * as Legacy from './Legacy';

test('Domain/Filter/Operator/Geospatial/Legacy - exports', () => {
	const expected = [
		'isLegacyPointArray',
		'isLegacyPointObject',
		'isLegacyPoint',
		'isLegacyBox',
		'isLegacyPolygon',
		'isLegacy',
		'legacyBoxToGeoJSON',
		'legacyToGeoJSON'
	];
	const actual = Object.keys(Legacy);

	assert.equal(actual.length, expected.length, `contains ${expected.length} keys`);
	expected.forEach((key) => {
		assert.equal(typeof Legacy[<keyof typeof Legacy>key], 'function', `contains function ${key}`);
	});
});

const shapes: { [key: string]: any } = {
	legacyPointArray: [1, 2],
	legacyPointObject: { a: 1, b: 2 },
	legacyBoxArray: [[3, 4], [1, 2]],
	legacyBoxObject: [{ a: 1, b: 2 }, { c: 3, d: 4 }],
	legacyBoxMixed: [[1, 2], { a: 3, verylongname: 4 }],
	legacyPolygonArray: [[1, 2], [3, 4], [5, 7]],
	legacyPolygonArrayComplete: [[1, 2], [3, 4], [5, 7], [1, 2]],
	legacyPolygonObject: [{ a: 1, b: 2 }, { c: 3, d: 4 }, { e: 5, f: 7 }],
	legacyPolygonObjectComplete: [{ a: 1, b: 2 }, { c: 3, d: 4 }, { e: 5, f: 7 }, { a: 1, b: 2 }],
	legacyPolygonMixed: [[1, 2], { y: 3, x: 4 }, [5, 7]],
	legacyPolygonMixedComplete: [[1, 2], { y: 3, x: 4 }, [5, 7], { a: 1, b: 2 }],
	string: '1,2',
	number: 1,
	boolean: true,
	arrayString: ['one', 'two'],
	objectString: { a: 'one', b: 'two' },
	shortArray: [1],
	shortObject: { a: 1 },
};
const list = Object.keys(shapes)
	.map((name) => ({ name, shape: shapes[name] }));

function guard(guard: string, ...valid: Array<string>): void {
	const { [<keyof typeof Legacy>guard]: fn } = Legacy;

	test(`Domain/Filter/Operator/Geospatial/Legacy - ${guard}`, () => {
		list.forEach(({ name, shape }) => {
			const is = valid.includes(name);
			const desc = is ? 'is' : 'is not';

			assert.equal(fn(shape), is, `${JSON.stringify(shape)} ${desc} ${guard}`);
		});
	});
}

guard('isLegacyPointArray', 'legacyPointArray');
guard('isLegacyPointObject', 'legacyPointObject');
guard('isLegacyPoint', 'legacyPointArray', 'legacyPointObject');
// confirmed via mongo-catalog ground truth (geoWithinIntersectsMatrix,
// 2026-09-22): a $box array with more than 2 legacy points isn't an error —
// real MongoDB uses the first 2 and ignores the rest — so isLegacyBox now
// (correctly) also accepts every legacyPolygon* fixture below, which all
// have >=3 valid legacy points. This overlap with isLegacyPolygon is
// harmless: legacyToGeoJSON checks isLegacyPolygon first, so a 3+-point
// array is always dispatched as a Polygon, never reaches the Box branch.
guard(
	'isLegacyBox',
	'legacyBoxArray', 'legacyBoxObject', 'legacyBoxMixed',
	'legacyPolygonArray', 'legacyPolygonArrayComplete',
	'legacyPolygonObject', 'legacyPolygonObjectComplete',
	'legacyPolygonMixed', 'legacyPolygonMixedComplete',
);
guard('isLegacyPolygon', 'legacyPolygonArray', 'legacyPolygonArrayComplete', 'legacyPolygonObject', 'legacyPolygonObjectComplete', 'legacyPolygonMixed', 'legacyPolygonMixedComplete');
guard('isLegacy', 'legacy', 'legacyPointArray', 'legacyPointObject', 'legacyBoxArray', 'legacyBoxObject', 'legacyBoxMixed', 'legacyPolygonArray', 'legacyPolygonArrayComplete', 'legacyPolygonObject', 'legacyPolygonObjectComplete', 'legacyPolygonMixed', 'legacyPolygonMixedComplete');

test('Domain/Filter/Operator/Geospatial/Legacy - legacyToGeoJSON', () => {
	const point = { type: 'Point', coordinates: [1, 2] };
	const box = { type: 'Polygon', coordinates: [[[1, 2], [1, 4], [3, 4], [3, 2], [1, 2]]] };
	const polygon = { type: 'Polygon', coordinates: [[[1, 2], [3, 4], [5, 7], [1, 2]]] };
	const expectation: Partial<{ [K in keyof typeof shapes]: unknown }> = {
		legacyPointArray: point,
		legacyPointObject: point,
		legacyBoxArray: box,
		legacyBoxArrayMixed: box,
		legacyBoxObject: box,
		legacyBoxObjectMixed: box,
		legacyBoxMixed: box,
		legacyBoxMixedMixed: box,
		legacyPolygonArray: polygon,
		legacyPolygonArrayComplete: polygon,
		legacyPolygonObject: polygon,
		legacyPolygonObjectComplete: polygon,
		legacyPolygonMixed: polygon,
		legacyPolygonMixedComplete: polygon,
	};

	Object.keys(shapes)
		.forEach((name) => {
			const value = shapes[name];

			if (name in expectation) {
				assert.deepEqual(Legacy.legacyToGeoJSON(value), expectation[name], `returns ${JSON.stringify(expectation[name])} for ${JSON.stringify(value)}`);
			}
			else {
				assert.throws(() => Legacy.legacyToGeoJSON(shapes[name]), /not a legacy coordinate format/, `it throws on ${JSON.stringify(shapes[name])}`);
			}
		})
});

test('Domain/Filter/Operator/Geospatial/Legacy - legacyBoxToGeoJSON', () => {
	const box = { type: 'Polygon', coordinates: [[[1, 2], [1, 4], [3, 4], [3, 2], [1, 2]]] };

	assert.deepEqual(Legacy.legacyBoxToGeoJSON([[1, 2], [3, 4]]), box, 'builds a rectangle from exactly 2 corners');
	// confirmed via mongo-catalog ground truth (geoWithinIntersectsMatrix,
	// 2026-09-24): a $box with more than 2 corners is still just the
	// rectangle from the first 2, extras ignored — this is the regression
	// case for the bug where $box's own compiler called the generic
	// legacyToGeoJSON() instead, which (since a 3+-point array also
	// satisfies isLegacyPolygon) silently built the polygon connecting all
	// 3 points instead of a rectangle from the first 2.
	assert.deepEqual(Legacy.legacyBoxToGeoJSON([[1, 2], [3, 4], [5, 7]]), box, 'a 3rd corner is ignored, not treated as a polygon vertex');
});
