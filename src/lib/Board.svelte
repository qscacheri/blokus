<script lang="ts">
	import Block from './Block.svelte';
	import { game, type Color } from './Game.svelte';
	import PlayedPiece from './PlayedPiece.svelte';

	const width = 20;
	const height = 20;

	const possibleMoves = $derived.by(() => {
		const moves: any[] = [];
		for (const color in game.possibleMoves) {
			moves.push(...game.possibleMoves[color as Color]);
		}
		return moves;
	});
</script>

<div
	class="board col-span-1 col-start-2 row-span-2 aspect-square h-full overflow-hidden bg-purple-300"
	style="--width: {width}; --height: {height}"
>
	{#each Array.from({ length: width }) as _, row}
		{#each Array.from({ length: height }) as _, col}
			<Block x={col} y={row} color="#EFEFEF" />
		{/each}
	{/each}
	{#each game.playedPieces as playedPiece}
		<PlayedPiece piece={playedPiece} />
	{/each}
	{#each possibleMoves as move}
		<Block x={move.x} y={move.y} />
	{/each}
	{#if game.currentPossiblePosition}
		<Block x={game.currentPossiblePosition.x} y={game.currentPossiblePosition.y} color="orange" />
	{/if}
</div>

<style>
	.board {
		--block-size: 5%;
		display: grid;
		grid-template-columns: repeat(var(--width), var(--block-size));
		grid-template-rows: repeat(var(--height), var(--block-size));
	}
</style>
