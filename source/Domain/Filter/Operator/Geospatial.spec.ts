import type { Point } from '@konfirm/geojson';
import { test } from 'node:test';
import * as assert from 'node:assert/strict';
import { each } from 'template-literal-each';
import * as Geospatial from './Geospatial';
import { filter } from '../../Filter';

type N2 = [number, number];
const arnhem: N2 = [5.909662963872819, 51.9790545929402];
const berlin: N2 = [13.377711564851495, 52.51627850716736];
const paris: N2 = [2.294496321427715, 48.858267992656096];
const distances = [
	{ from: arnhem, to: berlin, geodesic: 512250.4595093529, raw: 7.4873466221751155 },
	{ from: arnhem, to: paris, geodesic: 431670.92602336535, raw: 4.775849542977735 },
	{ from: paris, to: berlin, geodesic: 880073.8745004161, raw: 11.671276753480578 },
];

function gpoint(coordinates: N2): Point {
	return { type: 'Point', coordinates };
}
function qpoint(coordinates: N2): { $geometry: Point } {
	return { $geometry: gpoint(coordinates) };
}
function lpoint([x, y]: N2) {
	return { x, y };
}

test('Domain/Filter/Operator/Geospatial - exports', () => {
	const expected = ['$geoIntersects', '$geoWithin', '$near', '$nearSphere'];
	const actual = Object.keys(Geospatial);

	assert.equal(actual.length, expected.length, `contains ${expected.length} keys`);
	expected.forEach((key) => {
		assert.equal(typeof Geospatial[<keyof typeof Geospatial>key], 'function', `contains function ${key}`);
	});
});

test('Domain/Filter/Operator/Geospatial - $geoIntersects', () => {
	const geo = (type: string) => (...coordinates: Array<any>) => ({ type, coordinates });
	const point = geo('Point');
	const mpoint = geo('MultiPoint');
	const line = geo('LineString');
	const mline = geo('MultiLineString');
	const poly = geo('Polygon');
	const mpoly = geo('MultiPolygon');

	each`
		left           | right                                                                                            | intersects
		---------------|--------------------------------------------------------------------------------------------------|------------
		${point(0, 0)} | ${point(1, 0)}                                                                                   | no
		${point(0, 0)} | ${point(0, 1)}                                                                                   | no
		${point(0, 0)} | ${point(1, 1)}                                                                                   | no
		${point(1, 0)} | ${point(1, 0)}                                                                                   | yes
		${point(1, 1)} | ${mpoint([0, 0], [2, 2])}                                                                        | no
		${point(1, 1)} | ${mpoint([0, 0], [1, 1])}                                                                        | yes
		${point(1, 1)} | ${mpoint([1, 1], [2, 2])}                                                                        | yes
		${point(2, 2)} | ${line([0, 0], [1, 1])}                                                                          | no
		${point(2, 2)} | ${line([3, 3], [4, 4])}                                                                          | no
		${point(2, 2)} | ${line([0, 0], [4, 4])}                                                                          | yes
		${point(2, 2)} | ${mline([[3, 0], [0, 3]], [[0, 0], [1, 1]])}                                                     | no
		${point(2, 2)} | ${mline([[3, 0], [0, 3]], [[3, 3], [4, 4]])}                                                     | no
		${point(2, 2)} | ${mline([[3, 0], [0, 3]], [[0, 0], [4, 4]])}                                                     | yes
		${point(3, 3)} | ${poly([[0, 0], [0, 2], [2, 2], [2, 0], [0, 0]])}                                                | no
		${point(3, 3)} | ${poly([[4, 4], [4, 7], [7, 7], [7, 4], [4, 4]])}                                                | no
		${point(3, 3)} | ${poly([[0, 0], [0, 7], [7, 7], [7, 0], [0, 0]])}                                                | yes
		${point(3, 3)} | ${mpoly([[[8, 8], [8, 9], [9, 9], [9, 8], [8, 8]]], [[[0, 0], [0, 2], [2, 2], [2, 0], [0, 0]]])} | no
		${point(3, 3)} | ${mpoly([[[8, 8], [8, 9], [9, 9], [9, 8], [8, 8]]], [[[4, 4], [4, 7], [7, 7], [7, 4], [4, 4]]])} | no
		${point(3, 3)} | ${mpoly([[[8, 8], [8, 9], [9, 9], [9, 8], [8, 8]]], [[[0, 0], [0, 7], [7, 7], [7, 0], [0, 0]]])} | yes
		${point(3, 3)} | ${mpoly([[[0, 0], [0, 7], [7, 7], [7, 0], [0, 0]]], [[[8, 8], [8, 9], [9, 9], [9, 8], [8, 8]]])} | yes
	`((record) => {
		const { left, right, intersects } = record as any;
		const lr = filter({ left: { $geoIntersects: { $geometry: right } } });
		const rl = filter({ right: { $geoIntersects: { $geometry: left } } });
		const matches = intersects === 'yes';
		const condition = matches ? 'intersects' : 'does not intersect';

		assert.equal(lr({ left }), matches, `${left.type} ${JSON.stringify(left.coordinates)} ${condition} with ${right.type} ${JSON.stringify(right.coordinates)}`);
		assert.equal(rl({ right }), matches, `${right.type} ${JSON.stringify(right.coordinates)} ${condition} with ${left.type} ${JSON.stringify(left.coordinates)}`);
	});
});

