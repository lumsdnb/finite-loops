<script lang="ts">
	import { onMount } from 'svelte';

	let loaded = $state(false);

	onMount(async () => {
		await import('../../fl-404');
		loaded = true;
	});
</script>

<svelte:head>
	<title>FL-404 | finite loops</title>
</svelte:head>

<div class="sp-page">
	{#if loaded}
		<fl-404></fl-404>
	{/if}
</div>

<style>
	.sp-page {
		height: calc(100dvh - var(--nav-height) - var(--player-height));
		padding-top: var(--nav-height);
		overflow: hidden;
	}

	.sp-page :global(fl-404) {
		height: 100%;
		min-height: 0;
	}
</style>
