<script lang="ts">
	import type { PlayedPieceModel } from './PlayedPieceModel';

	interface Props {
		piece: PlayedPieceModel;
		size?: number;
	}
	import Block from './Block.svelte';

	const { piece, size = 16 }: Props = $props();

	const rows = $derived(piece.piece.layout.length);
	const cols = $derived(piece.piece.layout[0].length);
</script>

<div class="standalone" style="--block-size: {size}px; --rows: {rows}; --cols: {cols}">
	{#each piece.blocks() as block}
		<Block x={block.x - piece.position.x} y={block.y - piece.position.y} color={piece.color} />
	{/each}
</div>

<style>
	.standalone {
		display: grid;
		grid-template-columns: repeat(var(--cols), var(--block-size));
		grid-template-rows: repeat(var(--rows), var(--block-size));
	}
</style>
