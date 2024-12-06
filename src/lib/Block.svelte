<script lang="ts">
	import Color from 'color';

	interface Props {
		x: number;
		y: number;
		color?: string;
	}

	const { x, y, color = 'magenta' }: Props = $props();

	let col = $derived(x + 1);
	let row = $derived(y + 1);

	const lighter = $derived(Color(color).lighten(0.5).hex());
</script>

<div class="block" style="--col: {col}; --row: {row}; --color: {color}; --lighter: {lighter}"></div>

<style lang="postcss">
	.block {
		display: flex;
		justify-content: center;
		align-items: center;
		grid-column: var(--col);
		grid-row: var(--row);
		background-color: var(--lighter);
		border: 1px solid #ffffff;
		box-shadow: inset 0 0 10px 5px var(--color);
	}
</style>
