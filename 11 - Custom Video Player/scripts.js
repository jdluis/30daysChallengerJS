let playBtn = document.querySelector('#play');
let volumeRange = document.querySelector('#volume');
let playbackRate = document.querySelector('#playbackRate');
let back10s = document.querySelector('#back10s');
let froward25s = document.querySelector('#froward25s');
let video = document.querySelector('#video');
const progress = document.querySelector('.progress');
const progress__filled = document.querySelector('.progress__filled');


function togglePLay () {
    video.paused ? video.play() : video.pause();
    video.playbackRate = 1;

    //update toggle play, pause
    let icon = video.paused ? "►" : "||";
    playBtn.textContent = icon;
}

function volumen () {
    video.volume = volumeRange.value;
}

function playback () {
    video.playbackRate = playbackRate.value * 2;
}

function skipForward () {
    video.currentTime = video.currentTime + 25;
}

function skipBack () {
    video.currentTime = video.currentTime - 10;
}

function handleProgress () {
    const percent = (video.currentTime / video.duration) * 100;
    progress__filled.style.flexBasis = `${percent}%`; 
}

function scrub (e) {
   let scrubTime = (e.offsetX /  progress.offsetWidth ) * video.duration;
   video.currentTime = scrubTime;
     
}

// listeners
video.addEventListener("timeupdate", handleProgress)
playBtn.addEventListener("click", togglePLay);
volumeRange.addEventListener("mousemove", volumen);
playbackRate.addEventListener("mousemove", playback);
progress.addEventListener("click", scrub);
froward25s.addEventListener("click", skipForward);
back10s.addEventListener("click", skipBack);