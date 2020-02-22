const DECK_SIZE = 24;
const CARD_VARIANCE = 6; 
var drawPile = [];
var discardPile = [];
var summationValue = 0;

$(document).ready(function(){
	// fill deck with cards;
	for(i=0;i<DECK_SIZE;i++){
		drawPile[i] = i % CARD_VARIANCE + 1;
	}
	console.log(drawPile);
	// shuffle cards
	shuffle(drawPile);
	console.log(drawPile);
	console.log('Pile shuffled with 24 cards');
	
	$('#btn_draw').on('click',function(){
		drawCard();
		printState();
	});
	
});
var hej = {} ;
console.log(typeof []);
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function drawCard(){
	console.log('Drawing from pile');
	let card = drawPile.pop();
	discardPile.push(card);
	console.log("Card is: " + card );
	summationValue += card;
	
}

function printState(){
	console.log("Draw pile: " + drawPile.length);
	console.log("Discard pile: " + discardPile.length);
	console.log("status: " + summationValue)
}