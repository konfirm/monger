import type { Point } from '@konfirm/geojson';
import * as test from 'tape';
import { each } from 'template-literal-each';
import * as Geospatial from '../../../../source/Domain/Filter/Operator/Geospatial';
import { filter } from '../../../Helper';

type N2 = [number, number];
const arnhem: N2 = [5.909662963872819, 51.9790545929402];
const berlin: N2 = [13.377711564851495, 52.51627850716736];
const paris: N2 = [2.294496321427715, 48.858267992656096];
const distances = [
	{ from: arnhem, to: berlin, direct: 832556.1046516184, vincenty: 513311.0686437368 },
	{ from: arnhem, to: paris, direct: 531050.9707307577, vincenty: 431769.92280162894 },
	{ from: paris, to: berlin, direct: 1297788.5492051572, vincenty: 881337.6642987741 },
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


test('Domain/Filter/Operator/Geospatial - exports', (t) => {
	const expected = ['$geoIntersects', '$geoWithin', '$near', '$nearSphere'];
	const actual = Object.keys(Geospatial);

	t.equal(actual.length, expected.length, `contains ${expected.length} keys`);
	expected.forEach((key) => {
		t.equal(typeof Geospatial[<keyof typeof Geospatial>key], 'function', `contains function ${key}`);
	});

	t.end();
});

test('Domain/Filter/Operator/Geospatial - $geoIntersects', (t) => {
	const geo = (type: string) => (...coordinates: Array<any>) => ({ type, coordinates });
	const point = geo('Point');
	const mpoint = geo('MultiPoint');
	const line = geo('LineString');
	const mline = geo('MultiLineString');
	const poly = geo('Polygon');
	const mpoly = geo('MultiPolygon');

	const data: Array<any> = [];
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

		data.push({ query: { left: { $geoIntersects: { $geometry: right } } }, doc: { left }, matches });
		data.push({ query: { right: { $geoIntersects: { $geometry: left } } }, doc: { right }, matches });

		t.equal(lr({ left }), matches, `${left.type} ${JSON.stringify(left.coordinates)} ${condition} with ${right.type} ${JSON.stringify(right.coordinates)}`);
		t.equal(rl({ right }), matches, `${right.type} ${JSON.stringify(right.coordinates)} ${condition} with ${left.type} ${JSON.stringify(left.coordinates)}`);
	});

	t.end();
});

test('Domain/Filter/Operator/Geospatial - $geoWithin', (t) => {
	const geojson = ['$geometry', '$centerSphere'];
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
		$center       | ${[[5, 5], 200000]}                                                               | ${[1, 5]}          | no
		$center       | ${[[5, 5], 200000]}                                                               | ${[4, 5]}          | yes
		$center       | ${[[5, 5], 200000]}                                                               | ${[9, 5]}          | no
		$centerSphere | ${[[5, 5], 200000]}                                                               | ${[1, 5]}          | no
		$centerSphere | ${[[5, 5], 200000]}                                                               | ${[4, 5]}          | yes
		$centerSphere | ${[[5, 5], 200000]}                                                               | ${[9, 5]}          | no
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

		t.equal(compiled(legacyArray), matches, `{ ${operator}: ${JSON.stringify(query)} } ${condition} ${JSON.stringify(legacyArray)}`);
		t.equal(compiled(legacyObject), matches, `{ ${operator}: ${JSON.stringify(query)} } ${condition} ${JSON.stringify(legacyObject)}`);
		t.equal(compiled(point), gmatches, `{ ${operator}: ${JSON.stringify(query)} } ${gcondition} ${JSON.stringify(point)}`);
	})

	t.end();
});

