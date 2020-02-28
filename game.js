const DECK_SIZE = 24;
const CARD_VARIANCE = 6;
const MAX_VALUE = 12;
let player = {
	drawPile: [],
	discardPile: [],
	summationeValue: 0
};
$(document).ready(function () {

	// look at how many agents are in the game and setup
	setupDeck();
	
	// player has three actions with corresponding event listeners

	// draw card
	$('#btn_draw').on('click', function () {
		if (player.drawPile == 0) {
			setupDeck();
			drawCard();
		} else 
			drawCard();

		console.log("new value is: " + player.summationeValue)
	});
	// stand 
	$('#btn_stand').on('click', function () {
		console.log('you stand at: ' + player.summationeValue);
		newRound();
	});
	
	// look at the game state
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
	let card = player.drawPile.pop();
	let nextValue = player.summationeValue + card;
	
	player.discardPile.push(card);
	console.log('Drawing from pile');
	console.log("Card is: " + card);
	
	if (nextValue > MAX_VALUE) {
		console.log(nextValue + " IS ABOVE " + MAX_VALUE + "!");
		newRound();
	} else if (nextValue == MAX_VALUE){	
		console.log("CRITICAL HIT WITH " + MAX_VALUE + "!");
		newRound();
	} else
		player.summationeValue = nextValue;
}

function printState() {
	console.log("------------------------------------");
	console.log(player.drawPile.length + " cards in draw pile. \n" + player.discardPile.length + " cards in discard pile: " + player.discardPile +'\n'+"status: " + player.summationeValue);
	console.log("------------------------------------");
	
	// there should also be a way to see the opponent's state;
}

function setupDeck() {
	// fill deck with cards;
	for (i = 0; i < DECK_SIZE; i++) {
		player.drawPile[i] = i % CARD_VARIANCE + 1;
	}
	// shuffle cards
	shuffle(player.drawPile);
	console.log('Pile shuffled with ' + DECK_SIZE + ' cards');

}

function newRound() {
	player.summationeValue = 0;
}
