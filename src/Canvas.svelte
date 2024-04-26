<!--<script>
	import { onMount } from "svelte";

	export let color;
	export let size;

	let canvas;
	let context;
	let previous;

	function get_coords(e) {
		const { clientX, clientY } = e;
		const { left, top } = canvas.getBoundingClientRect();
		const x = clientX - left;
		const y = clientY - top;
		return { x, y };
	}

	onMount(() => {
		context = canvas.getContext('2d');

		function resize() {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		}

		window.addEventListener('resize', resize);
		resize();

		return () => {
			window.removeEventListener('resize', resize);
		};
	});
</script>



<canvas
	bind:this={canvas}
	on:pointerdown={(e) => {
		const coords = get_coords(e);
		context.fillStyle = color;
		context.beginPath();
		context.arc(coords.x, coords.y, size / 2, 0, 2 * Math.PI);
		context.fill();

		previous = coords;
	}}
	on:pointerleave={() => {
		previous = null;
	}}
	on:pointermove={(e) => {
		const coords = get_coords(e);

		if (e.buttons === 1) {
			e.preventDefault();

			context.strokeStyle = color;
			context.lineWidth = size;
			context.lineCap = 'round';
			context.beginPath();
			context.moveTo(previous.x, previous.y);
			context.lineTo(coords.x, coords.y);
			context.stroke();
		}

		previous = coords;
	}}
/>

{#if previous}
	<div
		class="preview"
		style="--color: {color}; --size: {size}px; --x: {previous.x}px; --y: {previous.y}px" 
	/>
{/if}

<style>
	canvas {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
	}

	.preview {
		position: absolute;
		left: var(--x);
		top: var(--y);
		width: var(--size);
		height: var(--size);
		transform: translate(-50%, -50%);
		background: var(--color);
		border-radius: 50%;
		opacity: 0.5;
		pointer-events: none;
	}
</style>
-->

<script>
	import { setContext, afterUpdate, onMount, tick } from 'svelte';

	export let width = 100;
	export let height = 100;

	let canvas, ctx;
	let items = new Set();
	let scheduled = false;

	onMount(() => {
		ctx = canvas.getContext('2d');
	});

	setContext('canvas', {
		addItem
	});

	function addItem(fn) {
		onMount(() => {
			items.add(fn);
			return () => items.delete(fn);
		});
		
		afterUpdate(async () => {
			if (scheduled) return;
			
			scheduled = true;
			await tick();
			scheduled = false;

			draw();
		});
	}

	function draw() {
		ctx.clearRect(0, 0, width, height);
		items.forEach(fn => fn(ctx));
	}
</script>

<canvas bind:this={canvas} {width} {height}>
	<slot />
</canvas>

<style>
	canvas {
		width: 100%;
		height: 100%;
	}
</style>