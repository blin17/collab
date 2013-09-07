$("#login").submit(function() {
  var email = $("#email").val();
  var password = $("#password").val();
  var checkbox = $("#rememberCheckbox").val();
  auth.login("password", {
        email: email,
        password: password,
        rememberMe: checkbox
    });
  }); 