

let reproduciendoAhora = document.querySelector('.reproduciendo-ahora');
let pistaArt = document.querySelector('.pista-art');
let pistaNombre = document.querySelector('.pista-nombre');
let pistaArtista = document.querySelector('.pista-artista');


let playPausa = document.querySelector('.pista-playpausa');
let nextBtn = document.querySelector('.pista-siguiente');
let prevBtn = document.querySelector('.pista-prev');

let seek_slider = document.querySelector('.seek_slider');
let volume_slider = document.querySelector('.volume_slider');
let tiempoActual = document.querySelector('.tiempo-actual');
let duracionTotal = document.querySelector('.duracion-total');
let wave = document.querySelector('#wave');
let randomIcon = document.querySelector('.fa-random');
let audio = document.createElement('audio');


let pista_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

const music_list = [
  {
    img: '../img/1.jpg',
    name: 'Over My Head Cable Car',
    artist: 'A Day To Remember',
    music: '../audio/Over My Head Cable Car.mp3'
  },
  {
    img: '../img/2.jpg',
    name: 'Song for the Broken',
    artist: 'Close Your Eyes',
    music: '../audio/Song for the Broken.mp3'
  },
  {
    img: '../img/3.jpg',
    name: 'One Choice',
    artist: 'The Ghost Inside',
    music: '../audio/One Choice.mp3'
  }
]

loadTrack(pista_index);


function loadTrack(pista_index) {
  clearInterval(updateTimer);
  reset();

  audio.src = music_list[pista_index].music;
  audio.load();

  pistaArt.style.backgroundImage = `url(${music_list[pista_index].img})`;
  pistaNombre.textContent = music_list[pista_index].name;
  pistaArtista.textContent = music_list[pista_index].artist;
  reproduciendoAhora.textContent = `Reproduciendo ahora ${pista_index + 1} de ${music_list.length}`;

  updateTimer = setInterval(setUpdate, 1000);

  audio.addEventListener('ended', siguientePista);

  random_bg_color();

};

function random_bg_color() {

  let hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e'];
  let a;

  function populate(a) {
    for (let i = 0; i < 6; i++) {
      let x = Math.round(Math.random() * 14);
      let y = hex[x];
      a += y;
    }
    return a;
  }
  let Color1 = populate('#');
  let Color2 = populate('#');
  var angle = 'to right';

  let gradient = 'linear-gradient(' + angle + ',' + Color1 + ', ' + Color2 + ")";
  document.body.style.background = gradient;
};

function reset() {
  isPlaying = false;
  audio.currentTime = 0;
  seek_slider.value = 0;
  tiempoActual.textContent = '0:00';
  duracionTotal.textContent = '0:00';
};


function pistaRandom() {
  isRandom ? pauseRandom() : playRandom();
};

function playRandom() {
  isRandom = true;
  randomIcon.classList.add('randomActive');
};

function pauseRandom() {
  isRandom = false;
  randomIcon.classList.remove('randomActive');
};


function pistaRepetir() {
  let repetir = pista_index;
  loadTrack(repetir);
  pistaPlay();
};

function pistaPlayPausa() {
  isPlaying ? pistaPause() : pistaPlay();
};

function pistaPlay() {
  audio.play();
  isPlaying = true;
  pistaArt.classList.add('rotate');
  wave.classList.add('loader');
  playPausa.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
};


function pistaPause() {
  audio.pause();
  isPlaying = false;
  pistaArt.classList.remove('rotate');
  wave.classList.remove('loader');
  playPausa.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
};

function pistaPause() {
  audio.pause();
  isPlaying = false;
  pistaArt.classList.remove('rotate');
  wave.classList.remove('loader');
  playPausa.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
};



function siguientePista() {

  if(isRandom){
      pista_index = Math.floor(Math.random() * music_list.length);
  }
  else{
      pista_index++;
      if(pista_index >= music_list.length){
          pista_index = 0;
      }
  }
  loadTrack(pista_index);
  pistaPlay();
}

function pistaPrev() {
  pista_index--;
  if(pista_index < 0){
      pista_index = music_list.length - 1;
  }
  loadTrack(pista_index);
  pistaPlay();
}

function seekTo() {
  let seek_slider_value = audio.duration * (seek_slider.value / 100);
  audio.currentTime = seek_slider_value;
}

function setVolume(){
  audio.volume = volume_slider.value / 100;
}

function setUpdate() {
  let seekPosition = 0;
  if (!isNaN(audio.duration)) {
    seekPosition = audio.currentTime * (100 / audio.duration);
    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(audio.currentTime / 60);
    let currentSeconds = Math.floor(audio.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(audio.duration / 60);
    let durationSeconds = Math.floor(audio.duration - durationMinutes * 60);

    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

    tiempoActual.textContent = currentMinutes + ":" + currentSeconds;
    duracionTotal.textContent = durationMinutes + ":" + durationMinutes;
  };
};