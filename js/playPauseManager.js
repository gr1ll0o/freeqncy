const playBtn = document.getElementById("playBtn");

function updatePlayButton() {
    if (player.paused) {
        playBtn.innerHTML = `
            <i id="play-control" class="fa-solid fa-circle-play red"></i>
        `;
    } else {
        playBtn.innerHTML = `
            <i id="play-control" class="fa-solid fa-circle-pause red"></i>
        `;
    }
}

playBtn.addEventListener("click", () => {
    if (player.paused) {
        player.load();
        player.play();
    } else {
        player.pause();
    }
});

player.addEventListener("play", updatePlayButton);
player.addEventListener("pause", updatePlayButton);