test('Domain/Filter/Operator/Geospatial - $geoWithin', () => {
	// confirmed via mongo-catalog ground truth (geoWithinIntersectsMatrix,
	// 2026-09-22): $box/$polygon/$center also match a GeoJSON-shaped field,
	// not just $geometry/$centerSphere — every $geoWithin specifier does now.
	const geojson = ['$geometry', '$centerSphere', '$box', '$polygon', '$center'];
	each`
		operator      | query                                                                             | position           | within
		--------------|-----------------------------------------------------------------------------------|--------------------|--------
		$box          | ${[[1, 1], [5, 50]]}                                                              | ${[0, 0]}          | no
		$box          | ${[{ a: 1, b: 1 }, [5, 50]]}                                                      | ${[0, 0]}          | no
		$box          | ${[[1, 1], [5, 50]]}                                                              | ${[2, 25]}         | yes
		$box          | ${[[1, 1], { q: 5, w: 50 }]}                                                      | ${[2, 25]}         | yes
		$box          | ${[[1, 1], [5, 50]]}                                                              | ${[7, 25]}         | no
		$box          | ${[{ a: 1, b: 1 }, { c: 5, d: 50 }]}                                              | ${[7, 25]}         | no
		$polygon      | ${[[1, 1], [1, 50], [5, 50], [5, 1]]}                                             | ${[0, 0]}          | no
		$polygon      | ${[{ a: 1, b: 1 }, { c: 1, d: 50 }, { e: 5, f: 50 }, { g: 5, h: 1 }]}             | ${[0, 0]}          | no
		$polygon      | ${[[1, 1], [1, 50], [5, 50], [5, 1]]}                                             | ${[2, 25]}         | yes
		$polygon      | ${[{ z: 1, y: 1 }, { x: 1, y: 50 }, { y: 5, x: 50 }, { w: 5, q: 1 }]}             | ${[2, 25]}         | yes
		$polygon      | ${[[1, 1], [1, 50], [5, 50], [5, 1]]}                                             | ${[7, 25]}         | no
		$geometry     | ${{ type: 'Polygon', coordinates: [[[1, 1], [1, 50], [5, 50], [5, 1], [1, 1]]] }} | ${[0, 0]}          | no
		$geometry     | ${{ type: 'Polygon', coordinates: [[[1, 1], [1, 50], [5, 50], [5, 1], [1, 1]]] }} | ${[2, 25]}         | yes
		$geometry     | ${{ type: 'Polygon', coordinates: [[[1, 1], [1, 50], [5, 50], [5, 1], [1, 1]]] }} | ${[7, 25]}         | no
		$center       | ${[[5, 5], 2]}                                                                    | ${[1, 5]}          | no
		$center       | ${[[5, 5], 2]}                                                                    | ${[4, 5]}          | yes
		$center       | ${[[5, 5], 2]}                                                                    | ${[9, 5]}          | no
		$centerSphere | ${[[5, 5], 0.04]}                                                                 | ${[1, 5]}          | no
		$centerSphere | ${[[5, 5], 0.04]}                                                                 | ${[4, 5]}          | yes
		$centerSphere | ${[[5, 5], 0.04]}                                                                 | ${[9, 5]}          | no
	`(({ operator, query, position, within }: any) => {
		const [x, y] = position;
		const legacyArray = { value: [x, y] };
		const legacyObject = { value: { x, y } };
		const point = { value: { type: 'Point', coordinates: [x, y] } };
		const compiled = filter({ value: { $geoWithin: { [operator]: query } } });
		const matches = within === 'yes';
		const condition = matches ? 'contains' : 'does not contain';
		const gmatches = matches && geojson.includes(operator);
		const gcondition = gmatches ? 'contains' : 'does not contain';

		assert.equal(compiled(legacyArray), matches, `{ ${operator}: ${JSON.stringify(query)} } ${condition} ${JSON.stringify(legacyArray)}`);
		assert.equal(compiled(legacyObject), matches, `{ ${operator}: ${JSON.stringify(query)} } ${condition} ${JSON.stringify(legacyObject)}`);
		assert.equal(compiled(point), gmatches, `{ ${operator}: ${JSON.stringify(query)} } ${gcondition} ${JSON.stringify(point)}`);
	});
});

