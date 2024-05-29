<script>
    let video;
    let playButton;
    let pauseButton;
    let canvas;

    function playVideo() {
        video.play();
    }

    function pauseVideo() {
        video.pause();
    }
</script>

<style>
    .container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .header {
        background-color: #f1f1f1;
        padding: 10px;
        text-align: center;
    }

    .video {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
    }

    .footer {
        background-color: #f1f1f1;
        padding: 10px;
        text-align: center;
    }

    /* make the canvas an overlay for the video */
    .overlay {
        position: relative;
    }

    #canvas {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        width: 100%;
        height: 100%;
    }
</style>

<div class="container">
    <div class="header">
        <h1>Cyli Display test</h1>
    </div>

    <div class="overlay">
        <canvas id="canvas" width="1000" height="1000" bind:this={canvas}></canvas>
        <!-- svelte-ignore a11y-media-has-caption -->
        <video loop class="video" bind:this={video}>
            <source src="/paris-light.mp4" type="video/mp4" controls>
            Your browser does not support the video tag.
        </video>
    </div>

    <div class="footer">
        <div id="tracker"></div>
        <button on:click={playVideo} bind:this={playButton}>Play</button>
        <button on:click={pauseVideo} bind:this={pauseButton}>Pause</button>
    </div>
</div>

<!-- import the /app.js script -->
<!-- <script src="/app.js"></script> -->
