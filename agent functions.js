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
	let card = this.drawPile.pop();
	let nextValue = this.cardSum + card;

	this.discardPile.push(card);
	console.log('Drawing from pile');
	console.log('Card is: ' + card);

	// this could be a helper funcertion
	if (nextValue > MAX_VALUE) {
		console.log(nextValue + ' IS ABOVE ' + MAX_VALUE + '!');
		this.cardSum = 0;
	} else if (nextValue == MAX_VALUE) {
		console.log('CRITICAL HIT WITH ' + MAX_VALUE + '!');
		this.cardSum = 0;
	} else
		this.cardSum = nextValue;
}

function PrintState() {
	console.log('------------------------------------');
	console.log('State of ' + this.name);
	console.log(this.drawPile.length +
		' cards in draw pile. \n' +
		this.discardPile.length +
		' cards in discard pile: ' +
		this.discardPile +
		'\n' + 'status: ' +
		this.cardSum);
	console.log('------------------------------------');
	// there should also be a way to see the opponent's state;
}


function Stand() {
	console.log(this.name + ' chose to stand at: ' + this.cardSum);
	this.isStanding = true;
}
