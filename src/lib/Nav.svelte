<script lang="ts">
	import { page } from '$app/state';

	const links = [
		{ href: '/', label: 'Home' },
		{ href: '/releases', label: 'Releases' },
		{ href: '/artists', label: 'Artists' },
		{ href: '/blog', label: 'Blog' }
	];

	let menuOpen = $state(false);
</script>

<nav class="nav">
	<div class="nav-inner">
		<a href="/" class="nav-logo">FINITE<span class="logo-accent">LOOPS</span></a>

		<button class="nav-toggle" onclick={() => (menuOpen = !menuOpen)} aria-label="Toggle menu">
			{menuOpen ? '////' : '////'}
		</button>

		<ul class="nav-links" class:open={menuOpen}>
			{#each links as link}
				<li>
					<a
						href={link.href}
						class:active={page.url.pathname === link.href ||
							(link.href !== '/' && page.url.pathname.startsWith(link.href))}
						onclick={() => (menuOpen = false)}
					>
						{link.label}
					</a>
				</li>
			{/each}
		</ul>
	</div>
</nav>

<style>
	.nav {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		height: var(--nav-height);
		background: var(--bg);
		border-bottom: 2px solid var(--border);
		z-index: 100;
		display: flex;
		align-items: center;
	}

	.nav-inner {
		max-width: 960px;
		margin: 0 auto;
		padding: 0 20px;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.nav-logo {
		font-size: 1.2rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--text);
		text-decoration: none;
	}

	.logo-accent {
		color: var(--cyan);
	}

	.nav-links {
		display: flex;
		list-style: none;
		gap: 24px;
	}

	.nav-links a {
		font-size: 0.85rem;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--text-muted);
		text-decoration: none;
		padding: 4px 0;
		border-bottom: 2px solid transparent;
		transition: color 0.15s, border-color 0.15s;
	}

	.nav-links a:hover {
		color: var(--text);
	}

	.nav-links a.active {
		color: var(--accent);
		border-bottom-color: var(--accent);
	}

	.nav-toggle {
		display: none;
		background: none;
		border: 1px solid var(--border);
		color: var(--accent);
		font-family: var(--font-mono);
		font-size: 1rem;
		padding: 4px 8px;
		cursor: pointer;
	}

	@media (max-width: 600px) {
		.nav-toggle {
			display: block;
		}

		.nav-links {
			display: none;
			position: absolute;
			top: var(--nav-height);
			left: 0;
			right: 0;
			flex-direction: column;
			background: var(--bg);
			border-bottom: 2px solid var(--border);
			padding: 16px 20px;
			gap: 12px;
		}

		.nav-links.open {
			display: flex;
		}
	}
</style>
