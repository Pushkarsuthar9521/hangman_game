const hangmanImage = document.querySelector(".hangmanbox img");
const keyboardDiv = document.querySelector(".keyboard");
const guessesText = document.querySelector(".guesses-text b");
const wordDisplay = document.querySelector(".word-display");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = document.querySelector(".play-again");

let currentWord, correctLetters, wrongGuessCount;
const maxGuesses = 6;

const resetGame = ( ) => {
    //reseting al game variables and UI elements
    correctLetters = [];
    wrongGuessCount = 0;
    hangmanImage.src = `images/images/hangman-${wrongGuessCount}.svg`;
    guessesText.innerHTML = `${wrongGuessCount}/ ${maxGuesses}`;
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false)
    wordDisplay.innerHTML = currentWord.split("").map(()=> `<li class="letter"></li>`).join("");
    gameModal.classList.remove("show");
}

const getRandomWord = () => {
    //selecting a random word and hint from the wordlist
    const {word, hint} = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word;
    console.log(word);
    document.querySelector(".hint-text b").innerText = hint;
    resetGame();
}

const gameOver = (isVictory) => {
    //Afer 300ms of game complete.. showing modal with relevent details
     setTimeout(() => {
        const modalText = isVictory?`You found the word :`: `The correct word was: `;
        gameModal.querySelector("img").src = `images/images/${isVictory? 'victory' : `lost`}.gif`;
        gameModal.querySelector("h4").innerText = `${isVictory? 'Congrats!' : `Game Over!!!`}`;
        gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
        gameModal.classList.add("show");
     },300)
}

const initGame = (button, clickedLetter) =>{
    //checking if clickedLetter is exist on the currentWord
    if(currentWord.includes(clickedLetter)){
        //Showing all Correct letters on the word display
      [...currentWord].forEach((letter, index) => {
            if(letter === clickedLetter){
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
       });
    }
    else{
        // If clicked letter doesn't exist then update the wrong guessCount and hangman Image
        console.log(clickedLetter, "is not exist on the word");
        wrongGuessCount++;
        hangmanImage.src = `images/images/hangman-${wrongGuessCount}.svg`;
    }

    button.disabled = true;
    guessesText.innerHTML = `${wrongGuessCount}/ ${maxGuesses}`;

    // calling gameOver function if any of these condition meets
    if(wrongGuessCount === maxGuesses) return gameOver(false);
    if(correctLetters.length === currentWord.length) return gameOver(true);

}

//creating keyboard buttons and adding event listeners
for(let i=97; i<= 122; i++) {
    const button = document.createElement("button");
    button.innerText=String.fromCharCode(i);
     keyboardDiv.appendChild(button);
     button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)));
}

getRandomWord();

playAgainBtn.addEventListener("click", getRandomWord);