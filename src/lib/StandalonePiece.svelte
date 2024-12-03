<script lang="ts">
	import type { PlayedPieceModel } from './PlayedPieceModel';

	interface Props {
		piece: PlayedPieceModel;
	}
	import Block from './Block.svelte';

	const { piece }: Props = $props();
</script>

<div class="standalone">
	{#each piece.blocks() as block}
		<Block x={block.x - piece.position.x} y={block.y - piece.position.y} color={piece.color} />
	{/each}
</div>

<style>
	.standalone {
		--block-size: 12px;
		display: grid;
		grid-template-columns: repeat(6, var(--block-size));
		grid-template-rows: repeat(6, var(--block-size));
	}
</style>
