var queryresults = null;
var stream = 0;
var test_num = 0;



function onload(){
	var $_GET = null;
	var searchEl = document.getElementById("search_text");
	$_GET = {},
	args = location.search.substr(1).split(/&/);
	for (var i=0; i<args.length; ++i) {
		var tmp = args[i].split(/=/);
		if (tmp[0] != "") {
			$_GET[decodeURIComponent(tmp[0])] = decodeURIComponent(tmp.slice(1).join("").replace(/\+/g, " "));
		}
	}
	searchEl.value = $_GET.q + "";
	queryresults = eval('(' + localStorage.results + ')');
	index = $_GET.i;
	
	document.getElementById("entity_title").innerHTML =  queryresults[index].name;
	document.getElementById("entity_id").innerHTML =  ""+ queryresults[index].id +"<br>";
	document.getElementById("entity_address").innerHTML = queryresults[index].address + "<br> " 
	+ queryresults[index].city + ", " + queryresults[index].state + "<br>" 
	+ '<abbr title = "Phone">P: </abbr>'+ queryresults[index].phone + "<br>" + '<abbr title = "Website">Web: </abbr> <a href="' + queryresults[index].website + '">'+ queryresults[index].website +"</a>";
	document.getElementById("entity_link").innerHTML =  "<a href='http://www.bing.com/local/details.aspx?lid="+queryresults[index].id+"'>Bing Local link</a> | <a href='http://localsearch/LocalProbe/Home/Link?&Pipelines=LocalDataPipeline&Environment=gdp-prod&Market=en-us&QueryType=YPID&SearchTerm="+queryresults[index].id+"'>Local Probe link</a>";
	if (index != 9){
		document.getElementById("publish_bar").className += " bar-success";
		document.getElementById("status").className += "text-success";
		document.getElementById("status").innerHTML += "Sucessfully Published to Bing";
	
	}
	else{
		document.getElementById("publish_bar").className += " bar-danger";
		document.getElementById("status").className += "text-error";
		document.getElementById("status").innerHTML += "Failed to Publish to Bing ";
		// Sorry about all the spaces. I was rushed on time :(
		document.getElementById("message").innerHTML += "<span id = 'etitle'>Reason:</span> Dropped during Address Normalizer Job <br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Entity does not have addressline info";
	}
	getMap();
	LoadSearchModule();
	addResults();
	addVersioningTable();
	addfeedTable();
	addcode("xml/test.xml");
	test_num = 0;
	document.getElementById("entitiy_tracking").innerHTML =  "<iframe width ='850px' height='600' frameBorder='0' src='http://localsearch/LocalProbe/Home/Link?&Pipelines=LocalDataPipeline&Environment=gdp-prod&Market=en-us&QueryType=YPID&SearchTerm="+queryresults[index].id+"#mainbody'></iframe>";
	
	document.getElementById("corrections").innerHTML =  "<iframe width ='1100px' height='600' frameBorder='0' src='http://www.bing.com/local/reportproblem?lid="+queryresults[index].id+"#sw_content'></iframe>";
	$(function(){
	   $().timelinr({
	   	startAt: 3
	   	});
	});
}

function addResults(){
	var table = document.getElementById("results_table_tab1");
	var tbody = document.createElement("tbody");
	for (var key in queryresults[index]) {
		if (queryresults[index].hasOwnProperty(key)) {
			var row = document.createElement("tr");
			var cell1=row.insertCell(0);
			var cell2=row.insertCell(1);
			var cell3=row.insertCell(2);
			var cell4=row.insertCell(3);
			cell1.innerHTML="local."+key;
			cell2.innerHTML=''+ queryresults[index][key];
			cell3.innerHTML='FixTheWorld';
			if (index == 9){
				cell4.innerHTML= "-";
			}
			else{
				cell4.innerHTML="7/28/2013 5:40:03 PM";
			}
			tbody.appendChild(row);
		}
		table.appendChild(tbody);
	}
}

function getMap()
{
	counter = 1;
	map = new Microsoft.Maps.Map(document.getElementById('detailMapDiv'), 
		{credentials: 'AlQHxjNwGcfBHl0_ew3HPKz9RjggG8siFFHljTeAzg2v5Fx607x8-qEgjpGeTSMw', 
		enableSearchLogo: false, 
		showMapTypeSelector:false,
		showScalebar:false,
		showDashboard: false});
}
function createSearchManager() 
{
	map.addComponent('searchManager', new Microsoft.Maps.Search.SearchManager(map)); 
	searchManager = map.getComponent('searchManager'); 
}
function LoadSearchModule()
{
	Microsoft.Maps.loadModule('Microsoft.Maps.Search', { callback: geocodeRequest })
}


