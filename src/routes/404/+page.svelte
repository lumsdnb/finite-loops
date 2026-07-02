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

<div class="page">
	<div class="container">
		<section class="section">
			<h3 class="section-title">FL-404</h3>
			{#if loaded}
				<sp-app></sp-app>
			{/if}
		</section>
	</div>
</div>
