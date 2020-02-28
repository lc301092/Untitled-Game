const DECK_SIZE = 24;
const CARD_VARIANCE = 6;
const MAX_VALUE = 12;

let player = {
	name: 'LuJa',
	drawPile: [],
	discardPile: [],
	cardSum: 0,
	SetupDeck: SetupDeck,
	PrintState: PrintState,
	DrawCard: DrawCard,
	Stand: Stand,
    isStanding: false
};

let activeAgents = [player, NPC];

$(document).ready(function () {
	//console.log(player.name);
	// look at how many agents are in the game and setup
	for (let i = 0; i < activeAgents.length; i++){
		let agent = activeAgents[i];
		agent.SetupDeck();
		//console.log(activeAgents[i].name);
	}

	// player has three actions with corresponding event listeners

	// draw card
	$('#btn_draw').on('click', function () {
		if (player.drawPile == 0) {
			activeAgents[0].SetupDeck();
			activeAgents[0].DrawCard();
		} else {
			activeAgents[0].DrawCard();
		}
		activeAgents[0].PrintState();
		EndTurn(activeAgents[0]);

	});
	// stand 
	$('#btn_stand').on('click', function () {
		activeAgents[0].Stand();
		EndTurn(activeAgents[0]);
	});

	// look at the game state
	$('#btn_status').on('click', function () {
		activeAgents[0].PrintState();
	});



});

function EndTurn(agent) {
	console.log("##################### " + agent.name + " ends their turn #####################");

	while (activeAgents[0].isStanding && !activeAgents[1].isStanding){
		activeAgents[1].TakeTurn();
		if (activeAgents[1].isStanding) return;
	}

	//TODO: Implement game-state that tracks whose turn it is, so mecha hitler stops cheating.

	if (activeAgents[0].isStanding) {
		console.log("WINNER IS: " + FindWinner(activeAgents).name);
	}
	
}


function FindWinner(agentArray){
	return winner = agentArray[0].cardSum > agentArray[1].cardSum ? agentArray[0] : 
		agentArray[0].cardSum == agentArray[1].cardSum ? {name: "Tie."} : agentArray[1];
}