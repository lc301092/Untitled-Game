//agent.function => wanted result
let NPC = {
    name: 'Mecha Hitler, our Friend, our Führer',
    drawPile: [],
    discardPile: [],
    SetupDeck: SetupDeck,
    behaviour: 'standard',
    TakeTurn: NPCTurn,
    Stand: Stand,
    Draw: DrawCard,
    PrintState: PrintState,
    cardSum: 0,
    isStanding: false,
    //_gameManager: "not yet initialized"
}

function NPCTurn() {
    let threshold;
    let willStand;
    switch (this.behaviour) {
        case "standard":
            threshold = 8;
            willStand = isBiggerThanOrEqual(this.cardSum, threshold);
            if (willStand) {
                this.Stand();
                break;
            }
            if (!willStand) {
                this.Draw();
                break;
            }
            break;
        case "aggressive":
            threshold = 10;
            willStand = isBiggerThanOrEqual(this.cardSum, threshold);
            if (willStand) {
                this.Stand();
                break;
            }
            if (!willStand) {
                this.Draw();
                break;
            }
            break;
        case "reckless":
            threshold = 12;
            willStand = isBiggerThanOrEqual(this.cardSum, threshold);
            if (willStand) {
                this.Stand();
                break;
            }
            if (!willStand) {
                this.Draw();
                break;
            }
            break;
        default:
            console.log("Something went horribly wrong creating this abomination of an NPC");
    }


    this.PrintState();

    EndTurn(this);
    
}




