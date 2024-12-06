<script lang="ts">
	import Board from '$lib/Board.svelte';
	import { Colors, game } from '$lib/Game.svelte';
	import UnplayedPieces from '$lib/UnplayedPieces.svelte';
	import { onMount } from 'svelte';

	onMount(() => {
		game.start();
	});
</script>

<main class="grid h-screen w-screen place-items-center">
	<div class="col-start-1 row-start-1 h-full w-full bg-blue-300">
		<UnplayedPieces color={Colors.blue} />
	</div>
	<div class="col-start-1 row-start-2 h-full w-full bg-red-300">
		<UnplayedPieces color={Colors.red} />
	</div>

	<Board />
	<div class="col-start-3 row-start-2 h-full w-full bg-green-200">
		<UnplayedPieces color={Colors.green} />
	</div>
	<div class="col-start-3 row-start-1 h-full w-full bg-yellow-200">
		<UnplayedPieces color={Colors.yellow} />
	</div>
</main>

<!-- <input type="range" min="0" max="1000" bind:value={game.speed} /> -->

<style>
	main {
		grid-template-columns: minmax(250px, 1fr) auto minmax(250px, 1fr);
		grid-template-rows: minmax(0, 1fr) minmax(0, 1fr);
		--unplayed-size: 250px;
		background: #222222;
		display: grid;
	}
</style>
