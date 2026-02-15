<script lang="ts">
	import type { Release } from '$lib/releases';
	import { getPlayer } from '$lib/stores/player.svelte';

	let { release }: { release: Release } = $props();

	const player = getPlayer();
</script>

<div class="featured">
	<div class="featured-img">
		<img src={release.img} alt={release.title} />
		<div class="featured-overlay">
			<button class="play-btn" onclick={() => player.play(release)}>PLAY</button>
		</div>
	</div>
	<div class="featured-info">
		<span class="tag">Latest Release</span>
		<h2>{release.title}</h2>
		<p class="meta">{release.release_date}</p>
		<p class="contributors">{release.contributors.join(' / ')}</p>
		<div class="track-list">
			{#each release.tracks as track}
				<div class="track">
					<span class="track-title">{track.title}</span>
					<span class="track-duration">{track.duration}</span>
				</div>
			{/each}
		</div>
		<div class="featured-actions">
			<button class="btn" onclick={() => player.play(release)}>PLAY</button>
			<a href="/releases/{release.slug}" class="btn">DETAILS</a>
		</div>
	</div>
</div>

<style>
	.featured {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 32px;
		border: 2px solid var(--border);
		background: var(--bg-surface);
	}

	.featured-img {
		position: relative;
		overflow: hidden;
	}

	.featured-img img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}

	.featured-overlay {
		position: absolute;
		inset: 0;
		background: rgba(0, 0, 0, 0.6);
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 0;
		transition: opacity 0.2s;
	}

	.featured-img:hover .featured-overlay {
		opacity: 1;
	}

	.play-btn {
		font-family: var(--font-mono);
		font-size: 1.2rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--cyan);
		background: none;
		border: 2px solid var(--cyan);
		padding: 12px 32px;
		cursor: pointer;
		transition: background 0.15s, color 0.15s;
	}

	.play-btn:hover {
		background: var(--cyan);
		color: var(--bg);
	}

	.featured-info {
		padding: 24px;
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.featured-info h2 {
		font-size: 2rem;
		color: var(--text);
	}

	.meta {
		font-size: 0.85rem;
		color: var(--text-muted);
	}

	.contributors {
		font-size: 0.85rem;
		color: var(--accent);
	}

	.track-list {
		display: flex;
		flex-direction: column;
		gap: 4px;
		margin: 8px 0;
	}

	.track {
		display: flex;
		justify-content: space-between;
		font-size: 0.8rem;
		color: var(--text-muted);
		padding: 4px 0;
		border-bottom: 1px solid var(--border);
	}

	.track-duration {
		color: var(--text-dim);
	}

	.featured-actions {
		display: flex;
		gap: 12px;
		margin-top: 8px;
	}

	@media (max-width: 600px) {
		.featured {
			grid-template-columns: 1fr;
		}
	}
</style>
