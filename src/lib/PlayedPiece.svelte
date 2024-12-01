<script lang="ts">
	import type { PlayedPieceModel } from './PlayedPieceModel';

	interface Props {
		piece: PlayedPieceModel;
	}
	import Block from './Block.svelte';

	const { piece }: Props = $props();

	const blocks = piece.blocks();
</script>

{#each blocks as block}
	<Block x={block.x} y={block.y} color={piece.color} />
{/each}
