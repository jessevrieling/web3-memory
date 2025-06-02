    let cardMap = {};
export default function renderCards() {
	const gridSize = document.getElementById("size").value;
	const character = document.getElementById("character").value;
	const gridContainer = document.getElementById("memory-grid")
	const gridLayout = Math.sqrt(gridSize)
	
	let grid = '';
    const uniqueCount = gridSize / 2;
    const uniqueSeeds = getUniqueRandomNumbers(uniqueCount, 1, 9999);

    const imagePairs = uniqueSeeds.flatMap((seed, index) => {
        const url = `https://picsum.photos/seed/${seed}/200`;
        return [
            { url, pairId: index },
            { url, pairId: index }
        ];
    });

    const shuffledImages = shuffleArray(imagePairs);

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

    document.getElementById("character").addEventListener("change", renderCards);
    document.getElementById("size").addEventListener("change", renderCards);
    attachFlipListeners();
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

function getUniqueRandomNumbers(count, min, max) {
	if (max - min + 1 < count) {
		throw new Error("Range to small for amount of numbers");
	}

	const numbers = new Set();

	while (numbers.size < count) {
		const rand = Math.floor(Math.random() * (max - min + 1)) + min;
		numbers.add(rand);
	}

	return Array.from(numbers);
}

const cards = document.querySelectorAll('.card');
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


        if(firstPairId === secondPairId){
            
            console.log('a match')
            firstCard.removeEventListener('click', flipCard)
            secondCard.removeEventListener('click', flipCard)
        } else{
            setTimeout(()=>{
                firstCard.classList.remove('flip');
                secondCard.classList.remove('flip');
            }, 2000);
        }
           
    }
}
