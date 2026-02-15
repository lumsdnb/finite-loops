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
		bio: 'Beatmaker and sound designer. Heavy low-end textures and fractured rhythms.',
		releases: ['fntlps3', 'fntlps2']
	},
	{
		name: 'lums',
		slug: 'lums',
		bio: 'Producer and multi-instrumentalist. Layered atmospherics and warped samples.',
		releases: ['fntlps3', 'fntlps2', 'fntlps1']
	},
	{
		name: 'moqwa',
		slug: 'moqwa',
		bio: 'Electronic producer. Modular synthesis and generative compositions.',
		releases: ['fntlps3', 'fntlps2']
	},
	{
		name: '[-CRBRL-CTS-]',
		slug: 'crbrl-cts',
		bio: 'Experimental producer and remixer. Glitch, noise, and digital decay.',
		releases: ['fntlps3', 'fntlps1']
	}
];

export function getArtistBySlug(slug: string): Artist | undefined {
	return artists.find((a) => a.slug === slug);
}
