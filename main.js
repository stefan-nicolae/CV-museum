const fullscreenImageContainer = document.querySelector("div.fullscreen-image-container")
const fullscreenImage = document.querySelector("div.fullscreen-image-container img")
const fullscreenShadow = document.querySelector("div.fullscreen-shadow")
const html = document.querySelector("html")

let imageWidth, imageHeight

document.querySelectorAll("div.gallery img").forEach(image => {
    image.addEventListener("click", () => {
        fullscreenImage.onload = () => {
            imageWidth = fullscreenImage.width;
            imageHeight = fullscreenImage.height;

            fullscreenShadow.style.display = "unset";
            fullscreenImageContainer.style.display = "unset";
            html.style.overflow = "hidden";
            handleResize()
        };

        fullscreenImage.src = image.src;
    });
});

fullscreenImageContainer.addEventListener("click", () => {
    fullscreenShadow.style.display = "none";
    fullscreenImageContainer.style.display = "none";
    html.style.overflowY = "scroll";
});

function handleResize() {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    if (imageWidth && imageHeight) {
        if (windowWidth > windowHeight) {
            if (imageWidth / imageHeight > windowWidth / windowHeight) {
                fullscreenImage.style.width = "100vw";
                fullscreenImage.style.height = "unset";
                let verticalDelta = windowHeight / 2 - fullscreenImage.height / 2;
                if (fullscreenImage.height >= windowHeight)  verticalDelta = 0; 
                fullscreenImage.style.transform = `translateY(${verticalDelta}px)`;
            } else {
                fullscreenImage.style.width = "unset";
                fullscreenImage.style.height = "100vh";
                fullscreenImage.style.transform = ""; 
            }
        }
    }
}

window.addEventListener("resize", handleResize);
