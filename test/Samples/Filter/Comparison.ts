import * as test from 'tape';
import { filter } from '../../../source/main';

test('Samples/Filter/Comparison - $eq', (t) => {
	const query = {
		field: { $eq: 3 },
	};
	const $eq = filter(query);

	t.false($eq({ field: 1 }), `${JSON.stringify(query)} does not match {field:1}`);
	t.false($eq({ field: 2 }), `${JSON.stringify(query)} does not match {field:2}`);
	t.true($eq({ field: 3 }), `${JSON.stringify(query)} matches {field:3}`);
	t.false($eq({ field: 4 }), `${JSON.stringify(query)} does not match {field:4}`);
	t.false($eq({ field: 5 }), `${JSON.stringify(query)} does not match {field:5}`);

	t.end();
});

test('Samples/Filter/Comparison - implicit equality', (t) => {
	const query = {
		field: 3,
	};
	const $eq = filter(query);

	t.false($eq({ field: 1 }), `${JSON.stringify(query)} does not match {field:1}`);
	t.false($eq({ field: 2 }), `${JSON.stringify(query)} does not match {field:2}`);
	t.true($eq({ field: 3 }), `${JSON.stringify(query)} matches {field:3}`);
	t.false($eq({ field: 4 }), `${JSON.stringify(query)} does not match {field:4}`);
	t.false($eq({ field: 5 }), `${JSON.stringify(query)} does not match {field:5}`);

	t.end();
});

test('Samples/Filter/Comparison - $gt', (t) => {
	const query = {
		field: { $gt: 3 },
	};
	const $gt = filter(query);

	t.false($gt({ field: 1 }), `${JSON.stringify(query)} does not match {field:1}`);
	t.false($gt({ field: 2 }), `${JSON.stringify(query)} does not match {field:2}`);
	t.false($gt({ field: 3 }), `${JSON.stringify(query)} does not match {field:3}`);
	t.true($gt({ field: 4 }), `${JSON.stringify(query)} matches {field:4}`);
	t.true($gt({ field: 5 }), `${JSON.stringify(query)} matches {field:5}`);

	t.end();
});

test('Samples/Filter/Comparison - $gte', (t) => {
	const query = {
		field: { $gte: 3 },
	};
	const $gte = filter(query);

	t.false($gte({ field: 1 }), `${JSON.stringify(query)} does not match {field:1}`);
	t.false($gte({ field: 2 }), `${JSON.stringify(query)} does not match {field:2}`);
	t.true($gte({ field: 3 }), `${JSON.stringify(query)} matches {field:3}`);
	t.true($gte({ field: 4 }), `${JSON.stringify(query)} matches {field:4}`);
	t.true($gte({ field: 5 }), `${JSON.stringify(query)} matches {field:5}`);

	t.end();
});

test('Samples/Filter/Comparison - $in', (t) => {
	const query = {
		field: { $in: [2, 4] },
	};
	const $in = filter(query);

	t.false($in({ field: 1 }), `${JSON.stringify(query)} does not match {field:1}`);
	t.true($in({ field: 2 }), `${JSON.stringify(query)} matches {field:2}`);
	t.false($in({ field: 3 }), `${JSON.stringify(query)} does not match {field:3}`);
	t.true($in({ field: 4 }), `${JSON.stringify(query)} matches {field:4}`);
	t.false($in({ field: 5 }), `${JSON.stringify(query)} does not match {field:5}`);

	t.end();
});

test('Samples/Filter/Comparison - $lt', (t) => {
	const query = {
		field: { $lt: 3 },
	};
	const $lt = filter(query);

	t.true($lt({ field: 1 }), `${JSON.stringify(query)} matches {field:1}`);
	t.true($lt({ field: 2 }), `${JSON.stringify(query)} matches {field:2}`);
	t.false($lt({ field: 3 }), `${JSON.stringify(query)} does not match {field:3}`);
	t.false($lt({ field: 4 }), `${JSON.stringify(query)} does not match {field:4}`);
	t.false($lt({ field: 5 }), `${JSON.stringify(query)} does not match {field:5}`);

	t.end();
});

test('Samples/Filter/Comparison - $lte', (t) => {
	const query = {
		field: { $lte: 3 },
	};
	const $lte = filter(query);

	t.true($lte({ field: 1 }), `${JSON.stringify(query)} matches {field:1}`);
	t.true($lte({ field: 2 }), `${JSON.stringify(query)} matches {field:2}`);
	t.true($lte({ field: 3 }), `${JSON.stringify(query)} matches {field:3}`);
	t.false($lte({ field: 4 }), `${JSON.stringify(query)} does not match {field:4}`);
	t.false($lte({ field: 5 }), `${JSON.stringify(query)} does not match {field:5}`);

	t.end();
});

test('Samples/Filter/Comparison - $ne', (t) => {
	const query = {
		field: { $ne: 3 },
	};
	const $ne = filter(query);

	t.true($ne({ field: 1 }), `${JSON.stringify(query)} matches {field:1}`);
	t.true($ne({ field: 2 }), `${JSON.stringify(query)} matches {field:2}`);
	t.false($ne({ field: 3 }), `${JSON.stringify(query)} does not match {field:3}`);
	t.true($ne({ field: 4 }), `${JSON.stringify(query)} matches {field:4}`);
	t.true($ne({ field: 5 }), `${JSON.stringify(query)} matches {field:5}`);

	t.end();
});

test('Samples/Filter/Comparison - $nin', (t) => {
	const query = {
		field: { $nin: [2, 4] },
	};
	const $nin = filter(query);

	t.true($nin({ field: 1 }), `${JSON.stringify(query)} matches {field:1}`);
	t.false($nin({ field: 2 }), `${JSON.stringify(query)} does not match {field:2}`);
	t.true($nin({ field: 3 }), `${JSON.stringify(query)} matches {field:3}`);
	t.false($nin({ field: 4 }), `${JSON.stringify(query)} does not match {field:4}`);
	t.true($nin({ field: 5 }), `${JSON.stringify(query)} matches {field:5}`);

	t.end();
});
