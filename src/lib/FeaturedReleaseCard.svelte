<script lang="ts">
  export let title: string = '';
  export let release_date: string = '';
  export let tracks: string[] = [];
  export let bandcampLink: string = '';
</script>

<style>
  .release-card {
    background-color: #333;
    color: #e0e0e0;
    padding: 20px;
    border-radius: 12px;
    width: 100%;
    max-width: 400px;
    box-shadow: 0 4px 10px rgba(0, 229, 229, 0.4);
    margin-bottom: 20px;
  }

  .release-card h3 {
    color: #00e5e5;
    font-size: 1.8rem;
    margin-bottom: 10px;
  }

  .release-card p {
    color: #bbb;
    font-size: 1.2rem;
    margin-bottom: 10px;
  }

  .release-card .tracks {
    color: #aaa;
    font-size: 1.1rem;
    margin-bottom: 10px;
  }

  .release-card a {
    color: #00e5e5;
    text-decoration: none;
    font-weight: bold;
    transition: color 0.3s;
  }

  .release-card a:hover {
    color: #00b8b8;
  }
</style>

<div class="release-card">
  <h3>{title}</h3>
  <p>Released: {release_date}</p>
  <div class="tracks">
    Tracks: {tracks.join(', ')}
  </div>
  <a href={bandcampLink} target="_blank">Listen on Bandcamp</a>
</div>
