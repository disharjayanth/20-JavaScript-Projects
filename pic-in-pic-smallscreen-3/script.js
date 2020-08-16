const videoElement = document.getElementById("video")
const button = document.getElementById("button")

// Prompt to select media stream, pass to video element, then play.
async function selectMediaStream() {
    try {
        const mediaStream = await navigator.mediaDevices.getDisplayMedia();
        videoElement.srcObject = mediaStream
        videoElement.onloadedmetadata = () => {
            videoElement.play()
        }
        console.log(mediaStream)
    } catch (error) {
        console.log("Error here!", error)
    }
}

button.addEventListener("click", async () => {
    // Disable Button
    button.disabled = true
    //Start pic in pic
    await videoElement.requestPictureInPicture()
    // Reset Button
    button.disabled = false
})

//On Load
selectMediaStream()