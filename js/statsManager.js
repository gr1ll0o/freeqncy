const listenersDisplay = document.getElementById('listeners-display');

const songNameDisplay = document.getElementById('song-name');
const artistNameDisplay = document.getElementById('artist-name');

const stateDisplay = document.getElementById('state-display'); // Header
const statusDisplay = document.getElementById('status-display'); // Stream stats
const pingDisplay = document.getElementById('ping-display'); 
const bitRateDisplay = document.getElementById('bitrate-display');
const upTimeDisplay = document.getElementById('uptime-display');

const ICECAST_URL = "https://avon-asking-catalog-secondary.trycloudflare.com";

async function getPing() {
    const start = performance.now();

    try {
        const res = await fetch(`${ICECAST_URL}/status-json.xsl`, {
            cache: "no-store"
        });

        const end = performance.now();

        if (!res.ok) {
            throw new Error("HTTP Error");
        }

        const ping = Math.round(end - start);

        pingDisplay.textContent = "PING: " + ping + "ms";

    } catch (error) {
        console.log("No se pudo medir el ping");
    }
}


async function getIcecastStats() {
    let data;

    try {
        const res = await fetch(`${ICECAST_URL}/status-json.xsl`);

        if (!res.ok) {
            throw new Error(`HTTP Error: ${res.status}`);
        }

        data = await res.json();
        if (!data.icestats.source) { // No mount
            stateDisplay.textContent = "𒊹 NO SIGNAL"
            stateDisplay.style.color = "#666";
            statusDisplay.textContent = "STATUS: OFFLINE";
            throw new Error("FREEQNCY mount is offline");
        }
    } catch (error) {
        console.error(error);
        return;
    }

    // Listeners !!! //
    let listeners = data.icestats.source.listeners;
    listenersDisplay.textContent = "listeners: " + listeners;

    // Artist & Title !!! //    
    let songData = data.icestats.source.metadata.x_icy_title;
    const separator = songData.indexOf(" - ");
    const artist = songData.substring(0, separator); 
    const title = songData.substring(separator + 3); 

    songNameDisplay.textContent = title;
    artistNameDisplay.textContent = artist;

    // Status !!! //
    statusDisplay.textContent = "STATUS: ONLINE";

    // Uptime Stat !!! //
    const serverStart = data.icestats.server_start;
    const startDate = new Date(serverStart);
    const now = new Date();
    const differenceMs = now - startDate;
    const totalSeconds = Math.floor(differenceMs / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const uptime = String(hours).padStart(2, "0") + ":" + String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0");
    upTimeDisplay.textContent = "UPTIME: " + uptime;

    // Audio Stats !!! //
    const iceaudioaudioinfo = data.icestats.source.audio_info;
    const audioStats = Object.fromEntries( 
        iceaudioaudioinfo.split(";").map(item => item.split("="))
    );

    bitRateDisplay.textContent = "BITRATE: " + audioStats.bitrate + "kbps";
}

getPing();

setInterval(getIcecastStats, 1000);
setInterval(getPing, 5000);