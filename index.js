let gridSize = 16;
let grid = '';
    for (let i = 0; i < gridSize; i++) {
        grid += `
            <div class="card" id="card${i}">
                <div class="back-face">${i}</div>
                <div class="front-face">${i}</div>
            </div>`;
    }

    document.getElementById("memory-grid").innerHTML = grid;


let totalTime = 100;
let remainingTime = totalTime;
let elapsedTime = 0;
let countdownInterval;
let timerStarted = false;

const countdownBar = document.getElementById("countdown");
const elapsedTimeDisplay = document.querySelector(".header p:nth-of-type(1)");
const remainingTimeDisplay = document.querySelector(".header p:nth-of-type(3)");
const memoryGrid = document.getElementById("memory-grid");

function startTimer() {
    countdownBar.max = totalTime;
    countdownBar.value = remainingTime;

    countdownInterval = setInterval(() => {
        remainingTime--;
        elapsedTime ++;

        countdownBar.value = remainingTime;
        elapsedTimeDisplay.textContent = `Verlopen tijd: ${elapsedTime} seconden`;

        if (remainingTime <= 0) {
            clearInterval(countdownInterval);
            remainingTimeDisplay.textContent = "Tijd is om!";
        }
    }, 1000);
}

memoryGrid.addEventListener("click", () => {
    if (!timerStarted) {
        startTimer();
        timerStarted = true;
    }
});
