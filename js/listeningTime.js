const listeningTime = document.getElementById("listening-time");
const currentTime = document.getElementById("current-time");

let listeningSeconds = 0;
let listeningInterval = null;

function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return [hours, minutes,secs].map(unit => String(unit).padStart(2, "0")).join(":");
}

function updateCurrentTime() {
    let now = new Date();
    let h = now.getHours();
    h = h.toString().padStart(2, '0');
    let m = now.getMinutes();
    m = m.toString().padStart(2, '0');
    let time = `${h}:${m}`;

    currentTime.textContent = time;
    console.log(time);
}

function startListeningTime() {
    if (listeningInterval !== null) return;
    listeningInterval = setInterval(() => { listeningSeconds++;listeningTime.textContent = formatTime(listeningSeconds); }, 1000);
}

startListeningTime();
setInterval(updateCurrentTime, 1000);