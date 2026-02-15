export interface BlogPost {
	title: string;
	slug: string;
	date: string;
	excerpt: string;
	content: string;
	author: string;
}

export const posts: BlogPost[] = [
	{
		title: 'FNTLPS3 OUT NOW',
		slug: 'fntlps3-out-now',
		date: 'March 20, 2020',
		excerpt: 'Six tracks of collaborative noise. Our biggest release yet.',
		content: `Six tracks of collaborative noise. Our biggest release yet.

FNTLPS3 brings together all four members of the collective for the first time. Recorded across multiple sessions in late 2019 and early 2020, this one pushed us into new territory — longer forms, heavier textures, more space.

Available now on Bandcamp.`,
		author: 'finite loops'
	},
	{
		title: 'NEW YEAR NEW LOOPS',
		slug: 'new-year-new-loops',
		date: 'January 7, 2020',
		excerpt: 'FNTLPS2 drops to start the year. Two sides, one tape.',
		content: `FNTLPS2 drops to start the year. Two sides, one tape.

Side A and Side B — two continuous pieces built from improvised sessions. This one is meant to be listened to straight through.

Grab it on Bandcamp.`,
		author: 'finite loops'
	},
	{
		title: 'HELLO WORLD',
		slug: 'hello-world',
		date: 'September 24, 2019',
		excerpt: 'First release from the finite loops collective. FNTLPS1 is live.',
		content: `First release from the finite loops collective. FNTLPS1 is live.

Two tracks to start. This is the beginning of something — a collective built around improvisation, collaboration, and letting the loops run until they find their own shape.

More coming soon.`,
		author: 'finite loops'
	}
];

export function getPostBySlug(slug: string): BlogPost | undefined {
	return posts.find((p) => p.slug === slug);
}
