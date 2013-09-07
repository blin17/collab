$("#register").submit(function() {
  var email = $("#login-email").val();
  var password = $("#login-password").val();
  var checkbox = $("#rememberCheckbox").val();
  auth.login("password", {
        email: email,
        password: password,
        rememberMe: checkbox
    });
  }); 