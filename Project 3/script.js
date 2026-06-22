const board = document.getElementById("board");
const movesText = document.getElementById("moves");
const restartBtn = document.getElementById("restart");
const message = document.getElementById("message");
const themeBtn = document.getElementById("themeBtn");
const status = document.getElementById("status");

const emojis = [
    "🍎","🍎",
    "🍌","🍌",
    "🍇","🍇",
    "🍒","🍒",
    "🍉","🍉",
    "🥝","🥝",
    "🍍","🍍",
    "🥭","🥭"
];

let cards = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moves = 0;

function shuffle(array){
    for(let i = array.length - 1; i > 0; i--){
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createBoard(){

    board.innerHTML = "";
    message.textContent = "";
    status.textContent = "Find all matching pairs!";

    firstCard = null;
    secondCard = null;
    lockBoard = false;

    moves = 0;
    movesText.textContent = moves;

    cards = [...emojis];
    shuffle(cards);

    cards.forEach(emoji => {

        const card = document.createElement("div");

        card.classList.add("card");
        card.dataset.emoji = emoji;
        card.textContent = emoji;

        card.addEventListener("click", flipCard);

        board.appendChild(card);

    });
}

function flipCard(){

    if(lockBoard) return;
    if(this === firstCard) return;
    if(this.classList.contains("matched")) return;

    this.classList.add("flipped");

    if(!firstCard){
        firstCard = this;
        return;
    }

    secondCard = this;

    moves++;
    movesText.textContent = moves;

    checkMatch();
}

function checkMatch(){

    const isMatch =
        firstCard.dataset.emoji ===
        secondCard.dataset.emoji;

    if(isMatch){

        status.textContent = "Match Found! 🎉";

        firstCard.classList.add("matched");
        secondCard.classList.add("matched");

        resetTurn();
        checkWin();

    }else{

        status.textContent = "Try Again ❌";

        lockBoard = true;

        setTimeout(() => {

            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");

            resetTurn();

        }, 1000);
    }
}

function resetTurn(){

    firstCard = null;
    secondCard = null;
    lockBoard = false;

}

function checkWin(){

    const matchedCards =
        document.querySelectorAll(".matched");

    if(matchedCards.length === cards.length){

        message.textContent =
            `🎉 You Won in ${moves} moves!`;

        status.textContent =
            "All pairs matched! 🏆";
    }
}

restartBtn.addEventListener("click", createBoard);

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){
        themeBtn.textContent = "☀️ Light Mode";
    }else{
        themeBtn.textContent = "🌙 Dark Mode";
    }

});

createBoard();