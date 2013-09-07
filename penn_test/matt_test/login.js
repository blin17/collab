$("#login").submit(function() {
	console.log("login credentials submitted");
	var email = $("#email").val();
	var password = $("#password").val();
	auth.login("password", {
		email: email,
		password: password,
		rememberMe: true
	});
 });