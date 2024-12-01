<script lang="ts">
	import Block from '$lib/Block.svelte';
	import { game } from '$lib/Game.svelte';
	import { PieceModel } from '$lib/PieceModel';
	import { pieces } from '$lib/pieces';
	import PlayedPiece from '$lib/PlayedPiece.svelte';
	import { PlayedPieceModel } from '$lib/PlayedPieceModel';
	import { onMount } from 'svelte';

	onMount(() => {
		game.start();
	});

	const width = 20;
	const height = 20;

	const pp = new PlayedPieceModel(new PieceModel(pieces[0]), 'red');
	pp.position = { x: 15, y: 19 };

	$inspect(game.possibleMoves);

	$effect(() => {
		const values = Object.values(game.possibleMoves);
		for (const value of values) {
			console.log('POSSIBLE MOVE', value);
		}
	});
</script>

<div class="board" style="--width: {width}; --height: {height}">
	{#each Array.from({ length: width }) as _, row}
		{#each Array.from({ length: height }) as _, col}
			<Block x={col} y={row} color="#EEEEEE" />
			<!-- <div class="empty block" style="grid-column: {row + 1}; grid-row: {col + 1}"></div> -->
		{/each}
	{/each}
	{#each game.playedPieces as playedPiece}
		<PlayedPiece piece={playedPiece} />
	{/each}
	<!-- {#each Object.values(game.possibleMoves) as move} -->
	<!-- 	<Block x={move.x} y={move.y} /> -->
	<!-- {/each} -->
</div>

<style>
	.board {
		--size: 32px;
		display: grid;
		grid-template-columns: repeat(var(--width), var(--size));
		grid-template-rows: repeat(var(--height), var(--size));
	}

	.block {
		background: lightgray;
		border: 1px solid #000;
	}
</style>
