import type { Release } from '$lib/releases';
export declare function getPlayer(): {
    readonly currentRelease: any;
    readonly isPlaying: any;
    readonly bandcampAlbumId: any;
    play(release: Release): void;
    stop(): void;
    toggle(): void;
};
