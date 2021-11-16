import * as test from 'tape';
import each from 'template-literal-each';
import * as Intersect from '../../../../../source/Domain/Filter/Operator/Geospatial/Intersect';

test('Domain/Filter/Operator/Geospatial/Intersect - exports', (t) => {
	const expected = [
		'PointPoint',
		'PointMultiPoint',
		'PointLineString',
		'PointMultiLineString',
		'PointPolygon',
		'PointMultiPolygon',
		'MultiPointPoint',
		'MultiPointMultiPoint',
		'MultiPointLineString',
		'MultiPointMultiLineString',
		'MultiPointPolygon',
		'MultiPointMultiPolygon',
		'LineStringPoint',
		'LineStringMultiPoint',
		'LineStringLineString',
		'LineStringMultiLineString',
		'LineStringPolygon',
		'LineStringMultiPolygon',
		'MultiLineStringPoint',
		'MultiLineStringMultiPoint',
		'MultiLineStringLineString',
		'MultiLineStringMultiLineString',
		'MultiLineStringPolygon',
		'MultiLineStringMultiPolygon',
		'PolygonPoint',
		'PolygonMultiPoint',
		'PolygonLineString',
		'PolygonMultiLineString',
		'PolygonPolygon',
		'PolygonMultiPolygon',
		'MultiPolygonPoint',
		'MultiPolygonMultiPoint',
		'MultiPolygonLineString',
		'MultiPolygonMultiLineString',
		'MultiPolygonPolygon',
		'MultiPolygonMultiPolygon'
	];
	const actual = Object.keys(Intersect);

	t.equal(actual.length, expected.length, `contains ${expected.length} keys`);
	expected.forEach((key) => {
		t.equal(typeof Intersect[<keyof typeof Intersect>key], 'function', `contains function ${key}`);
	});

	t.end();
});


test('Domain/Filter/Operation/Geospatial/Intersect - PointPoint', (t) => {
	const { PointPoint } = Intersect;

	each`
		one          | two          | intersect
		-------------|--------------|-----------
		${[0, 0]}    | ${[0, 1]}    | no
		${[0, 0]}    | ${[0, 0]}    | yes
		${[0, 0, 0]} | ${[0, 0]}    | no
		${[0, 0]}    | ${[0, 0, 0]} | no
		${[1, 1, 1]} | ${[1, 1]}    | no
		${[0, 0, 0]} | ${[0, 0, 0]} | yes
	`((record) => {
		const { one, two, intersect } = record as any;
		const match = intersect === 'yes';
		const message = match ? 'intersects' : 'does not intersect';

		t.equal(PointPoint(one, two), match, `${JSON.stringify(one)} ${message} with ${JSON.stringify(two)}`);
	});

	t.end();
});

['PointMultiPoint', 'MultiPointPoint'].forEach((fun, index) => {
	test(`Domain/Filter/Operation/Geospatial/Intersect - ${fun}`, (t) => {
		const { [fun as keyof typeof Intersect]: invoke } = Intersect;

		each`
			one          | two                       | intersect
			-------------|---------------------------|-----------
			${[0, 0]}    | ${[[0, 1], [1, 0]]}       | no
			${[0, 0]}    | ${[[0, 1], [0, 0]]}       | yes
			${[0, 0, 0]} | ${[[0, 1], [1, 0]]}       | no
			${[0, 0, 0]} | ${[[0, 1], [0, 0]]}       | no
			${[0, 0]}    | ${[[0, 1, 0], [1, 0, 0]]} | no
			${[0, 0]}    | ${[[0, 1, 0], [0, 0, 0]]} | no
			${[0, 0, 0]} | ${[[0, 1, 0], [1, 0, 0]]} | no
			${[0, 0, 0]} | ${[[0, 1, 0], [0, 0, 0]]} | yes
			${[1, 1]}    | ${[[0, 0], [2, 2]]}       | no
			${[1, 1, 1]} | ${[[0, 0], [2, 2]]}       | no
			${[1, 1, 1]} | ${[[0, 0, 0], [2, 2, 2]]} | no
		`((record) => {
			const { one, two, intersect } = record as any;
			const [a, b] = index ? [two, one] : [one, two];
			const match = intersect === 'yes';
			const message = match ? 'intersects' : 'does not intersect';

			t.equal(invoke(a, b), match, `${JSON.stringify(a)} ${message} with ${JSON.stringify(b)}`);
		});

		t.end();
	});
});

