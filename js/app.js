let filePath = "";
let audio = new Audio();

const fileDiv = document.getElementById("file-div");
const container = document.getElementById("container");

container.ondragover = () => {
  return false;
};

container.ondragleave = () => {
  return false;
};

container.ondragend = () => {
  return false;
};

container.ondrop = e => {
  e.preventDefault();
  
  if(!audio.paused) {
    audio.pause()
  }

  filePath = e.dataTransfer.files[0].path;
  
  audio = new Audio(filePath)
  audio.loop = true
  songRate.textContent = 1

  fileDiv.querySelector("span").textContent = e.dataTransfer.files[0].name;

  setTimeout(() => {
    songLength.textContent = audio.duration.toFixed(2);    
    progress.max = audio.duration;}, 100) 

  return false;
};

document.addEventListener('dragover', event => event.preventDefault());
document.addEventListener('drop', event => event.preventDefault());

// document.getElementsByTagName('body').ondrop = e => {
//   e.preventDefault()
// }

const playPauseButton = document.getElementById("play-pause");
const progress = document.getElementById("progress");
const songLength = document.getElementById("song-length");
const songPosition = document.getElementById("song-position");
const songRate = document.getElementById("song-rate");

playPauseButton.addEventListener("click", playPauseToggle);
progress.addEventListener("input", changeSongPosition);

window.addEventListener("keyup", function(e) {
  if (e.keyCode == "40") {
    audio.playbackRate = (audio.playbackRate - 0.1).toFixed(2);
    songRate.textContent = audio.playbackRate;
  }
  if (e.keyCode == "38") {
    audio.playbackRate = (audio.playbackRate + 0.1).toFixed(2);
    songRate.textContent = audio.playbackRate;
  }

  if (e.keyCode == "37") {
    audio.currentTime = audio.currentTime - 2;
  }
  if (e.keyCode == "39") {
    audio.currentTime = audio.currentTime + 2;
  }

  if (e.keyCode == "32") {
    playPauseButton.click()
  }
});

function initializeAudioEventListener() {
  audio.addEventListener("timeupdate", function() {
    // console.log(audio.currentTime);
    progress.value = audio.currentTime;
    songPosition.textContent = (audio.currentTime).toFixed(2);
  });
}

function playPauseToggle() {
  initializeAudioEventListener();
  

  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
}

function changeSongPosition() {
  audio.currentTime = progress.value;
}
