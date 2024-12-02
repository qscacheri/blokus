import { PieceModel } from './PieceModel';
import shuffle from 'just-shuffle';
import { PlayedPieceModel } from './PlayedPieceModel';
import { pieces } from './pieces';
import type { Point } from './types';
import { wait } from './util';

export const Colors = {
	red: 'red',
	blue: 'blue',
	yellow: 'yellow',
	green: 'green'
} as const;

const startingPositions = {
	red: { x: 0, y: 0 },
	blue: { x: 0, y: 19 },
	yellow: { x: 19, y: 0 },
	green: { x: 19, y: 19 }
};

interface PossibleMoves {
	red: Point[];
	blue: Point[];
	yellow: Point[];
	green: Point[];
}

export type Color = keyof typeof Colors;

interface UnplayedPieces {
	red: PieceModel[];
	blue: PieceModel[];
	yellow: PieceModel[];
	green: PieceModel[];
	[color: string]: PieceModel[];
}

export class Game {
	playedPieces: PlayedPieceModel[] = $state([]);
	unplayedPieces: UnplayedPieces = $state({
		red: [],
		blue: [],
		yellow: [],
		green: []
	});
	possibleMoves: PossibleMoves = $state({
		red: [],
		blue: [],
		yellow: [],
		green: []
	});

	currentPiece: PlayedPieceModel | null = $state(null);

	constructor() {
		for (const color in Colors) {
			this.unplayedPieces[color] = [];
			for (const piece of pieces) {
				this.unplayedPieces[color].push(new PieceModel(JSON.parse(JSON.stringify(piece))));
			}
		}
	}

	pieceBreaksCornerRule(piece: PlayedPieceModel) {
		const blocks = piece.blocks();
		for (const block of blocks) {
			const left = { x: block.x - 1, y: block.y };
			const right = { x: block.x + 1, y: block.y };
			const up = { x: block.x, y: block.y - 1 };
			const down = { x: block.x, y: block.y + 1 };
			const positions = [left, right, up, down];
			for (const position of positions) {
				const existingBlock = this.blockAtPosition(position);
				if (existingBlock && existingBlock.color === piece.color) {
					return true;
				}
			}
		}
		return false;
	}

	pieceOverlapsOtherPieceOrEdge(piece: PlayedPieceModel) {
		if (piece.outOfBounds()) {
			return true;
		}

		for (const otherPiece of this.playedPieces) {
			if (piece.overlaps(otherPiece)) {
				return true;
			}
		}
		return false;
	}

	updatePossibleMoves(color: Color) {
		this.possibleMoves[color] = [];
		for (const playedPiece of this.playedPieces) {
			if (playedPiece.color !== color) {
				continue;
			}
			const cornerPositions = playedPiece.cornerPositions();
			for (const corner of cornerPositions) {
				const x = corner.x;
				const y = corner.y;

				const upLeft = { x: x - 1, y: y - 1 };
				const upRight = { x: x + 1, y: y - 1 };
				const downLeft = { x: x - 1, y: y + 1 };
				const downRight = { x: x + 1, y: y + 1 };
				const positions = [upLeft, upRight, downLeft, downRight];
				for (const position of positions) {
					if (this.blockAtPosition(position)) {
						continue;
					}
					if (position.x < 0 || position.x > 19 || position.y < 0 || position.y > 19) {
						continue;
					}

					const left = { x: position.x - 1, y: position.y };
					const right = { x: position.x + 1, y: position.y };
					const up = { x: position.x, y: position.y - 1 };
					const down = { x: position.x, y: position.y + 1 };

					if (
						this.blockAtPosition(left) ||
						this.blockAtPosition(right) ||
						this.blockAtPosition(up) ||
						this.blockAtPosition(down)
					) {
						continue;
					}
					this.possibleMoves[color].push(position);
				}
			}
		}
	}

	blockAtPosition(position: Point) {
		for (const playedPiece of this.playedPieces) {
			for (const block of playedPiece.blocks()) {
				if (block.x === position.x && block.y === position.y) {
					return { ...block, color: playedPiece.color };
				}
			}
		}
		return null;
	}

	async playMoveForColor(color: Color) {
		const shuffledMoves = shuffle(this.possibleMoves[color as Color]);
		while (shuffledMoves.length) {
			const move = shuffledMoves.pop();
			if (!move) {
				continue;
			}

			const piece = await this.findPieceForPosition(move, color);
			if (piece) {
				this.playedPieces.push(piece);
				this.updatePossibleMoves(color);
				return;
			}
		}
	}

	async nextMove() {
		for (const color in this.possibleMoves) {
			await this.playMoveForColor(color as Color);
		}
		setTimeout(this.nextMove.bind(this), 2000);
	}

	startGameLoop() {
		this.nextMove();
	}

	// find a piece/rotation for a point. this point is already assumed to be validated for corner to corner
	async findPieceForPosition(position: Point, color: Color) {
		const checkedPieceIndices: number[] = [];

		while (checkedPieceIndices.length < this.unplayedPieces[color].length) {
			const randomPiece = this.randomPiece(color, checkedPieceIndices);
			const rotations = shuffle(randomPiece.rotations());
			// const rotations = randomPiece.rotations();
			this.currentPiece = new PlayedPieceModel(randomPiece, color);
			await wait(500);
			while (rotations.length) {
				const rotation = rotations.pop();
				if (!rotation) {
					continue;
				}
				const piece = new PlayedPieceModel(rotation, color);
				// const cornerPositions = shuffle(piece.cornerPositions());
				const cornerIndices = piece.piece.getCornerIndices();
				while (cornerIndices.length) {
					// const cornerPosition = cornerPositions.pop();
					const cornerIdx = cornerIndices.pop();
					if (!cornerIdx) {
						continue;
					}
					const x = position.x - cornerIdx[1];
					const y = position.y - cornerIdx[0];
					piece.position = { x, y };
					const overlapsPieceOrEdge = this.pieceOverlapsOtherPieceOrEdge(piece);
					const breaksCornerRule = this.pieceBreaksCornerRule(piece);

					if (!overlapsPieceOrEdge && !breaksCornerRule) {
						this.unplayedPieces[color].splice(this.unplayedPieces[color].indexOf(randomPiece), 1);
						return piece;
					}
				}
			}
		}
	}

	async placeFirstPiece(color: Color) {
		const position = startingPositions[color];
		const piece = await this.findPieceForPosition(position, color);
		if (!piece) {
			return;
		}
		this.playedPieces.push(piece);
	}

	async placeFirstPieces() {
		// this.placeFirstPiece('green');
		for (const color in Colors) {
			await this.placeFirstPiece(color as Color);
		}

		for (const color in Colors) {
			this.updatePossibleMoves(color as Color);
		}

		setTimeout(this.startGameLoop.bind(this), 2000);
	}

	testPlacement(piece: PieceModel, position: { x: number; y: number }) {}

	randomPiece(color: Color, skip: number[]): PieceModel {
		// return this.unplayedPieces[color][0];
		const index = Math.floor(Math.random() * this.unplayedPieces[color].length);
		if (skip.includes(index)) {
			return this.randomPiece(color, skip);
		}
		return this.unplayedPieces[color][index];
	}

	start() {
		this.placeFirstPieces();
	}
}

export const game = new Game();
