// This method makes the grid
function renderCards(){
    let gridSize = 16;

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

    let grid = '';
    for (let i = 0; i < pairedImages.length; i++) {
        grid += `
            <div class="card" id="card${i}">
                <div class="back-face">${i}</div>
                <div class="front-face">
                    <img src="Style/Pictures/${pairedImages[i]}" id="pair${i}"/>
                </div>
            </div>`;
    }

    document.getElementById("memory-grid").innerHTML = grid;
}
renderCards();

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

// method to store cards



// changes grid number into selected
var selected = document.getElementById("character").value;

