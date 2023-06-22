var height = 4;
var width = 4;

// Keep track of current row and column
var row = 0;
var col = 0;

// Flag to indicate if game is over
var gameOver = false;

// Declare variables for word and dictionary
let word;
let dictionary;
let hint;

// Function to get a random word from API
// Function to get a random word from API
async function getRandomWord() {
    const startOverButton = document.getElementById("start-over-button");

    // Disable start over button and update text while fetching word
    startOverButton.disabled = true;
    startOverButton.innerText = "Loading...";

    if (!dictionary) {
        // Make API call to get dictionary if it hasn't been loaded yet
        const response = await fetch("https://api.masoudkf.com/v1/wordle", {
            headers: {
                "x-api-key": "sw0Tr2othT1AyTQtNDUE06LqMckbTiKWaVYhuirv",
            },
        });

        if (response.ok) {
            // Parse response and store dictionary
            const data = await response.json();
            dictionary = data.dictionary;
        }
    }

    if (dictionary) {
        // Select a random word from the dictionary
        const randomIndex = Math.floor(Math.random() * dictionary.length);
        const selectedWord = dictionary[randomIndex];
        word = selectedWord.word.toUpperCase();
        hint = selectedWord.hint; // Store the hint associated with the selected word
    }

    // Enable start over button and update text
    startOverButton.disabled = false;
    startOverButton.innerText = "Start Over";
    console.log(word);
    console.log(hint);
}



// Call initialize function on window load
window.onload = function() {
    document.getElementById("congrats").style.display = "none";

    intialize();
}

// Function to initialize game board and attach event listeners
async function intialize() {
    // Create the game board
    for (let r = 0; r < height; r++) {
        for (let c = 0; c < width; c++) {
            // Create a span element for each tile
            let tile = document.createElement("span");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.innerText = "";
            document.getElementById("board").appendChild(tile);
        }
    }

    // Get a random word and listen for keyboard events
    await getRandomWord();

    document.addEventListener("keyup", (e) => {
        if (gameOver) return; // Ignore input if game is over

        if ("KeyA" <= e.code && e.code <= "KeyZ") {
            // Handle letter input
            if (col < width) {
                let currTile = document.getElementById(row.toString() + '-' + col.toString());
                if (currTile.innerText == "") {
                    currTile.innerText = e.code[3].toUpperCase();
                    col += 1;
                }
            }
        } else if (e.code == "Backspace") {
            // Handle backspace input
            if (0 < col && col <= width) {
                col -= 1;
            }
            let currTile = document.getElementById(row.toString() + '-' + col.toString());
            currTile.innerText = "";
        } else if (e.code == "Enter") {
            // Handle enter input
            if (col < width) {
                alert("Please finish the word before pressing Enter.");
            } else {
                update(); // Update game board and check for game over condition
                row += 1;
                col = 0;
            }
        }

        if (!gameOver && row == height) {
            // Check for game over condition at end of game board
            gameOver = true;
            document.getElementById("answer").innerText = "You missed the word " + word + " and lost!";
            // Change background color to red
            document.getElementById("answer").style.backgroundColor = "red";

            // Set position of message above footer
            var footer = document.getElementsByTagName("footer")[0];
            var answer = document.getElementById("answer");
            answer.style.position = "absolute";
            answer.style.bottom = footer.offsetHeight + "px";
            answer.style.left = "0";
            answer.style.right = "0";
            answer.style.height = "50px";
            answer.style.lineHeight = "50px";


        }
    });

    const startOverButton = document.getElementById("start-over-button");
    startOverButton.addEventListener("click", async () => {
        // Clear the message text content
        document.getElementById("message").textContent = "";
        document.getElementById("message").style.backgroundColor = "";
        document.getElementById("congrats").style.display = "none";



        document.getElementById("answer").innerText = "";
        document.getElementById("answer").style.backgroundColor = "initial";

        answer.style.position = "initial";
        answer.style.bottom = "auto";
        answer.style.left = "auto";
        answer.style.right = "auto";


        startOverButton.disabled = true;
        startOverButton.innerText = "Loading...";

        await getRandomWord();

        hintDisplay.style.display = "none";
        const infoIcon = document.getElementById("info-icon");
        const infoText = document.getElementById("info-text");
        const gameContainer = document.querySelector(".game-container");

        const infoContainer = document.querySelector(".info-container");

        infoIcon.addEventListener("click", function() {
            if (infoContainer.style.display === "none") {
                infoContainer.style.display = "block";
                infoText.style.display = "block";
                gameContainer.style.width = "50%";
                startOverButton.style.margin = "0 auto";
                infoContainer.style.width = "50%";
                infoContainer.style.display = "flex";
                infoContainer.style.justifyContent = "flex-end";
            } else {
                infoContainer.style.display = "none";
                infoText.style.display = "none";
                gameContainer.style.width = "100%";
                startOverButton.style.margin = "0";
            }
        });
        gameOver = false;
        row = 0;
        col = 0;

        document.querySelectorAll(".tile").forEach((tile) => {
            tile.innerText = "";
            tile.classList.remove("present", "absent", "correct");
        });

        // hide congratulations gif
        document.getElementById("congrats").style.display = "none";
    });
}



function update() {
    let correct = 0; // Keep track of the number of correctly placed letters
    let userWord = ""; // Keep track of the user's word so far

    // Check each tile in the current row
    for (let c = 0; c < width; c++) {
        let currTile = document.getElementById(row.toString() + "-" + c.toString());
        let letter = currTile.innerText.toUpperCase();
        userWord += letter;

        // Check if the letter is in the correct position
        if (word && word.length > c && word[c] == letter) {
            currTile.classList.add("correct"); // Mark the tile as correct
            correct++; // Increment the number of correct letters
        }
        // Check if the letter is in the word but in the wrong position
        else if (word && word.includes(letter)) {
            currTile.classList.add("present"); // Mark the tile as present but in the wrong position
        }
        // If the letter is not in the word, mark it as absent
        else {
            currTile.classList.add("absent"); // Mark the tile as absent from the word
        }

        // If all letters are in the correct position, game is over
        if (correct == width) {
            gameOver = true; // Set the game to be over
        }
    }

    // If the user's guess matches the word, game is over
    if (userWord === word) {
        gameOver = true; // Set the game to be over
        document.getElementById("congrats").style.display = "block";

        document.getElementById("message").textContent = "You guessed the word " + word + " correctly!";
        document.getElementById("message").style.backgroundColor = "green";
        document.getElementById("message").style.height = "70px";
        document.getElementById("message").style.fontSize = "18px";
        document.getElementById("message").style.marginTop = "80px";
    }

}