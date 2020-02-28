const DECK_SIZE = 24;
const CARD_VARIANCE = 6;
const MAX_VALUE = 12;

let player = {
	name: 'HEJEJEJ',
	drawPile: [],
	discardPile: [],
	cardSum: 0,
	SetupDeck: SetupDeck,
	PrintState: PrintState,
	DrawCard: DrawCard,
	Stand: Stand,
	
	
};

let activeAgents = [player];

$(document).ready(function () {
	// look at how many agents are in the game and setup
	for(agent in activeAgents){
		agent.SetupDeck;
	}
	
	// player has three actions with corresponding event listeners

	// draw card
	$('#btn_draw').on('click', function () {
		if (player.drawPile == 0) {
			activeAgents[0].SetupDeck();
			activeAgents[0].DrawCard();
		} else 
			activeAgents[0].DrawCard();

		console.log('new value is: ' + activeAgents[0].cardSum)
	});
	// stand 
	$('#btn_stand').on('click', function () {
		activeAgents[0].Stand();
		
	});
	
	// look at the game state
	$('#btn_status').on('click', function () {
		activeAgents[0].PrintState();
	});



});

function EndTurn(){
	console.log('to be implemented');
}


