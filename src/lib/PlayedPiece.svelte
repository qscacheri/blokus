<script lang="ts">
	import Block from './Block.svelte';
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

		console.log({ x, y });

		return { x: col + x, y: row + y, display: true };
	}
</script>

{#each piece.piece.layout as row, rowIdx}
	{#each row as _, colIdx}
		{@const block = getBlockPosition(rowIdx, colIdx)}
		{#if block.display && block.x && block.y}
			<Block x={block.x} y={block.y} color={piece.color} />
		{/if}
	{/each}
{/each}

<style>
</style>