function geocodeRequest() 
{ 
	createSearchManager(); 
	var where = queryresults[index].address + " " + queryresults[index].city + " " + queryresults[index].state; 
	var userData = { name: 'Maps Test User', id: 'XYZ' }; 
	var request = 
	{ 
		where: where, 
		count: 5, 
		bounds: map.getBounds(), 
		callback: onGeocodeSuccess, 
		errorCallback: onGeocodeFailed, 
		userData: userData 
	}; 
	searchManager.geocode(request); 
} 
function onGeocodeSuccess(result, userData) 
{ 
	if (result) { 
		map.entities.clear(); 
		var topResult = result.results && result.results[0]; 
		if (topResult) { 
			var pushpin = new Microsoft.Maps.Pushpin(topResult.location, null); 
			map.setView({ center: topResult.location, zoom: 10 }); 
			map.entities.push(pushpin); 
		} 
	} 
} 
function onGeocodeFailed(result, userData) { 
	alert('Geocode failed'); 
} 

function addcode(stream){
	var t4 = document.getElementById("xml_code")
	t4.innerHTML = "";
	var c = document.createElement("pre");
	$.get(stream, function(data) {
		$(c).text(data).html();
	});
	c.style.whiteSpace = "pre-line";
	t4.appendChild(c);
}

function xml_show(xmlstreamname){
	document.getElementById("p_label").innerHTML = xmlstreamname;
	if(test_num == 0){
		addcode("xml/test1.xml");
		test_num = 1;
	}
	else{
		addcode("xml/test.xml");
		test_num = 0;

	}
}
/*
function addVersioningTable(){
	var table = document.getElementById("results_table_tab2-1");
	var thead = document.createElement("thead");
	var row1 = document.createElement("tr");
	var h1=row1.insertCell(0);
	h1.innerHTML= "Date";
	row1.className += "info";

	var tbody = document.createElement("tbody");
	var row2 = document.createElement("tr");
	var h2=row2.insertCell(0);
	h2.innerHTML= "<b>7/28/2013 5:40:03 PM</b>";
//	row2.className += "info";
	var row3 = document.createElement("tr");
	var h3=row3.insertCell(0);
	h3.innerHTML= "<a href = '#'>7/13/2013 5:10:08 PM</a>";
	var row4 = document.createElement("tr");
	var h4=row4.insertCell(0);
	h4.innerHTML= "<a href = '#'>2/18/2013 4:12:02 PM</a>";
	var row5 = document.createElement("tr");
	var h5=row5.insertCell(0);
	h5.innerHTML= "<a href = '#'>12/09/2012 6:48:28 PM</a>"
	var row = -2;
	for (var key in queryresults[index]) {
		if (queryresults[index][key] != "" && queryresults[index][key] != null){
			row = row + 1;
			if (queryresults[index].hasOwnProperty(key)) {
				if (row > 0){
					var rearrange = Math.floor(Math.random()* 8 +1);
					var cell1=row1.insertCell(row);
					var cell2=row2.insertCell(row);
					cell2.innerHTML= queryresults[index][key];
					var cell3=row3.insertCell(row);  
					cell3.innerHTML= queryresults[index][key];
					var cell4=row4.insertCell(row);
					cell4.innerHTML= queryresults[index][key];
					var cell5=row5.insertCell(row);
					cell5.innerHTML= queryresults[index][key];
					if (row % 6 == 1 && row != 1){
						cell4.style.backgroundColor = "#eed3d7"; 
						cell5.style.backgroundColor = "#eed3d7"; 
						cell4.innerHTML += "/deals"; 
						cell5.innerHTML += "/deals"; 
					}

					else if (row %6 == 5){
						cell3.style.backgroundColor = "#eed3d7";
						cell4.style.backgroundColor = "#eed3d7"; 
						cell5.style.backgroundColor = "#eed3d7"; 
						cell3.innerHTML = "(816) 235-8596";
						cell4.innerHTML = "(816) 235-8596";
						cell5.innerHTML = "(816) 235-8596";
					}

					else if (row %6 == 3 && row != 3){
						cell5.style.backgroundColor = "#eed3d7"; 
						cell5.innerHTML += rearrange;

					}
					cell1.innerHTML= "local."+key;
				}
			}
		}
	}
	thead.appendChild(row1);
	tbody.appendChild(row2);
	tbody.appendChild(row3);
	tbody.appendChild(row4);
	tbody.appendChild(row5);
	table.appendChild(thead);
	table.appendChild(tbody);
}
*/

