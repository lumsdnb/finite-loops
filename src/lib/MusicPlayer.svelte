<script lang="ts">
	import { getPlayer } from '$lib/stores/player.svelte';

	const player = getPlayer();
</script>

{#if player.currentRelease}
	<div class="player-bar">
		<div class="player-inner">
			<div class="player-info">
				<span class="player-title">{player.currentRelease.title}</span>
				<span class="player-artist">{player.currentRelease.artist}</span>
			</div>
			<div class="player-embed">
				<iframe
					title="Bandcamp player"
					style="border: 0; width: 400px; height: 42px;"
					src="https://bandcamp.com/EmbeddedPlayer/album={player.bandcampAlbumId}/size=small/bgcol=0a0a0a/linkcol=00e5ff/transparent=true/"
					seamless
				></iframe>
			</div>
			<a
				href={player.currentRelease.bandcampUrl}
				target="_blank"
				rel="noopener"
				class="player-link"
			>
				BANDCAMP
			</a>
		</div>
	</div>
{/if}

<style>
	.player-bar {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: var(--player-height);
		background: var(--bg);
		border-top: 2px solid var(--border);
		z-index: 100;
		display: flex;
		align-items: center;
	}

	.player-inner {
		max-width: 960px;
		margin: 0 auto;
		padding: 0 20px;
		width: 100%;
		display: flex;
		align-items: center;
		gap: 20px;
	}

	.player-info {
		display: flex;
		flex-direction: column;
		min-width: 120px;
	}

	.player-title {
		font-size: 0.9rem;
		font-weight: 700;
		text-transform: uppercase;
		color: var(--accent);
	}

	.player-artist {
		font-size: 0.75rem;
		color: var(--text-muted);
	}

	.player-embed {
		flex: 1;
		display: flex;
		justify-content: center;
		overflow: hidden;
	}

	.player-embed iframe {
		max-width: 100%;
	}

	.player-link {
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--text-muted);
		border: 1px solid var(--border);
		padding: 4px 12px;
		text-decoration: none;
		transition: color 0.15s, border-color 0.15s;
	}

	.player-link:hover {
		color: var(--accent);
		border-color: var(--accent);
	}

	@media (max-width: 600px) {
		.player-link {
			display: none;
		}

		.player-info {
			min-width: 80px;
		}
	}
</style>
