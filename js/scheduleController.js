let activeHour;
const spotifyBtn = document.getElementById('spotify-btn');
const playlists = [
    "https://open.spotify.com/playlist/1X0k13NYkJcah2LN51axl2?si=a9c57662e0b9481c",
    "https://open.spotify.com/playlist/01NrNjaREHhMkiVDEU7HKO?si=9e5d8d8218064d28",
    "https://open.spotify.com/playlist/6oDkcyxhnyzcBda6NVGz4z?si=6bf29305b6f24e00",
    "https://open.spotify.com/playlist/6luHHyTMz0vvM0uImh7UCd?si=c81725d89517450b"
];

const hours = [
    document.getElementById('mornin-waves-hour'),
    document.getElementById('afternoon-grooves-hour'),
    document.getElementById('night-ride-hour'),
    document.getElementById('midnight-city-hour')
];

const titles =["MORNIN' WAVES", "AFTERNOON GROOVES", "NIGHT RIDE", "MIDNIGHT CITY"];

const headers = [
    document.getElementById('mornin-waves-h'),
    document.getElementById('afternoon-grooves-h'),
    document.getElementById('night-ride-h'),
    document.getElementById('midnight-city-h'),
]

function updateSchedule() {
    const now = new Date();
    const hour = now.getHours();
    const minutes = now.getMinutes();
    const currentMinutes = hour * 60 + minutes;

    // MORNIN' WAVES: 06:00 - 12:00
    if (currentMinutes >= 360 && currentMinutes < 720) {
        activeHour = 0;
    }
    // AFTERNOON GROOVES: 12:00 - 18:00
    else if (currentMinutes >= 720 && currentMinutes < 1080) {
        activeHour = 1;
    }
    // NIGHT RIDE: 18:00 - 00:00
    else if (currentMinutes >= 1080) {
        activeHour = 2;
    }
    // MIDNIGHT CITY: 00:00 - 06:00
    else {
        activeHour = 3;
    }

    hours.forEach(schedule => {
        schedule.querySelectorAll('h2, h3').forEach(element => {
            element.style.color = '#32c1d7';
            element.style.fontWeight = 'bold';
            element.style.fontSize = 'clamp(6px, 14px, 16px)';
        });
    });
    hours[activeHour].querySelectorAll('h2, h3').forEach(element => {
        element.style.color = '#e01f83';
        element.style.fontWeight = '900';
        element.style.fontSize = 'clamp(8px, 16px, 18px)';
    });

    headers.forEach((element, i) => {
        element.textContent = titles[i];
    });

    headers[activeHour].textContent = "▶ " + titles[activeHour];
}

spotifyBtn.addEventListener('click', () => {
    window.open(playlists[activeHour])
});

updateSchedule();
setInterval(updateSchedule, 10);