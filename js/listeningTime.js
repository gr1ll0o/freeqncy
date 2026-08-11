const listeningTime = document.getElementById("listening-time");

let listeningSeconds = 0;
let listeningInterval = null;

function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return [hours, minutes,secs].map(unit => String(unit).padStart(2, "0")).join(":");
}

function startListeningTime() {
    if (listeningInterval !== null) return;
    listeningInterval = setInterval(() => { listeningSeconds++;listeningTime.textContent = formatTime(listeningSeconds); }, 1000);
}

startListeningTime();