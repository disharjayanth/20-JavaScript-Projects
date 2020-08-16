const image = document.querySelector("img")
const title = document.getElementById("title")
const artist = document.getElementById("artist")
const music = document.querySelector("audio")
const progressContainer = document.getElementById("progress-container")
const progress = document.getElementById("progress")
const currentTimeEl = document.getElementById("current-time")
const durationEl = document.getElementById("duration")
const prevBtn = document.getElementById("prev")
const playBtn = document.getElementById("play")
const nextBtn = document.getElementById("next")

// Music
const songs = [{
        name: "jacinto-1",
        displayName: "Electric Chill Machine",
        artist: "Jacinto Design"
    },
    {
        name: "jacinto-2",
        displayName: "Seven Nation Army (Remix)",
        artist: "Jacinto Design"
    },
    {
        name: "jacinto-3",
        displayName: "Goodnight, Disco Queen",
        artist: "Jacinto Design"
    },
    {
        name: "metric-1",
        displayName: "Metric Song",
        artist: "Jacinto Design"
    }
]

// Check if playing
let isPlaying = false

// Play
function playSong() {
    isPlaying = true
    playBtn.classList.replace("fa-play", "fa-pause")
    playBtn.setAttribute("title", "pause")
    music.play()
}

// Pause
function pauseSong() {
    isPlaying = false
    playBtn.classList.replace("fa-pause", "fa-play")
    playBtn.setAttribute("title", "play")
    music.pause()
}

// Play or Pause event listener
playBtn.addEventListener("click", () => isPlaying ? pauseSong() : playSong())

// Update the DOM
function loadSong(song) {
    title.textContent = song.displayName //.innerText will reflow when changed(even if value is same it will reflow meaning repaint aka rerender)
    artist.textContent = song.artist //.contentText wont reflow if the value is same or its not change, But if value is changed then it will reflow.
    music.src = `music/${song.name}.mp3`
    image.src = `img/${song.name}.jpg`
}

// Current Song
let songIndex = 0

// Previous Song
function prevSong() {
    songIndex--
    if (songIndex < 0) {
        songIndex = songs.length - 1
    }
    loadSong(songs[songIndex])
    playSong()
}

// Next song 
function nextSong() {
    songIndex++
    if (songIndex > songs.length - 1) {
        songIndex = 0
    }
    loadSong(songs[songIndex])
    playSong()
}

// Updating the progress bar when songs is played
function updateProgressBar(e) {
    if (isPlaying) {
        const {
            duration,
            currentTime
        } = e.srcElement

        // Update progress width
        const progressPercent = (currentTime / duration) * 100
        progress.style.width = `${progressPercent}%`

        // Calculate display for duration
        const durationMinutes = Math.floor(duration / 60)
        let durationSeconds = Math.floor(duration % 60)
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`
        }
        // Delay switching the duration to avoid NaN flash while changing songs
        if (durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`
        }

        // Calculate display for currenTime 
        const currentMinutes = Math.floor(currentTime / 60)
        let currentSeconds = Math.floor(currentTime % 60)
        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`
        }
        if (currentSeconds) {
            currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`
        }
    }
}

// Skip progress bar
function setProgressBar(e) {
    const width = this.clientWidth //DOM'S srcElement object
    const clickX = e.offsetX // different offsets depends on how further u click
    console.log(clickX)
    const {
        duration
    } = music
    //Whenver you change current time (while skipping) it fires "timeupdate" event which calls *updateProgressBar* function.
    music.currentTime = (clickX / width) * duration //Click/ width * duration gives how much time (in seconds) to skip
}

// On Load - Select first song
loadSong(songs[songIndex])

// Event Listener Prev Button
prevBtn.addEventListener("click", prevSong)

// Event Listener Next Button
nextBtn.addEventListener("click", nextSong)

// Event Listener when a song is ended and we need to play next song
music.addEventListener("ended", nextSong)

// Event Listener for progress bar
music.addEventListener("timeupdate", updateProgressBar)

// To skip progress
progressContainer.addEventListener("click", setProgressBar)