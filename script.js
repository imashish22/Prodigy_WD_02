let startTime;
let elapsedTime = 0;
let timerInterval;
let running = false;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.getElementById('laps');

function timeToString(time) {
    let diffInHrs = time / 3600000;
    let hh = Math.floor(diffInHrs);

    let diffInMin = (diffInHrs - hh) * 60;
    let mm = Math.floor(diffInMin);

    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);

    let diffInMs = (diffInSec - ss) * 100;
    let ms = Math.floor(diffInMs);

    let formattedHH = hh.toString().padStart(2, "0");
    let formattedMM = mm.toString().padStart(2, "0");
    let formattedSS = ss.toString().padStart(2, "0");
    let formattedMS = ms.toString().padStart(2, "0");

    return `${formattedHH}:${formattedMM}:${formattedSS}`;
}

function print(txt) {
    display.innerHTML = txt;
}

function start() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(function printTime() {
        elapsedTime = Date.now() - startTime;
        print(timeToString(elapsedTime));
    }, 10);
    showButton("PAUSE");
    running = true;
}

function pause() {
    clearInterval(timerInterval);
    showButton("PLAY");
    running = false;
}

function reset() {
    clearInterval(timerInterval);
    print("00:00:00");
    elapsedTime = 0;
    showButton("PLAY");
    laps.innerHTML = '';
    running = false;
}

function lap() {
    if (running) {
        const li = document.createElement('li');
        li.innerText = timeToString(elapsedTime);
        laps.appendChild(li);
    }
}

function showButton(buttonKey) {
    const button = buttonKey === "PLAY" ? "Start" : "Pause";
    startStopBtn.innerHTML = button;
}

startStopBtn.addEventListener('click', () => {
    if (!running) {
        start();
    } else {
        pause();
    }
});

resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);
