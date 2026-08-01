const canvas = document.getElementById("spectrum");
const ctx = canvas.getContext("2d");

const BAR_COUNT = 40;
const MIN_HEIGHT = 3;
const FREQUENCY_RANGE = 0.65;
const smoothedBars = new Array(BAR_COUNT).fill(0);

// RESIZE
function resizeCanvas() {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// DRAW SPECTRUM
function drawSpectrum() {
    requestAnimationFrame(drawSpectrum);
    analyser.getByteFrequencyData(dataArray);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const barWidth = canvas.width / BAR_COUNT;
    const gap = 1;
    const actualBarWidth = Math.max(1, barWidth - gap);

    for (let i = 0; i < BAR_COUNT; i++) {
        const start = Math.floor(i * (bufferLength * FREQUENCY_RANGE) / BAR_COUNT);
        const end = Math.floor((i + 1) * (bufferLength * FREQUENCY_RANGE) / BAR_COUNT);

        let value = 0;

        for (let j = start; j < end; j++) {
            value = Math.max(value, dataArray[j]);
        }

        let normalized = value / 255;
        normalized = Math.pow(normalized, 1.5);

        const position = i / (BAR_COUNT - 1);
        const highFrequencyBoost = 1 + position * 0.2;

        normalized *= highFrequencyBoost;
        normalized = Math.min(normalized, 1);

        let targetHeight = normalized * canvas.height;
        targetHeight = Math.max(MIN_HEIGHT, targetHeight);

        const smoothing = targetHeight > smoothedBars[i] ? 0.9 : 0.08;
        smoothedBars[i] += (targetHeight - smoothedBars[i]) * smoothing;

        const x = i * barWidth;
        const y = canvas.height - smoothedBars[i];

        // GRADIENT
        const gradient = ctx.createLinearGradient(
            0,
            y + smoothedBars[i],
            0,
            y
        );

        gradient.addColorStop(0.00, "#32c1d7"); // 01 Cyan
        gradient.addColorStop(0.05, "#33bed6"); // 02
        gradient.addColorStop(0.10, "#35bad5"); // 03
        gradient.addColorStop(0.15, "#38b5d4"); // 04
        gradient.addColorStop(0.20, "#3bb0d2"); // 05
        gradient.addColorStop(0.25, "#40aad0"); // 06
        gradient.addColorStop(0.30, "#46a4ce"); // 07
        gradient.addColorStop(0.35, "#4d9dcb"); // 08
        gradient.addColorStop(0.40, "#5596c8"); // 09
        gradient.addColorStop(0.45, "#5d8ec5"); // 10
        gradient.addColorStop(0.50, "#6686c2"); // 11
        gradient.addColorStop(0.55, "#707ebf"); // 12
        gradient.addColorStop(0.60, "#7a75bc"); // 13
        gradient.addColorStop(0.65, "#856bb8"); // 14
        gradient.addColorStop(0.70, "#9061b4"); // 15
        gradient.addColorStop(0.75, "#9d56ae"); // 16
        gradient.addColorStop(0.80, "#aa4ba8"); // 17
        gradient.addColorStop(0.85, "#b940a1"); // 18
        gradient.addColorStop(0.90, "#c93599"); // 19
        gradient.addColorStop(0.95, "#d62a8e"); // 20
        gradient.addColorStop(1.00, "#e01f83"); // 21 Rosa


        ctx.fillStyle = gradient;
        // DRAW
        ctx.fillStyle = gradient;
        ctx.shadowBlur = 8;
        ctx.shadowColor = "#00000000";

        ctx.fillRect(
            x,
            y,
            actualBarWidth,
            smoothedBars[i]
        );
    }

    ctx.shadowBlur = 0;
}

drawSpectrum();