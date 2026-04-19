const canvas = document.getElementById("visualiser");
const canvasCtx = canvas.getContext("2d");
const WIDTH = canvas.width;
const HEIGHT = canvas.height;

canvasCtx.fillStyle = "#d9d9d9";
canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
canvasCtx.fillStyle = "#000";
canvasCtx.font = "14px Futura";
canvasCtx.textAlign = "center";
canvasCtx.fillText("Music Player", WIDTH / 2, HEIGHT / 2 - 10);
canvasCtx.fillText("choose a track below", WIDTH / 2, HEIGHT / 2 + 10);

let audioCtx, analyser, source, animationId;

function initVisualiser() {
  if (audioCtx) return;

  audioCtx = new AudioContext();
  analyser = audioCtx.createAnalyser();
  source = audioCtx.createMediaElementSource(audio);

  source.connect(analyser);
  analyser.connect(audioCtx.destination);

  analyser.fftSize = 64;
}

function draw() {
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  animationId = requestAnimationFrame(draw);
  analyser.getByteFrequencyData(dataArray);

  canvasCtx.fillStyle = "#d9d9d9";
  canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

  const barWidth = 20;
  const dashHeight = 4;
  const dashGap = 3;
  const barGap = 8;
  let x = barGap;

  for (let i = 5; i < bufferLength; i++) {
    const level = Math.floor(dataArray[i] / 14); // no of dashes
    const totalDashSize = dashHeight + dashGap;

    for (let d = 0; d < level; d++) {
      const y = HEIGHT - (d + 1) * totalDashSize; // stack bottom up
      canvasCtx.fillStyle = "rgb(0,0,0)";
      canvasCtx.fillRect(x, y, barWidth, dashHeight);
    }
    x += barWidth + barGap;
  }
}

audio.addEventListener("play", () => {
  initVisualiser();
  audioCtx.resume().then(() => {
    draw();
  });
});

audio.addEventListener("pause", () => {
  cancelAnimationFrame(animationId);
});