['PointLineString', 'LineStringPoint'].forEach((fun, index) => {
	test(`Domain/Filter/Operation/Geospatial/Intersect - ${fun}`, (t) => {
		const { [fun as keyof typeof Intersect]: invoke } = Intersect;

		each`
			one          | two                       | intersect
			-------------|---------------------------|-----------
			${[0, 0]}    | ${[[0, 1], [1, 0]]}       | no
			${[0, 0]}    | ${[[0, 1], [0, 0]]}       | yes
			${[0, 0, 0]} | ${[[0, 1], [1, 0]]}       | no
			${[0, 0, 0]} | ${[[0, 1], [0, 0]]}       | no
			${[0, 0]}    | ${[[0, 1, 0], [1, 0, 0]]} | no
			${[0, 0]}    | ${[[0, 1, 0], [0, 0, 0]]} | no
			${[0, 0, 0]} | ${[[0, 1, 0], [1, 0, 0]]} | no
			${[0, 0, 0]} | ${[[0, 1, 0], [0, 0, 0]]} | yes
			${[1, 1]}    | ${[[0, 0], [2, 2]]}       | yes
			${[1, 1, 1]} | ${[[0, 0], [2, 2]]}       | no
			${[1, 1, 1]} | ${[[0, 0, 0], [2, 2, 2]]} | yes
		`((record) => {
			const { one, two, intersect } = record as any;
			const [a, b] = index ? [two, one] : [one, two];
			const match = intersect === 'yes';
			const message = match ? 'intersects' : 'does not intersect';

			t.equal(invoke(a, b), match, `${JSON.stringify(a)} ${message} with ${JSON.stringify(b)}`);
		});

		t.end();
	});
});

['PointMultiLineString', 'MultiLineStringPoint'].forEach((fun, index) => {

	test(`Domain/Filter/Operation/Geospatial/Intersect - ${fun}`, (t) => {
		const { [fun as keyof typeof Intersect]: invoke } = Intersect;

		each`
			one          | two                                                 | intersect
			-------------|-----------------------------------------------------|-----------
			${[0, 0]}    | ${[[[0, 1], [1, 0]], [[0, 2], [2, 0]]]}             | no
			${[0, 0]}    | ${[[[0, 1], [0, 0]], [[0, 2], [2, 0]]]}             | yes
			${[0, 0]}    | ${[[[0, 2], [2, 0]], [[0, 1], [0, 0]]]}             | yes
			${[0, 0, 0]} | ${[[[0, 1], [1, 0]], [[0, 2], [2, 0]]]}             | no
			${[0, 0, 0]} | ${[[[0, 1], [0, 0]], [[0, 2], [2, 0]]]}             | no
			${[0, 0, 0]} | ${[[[0, 2], [2, 0]], [[0, 1], [0, 0]]]}             | no
			${[0, 0]}    | ${[[[0, 1, 0], [1, 0, 0]], [[0, 2, 0], [2, 0, 0]]]} | no
			${[0, 0]}    | ${[[[0, 1, 0], [0, 0, 0]], [[0, 2, 0], [2, 0, 0]]]} | no
			${[0, 0, 0]} | ${[[[0, 1, 0], [1, 0, 0]], [[0, 2, 0], [2, 0, 0]]]} | no
			${[0, 0, 0]} | ${[[[0, 1, 0], [0, 0, 0]], [[0, 2, 0], [2, 0, 0]]]} | yes
			${[0, 0, 0]} | ${[[[0, 2, 0], [2, 0, 0]], [[0, 1, 0], [0, 0, 0]]]} | yes
			${[1, 1]}    | ${[[[0, 0], [2, 2]], [[0, 1], [1, 0]]]}             | yes
			${[1, 1]}    | ${[[[0, 1], [1, 0]], [[0, 0], [2, 2]]]}             | yes
			${[1, 1, 1]} | ${[[[0, 0], [2, 2]], [[0, 1], [1, 0]]]}             | no
			${[1, 1, 1]} | ${[[[0, 0, 0], [2, 2, 2]], [[0, 1, 0], [1, 0, 0]]]} | yes
			${[1, 1, 1]} | ${[[[0, 1, 0], [1, 0, 0]], [[0, 0, 0], [2, 2, 2]]]} | yes
		`((record) => {
			const { one, two, intersect } = record as any;
			const [a, b] = index ? [two, one] : [one, two];
			const match = intersect === 'yes';
			const message = match ? 'intersects' : 'does not intersect';

			t.equal(invoke(a, b), match, `${JSON.stringify(a)} ${message} with ${JSON.stringify(b)}`);
		});

		t.end();
	});
});

