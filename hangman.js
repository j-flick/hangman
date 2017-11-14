// Import the letter.js module.
var letter = require("./letter");
// Import the inquirer module to get input from the user.
var inquirer = require("inquirer");
// Initialize guesses to 10.
var guesses = 10;
// Initialize an array of letters the user has guessed.
var lettersGuessed = [];

function playGame(guesses) {
	// If the user has guesses remaining, keep playing!
	if (guesses !== 0) {
		inquirer
			// Get the user input.
			.prompt([
				{
					type: "input",
					message: "Guess a letter!",
					name: "letter"
				}
			])
			// Determine what we do once we have the input.
			.then(answers => {
				// Create a new letter object from the letter constructor.
				var newLetter = new letter(answers.letter.toLowerCase());

				// Ensure empty blanks are displayed if the first user guess is incorrect.
				if (guesses === 10) {
					newLetter.displayBlanks();
				}

				// Run the comparison method on the letter constructor.
				newLetter.compareLetters();

				// Add the user's guess to an array.
				lettersGuessed.push(answers.letter.toUpperCase());
				// Display user guesses.
				console.log(`\nLetters guessed: ${lettersGuessed.join(", ")}\n`);

				// Decrement guesses by 1 and call recursive playGame function.
				guesses--;
				playGame(guesses);
			})
		;
	}

	// Once guesses equal 0...
	else {
		inquirer
			// Ask if they want to play again.
			.prompt([
				{
					type: "confirm",
					message: "Do you want to play again?",
					name: "confirm"
				}
			])
			.then(answers => {
				// If they do, reset the game.
				if (answers.confirm) {
					guesses = 10;
					lettersGuessed = [];
					playGame(guesses);
				}
				// Otherwise, log a game over message.
				else {
					console.log("Well, alright... This was fun! See ya next time!");
				}
			})
		;
	}
}

// Start the game.
playGame(guesses);