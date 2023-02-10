import * as test from 'tape';
import * as Legacy from '../../../../../source/Domain/Filter/Operator/Geospatial/Legacy';

test('Domain/Filter/Operator/Geospatial/Legacy - exports', (t) => {
    const expected = [
        'isLegacyPointArray',
        'isLegacyPointObject',
        'isLegacyPoint',
        'isLegacyBox',
        'isLegacyPolygon',
        'isLegacy',
        'legacyToGeoJSON'
    ];
    const actual = Object.keys(Legacy);

    t.equal(actual.length, expected.length, `contains ${expected.length} keys`);
    expected.forEach((key) => {
        t.equal(typeof Legacy[<keyof typeof Legacy>key], 'function', `contains function ${key}`);
    });

    t.end();
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

    test(`Domain/Filter/Operator/Geospatial/Legacy - ${guard}`, (t) => {
        list.forEach(({ name, shape }) => {
            const is = valid.includes(name);
            const desc = is ? 'is' : 'is not';

            t.equal(fn(shape), is, `${JSON.stringify(shape)} ${desc} ${guard}`);
        });

        t.end();
    });
}

guard('isLegacyPointArray', 'legacyPointArray');
guard('isLegacyPointObject', 'legacyPointObject');
guard('isLegacyPoint', 'legacyPointArray', 'legacyPointObject');
guard('isLegacyBox', 'legacyBoxArray', 'legacyBoxObject', 'legacyBoxMixed');
guard('isLegacyPolygon', 'legacyPolygonArray', 'legacyPolygonArrayComplete', 'legacyPolygonObject', 'legacyPolygonObjectComplete', 'legacyPolygonMixed', 'legacyPolygonMixedComplete');
guard('isLegacy', 'legacy', 'legacyPointArray', 'legacyPointObject', 'legacyBoxArray', 'legacyBoxObject', 'legacyBoxMixed', 'legacyPolygonArray', 'legacyPolygonArrayComplete', 'legacyPolygonObject', 'legacyPolygonObjectComplete', 'legacyPolygonMixed', 'legacyPolygonMixedComplete');

test('Domain/Filter/Operator/Geospatial/Legacy - legacyToGeoJSON', (t) => {
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
                t.deepEqual(Legacy.legacyToGeoJSON(value), expectation[name], `returns ${JSON.stringify(expectation[name])} for ${JSON.stringify(value)}`);
            }
            else {
                t.throws(() => Legacy.legacyToGeoJSON(shapes[name]), /not a legacy coordinate format/, `it throws on ${JSON.stringify(shapes[name])}`);
            }
        })

    t.end();
});
