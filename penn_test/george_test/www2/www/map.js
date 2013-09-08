//***IMPORTANT!! call remove() to kill everything when done with the map to ensure that memory doesn't get destroyed

var MAX_MARKERS = 9
var locationList = []
var layer = L.layerGroup(locationList)
var myLayer;

var lat = 0;
var lon = 0;

var map;

function post(){	
    if (navigator.geolocation){
		navigator.geolocation.getCurrentPosition(showPosition, error);
    }
 }

 function showPosition(position, cb)
{
	lat = position.coords.latitude;
	lon = position.coords.longitude;
	init();
}

function error()
{
	lat = 0;
	lon = 0;

}

var myIcon = L.icon({
	iconUrl: 'files/my-icon.png',
	shadowUrl: 'files/marker-shadow.png',

	iconSize: 		[25,39],
	shadowSize: 	[41,41],
	iconAnchor: 	[13, 38],
	shadowAnchor: 	[11, 41],
	popupAnchor: 	[-2, -40]
});

function init() {
         map = new L.Map('map');                       
         console.log("lat: " + lat + " long: " + lon)       
         // add marker
         var myPoint = L.marker([lat, lon], {icon: myIcon}).bindPopup('ME!');
         myLayer = L.layerGroup([myPoint]);
         map.addLayer(myLayer);

      	 L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
         }).addTo(map);
         map.attributionControl.setPrefix(''); // Don't show the 'Powered by Leaflet' text.

         //var london = new L.LatLng(51.505, -0.09); 
         map.setView([lat,lon], 13);
         var messagesRef = new Firebase('https://studywithme.firebaseio.com/messages');	
		// Add a callback that is triggered for each chat message.
		messagesRef.limit(10).on('child_added', function (snapshot) {		
			var message = snapshot.val();
			console.log(message.lon + " " + message.lat);
			if (message.lon == 0 && message.lat == 0) {
				console.log("[map] ignore (0,0)");
				return;
			}
			var point = L.marker([message.lat, message.lon]).bindPopup("POOOOP");
			if (locationList.length > MAX_MARKERS) {
				console.log('before: ' + locationList.length);
				locationList.shift();
				console.log('after: ' + locationList.length);
			}
			locationList.push(point);
			console.log(locationList.length);
			
			map.removeLayer(layer);
			layer = L.layerGroup(locationList);
			map.addLayer(layer);
			//map.removeLayer(layer);
			// console.log('length: ' + locationList.length);
			// if (locationList.length > 3) {
			// 	console.log("asdfadsf");
			// 	map.removeLayer(layer);	
			// }
		});
}


function refresh() {
	var messagesRef = new Firebase('https://studywithme.firebaseio.com/messages');	
	// Add a callback that is triggered for each chat message.
	messagesRef.limit(MAX_MARKERS).on('child_added', function (snapshot) {		
		var message = snapshot.val();
		console.log(message.lon + " " + message.lat);
		var point = L.marker([message.lat, message.lon]).bindPopup(snapshot.val());
		locationList.push(point);
		console.log(locationList.length);
		var layer = L.layerGroup(locationList);
		map.addLayer(layer);
	});
}

function recentering(){
	console.log("recentering...")
	if (navigator.geolocation){
		navigator.geolocation.getCurrentPosition(recenterPosition, error);
    }
    return false;
}

function recenterPosition(position, cb)
{
	lat = position.coords.latitude;
	lon = position.coords.longitude;
	map.setView([lat,lon], 13, {pan: {animate: true}});
	map.removeLayer(myLayer);

	var myPoint = L.marker([lat, lon], {icon: myIcon}).bindPopup('ME!');
    myLayer = L.layerGroup([myPoint]);
    map.addLayer(myLayer);
}

function test() {
	var a = [1,2,3];
	a.pop();
	console.log(a);
	a = [1,2,3];
	a.shift();
	console.log(a);
	a.push(4);
	console.log(a);
	a.shift();
	a.push(5);
	console.log(a);
}