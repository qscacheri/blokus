import type { PieceModel } from './PieceModel';
import type { Point } from './types';

export class PlayedPieceModel {
	piece: PieceModel;
	position: { x: number; y: number } = { x: 0, y: 0 };
	color: string;

	constructor(piece: PieceModel, color: string) {
		this.piece = piece;
		this.color = color;
	}

	cornerPositions(): Point[] {
		const cornerIndices = this.piece.getCornerIndices();
		console.log({ cornerIndices });
		const positions: Point[] = [];
		for (const index of cornerIndices) {
			const position = this.indexToPosition(index);
			positions.push(position);
		}
		return positions;
	}

	indexToPosition(index: number[]): Point {
		return {
			x: this.position.x + index[1],
			y: this.position.y + index[0]
		};
	}

	outOfBounds(): boolean {
		const width = 20;
		const height = 20;

		for (let row = 0; row < this.piece.layout.length; row++) {
			for (let col = 0; col < this.piece.layout[row].length; col++) {
				if (this.piece.layout[row][col] === 0) {
					continue;
				}
				if (this.position.x + col < 0 || this.position.x + col >= width) {
					return true;
				}
				if (this.position.y + row < 0 || this.position.y + row >= height) {
					return true;
				}
			}
		}
		return false;
	}

	blocks(): { x: number; y: number }[] {
		const blocks: { x: number; y: number }[] = [];
		for (let row = 0; row < this.piece.layout.length; row++) {
			for (let col = 0; col < this.piece.layout[row].length; col++) {
				if (this.piece.layout[row][col] === 0) {
					continue;
				}
				blocks.push({ x: this.position.x + col, y: this.position.y + row });
			}
		}
		return blocks;
	}

	overlaps(other: PlayedPieceModel) {
		const thisBlocks = this.blocks();
		const otherBlocks = other.blocks();
		for (const block of thisBlocks) {
			for (const otherBlock of otherBlocks) {
				if (block.x === otherBlock.x && block.y === otherBlock.y) {
					return true;
				}
			}
		}
		return false;
	}
}
