$("#login").submit(function() {
	console.log("login credentials submitted");
	var email = $("#email").val();
	var password = $("#password").val();
	
	if (email == '') {
		$("span").text("Please enter your email").show().fadeOut(2000);
		return false;
	}

	if (password == '') {
		$("span").text("Please enter your password").show().fadeOut(2000);
		return false;
	}	

	var chatRef = new Firebase('https://studywithme.firebaseio.com/');  	
  	var auth = new FirebaseSimpleLogin(chatRef, function(error, user) {
		if (error) {
		   // an error occurred while attempting login
		   console.log(error);
		   $("span").text("Login Error").show().fadeOut(2000);
		   return false;
		} else if (user) {
		  // user authenticated with Firebase
		  console.log('User ID: ' + user.id + ', Provider: ' + user.provider);
			$("span").text("SUCCESS").show().fadeOut(2000);
		  return true;

		} else {
		  // user is logged out
		}
	});

	auth.login('password', {
		email: email,
		password: password,
		rememberMe: true 
	});
 	/*
 	var user = baseRef.child('users/10').on('value', function(snapshot){
                var classes = snapshot.val().classes;
                console.log(classes);
                if(classes.indexOf("CS3110") > -1)
                {
                    console.log("YESS IT WORKS");
                }
            });
            console.log(classes);            
        }

	return false;
	*/
	return false;
 });