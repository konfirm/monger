## Geospatial

### `$geoIntersects`

The `$geometry` is specified to be valid GeoJSON, though the coordinates are treated as "legacy coordinates", where the following will work even though it is not valid GeoJSON.

```js
$geoIntersects:{ $geometry: { type: 'Point', coordinates: { x: 5.911760330200195, y: 51.97496770044958 } } }
$geoIntersects:{ $geometry: { type: 'Point', coordinates: { lon: 5.911760330200195, lat: 51.97496770044958 } } }
```

Monger will not allow invalid GeoJSON, so the above query should be

```js
$geoIntersects:{ $geometry: { type : 'Point', coordinates: [5.911760330200195, y: 51.97496770044958] } }
```

### `$geoWithin`

#### `$geometry`

```js
// ok
$geoWithin:{ $geometry: { type: 'Polygon', coordinates:[[[4,50], [4,53], [7, 53], [7,50], [4,50]]]  } }

// Loop is not closed: [ [ 5, 51 ], [ 5, 52 ], [ 7, 52 ], [ 7, 51 ] ]
$geoWithin:{ $geometry: { type: 'Polygon', coordinates:[[[4,50], [4,53], [7, 53], [7,50]]]  } }

// Loop must have at least 3 different vertices: [ [ 5, 51 ], [ 5, 52 ], [ 5, 52 ], [ 5, 51 ] ]
$geoWithin:{ $geometry: { type: 'Polygon', coordinates:[[[4,50], [4,53], [7, 53], [7,50]]]  } }

// $within not supported with provided geometry: { $geoWithin: { $geometry: { type: "MultiLineString", coordinates: [ [ [ 5, 51 ], [ 5, 52 ], [ 7, 52 ], [ 7, 51 ] ] ] } } }
$geoWithin:{ $geometry: { type: 'MultiLineString', coordinates: [[[5, 51], [5,52], [7,52], [7,51], [5, 51]]] } }
```

#### `$box`

```js
// ok
$geoWithin:{ $box: [[5, 52], [7,51]] }
// ok
// (bottom left, upper right can be upper left, bottom right)
$geoWithin:{ $box: [[5, 51], [7,52]] }
// ok
// (bottom left, upper right can be bottom right, upper left)
$geoWithin:{ $box: [[7, 51], [5,52]] }
// ok
//(additional values ignored)
$geoWithin:{ $box: [[5, 51], [7,52], [5,51]] }

// Point must be an array or object
// (naive value at index 1 is undefined)
$geoWithin:{ $box: [[5, 51]] }

// unknown geo specifier: box: [ [ 5, 51 ], [ 7, 52 ] ]
$geoWithin:{ box: [[5, 51], [7,52]] }
```