test('Domain/Filter/Operator/Geospatial - $near', () => {
	// GeoJSON ($geometry) queries compare in metres (spherical, regardless of whether the matched-against field is GeoJSON or a legacy point)
	const $minDistance = 700000;
	const $maxDistance = 1000000;
	// legacy-point queries compare raw coordinate-space Euclidean distance (degrees)
	const $minDistanceDeg = 6;
	const $maxDistanceDeg = 10;

	function run(query: any, input: any, expect: boolean) {
		const compiled = filter({ value: query });
		const condition = expect ? 'matches' : 'does not match';

		assert.equal(compiled({ value: input }), expect, `${JSON.stringify(query)} ${condition} ${JSON.stringify(input)}`);
	}

	distances.forEach(({ from, to, geodesic, raw }) => {

		// no $minDistance, no $maxDistance
		const q1 = { $near: from };
		const q2 = { $near: lpoint(from) };
		const q3 = { $near: qpoint(from) };
		run(q1, to, true);
		run(q1, lpoint(to), true);
		run(q1, gpoint(to), true);
		run(q2, to, true);
		run(q2, lpoint(to), true);
		run(q2, gpoint(to), true);
		run(q3, to, true);
		run(q3, lpoint(to), true);
		run(q3, gpoint(to), true);

		// $minDistance, no $maxDistance
		const q4 = Object.assign({}, q1, { $minDistance: $minDistanceDeg });
		const q5 = Object.assign({}, q2, { $minDistance: $minDistanceDeg });
		const q6 = { $near: { ...q3.$near, $minDistance } };
		run(q4, to, raw > $minDistanceDeg);
		run(q4, lpoint(to), raw > $minDistanceDeg);
		run(q4, gpoint(to), raw > $minDistanceDeg);
		run(q5, to, raw > $minDistanceDeg);
		run(q5, lpoint(to), raw > $minDistanceDeg);
		run(q5, gpoint(to), raw > $minDistanceDeg);
		run(q6, to, geodesic > $minDistance);
		run(q6, lpoint(to), geodesic > $minDistance);
		run(q6, gpoint(to), geodesic > $minDistance);

		// no $minDistance, $maxDistance
		const q7 = Object.assign({}, q1, { $maxDistance: $maxDistanceDeg });
		const q8 = Object.assign({}, q2, { $maxDistance: $maxDistanceDeg });
		const q9 = { $near: { ...q3.$near, $maxDistance } };
		run(q7, to, raw < $maxDistanceDeg);
		run(q7, lpoint(to), raw < $maxDistanceDeg);
		run(q7, gpoint(to), raw < $maxDistanceDeg);
		run(q8, to, raw < $maxDistanceDeg);
		run(q8, lpoint(to), raw < $maxDistanceDeg);
		run(q8, gpoint(to), raw < $maxDistanceDeg);
		run(q9, to, geodesic < $maxDistance);
		run(q9, lpoint(to), geodesic < $maxDistance);
		run(q9, gpoint(to), geodesic < $maxDistance);

		// $minDistance, $maxDistance
		const q10 = Object.assign({}, q1, { $minDistance: $minDistanceDeg, $maxDistance: $maxDistanceDeg });
		const q11 = Object.assign({}, q2, { $minDistance: $minDistanceDeg, $maxDistance: $maxDistanceDeg });
		const q12 = { $near: { ...q3.$near, $minDistance, $maxDistance } };
		run(q10, to, raw > $minDistanceDeg && raw < $maxDistanceDeg);
		run(q10, lpoint(to), raw > $minDistanceDeg && raw < $maxDistanceDeg);
		run(q10, gpoint(to), raw > $minDistanceDeg && raw < $maxDistanceDeg);
		run(q11, to, raw > $minDistanceDeg && raw < $maxDistanceDeg);
		run(q11, lpoint(to), raw > $minDistanceDeg && raw < $maxDistanceDeg);
		run(q11, gpoint(to), raw > $minDistanceDeg && raw < $maxDistanceDeg);
		run(q12, to, geodesic > $minDistance && geodesic < $maxDistance);
		run(q12, lpoint(to), geodesic > $minDistance && geodesic < $maxDistance);
		run(q12, gpoint(to), geodesic > $minDistance && geodesic < $maxDistance);
	});
});

