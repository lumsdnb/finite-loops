type Track = {
	title: string;
	duration: string;
};

type Release = {
	title: string;
	artist: string;
	release_date: string;
	tracks: Track[];
	contributors: string[];
	sha256: string;
};

type ReleaseData = {
	releases: Release[];
};

export const releaseData: ReleaseData = {
	releases: [
		{
			title: 'FNTLPS3',
			artist: 'finite loops',
			release_date: 'March 20, 2020',
			tracks: [
				{ title: 'fc96170', duration: '04:59' },
				{ title: 'aed285', duration: '04:53' },
				{ title: '281585', duration: '05:28' },
				{ title: '538685', duration: '04:14' },
				{ title: '3d6c172', duration: '04:53' },
				{ title: '0507168', duration: '04:40' }
			],
			contributors: ['dreadmaul', 'lums', 'moqwa', '[-CRBRL-CTS-]'],
			sha256: '08d37cf85e8b43c1d7f53149ae484d63821303a5ff51afd66e23052130b5c13b'
		},
		{
			title: 'FNTLPS2',
			artist: 'finite loops',
			release_date: 'January 7, 2020',
			tracks: [
				{ title: 'A - ed88d25b86', duration: '05:23' },
				{ title: 'B - 57df8ff685', duration: '04:48' }
			],
			contributors: ['dreadmaul', 'lums', 'moqwa'],
			sha256: 'cfe0cc22404de69b7e76d458219671d14815a53fecbaafae37fba7bcc2a59497'
		},
		{
			title: 'FNTLPS1',
			artist: 'finite loops',
			release_date: 'September 24, 2019',
			tracks: [
				{ title: '293IDEV0170', duration: '06:18' },
				{ title: 'Solar ([-CRBRL-CTS-] remix)', duration: '03:45' }
			],
			contributors: ['lums', '[-CRBRL-CTS-]'],
			sha256: '133f57b28e6e3f508b5ecb7035c4fc1870e26021eeb97ee0455687520fd2b0a3'
		}
	]
};
