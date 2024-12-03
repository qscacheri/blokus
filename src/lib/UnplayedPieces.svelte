<script lang="ts">
	import { Colors, game, type Color } from './Game.svelte';
	import { PlayedPieceModel } from './PlayedPieceModel';
	import StandalonePiece from './StandalonePiece.svelte';

	function getPieces(color: Color) {
		return game.unplayedPieces[color].map((piece) => {
			return new PlayedPieceModel(piece, Colors[color]);
		});
	}

	let redPieces = $derived(getPieces('red'));
	let bluePieces = $derived(getPieces('blue'));
	let greenPieces = $derived(getPieces('green'));
	let yellowPieces = $derived(getPieces('yellow'));

	$inspect({ CURRENT_PIECE: game.currentPiece });

	const selectedPiece = $derived.by(() => {
		if (!game.currentPiece) return null;
		for (const color in game.unplayedPieces) {
			for (const piece of [...redPieces, ...bluePieces, ...greenPieces, ...yellowPieces]) {
				if (piece.piece.id === game.currentPiece.piece.id) {
					return piece;
				}
			}
		}
	});
</script>

<div class="grid grid-cols-2 grid-rows-2">
	<div class="grid grid-cols-5 grid-rows-5">
		{#each redPieces as piece}
			<div class:selected={piece === selectedPiece}>
				<StandalonePiece {piece} />
			</div>
		{/each}
	</div>
	<div class="grid grid-cols-5 grid-rows-5">
		{#each bluePieces as piece}
			<div class:selected={piece === selectedPiece}>
				<StandalonePiece {piece} />
			</div>
		{/each}
	</div>
	<div class="grid grid-cols-5 grid-rows-5">
		{#each greenPieces as piece}
			<div class:selected={piece === selectedPiece}>
				<StandalonePiece {piece} />
			</div>
		{/each}
	</div>
	<div class="grid grid-cols-5 grid-rows-5">
		{#each yellowPieces as piece}
			<div class:selected={piece === selectedPiece}>
				<StandalonePiece {piece} />
			</div>
		{/each}
	</div>
</div>

<style>
	.selected {
		border: 2px solid black;
	}
</style>
