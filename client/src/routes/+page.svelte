<script>
    import {onMount} from 'svelte';
   let video;
   let videoTime = 0;
    let playButton;
    let pauseButton;
    let canvas;
    let wheelTotal = 0;

    function playVideo() {
        video.play();
    }

    function pauseVideo() {
        video.pause();
    }
    let duration =0;
    let lastDuration = 0;
    const offset = .0001;
    const numFullCanvases = 50;
    let x = 0;
    let y = 0;
    let unboundY=0;
    function drawCanvas(){
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, 2 * Math.PI);
        ctx.fill();
    }
    function updateVideo(seekpercent){
    video.currentTime = seekpercent * video.duration;
    }
   // on mount print hello world
    onMount(() => {
        video.addEventListener('timeupdate', () => {
            videoTime = video.currentTime / video.duration;
        });

        document.addEventListener('wheel', (e) => {
            console.log(e)
            wheelTotal += e.deltaY;
            e.preventDefault(); // Prevents page from scrolling
        });


        drawCanvas();
        canvas.addEventListener("click", async () => {
        if(!document.pointerLockElement) {
            await canvas.requestPointerLock({
            unadjustedMovement: true,
            });
        }
        });


        document.addEventListener("pointerlockchange", lockChangeAlert, false);

        function lockChangeAlert() {
        if (document.pointerLockElement === canvas) {
            console.log("The pointer lock status is now locked");
            document.addEventListener("mousemove", updatePosition, false);
        } else {
            console.log("The pointer lock status is now unlocked");
            document.removeEventListener("mousemove", updatePosition, false);
        }
        }

        let animation;
        function updatePosition(e) {
            // if canvas is undefined, return
            if (!canvas) {
                return;
            }
            function updateCoord(pos, delta, max) {
                pos += delta;
                pos %= max;
                if (pos < 0) {
                pos += max;
                }
                return pos;
                }

            x = updateCoord(x, e.movementX, canvas.width);
            y = updateCoord(y, e.movementY, canvas.height);
            unboundY += e.movementY;

            duration = ((Math.abs(unboundY)/canvas.height)/numFullCanvases)%1;
            // check if the difference between the last duration and the current duration is greater than the offset
                if(Math.abs(duration - lastDuration) > offset) {
                    console.log("changing duration");
                    lastDuration = duration;
                    updateVideo(duration);
                }
            
            tracker.textContent = `X position: ${x}, Y position: ${y}, Duration: ${duration}`;

            if (!animation) {
                animation = requestAnimationFrame(function () {
                animation = null;
                drawCanvas();
                });
            }
        }

    });


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
        <h1>Cyli Display test {wheelTotal}</h1>
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
        <input type="range" min="0" max="1" step="0.0001" bind:value={videoTime}>
        <button on:click={playVideo} bind:this={playButton}>Play</button>
        <button on:click={pauseVideo} bind:this={pauseButton}>Pause</button>
    </div>
</div>

<!-- import the /app.js script -->
<!-- <script src="/app.js"></script> -->
