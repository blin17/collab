$("#register").submit(function() {
	var fname = $("#fname").val();
	var lname = $("#lname").val();
	var email = $("#email").val();
	var password = $("#password").val();
	var confirm= $("#confirmPassword").val();

	if (password != confirm){
	  	console.log("passwords do not match")
  	}

	auth.createUser(email, password, function(error, user) {
        if (!error) {
            auth.login("password", {
	            email: email,
	            password: password,
	            rememberMe: true
            });
        }
        else{
            console.log(error);
        }
    });

    return false;
});