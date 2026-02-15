<script lang="ts">
	import { releases } from '$lib/releases';
</script>

<div class="page">
	<div class="container">
		<section class="section">
			<h3 class="section-title">Releases</h3>
			<div class="release-grid">
				{#each releases as release}
					<a href="/releases/{release.slug}" class="release-card card">
						<img src={release.img} alt={release.title} />
						<div class="release-info">
							<span class="release-title">{release.title}</span>
							<span class="release-date">{release.release_date}</span>
							<span class="release-tracks">{release.tracks.length} tracks</span>
						</div>
					</a>
				{/each}
			</div>
		</section>
	</div>
</div>

<style>
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
		font-size: 1rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.release-date {
		font-size: 0.75rem;
		color: var(--text-muted);
	}

	.release-tracks {
		font-size: 0.75rem;
		color: var(--text-dim);
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
