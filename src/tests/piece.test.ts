import { expect, test } from 'vitest';
import { PieceModel } from '../lib/PieceModel';
import { pieces } from '../lib/pieces';
import { PlayedPieceModel } from '../lib/PlayedPieceModel';

test('Rotates Piece', () => {
	const piece = new PieceModel([
		[1, 1, 1, 1],
		[0, 0, 0, 1]
	]);

	console.log('Original');
	piece.prettyPrint();

	piece.rotate();
	console.log('Rotated');
	piece.prettyPrint();

	piece.rotate();
	console.log('Rotated');
	piece.prettyPrint();

	piece.rotate();
	console.log('Rotated');
	piece.prettyPrint();
});

// test('Gets Corner Indices', () => {
// 	let piece = new PieceModel(pieces[0]);
// 	let cornerIndices = piece.getCornerIndices();
// 	expect(cornerIndices).toMatchObject([
// 		[0, 0],
// 		[0, 4]
// 	]);
//
// 	console.log(piece.layout);
// 	piece = new PieceModel(pieces[6]);
// 	cornerIndices = piece.getCornerIndices();
// 	expect(cornerIndices).toMatchObject([
// 		[0, 1],
// 		[1, 0],
// 		[1, 2],
// 		[2, 1]
// 	]);
// });
//
// test('Overlaps', () => {
// 	let pieceA = new PlayedPieceModel(new PieceModel(pieces[0]), 'red');
// 	pieceA.position = { x: 1, y: 4 };
// 	let pieceB = new PlayedPieceModel(
// 		new PieceModel([
// 			[1, 0, 0],
// 			[1, 0, 0],
// 			[1, 1, 1]
// 		]),
// 		'red'
// 	);
// 	pieceB.position = { x: 1, y: 2 };
//
// 	let overlaps = pieceA.overlaps(pieceB);
//
// 	expect(overlaps).toBe(true);
//
// 	pieceB.position = { x: 10, y: 3 };
//
// 	overlaps = pieceA.overlaps(pieceB);
//
// 	expect(overlaps).toBe(false);
// });
//
// test('Out of Bounds', () => {
// 	const piece = new PlayedPieceModel(new PieceModel(pieces[0]), 'red');
// 	piece.position = { x: 15, y: 19 };
//
// 	const outOfBounds = piece.outOfBounds();
//
// 	expect(outOfBounds).toBe(false);
//
// 	piece.position.x += 1;
// 	const outOfBounds2 = piece.outOfBounds();
// 	expect(outOfBounds2).toBe(true);
// });
//
// test('Index to Position', () => {
// 	let piece = new PlayedPieceModel(
// 		new PieceModel([
// 			[1, 0, 0],
// 			[1, 0, 0],
// 			[1, 1, 1]
// 		]),
// 		'red'
// 	);
// 	piece.position = { x: 2, y: 7 };
// 	let position = piece.indexToPosition([0, 1]);
// 	expect(position).toMatchObject({ x: 2, y: 8 });
// });
