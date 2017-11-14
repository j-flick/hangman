// Create word constructor.
var word = function(w) {
	// Create property for the current word.
	this.word = w;

	// Function to split the word into an array for comparison.
	this.splitWord = function() {
		// Return the array to be used in the letter module.
		return this.word.split("");
	}
}

module.exports = word;