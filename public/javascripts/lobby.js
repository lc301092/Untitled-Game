$(document).ready(function () {

	initializeChatListeners();
	localStorage.setItem('state', 'lobby');

});


function initializeChatListeners() {
	console.log('chat is starting up...');
	let text;
	let $sendButton = $('#sendButton');
	let $commandInput = $('#m');
	console.log('chat is online');
	$sendButton.click(sendMessageToServer);

	$('#m').keypress(function (event) {
		if ($("#m").is(":focus") && event.which == 13)
			$sendButton.click();
	});

};
