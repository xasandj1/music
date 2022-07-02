let currentMusic = 0;
const music = document.querySelector("#audio"),
    seekBar = document.querySelector(".seek-bar"),
    songName = document.querySelector(".music-name"),
    artistName = document.querySelector(".artist-name"),
    disk = document.querySelector(".disk"),
    currentTime = document.querySelector(".current-time"),
    musicDuration = document.querySelector(".song-duration"),
    playBtn = document.querySelector(".play-btn"),
    forwardBtn = document.querySelector(".forward-btn"),
    backwardBtn = document.querySelector(".backward-btn");
playBtn.addEventListener("click", () => {
    playBtn.className.includes("pause") ? music.play() : music.pause(), playBtn.classList.toggle("pause"), disk.classList.toggle("play")
});
const setMusic = b => {
    seekBar.value = 0;
    let a = songs[b];
    currentMusic = b, music.src = `${a.path}.mp3`, songName.innerHTML = a.name, artistName.innerHTML = a.artist, disk.style.backgroundImage = `url('${a.cover}.png')`, currentTime.innerHTML = "00:00", setTimeout(() => {
        seekBar.max = music.duration, musicDuration.innerHTML = formatTime(music.duration)
    }, 300)
};
setMusic(0);
const formatTime = c => {
    let a = Math.floor(c / 60);
    a < 10 && (a = `0${a}`);
    let b = Math.floor(c % 60);
    return b < 10 && (b = `0${b}`), `${a} : ${b}`
};
setInterval(() => {
    seekBar.value = music.currentTime, currentTime.innerHTML = formatTime(music.currentTime), Math.floor(music.currentTime) == Math.floor(seekBar.max) && forwardBtn.click()
}, 500), seekBar.addEventListener("change", () => {
    music.currentTime = seekBar.value
});
const playMusic = () => {
    music.play(), playBtn.classList.remove("pause"), disk.classList.add("play")
};
forwardBtn.addEventListener("click", () => {
    currentMusic >= songs.length - 1 ? currentMusic = 0 : currentMusic++, setMusic(currentMusic), playMusic()
}), backwardBtn.addEventListener("click", () => {
    currentMusic <= 0 ? currentMusic = songs.length - 1 : currentMusic--, setMusic(currentMusic), playMusic()
}), window.addEventListener("keydown", b => {
    var a = b.code;
    "ArrowRight" == a ? (currentMusic >= songs.length - 1 ? currentMusic = 0 : currentMusic++, setMusic(currentMusic), playMusic()) : "ArrowLeft" == a ? (currentMusic <= 0 ? currentMusic = songs.length - 1 : currentMusic--, setMusic(currentMusic), playMusic()) : "Space" == a && "Enter" == a ? (music.play(), playBtn.classList.remove("pause"), disk.classList.add("play")) : console.log(!1)
}, !1)