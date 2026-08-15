const player = document.getElementById("player");
const knob = document.getElementById("volume-knob");
const needle = document.getElementById("needle");
const ticks = document.getElementById("ticks");

const TOTAL = 40;

const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const source = audioContext.createMediaElementSource(player);
const gainNode = audioContext.createGain();

const analyser = audioContext.createAnalyser();

analyser.fftSize = 256;
analyser.smoothingTimeConstant = 0.8;

const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

source.connect(gainNode);
gainNode.connect(analyser);
analyser.connect(audioContext.destination);

for (let i = 0; i < TOTAL; i++) {
    const angle = -135 + i * (270 / (TOTAL - 1));
    const tick = document.createElementNS("http://www.w3.org/2000/svg", "line");

    tick.setAttribute("x1", 110);
    tick.setAttribute("y1", 18);

    tick.setAttribute("x2", 110);
    tick.setAttribute("y2", 6);

    tick.setAttribute("transform", `rotate(${angle} 110 110)`);
    ticks.appendChild(tick);
}

const tickList = [...ticks.children];

let volume = 0.7;
let mute = false;

function setVolume(v) {
    v = Math.max(0, Math.min(1, v));

    volume = v;

    const perceivedVolume = Math.pow(v, 2);

    if (mute) gainNode.gain.value = 0;
    else gainNode.gain.value = perceivedVolume * 1.5;

    const angle = -135 + v * 270;

    needle.setAttribute("transform", `rotate(${angle} 110 110)`);

    tickList.forEach((t, i) => { t.classList.toggle("active", i <= v * (TOTAL - 1)); });
}

setVolume(.65);

let dragging = false;
knob.addEventListener("pointerdown", async (e) => {
    if (audioContext.state === "suspended") await audioContext.resume();
    dragging = true;
    update(e);
});

window.addEventListener("pointerup", () => dragging = false);
window.addEventListener("pointermove", e => { if (dragging) update(e); });

function update(e) {
    const rect = knob.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    let angle = Math.atan2(e.clientY - cy, e.clientX - cx) * 180 / Math.PI;
    angle += 90;

    if (angle > 180) angle -= 360;
    angle = Math.max(-135, Math.min(135, angle));
    const volume = (angle + 135) / 270;

    setVolume(volume);
}

function toggleMute() {
    mute = !mute;

    if (mute) {
        gainNode.gain.value = 0;
        knob.style.setProperty("--knob-primary", "#666");
        knob.style.setProperty("--knob-secondary", "#666");
        knob.style.setProperty("--knob-glow", "#fdfdfd");
    }else {
        const perceivedVolume = Math.pow(volume, 2);
        gainNode.gain.value = perceivedVolume * 1.5;
        knob.style.setProperty("--knob-primary", "#ff2db4");
        knob.style.setProperty("--knob-secondary", "#ff2db4");
        knob.style.setProperty("--knob-glow", "#ff2db4");
    }
}

knob.addEventListener("wheel", e => {
    e.preventDefault();

    const step = 0.0015;
    setVolume(volume - e.deltaY * step);
}, { passive: false });

document.addEventListener('keydown', (event) => {
    console.log(event.key);
    if (event.key == '+' || event.key == "ArrowUp") setVolume(volume+0.05);
    if (event.key == '-' || event.key == "ArrowDown") setVolume(volume-0.05);
    if (event.key.toLowerCase() == 'm') toggleMute();
});