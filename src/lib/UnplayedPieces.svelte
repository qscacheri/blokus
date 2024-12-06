<script lang="ts">
	import { Colors, game, type Color } from './Game.svelte';
	import { PlayedPieceModel } from './PlayedPieceModel';
	import StandalonePiece from './StandalonePiece.svelte';

	function getPieces(color: Color) {
		game.currentPiece;
		return game.unplayedPieces[color].map((piece) => {
			return new PlayedPieceModel(piece, Colors[color]);
		});
	}

	let redPieces = $derived(getPieces(Colors.red));
	let bluePieces = $derived(getPieces(Colors.blue));
	let greenPieces = $derived(getPieces(Colors.green));
	let yellowPieces = $derived(getPieces(Colors.yellow));

	const selectedPiece = $derived.by(() => {
		if (!game.currentPiece) return null;
		for (const color in game.unplayedPieces) {
			for (const piece of [...redPieces, ...bluePieces, ...greenPieces, ...yellowPieces]) {
				if (piece.piece.id === game.currentPiece.piece.id && piece.color === color) {
					return piece;
				}
			}
		}
	});
</script>

{#if game.currentPiece}
	<StandalonePiece piece={game.currentPiece} size={64} />
{/if}
<div class="grid grid-cols-2 grid-rows-2">
	<div class="grid grid-cols-5 grid-rows-5">
		{#each redPieces as piece}
			<div class:selected={game.currentPiece?.equals(piece)} class="border border-transparent">
				<StandalonePiece {piece} />
			</div>
		{/each}
	</div>
	<div class="grid grid-cols-5 grid-rows-5">
		{#each bluePieces as piece}
			<div class:selected={game.currentPiece?.equals(piece)} class="border border-transparent">
				<StandalonePiece {piece} />
			</div>
		{/each}
	</div>
	<div class="grid grid-cols-5 grid-rows-5">
		{#each greenPieces as piece}
			<div class:selected={game.currentPiece?.equals(piece)} class="border border-transparent">
				<StandalonePiece {piece} />
			</div>
		{/each}
	</div>
	<div class="grid grid-cols-5 grid-rows-5">
		{#each yellowPieces as piece}
			<div class:selected={game.currentPiece?.equals(piece)} class="border border-transparent">
				<StandalonePiece {piece} />
			</div>
		{/each}
	</div>
</div>

<style>
	.selected {
		border: 1px solid black;
	}
</style>
