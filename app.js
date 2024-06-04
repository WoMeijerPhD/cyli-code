// helper function

const RADIUS = 20;

// setup of the canvas

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");




let x = 50;
let y = 50;
let duration =0;
let lastDuration = 0;
const offset = .0005;
function canvasDraw() {
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // draw a 10 by 10 orange rectangle at the top left corner of the canvas
    ctx.fillStyle = "#f90";
    ctx.fillRect(0, 0, 10, 10);
  ctx.fillStyle = "#f00";
    ctx.beginPath();
    ctx.arc(x, y, RADIUS, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.closePath();
    ctx.fill();

} // end of function canvasDraw

canvasDraw();

canvas.addEventListener("click", async () => {
  if(!document.pointerLockElement) {
    await canvas.requestPointerLock({
      unadjustedMovement: true,
    });
  }
});

// pointer lock event listeners

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

const tracker = document.getElementById("tracker");


const video2 = document.querySelector("video");

function updateVideo(seekpercent){
    video2.currentTime = seekpercent * video2.duration;
}



let animation;
function updatePosition(e) {
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

  duration = ((y/canvas.height)/6)%1;
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
      canvasDraw();
    });
  }
}
