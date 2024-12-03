<script lang="ts">
	import Block from '$lib/Block.svelte';
	import { game } from '$lib/Game.svelte';
	import { PieceModel } from '$lib/PieceModel';
	import { pieces } from '$lib/pieces';
	import PlayedPiece from '$lib/PlayedPiece.svelte';
	import { PlayedPieceModel } from '$lib/PlayedPieceModel';
	import UnplayedPieces from '$lib/UnplayedPieces.svelte';
	import { onMount } from 'svelte';

	onMount(() => {
		game.start();
	});

	const width = 20;
	const height = 20;

	const pp = new PlayedPieceModel(new PieceModel(pieces[0]), 'red');
	pp.position = { x: 0, y: 0 };

	$inspect(game.possibleMoves);

	$effect(() => {
		for (const color in game.possibleMoves) {
			console.log(`Possible moves for ${color}:`, game.possibleMoves[color]);
		}
	});

	const possibleMoves = $derived.by(() => {
		const moves: any[] = [];
		for (const color in game.possibleMoves) {
			moves.push(...game.possibleMoves[color]);
		}
		return moves;
	});
</script>

<main class="flex">
	<div class="board" style="--width: {width}; --height: {height}">
		{#each Array.from({ length: width }) as _, row}
			{#each Array.from({ length: height }) as _, col}
				<Block x={col} y={row} color="#EEEEEE" />
			{/each}
		{/each}
		{#each game.playedPieces as playedPiece}
			<PlayedPiece piece={playedPiece} />
		{/each}
		{#each possibleMoves as move}
			<Block x={move.x} y={move.y} />
		{/each}
	</div>

	<UnplayedPieces />
</main>

<style>
	.board {
		display: grid;
		grid-template-columns: repeat(var(--width), var(--block-size));
		grid-template-rows: repeat(var(--height), var(--block-size));
	}
</style>
