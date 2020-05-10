const CARD_VARIANCE = 6;
// 4 sets of each whole number up to card variance starting at 1
const DECK_SIZE = CARD_VARIANCE * 4;
const MAX_VALUE = 12;
let hasGameStarted;
let drawPile = [];
let discardPile = [];
let activeAgents = [];


let player = {
	name: 'LuJa',
	cardSum: 0,
	PrintState: PrintState,
	DrawCard: DrawCard,
	Stand: Stand,
	isStanding: false,
	state: "lobby",
	TakeTurn: function () {
		console.log('It\'s your turn');
	}

};

let gameManager = {
	currentPlayersTurn: null,
	inactivePlayer: null,
	players: [],
	GiveTurn: GiveTurn
}

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
	for (i in activeAgents) {
		let agent = activeAgents[i];
		console.log('resetting status for ' + agent.name);
		agent.cardSum = 0;
		agent.isStanding = false;
	}
	console.log("READY FOR NOW ROUND");
}

function InitializePlayers(_gameManager) {
	for (let i = 0; i < activeAgents.length; i++) {
		let agent = activeAgents[i];
		agent.gameManager = _gameManager;
	}
	gameManager.players = activeAgents;
}

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

function initializeGame() {
	activeAgents = [player, NPC];
	gameManager.players = activeAgents;
	gameManager.currentPlayersTurn = player;
	gameManager.inactivePlayer = NPC;
	console.log(gameManager);
	InitializePlayers(gameManager);

	SetupDeck(drawPile);

	// player has three actions with corresponding event listeners
	$('#btn_draw').on('click', function () {
		activeAgents[0].DrawCard();
		activeAgents[0].PrintState();
		EndTurn(activeAgents[0], gameManager);

	});
	// stand 
	$('#btn_stand').on('click', function () {
		activeAgents[0].Stand();
		EndTurn(activeAgents[0], gameManager);
	});

	// look at the game state
	$('#btn_status').on('click', function () {
		activeAgents[0].PrintState();
	});
}
