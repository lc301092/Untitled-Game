
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

