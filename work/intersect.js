const shape = [
	'Point',
	'MultiPoint',
	'LineString',
	'MultiLineString',
	'Polygon',
	'MultiPolygon',
	'GeometryCollection',
	'Feature',
	'FeatureCollection',
];

const methods = shape
	.reduce((carry, first) => carry.concat(shape.map((second) => [first, second])), [])
	.reduce((carry, [first, second]) => {
		const key = `${first}${second}`;
		const multi = /^Multi|Collection$/;

		if (`${second}${first}` in carry) {
			// carry[key] = `//  ${key} --> handled by ${second}${first}`
			carry[key] = [
				`export function ${key}(a: ${first}Coords, b: ${second}Coords): boolean {`,
				`\t//  ${key}(a, b) --> ${second}${first}(b, a)`,
				`\treturn ${second}${first}(b, a);`,
				'}',
			].join('\n');
		}
		else if (multi.test(first) && first.indexOf('Geometry') < 0) {
			const singular = first.replace(multi, '');
			carry[key] = [
				`export function ${key}(a: ${first}Coords, b: ${second}Coords): boolean {`,
				`\treturn a.some((single) => ${singular}${second}(single, b));`,
				'}',
			].join('\n');
		}
		else {
			carry[key] = [
				`export function ${key}(a: ${first}Coords, b: ${second}Coords): boolean {`,
				`\tconsole.log('TODO: implement ${key}');`,
				'',
				'\treturn false;',
				'}',
			].join('\n');
		}

		return carry;
	}, {});

const output = []
	.concat('type TODO = any;')
	.concat(shape.map((shape) => `type ${shape}Coords = TODO;`))
	.concat(Object.keys(methods).map((key) => `${methods[key]}\n`))

console.log(output.join('\n'));
