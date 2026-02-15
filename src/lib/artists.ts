export interface Artist {
	name: string;
	slug: string;
	bio: string;
	releases: string[]; // release slugs
}

export const artists: Artist[] = [
	{
		name: 'dreadmaul',
		slug: 'dreadmaul',
		bio: 'Bio coming soon.',
		releases: ['fntlps3', 'fntlps2']
	},
	{
		name: 'lums',
		slug: 'lums',
		bio: 'Bio coming soon.',
		releases: ['fntlps3', 'fntlps2', 'fntlps1']
	},
	{
		name: 'moqwa',
		slug: 'moqwa',
		bio: 'Bio coming soon.',
		releases: ['fntlps3', 'fntlps2']
	},
	{
		name: '[-CRBRL-CTS-]',
		slug: 'crbrl-cts',
		bio: 'Bio coming soon.',
		releases: ['fntlps3', 'fntlps1']
	}
];

export function getArtistBySlug(slug: string): Artist | undefined {
	return artists.find((a) => a.slug === slug);
}
