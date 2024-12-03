<script lang="ts">
	interface Props {
		x: number;
		y: number;
		color?: string;
	}

	const { x, y, color = 'magenta' }: Props = $props();

	let col = $derived(x + 1);
	let row = $derived(y + 1);
</script>

<div class="block" style="--col: {col}; --row: {row}; --color: {color};"></div>

<style>
	.block {
		grid-column: var(--col);
		grid-row: var(--row);
		background: var(--color);
		border: 1px solid #000;
	}
</style>
