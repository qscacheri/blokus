<script lang="ts">
	import Block from '$lib/Block.svelte';
	import { game, type Color } from '$lib/Game.svelte';
	import PlayedPiece from '$lib/PlayedPiece.svelte';
	import UnplayedPieces from '$lib/UnplayedPieces.svelte';
	import { onMount } from 'svelte';

	onMount(() => {
		game.start();
	});

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

<main class="grid h-screen w-screen place-items-center">
	<div class="relative flex h-full w-full max-w-[1200px]">
		<div class="absolute z-0 h-full w-full bg-white bg-opacity-35 blur-sm"></div>
		<div class="board" style="--width: {width}; --height: {height}">
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
				<Block
					x={game.currentPossiblePosition.x}
					y={game.currentPossiblePosition.y}
					color="orange"
				/>
			{/if}
		</div>

		<UnplayedPieces />
	</div>
</main>
<input type="range" min="0" max="1000" bind:value={game.speed} />

<style>
	main {
		background-image: linear-gradient(
			110deg,
			hsl(0deg 100% 91%) 0%,
			hsl(342deg 92% 87%) 8%,
			hsl(319deg 66% 81%) 17%,
			hsl(279deg 61% 78%) 25%,
			hsl(238deg 86% 80%) 33%,
			hsl(198deg 100% 62%) 42%,
			hsl(187deg 100% 50%) 50%,
			hsl(170deg 88% 64%) 58%,
			hsl(116deg 100% 85%) 67%,
			hsl(99deg 100% 85%) 75%,
			hsl(84deg 99% 85%) 83%,
			hsl(72deg 99% 86%) 92%,
			hsl(60deg 100% 88%) 100%
		);
	}

	.board {
		display: grid;
		grid-template-columns: repeat(var(--width), var(--block-size));
		grid-template-rows: repeat(var(--height), var(--block-size));
	}
</style>
