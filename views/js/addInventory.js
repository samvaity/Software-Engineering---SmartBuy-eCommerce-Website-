//window.onload=function(){
$(document).ready(function(){
var discountStartDate = document.getElementById('disStartDate');
var discountEndDate = document.getElementById('disEndDate');

	if(discountStartDate){
		discountStartDate.addEventListener('change', function() {
		    if (discountStartDate.value)
		        discountEndDate.min = discountStartDate.value;
		}, false);
	}
	if(discountEndDate){
		discountEndDate.addEventListener('change', function() {
		    if (discountEndDate.value)
		        discountStartDate.max = discountEndDate.value;
		}, false);
	}
	var categories = $("#categories").text();
	$("select").append(categories);

});