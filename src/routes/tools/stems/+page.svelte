<script lang="ts">
	const STEMS = ['vocals', 'drums', 'bass', 'other'] as const;
	const MAX_FILE_SIZE = 50 * 1024 * 1024;
	const ACCEPTED_FORMATS = '.mp3,.wav,.flac,.ogg';

	let file = $state<File | null>(null);
	let selectedStems = $state<Set<string>>(new Set(STEMS));
	let status = $state<'idle' | 'uploading' | 'done' | 'error'>('idle');
	let errorMessage = $state('');
	let downloadUrl = $state('');
	let dragging = $state(false);

	function handleFileSelect(e: Event) {
		const input = e.target as HTMLInputElement;
		if (input.files?.[0]) {
			setFile(input.files[0]);
		}
	}

	function handleDrop(e: DragEvent) {
		e.preventDefault();
		dragging = false;
		const dropped = e.dataTransfer?.files?.[0];
		if (dropped) {
			setFile(dropped);
		}
	}

	function setFile(f: File) {
		const ext = f.name.split('.').pop()?.toLowerCase();
		if (!ext || !['mp3', 'wav', 'flac', 'ogg'].includes(ext)) {
			errorMessage = `Unsupported format: .${ext}`;
			status = 'error';
			return;
		}
		if (f.size > MAX_FILE_SIZE) {
			errorMessage = 'File too large. Max size: 50MB';
			status = 'error';
			return;
		}
		file = f;
		status = 'idle';
		errorMessage = '';
	}

	function toggleStem(stem: string) {
		const next = new Set(selectedStems);
		if (next.has(stem)) {
			if (next.size > 1) next.delete(stem);
		} else {
			next.add(stem);
		}
		selectedStems = next;
	}

	async function separate() {
		if (!file || selectedStems.size === 0) return;

		// Clean up previous download URL
		if (downloadUrl) {
			URL.revokeObjectURL(downloadUrl);
			downloadUrl = '';
		}

		status = 'uploading';
		errorMessage = '';

		const formData = new FormData();
		formData.append('file', file);
		formData.append('stems', [...selectedStems].join(','));

		try {
			const res = await fetch('/api/separate', {
				method: 'POST',
				body: formData
			});

			if (!res.ok) {
				const text = await res.text();
				let msg = 'Separation failed';
				try {
					msg = JSON.parse(text).error || msg;
				} catch {}
				throw new Error(msg);
			}

			const blob = await res.blob();
			downloadUrl = URL.createObjectURL(blob);
			status = 'done';
		} catch (err) {
			errorMessage = err instanceof Error ? err.message : 'Something went wrong';
			status = 'error';
		}
	}

	function reset() {
		if (downloadUrl) URL.revokeObjectURL(downloadUrl);
		file = null;
		selectedStems = new Set(STEMS);
		status = 'idle';
		errorMessage = '';
		downloadUrl = '';
	}
</script>

