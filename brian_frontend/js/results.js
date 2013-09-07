
var searchEl = null;
var defaultValue = null;
var counter = null;
var $_GET = null;
var map = null;
var searchManager = null;
var currInfobox = null;
var results = null;

function onload(){
    mapE = document.getElementById('mapDiv');
    mapE.style.height = mapE.offsetWidth + "px";
    getMap(); 
    var searchEl = document.getElementById("search_text");
    var defaultValue = searchEl.value;
    results = new Array(0);

    $_GET = {},
    args = location.search.substr(1).split(/&/);
    for (var i=0; i<args.length; ++i) {
        var tmp = args[i].split(/=/);
        if (tmp[0] != "") {
            $_GET[decodeURIComponent(tmp[0])] = decodeURIComponent(tmp.slice(1).join("").replace(/\+/g, " "));
        }
    }
    searchEl.value = $_GET.q + "";
    LoadSearchModule();
}

function setResults(results1){
    if (results1.length < 10){
      var num = "About " + results1.length + " Results found";
  }
  else{
      var num = "About " + Math.floor((Math.random()*10)+41) + " Results found";
      document.getElementById("pagenum").style.display = 'block';
  }
  document.getElementById("num_results").innerHTML = num;

  var table =  document.getElementById("results_table");
  var table2 =  document.getElementById("results_table2");
  var tbody = document.createElement("tbody");
  var tbody2 = document.createElement("tbody");
  for (var i = 0; i < results1.length; i++){

    var row = document.createElement("tr");
    var cell1=row.insertCell(0);
    var cell2=row.insertCell(1);
    var cell3=row.insertCell(2);
    var cell4=row.insertCell(3);
    cell1.innerHTML=(i+1) + "";
    cell2.innerHTML='<a href = "detail.html?q='+$_GET.q+'&i='+i+'">' + results1[i].name +  "</a>";
    cell3.innerHTML="en-us";
    cell4.innerHTML=results1[i].address +  " " + results1[i].city + ", "+ results1[i].state + " " + results1[i].country + "";
    if (i < 10){
      tbody.appendChild(row);
  }
  else{
      tbody2.appendChild(row);
  }
}
table.appendChild(tbody);
table2.appendChild(tbody2);
localStorage.results = JSON.stringify(results1);
}


function checkValue() {
    if (searchEl.value == defaultValue) {
        searchEl.value = "";
    }          
}   

function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

function getMap()
{
    counter = 1;
    map = new Microsoft.Maps.Map(document.getElementById('mapDiv'), 
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
    Microsoft.Maps.loadModule('Microsoft.Maps.Search', { callback: searchRequest })
} 
function searchRequest() 
{ 
    createSearchManager(); 
    var userData = { name: 'Bing Local Probe User', id: 'XYZ' }; 
    var query = $_GET.q +""; 
    var request = 
    { 
        query: query, 
        count: 20, 
        startIndex: 0, 
        bounds: map.getBounds(), 
        callback: search_onSearchSuccess, 
        errorCallback: search_onSearchFailure, 
        userData: userData 
    }; 
    searchManager.search(request); 
} 
function search_onSearchSuccess(result, userData) 
{ 
    map.entities.clear(); 
    var searchResults = result && result.searchResults; 
    if (searchResults) { 
        for (var i = 0; i < searchResults.length; i++) { 
            search_createMapPin(searchResults[i]); 
        } 
        if (result.searchRegion && result.searchRegion.mapBounds) { 

            map.setView({ bounds: result.searchRegion.mapBounds.locationRect }); 
            setResults(results);
            document.getElementById("filters").style.display = 'block';
        } 
        else 
        { 
            alert('No results returned, Please try after sometime.'); 
        } 
    } 
} 
function search_createMapPin(result) 
{ 
    if (result) { 
        var offset = new Microsoft.Maps.Point(0, 5); 
        var pushpinOptions = { text : counter +"", visible: true, textOffset: offset}; 
        var pin = new Microsoft.Maps.Pushpin(result.location, pushpinOptions);  

        Microsoft.Maps.Events.addHandler(pin, 'click', function () { search_showInfoBox(result) }); 
        results.push(result);     
        if (counter < 11){
            map.entities.push(pin); 
        }
        counter = counter +1;
    } 
} 
function search_showInfoBox(result) 
{ 
    if (currInfobox) { 
        currInfobox.setOptions({ visible: true }); 
        map.entities.remove(currInfobox); 
    } 
    currInfobox = new Microsoft.Maps.Infobox( 
        result.location, 
        { 
            title: result.name, 
            description: [result.address, result.city, result.state, result.country, result.phone].join(' '), 
            showPointer: true, 
            titleAction: null, 
            titleClickHandler: null 
        }); 
    currInfobox.setOptions({ visible: true,width :150, height :100}); 
    map.entities.push(currInfobox); 
} 
function search_onSearchFailure(result, userData) 
{ 
    alert('Search failed'); 
} 

function attribute_show(attr){
    var attributes = [];
    for (var id in results) {
        attributes.push(results[id][attr.toLowerCase()]);
    }
    document.getElementById("drop5").innerHTML = "Filter by "+attr +"<b class='caret'></b>";
    document.getElementById("attribute").style.display = "block";

    $('#attdrop').typeahead( {source:attributes });
    $('#attdrop').attr("name", attr.toLowerCase());
    $('#attdrop').attr("placeholder", "Enter "+ attr.toLowerCase() + " here");
    $('#attdrop').value = "";
    $('#attdrop').keypress(function(event) {
        if (event.keyCode == 13) {
            browse();
        }
    });
}

function market_show(){
    var markets = ["ar-XA", "da-DK", "de-AT","de-AT","de-CH","de-DE","en-AU","en-CA","en-GB","en-IE","en-IN","en-NZ","en-PH","en-SG","en-US","en-WW","en-XA","es-AR"];
               /*     ,​"es-CL","es-ES","es-MX","es-US","es-XL","fi-FI","fr-BE","fr-CA","fr-CH","fr-FR","it-IT","ja-JP",
                    "ko-KR","nb-NO","nl-BE","nl-NL","pt-BR","pt-PT","ru-RU","sv-SE","zh-CN","zh-HK","zh-TW"];*/
    document.getElementById("market").style.display = "block";

    $('#marketdrop').typeahead( {source:markets, items: 10});
}

function browse(){
    var att_name = $('#attdrop').attr('name');
    var att_value = $('#attdrop').val();
    var attributes = [];
    if (att_value != ""){
        for (var id in results) {
            if (att_value == results[id][att_name]){
                attributes.push(results[id]);
            }
        }

        if (attributes) { 
            counter = 1;
            map.entities.clear(); 
            for (var i = 0; i < attributes.length; i++) { 
                search_createMapPin(attributes[i]); 
            } 
           $("#results_table > tbody").empty();
           $("#results_table2 > tbody").empty();
           setResults(attributes);
        } 
        else 
        { 
            alert('No results returned, Please try after sometime.'); 
        } 
    }
    else{   
        for (var i = 0; i < attributes.length; i++) { 
            search_createMapPin(results[i]); 
        } 
        map.entities.clear(); 
        $("#results_table > tbody").empty();
        $("#results_table2 > tbody").empty();
        setResults(results);
    }
}