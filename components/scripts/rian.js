//require jQuery
var $ = require('jquery');

//rian adu script
$(function(){

	//show mobile Menu function
	$('#mobileMenuIcon').on('click', function(){
		$('#mobileDropDown').slideToggle();
	});

	//headerImage size
	var headerwHeight = function(){
		var height = $(window).height();
		$('header article').css('height', height);
	};
	
	headerwHeight();

	//show window width
	$(window).on('resize', function(){
		var width = $(window).width();
		$('.showSize').text(width);
		headerwHeight();
	});
});
