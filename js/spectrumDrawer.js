const canvas = document.getElementById("spectrum");
const disableCanvas = document.querySelector('#disable-eq');
const disableVideo = document.querySelector('#disable-video');
const videoBg = document.getElementById("video-bg");
const ctx = canvas.getContext("2d");

const BAR_COUNT = 40;
const MIN_HEIGHT = 3;
const FREQUENCY_RANGE = 0.65;

const smoothedBars = new Array(BAR_COUNT).fill(0);
let lastTime = performance.now();

// RESIZE
function resizeCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const width = canvas.parentElement.clientWidth;
    const height = canvas.clientHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// DRAW SPECTRUM
let animationId = null;
let spectrumEnabled = true;

function drawSpectrum() {
    if (!spectrumEnabled) return;

    animationId = requestAnimationFrame(drawSpectrum);

    const now = performance.now();
    const deltaTime = Math.min(now - lastTime, 50);
    lastTime = now;

    analyser.getByteFrequencyData(dataArray);

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    ctx.clearRect(0, 0, width, height);

    const barWidth = width / BAR_COUNT;
    const gap = 1;
    const actualBarWidth = Math.max(1, barWidth - gap);

    for (let i = 0; i < BAR_COUNT; i++) {
        const start = Math.floor(i * (bufferLength * FREQUENCY_RANGE) / BAR_COUNT);
        const end = Math.floor((i + 1) * (bufferLength * FREQUENCY_RANGE) / BAR_COUNT);
        let value = 0;

        for (let j = start; j < end; j++) value = Math.max(value, dataArray[j]);

        let normalized = value / 255;
        normalized = Math.pow(normalized, 1.5);

        const position = i / (BAR_COUNT - 1);
        const highFrequencyBoost = 1 + position * 0.2;

        normalized *= highFrequencyBoost;
        normalized = Math.min(normalized, 1);

        let targetHeight = normalized * height;
        targetHeight = Math.max(MIN_HEIGHT, targetHeight);

        const riseSpeed = 0.025;
        const fallSpeed = 0.08;

        const smoothing = targetHeight > smoothedBars[i] ? 1 - Math.exp(-riseSpeed * deltaTime) : 1 - Math.exp(-fallSpeed * deltaTime);
        smoothedBars[i] += (targetHeight - smoothedBars[i]) * smoothing;

        const x = i * barWidth;
        const y = height - smoothedBars[i];

        const gradient = ctx.createLinearGradient(0, height, 0, 0);

        gradient.addColorStop(0.00, "#32c1d7");
        gradient.addColorStop(0.05, "#33bed6");
        gradient.addColorStop(0.10, "#35bad5");
        gradient.addColorStop(0.15, "#38b5d4");
        gradient.addColorStop(0.20, "#3bb0d2");
        gradient.addColorStop(0.25, "#40aad0");
        gradient.addColorStop(0.30, "#46a4ce");
        gradient.addColorStop(0.35, "#4d9dcb");
        gradient.addColorStop(0.40, "#5596c8");
        gradient.addColorStop(0.45, "#5d8ec5");
        gradient.addColorStop(0.50, "#6686c2");
        gradient.addColorStop(0.55, "#707ebf");
        gradient.addColorStop(0.60, "#7a75bc");
        gradient.addColorStop(0.65, "#856bb8");
        gradient.addColorStop(0.70, "#9061b4");
        gradient.addColorStop(0.75, "#9d56ae");
        gradient.addColorStop(0.80, "#aa4ba8");
        gradient.addColorStop(0.85, "#b940a1");
        gradient.addColorStop(0.90, "#c93599");
        gradient.addColorStop(0.95, "#d62a8e");
        gradient.addColorStop(1.00, "#e01f83");

        ctx.fillStyle = gradient;
        ctx.shadowBlur = 8;
        ctx.shadowColor = "#00000000";

        ctx.fillRect(x, y, actualBarWidth, smoothedBars[i]);
    }

    ctx.shadowBlur = 0;
}

disableCanvas.addEventListener('change', () => {
    if (disableCanvas.checked) {
        spectrumEnabled = false; // STOP ANIMATION
        if (animationId !== null) {
            cancelAnimationFrame(animationId);
            animationId = null;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height); // CLEAR CANVAS
    } else {
        spectrumEnabled = true;
        lastTime = performance.now();
        drawSpectrum();
    }
});

disableVideo.addEventListener('change', () => { if (disableVideo.checked) videoBg.style.display = 'none'; else videoBg.style.display = 'block'; });

document.addEventListener('keydown', (event) => {
    if (event.key.toLowerCase() == 'e') disableCanvas.checked = !disableCanvas.checked;disableCanvas.dispatchEvent(new Event("change"));
    if (event.key.toLowerCase() == 'v') disableVideo.checked = !disableVideo.checked;disableVideo.dispatchEvent(new Event("change"));
});

spectrumEnabled = true;
lastTime = performance.now();
drawSpectrum();