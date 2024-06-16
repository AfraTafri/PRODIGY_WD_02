let [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
let intervalId = null;
const displayEl = document.getElementById("display");
const startEl = document.getElementById("start");
const lapEl = document.getElementById("lap");
let firstLap = true;
let lapIndex = 1;
let prevFlagSec = 0;
let passedFlagSec = 0;

// Event Handlers
startEl.addEventListener("click", toggleTimer);
document.getElementById("flag").addEventListener("click", recordLap);
document.getElementById("reset").addEventListener("click", resetTimer);

function toggleTimer() {
    if (!intervalId) {
        startTimer();
    } else {
        stopTimer();
    }
}

function startTimer() {
    intervalId = setInterval(displayTimer, 10);
    startEl.textContent = "Pause";
}

function stopTimer() {
    clearInterval(intervalId);
    intervalId = null;
    startEl.textContent = "Start";
}

function resetTimer() {
    clearInterval(intervalId);
    intervalId = null;
    firstLap = true;
    prevFlagSec = 0;
    passedFlagSec = 0;
    lapIndex = 1;
    [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
    displayEl.textContent = "00 : 00 : 00 : 000";
    startEl.textContent = "Start";
    lapEl.innerHTML = "";
    displayEl.classList.remove("move-up");
    lapEl.classList.remove("show-lap");
}

function displayTimer() {
    milliseconds += 10;
    if (milliseconds === 1000) {
        milliseconds = 0;
        seconds += 1;
        if (seconds === 60) {
            seconds = 0;
            minutes += 1;
            if (minutes === 60) {
                minutes = 0;
                hours += 1;
            }
        }
    }

    const h = String(hours).padStart(2, '0');
    const m = String(minutes).padStart(2, '0');
    const s = String(seconds).padStart(2, '0');
    const ms = String(milliseconds).padStart(3, '0');

    displayEl.textContent = `${h} : ${m} : ${s} : ${ms}`;
}

function recordLap() {
    if (intervalId !== null) {
        if (firstLap) {
            displayEl.classList.add("move-up");
            lapEl.classList.add("show-lap");
            firstLap = false;
        }

        passedFlagSec = hours * 3600 + minutes * 60 + seconds + milliseconds / 1000 - prevFlagSec;
        prevFlagSec += passedFlagSec;

        const lapElement = document.createElement("div");
        lapElement.classList.add("lap-entry");

        const indexEl = document.createElement("span");
        indexEl.classList.add("index");
        indexEl.textContent = String(lapIndex).padStart(2, '0');
        lapIndex++;

        const diffEl = document.createElement("span");
        diffEl.classList.add("lap-diff");
        diffEl.textContent = `+ ${passedFlagSec.toFixed(2)}`;

        const atDurationEl = document.createElement("span");
        atDurationEl.classList.add("at-duration");
        atDurationEl.textContent = displayEl.textContent;

        lapElement.append(indexEl, diffEl, atDurationEl);
        lapEl.prepend(lapElement);
    }
}
