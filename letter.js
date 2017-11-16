// Import the word.js module.
var word = require("./word");

// Create a word bank for game play.
var wordBank = ["cowboys", "falcons", "panthers", "packers", "eagles"];

// Get a random word from the word bank.
var randomWord = wordBank[Math.floor(Math.random() * wordBank.length)];

// Create a new word object from the word constructor using the random word.
var newWord = new word(randomWord);

// Split the word into an array of letters to compare the user's guess with.
var lettersToMatch = newWord.splitWord();

// Initialize an array of letters visible to the user.
var visibleLetters = [];

// Create a letter constructor to compare the user's guess with letters in the word.
var letter = function(l) {
	// Create property for the letter guessed.
	this.letter = l;

	this.displayBlanks = function() {
		// Create correct amount of blanks for the word.
		for (var i = 0; i < newWord.word.length; i++) {
			visibleLetters.push("_");
		}
	}

	this.compareLetters = function() {
		// Loop through the word searching for matches.
		for (var i = 0; i < newWord.word.length; i++) {
			// If there is a match, replace the appropriate blanks with the letter guessed.
			if (this.letter === lettersToMatch[i]) {
				visibleLetters[i] = visibleLetters[i].replace(visibleLetters[i], this.letter);
			}
		}
		// Display the matched letters to the user.
		console.log("\n" + visibleLetters.join(" ").toUpperCase());
	}
}

module.exports = {
	letter: letter,
	visibleLetters: visibleLetters
}