function addVersioningTable(){
	var table = document.getElementById("results_table_tab2-1a");
	var table1 = document.getElementById("results_table_tab2-1b");
	var table2 = document.getElementById("results_table_tab2-1c");
	var tbody = document.createElement("tbody");
	for (var key in queryresults[index]) {
		if (queryresults[index].hasOwnProperty(key)) {
			var row = document.createElement("tr");
			var cell1=row.insertCell(0);
			var cell2=row.insertCell(1);
			var cell3=row.insertCell(2);
			var cell4=row.insertCell(3);
			cell1.innerHTML="local."+key;
			cell2.innerHTML=''+ queryresults[index][key];
			cell3.innerHTML='FixTheWorld';
			if (index == 9){
				cell4.innerHTML= "-";
			}
			else{
				cell4.innerHTML="7/28/2013 5:40:03 PM";
			}
			tbody.appendChild(row);
		}
	}
	table.appendChild(tbody.cloneNode(true));
	table1.appendChild(tbody.cloneNode(true));
	table2.appendChild(tbody.cloneNode(true));
}


function addfeedTable(){
	var table = document.getElementById("results_table_tab1-2");
	var thead = document.createElement("thead");
	var row1 = document.createElement("tr");
	var h1=row1.insertCell(0);
	h1.innerHTML= "Feed";

	var tbody = document.createElement("tbody");
	var row2 = document.createElement("tr");
	var h2=row2.insertCell(0);
	h2.innerHTML= "<b>Published Entity</b>";
	row2.className += "info";
	row2.id += "Published";
	var row3 = document.createElement("tr");
	var h3=row3.insertCell(0);
	h3.innerHTML= "<b>FixTheWorld</b>";
	row3.id += "FixTheWorld";
	var row4 = document.createElement("tr");
	var h4=row4.insertCell(0);
	h4.innerHTML= "<b>Panos</b>";
	row4.id += "Panos";
	var row5 = document.createElement("tr");
	var h5=row5.insertCell(0);
	h5.innerHTML= "<b>Yelp</b>";
	row5.id += "Yelp";
	var row = -2;
	for (var key in queryresults[index]) {
		if (queryresults[index][key] != "" && queryresults[index][key] != null){
			row = row + 1;
			if (queryresults[index].hasOwnProperty(key)) {
				if (row > 0){
					var rearrange = Math.floor(Math.random()* 8 +1);
					var cell1=row1.insertCell(row);
					var cell2=row2.insertCell(row);
					cell2.innerHTML= queryresults[index][key];
					var cell3=row3.insertCell(row);  
					cell3.innerHTML= queryresults[index][key];
					var cell4=row4.insertCell(row);
					cell4.innerHTML= queryresults[index][key];
					var cell5=row5.insertCell(row);
					cell5.innerHTML= queryresults[index][key];
					switch (rearrange){
					case 1:
						cell4.style.backgroundColor = "#dff0d8"; 
						cell5.innerHTML = cell5.innerHTML.toLowerCase(); 
						cell3.innerHTML = cell3.innerHTML.toLowerCase(); 
						cell1.innerHTML= "<a href= '#results_table_tab1-2' onclick='changeFeed("+'"Panos"'+")'>local."+key+"</a>";
						break; 
					case 2:
						cell5.style.backgroundColor = "#dff0d8"; 
						cell3.innerHTML = cell3.innerHTML.toLowerCase(); 
						cell4.innerHTML = cell4.innerHTML.toLowerCase(); 
						cell1.innerHTML= "<a href= '#results_table_tab1-2' onclick='changeFeed("+'"Yelp"'+")'>local."+key+"</a>";
						break;
					default:
						cell3.style.backgroundColor = "#dff0d8"; 
						cell5.innerHTML = cell5.innerHTML.toLowerCase(); 
						cell4.innerHTML = cell4.innerHTML.toLowerCase(); 
						cell1.innerHTML= "<a href= '#results_table_tab1-2' onclick='changeFeed("+'"FixTheWorld"'+")'>local."+key+"</a>";
					}
				}
			}
		}
	}
	thead.appendChild(row1);
	tbody.appendChild(row2);
	tbody.appendChild(row3);
	tbody.appendChild(row4);
	tbody.appendChild(row5);
	table.appendChild(thead);
	table.appendChild(tbody);
}

function changeFeed(rearrange){
	switch(rearrange){
		case "Yelp":
			var top = $("#Panos").get();
			$("#Panos").remove();
			$("#results_table_tab1-2").append(top);
			var bottom = $("#FixTheWorld").get();
			$("#FixTheWorld").remove();
			$("#results_table_tab1-2").append(bottom);
			break;
		case "FixTheWorld":
			var top = $("#Panos").get();
			$("#Panos").remove();
			$("#results_table_tab1-2").append(top);
			var bottom = $("#Yelp").get();
			$("#Yelp").remove();
			$("#results_table_tab1-2").append(bottom);
			break;
		default:
			var top = $("#Yelp").get();
			$("#Yelp").remove();
			$("#results_table_tab1-2").append(top);
			var bottom = $("#FixTheWorld").get();
			$("#FixTheWorld").remove();
			$("#results_table_tab1-2").append(bottom);
			break;	
	}
}
