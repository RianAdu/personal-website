var $ = require('jquery'); //get jQuery
var picturefill = require('picturefill'); //get responsive image polyfill

//RianAdu functions
$(function(){

	var init = function(){
		showWidth();
		mobileMenu();
		introHeight();
		setCopyYear();
		formValidation();
		smoothScrolling(1100);
		setDarkNav();
	}; // end of init

	var showWidth = function(){
		$(window).on('resize', function(){
			var width = $(window).width();
			$('.showSize').text(width);
			introHeight();
		});
	}; // end of showWidth


	var introHeight = function(){
		var height = $(window).height();
		$('header article').css('height', height);
	}; // end of introHeight


	var mobileMenu = function(){
		$('#mobileMenuIcon').on('click', function(){
			
			//only add class transtoDark if user is still on top of the page
			if($('nav').hasClass('darkNav')){
				$('#mobileDropDown').slideToggle();
			}
			else {
				$('nav').toggleClass('transToDark');
				$('#mobileDropDown').slideToggle();
			}
		});
	}; //end of mobileMenu

	var smoothScrolling = function(duration){
		var navbarHeight = $('#navbar').height();
		
		$('a[href^="#"]:not(#enterButton)').on('click', function(e){
			$('#mobileDropDown').slideUp(); //close the menu
			$('.navButton').removeClass('active');

			var target = $( $(this).attr('href') );
					
			if(target.length){
				e.preventDefault();

				$('html, body').animate({
					scrollTop: target.offset().top-navbarHeight
				}, duration);

				$(this).addClass('active');
			}
		});
	}; // end of  smoothScrolling

	var setDarkNav = function(){
		var intro = $('#hgroup');
		var navbar = $('nav');
		var introPos = intro.offset().top;

		$(window).scroll(function(){
			var scrollPos = $(window).scrollTop();

			if(scrollPos >= introPos){
				navbar.addClass('darkNav');
			}
			else{
				navbar.removeClass('darkNav transToDark');
			}
		});
	}; // end of setDarkNav
	
	var setCopyYear = function(){
		var date = new Date();
		var thisYear = date.getFullYear();
		$('#thisYear').text(thisYear);
	}; // end of setCopyYear


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
	}; // end of form validation
	
	init();
});
	