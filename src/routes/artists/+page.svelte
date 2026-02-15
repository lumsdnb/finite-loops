<script lang="ts">
	import { artists } from '$lib/artists';
</script>

<div class="page">
	<div class="container">
		<section class="section">
			<h3 class="section-title">Artists</h3>
			<div class="artists-list">
				{#each artists as artist}
					<a href="/artists/{artist.slug}" class="artist-card card">
						<h4 class="artist-name">{artist.name}</h4>
						<p class="artist-bio">{artist.bio}</p>
						<span class="artist-releases">{artist.releases.length} release{artist.releases.length !== 1 ? 's' : ''}</span>
					</a>
				{/each}
			</div>
		</section>
	</div>
</div>

<style>
	.artists-list {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.artist-card {
		text-decoration: none;
		color: var(--text);
		display: block;
	}

	.artist-name {
		font-size: 1.1rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.artist-bio {
		font-size: 0.85rem;
		color: var(--text-muted);
		margin-top: 6px;
	}

	.artist-releases {
		display: inline-block;
		font-size: 0.75rem;
		color: var(--text-dim);
		margin-top: 8px;
	}

	.artist-card:hover .artist-name {
		color: var(--accent);
	}
</style>
