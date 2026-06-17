export interface Track {
    title: string;
    duration: string;
}
export interface Release {
    title: string;
    slug: string;
    artist: string;
    release_date: string;
    tracks: Track[];
    contributors: string[];
    sha256: string;
    bandcampAlbumId: string;
    bandcampUrl: string;
    img: string;
}
export declare const releases: Release[];
export declare function getReleaseBySlug(slug: string): Release | undefined;
