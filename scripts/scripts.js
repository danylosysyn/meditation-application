const vids = document.getElementsByTagName("video");

const modeButtons = document.getElementsByClassName("main__mode_el");
const forestButton = document.querySelector(".main__forest");
const rainButton = document.querySelector(".main__rain");
const beachButton = document.querySelector(".main__beach");
const timer = document.querySelector(".main__timer");

const sounds = document.getElementsByTagName("audio");

let current, video, audio;

Array.from(modeButtons).forEach((button) => {
    button.addEventListener("click", function () {
        timer.style.backgroundColor = "transparent";

        video = document.getElementById(this.getAttribute("vid"))
        audio = document.getElementById(this.getAttribute("snd"))

      setInterval(circleUpdate, 1000);

        play.style.display = "block";
        play.src = "./media/svg/pause.svg"
        
        for(vd of Array.from(vids)){
            vd.style.display = "none"
        }

        for(snd of Array.from(sounds)){
            snd.pause();
        }

        video.style.display = "block";
        audio.play();
        current = audio;
    })
})

const outline = document.getElementById("moving-outline");
const time = document.getElementsByClassName("main__display")[0];
const play = document.getElementById("play");
const timeSelect = document.getElementsByClassName("main__time-button");



const outlineLength = outline.getTotalLength();
let testDuration = 600;
outline.style.strokeDasharray = outlineLength;
outline.style.strokeDashoffset = outlineLength;

Array.from(timeSelect).forEach((button) => {
    button.addEventListener("click", function () {
        testDuration = this.getAttribute("data-time");
        time.textContent = `${Math.floor(testDuration / 60)} : ${Math.floor(testDuration % 60)}`
    })
})

const checkPlaying = () => {
    for (x of sounds) {
        if (!x.paused) {
            x.pause();
            current = x;
            playingState = false;
            break;
        } else if (current === x) {
            x.play();
            playingState = true;
        }
    }
    return playingState;
}


function circleUpdate() {
    current.ontimeupdate = () => {

        let currentTime = current.currentTime;
        let elapsedTime = testDuration - currentTime;
        let seconds = Math.floor(elapsedTime % 60);
        let minutes = Math.floor(elapsedTime / 60);
        let progress = outlineLength - (currentTime / testDuration) * outlineLength;
        outline.style.strokeDashoffset = progress;

        time.textContent = `${minutes} : ${seconds}`


        if (currentTime >= testDuration) {
            current.pause();
            currentTime = 0;
            play.src = "./media/svg/play.svg";
            time.textContent = "Love yourself";
            setTimeout(() => {
                location.reload()
            }, 3000);
        }
    }
}


play.addEventListener("click", () => {
    let isPlaying = checkPlaying();
    isPlaying ? play.src = "./media/svg/pause.svg" : play.src = "./media/svg/play.svg";
})


