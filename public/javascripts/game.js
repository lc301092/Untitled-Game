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
	isStanding: false,
	TakeTurn: PlayerTurn,
	state: "lobby",

};

let gameManager = {
	currentPlayersTurn: null,
	inactivePlayer: null,
	players: [],
	GiveTurn: GiveTurn
}

let activeAgents = [player, NPC]; //NPC defined in "AI.js"
gameManager.players = activeAgents;
gameManager.currentPlayersTurn = player;
gameManager.inactivePlayer = NPC;
console.log(gameManager);



function EndTurn(agent, _gameManager = gameManager) {
	console.log("##################### " + agent.name + " ends their turn #####################");
	_gameManager.GiveTurn(_gameManager.inactivePlayer);
}


function FindWinner(agentArray) {
	let winner = agentArray[0].cardSum > agentArray[1].cardSum ? agentArray[0] :
		agentArray[0].cardSum == agentArray[1].cardSum ? {
			name: "Tie."
		} : agentArray[1];
	console.log("WINNER IS: ");
	console.log(winner.name);

	let resultString = "";

	if (winner.name == "Tie.") {
		resultString = "Tie.";
	}
	if (winner == agentArray[0]) {
		resultString = "Win.";
	}
	if (winner == agentArray[1]) {
		resultString = "Losses.";
	}

	storeGameResults(agentArray[0], resultString);
}

function ResetStatus() {
	for (agent in activeAgents) {
		agent.cardSum = 0;
		agent.isStanding = false;
	}
}

function InitializePlayers(_gameManager) {
	for (let i = 0; i < activeAgents.length; i++) {
		let agent = activeAgents[i];
		agent.gameManager = _gameManager;
		agent.SetupDeck();
	}
	gameManager.players = activeAgents;
}

//GameManaging function - gives turn to a player, that then uses it for something.
function GiveTurn(agent) {
	if (!agent.isStanding) {
		this.inactivePlayer = this.currentPlayersTurn;
		this.currentPlayersTurn = agent;
		agent.TakeTurn();
		return;
	}

	// Both player are standing 
	if (this.currentPlayersTurn.isStanding) {
		FindWinner(activeAgents);
		ResetStatus();
		return;
	}

	this.currentPlayersTurn.TakeTurn(); //Currentplayer stays the same, and they take their turn.
}



// legacy listener for player events 
//$(document).ready(function () {
//	// look at how many agents are in the game and setup
//
//	if (player.state == "game")
//		InitializePlayers(gameManager);
//
//
//	//// player has three actions with corresponding event listeners
//	//	$('#btn_draw').on('click', function () {
//	//		activeAgents[0].DrawCard();
//	//		activeAgents[0].PrintState();
//	//		EndTurn(activeAgents[0], gameManager);
//	//
//	//	});
//	//	// stand 
//	//	$('#btn_stand').on('click', function () {
//	//		activeAgents[0].Stand();
//	//		EndTurn(activeAgents[0], gameManager);
//	//	});
//	//
//	//	// look at the game state
//	//	$('#btn_status').on('click', function () {
//	//		activeAgents[0].PrintState();
//	//	});
//
//});
