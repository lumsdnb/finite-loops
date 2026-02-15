<script lang="ts">
	import { page } from '$app/state';
	import { getArtistBySlug } from '$lib/artists';
	import { getReleaseBySlug } from '$lib/releases';

	let artist = $derived(getArtistBySlug(page.params.slug ?? ''));
	let artistReleases = $derived(
		artist ? artist.releases.map((slug) => getReleaseBySlug(slug)).filter(Boolean) : []
	);
</script>

{#if artist}
	<div class="page">
		<div class="container">
			<section class="section">
				<a href="/artists" class="back-link">&larr; All Artists</a>

				<h1 class="artist-name">{artist.name}</h1>
				<p class="artist-bio">{artist.bio}</p>

				<div class="artist-releases">
					<h4 class="section-title">Releases</h4>
					<div class="release-grid">
						{#each artistReleases as release}
							{#if release}
								<a href="/releases/{release.slug}" class="release-card card">
									<img src={release.img} alt={release.title} />
									<div class="release-info">
										<span class="release-title">{release.title}</span>
										<span class="release-date">{release.release_date}</span>
									</div>
								</a>
							{/if}
						{/each}
					</div>
				</div>
			</section>
		</div>
	</div>
{:else}
	<div class="page">
		<div class="container">
			<section class="section">
				<h3 class="section-title">Artist not found</h3>
				<a href="/artists">&larr; Back to artists</a>
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

	.artist-name {
		font-size: 2.4rem;
		color: var(--accent);
	}

	.artist-bio {
		font-size: 1rem;
		color: var(--text-muted);
		margin-top: 8px;
		max-width: 600px;
	}

	.artist-releases {
		margin-top: 48px;
	}

	.release-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 20px;
	}

	.release-card {
		text-decoration: none;
		color: var(--text);
	}

	.release-card img {
		width: 100%;
		aspect-ratio: 1;
		object-fit: cover;
	}

	.release-info {
		padding-top: 10px;
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.release-title {
		font-size: 0.9rem;
		font-weight: 700;
		text-transform: uppercase;
	}

	.release-date {
		font-size: 0.75rem;
		color: var(--text-muted);
	}

	.release-card:hover .release-title {
		color: var(--accent);
	}

	@media (max-width: 600px) {
		.release-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}
</style>
