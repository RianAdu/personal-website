var $ = require('jquery'); // get jQuery
var picturefill = require('picturefill'); // get polyfill for loading of responsive images
var Mustache = require('mustache'); // get mustache.js for templating the project detail views
var WebFont = require('webfontloader');



$(function(){

	var projectJSON; //caching the content
	var overlayTemplate; // caching the overlay tmpl
	var historyFlag;//using this flag in order to set browser history when overlay is visible

	var init = function(){

		chooseBackground();
		getProjectsData();

		getPortfolioTmpl();
		getDetailsOverlayTmpl();

		loadingWebFonts();
		landingPageHeight();
		setCopyYear();
		formValidation();
		animatedScroll(1100);
		sectionHighlighting();
		setDarkNav();

		$('#mobileMenuIcon').on('click',mobileMenu);

		$(window).on('orientationchange, resize', function(){
			landingPageHeight();
		});

		//user can hit the back button when project details are visible
		$(window).on('popstate', function(){
			if(historyFlag !== undefined){
				closeDetails(historyFlag);
			}
		});

		pageFadeIn();
	}; 
	// end of init


	var pageFadeIn = function(){	
		setTimeout(function(){
			$('#mainPage').addClass('visible');	
		}, 300);
	}; // end of pageFadeIn

	//if device does not run iOS, set headerimage fixed for simple paralax effect 
	var chooseBackground = function(){
		var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

		if(iOS){
			$('header article').addClass('iOS');
		}
		else {
			$('header article').addClass('desktop'); 
		}
	}; // end of chooseBackground


	var getProjectsData = function(){
		$.getJSON('../inc/projects.json', function(data){
			projectJSON = data;
		});
	}; // end of getProjectsData

	var getPortfolioTmpl = function(){
		$.get('../templates/projects.html', function(template){
			var portfolioTmpl = template;
			
			generatePortfolio(portfolioTmpl);
		}); // end of get
	}; // end of getPortfolioTmpl

	var getDetailsOverlayTmpl = function(){
		$.get('../templates/project_details_overlay.html', function(template){
			overlayTemplate = template;
		}); // end of get
	}; // end of getDetailsOverlayTmpl

	var loadingWebFonts = function(){
		WebFont.load({
			google: {
				families: ['Open+Sans:300,400,600', 'Orbitron:400', 'Exo+2:300,700']
			}
		}); // end of load function
	}; // end of loadingWebFonts

	var generatePortfolio = function(tmpl){	
		for(var i in projectJSON){
			var projects = projectJSON[i];
			
			for(var x in projects){
				var project = projects[x];

				var markup = Mustache.render(tmpl, project);
				$('#portfolio article').append(markup);
			} // end of 2nd for-loop
		} // end of 1st for-lool	

		$('.projects:odd').find('div.projectImage, div.copyPreview').addClass('even'); //add click listener to show more buttons
		$('.showMore').on('click', showProjectDetails);
		landingElement(); //calling function for animating		
	};

	var landingPageHeight = function(){
		var height = $(window).height();
		$('header article').css('height', height+'px');

		//in order to fit landingpage layout when deveice is held in landscape
		if(height < 450){
			$('#hgroup').addClass('landscapeMode');
		}
		else{
			$('#hgroup').removeClass('landscapeMode');
		}
	};
	// end of landingPageHeight


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
		var intro = $('#hgroup h1');
		var navbar = $('nav');
		var navHeight= $('.navbar').height()+20;
		var introPos = intro.offset().top;

		$(window).scroll(function(){
			var wScroll = $(window).scrollTop();
			
			if(wScroll >= introPos - navHeight){
				navbar.addClass('darkNav');
			}
			else{
				navbar.removeClass('darkNav transToDark');			
			}
		}); // end of window scroll

		$(window).on('orientationchange', function(){
			introPos = intro.offset().top;
		});
	};// end of setDarkNav


	var animatedScroll = function(duration){
		
		$('a[href^="#"]:not(#enterButton)').on('click', function(e){
			var navbarHeight = $('#mainNavbar').height();

			$('#mobileDropDown').slideUp(); //close the menu

			var target = $( $(this).attr('href') );
			var hashTag = target.selector;
					
			if(target.length){
				e.preventDefault();

				$('html, body').animate({
					scrollTop: target.offset().top - (navbarHeight - 5)
				}, duration);
			}	
			setBrowserHistory(hashTag);
		});
	}; // end of animatedScroll

	var sectionHighlighting = function(){
		var navbarHeight	= $('#mainNavbar').height();
		
		$(window).scroll(function(){	
			var wScroll = $(window).scrollTop() + navbarHeight;
			$('nav li a').removeClass('active');
		
			//about page
			if(wScroll > $('#about').offset().top){
				$('nav li a').removeClass('active');
				$('a[href$="#about"]').addClass('active');
			}

			if(wScroll > $('#portfolio').offset().top){
				$('nav li a').removeClass('active');
				$('a[href$="#portfolio"]').addClass('active');
			}

			if(wScroll > $('#contact').offset().top){
				$('nav li a').removeClass('active');
				$('a[href$="#contact"]').addClass('active');
			}
		}); // end of scroll event
	}; // end of sectionHighlighting

	var setBrowserHistory = function(hashID){
		
		var tmp = hashID.split('#');
		var section = tmp[1];

		//setting the history in case the user hits the back button
		if(history.pushState) {
			history.pushState(null, null, null);
		}
		else {
			location.hash = section;
		}
	};

	var landingElement = function(){
		$(window).scroll(function(){
			var wScroll = $(window).scrollTop();

			//about Image animation
			if(wScroll > $('#hgroup h1').offset().top){
				$('#aboutImage').addClass('isVisible');
			}

			//medicare project image animation	
			if (wScroll > $('#portfolio').offset().top - ($(window).height() / 1.5)) {
				$('#medicareImg.projectImage').addClass('isVisible');
			}

			//euv project image animation
			if (wScroll > $('#euv.projects').offset().top - ($(window).height() / 1.3)) {
				$('#euvImg.projectImage').addClass('isVisible');
			}

			//emails project image animation
			if (wScroll > $('#emails.projects').offset().top - ($(window).height() / 1.3)) {
				$('#emailsImg.projectImage').addClass('isVisible');
			}
		});
	};// end of landingElement

	var showProjectDetails = function(){
		var clickedProject = $(this).parent().parent().attr('id');
		historyFlag = clickedProject; //assigning id to flag for history behaviour
		var detailsMarkup;
		$('#detailsOverlay').remove();
		

		for(var i in projectJSON){
			var projects = projectJSON[i];
			
			for(var x in projects){
				var project = projects[x];

				if(x == clickedProject){	
					
					detailsMarkup = Mustache.render(overlayTemplate, project);
				}// end of if-clause
			} // end of 2nd for-loop
		} // end of 1st for-loop
		finalizeDetails(detailsMarkup, clickedProject);	
	}; //end of showProjectDetails

	var finalizeDetails = function(detailView, id){
		var tag = '#'+id;
		$('.pageContainer').before(detailView);
		$('body').addClass('noScroll');
		$('#detailOverlay').fadeIn();
		setBrowserHistory(tag);
		
		$('.closeProjectButton').on('click', function(){	
			return closeDetails(id); //use return to prevent function to be called right away
		});
	}; // end of finalizeDetails


	var closeDetails = function(id){
		$('body').removeClass('noScroll');
		goBackToProject(id);

		$('#detailOverlay').fadeOut('slow', function(){	
			$(this).remove();
		});

		historyFlag = undefined; //setting the flag undefined so that popstate only calls this function when neccessary
	 }// end of closeDetails 


	// this function scrolls the body back to the last clicked Project, after the overlay has been closed
	var goBackToProject = function(viewedProject){
		var navbarHeight = $('#mainNavbar').height();
		$('html, body').scrollTop($('#'+viewedProject+'').offset().top - (navbarHeight - 5));
	}; // end of goBackToProject fix
		

	var setCopyYear = function(){
		var date = new Date();
		var thisYear = date.getFullYear();
		$('#thisYear').text(thisYear);
	};// end of setCopyYear


	var formValidation = function(){
		$("#contactForm").validate({
			errorPlacement: function(error, element){
				if(element.attr('name') == 'name'){
					error.appendTo('#nameAlert');
				}
				else if(element.attr('name') == 'email'){
					error.appendTo('#emailAlert');
				}
				else if(element.attr('name') == 'message'){
					error.appendTo('#messageAlert');
				}
			}
		});
	}; // end of form validation
	
	$(document).ready(function(){
		init();
	});	
});
	