test('Domain/Filter/Operator/Geospatial - $near', (t) => {
	const $minDistance = 700000;
	const $maxDistance = 1000000;

	function run(query: any, input: any, expect: boolean) {
		const compiled = filter({ value: query });
		const condition = expect ? 'matches' : 'does not match';

		t.equal(compiled({ value: input }), expect, `${JSON.stringify(query)} ${condition} ${JSON.stringify(input)}`);
	}

	distances.forEach(({ from, to, direct, vincenty }) => {

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
		const q4 = Object.assign({}, q1, { $minDistance });
		const q5 = Object.assign({}, q2, { $minDistance });
		const q6 = { $near: { ...q3.$near, $minDistance } };
		run(q4, to, direct > $minDistance);
		run(q4, lpoint(to), direct > $minDistance);
		run(q4, gpoint(to), vincenty > $minDistance);
		run(q5, to, direct > $minDistance);
		run(q5, lpoint(to), direct > $minDistance);
		run(q5, gpoint(to), vincenty > $minDistance);
		run(q6, to, direct > $minDistance);
		run(q6, lpoint(to), direct > $minDistance);
		run(q6, gpoint(to), vincenty > $minDistance);

		// no $minDistance, $maxDistance
		const q7 = Object.assign({}, q1, { $maxDistance });
		const q8 = Object.assign({}, q2, { $maxDistance });
		const q9 = { $near: { ...q3.$near, $maxDistance } };
		run(q7, to, direct < $maxDistance);
		run(q7, lpoint(to), direct < $maxDistance);
		run(q7, gpoint(to), vincenty < $maxDistance);
		run(q8, to, direct < $maxDistance);
		run(q8, lpoint(to), direct < $maxDistance);
		run(q8, gpoint(to), vincenty < $maxDistance);
		run(q9, to, direct < $maxDistance);
		run(q9, lpoint(to), direct < $maxDistance);
		run(q9, gpoint(to), vincenty < $maxDistance);

		// $minDistance, $maxDistance
		const q10 = Object.assign({}, q1, { $minDistance, $maxDistance });
		const q11 = Object.assign({}, q2, { $minDistance, $maxDistance });
		const q12 = { $near: { ...q3.$near, $minDistance, $maxDistance } };
		run(q10, to, direct > $minDistance && direct < $maxDistance);
		run(q10, lpoint(to), direct > $minDistance && direct < $maxDistance);
		run(q10, gpoint(to), vincenty > $minDistance && vincenty < $maxDistance);
		run(q11, to, direct > $minDistance && direct < $maxDistance);
		run(q11, lpoint(to), direct > $minDistance && direct < $maxDistance);
		run(q11, gpoint(to), vincenty > $minDistance && vincenty < $maxDistance);
		run(q12, to, direct > $minDistance && direct < $maxDistance);
		run(q12, lpoint(to), direct > $minDistance && direct < $maxDistance);
		run(q12, gpoint(to), vincenty > $minDistance && vincenty < $maxDistance);
	});

	t.end();
});

test('Domain/Filter/Operator/Geospatial - $nearSphere', (t) => {
	const $minDistance = 700000;
	const $maxDistance = 1000000;

	function run(query: any, input: any, expect: boolean) {
		const compiled = filter({ value: query });
		const condition = expect ? 'matches' : 'does not match';

		t.equal(compiled({ value: input }), expect, `${JSON.stringify(query)} ${condition} ${JSON.stringify(input)}`);
	}

	distances.forEach(({ from, to, vincenty }) => {

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
		const q4 = Object.assign({}, q1, { $minDistance });
		const q5 = Object.assign({}, q2, { $minDistance });
		const q6 = { $nearSphere: { ...q3.$nearSphere, $minDistance } };
		run(q4, to, vincenty > $minDistance);
		run(q4, lpoint(to), vincenty > $minDistance);
		run(q4, gpoint(to), vincenty > $minDistance);
		run(q5, to, vincenty > $minDistance);
		run(q5, lpoint(to), vincenty > $minDistance);
		run(q5, gpoint(to), vincenty > $minDistance);
		run(q6, to, vincenty > $minDistance);
		run(q6, lpoint(to), vincenty > $minDistance);
		run(q6, gpoint(to), vincenty > $minDistance);

		// no $minDistance, $maxDistance
		const q7 = Object.assign({}, q1, { $maxDistance });
		const q8 = Object.assign({}, q2, { $maxDistance });
		const q9 = { $nearSphere: { ...q3.$nearSphere, $maxDistance } };
		run(q7, to, vincenty < $maxDistance);
		run(q7, lpoint(to), vincenty < $maxDistance);
		run(q7, gpoint(to), vincenty < $maxDistance);
		run(q8, to, vincenty < $maxDistance);
		run(q8, lpoint(to), vincenty < $maxDistance);
		run(q8, gpoint(to), vincenty < $maxDistance);
		run(q9, to, vincenty < $maxDistance);
		run(q9, lpoint(to), vincenty < $maxDistance);
		run(q9, gpoint(to), vincenty < $maxDistance);

		// $minDistance, $maxDistance
		const q10 = Object.assign({}, q1, { $minDistance, $maxDistance });
		const q11 = Object.assign({}, q2, { $minDistance, $maxDistance });
		const q12 = { $nearSphere: { ...q3.$nearSphere, $minDistance, $maxDistance } };
		run(q10, to, vincenty > $minDistance && vincenty < $maxDistance);
		run(q10, lpoint(to), vincenty > $minDistance && vincenty < $maxDistance);
		run(q10, gpoint(to), vincenty > $minDistance && vincenty < $maxDistance);
		run(q11, to, vincenty > $minDistance && vincenty < $maxDistance);
		run(q11, lpoint(to), vincenty > $minDistance && vincenty < $maxDistance);
		run(q11, gpoint(to), vincenty > $minDistance && vincenty < $maxDistance);
		run(q12, to, vincenty > $minDistance && vincenty < $maxDistance);
		run(q12, lpoint(to), vincenty > $minDistance && vincenty < $maxDistance);
		run(q12, gpoint(to), vincenty > $minDistance && vincenty < $maxDistance);
	});

	t.end();
});
