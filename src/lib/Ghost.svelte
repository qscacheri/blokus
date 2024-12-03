<script lang="ts">
	import type { PlayedPieceModel } from './PlayedPieceModel';

	interface Props {
		piece: PlayedPieceModel;
	}
	import Block from './Block.svelte';

	const { piece }: Props = $props();
</script>

<div class="ghost">
	{#each piece.blocks() as block}
		<Block x={block.x - piece.position.x} y={block.y - piece.position.y} color={piece.color} />
	{/each}
</div>

<style>
	.ghost {
		display: grid;
		grid-template-columns: repeat(4, 20px);
		grid-template-rows: repeat(4, 20px);
	}
</style>
