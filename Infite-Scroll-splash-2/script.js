const imageContainer = document.getElementById("image-container")
const loader = document.getElementById("loader")

let ready = false
let initialLoad = true
let imagesLoaded = 0
let totalImages = 0
let photosArray = []

// Unsplash API
const count = 5
const apiKey = "nPlkgMc4J0Pf94coEToaVknwF4mo_BoPNpSu67kHU3c"
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

//Check if all images were loaded
function imageLoaded() {
    imagesLoaded++
    if (imagesLoaded === totalImages) {
        ready = true
        loader.hidden = true
    }
}

//update the count image to 30 after inital Load
function updateAPIUrl(count) {
    apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`
}

//Helper function to set attributes on DOM elements.
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}

//Create Elements for Links and photos, And add to DOM
function displayPhotos() {
    imagesLoaded = 0
    totalImages = photosArray.length
    photosArray.forEach((photo) => {
        // Create <a> to link unsplash
        const item = document.createElement("a")
        // Create <img>
        setAttributes(item, {
            href: photo.links.html,
            target: "_blank"
        })
        const img = document.createElement("img")
        // Put <img> inside <a> element and put both of them inside imageContianer Element
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        })
        img.addEventListener("load", imageLoaded)
        item.appendChild(img)
        imageContainer.appendChild(item)
    })
}

//Get photos from unsplash
async function getPhotos() {
    try {
        const response = await fetch(apiURL)
        photosArray = await response.json()
        displayPhotos()
        if (initialLoad) {
            updateAPIUrl(30)
            initialLoad = false
        }
    } catch (error) {
        // Catch error
    }
}

//Check to see if scrolling near bottom of page, -> Load more photos.
window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false
        getPhotos()
    }
})

// On Load call getPhotos func
getPhotos()