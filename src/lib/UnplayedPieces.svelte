<script lang="ts">
	import { Colors, game, type Color } from './Game.svelte';
	import { PlayedPieceModel } from './PlayedPieceModel';
	import StandalonePiece from './StandalonePiece.svelte';

	interface Props {
		color: Color;
	}

	const { color }: Props = $props();

	function getPieces(color: Color) {
		game.currentPiece;
		return game.unplayedPieces[color].map((piece) => {
			return new PlayedPieceModel(piece, Colors[color]);
		});
	}

	let pieces = $derived(getPieces(color));
</script>

<div
	class="grid h-full w-full grid-cols-5 flex-wrap gap-1 overflow-hidden border-2 border-white p-1"
>
	{#each pieces as piece}
		<div class="border border-transparent">
			<StandalonePiece size={12} {piece} />
		</div>
	{/each}
</div>

<style>
	.selected {
		/* border: 1px solid black; */
	}
</style>
