export interface Artist {
    name: string;
    slug: string;
    bio: string;
    releases: string[];
}
export declare const artists: Artist[];
export declare function getArtistBySlug(slug: string): Artist | undefined;
