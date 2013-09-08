$("#register").submit(function() {

	var name = $("#name").val();
	var email = $("#email").val();
	var password = $("#password").val();
	var confirm= $("#confirmPassword").val();

	//console.log('fname: ' + fname);

	if (name == '') {
		$("span").text("Please enter your name").show().fadeOut(1000);
		return false;
	}
	if (email == '') {
		$("span").text("Please enter your email").show().fadeOut(1000);	
		return false;
	}

	if (email.length > 5) {
		if (email.substring(email.length - 4, email.length) != ".edu"){
			$("span").text("Please enter a valid school email ending in .edu").show().fadeOut(1000);		
			return false;
		}
	}
	else {
		$("span").text("Please enter your email").show().fadeOut(1000);		
		return false;
	}
	if (password == '') {
		$("span").text("Please enter your password").show().fadeOut(1000);		
		return false;
	}
	if (password != confirm) {
		$("span").text("Passwords do not match").show().fadeOut(1000);	
		return false;
	}
  	
  	var chatRef = new Firebase('https://studywithme.firebaseio.com/');  	
  	var auth = new FirebaseSimpleLogin(chatRef, function(error, user) {
		if (error) {
		   	// an error occurred while attempting login
		   	console.log(error);
		   	return false;
		} else if (user) {
		  	// user authenticated with Firebase
		  	console.log('User ID: ' + user.id + ', Provider: ' + user.provider);
			return true;
		} else {
		  	// user is logged out
		}
	});
 
  	auth.createUser(email, password, function(error, user) {
        if (!error) {
        	console.log('Login successful - User Id: ' + user.id + ', Email: ' + user.email);
            auth.login("password", {
	            email: email,
	            password: password,
	            rememberMe: true
            });
            
            var tempId = 'users/' + user.id;
            chatRef.child(tempId).set({name:name, email:email, classes:[]});
            window.location.href = "class.html"
	        
        }
        else{
            console.log(error);
            if (error.code == "EMAIL_TAKEN") {
            	$("span").text("This e-mail is already taken").show().fadeOut(1000);
				return false;
            }
        }
    });
  	
  	
  	return false;
});
