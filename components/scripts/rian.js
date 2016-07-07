var $ = require('jquery'); //get jQuery
var picturefill = require('picturefill'); //get responsive image polyfill

//RianAdu functions
$(function(){

	var projectJSON; //caching the content
	var historyFlag; //using this flag in order to set browser history when overlay is visible

	var init = function(){

		chooseBackground();
		getProjects();
		landingPageHeight();
		setCopyYear();
		formValidation();
		animatedScroll(1100);
		landingElement();
		setDarkNav();
		$('.showMore').on('click', showProjectDetails);
		$('#mobileMenuIcon').on('click',mobileMenu);

		$(window).on('orientationchange, resize', function(){
			landingPageHeight();
		});

		$(window).on('popstate', function(){
			fixOverlayHistory(historyFlag);
		});
	}; // end of init

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


	var getProjects = function(){
		$.ajax({
			type:'GET',
			url:'../inc/projects.json',
			dataType:'json',
			success:function(data){
				projectJSON = data;
			}// end of success		
		}); //end of ajax
	}; // end of getProjects


	var landingPageHeight = function(){
		var height = $(window).height();
		$('header article').css('height', height);
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
			setBrowserHistory(hashTag);
		});
	};

	var setBrowserHistory = function(hashID){
		//setting the history in case the user hits the back button
		if(history.pushState) {
			history.pushState(null, null, hashID);
		}
		else {
			location.hash = hashID;
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
					detailsMarkup = createProjectDetails(project);
				}// end of if-clause
			} // end of 2nd for-loop
		} // end of 1st for-loop
		finalizeDetails(detailsMarkup, clickedProject);	
	}; //end of showProjectDetails


	var createProjectDetails = function(project){
		var html = '<div id="detailOverlay"><div class="detailsContainer"> <div class="navPlaceholder"><nav><div class="navbar">'+
		'<div class="logo">.ra</div><i id="portfolioBack" class="fa fa-arrow-circle-left goBack" aria-hidden="true"></i>'+
		'</div></nav></div><section class="detailCopy"><article>'+
		'<h2>'+project.title+'</h2>'+project.copy+'<h3>Technologies</h3>';

		//adding the technologies
		for(var i in project.technologies){
			var technologie = project.technologies[i];
			html +='<span>'+technologie+'</span>'; 
		}

		//adding image markup
		html += '</article></section><section class="dark detailImage">'+
		'<img src="images/pf_details/'+project.id+'_details_.jpg" alt="'+project.title+'">';

		//creating button to link to external page 
		if(project.url){
			html +='<div class="backContainer"><button><a href="'+project.url+'" target="_blank">visit website</a></button>'+
			'<i class="fa fa-arrow-circle-left goBack" aria-hidden="true"></i></div>';
		}
		else {
			html += '<div class="backContainer"><i class="fa fa-arrow-circle-left goBack" aria-hidden="true"></i></div>';
		}
		html +='</section></div></div>';

		return html;
	}// end of createProjectDetails

	var finalizeDetails = function(detailView, id){
		var tag = '#'+id;
		$('.pageContainer').before(detailView);
		$('body').addClass('noScroll');
		$('#detailOverlay').fadeIn();
		setBrowserHistory(tag);
		
		$('.goBack').on('click', function(){	
			return closeDetails(id); //use return to prevent function to be called right away
		});
	}; // end of finalizeDetails


	var closeDetails = function(id){
		$('body').removeClass('noScroll');
		goBackToProject(id);

		$('#detailOverlay').fadeOut('slow', function(){	
			$(this).remove();
		});
	 }// end of closeDetails 


	var fixOverlayHistory = function(){
		if($('#detailOverlay')) {
			closeDetails(historyFlag);
		}
	}; // end of fixOverlayHistory

	// this function scrools the body back to the last clicked Project,after the overlay has been closed
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
	