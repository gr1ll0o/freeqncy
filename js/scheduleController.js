const hours = [
    document.getElementById('mornin-waves-hour'),
    document.getElementById('afternoon-grooves-hour'),
    document.getElementById('night-ride-hour'),
    document.getElementById('midnight-city-hour')
];

function updateSchedule() {
    const now = new Date();
    const hour = now.getHours();
    const minutes = now.getMinutes();
    const currentMinutes = hour * 60 + minutes;
    let activeHour;

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
        });
    });
    hours[activeHour].querySelectorAll('h2, h3').forEach(element => {
        element.style.color = '#e01f83';
        element.style.fontWeight = '900';
    });
}

setInterval(updateSchedule, 1000);