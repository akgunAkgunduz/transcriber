let filePath = "";
let audio = new Audio();

const fileDiv = document.getElementById("file-div");
const container = document.getElementById("container");
const playPauseButton = document.getElementById("play-pause");

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
  win.focus()
  
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
    progress.max = audio.duration;
    progress.value = 0;
    volume.value = 1;
    playPauseButton.disabled = false;
    playPauseButton.click();
  }, 100);

  return false;
};

document.addEventListener('dragover', event => event.preventDefault());
document.addEventListener('drop', event => event.preventDefault());

// document.getElementsByTagName('body').ondrop = e => {
//   e.preventDefault()
// }


const progress = document.getElementById("progress");
const songLength = document.getElementById("song-length");
const songPosition = document.getElementById("song-position");
const songRate = document.getElementById("song-rate");
const volume = document.getElementById("volume");

volume.addEventListener('input', function() {
  audio.volume = volume.value;
});

playPauseButton.addEventListener("click", playPauseToggle);
progress.addEventListener("input", changeSongPosition);

window.addEventListener("keyup", function(e) {
  if (e.keyCode == "40") {
    audio.playbackRate = (audio.playbackRate - 0.05).toFixed(2);
    songRate.textContent = audio.playbackRate;
  }
  if (e.keyCode == "38") {
    audio.playbackRate = (audio.playbackRate + 0.05).toFixed(2);
    songRate.textContent = audio.playbackRate;
  }

  if (e.keyCode == "37") {
    audio.currentTime = audio.currentTime - 2.5;
  }
  if (e.keyCode == "39") {
    audio.currentTime = audio.currentTime + 2.5;
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
    playPauseButton.querySelector('i').innerHTML = 'pause'
  } else {
    audio.pause();
    playPauseButton.querySelector('i').innerHTML = 'play_arrow'
  }
}

function changeSongPosition() {
  audio.currentTime = progress.value;
}
