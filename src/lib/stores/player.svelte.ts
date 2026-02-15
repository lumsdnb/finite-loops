import type { Release } from '$lib/releases';

interface PlayerState {
	currentRelease: Release | null;
	isPlaying: boolean;
	bandcampAlbumId: string;
}

const playerState = $state<PlayerState>({
	currentRelease: null,
	isPlaying: false,
	bandcampAlbumId: ''
});

export function getPlayer() {
	return {
		get currentRelease() {
			return playerState.currentRelease;
		},
		get isPlaying() {
			return playerState.isPlaying;
		},
		get bandcampAlbumId() {
			return playerState.bandcampAlbumId;
		},
		play(release: Release) {
			playerState.currentRelease = release;
			playerState.bandcampAlbumId = release.bandcampAlbumId;
			playerState.isPlaying = true;
		},
		stop() {
			playerState.isPlaying = false;
		},
		toggle() {
			playerState.isPlaying = !playerState.isPlaying;
		}
	};
}
