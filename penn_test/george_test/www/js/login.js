var usersRef = new Firebase('https://studywithme.firebaseio.com/users/');

$("#login").submit(function() {
	var email = $("#email").val();
	var password = $("#password").val();
	console.log("email:" + email + " password:" + password);
	var success = 0;
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
		   $("span").text("Login Error").show().fadeOut(500);
		   return false;
		} else if (user) {
		  // user authenticated with Firebase
		  console.log('User ID: ' + user.id + ', Provider: ' + user.provider);
		  localStorage.setItem('userID', user.id);
			$("span").text("SUCCESS").show().fadeOut(500);		
			var userRef = usersRef.child(user.id).on('value', function(names) {
				localStorage.setItem('name', names.val().name);
				window.location.replace("displayClass.html");	
			});

		} else {
		  // user is logged out
		}
		return false;
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
	console.log("hello");
	if (success == 1){
		return true;
	}
	return false;
 });