<script lang="ts">
	import { onMount } from 'svelte';

	let loaded = $state(false);

	onMount(async () => {
		await import('../../sp-app');
		loaded = true;
	});
</script>

<svelte:head>
	<title>FL-404 | finite loops</title>
</svelte:head>

<div class="sp-page">
	{#if loaded}
		<sp-app></sp-app>
	{/if}
</div>

<style>
	.sp-page {
		height: calc(100dvh - var(--nav-height) - var(--player-height));
		padding-top: var(--nav-height);
		overflow: hidden;
	}

	.sp-page :global(sp-app) {
		height: 100%;
		min-height: 0;
	}
</style>
