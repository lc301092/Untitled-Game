$(document).ready(function () {
	$('#btn_register').click(function () {
		let user = $('#uname').val().trim();
		let password = $('#psw').val().trim();

		if (user == '' || password == '') {
			alert('please enter username and password');
			return;
		}

		$.ajax({
			type: 'POST',
			url: '/users/createUser',
			data: JSON.stringify({
				uname: user,
				psw: password
			}),
			contentType: 'application/json; charset=utf-8',
			dataType: 'json',
		}).done(function (data) {
			alert(data);
		}).fail(function (data) {
			alert('error', data);
		});


	})

})
