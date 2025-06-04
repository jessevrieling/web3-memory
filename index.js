import renderCards from "./gridGenerator.js"

renderCards()

// Timer for the game
let totalTime = 100
let remainingTime = totalTime
let elapsedTime = 0
let countdownInterval
let timerStarted = false

const countdownBar = document.getElementById("countdown")
const elapsedTimeDisplay = document.querySelector(".header p:nth-of-type(1)")
const remainingTimeDisplay = document.querySelector(".header p:nth-of-type(3)")
const memoryGrid = document.getElementById("memory-grid")

export default function endGame() {
    clearInterval(countdownInterval)
    alert(`Je hebt gewonnen! tijd: ${elapsedTime} seconden`)
}

function startTimer() {
    countdownBar.max = totalTime
    countdownBar.value = remainingTime

    countdownInterval = setInterval(() => {
        remainingTime--
        elapsedTime ++

        countdownBar.value = remainingTime
        elapsedTimeDisplay.textContent = `Verlopen tijd: ${elapsedTime} seconden`

        if (remainingTime <= 0) {
            clearInterval(countdownInterval)
            remainingTimeDisplay.textContent = "Tijd is om!"
            alert(`Tijd is om`)
        }
    }, 1000)
}

memoryGrid.addEventListener("click", () => {
    if (!timerStarted) {
        startTimer()
        timerStarted = true
    }
});

//Restart game
const restartButton = document.getElementById("restart")
restartButton.addEventListener("click", () =>{
    clearInterval(countdownInterval)
    remainingTime = totalTime
    elapsedTime = 0
    timerStarted = false

    countdownBar.value = totalTime

    renderCards()
})

//Color change
const colorInput = document.getElementById("color-input");

colorInput.onchange = () => {
    const backFaces = document.querySelectorAll(".back-face");

    backFaces.forEach(el => {
        el.style.backgroundColor = colorInput.value;
    });
};

