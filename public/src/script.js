(() => {

    /* 
        https://developer.mozilla.org/en-US/docs/Web/Guide/Audio_and_video_manipulation
    */

    const videoHook = document.getElementById("dynamic-video");
    const canvasHook = document.getElementById("video-canvas");
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    const canvasContext = canvasHook.getContext("2d");
    
    const timerCallback = () => {  
        if (videoHook.paused || videoHook.ended) {  
          return;  
        }

        computeFrame(); 
        
        setTimeout(function () {  
          timerCallback();  
        }, 16); // roughly 60 frames per second  
    };

    const loadVideo = () => {
        videoHook.play();
        
        videoHook.style.opacity = 0;

        videoHook.addEventListener("play", () => {
            timerCallback();
        }, false);
    };
    
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

    canvasHook.width = windowWidth;
    canvasHook.height = windowHeight;

    videoHook.autoplay = true;

    loadVideo();

})();