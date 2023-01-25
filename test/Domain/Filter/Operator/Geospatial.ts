import * as test from 'tape';
import each from 'template-literal-each';
import * as Geospatial from '../../../../source/Domain/Filter/Operator/Geospatial';
import { filter } from '../../../Helper';

test('Domain/Filter/Operator/Geospatial - exports', (t) => {
	const expected = ['$geoIntersects', '$geoWithin', '$near', '$nearSphere'];
	const actual = Object.keys(Geospatial);

	t.equal(actual.length, expected.length, `contains ${expected.length} keys`);
	expected.forEach((key) => {
		t.equal(typeof Geospatial[<keyof typeof Geospatial>key], 'function', `contains function ${key}`);
	});

	t.end();
});

const geometry = [
	{
		type: 'Point',
		coordinates: [1, 1],
	},
	{
		type: 'MultiPoint',
		coordinates: [[0, 0], [1, 1], [2, 2]],
	},
	{
		type: 'LineString',
		coordinates: [[0, 0], [2, 2]],
	},
	{
		type: 'MultiLineString',
		coordinates: [
			[[0, 0], [2, 2]],
			[[2, 0], [0, 2]]
		],
	},
	// {
	// 	type: 'Polygon',
	// 	coordinates: [
	// 		[[0, 0], [2, 0], [2, 2], [0, 2], [0, 0]],
	// 	],
	// },
	// {
	// 	type: 'MultiPolygon',
	// 	coordinates: [
	// 		[
	// 			[[0, 0], [2, 0], [2, 2], [0, 2], [0, 0]],
	// 		],
	// 		[
	// 			[[1, 1], [3, 1], [3, 3], [1, 3], [1, 1]],
	// 		],
	// 	],
	// },
];

test('Domain/Filter/Operator/Geospatial - $geoIntersects', (t) => {
	geometry.forEach(($geometry) => {
		geometry.forEach((shape) => {
			const compiled = filter({ shape: { $geoIntersects: { $geometry } } });

			t.true(compiled({ shape }), `${shape.type} ${JSON.stringify(shape.coordinates)} intersects with ${$geometry.type} ${JSON.stringify($geometry.coordinates)}`);
		});
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

	each`
		left           | right                                                                                          | intersects
		---------------|------------------------------------------------------------------------------------------------|------------
		${point(0, 0)} | ${point(1, 0)}                                                                                 | no
		${point(0, 0)} | ${point(0, 1)}                                                                                 | no
		${point(0, 0)} | ${point(1, 1)}                                                                                 | no
		${point(1, 0)} | ${point(1, 0)}                                                                                 | yes
		${point(1, 1)} | ${mpoint([0, 0], [2, 2])}                                                                      | no
		${point(1, 1)} | ${mpoint([0, 0], [1, 1])}                                                                      | yes
		${point(1, 1)} | ${mpoint([1, 1], [2, 2])}                                                                      | yes
		${point(2, 2)} | ${line([0, 0], [1, 1])}                                                                        | no
		${point(2, 2)} | ${line([3, 3], [4, 4])}                                                                        | no
		${point(2, 2)} | ${line([0, 0], [4, 4])}                                                                        | yes
		${point(2, 2)} | ${mline([[3, 0], [0, 3]], [[0, 0], [1, 1]])}                                                   | no
		${point(2, 2)} | ${mline([[3, 0], [0, 3]], [[3, 3], [4, 4]])}                                                   | no
		${point(2, 2)} | ${mline([[3, 0], [0, 3]], [[0, 0], [4, 4]])}                                                   | yes
		${point(3, 3)} | ${poly([[0, 0], [0, 2], [2, 2], [2, 0], [0, 0]])}                                              | TODO no
		${point(3, 3)} | ${poly([[4, 4], [4, 7], [7, 7], [7, 4], [4, 4]])}                                              | TODO no
		${point(3, 3)} | ${poly([[0, 0], [0, 7], [7, 7], [7, 0], [0, 0]])}                                              | TODO yes
		${point(3, 3)} | ${mpoly([[[8, 8], [8, 9], [9, 9], [9, 8], [8, 8]], [[0, 0], [0, 2], [2, 2], [2, 0], [0, 0]]])} | TODO no
		${point(3, 3)} | ${mpoly([[[8, 8], [8, 9], [9, 9], [9, 8], [8, 8]], [[4, 4], [4, 7], [7, 7], [7, 4], [4, 4]]])} | TODO no
		${point(3, 3)} | ${mpoly([[[8, 8], [8, 9], [9, 9], [9, 8], [8, 8]], [[0, 0], [0, 7], [7, 7], [7, 0], [0, 0]]])} | TODO yes
	`((record) => {
		const { left, right, intersects } = record as any;
		const lr = filter({ left: { $geoIntersects: { $geometry: right } } });
		const rl = filter({ right: { $geoIntersects: { $geometry: left } } });
		const matches = intersects === 'yes';
		const condition = matches ? 'intersects' : 'does not intersect';

		t.equal(lr({ left }), matches, `${left.type} ${JSON.stringify(left.coordinates)} ${condition} with ${right.type} ${JSON.stringify(right.coordinates)}`);
		t.equal(rl({ right }), matches, `${right.type} ${JSON.stringify(right.coordinates)} ${condition} with ${left.type} ${JSON.stringify(left.coordinates)}`);
	});

	t.end();
});

test('Domain/Filter/Operator/Geospatial - $geoWithin', (t) => {
	t.end();
});

test('Domain/Filter/Operator/Geospatial - $near', (t) => {
	t.end();
});

test('Domain/Filter/Operator/Geospatial - $nearSphere', (t) => {
	t.end();
});
