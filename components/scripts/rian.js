var $ = require('jquery'); //get jQuery
var picturefill = require('picturefill'); //get responsive image polyfill

//rian adu script
$(function(){

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

	var animatedScrolling = function(duration){
		var navbarHeight = $('#navbar').height();
		
		$('a[href^="#"]:not(#enterButton)').on('click', function(e){
			$('#mobileDropDown').slideUp(); //close the menu
			var target = $( $(this).attr('href') );
				if(target.length){
					e.preventDefault();

					$('html, body').animate({
						scrollTop: target.offset().top-navbarHeight
					}, duration);
				}
		});
	};

	var stickyNav = function(){
		var navbar = $('nav');
		var navPos = navbar.offset().top;
		$('.navPlaceholder').height($('#navbar').outerHeight());

		$(window).scroll(function(){
			var scrollPos = $(window).scrollTop();

			if(scrollPos >= navPos){
				navbar.addClass('fixed');
			}
			else{
				navbar.removeClass('fixed');
			}
		});
		//set placeholder height on window resize again
		$(window).resize(function(){
			$('.navPlaceholder').height($('#navbar').outerHeight());
		});
	};
	
	headerwHeight();
	setCopyYear();
	formValidation();
	animatedScrolling(1100);
	stickyNav();
});
	