test('Domain/Filter/Operator/Geospatial - $nearSphere', () => {
	// mean radius, matches @konfirm/geojson's internal (unexported) constant
	const EARTH_RADIUS = 6_371_008.7714;
	// GeoJSON ($geometry) queries express $minDistance/$maxDistance in metres
	const $minDistance = 700000;
	const $maxDistance = 1000000;
	// legacy-point queries express $minDistance/$maxDistance in radians
	const $minDistanceRad = $minDistance / EARTH_RADIUS;
	const $maxDistanceRad = $maxDistance / EARTH_RADIUS;

	function run(query: any, input: any, expect: boolean) {
		const compiled = filter({ value: query });
		const condition = expect ? 'matches' : 'does not match';

		assert.equal(compiled({ value: input }), expect, `${JSON.stringify(query)} ${condition} ${JSON.stringify(input)}`);
	}

	distances.forEach(({ from, to, geodesic }) => {

		// no $minDistance, no $maxDistance
		const q1 = { $nearSphere: from };
		const q2 = { $nearSphere: lpoint(from) };
		const q3 = { $nearSphere: qpoint(from) };
		run(q1, to, true);
		run(q1, lpoint(to), true);
		run(q1, gpoint(to), true);
		run(q2, to, true);
		run(q2, lpoint(to), true);
		run(q2, gpoint(to), true);
		run(q3, to, true);
		run(q3, lpoint(to), true);
		run(q3, gpoint(to), true);

		// $minDistance, no $maxDistance
		const q4 = Object.assign({}, q1, { $minDistance: $minDistanceRad });
		const q5 = Object.assign({}, q2, { $minDistance: $minDistanceRad });
		const q6 = { $nearSphere: { ...q3.$nearSphere, $minDistance } };
		run(q4, to, geodesic > $minDistance);
		run(q4, lpoint(to), geodesic > $minDistance);
		run(q4, gpoint(to), geodesic > $minDistance);
		run(q5, to, geodesic > $minDistance);
		run(q5, lpoint(to), geodesic > $minDistance);
		run(q5, gpoint(to), geodesic > $minDistance);
		run(q6, to, geodesic > $minDistance);
		run(q6, lpoint(to), geodesic > $minDistance);
		run(q6, gpoint(to), geodesic > $minDistance);

		// no $minDistance, $maxDistance
		const q7 = Object.assign({}, q1, { $maxDistance: $maxDistanceRad });
		const q8 = Object.assign({}, q2, { $maxDistance: $maxDistanceRad });
		const q9 = { $nearSphere: { ...q3.$nearSphere, $maxDistance } };
		run(q7, to, geodesic < $maxDistance);
		run(q7, lpoint(to), geodesic < $maxDistance);
		run(q7, gpoint(to), geodesic < $maxDistance);
		run(q8, to, geodesic < $maxDistance);
		run(q8, lpoint(to), geodesic < $maxDistance);
		run(q8, gpoint(to), geodesic < $maxDistance);
		run(q9, to, geodesic < $maxDistance);
		run(q9, lpoint(to), geodesic < $maxDistance);
		run(q9, gpoint(to), geodesic < $maxDistance);

		// $minDistance, $maxDistance
		const q10 = Object.assign({}, q1, { $minDistance: $minDistanceRad, $maxDistance: $maxDistanceRad });
		const q11 = Object.assign({}, q2, { $minDistance: $minDistanceRad, $maxDistance: $maxDistanceRad });
		const q12 = { $nearSphere: { ...q3.$nearSphere, $minDistance, $maxDistance } };
		run(q10, to, geodesic > $minDistance && geodesic < $maxDistance);
		run(q10, lpoint(to), geodesic > $minDistance && geodesic < $maxDistance);
		run(q10, gpoint(to), geodesic > $minDistance && geodesic < $maxDistance);
		run(q11, to, geodesic > $minDistance && geodesic < $maxDistance);
		run(q11, lpoint(to), geodesic > $minDistance && geodesic < $maxDistance);
		run(q11, gpoint(to), geodesic > $minDistance && geodesic < $maxDistance);
		run(q12, to, geodesic > $minDistance && geodesic < $maxDistance);
		run(q12, lpoint(to), geodesic > $minDistance && geodesic < $maxDistance);
		run(q12, gpoint(to), geodesic > $minDistance && geodesic < $maxDistance);
	});
});
