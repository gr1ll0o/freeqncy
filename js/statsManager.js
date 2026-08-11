const listenersDisplay = document.getElementById('listeners-display');

const coverAlbumDisplay = document.getElementById('cover-display');
const songNameDisplay = document.getElementById('song-name');
const artistNameDisplay = document.getElementById('artist-name');

const stateDisplay = document.getElementById('state-display'); // Header
const statusDisplay = document.getElementById('status-display'); // Stream stats
const pingDisplay = document.getElementById('ping-display'); 
const bitRateDisplay = document.getElementById('bitrate-display');
const peakDisplay = document.getElementById('peak-display');
const upTimeDisplay = document.getElementById('uptime-display');

async function getPing() {
    const start = performance.now();

    try {
        const res = await fetch(`${STREAM_URL}/status-json.xsl`, { cache: "no-store" });

        const end = performance.now();

        if (!res.ok) {
            throw new Error("HTTP Error");
            refreshStream();
        }

        const ping = Math.round(end - start);
        pingDisplay.textContent = "PING: " + ping + "ms";
    } catch (error) {
        pingDisplay.textContent = "PING: --:--";
        stateDisplay.textContent = "𒊹 NO SIGNAL"
        stateDisplay.style.color = "#666";
        statusDisplay.textContent = "STATUS: OFFLINE";
        throw new Error("The ping could not be measured. Retrying...");
        refreshStream();
    }
}

async function getIcecastStats() {
    let data;

    try {
        const res = await fetch(`${STREAM_URL}/status-json.xsl`);
        if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);

        data = await res.json();
        if (!data.icestats.source) { // No mount
            stateDisplay.textContent = "𒊹 NO SIGNAL"
            stateDisplay.style.color = "#666";
            statusDisplay.textContent = "STATUS: OFFLINE";
            throw new Error("FREEQNCY mount is offline");
        }
        stateDisplay.textContent = "𒊹 ON AIR"
        stateDisplay.style.color = "#e01f83"
    } catch (error) {
        console.error(error);
        return;
    }

    // Listeners !!! //
    let listeners = data.icestats.source.listeners;
    listenersDisplay.textContent = "listeners: " + listeners;
    let peak = data.icestats.source.listener_peak;
    peakDisplay.textContent = "PEAK USERS: " + peak;

    // Artist, Title & Album !!!
    const songData = data.icestats.source.title;

    try {
        let [artist, titleAlbum] = songData.split(" - ");
        let [title, album] = titleAlbum.split(" | ");
        
        songNameDisplay.textContent = title;
        artistNameDisplay.textContent = artist;

        const coverName = album
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");

        const coverPath = `assets/covers/${coverName}.jpg`;
        
        coverAlbumDisplay.innerHTML = `<img src="${coverPath}">`
    }catch (error) { console.log("Loading new song data...") }

    // Status !!! //
    statusDisplay.textContent = "STATUS: ONLINE";

    // Uptime Stat !!! //
    const serverStart = data.icestats.server_start;
    const startDate = new Date(serverStart);
    const now = new Date();

    const differenceMs = now - startDate;
    const totalSeconds = Math.floor(differenceMs / 1000);

    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    let uptime;
    if (days > 0) uptime = String(days).padStart(2, "0") + ":" + String(hours).padStart(2, "0") + ":" + String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0");
    else uptime = String(hours).padStart(2, "0") + ":" + String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0");

    upTimeDisplay.textContent = "UPTIME: " + uptime;

    // Audio Stats !!! //
    const iceaudioaudioinfo = data.icestats.source.audio_info;
    const audioStats = Object.fromEntries( 
        iceaudioaudioinfo.split(";").map(item => item.split("="))
    );

    bitRateDisplay.textContent = "BITRATE: " + audioStats.bitrate + "kbps";
}

setInterval(getIcecastStats, 1000);
setInterval(getPing, 3000);