var $ = require('jquery'); //get jQuery
var picturefill = require('picturefill'); //get responsive image polyfill

//rian adu script
$(document).ready(function(){
	//show mobile Menu function
	$('#mobileMenuIcon').on('click', function(){
		$('#mobileDropDown').slideToggle();
	});
	
	var setCopyYear = function(){
		var date = new Date();
		var thisYear = date.getFullYear();
		$('#thisYear').text(thisYear);
	};

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

	//form validation
	var formValidation = function(){
		$("#contactForm").validate({
			errorPlacement: function(error, element){
				if(element.attr('name') == 'yourName'){
					error.appendTo('#yourNameAlert');
				}
				else if(element.attr('name') == 'yourEmail'){
					error.appendTo('#yourEmailAlert');
				}
				else if(element.attr('name') == 'yourMessage'){
					error.appendTo('#yourMessageAlert');
				}
			}
		});
	};

	headerwHeight();
	setCopyYear();
	formValidation();
});

	