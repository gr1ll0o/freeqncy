const playBtn = document.getElementById("playBtn");

function updatePlayButton() {
    const isPlaying = !player.paused && !player.ended && player.readyState >= 3;

    if (isPlaying) {
        playBtn.innerHTML = `
            <i id="play-control" class="fa-solid fa-circle-pause red"></i>
        `;
    } else {
        playBtn.innerHTML = `
            <i id="play-control" class="fa-solid fa-circle-play red"></i>
        `;
    }
}

playBtn.addEventListener("click", () => {
    if (player.paused) {
        player.play();
    } else {
        player.pause();
    }
});

player.addEventListener("play", updatePlayButton);
player.addEventListener("pause", updatePlayButton);
player.addEventListener("playing", updatePlayButton);
player.addEventListener("waiting", updatePlayButton);
player.addEventListener("canplay", updatePlayButton);
player.addEventListener("stalled", updatePlayButton);

function resetStream() {
    player.pause();
    player.removeAttribute("src");
    player.src = `${STREAM_URL}?_=${Date.now()}`;
    player.load();
}

window.addEventListener("DOMContentLoaded", () => {
    resetStream();
});