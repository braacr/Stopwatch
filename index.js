const display = document.getElementById("display");
const lapsContainer = document.getElementById("laps");

let timer = null;
let startTime = 0;
let elapsedTime = 0;
let isRunning = false;

function start() {
    if(!isRunning) {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(update, 10);
        isRunning = true;
    };
};

function stop() {
    if(isRunning) {
        clearInterval(timer);
        elapsedTime = Date.now() - startTime;
        isRunning = false;
    };
};

function reset() {
    clearInterval(timer);
    timer = null;
    startTime = 0;
    elapsedTime = 0;
    isRunning = false;
    display.textContent = "00:00:00:00";
    lapsContainer.innerHTML = "";
};

function update() {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;

    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
    let seconds = Math.floor(elapsedTime / 1000 % 60);
    let milliseconds = Math.floor(elapsedTime % 1000 / 10);

    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    milliseconds = String(milliseconds).padStart(2, "0");

    display.textContent = `${hours}:${minutes}:${seconds}:${milliseconds}`;
};

function recordLap() {
    if(isRunning) {
        const lapItem = document.createElement("li");
        lapItem.textContent = display.textContent;
        lapsContainer.appendChild(lapItem);
    }
}

document.addEventListener("keydown", (event) => {
    switch(event.key) {
        case "s":
            start();
            break;
        case "t":
            stop();
            break;
        case "r":
            reset();
            break;
        case "l":
            recordLap();
            break;
    }
})