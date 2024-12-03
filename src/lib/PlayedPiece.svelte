<script lang="ts">
	import Color from 'color';
	import type { PlayedPieceModel } from './PlayedPieceModel';

	interface Props {
		piece: PlayedPieceModel;
	}
	import Block from './Block.svelte';
	import { onMount } from 'svelte';

	const { piece }: Props = $props();

	const blocks = piece.blocks();

	const cornerLighten = 0;
</script>

{#each blocks as block}
	<Block
		x={block.x}
		y={block.y}
		color={block.isCorner
			? Color(piece.color).lighten(cornerLighten).rgb().string()
			: Color(piece.color).rgb().string()}
	/>
{/each}
