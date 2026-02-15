<script lang="ts">
	import { page } from '$app/state';
	import { getReleaseBySlug } from '$lib/releases';
	import { getPlayer } from '$lib/stores/player.svelte';

	const player = getPlayer();

	let release = $derived(getReleaseBySlug(page.params.slug ?? ''));
</script>

{#if release}
	<div class="page">
		<div class="container">
			<section class="section">
				<a href="/releases" class="back-link">&larr; All Releases</a>

				<div class="release-detail">
					<div class="release-cover">
						<img src={release.img} alt={release.title} />
					</div>

					<div class="release-meta">
						<h1 class="release-title">{release.title}</h1>
						<p class="release-date">{release.release_date}</p>

						<div class="release-actions">
							<button class="btn" onclick={() => player.play(release!)}>
								&#9654; Play
							</button>
							<a href={release.bandcampUrl} target="_blank" rel="noopener" class="btn">
								Bandcamp
							</a>
						</div>

						<div class="tracklist">
							<h4>Tracklist</h4>
							{#each release.tracks as track, i}
								<div class="track">
									<span class="track-num">{String(i + 1).padStart(2, '0')}</span>
									<span class="track-title">{track.title}</span>
									<span class="track-duration">{track.duration}</span>
								</div>
							{/each}
						</div>

						<div class="contributors">
							<h4>Contributors</h4>
							<div class="contributor-tags">
								{#each release.contributors as name}
									<a href="/artists/{name}" class="tag">{name}</a>
								{/each}
							</div>
						</div>

						<div class="sha">
							<h4>SHA-256</h4>
							<code class="sha-hash">{release.sha256}</code>
						</div>
					</div>
				</div>
			</section>
		</div>
	</div>
{:else}
	<div class="page">
		<div class="container">
			<section class="section">
				<h3 class="section-title">Release not found</h3>
				<a href="/releases">&larr; Back to releases</a>
			</section>
		</div>
	</div>
{/if}

<style>
	.back-link {
		display: inline-block;
		font-size: 0.85rem;
		color: var(--text-muted);
		margin-bottom: 24px;
	}

	.back-link:hover {
		color: var(--accent);
	}

	.release-detail {
		display: grid;
		grid-template-columns: 1fr 1.2fr;
		gap: 40px;
	}

	.release-cover img {
		width: 100%;
		aspect-ratio: 1;
		object-fit: cover;
		border: 2px solid var(--border);
	}

	.release-title {
		font-size: 2.4rem;
		color: var(--accent);
	}

	.release-date {
		font-size: 0.85rem;
		color: var(--text-muted);
		margin-top: 4px;
	}

	.release-actions {
		display: flex;
		gap: 12px;
		margin-top: 20px;
	}

	.tracklist {
		margin-top: 32px;
	}

	.tracklist h4 {
		color: var(--text-muted);
		margin-bottom: 12px;
	}

	.track {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 6px 0;
		border-bottom: 1px solid var(--border);
		font-size: 0.9rem;
	}

	.track-num {
		color: var(--text-dim);
		font-size: 0.8rem;
	}

	.track-title {
		flex: 1;
	}

	.track-duration {
		color: var(--text-muted);
		font-size: 0.8rem;
	}

	.contributors {
		margin-top: 32px;
	}

	.contributors h4 {
		color: var(--text-muted);
		margin-bottom: 12px;
	}

	.contributor-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}

	.sha {
		margin-top: 32px;
	}

	.sha h4 {
		color: var(--text-muted);
		margin-bottom: 8px;
	}

	.sha-hash {
		font-size: 0.7rem;
		color: var(--text-dim);
		word-break: break-all;
	}

	@media (max-width: 600px) {
		.release-detail {
			grid-template-columns: 1fr;
		}
	}
</style>
