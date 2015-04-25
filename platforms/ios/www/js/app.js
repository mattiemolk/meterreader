

var markperHour;
  var markperDay;
  var markperMonth;

var diffperHour;
  var diffperDay;
  var diffperMonth;
 
var costperHour;
  var costperDay;
  var costperMonth;
  
  var prevcostperHour;
  var prevcostperDay;
 var prevcostperMonth;
  
  
  var marked = false;
  
  $(document).ready(function(){ 
  //var marked = false;
  prevcostperHour = 0;
  prevcostperDay = 0;
 prevcostperMonth = 0;
 
	var options = {
  useEasing : true, 
  useGrouping : true, 
  separator : ',', 
  decimal : '.',
  prefix : '<small>$</small>',
  suffix : '' 
}

 // Get a reference to our posts
var ref = new Firebase("https://meterreader.firebaseio.com/records");
// Attach an asynchronous callback to read the data at our posts reference
// Retrieve new posts as they are added to Firebase
ref.endAt().limitToLast(1).on("child_added", function(snapshot) {
  var newPost = snapshot.val();
  console.log(newPost);
  //var result = newPost.costPerDay;
  //document.getElementById("myDiv").innerHTML = result;
  costperHour = newPost.costPerHour;
  costperDay = newPost.costPerDay;
  costperMonth = costperDay * 30;
  
       
var resultperHour = new countUp("mainHr", prevcostperHour, costperHour, 2, 2.5, {
  useEasing : true, 
  useGrouping : true, 
  separator : ',', 
  decimal : '.',
  prefix : '<small>$</small>',
  suffix : '' 
});
resultperHour.start();
var resultperDay = new countUp("mainDay", prevcostperDay, costperDay, 2, 2.5, {
  useEasing : true, 
  useGrouping : true, 
  separator : ',', 
  decimal : '.',
  prefix : '<small>$</small>',
  suffix : '' 
});
resultperDay.start();
var resultperMonth = new countUp("mainMonth", prevcostperMonth, costperMonth, 2, 2.5, {
  useEasing : true, 
  useGrouping : true, 
  separator : ',', 
  decimal : '.',
  prefix : '<small>$</small>',
  suffix : '' 
});
resultperMonth.start();

if(marked == true) {
	diffperHour = markperHour - costperHour;
  	diffperDay = markperDay - costperDay;
  	diffperMonth = markperMonth - costperMonth;
	if(diffperDay > 0) {
		var delta = '<span class="glyphicon glyphicon-chevron-down text-success"></span>';
		var textclass = 'normal';
	} else {
		var delta = '<span class="glyphicon glyphicon-chevron-up text-danger"></span>';
		var textclass = 'normal';
	}
	//document.getElementById("diffDay").innerHTML = "<small>$</small><span class='text-"+textclass+"'>"+Math.abs(diffperDay.toFixed(2)) + "</span>" + delta;
	
    //document.getElementById("diffHr").innerHTML = "<small>$</small><span class='text-"+textclass+"'>"+Math.abs(diffperHour.toFixed(2)) + "</span>" + delta;
    //document.getElementById("diffMonth").innerHTML = "<small>$</small><span class='text-"+textclass+"'>"+Math.abs(diffperMonth.toFixed(2)) + "</span>" + delta;
	
	options = {
  useEasing : true, 
  useGrouping : true, 
  separator : ',', 
  decimal : '.',
  prefix : '<small>$</small>',
  suffix : delta
}

diffperHour2 = Math.abs(diffperHour);
diffperDay2 = Math.abs(diffperDay);
diffperMonth2 = Math.abs(diffperMonth);

prevcostperHour = costperHour;
  prevcostperDay = costperDay;
  prevcostperMonth = costperMonth;
  
	var diffresultperHour = new countUp("diffHr", prevcostperHour, diffperHour2, 2, 2.5, options);
diffresultperHour.start();
var diffresultperDay = new countUp("diffDay", prevcostperDay, diffperDay2, 2, 2.5, options);
diffresultperDay.start();
var diffresultperMonth = new countUp("diffMonth", prevcostperMonth, diffperMonth2, 2, 2.5, options);
diffresultperMonth.start();

}

});


$( ".Mark" ).hide();
$( ".Diff" ).hide();

});

  
var getMark = function() {
    markperHour = costperHour;
	markperDay = costperDay;
	markperMonth = costperMonth;
	document.getElementById("markDay").innerHTML = "<small>$</small>"+markperDay.toFixed(2);
    document.getElementById("markHr").innerHTML = "<small>$</small>"+markperHour.toFixed(2);
    document.getElementById("markMonth").innerHTML = "<small>$</small>"+markperMonth.toFixed(2);

  diffperHour = markperHour - costperHour;
  	diffperDay = markperDay - costperDay;
  	diffperMonth = markperMonth - costperMonth;
	if(diffperDay > 0) {
		var delta = '<span class="glyphicon glyphicon-chevron-down text-success"></span>';
		var textclass = 'normal';
	} 
	if(diffperDay < 0) {
		var delta = '<span class="glyphicon glyphicon-chevron-up text-danger"></span>';
		var textclass = 'normal';
	}
	if(diffperDay == 0) {
		var delta = '';
		var textclass = 'normal';
	}
	document.getElementById("diffDay").innerHTML = "<small>$</small><span class='text-"+textclass+"'>"+Math.abs(diffperDay.toFixed(2)) + "</span>" + delta;
	
    document.getElementById("diffHr").innerHTML = "<small>$</small><span class='text-"+textclass+"'>"+Math.abs(diffperHour.toFixed(2)) + "</span>" + delta;
    document.getElementById("diffMonth").innerHTML = "<small>$</small><span class='text-"+textclass+"'>"+Math.abs(diffperMonth.toFixed(2)) + "</span>" + delta;

};

$("#Marker").click(function(){
	$( ".Mark" ).slideDown(300);
	$( ".Diff" ).slideDown(600);
	getMark();
	marked = true;
	
  
});