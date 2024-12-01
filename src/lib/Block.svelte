<script lang="ts">
	interface Props {
		x: number;
		y: number;
		color?: string;
	}

	const { x, y, color = 'magenta' }: Props = $props();

	console.log({
		x,
		y,
		col: x + 1,
		row: y + 1
	});
</script>

<div class="block" style="--col: {x + 1}; --row: {y + 1}; --color: {color};"></div>

<style>
	.block {
		grid-column: var(--col);
		grid-row: var(--row);
		background: var(--color);
		border: 1px solid #000;
	}
</style>
