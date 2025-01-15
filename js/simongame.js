// Game Variables
let gameSeq = [];
let userSeq = [];
let btns = ["yellow", "red", "purple", "green"];
let started = false;
let level = 0;

// DOM Elements
const h2 = document.querySelector("h2");
const allBtns = document.querySelectorAll(".btn");

// Event Listener to Start the Game
document.addEventListener("keypress", function () {
    if (!started) {
        console.log("Game is started");
        started = true;
        levelUp();
    }
});

// Functions for Button Flashes
function gameFlash(btn) {
    btn.classList.add("gameFlash");
    setTimeout(() => btn.classList.remove("gameFlash"), 250);
}

function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(() => btn.classList.remove("userFlash"), 250);
}

// Level Up Function
function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    const randIdx = Math.floor(Math.random() * btns.length);
    const randColor = btns[randIdx];
    const randBtn = document.querySelector(`.${randColor}`);
    
    gameSeq.push(randColor);
    console.log("Game Sequence:", gameSeq);
    gameFlash(randBtn);
}

// Check User's Answer
function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `Game Over! Your Score was <b>${level}</b><br>Press any key to start.`;
        document.body.style.backgroundColor = "red";
        setTimeout(() => (document.body.style.backgroundColor = "white"), 150);
        reset();
    }
}

// Button Press Handler
function btnPress() {
    const btn = this;
    userFlash(btn);

    const userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

// Add Click Event Listeners to Buttons
allBtns.forEach(btn => btn.addEventListener("click", btnPress));

// Reset Game
function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
