
// Get a reference to the root of the chat data.
var messagesRef = new Firebase('https://studywithme.firebaseio.com/messages/');
var MID = 0;
function post(){
    var UID = 11; //userID 
	var CID = 1; //classID
	var location = "Ithaca, NY";
    var text = $('#messageInput').val();
	var time = getTime();
    messagesRef.child(MID).set({userID:UID, classID: CID, location: location, text:text, time:time});
    $('#messageInput').val('');	
	MID += 1;
	console.log(MID);
}

function getTime(){
    var date = new Date();
    var hour = date.getHours();
    var min = date.getMinutes();
    var half = '';
    var time = '';
    if(hour < 12)
    {
      if(hour == 0)
      {
        hour = 12;
      }
        half = 'AM';
    }
    else
    {
      if(hour != 12)
      {
        hour = hour - 12;  
      }
      half = 'PM';
    }
    if(min < 10)
    {
      time = '' + hour + ':' + '0' + min + half;
    }
    else
    {
      time = '' + hour + ':' + min + half;
    }
	return time;
}

