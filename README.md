 
# Finite Loops

Music collective website built with SvelteKit.

## Prerequisites

- Node.js
- Docker (for the stem separator tool)

## Developing

Install dependencies and start the dev server:

```sh
npm install
npm run dev
```

## Building

```sh
npm run build
```

Preview the production build with `npm run preview`.

## Stem Separator Service

The `/tools/stems` page provides AI-powered audio stem separation using [Demucs](https://github.com/adefossez/demucs) (Meta's music source separation model). It runs as a Docker service that SvelteKit proxies to.

### Setup

Build and start the Demucs service:

```sh
docker compose build    # ~5GB image (includes PyTorch + model weights)
docker compose up -d
```

Verify it's running:

```sh
curl http://localhost:8001/health
```

The service binds to `127.0.0.1:8001` (localhost only). SvelteKit proxies requests from `/api/separate` to the Docker service, so the port is never exposed publicly.

### Usage

1. Start the Demucs service with `docker compose up -d`
2. Start the SvelteKit dev server with `npm run dev`
3. Navigate to `/tools/stems`
4. Upload an audio file (mp3, wav, flac, or ogg — max 50MB)
5. Select which stems you want (vocals, drums, bass, other)
6. Click "Separate" and wait for processing (CPU separation can take a few minutes)
7. Download the ZIP containing your stems

### Stopping the service

```sh
docker compose down
```

