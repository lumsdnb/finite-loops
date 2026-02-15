<script lang="ts">
	import FeaturedReleaseCard from '$lib/FeaturedReleaseCard.svelte';
	import { releases } from '$lib/releases';
	import { posts } from '$lib/blog';
</script>

<div class="page">
	<div class="container">
		<!-- Hero -->
		<section class="hero">
			<div class="hero-text">
				<h1>FINITE<span class="accent">LOOPS</span></h1>
				<p class="hero-sub">music collective // experimental electronics</p>
			</div>
			<div class="spray-line"></div>
		</section>

		<!-- Featured Release -->
		<section class="section">
			<h3 class="section-title">Latest Release</h3>
			<FeaturedReleaseCard release={releases[0]} />
		</section>

		<!-- Recent Posts -->
		<section class="section">
			<h3 class="section-title">Recent Posts</h3>
			<div class="posts-list">
				{#each posts.slice(0, 3) as post}
					<a href="/blog/{post.slug}" class="post-card card">
						<span class="post-date">{post.date}</span>
						<h4 class="post-title">{post.title}</h4>
						<p class="post-excerpt">{post.excerpt}</p>
					</a>
				{/each}
			</div>
		</section>

		<!-- All Releases -->
		<section class="section">
			<h3 class="section-title">Discography</h3>
			<div class="release-grid">
				{#each releases as release}
					<a href="/releases/{release.slug}" class="release-thumb card">
						<img src={release.img} alt={release.title} />
						<div class="release-thumb-info">
							<span class="release-thumb-title">{release.title}</span>
							<span class="release-thumb-date">{release.release_date}</span>
						</div>
					</a>
				{/each}
			</div>
		</section>
	</div>
</div>

<style>
	.hero {
		padding: 80px 0 40px;
	}

	.hero-text h1 {
		font-size: 3.5rem;
		letter-spacing: 0.15em;
		line-height: 1;
	}

	.accent {
		color: var(--cyan);
	}

	.hero-sub {
		font-size: 0.9rem;
		color: var(--text-muted);
		margin-top: 12px;
		letter-spacing: 0.05em;
	}

	.posts-list {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.post-card {
		display: block;
		text-decoration: none;
		color: var(--text);
	}

	.post-date {
		font-size: 0.75rem;
		color: var(--text-dim);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.post-title {
		margin-top: 4px;
		color: var(--text);
	}

	.post-excerpt {
		font-size: 0.85rem;
		color: var(--text-muted);
		margin-top: 4px;
	}

	.post-card:hover .post-title {
		color: var(--accent);
	}

	.release-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 16px;
	}

	.release-thumb {
		text-decoration: none;
		color: var(--text);
	}

	.release-thumb img {
		width: 100%;
		aspect-ratio: 1;
		object-fit: cover;
	}

	.release-thumb-info {
		padding-top: 8px;
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.release-thumb-title {
		font-size: 0.9rem;
		font-weight: 700;
		text-transform: uppercase;
	}

	.release-thumb-date {
		font-size: 0.75rem;
		color: var(--text-muted);
	}

	.release-thumb:hover .release-thumb-title {
		color: var(--accent);
	}

	@media (max-width: 600px) {
		.hero-text h1 {
			font-size: 2.2rem;
		}

		.release-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}
</style>
