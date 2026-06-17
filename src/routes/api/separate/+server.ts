import type { RequestHandler } from './$types';

const DEMUCS_URL = 'http://localhost:8001';
const TIMEOUT_MS = 10 * 60 * 1000; // 10 minutes

export const POST: RequestHandler = async ({ request }) => {
	const contentType = request.headers.get('content-type') || '';
	if (!contentType.includes('multipart/form-data')) {
		return new Response(JSON.stringify({ error: 'Expected multipart/form-data' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	const formData = await request.formData();
	const file = formData.get('file');
	const stems = formData.get('stems');

	if (!file || !(file instanceof File)) {
		return new Response(JSON.stringify({ error: 'No file provided' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	// Build the upstream request
	const upstreamForm = new FormData();
	upstreamForm.append('file', file, file.name);

	const stemsParam = typeof stems === 'string' ? stems : 'vocals,drums,bass,other';
	const url = `${DEMUCS_URL}/separate?stems=${encodeURIComponent(stemsParam)}`;

	try {
		const controller = new AbortController();
		const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

		const response = await fetch(url, {
			method: 'POST',
			body: upstreamForm,
			signal: controller.signal
		});

		clearTimeout(timeout);

		if (!response.ok) {
			const text = await response.text();
			return new Response(text, {
				status: response.status,
				headers: { 'Content-Type': 'application/json' }
			});
		}

		// Stream the ZIP back to the client
		return new Response(response.body, {
			status: 200,
			headers: {
				'Content-Type': 'application/zip',
				'Content-Disposition': 'attachment; filename="stems.zip"'
			}
		});
	} catch (err) {
		if (err instanceof DOMException && err.name === 'AbortError') {
			return new Response(JSON.stringify({ error: 'Request timed out' }), {
				status: 504,
				headers: { 'Content-Type': 'application/json' }
			});
		}

		return new Response(
			JSON.stringify({ error: 'Stem separation service unavailable' }),
			{
				status: 502,
				headers: { 'Content-Type': 'application/json' }
			}
		);
	}
};
