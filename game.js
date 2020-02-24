const DECK_SIZE = 24;
const CARD_VARIANCE = 6;
const MAX_VALUE = 12;
var drawPile = [];
var discardPile = [];
var summationValue = 0;

$(document).ready(function () {

	setupDeck();
	// player has two actions with corresponding event listeners

	// draw card
	$('#btn_draw').on('click', function () {
		if (drawPile == 0){	
			setupDeck();
			drawCard();
		}
		else
			drawCard();

		console.log("new value is: " + summationValue)
	});
	// stand 
	$('#btn_stand').on('click', function () {
		console.log('you stand at: ' + summationValue);
		// compareResults()
		newRound();
	});
	$('#btn_status').on('click', function () {
		printState();
	});



});

function shuffle(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}

function drawCard() {
	console.log('Drawing from pile');
	let card = drawPile.pop();
	discardPile.push(card);
	console.log("Card is: " + card);
	if (summationValue + card > MAX_VALUE) {
		console.log("ABOVE " + MAX_VALUE + "!");
		newRound();
	} else
		summationValue += card;
}

function printState() {
	console.log("Draw pile: " + drawPile.length);
	console.log("Discard pile: " + discardPile.length);
	console.log("status: " + summationValue)
}

function setupDeck() {
	// fill deck with cards;
	for (i = 0; i < DECK_SIZE; i++) {
		drawPile[i] = i % CARD_VARIANCE + 1;
	}
	// shuffle cards
	shuffle(drawPile);
	console.log('Pile shuffled with ' + DECK_SIZE + ' cards');

}

function newRound() {
	summationValue = 0;
}
