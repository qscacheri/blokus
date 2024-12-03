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
</script>

<div class="grid grid-cols-2 grid-rows-2">
	<div class="grid grid-cols-5 grid-rows-5">
		{#each redPieces as piece}
			<StandalonePiece {piece} />
		{/each}
	</div>
	<div class="grid grid-cols-5 grid-rows-5">
		{#each bluePieces as piece}
			<StandalonePiece {piece} />
		{/each}
	</div>
	<div class="grid grid-cols-5 grid-rows-5">
		{#each greenPieces as piece}
			<StandalonePiece {piece} />
		{/each}
	</div>
	<div class="grid grid-cols-5 grid-rows-5">
		{#each yellowPieces as piece}
			<StandalonePiece {piece} />
		{/each}
	</div>
</div>
