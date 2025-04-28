const image = document.getElementById('cover'),
title = document.getElementById('music-title'),
artist = document.getElementById('music-artist'),
currentTimeEl = document.getElementById('current-time'),
durationEl = document.getElementById('duration'),
progress = document.getElementById('progress'),
playerProgress = document.getElementById('player-progress'),
prevBtn = document.getElementById('prev'),
nextBtn = document.getElementById('next'),
playBtn = document.getElementById('play'),
background = document.getElementById('bg-img');

const music = new Audio();

const songs = [
    {
        path: 'assets/1.mp3',
        displayName: 'Do I wanna now',
        cover: 'assets/1.jpg',
        artist: 'Artic Monkeys',
    },
    {
        path: 'assets/2.mp3',
        displayName: 'Maria',
        cover: 'assets/2.jpg',
        artist: 'Matue',
    },
    {
        path: 'assets/3.mp3',
        displayName: 'O Som',
        cover: 'assets/3.jpg',
        artist: 'Matue',
    },
]

let musicIndex = 0;
let isPLaying = false;

function togglePlay(){
    if(isPLaying){
        pauseMusic();
    }else{
    playMusic();
    }
}

function playMusic(){
    isPLaying = true;

    playBtn.classList.replace('fa-play', 'fa-pause');

    playBtn.setAttribute('title', 'pause');
    music.play();
}

function pauseMusic(){
    isPLaying = false;

    playBtn.classList.replace('fa-pause', 'fa-play');

    playBtn.setAttribute('title', 'play');
    music.pause();
}

function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;  // Corrigido
    image.src = song.cover;
    background.style.backgroundImage = `url('${song.cover}')`;  // Corrigido
}


function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    if (isPLaying) playMusic();
}

function updateProgressBar() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    durationEl.textContent = duration ? formatTime(duration) : '0:00';
    currentTimeEl.textContent = formatTime(currentTime);
}

function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

loadMusic(songs[musicIndex]);

const volumeControl = document.getElementById('volume');

volumeControl.addEventListener('input', (e) => {
    music.volume = e.target.value;
});

music.addEventListener('error', () => {
    alert('Erro ao carregar a música. Verifique o arquivo.');
});