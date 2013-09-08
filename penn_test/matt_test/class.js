/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
		console.log(parentElement);
        var listeningElement = parentElement.querySelector('.load_app');
        var receivedElement = parentElement.querySelector('.loaded_app');

//        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

// Get a reference to the root of the chat data.
var messagesRef = new Firebase('https://studywithme.firebaseio.com/messages');
var usersRef = new Firebase('https://studywithme.firebaseio.com/users/');

var messageId = localStorage.getItem('classId');
// Add a callback that is triggered for each chat message.
messagesRef.limit(10).on('child_added', function (snapshot) {
	var user_name = "";
	var message = snapshot.val();
	
	var userRef = usersRef.child(message.userID).on('value', function(names){
        if (messageId == message.classId){
    		user_name = names.val().name;

    	    $('<div/>').text(message.text).prepend($('<em/>')
    	      .text(user_name+' '+message.time+': ')).prependTo($('#messagesDiv'));
    	    $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
        }
	})

});	
	var chatRef = new Firebase('https://studywithme.firebaseio.com/');
	var auth = new FirebaseSimpleLogin(chatRef, function(error, user) {
	if (error) {
	   // an error occurred while attempting login
	   console.log(error);
	   $("span").text("Login Error").show().fadeOut(500);
	   return false;
	} else if (user) {
	alert(user.id);

	} else {
	  // user is logged out
	}
	return false;
});
