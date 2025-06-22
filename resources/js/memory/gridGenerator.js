import fetchImages from "../api/imageFetcher.js";
import {endGame, restartTimer, handleChangeEvent, fetchScoreboard, fetchAverageTime} from "./memory.js";
import {fetchWithToken} from "../api/api.js";

let cardMap = {};
let pairsFound = 0;
let pairCount;
const cardsFound = document.getElementById("cards-found")

export default async function renderCards() {
	const gridSize = document.getElementById("size").value;
    const theme = document.getElementById("theme").value;
	const character = document.getElementById("character").value;
	const gridContainer = document.getElementById("memory-grid")
	const gridLayout = Math.sqrt(gridSize)
    const overlay = document.getElementById("loading-overlay");
    overlay.style.display = "flex"; // block input

	let grid = '';
    let uniqueCount = gridSize / 2
    pairCount = uniqueCount
    const images = await fetchImages(uniqueCount);
    const shuffledImages = shuffleArray([...images, ...images]);

    for (let i = 0; i < gridSize; i++) {
        const { url, pairId } = shuffledImages[i];
        const backFaceContent = (character === "count") ? i : character;

        grid += `
            <div class="card" id="card${i}" data-cardid="${i}">
                <div class="back-face">${backFaceContent}</div>
                <div class="front-face">
                    <img src="${url}" id="pair${i}" />
                </div>
            </div>`;
        cardMap[i] = pairId;
    }

    gridContainer.innerHTML = grid;
    gridContainer.style.display = "grid";
    gridContainer.style.gridTemplateColumns = `repeat(${gridLayout}, 1fr)`;
    overlay.style.display = "none";

    document.getElementById("character").addEventListener("change", () =>{
        renderCards();
        restartTimer();
    });
    document.getElementById("size").addEventListener("change", () =>{
        renderCards();
        restartTimer();
    });

    document.getElementById("theme").addEventListener("change", () =>{
        renderCards();
        restartTimer();
    });

    await getColor();
    await fetchScoreboard();
    await fetchAverageTime();
    attachFlipListeners();
}
async function getColor() {
    const response = await fetchWithToken("http://localhost:8000/player/preferences", {
        method: "get",
        headers: {
            "Content-Type": "application/json"
        }
    });
    const data = await response.json();
    const backFaces = document.querySelectorAll(".back-face");
    const color = data.color_closed;

    backFaces.forEach(el => {
        el.style.backgroundColor = color === undefined ? '#A8CD89': color;
    });
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    
    return array;
}

function attachFlipListeners() {
    const cards = document.querySelectorAll('.card')

    cards.forEach(card => {
        card.addEventListener('click', flipCard)
    })
}

let hasFlippedCard = false;
let firstCard, secondCard;
let firstPairId, secondPairId;

function flipCard(){
    this.classList.add('flip');
    const cardId = this.dataset.cardid;
    const pairId = cardMap[cardId];

    if(!hasFlippedCard){
        hasFlippedCard = true;
        firstCard = this;
        firstPairId = pairId;

    } else {
        hasFlippedCard = false;
        secondCard = this;
        secondPairId = pairId;
        checkForMatch();
    }
}

function checkForMatch(){
    let isMatch = firstPairId === secondPairId;

    if(isMatch === true) {
        disableCards();
        pairsFound++;
        cardsFound.innerHTML = `Paren gevonden: ${pairsFound}`;

        if(pairsFound === pairCount) {
            endGame()
        }
    } else {
        unflipCards();
    }
}

function disableCards(){
    firstCard.removeEventListener('click', flipCard)
    secondCard.removeEventListener('click', flipCard)
}

function unflipCards(){
    setTimeout(()=>{
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
    }, 1000);
}
