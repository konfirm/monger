import type { GeoJSON } from '../Geospatial';

type PointCoords = GeoJSON.Geometry.Point['coordinates'];
type MultiPointCoords = GeoJSON.Geometry.MultiPoint['coordinates'];
type LineStringCoords = GeoJSON.Geometry.LineString['coordinates'];
type MultiLineStringCoords = GeoJSON.Geometry.MultiLineString['coordinates'];
type PolygonCoords = GeoJSON.Geometry.Polygon['coordinates'];
type MultiPolygonCoords = GeoJSON.Geometry.MultiPolygon['coordinates'];

function pointHasAltitude(point: PointCoords): boolean {
	return typeof point[2] === 'number';
}

function lineSegments(line: LineStringCoords): Array<[PointCoords, PointCoords]> {
	return line.slice(1).map((point, index) => [line[index], point]);
}

function equalish(a: number, b: number, threshold: number = 0.0000001): boolean {
	return Math.abs(a - b) <= threshold;
}

function subtractPointFromPoint(a: PointCoords, b: PointCoords): PointCoords {
	return a.map((v, i) => <number>v - (b[i] || 0)) as PointCoords;
}

export function PointPoint(a: PointCoords, b: PointCoords): boolean {
	return a.length === b.length && a.every((value, i) => value === b[i]);
}

export function PointMultiPoint(a: PointCoords, b: MultiPointCoords): boolean {
	return b.some((point) => PointPoint(point, a));
}

export function PointLineString(a: PointCoords, b: LineStringCoords): boolean {
	if (b.some((point) => PointPoint(a, point))) {
		return true;
	}

	return lineSegments(b)
		.some(([l1, l2]) => {
			if (a.length === l1.length && a.length === l2.length) {
				const P = [a[0], a[1], a[2] || 0].map(Number) as [number, number, number];
				const A = [l1[0], l1[1], l1[2] || 0].map(Number) as [number, number, number];
				const B = [l2[0], l2[1], l2[2] || 0].map(Number) as [number, number, number];
				const [sp1, sp2, sp3 = 0] = subtractPointFromPoint(B, A);
				const lenAB = Math.sqrt(sp1 * sp1 + sp2 * sp2 + sp3 * sp3);
				const D = [sp1 / lenAB, sp2 / lenAB, sp3 / lenAB];
				const AP = [P[0] - A[0], P[1] - A[1], P[2] - A[2]];
				const d = D[0] * AP[0] + D[1] * AP[1] + D[2] * AP[2];
				const X = [A[0] + d * D[0], A[1] + d * D[1], A[2] + d * D[2]];

				return X.every((v, i) => equalish(v, P[i]));
			}

			return false;
		});
}

export function PointMultiLineString(a: PointCoords, b: MultiLineStringCoords): boolean {
	return b.some((line) => PointLineString(a, line));
}

export function PointPolygon(a: PointCoords, b: PolygonCoords): boolean {
	console.log('TODO: implement PointPolygon');

	return false;
}

export function PointMultiPolygon(a: PointCoords, b: MultiPolygonCoords): boolean {
	console.log('TODO: implement PointMultiPolygon');

	return false;
}

export function MultiPointPoint(a: MultiPointCoords, b: PointCoords): boolean {
	//  MultiPointPoint(a, b) ----> PointMultiPoint(b, a)
	return PointMultiPoint(b, a);
}

export function MultiPointMultiPoint(a: MultiPointCoords, b: MultiPointCoords): boolean {
	return a.some((single) => PointMultiPoint(single, b));
}

export function MultiPointLineString(a: MultiPointCoords, b: LineStringCoords): boolean {
	return a.some((single) => PointLineString(single, b));
}

export function MultiPointMultiLineString(a: MultiPointCoords, b: MultiLineStringCoords): boolean {
	return a.some((single) => PointMultiLineString(single, b));
}

export function MultiPointPolygon(a: MultiPointCoords, b: PolygonCoords): boolean {
	return a.some((single) => PointPolygon(single, b));
}

export function MultiPointMultiPolygon(a: MultiPointCoords, b: MultiPolygonCoords): boolean {
	return a.some((single) => PointMultiPolygon(single, b));
}

export function LineStringPoint(a: LineStringCoords, b: PointCoords): boolean {
	//  LineStringPoint(a, b) ----> PointLineString(b, a)
	return PointLineString(b, a);
}

export function LineStringMultiPoint(a: LineStringCoords, b: MultiPointCoords): boolean {
	//  LineStringMultiPoint(a, b) ----> MultiPointLineString(b, a)
	return MultiPointLineString(b, a);
}

