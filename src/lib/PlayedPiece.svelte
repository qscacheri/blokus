<script lang="ts">
	import type { PlayedPieceModel } from './PlayedPieceModel';

	interface Props {
		piece: PlayedPieceModel;
	}

	const { piece }: Props = $props();

	function getBlockPosition(row: number, col: number) {
		const currentBlock = piece.piece.layout[row][col];
		if (currentBlock === 0) {
			return { display: false };
		}

		const { x, y } = piece.position;

		return { x, y, display: true };
	}
	function getBlockStyle(row: number, col: number) {
		const currentBlock = piece.piece.layout[row][col];
		if (currentBlock === 0) {
			return 'display: none;';
		}

		const { x, y } = piece.position;

		return `
			--col: ${col + 1 + x};
			--row: ${row + 1 + y};
			--color: ${piece.color};
		`;
	}
</script>

{#each piece.piece.layout as row, rowIdx}
	{#each row as _, colIdx}
		<div class="block" style={getBlockStyle(rowIdx, colIdx)}></div>
	{/each}
{/each}

<style>
	.block {
		grid-column: var(--col);
		grid-row: var(--row);
		background: var(--color);
		border: 1px solid #000;
	}
</style>
