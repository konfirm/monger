import * as test from 'tape';
import { each } from 'template-literal-each';
import * as Within from '../../../../../source/Domain/Filter/Operator/Geospatial/Within';

test('Domain/Filter/Operator/Geospatial/Within - exports', (t) => {
    const expected = [
        'within',
    ];
    const actual = Object.keys(Within);

    t.equal(actual.length, expected.length, `contains ${expected.length} keys`);
    expected.forEach((key) => {
        t.equal(typeof Within[<keyof typeof Within>key], 'function', `contains function ${key}`);
    });

    t.end();
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

test('Domain/Filter/Operator/Geospatial/Within - within', (t) => {
    const { within } = Within;

    // $unknown
    t.throws(() => within(<any>{ $unknown: 'does not matter' }), /unknown geo specifier: \$unknown/, 'throws on $unknown');

    // $geometry
    const geometryError = /\$within not supported with provided geometry/;
    [point, multipoint, linestring, multilinestring, feature, featurecollection, geometrycollection]
        .forEach((geojson) => {
            t.throws(() => within(<any>{ $geometry: geojson }), geometryError, `throws ${geometryError} on $geometry with ${geojson.type}`);
        });
    [polygon, multipolygon]
        .forEach((geojson) => {
            t.doesNotThrow(() => within(<any>{ $geometry: polygon }), geometryError, `does not throw ${geometryError} on $geometry with ${geojson.type}`);
        });

    // $box
    const boxError = /Point must be an array or object/;
    [[], [[1]], [[1, 2]], [[1, 2], [3]], [[1, 2], [3, 4], [5]], [[1, 2], [3, 4], [5, 6]]]
        .forEach(($box) => {
            t.throws(() => within(<any>{ $box }), boxError, `throws ${boxError} on invalid $box: ${JSON.stringify($box)}`);
        });
    t.doesNotThrow(() => within(<any>{ $box: [[1, 2], [3, 4]] }), boxError, `does not throw ${boxError} on valid $box: [[1,2],[3,4]]`);

    // $polygon
    const polygonError = /Polygon must have at least 3 points/;
    [[], [[1]], [[1, 2]], [[1, 2], [3]], [[1, 2], [3, 4], [5]], [[1, 2], [3, 4], [5, 7], [8]]]
        .forEach(($polygon) => {
            t.throws(() => within(<any>{ $polygon }), polygonError, `throws ${polygonError} on invalid $polygon: ${JSON.stringify($polygon)}`);
        });
    t.doesNotThrow(() => within(<any>{ $polygon: [[1, 2], [3, 4], [5, 6]] }), polygonError, `does not throw ${polygonError} on valid $polygon: [[1,2],[3,4],[5,6]]`);
    t.doesNotThrow(() => within(<any>{ $polygon: [[1, 2], [3, 4], [5, 6], [7, 8]] }), polygonError, `does not throw ${polygonError} on valid $polygon: [[1,2],[3,4],[5,6]]`);

    // $center
    const specifierError = /unknown geo specifier: \$center/;
    const pointError = /Point must be an array or object/;
    const invalidRadius = /radius must be a non-negative number/;

    [null, undefined, {}, { a: 1 }]
        .forEach(($center) => {
            t.throws(() => within(<any>{ $center }), specifierError, `throws ${specifierError} on invalid $center: ${JSON.stringify($center)}`);
        });
    [[], [1], [{ a: 1 }]]
        .forEach(($center) => {
            t.throws(() => within(<any>{ $center }), pointError, `throws ${pointError} on invalid $center: ${JSON.stringify($center)}`);
        });
    [undefined, null, '1', -2, true].forEach((radius) => {
        t.throws(() => within(<any>{ $center: [[1, 2], radius] }), invalidRadius, `throws ${invalidRadius} on $center: ${JSON.stringify({ $center: [[1, 2], radius] })}`);
        t.throws(() => within(<any>{ $center: [{ a: 3, b: 4 }, radius] }), invalidRadius, `throws ${invalidRadius} on $center: ${JSON.stringify({ $center: [{ a: 3, b: 4 }, radius] })}`);
    });
    [[[1, 2], 1000], [{ a: 1, b: 2 }, 2000]].forEach(($center) => {
        t.doesNotThrow(() => within(<any>{ $center }), `does not throw on valid $center: ${JSON.stringify($center)}`);
    });

    // $centerSphere
    [null, undefined, {}, { a: 1 }]
        .forEach(($centerSphere) => {
            t.throws(() => within(<any>{ $centerSphere }), specifierError, `throws ${specifierError} on invalid $centerSphere: ${JSON.stringify($centerSphere)}`);
        });
    [[], [1], [{ a: 1 }]]
        .forEach(($centerSphere) => {
            t.throws(() => within(<any>{ $centerSphere }), pointError, `throws ${pointError} on invalid $centerSphere: ${JSON.stringify($centerSphere)}`);
        });
    [undefined, null, '1', -2, true].forEach((radius) => {
        t.throws(() => within(<any>{ $centerSphere: [[1, 2], radius] }), invalidRadius, `throws ${invalidRadius} on $centerSphere: ${JSON.stringify({ $centerSphere: [[1, 2], radius] })}`);
        t.throws(() => within(<any>{ $centerSphere: [{ a: 3, b: 4 }, radius] }), invalidRadius, `throws ${invalidRadius} on $centerSphere: ${JSON.stringify({ $centerSphere: [{ a: 3, b: 4 }, radius] })}`);
    });
    [[[1, 2], 1000], [{ a: 1, b: 2 }, 2000]].forEach(($centerSphere) => {
        t.doesNotThrow(() => within(<any>{ $centerSphere }), `does not throw on valid $centerSphere: ${JSON.stringify($centerSphere)}`);
    });

    t.end();
});
