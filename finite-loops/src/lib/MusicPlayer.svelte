<script lang="ts">
  export let trackUrl: string = '';
  export let title: string = '';
  export let artist: string = '';
</script>

<style>
  .music-player {
    background-color: #2c2c2c;
    border-radius: 12px;
    padding: 20px;
    max-width: 100%;
    box-shadow: 0 4px 10px rgba(0, 229, 229, 0.3), 0 4px 15px rgba(0, 229, 229, 0.5);
    backdrop-filter: blur(10px);
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .music-player h2 {
    color: #00e5e5;
    font-size: 1.8rem;
    margin-bottom: 10px;
    text-shadow: 0 0 15px rgba(0, 229, 229, 0.7);
  }

  .music-player iframe {
    border: none;
    border-radius: 10px;
    width: 100%;
    height: 42px;
    box-shadow: 0 0 10px rgba(0, 229, 229, 0.3);
  }

  .music-player .info {
    color: #bbb;
    font-size: 1.1rem;
    margin-top: 10px;
  }
</style>

<div class="music-player">
  <h2>{title}</h2>
  <p class="info">{artist}</p>
  <iframe src={`https://bandcamp.com/EmbeddedPlayer/album=${trackUrl}&auto_play=true&show_artwork=true`} width="100%" height="42" frameborder="0"></iframe>
</div>
