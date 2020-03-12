function SetupDeck() {
	// fill deck with cards;
	for (i = 0; i < DECK_SIZE; i++) {
		this.drawPile[i] = i % CARD_VARIANCE + 1;
	}
	// shuffle cards
	Shuffle(this.drawPile);
	console.log(this.name + ' shuffles his deck with ' + DECK_SIZE + ' cards');
}

function DrawCard() {
	if (this.drawPile == 0) {
		this.SetupDeck();
		this.discardPile = [];
	}
	let card = this.drawPile.pop();
	let nextValue = this.cardSum + card;

	this.discardPile.push(card);
	console.log('Drawing from pile');
	console.log('Card is: ' + card);

	if (nextValue == MAX_VALUE) {
		console.log('CRITICAL HIT WITH ' + nextValue + '!');
		this.Stand();
	} 
	if (nextValue > MAX_VALUE) {
		console.log("TOO HIGH!");
		// this does not work as intended 
		console.log(nextValue + ' IS ABOVE ' + MAX_VALUE + '!');
		nextValue =  nextValue - (MAX_VALUE - nextValue);
		// TODO: if that nextValue is still higher than opponent nextValue = opponent cardsSum - 1 
		// to ensure that exceeding 12 results in a loss.
		console.log(this.name + ' is set back to ' +  nextValue);
		this.Stand(); 
	} 
		this.cardSum = nextValue;
}

function PrintState() {
	console.log('------------------------------------');
	console.log('State of ' + this.name);
	console.log(this.drawPile.length +
		' cards in draw pile. ' + 
		' \n' +
		this.discardPile.length +
		' cards in discard pile: ' +
		this.discardPile +
		'\n' + 
		'status: ' +
		this.cardSum);
	console.log('------------------------------------');
	// there should also be a way to see the opponent's state;
}


function Stand() {
	console.log(this.name + ' chose to stand at: ' + this.cardSum);
	this.isStanding = true;
}

function PlayerTurn(){
	//Might do something in the future for players. AI also has a variant. 
	//(TakeTurn: func) in player objects.
}

