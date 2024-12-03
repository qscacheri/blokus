export class PieceModel {
	layout: number[][];
	id: string;

	constructor(layout: number[][]) {
		this.layout = layout;
		let id = '';
		for (let i = 0; i < this.layout.length; i++) {
			for (let j = 0; j < this.layout[i].length; j++) {
				id += this.layout[i][j];
			}
			id += '-';
		}
		this.id = id;
	}

	rotate(): void {
		const newLayout: number[][] = [];
		for (let i = 0; i < this.layout[0].length; i++) {
			newLayout[i] = [];
			for (let j = this.layout.length - 1; j >= 0; j--) {
				newLayout[i].push(this.layout[j][i]);
			}
		}
		this.layout = newLayout;
	}

	rotated(): PieceModel {
		const newLayout: number[][] = [];
		for (let i = 0; i < this.layout[0].length; i++) {
			newLayout[i] = [];
			for (let j = this.layout.length - 1; j >= 0; j--) {
				newLayout[i].push(this.layout[j][i]);
			}
		}
		return new PieceModel(newLayout);
	}

	rotations(): PieceModel[] {
		const rotations: PieceModel[] = [];
		let currentPiece = this as PieceModel;
		for (let i = 0; i < 4; i++) {
			rotations.push(currentPiece);
			currentPiece = currentPiece.rotated();
		}
		return rotations;
	}

	getCornerIndices(): number[][] {
		const cornerIndices: number[][] = [];
		const rows = this.layout.length;
		const cols = this.layout[0].length;
		for (let row = 0; row < rows; row++) {
			for (let col = 0; col < cols; col++) {
				const cell = this.layout[row][col];
				if (cell === 0) {
					continue;
				}

				const above = row === 0 ? 0 : this.layout[row - 1][col];
				const below = row === rows - 1 ? 0 : this.layout[row + 1][col];
				const left = col === 0 ? 0 : this.layout[row][col - 1];
				const right = col === cols - 1 ? 0 : this.layout[row][col + 1];

				if ((above === 1 && below === 1) || (left === 1 && right === 1)) {
					continue;
				} else {
					cornerIndices.push([row, col]);
				}
			}
		}

		return cornerIndices;
	}
}
