let socket;
$(document).ready(function () {
	initializeChatListeners();
});


function initializeChatListeners() {
	console.log('socket chat is starting up...');
	socket = io();
	let text;
	let $sendButton = $('#sendButton');
	let $commandInput = $('#m');
	console.log('chat is online');
	localStorage.setItem('currentRoom', 'lobby');
	$sendButton.click(clientSocketHandler);

	$('#m').keypress(function (event) {
		if ($("#m").is(":focus") && event.which == 13)
			$sendButton.click();
	});

	// socket listners
	socket.on('chat message', function (msg) {
		console.log('what is this: ', msg);
		$('#messages').append($('<li>').text(msg));
	});
	socket.on('command error', function (msg) {
		$('#messages').append($('<li>').text(msg));
	});
	socket.on('change room', function (msg) {
		$('#m').val('');

		// TODO when we have response message
		// react to message from server 
		//let room = msg.newRoom;
		// let message = msg.messageBack;
		updateRoom(msg);

	});
};

function clientSocketHandler() {

	let user = JSON.parse(getCookie('activeUser'));
	if (user.username) {
		//Make message to emit to server:
		let message = MakeMessage($('#m').val(), user.username);
		socket.emit('chat message', message);
		$('#m').val('');
	}

}

function getCookie(cname) {
	var name = cname + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}
