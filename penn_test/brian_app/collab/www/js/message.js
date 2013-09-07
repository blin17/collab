
// Get a reference to the root of the chat data.
var messagesRef = new Firebase('https://studywithme.firebaseio.com/');

function post(){

    var name = $('#nameInput').val();
    var text = $('#messageInput').val();
    var tempClass = $('#classInput').val();
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
    console.log(time);
    messagesRef.push({name:name, text:text, tempClass:tempClass, time:time});
    $('#messageInput').val('');	
}
