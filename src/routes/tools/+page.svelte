<div class="page">
	<div class="container">
		<section class="section">
			<h3 class="section-title">Tools</h3>
			<div class="tool-grid">
				<a href="/tools/stems" class="tool-card card">
					<span class="tool-icon">////</span>
					<h4 class="tool-name">Stem Separator</h4>
					<p class="tool-desc">
						Split any track into vocals, drums, bass, and other stems using AI source separation.
					</p>
					<span class="tool-tag tag">Demucs</span>
				</a>
			</div>
		</section>
	</div>
</div>

<style>
	.tool-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 16px;
	}

	.tool-card {
		display: flex;
		flex-direction: column;
		gap: 8px;
		text-decoration: none;
		color: var(--text);
	}

	.tool-icon {
		font-size: 1.6rem;
		color: var(--accent);
		font-weight: 700;
		letter-spacing: 0.1em;
	}

	.tool-name {
		margin-top: 4px;
	}

	.tool-card:hover .tool-name {
		color: var(--accent);
	}

	.tool-desc {
		font-size: 0.85rem;
		color: var(--text-muted);
		line-height: 1.5;
	}

	@media (max-width: 600px) {
		.tool-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
