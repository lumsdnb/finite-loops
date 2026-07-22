# Finite Loops

SP-404 style web beat machine and music collective site built with Lit, TypeScript, and Vite.

## Prerequisites

- Node.js
- pnpm
- Docker (for the stem separator tool)

## Developing

Install dependencies and start the dev server:

```sh
pnpm install
pnpm dev
```

## Building

```sh
pnpm build
```

Preview the production build with `pnpm preview`.

## Stem Separator Service

The stem separator provides AI-powered audio stem separation using [Demucs](https://github.com/adefossez/demucs) (Meta's music source separation model). It runs as a Docker service.

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

### Stopping the service

```sh
docker compose down
```
