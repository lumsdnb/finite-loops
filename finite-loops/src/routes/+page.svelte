<script lang="ts">
  import MusicPlayer from '$lib/MusicPlayer.svelte';
  import AudioTool from '$lib/AudioTool.svelte';
  import FeaturedReleaseCard from '$lib/FeaturedReleaseCard.svelte';

  // Example data (replace this with actual data fetching)
  let releases = [
    {
      title: "FNTLPS3",
      release_date: "March 20, 2020",
      tracks: ["fc96170", "aed285", "281585"],
      bandcampLink: "https://finiteloops.bandcamp.com/album/fntlps3"
    },
    {
      title: "FNTLPS2",
      release_date: "January 7, 2020",
      tracks: ["A - ed88d25b86", "B - 57df8ff685"],
      bandcampLink: "https://finiteloops.bandcamp.com/album/fntlps2"
    }
  ];

  let trackUrl = 'example-track';
</script>

<style>
  .page-layout {
    background-color: #1c1c1c;
    padding: 40px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    align-items: start;
  }

  .page-layout .music-player {
    grid-column: span 2;
  }
</style>

<div class="page-layout">
  <!-- Music Player Section -->
  <div class="music-player">
    <MusicPlayer {trackUrl} title="Example Track" artist="Finite Loops" />
  </div>

  <!-- Featured Releases -->
  {#each releases as release}
    <FeaturedReleaseCard 
      title={release.title} 
      release_date={release.release_date} 
      tracks={release.tracks} 
      bandcampLink={release.bandcampLink} 
    />
  {/each}

  <!-- Audio Tool -->
  <AudioTool label="Volume" min={0} max={100} step={1} value={50} />
  <AudioTool label="Bass" min={0} max={100} step={1} value={75} />
</div>