<div class="page">
	<div class="container">
		<section class="section">
			<h3 class="section-title">Stem Separator</h3>
			<p class="tool-about">
				Split any track into individual stems using
				<a href="https://github.com/adefossez/demucs" target="_blank" rel="noopener">Demucs</a>,
				Meta's AI source separation model. Upload an audio file, pick which stems you want,
				and download the results.
			</p>

			<!-- Upload Zone -->
			<div
				class="upload-zone"
				class:dragging
				class:has-file={file !== null}
				role="button"
				tabindex="0"
				ondragover={(e) => { e.preventDefault(); dragging = true; }}
				ondragleave={() => (dragging = false)}
				ondrop={handleDrop}
				onclick={() => document.getElementById('file-input')?.click()}
				onkeydown={(e) => { if (e.key === 'Enter') document.getElementById('file-input')?.click(); }}
			>
				<input
					id="file-input"
					type="file"
					accept={ACCEPTED_FORMATS}
					onchange={handleFileSelect}
					hidden
				/>
				{#if file}
					<span class="upload-filename">{file.name}</span>
					<span class="upload-filesize">{(file.size / (1024 * 1024)).toFixed(1)} MB</span>
				{:else}
					<span class="upload-prompt">Drop audio file here or click to select</span>
					<span class="upload-formats">mp3 / wav / flac / ogg — max 50MB</span>
				{/if}
			</div>

			<!-- Stem Selector -->
			<div class="stem-selector">
				<span class="stem-label">Stems:</span>
				{#each STEMS as stem}
					<button
						class="stem-btn"
						class:selected={selectedStems.has(stem)}
						onclick={() => toggleStem(stem)}
					>
						{stem}
					</button>
				{/each}
			</div>

			<!-- Action -->
			{#if status === 'idle' && file}
				<button class="btn separate-btn" onclick={separate}>
					Separate
				</button>
			{/if}

			{#if status === 'uploading'}
				<div class="status-box">
					<span class="status-spinner"></span>
					<span>Separating stems... this may take a few minutes</span>
				</div>
			{/if}

			{#if status === 'error'}
				<div class="status-box error">
					<span>{errorMessage}</span>
					<button class="btn" onclick={reset}>Try Again</button>
				</div>
			{/if}

			{#if status === 'done'}
				<div class="status-box done">
					<span>Separation complete</span>
					<a class="btn" href={downloadUrl} download="stems.zip">Download ZIP</a>
					<button class="btn btn-secondary" onclick={reset}>Separate Another</button>
				</div>
			{/if}
		</section>
	</div>
</div>

<style>
	.tool-about {
		font-size: 0.9rem;
		color: var(--text-muted);
		line-height: 1.6;
		margin-bottom: 32px;
		max-width: 600px;
	}

	/* Upload Zone */
	.upload-zone {
		border: 2px dashed var(--border-hard);
		padding: 40px 20px;
		text-align: center;
		cursor: pointer;
		transition: border-color 0.15s, background 0.15s;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 8px;
	}

	.upload-zone:hover,
	.upload-zone.dragging {
		border-color: var(--accent);
		background: var(--bg-surface);
	}

	.upload-zone.has-file {
		border-style: solid;
		border-color: var(--accent);
	}

	.upload-prompt {
		font-size: 0.95rem;
		color: var(--text);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.upload-formats {
		font-size: 0.75rem;
		color: var(--text-dim);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.upload-filename {
		font-size: 1rem;
		color: var(--accent);
		font-weight: 700;
		word-break: break-all;
	}

	.upload-filesize {
		font-size: 0.8rem;
		color: var(--text-muted);
	}

	/* Stem Selector */
	.stem-selector {
		display: flex;
		align-items: center;
		gap: 8px;
		margin-top: 20px;
		flex-wrap: wrap;
	}

	.stem-label {
		font-size: 0.85rem;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--text-muted);
		margin-right: 4px;
	}

	.stem-btn {
		font-family: var(--font-mono);
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		padding: 6px 14px;
		border: 2px solid var(--border-hard);
		background: transparent;
		color: var(--text-muted);
		cursor: pointer;
		transition: border-color 0.15s, color 0.15s, background 0.15s;
	}

	.stem-btn:hover {
		border-color: var(--text);
		color: var(--text);
	}

	.stem-btn.selected {
		border-color: var(--accent);
		color: var(--accent);
		background: rgba(0, 229, 255, 0.08);
	}

	/* Separate Button */
	.separate-btn {
		margin-top: 24px;
	}

	/* Status */
	.status-box {
		margin-top: 24px;
		padding: 20px;
		border: 2px solid var(--border);
		background: var(--bg-surface);
		display: flex;
		align-items: center;
		gap: 16px;
		flex-wrap: wrap;
		font-size: 0.9rem;
		color: var(--text-muted);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.status-box.error {
		border-color: var(--pink);
		color: var(--pink);
	}

	.status-box.done {
		border-color: var(--lime);
		color: var(--lime);
	}

	.btn-secondary {
		border-color: var(--border-hard);
		color: var(--text-muted);
	}

	.btn-secondary:hover {
		background: var(--border-hard);
		color: var(--text);
	}

	/* Spinner */
	.status-spinner {
		width: 18px;
		height: 18px;
		border: 2px solid var(--border-hard);
		border-top-color: var(--accent);
		border-radius: 50%;
		animation: spin 0.8s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
</style>
