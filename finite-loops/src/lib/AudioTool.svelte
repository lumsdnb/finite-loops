<script lang="ts">
  export let label: string = "Volume";
  export let value: number = 50;
  export let min: number = 0;
  export let max: number = 100;
  export let step: number = 1;

  const updateValue = (event: Event) => {
    value = (event.target as HTMLInputElement).valueAsNumber;
  };
</script>

<style>
  .audio-tool {
    background-color: #222;
    border-radius: 12px;
    padding: 20px;
    max-width: 300px;
    box-shadow: 0 4px 10px rgba(0, 229, 229, 0.2), 0 4px 15px rgba(0, 229, 229, 0.5);
    backdrop-filter: blur(10px);
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .audio-tool h3 {
    color: #00e5e5;
    font-size: 1.6rem;
    margin-bottom: 10px;
  }

  .audio-tool input[type="range"] {
    width: 100%;
    height: 10px;
    background: #444;
    border-radius: 5px;
    -webkit-appearance: none;
    appearance: none;
    outline: none;
    margin-bottom: 10px;
  }

  .audio-tool input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    background: #00e5e5;
    border-radius: 50%;
    cursor: pointer;
  }

  .audio-tool input[type="range"]:focus {
    outline: none;
  }

  .audio-tool .value {
    color: #bbb;
    font-size: 1.2rem;
  }
</style>

<div class="audio-tool">
  <h3>{label}</h3>
  <input type="range" min={min} max={max} step={step} bind:value on:input={updateValue} />
  <p class="value">{value}%</p>
</div>
