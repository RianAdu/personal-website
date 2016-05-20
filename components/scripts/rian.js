var $ = require('jquery'); //get jQuery
var picturefill = require('picturefill'); //get responsive image polyfill

//RianAdu functions
$(function(){

	var init = function(){
		showWidth();
		introHeight();
		setCopyYear();
		formValidation();
		animatedScroll(1100);
		// parallaxScroll();
		setDarkNav();
		$('.showMore').on('click', showProjectDetails);
		$('#mobileMenuIcon').on('click',mobileMenu);
	}; // end of init

	var showWidth = function(){
		$(window).on('resize', function(){
			var width = $(window).width();
			$('.showSize').text(width+' px');
			introHeight();
		});
	};
	// end of showWidth


	var introHeight = function(){
		var height = $(window).height();
		$('header article').css('height', height);
	};
	// end of introHeight


	var mobileMenu = function(){
			
		//only add class transtoDark if user is still on top of the page
		if($('nav').hasClass('darkNav')){
			$('#mobileDropDown').slideToggle();
		}
		else {
			$('nav').toggleClass('transToDark');
			$('#mobileDropDown').slideToggle();
		}
	};
	//end of mobileMenu

	var setDarkNav = function(){
		var intro = $('#hgroup');
		var navbar = $('nav');
		var introPos = intro.offset().top;

		$(window).scroll(function(){
			var wScroll = $(window).scrollTop();
			
			if(wScroll >= introPos){
				navbar.addClass('darkNav');
			}
			else{
				navbar.removeClass('darkNav transToDark');
			}
		});

		$(window).on('orientationchange', function(){
			introPos = intro.offset().top;
		});
	};
	// end of setDarkNav


	var animatedScroll = function(duration){
		
		$('a[href^="#"]:not(#enterButton)').on('click', function(e){
			var navbarHeight = $('#navbar').height();

			$('#mobileDropDown').slideUp(); //close the menu
			$('.navButton').removeClass('active');

			var target = $( $(this).attr('href') );
			var hashTag = target.selector;
			
					
			if(target.length){
				e.preventDefault();

				$('html, body').animate({
					scrollTop: target.offset().top - (navbarHeight - 5)
				}, duration);

				$(this).addClass('active');
			}
			
			//setting the history in case the user hits the back button
			if(history.pushState) {
				history.pushState(null, null, hashTag);
			}
			else {
				location.hash = hashTag;
			}
		});
	};
	// end of  animatedScroll

	var parallaxScroll = function(){

		$(window).scroll(function(){
			var wScroll = $(this).scrollTop();
			var wWidth = $(window).width();
			
			$('header > article').removeClass('parallax');
			$('#hgroup').css({'transform':'translate(0px,0px)'});

			if(wWidth > 768) {
				$('header > article').addClass('parallax');

				$('#hgroup').css({
					'transform':'translate(0px,'+wScroll /12+'%)'
				});
			}
		});
	};

	var showProjectDetails = function(){
		var project = $(this).parent().parent().attr('id');
		alert('project-id: '+project);
	};
	

	var setCopyYear = function(){
		var date = new Date();
		var thisYear = date.getFullYear();
		$('#thisYear').text(thisYear);
	};
	// end of setCopyYear

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
	// end of form validation

	init();
});
	