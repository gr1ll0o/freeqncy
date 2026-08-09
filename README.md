<center>
![FREEQNCY](/assets/imgs/png-logo.png)

### *A self-hosted real-time internet radio platform.*

![Status](https://img.shields.io/badge/status-in%20development-ffb000?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-3fb950?style=for-the-badge)
![Platform](https://img.shields.io/badge/platform-WEB-red?style=for-the-badge)
![Streaming](https://img.shields.io/badge/Streaming-Icecast-blue?style=for-the-badge)
![Automation](https://img.shields.io/badge/Liquidsoap-Audio%20Pipeline-purple?style=for-the-badge)

---

*A modern, self-hosted internet radio built around a real-time audio streaming pipeline.*

---
</center>
# ✨ Overview

FREEQNCY is an *internet radio platform* that continuously broadcasts music in real time.

Unlike a traditional music player, every listener hears exactly the same song at the same moment, just like a conventional FM station.

The project is intended both as a fully functional radio station and as a technical portfolio project demonstrating real-world backend, networking and streaming concepts.

It is also expected to serve as a model, enabling anyone who wishes to seriously launch a radio station to do so by using this project as a guide.

As an avid music lover, the station will broadcast songs that match my musical tastes 24/7: rock, fusion, prog, pop, city pop, bossa, among others...!


---

# 📸 Preview


<p align="center"><img width="800" src="./assets/imgs/preview1.png"></p>

---

# 🚀 Features

- 🎵 24/7 automated music playback
- 📡 Real-time audio streaming
- 🌍 Multiple synchronized listeners
- 📻 Icecast streaming server
- ⚙️ Liquidsoap automation
- 🖥️ Retro web player
- 📱 Responsive interface
- 🔄 Automatic metadata updates

---

# 🏗️ Architecture

> In development.

<!--
```text
              Music Library
                    │
                    ▼
              Liquidsoap
        (playlist automation)
                    │
      Audio + Metadata Pipeline
                    │
                    ▼
                Icecast
          (streaming server)
                    │
           HTTP Audio Stream
                    │
         ┌──────────┴──────────┐
         ▼                     ▼
      Web Player            VLC / Apps
```
-->
---

# 🛠️ Tech Stack

### Backend

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express)
![REST API](https://img.shields.io/badge/REST_API-blue?style=flat-square)

### Streaming

![Icecast](https://img.shields.io/badge/Icecast-0099ff?style=flat-square)
![Liquidsoap](https://img.shields.io/badge/Liquidsoap-6d28d9?style=flat-square)
![FFmpeg](https://img.shields.io/badge/FFmpeg-007808?style=flat-square&logo=ffmpeg)

### Frontend

![HTML5](https://img.shields.io/badge/HTML-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS-1572B6?style=flat-square&logo=css3)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)

---

# 📂 Project Structure

```text
FREEQNCY
│
├── backend/
├── frontend/
├── liquidsoap/
├── icecast/
├── music/
├── assets/
├── docs/
└── README.md
```
-->
---

# 🎯 Roadmap

- [x] Configure Icecast
- [x] Configure Liquidsoap
- [x] Stream local audio
- [X] HTTPS
- [X] Custom frontend
- [X] Live metadata
- [X] Album artwork
- [X] Listener counter
- [X] Mobile support
- [ ] Better Player
- [ ] Status Recognition
- [ ] Documentation

---

# 📖 Documentation

Documentation will be available inside the `/docs` directory.

---

# 🤝 Contributing

Contributions, suggestions and feedback are always welcome. I'm always learning more!

---

# 📄 License

This project is licensed under the MIT License.

---

<div align="center">

### Made with ❤️ and lots of ☕ by Grillo.

**FREEQNCY**

*Broadcasting music. Learning infrastructure.*

</div>
