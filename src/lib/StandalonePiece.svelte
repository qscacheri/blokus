<script lang="ts">
	import type { PlayedPieceModel } from './PlayedPieceModel';

	interface Props {
		piece: PlayedPieceModel;
		size?: number;
	}
	import Block from './Block.svelte';

	const { piece, size = 16 }: Props = $props();
</script>

<div class="standalone" style="--block-size: {size}px">
	{#each piece.blocks() as block}
		<Block x={block.x - piece.position.x} y={block.y - piece.position.y} color={piece.color} />
	{/each}
</div>

<style>
	.standalone {
		display: grid;
		grid-template-columns: repeat(6, var(--block-size));
		grid-template-rows: repeat(6, var(--block-size));
	}
</style>