export function LineStringLineString(a: LineStringCoords, b: LineStringCoords): boolean {
	const segments = lineSegments(a);
	const pp = (...points: Array<PointCoords>) => points.some((p1, i1) => points.some((p2, i2) => i1 !== i2 && PointPoint(p1, p2)));

	return lineSegments(b)
		.some(([p1, p2]) => {
			return segments.some(([p3, p4]) => {
				const det = (p2[0] - p1[0]) * (p4[1] - p3[1]) - (p4[0] - p3[0]) * (p2[1] - p1[1]);

				if (!det) {
					return pp(p1, p2, p3, p4);
				}

				const lambda = ((p4[1] - p3[1]) * (p4[0] - p1[0]) + (p3[0] - p4[0]) * (p4[1] - p1[1])) / det;
				const gamma = ((p1[1] - p2[1]) * (p4[0] - p1[0]) + (p2[0] - p1[0]) * (p4[1] - p1[1])) / det;

				return (lambda > 0 && lambda < 1) && (gamma > 0 && gamma < 1);
			})
		})

}

export function LineStringMultiLineString(a: LineStringCoords, b: MultiLineStringCoords): boolean {
	return b.some((line) => LineStringLineString(a, line));
}

export function LineStringPolygon(a: LineStringCoords, b: PolygonCoords): boolean {
	console.log('TODO: implement LineStringPolygon');

	return false;
}

export function LineStringMultiPolygon(a: LineStringCoords, b: MultiPolygonCoords): boolean {
	console.log('TODO: implement LineStringMultiPolygon');

	return false;
}

export function MultiLineStringPoint(a: MultiLineStringCoords, b: PointCoords): boolean {
	//  MultiLineStringPoint(a, b) ----> PointMultiLineString(b, a)
	return PointMultiLineString(b, a);
}

export function MultiLineStringMultiPoint(a: MultiLineStringCoords, b: MultiPointCoords): boolean {
	//  MultiLineStringMultiPoint(a, b) ----> MultiPointMultiLineString(b, a)
	return MultiPointMultiLineString(b, a);
}

export function MultiLineStringLineString(a: MultiLineStringCoords, b: LineStringCoords): boolean {
	//  MultiLineStringLineString(a, b) ----> LineStringMultiLineString(b, a)
	return LineStringMultiLineString(b, a);
}

export function MultiLineStringMultiLineString(a: MultiLineStringCoords, b: MultiLineStringCoords): boolean {
	return a.some((single) => LineStringMultiLineString(single, b));
}

export function MultiLineStringPolygon(a: MultiLineStringCoords, b: PolygonCoords): boolean {
	return a.some((single) => LineStringPolygon(single, b));
}

export function MultiLineStringMultiPolygon(a: MultiLineStringCoords, b: MultiPolygonCoords): boolean {
	return a.some((single) => LineStringMultiPolygon(single, b));
}

export function PolygonPoint(a: PolygonCoords, b: PointCoords): boolean {
	//  PolygonPoint(a, b) ----> PointPolygon(b, a)
	return PointPolygon(b, a);
}

export function PolygonMultiPoint(a: PolygonCoords, b: MultiPointCoords): boolean {
	//  PolygonMultiPoint(a, b) ----> MultiPointPolygon(b, a)
	return MultiPointPolygon(b, a);
}

export function PolygonLineString(a: PolygonCoords, b: LineStringCoords): boolean {
	//  PolygonLineString(a, b) ----> LineStringPolygon(b, a)
	return LineStringPolygon(b, a);
}

export function PolygonMultiLineString(a: PolygonCoords, b: MultiLineStringCoords): boolean {
	//  PolygonMultiLineString(a, b) ----> MultiLineStringPolygon(b, a)
	return MultiLineStringPolygon(b, a);
}

export function PolygonPolygon(a: PolygonCoords, b: PolygonCoords): boolean {
	console.log('TODO: implement PolygonPolygon');

	return false;
}

export function PolygonMultiPolygon(a: PolygonCoords, b: MultiPolygonCoords): boolean {
	console.log('TODO: implement PolygonMultiPolygon');

	return false;
}

export function MultiPolygonPoint(a: MultiPolygonCoords, b: PointCoords): boolean {
	//  MultiPolygonPoint(a, b) ----> PointMultiPolygon(b, a)
	return PointMultiPolygon(b, a);
}

export function MultiPolygonMultiPoint(a: MultiPolygonCoords, b: MultiPointCoords): boolean {
	//  MultiPolygonMultiPoint(a, b) ----> MultiPointMultiPolygon(b, a)
	return MultiPointMultiPolygon(b, a);
}

export function MultiPolygonLineString(a: MultiPolygonCoords, b: LineStringCoords): boolean {
	//  MultiPolygonLineString(a, b) ----> LineStringMultiPolygon(b, a)
	return LineStringMultiPolygon(b, a);
}

export function MultiPolygonMultiLineString(a: MultiPolygonCoords, b: MultiLineStringCoords): boolean {
	//  MultiPolygonMultiLineString(a, b) ----> MultiLineStringMultiPolygon(b, a)
	return MultiLineStringMultiPolygon(b, a);
}

export function MultiPolygonPolygon(a: MultiPolygonCoords, b: PolygonCoords): boolean {
	//  MultiPolygonPolygon(a, b) ----> PolygonMultiPolygon(b, a)
	return PolygonMultiPolygon(b, a);
}

export function MultiPolygonMultiPolygon(a: MultiPolygonCoords, b: MultiPolygonCoords): boolean {
	return a.some((single) => PolygonMultiPolygon(single, b));
}
