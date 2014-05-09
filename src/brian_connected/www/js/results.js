
var searchEl = null;
var defaultValue = null;
var counter = null;
var $_GET = null;
var map = null;
var searchManager = null;
var currInfobox = null;
var results = null;

function class_show(){
    var classes = ["CS1110", "CS2110", "CS2300", "CS3110", "CS3300", "CS4300", "CS4780", "CS4810", "CS5150"];
    document.getElementById("classes").style.display = "block";

    $('#classdrop').typeahead( {source:classes, items: 10});
    console.log("testing");
}
