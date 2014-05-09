
// Get a reference to the root of the chat data.
var messagesRef = new Firebase('https://studywithme.firebaseio.com/messages/');
var lat = 0;
var lon = 0;

function post(){
  debugger;
    if (navigator.geolocation){
		navigator.geolocation.getCurrentPosition(showPosition, error);
    }
 }

function update(){
  debugger;
	var UID = localStorage.getItem('userID'); //userID 
	var CID = localStorage.getItem('classID'); //classID
  var name = localStorage.getItem('name');
	var text = $('#messageInput').val();
	var time = getTime();
	messagesRef.push({userID:UID, classID: CID, lat:lat, lon:lon, text:text, time:time, name:name});
	$('#messageInput').val('');
}

function showPosition(position, cb)
{
	lat = position.coords.latitude;
	lon = position.coords.longitude;
	update();
}

function error()
{
  update();
}

function getTime(){
    var date = new Date();
    var hour = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();
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
      time = '' + hour + ':' + '0' + min + ':' + sec + half;
    }
    else
    {
      time = '' + hour + ':' + min + ':' + sec + half;
    }
	return time;
}

