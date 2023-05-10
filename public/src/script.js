/**
    Manipulate a video to turn it black and white using HTML5 canvas
    @see https://developer.mozilla.org/en-US/docs/Web/Guide/Audio_and_video_manipulation
    @returns {void}
*/
(() => {

    // Get DOM elements
    const videoHook = document.getElementById("dynamic-video");
    const canvasHook = document.getElementById("video-canvas");

    // Get window size
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;

    // Get canvas context
    const canvasContext = canvasHook.getContext("2d");

    /**
        Callback function to continuously execute frame manipulation
        @returns {void}
    */
    const timerCallback = () => {
        if (videoHook.paused || videoHook.ended) {
            return;
        }

        computeFrame();

        setTimeout(function () {
            timerCallback();
        }, 16); // roughly 60 frames per second
    };

    /**
        Load video and start manipulation on playback
        @returns {void}
    */
    const loadVideo = () => {
        videoHook.play();

        videoHook.style.opacity = 0;

        videoHook.addEventListener("play", () => {
            timerCallback();
        }, false);
    };

    /**
        Manipulate a frame to turn it black and white
        @returns {void}
    */
    const computeFrame = () => {
        canvasContext.drawImage(videoHook, 0, 0, windowWidth, windowHeight);

        let frame = canvasContext.getImageData(0, 0, windowWidth, windowHeight);
        let frameLength = frame.data.length / 4;

        for (let i = 0; i < frameLength; i++) {
            let grey = (frame.data[i * 4 + 0] + frame.data[i * 4 + 1] + frame.data[i * 4 + 2]) / 3;
            frame.data[i * 4 + 0] = grey;
            frame.data[i * 4 + 1] = grey;
            frame.data[i * 4 + 2] = grey;
        }

        canvasContext.putImageData(frame, 0, 0);
        return;
    };

    // Set canvas dimensions
    canvasHook.width = windowWidth;
    canvasHook.height = windowHeight;

    // Start video playback
    videoHook.autoplay = true;

    loadVideo();
})();