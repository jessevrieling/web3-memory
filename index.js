// crates grid
function renderCards(){
const totalCards = parseInt(document.getElementById("size").value, 10);
const gridContainer = document.getElementById("memory-grid");
const gridLayout = Math.sqrt(totalCards);
let gridSize = document.getElementById("size").value;
let character = document.getElementById("character").value
document.getElementById("character").addEventListener("change", renderCards);
document.getElementById("size").addEventListener("change", renderCards);
let grid = '';
    const images = [
        'pair1.jpg', 'pair2.jpg',
        'pair3.jpg', 'pair4.jpg',
        'pair5.jpg', 'pair6.jpg',
        'pair7.jpg', 'pair8.jpg',
        'pair9.jpg', 'pair10.jpg',
        'pair11.jpg', 'pair12.jpg',
        'pair13.jpg', 'pair14.jpg',
        'pair15.jpg', 'pair16.jpg'
    ];

    // Shuffle images                              
    let pairsNeeded = gridSize / 2;
    let selectedImages = images.sort(() => 0.5 - Math.random())
    .sort(() => 0.5 - Math.random())
    .slice(0, pairsNeeded);
    let pairedImages = [...selectedImages, ...selectedImages];
    pairedImages.sort(() => 0.5 - Math.random());


    for (let i = 0; i < gridSize; i++) {
        let backFaceContent = (character === "count") ? i : character;
        grid += `
            <div class="card" id="card${i}">
                <div class="back-face">${backFaceContent}</div>
                <div class="front-face"><img src="Style/Pictures/${pairedImages[i]}" id="pair${i}"/></div>
            </div>`;
    }

    gridContainer.innerHTML = grid;
    gridContainer.style.display = "grid";
    gridContainer.style.gridTemplateColumns = `repeat(${gridLayout}, 1fr)`;

    attachFlipListeners();
}
renderCards();

function attachFlipListeners() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('click', flipCard);
    });
}

// Method to flip cards
const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let firstCard, secondCard;
function flipCard(){
    this.classList.add('flip');

    if(!hasFlippedCard){
        //on first click
        hasFlippedCard = true;
        firstCard = this;
        console.log(firstCard.id)
    } else {
        hasFlippedCard = false;
        secondCard = this;
        console.log(secondCard.id)

        if(firstCard.id === secondCard.id){
            firstCard.removeEventlistener('click', flipCard);
            secondCard.removeEventlistener('click', flipCard)
            console.log('pair')
        }
        console.log('executed')
    }
}
cards.forEach(card => card.addEventListener('click', flipCard));


// Timer for the game
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

//Restart game
const restartButton = document.getElementById("restart");
restartButton.addEventListener("click", () =>{
    clearInterval(countdownInterval);
    remainingTime = totalTime;
    elapsedTime = 0;
    timerStarted = false;

    countdownBar.value = totalTime;

    renderCards();
})
