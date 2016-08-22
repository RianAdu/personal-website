var $ = require('jquery'); // get jQuery
var picturefill = require('picturefill'); // get polyfill for loading of responsive images
var Mustache = require('mustache'); // get mustache.js for templating the project detail views
var WebFont = require('webfontloader');

$(function(){
	var Rian = {

		vars: {
			projectJSON:null,
			portfolioDetailsTmpl:null,
			historyFlag:null,
		},

		dom:{
			heroImage:null,
			mobileNav:null,
			mainNav:null,
			pageHeadline:null,
			aboutSection:null,
			portfolioSection:null,
			contactSection:null,
			euvProject:null,
			emailProject:null
		},

		init:function(){
			Rian.cacheDom();
			Rian.getRequiredData('jsonData');
			Rian.getRequiredData('template');
			Rian.loadingWebFonts();
			Rian.setParalaxBackground();
			Rian.landingPageHeight();
			Rian.setCopyYear();
			Rian.formValidation();
			Rian.animatedScroll(1100);
			Rian.showActiveSection();
			Rian.landingElement();
			Rian.setDarkNav();
			Rian.bindEvents();
			Rian.finalizeDom();
			Rian.pageFadeIn();
		},

		cacheDom: function(){
			Rian.dom.heroImage = $('header article');
			Rian.dom.mobileNav = $('#mobileDropDown');
			Rian.dom.mainNav = $('#mainNavbar');
			Rian.dom.pageHeadline = $('#hgroup h1');
			Rian.dom.aboutSection = $('#about');
			Rian.dom.portfolioSection = $('#portfolio');
			Rian.dom.contactSection	= $('#contact');
			Rian.dom.euvProject	= $('#euv.projects');
			Rian.dom.emailProject = $('#emails.projects');
		},

		bindEvents:function(){
			$('.showMore').on('click', Rian.showProjectDetails);
			$('#mobileMenuIcon').on('click',Rian.mobileMenu);
			$(window).on('orientationchange, resize', Rian.landingPageHeight);

			//user can hit the back button when project details are visible
			$(window).on('popstate', function(){
				if(Rian.vars.historyFlag !== undefined){
					Rian.closeDetails(Rian.vars.historyFlag);
				}
			});
		},

		setParalaxBackground: function(){
			//if device does not run iOS, set headerimage fixed for simple paralax effect
			var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

			if(iOS){
				Rian.dom.heroImage.addClass('iOS');
			}
			else {
				Rian.dom.heroImage.addClass('desktop');
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

		finalizeDom:function(){
			$('.projects:odd').find('div.projectImage, div.copyPreview').addClass('even');
		},

		landingPageHeight: function(){
			var height = $(window).height();
			Rian.dom.heroImage.css('height', height+'px');

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
				var navbarHeight = Rian.dom.mainNav.height();

				Rian.dom.mobileNav.slideUp(); //close the menu

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
			var navbarHeight = Rian.dom.mainNav.height();
			
			$(window).scroll(function(){
				var wScroll = $(window).scrollTop() + navbarHeight;
				$('nav li a').removeClass('active');
			
				//about page
				if(wScroll > Rian.dom.aboutSection.offset().top){
					$('nav li a').removeClass('active');
					$('a[href$="#about"]').addClass('active');
				}

				if(wScroll > Rian.dom.portfolioSection.offset().top){
					$('nav li a').removeClass('active');
					$('a[href$="#portfolio"]').addClass('active');
				}

				if(wScroll > Rian.dom.contactSection.offset().top){
					$('nav li a').removeClass('active');
					$('a[href$="#contact"]').addClass('active');
				}
			});
		},

		landingElement: function(){
			$(window).scroll(function(){
				var wScroll = $(window).scrollTop();

				if(wScroll > Rian.dom.pageHeadline.offset().top){
					$('#aboutImage').addClass('isVisible');
				}

				if (wScroll > Rian.dom.portfolioSection.offset().top - ($(window).height() / 1.5)) {
					$('#medicareImg.projectImage').addClass('isVisible');
				}

				if (wScroll > Rian.dom.euvProject.offset().top - ($(window).height() / 1.3)) {
					$('#euvImg.projectImage').addClass('isVisible');
				}

				if (wScroll > Rian.dom.emailProject.offset().top - ($(window).height() / 1.3)) {
					$('#emailsImg.projectImage').addClass('isVisible');
				}
			});
		},

		setDarkNav:function(){
			var intro = Rian.dom.pageHeadline;
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
				Rian.dom.mobileNav.slideToggle();
			}
			else {
				$('nav').toggleClass('transToDark');
				Rian.dom.mobileNav.slideToggle();
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
				return Rian.closeDetails(id);
			});
		},

		closeDetails:function(id){
			$('body').removeClass('noScroll');
			Rian.goBackToProject(id);

			$('.closeProjectButton').off('click');
			
			$('#detailOverlay').fadeOut('slow', function(){
				$(this).remove();
			});

			//setting the flag undefined so that popstate only calls this function when neccessary
			Rian.vars.historyFlag = undefined;
		},

		goBackToProject: function(viewedProject){
			// this function scrolls the body back to the last clicked Project, after the overlay has been closed
			var navbarHeight = Rian.dom.mainNav.height();
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
	}; // END OF Rian object
	$(document).ready(function(){
		Rian.init();
	});
});