import renderCards from "./gridGenerator.js"
import {getFavouriteImages} from "../api/preferenceLoader.js";

if(localStorage.getItem("MEMORY_TOKEN") === null) {
    window.location.replace("/login");
}

document.getElementById("theme").value = await getFavouriteImages();
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

export function endGame() {
    clearInterval(countdownInterval)
    alert(`Je hebt gewonnen! tijd: ${elapsedTime} seconden`)
}

export function startTimer() {
    countdownBar.max = totalTime
    countdownBar.value = remainingTime

    countdownInterval = setInterval(() => {
        remainingTime--
        elapsedTime ++

        countdownBar.value = remainingTime
        elapsedTimeDisplay.textContent = `Verlopen tijd: ${elapsedTime} seconden`

        document.getElementById("theme").disabled = true;
        document.getElementById("character").disabled = true;
        document.getElementById("size").disabled = true;

        if (remainingTime <= 0) {
            clearInterval(countdownInterval)
            remainingTimeDisplay.textContent = "Tijd is om!"
            alert(`Tijd is om`)

            renderCards();
            startTimer();
        }
    }, 1000)
}

export function restartTimer(){
    clearInterval(countdownInterval);
    remainingTime = totalTime;
    elapsedTime = 0;
    timerStarted = false;

    countdownBar.value = totalTime;
    elapsedTimeDisplay.textContent = `Verlopen tijd: 0 seconden`;
    remainingTimeDisplay.textContent = `Resterende tijd: ${totalTime} seconden`;

   
    document.getElementById("theme").disabled = false;
    document.getElementById("size").disabled = false;
    document.getElementById("character").disabled = false;

    renderCards();
}

export function handleChangeEvent() {
  document.getElementById("loader").style.display = "block";

  setTimeout(() => {
    renderCards();
    restartTimer();
    document.getElementById("loader").style.display = "none";
  }, 10000);
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
    restartTimer()
})

export async function fetchScoreboard() {
  try {
    const response = await fetch('http://localhost:8000/memory/top-scores');
    const scores = await response.json();

    const scoreList = document.getElementsByClassName('scores')[0];
    scoreList.innerHTML = '';

    scores.forEach((entry, index) => {
        const ul = document.createElement('ul');
        ul.textContent = `${index + 1}. ${entry.username} - ${entry.score}`;
        scoreList.appendChild(ul);
    });

  } catch (error) {
      console.error('Error fetching scoreboard:', error);
  }
}


export async function fetchAverageTime(){
    try{
        const response = await fetch('http://localhost:8000/memory/scores');
        const scores = await response.json();
        console.log(scores)
        const totalScores = scores.map(entry => parseFloat(entry.score));
        let length = totalScores.length
        let sum = 0;

        totalScores.forEach( num => {
        sum += num;
        })

        let averageTime = Math.round(sum/length);
        document.getElementById('avgscores').innerHTML = averageTime;
       
    }  catch (error) {
      console.error('Error fetching scoreboard:', error);
  }
}





//redirect home button
const redirectButton = document.getElementById("home")

redirectButton.addEventListener("click", () =>{
    window.location.href = "/";
})

