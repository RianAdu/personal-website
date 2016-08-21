var $ = require('jquery'); // get jQuery
var picturefill = require('picturefill'); // get polyfill for loading of responsive images
var Mustache = require('mustache'); // get mustache.js for templating the project detail views
var WebFont = require('webfontloader');

$(function(){
	
	var Rian = {
		
		vars: {
			projectJSON:null, //caching the content
			portfolioDetailsTmpl:null, // caching the overlay tmpl
			historyFlag:null //using this flag in order to set browser history when overlay is visible
		},
		
		init:function(){
			Rian.setParalaxBackground();
			Rian.getRequiredData('jsonData');
			Rian.getRequiredData('template');
			Rian.loadingWebFonts();
			Rian.landingPageHeight();
			Rian.setCopyYear();
			Rian.formValidation();
			Rian.animatedScroll(1100);
			Rian.showActiveSection();
			Rian.landingElement();
			Rian.setDarkNav();
			Rian.bindEvents();
			Rian.pageFadeIn();
		},		

		setParalaxBackground: function(){
			//if device does not run iOS, set headerimage fixed for simple paralax effect
			var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

			if(iOS){
				$('header article').addClass('iOS');
			}
			else {
				$('header article').addClass('desktop'); 
			}
		},

		getRequiredData: function(asset){
			if(asset == 'jsonData'){
				$.getJSON('../inc/projects.json', function(data){
					Rian.vars.projectJSON = data;					
				});
			}
			else if(asset == 'template'){
				$.get('../templates/portfolio_details.html', function(template){
					Rian.vars.portfolioDetailsTmpl = template;
				});
			}
		},

		loadingWebFonts: function(){
			WebFont.load({
				google: {
					families: ['Open+Sans:300,400,600', 'Orbitron:400', 'Exo+2:300,700']
				}
			});
		},

		bindEvents:function(){
			$('.showMore').on('click', Rian.showProjectDetails);
			$('.projects:odd').find('div.projectImage, div.copyPreview').addClass('even');
			$('#mobileMenuIcon').on('click',Rian.mobileMenu);

			$(window).on('orientationchange, resize', Rian.landingPageHeight);

			//user can hit the back button when project details are visible
			$(window).on('popstate', function(){
				if(Rian.vars.historyFlag !== undefined){
					Rian.closeDetails(Rian.vars.historyFlag);
				}
			});
		},

		landingPageHeight: function(){
			var height = $(window).height();
			$('header article').css('height', height+'px');

			//in order to fit landingpage layout when deveice is held in landscape
			if(height < 450){
				$('#hgroup').addClass('landscapeMode');
			}
			else{
				$('#hgroup').removeClass('landscapeMode');
			}
		},

		animatedScroll: function(duration){
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
				Rian.setBrowserHistory(hashTag);
			});
		},

		setBrowserHistory: function(hashID){
			var tmp = hashID.split('#');
			var section = tmp[1];

			//setting the history in case the user hits the back button
			if(history.pushState) {
				history.pushState(null, null, null);
			}
			else {
				location.hash = section;
			}
		},

		showActiveSection: function(){
			var navbarHeight = $('#mainNavbar').height();
			
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
			});
		},

		landingElement: function(){
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
		},

		setDarkNav:function(){
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
		},

		mobileMenu: function(){
			//only add class transtoDark if user is still on top of the page
			if($('nav').hasClass('darkNav')){
				$('#mobileDropDown').slideToggle();
			}
			else {
				$('nav').toggleClass('transToDark');
				$('#mobileDropDown').slideToggle();
			}
		},

		showProjectDetails: function(){
			var clickedProject = $(this).parent().parent().attr('id');
			var detailsMarkup;
			
			Rian.vars.historyFlag = clickedProject; //assigning id to flag for history behaviour
			
			$('#detailsOverlay').remove();
			
			for(var i in Rian.vars.projectJSON){
				var projects = Rian.vars.projectJSON[i];
				
				for(var x in projects){
					var project = projects[x];

					if(x == clickedProject){	
						
						detailsMarkup = Mustache.render(Rian.vars.portfolioDetailsTmpl, project);
					}// end of if-clause
				} // end of 2nd for-loop
			} // end of 1st for-loop
			Rian.finalizeDetails(detailsMarkup, clickedProject);	
		},

		finalizeDetails: function(detailView, id){
			var tag = '#'+id;
			$('.pageContainer').before(detailView);
			$('body').addClass('noScroll');
			$('#detailOverlay').fadeIn();
			Rian.setBrowserHistory(tag);
			
			$('.closeProjectButton').on('click', function(){	
				return Rian.closeDetails(id); //use return to prevent function to be called right away
			});
		},


		closeDetails:function(id){
			$('body').removeClass('noScroll');
			Rian.goBackToProject(id);

			$('#detailOverlay').fadeOut('slow', function(){	
				$(this).remove();
			});
			//setting the flag undefined so that popstate only calls this function when neccessary
			Rian.vars.historyFlag = undefined; 
		},

		goBackToProject: function(viewedProject){
			// this function scrolls the body back to the last clicked Project, after the overlay has been closed
			var navbarHeight = $('#mainNavbar').height();
			$('html, body').scrollTop($('#'+viewedProject+'').offset().top - (navbarHeight - 5));
		},

		pageFadeIn: function(){	
			setTimeout(function(){
				$('#mainPage').addClass('visible');	
			}, 300);
		},

		setCopyYear: function(){
			var date = new Date();
			var thisYear = date.getFullYear();
			$('#thisYear').text(thisYear);
		}, 

		formValidation: function(){
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
		}
	};

	$(document).ready(function(){
		Rian.init();
	});	
});	