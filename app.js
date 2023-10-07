// PART 1


// const facoriteNumber = 7;
// const apiUrl = `http://numbersapi.com/${facoriteNumber}?json`;

// const fetchNumber = async () => {
//     const response = await fetch(apiUrl);
//     const data = await response.json();
//     console.log(data);
// }

// fetchNumber();

// const favNumbers = [7, 11, 22];
// const apiUrl = `http://numbersapi.com/`;

// const fetchNumbers = async () => {
//     const response = await Promise.all(
//         favNumbers.map(num => fetch(`${apiUrl}${num}?json`))
//     );
//     const data = await Promise.all(response.map(res => res.json()));
//     console.log(data);
// }

// fetchNumbers()

// 7 is the figurative number of seas
// 11 is the approximate periodicity of a sunspot cycle in years
// 22 is the typical (minimum) number of episodes in a season for a television program broadcast on a major American network


//  facts about 7
// 1. '7 is the approximate number of years in the lifespan of Irish Wolfhound dogs.'
// 2. '7 is the number of types of viruses according to the Baltimore classification.'
// 3. '7 is the maximum number of times a letter-sized paper can be folded in half.'
// 4. '7 is the number of main stars in the constellations of the Big Dipper and Orion.'



// PART 2

let deckId = null;
let cardIndex = 0;
let firstCardOffset = null;

// API endpoint for shuffling the deck
const deckUrl = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';

// Function to create a new card element based on card data
function createCardElement(cardData) {
    const newCard = document.createElement('div');
    newCard.classList.add('card');
    newCard.style.backgroundImage = `url(${cardData.cards[0].image})`;
    newCard.style.zIndex = cardIndex; // Increase z-index for stacking

    if (cardIndex === 0) {
        // For the first card, set it vertically centered
        newCard.style.transform = 'rotate(0deg)';
        newCard.style.left = 'calc(50% - 75px)'; // Center horizontally
        newCard.style.top = 'calc(50% - 110px)'; // Center vertically
    } else {
        // For subsequent cards, calculate random position offsets relative to the first card
        const randomAngle = Math.random() * 90 - 45;
        const randomLeft = Math.random() * 40 - 20; // Adjust the range as needed
        const randomTop = Math.random() * 20 - 10; // Adjust the range as needed
        newCard.style.transform = `rotate(${randomAngle}deg)`;
        newCard.style.left = `calc(50% - 75px + ${randomLeft}px)`;
        newCard.style.top = `calc(50% - 110px + ${randomTop}px)`;
    }

    return newCard;
}

// Function to draw a card
const drawCard = async () => {
    try {
        if (!deckId) {
            const response = await fetch(deckUrl);
            const data = await response.json();
            deckId = data.deck_id;
        }

        const cardUrl = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`;
        const cardResponse = await fetch(cardUrl);
        const cardData = await cardResponse.json();

        if (cardData.success) {
            const cardContainer = document.getElementById('cardContainer');
            const newCard = createCardElement(cardData);

            cardContainer.appendChild(newCard);
            cardIndex++;

            if (cardData.remaining === 0) {
                const drawButton = document.getElementById('drawButton');
                drawButton.disabled = true;
                drawButton.textContent = 'Deck is empty';
            }
        } else {
            console.error('Failed to draw a card. Check if the deck is empty or there was an issue.');
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
};

// Function to handle shuffling the deck and updating the UI
function shuffleDeck() {
    deckId = null;
    cardIndex = 0;
    firstCardOffset = null;

    const cardContainer = document.getElementById('cardContainer');
    cardContainer.innerHTML = '';

    const drawButton = document.getElementById('drawButton');
    drawButton.disabled = false;
    drawButton.textContent = 'Draw a card';
}

// Event listeners
const drawButton = document.getElementById('drawButton');
drawButton.addEventListener('click', drawCard);

const shuffleButton = document.getElementById('shuffleButton');
shuffleButton.addEventListener('click', shuffleDeck);






