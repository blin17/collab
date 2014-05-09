
var UID = 11; //userID 
var CID = 1; //classID
var text = $('#messageInput').val();
var time = getTime();var ref = new Firebase('https://studywithme.firebaseio.com');

var auth = new FirebaseSimpleLogin(ref, function(error, user) {
  if (error) {
    // an error occurred while attempting login
    console.log(error);
  } else if (user) {
    // user authenticated with Firebase
    console.log('User ID: ' + user.id + ', Provider: ' + user.provider);
  } else {
    // user is logged out
  }
});