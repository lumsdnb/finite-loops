<script lang="ts">
	import { page } from '$app/state';
	import { getPostBySlug } from '$lib/blog';

	let post = $derived(getPostBySlug(page.params.slug ?? ''));
</script>

{#if post}
	<div class="page">
		<div class="container">
			<section class="section">
				<a href="/blog" class="back-link">&larr; All Posts</a>

				<article class="post">
					<header class="post-header">
						<span class="post-date">{post.date}</span>
						<h1 class="post-title">{post.title}</h1>
						<span class="post-author">by {post.author}</span>
					</header>

					<div class="spray-line"></div>

					<div class="post-content">
						{#each post.content.split('\n\n') as paragraph}
							<p>{paragraph}</p>
						{/each}
					</div>
				</article>
			</section>
		</div>
	</div>
{:else}
	<div class="page">
		<div class="container">
			<section class="section">
				<h3 class="section-title">Post not found</h3>
				<a href="/blog">&larr; Back to blog</a>
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

	.post-header {
		margin-bottom: 24px;
	}

	.post-date {
		font-size: 0.75rem;
		color: var(--text-dim);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.post-title {
		font-size: 2rem;
		color: var(--accent);
		margin-top: 8px;
	}

	.post-author {
		font-size: 0.85rem;
		color: var(--text-muted);
		display: block;
		margin-top: 4px;
	}

	.post-content {
		margin-top: 32px;
		max-width: 680px;
	}

	.post-content p {
		margin-bottom: 16px;
		line-height: 1.7;
		color: var(--text-muted);
	}
</style>
