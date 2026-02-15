<script lang="ts">
	import { posts } from '$lib/blog';
</script>

<div class="page">
	<div class="container">
		<section class="section">
			<h3 class="section-title">Blog</h3>
			<div class="posts-list">
				{#each posts as post}
					<a href="/blog/{post.slug}" class="post-card card">
						<span class="post-date">{post.date}</span>
						<h4 class="post-title">{post.title}</h4>
						<p class="post-excerpt">{post.excerpt}</p>
					</a>
				{/each}
			</div>
		</section>
	</div>
</div>

<style>
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
</style>
