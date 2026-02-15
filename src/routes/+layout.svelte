<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Nav from '$lib/Nav.svelte';
	import MusicPlayer from '$lib/MusicPlayer.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="noise-overlay"></div>
<Nav />

<main>
	{@render children()}
</main>

<MusicPlayer />
