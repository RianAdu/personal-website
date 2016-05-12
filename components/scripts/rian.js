var $ = require('jquery'); //get jQuery
var picturefill = require('picturefill'); //get responsive image polyfill

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

	//show window width
	$(window).on('resize', function(){
		var width = $(window).width();
		$('.showSize').text(width);
		headerwHeight();
	});

	/*var formValidation = function(){
		var name 	= $('#yourName').val();
		var email	= $('#yourEmail');
		var message = $('#yourMessage');

	};*/

	headerwHeight();
	// formValidation();
});
