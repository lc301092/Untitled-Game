//agent.function => wanted result

//Returns bool, draw or not?
function isBiggerThanOrEqual(number, threshold) {
    return number >= threshold ? true : false;
}
function isBiggerThan(number, threshold) {
    return number > threshold ? true : false;
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
}


let NPC = {
    name: 'NPC',
    drawPile: [],
    discardPile: [],
    SetupDeck: SetupDeck,
    behaviour: 'standard',
    TakeTurn: NPCTurn,
    Stand: Stand,
    Draw: DrawCard,
    PrintState: PrintState,
    cardSum: 0
}

