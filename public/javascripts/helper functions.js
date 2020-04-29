
function Shuffle(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}

function isBiggerThanOrEqual(number, threshold) {
	return number >= threshold ? true : false;
}

function isBiggerThan(number, threshold) {
	return number > threshold ? true : false;
}

//With a given string, makes this string ready for the server to receive it:
function MakeMessage(messageString, username) {
	//Maybe access username from localstorage when calling this?
	let currentRoom = localStorage.getItem(roomName);
	let messageObject = { message: messageString, identifyingHandle: username, roomName: currentRoom };

	return messageObject;
}


function storeGameResults(localAgent, resultString) {
	let currentStats = JSON.parse(localStorage.getItem("playerStats"));
	if (currentStats == null) {

		switch (resultString) {
			case "Tie.":
				currentStats = { name: localAgent.name, wins: 0, losses: 0, ties: 1 };
				break;
			case "Win.":
				currentStats = { name: localAgent.name, wins: 1, losses: 0, ties: 0 };
				break;
			case "Loss.":
				currentStats = { name: localAgent.name, wins: 0, losses: 1, ties: 0 };
				break;
		}

		localStorage.setItem("playerStats", JSON.stringify(currentStats));
		return;
	}

	switch (resultString) {
		case "Tie.":
			currentStats.ties += 1;
			break;
		case "Win.":
			currentStats.wins += 1;
			break;
		case "Loss.":
			currentStats.losses += 1;
			break;
	}
	localStorage.setItem("playerStats", JSON.stringify(currentStats));


}