/*
['PointPolygon', 'PolygonPoint'].forEach((fun, index) => {

	test(`Domain/Filter/Operation/Geospatial/Intersect - ${fun}`, (t) => {
		const { [fun as keyof typeof Intersect]: invoke } = Intersect;

		each`
			one          | two                                                 | intersect
			-------------|-----------------------------------------------------|-----------
		`((record) => {
			const { one, two, intersect } = record as any;
			const [a, b] = index ? [two, one] : [one, two];
			const match = intersect === 'yes';
			const message = match ? 'intersects' : 'does not intersect';

			t.equal(invoke(a, b), match, `${JSON.stringify(a)} ${message} with ${JSON.stringify(b)}`);
		});

		t.end();
	});
});

['PointMultiPolygon', 'MultiPolygonPoint'].forEach((fun, index) => {

	test(`Domain/Filter/Operation/Geospatial/Intersect - ${fun}`, (t) => {
		const { [fun as keyof typeof Intersect]: invoke } = Intersect;

		each`
			one          | two                                                 | intersect
			-------------|-----------------------------------------------------|-----------
		`((record) => {
			const { one, two, intersect } = record as any;
			const [a, b] = index ? [two, one] : [one, two];
			const match = intersect === 'yes';
			const message = match ? 'intersects' : 'does not intersect';

			t.equal(invoke(a, b), match, `${JSON.stringify(a)} ${message} with ${JSON.stringify(b)}`);
		});

		t.end();
	});
});


test('Domain/Filter/Operation/Geospatial/Intersect - MultiPointMultiPoint', (t) => {
	// const { MultiPointMultiPoint }  = Intersect;

	t.end();
});

test('Domain/Filter/Operation/Geospatial/Intersect - MultiPointLineString', (t) => {
	// const { MultiPointLineString }  = Intersect;

	t.end();
});

test('Domain/Filter/Operation/Geospatial/Intersect - MultiPointMultiLineString', (t) => {
	// const { MultiPointMultiLineString }  = Intersect;

	t.end();
});

test('Domain/Filter/Operation/Geospatial/Intersect - MultiPointPolygon', (t) => {
	// const { MultiPointPolygon }  = Intersect;

	t.end();
});

test('Domain/Filter/Operation/Geospatial/Intersect - MultiPointMultiPolygon', (t) => {
	// const { MultiPointMultiPolygon }  = Intersect;

	t.end();
});

test('Domain/Filter/Operation/Geospatial/Intersect - LineStringMultiPoint', (t) => {
	// const { LineStringMultiPoint }  = Intersect;

	t.end();
});

test('Domain/Filter/Operation/Geospatial/Intersect - LineStringLineString', (t) => {
	// const { LineStringLineString }  = Intersect;

	t.end();
});

test('Domain/Filter/Operation/Geospatial/Intersect - LineStringMultiLineString', (t) => {
	// const { LineStringMultiLineString }  = Intersect;

	t.end();
});

test('Domain/Filter/Operation/Geospatial/Intersect - LineStringPolygon', (t) => {
	// const { LineStringPolygon }  = Intersect;

	t.end();
});

test('Domain/Filter/Operation/Geospatial/Intersect - LineStringMultiPolygon', (t) => {
	// const { LineStringMultiPolygon }  = Intersect;

	t.end();
});

test('Domain/Filter/Operation/Geospatial/Intersect - MultiLineStringMultiPoint', (t) => {
	// const { MultiLineStringMultiPoint }  = Intersect;

	t.end();
});

test('Domain/Filter/Operation/Geospatial/Intersect - MultiLineStringLineString', (t) => {
	// const { MultiLineStringLineString }  = Intersect;

	t.end();
});

test('Domain/Filter/Operation/Geospatial/Intersect - MultiLineStringMultiLineString', (t) => {
	// const { MultiLineStringMultiLineString }  = Intersect;

	t.end();
});

test('Domain/Filter/Operation/Geospatial/Intersect - MultiLineStringPolygon', (t) => {
	// const { MultiLineStringPolygon }  = Intersect;

	t.end();
});

test('Domain/Filter/Operation/Geospatial/Intersect - MultiLineStringMultiPolygon', (t) => {
	// const { MultiLineStringMultiPolygon }  = Intersect;

	t.end();
});

test('Domain/Filter/Operation/Geospatial/Intersect - PolygonMultiPoint', (t) => {
	// const { PolygonMultiPoint }  = Intersect;

	t.end();
});

test('Domain/Filter/Operation/Geospatial/Intersect - PolygonLineString', (t) => {
	// const { PolygonLineString }  = Intersect;

	t.end();
});

test('Domain/Filter/Operation/Geospatial/Intersect - PolygonMultiLineString', (t) => {
	// const { PolygonMultiLineString }  = Intersect;

	t.end();
});

test('Domain/Filter/Operation/Geospatial/Intersect - PolygonPolygon', (t) => {
	// const { PolygonPolygon }  = Intersect;

	t.end();
});

test('Domain/Filter/Operation/Geospatial/Intersect - PolygonMultiPolygon', (t) => {
	// const { PolygonMultiPolygon }  = Intersect;

	t.end();
});

test('Domain/Filter/Operation/Geospatial/Intersect - MultiPolygonPoint', (t) => {
	// const { MultiPolygonPoint }  = Intersect;

	t.end();
});

test('Domain/Filter/Operation/Geospatial/Intersect - MultiPolygonMultiPoint', (t) => {
	// const { MultiPolygonMultiPoint }  = Intersect;

	t.end();
});

test('Domain/Filter/Operation/Geospatial/Intersect - MultiPolygonLineString', (t) => {
	// const { MultiPolygonLineString }  = Intersect;

	t.end();
});

test('Domain/Filter/Operation/Geospatial/Intersect - MultiPolygonMultiLineString', (t) => {
	// const { MultiPolygonMultiLineString }  = Intersect;

	t.end();
});

test('Domain/Filter/Operation/Geospatial/Intersect - MultiPolygonPolygon', (t) => {
	// const { MultiPolygonPolygon }  = Intersect;

	t.end();
});

test('Domain/Filter/Operation/Geospatial/Intersect - MultiPolygonMultiPolygon', (t) => {
	// const { MultiPolygonMultiPolygon }  = Intersect;

	t.end();
});

*/
