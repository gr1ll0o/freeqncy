const playBtn = document.getElementById("playBtn");
const refreshStream = document.getElementById("refresh-stream");

function updatePlayButton() {
    const isPlaying = !player.paused && !player.ended && player.readyState >= 3;

    if (isPlaying) playBtn.innerHTML = `<i id="play-control" class="fa-solid fa-circle-pause red"></i>`;
    else playBtn.innerHTML = `<i id="play-control" class="fa-solid fa-circle-play red"></i>`;
}

function playPause() { if (player.paused) player.play(); else player.pause(); }
playBtn.addEventListener("click", () => { playPause(); });

player.addEventListener("play", updatePlayButton);
player.addEventListener("pause", updatePlayButton);
player.addEventListener("playing", updatePlayButton);
player.addEventListener("waiting", updatePlayButton);
player.addEventListener("canplay", updatePlayButton);
player.addEventListener("stalled", updatePlayButton);

function resetStream() {
    playBtn.innerHTML = `<i id="play-control" class="fa-solid fa-circle-play red"></i>`;

    refreshStream.value = "Loading..."
    refreshStream.disabled = true;

    player.pause();
    player.removeAttribute("src");
    player.src = `${STREAM_URL}/FREEQNCY?_=${Date.now()}`;
    player.load();
}

refreshStream.addEventListener("click", resetStream);

player.addEventListener("playing", () => {
    refreshStream.disabled = false;
    refreshStream.value = "Refresh Stream (R)"
});

document.addEventListener('keydown', (event) => {
    if (event.key == " " || event.key == "p") playPause();
    if (event.key.toLowerCase() == 'r') resetStream();
});

window.addEventListener("DOMContentLoaded", () => { resetStream(); });