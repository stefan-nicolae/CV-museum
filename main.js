const fullscreenImageContainer = document.querySelector("div.fullscreen-image-container")
const fullscreenImage = document.querySelector("div.fullscreen-image-container img")
const fullscreenShadow = document.querySelector("div.fullscreen-shadow")
const html = document.querySelector("html")
let imageHeight, imageWidth

document.querySelectorAll(".gallery img").forEach(image => {
        image.addEventListener("click", () => {
            imageHeight = image.height
            imageWidth = image.width
            fullscreenShadow.style.display = "unset"
            fullscreenImageContainer.style.display = "flex"
            fullscreenImage.src = image.src
            html.style.overflowY = "hidden"
            handleResize()
        })
})

fullscreenImageContainer.addEventListener("click", () => {
    fullscreenShadow.style.display = "none"
    fullscreenImageContainer.style.display = "none"
    html.style.overflowY = "scroll"
})

function handleResize () {
    const windowHeight = window.innerHeight
    const windowWidth = window.innerWidth
    if(windowWidth/windowHeight > imageWidth/imageHeight) {
        fullscreenImage.style.height = "100vh"
        fullscreenImage.style.width = "unset"
    } 
    else {
        fullscreenImage.style.height = "unset"
        fullscreenImage.style.width = "100%"
    }
}

window.addEventListener("resize", handleResize);