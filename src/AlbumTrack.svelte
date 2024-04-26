<script>
    export let playing;
    export let setPlaying;
    export let title;
    export let length;
</script>

<li class:playing = {playing === title}>
    <button on:click={() => setPlaying(title)}>t</button>
    <span>{title}</span>
    <span>-{length}</span>
    
</li>

<style>
    .playing{
        color: teal;
    }
</style>