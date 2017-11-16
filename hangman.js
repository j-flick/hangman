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
				// Convert to upper case for display.
				var answer = answers.letter.toUpperCase();

				// If the letter has not been guessed yet...
				if (lettersGuessed.indexOf(answer) === -1) {
					// Create a new letter object from the letter constructor.
					var newLetter = new letter.letter(answers.letter);

					// Ensure empty blanks are displayed if the first user guess is incorrect.
					if (guesses === 10) {
						newLetter.displayBlanks();
					}

					// Run the comparison method on the letter constructor.
					newLetter.compareLetters();

					// If there are blanks remaining, add letter to letters guessed array and keep playing.
					if (letter.visibleLetters.indexOf("_") !== -1) {
						// Add the user's guess to an array.
						lettersGuessed.push(answer);
						// Display user guesses.
						console.log(`\nLetters guessed: ${lettersGuessed.join(", ")}\n`);

						// Decrement guesses by 1 and call recursive playGame function.
						guesses--;
						playGame(guesses);
					}
					// Otherwise, tell the user they got the answer and ask to play again.
					else {
						console.log("\nYou got it!\n");
						playAgain();
					}
				}
				// If the letter has been guessed...
				else {
					console.log(`\nYou already guessed '${answer}'. Please try again.\n`);
					playGame(guesses);
				}
			})
		;
	}

	// Once guesses equal 0, display game over message and ask to play again.
	else {
		console.log("Sorry, you're out of guesses.\n\n" +
					"I would tell you the answer, but that wouldn't be as much fun!\n\n" +
					"Game Over.\n");
		playAgain();
	}
}

// Start the game.
playGame(guesses);

function playAgain() {
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