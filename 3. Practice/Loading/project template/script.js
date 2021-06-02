const $preloader = document.getElementById("preloader");
const $preloaderText = $preloader.querySelector("#preloader-text");
const $preloaderBg = $preloader.querySelector("#preloader-bg");

let loadingProgress = 0;
let movePicture = 0;

let timerId = setInterval(updateLoading, 1);

function updateLoading() {
    // console.log("e");
    loadingProgress++;
    $preloaderText.textContent = `${loadingProgress}%`;

    $preloaderBg.style.filter = `blur(${-0.7 * loadingProgress + 70}px)`;

    if (loadingProgress > 99) {
        clearInterval(timerId);

        timerId = setInterval(movePictures, 1);
    }
}

function movePictures() {
    movePicture--;
    $preloader.style.top = `${movePicture}` + "vh";

    if (movePicture == -100) {
        clearInterval(timerId);
    }
}
