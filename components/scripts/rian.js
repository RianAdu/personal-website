var $ = require('jquery'); //get jQuery
var picturefill = require('picturefill'); //get responsive image polyfill

//RianAdu functions
$(function(){

	var projectJSON;

	var init = function(){

		chooseBackground();
		getProjects();
		introHeight();
		setCopyYear();
		formValidation();
		animatedScroll(1100);
		landingElement();
		// parallaxScroll();
		setDarkNav();
		$('.showMore').on('click', showProjectDetails);
		$('#mobileMenuIcon').on('click',mobileMenu);
	}; // end of init

	//function for checking if device is iOS and to not set the background fixed if it is
	var chooseBackground = function(){
		var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

		if(iOS){
			$('header article').addClass('iOS');
		}
		else {
			$('header article').addClass('desktop');
		}
	};

	//calling function to get project data
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
		});

		$(window).on('orientationchange', function(){
			introPos = intro.offset().top;
		});
	};
	// end of setDarkNav


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
			
			//setting the history in case the user hits the back button
			if(history.pushState) {
				history.pushState(null, null, hashTag);
			}
			else {
				location.hash = hashTag;
			}
		});
	};

	var landingElement = function(){ // else condition has to be removed when finishing the project
		$(window).scroll(function(){
			var wScroll = $(window).scrollTop();

			//about Image animation
			if(wScroll > $('#hgroup h1').offset().top){
				$('#aboutImage').addClass('isVisible');
			}
			// else{
			// 	$('#aboutImage').removeClass('isVisible');
			// }

			//medicare project image animation	
			if (wScroll > $('#portfolio').offset().top - ($(window).height() / 1.5)) {
				$('#medicareImg.projectImage').addClass('isVisible');
			}
			// else{
			// 	$('#medicareImg.projectImage').removeClass('isVisible');
			// } 

			//euv project image animation
			if (wScroll > $('#euv.projects').offset().top - ($(window).height() / 1.3)) {
				$('#euvImg.projectImage').addClass('isVisible');
			}
			// else{
			// 	$('#euvImg.projectImage').removeClass('isVisible');
			// }

			//emails project image animation
			if (wScroll > $('#emails.projects').offset().top - ($(window).height() / 1.3)) {
				$('#emailsImg.projectImage').addClass('isVisible');
			}
			// else{
			// 	$('#emailsImg.projectImage').removeClass('isVisible');
			// }	
		});
	};
	// end of  animatedScroll

	// var parallaxScroll = function(){

	// 	$(window).scroll(function(){
	// 		var wScroll = $(this).scrollTop();
	// 		var wWidth = $(window).width();
			
	// 		$('header > article').removeClass('parallax');
	// 		$('#hgroup').css({'transform':'translate(0px,0px)'});

	// 		if(wWidth > 768) {
	// 			$('header > article').addClass('parallax');

	// 			$('#hgroup').css({
	// 				'transform':'translate(0px,'+wScroll /12+'%)'
	// 			});
	// 		}
	// 	});
	// };

	var preventScroll = function(){
		$(window).scroll(function(e){
			var overlayActive = $('#pageContainer.noScroll');

			if(overlayActive.length > 0){
				e.preventDefault();
			}
		});
	};


	var showProjectDetails = function(){
		$('#detailsOverlay').remove();
		var detailsMarkup;
		var clickedProject = $(this).parent().parent().attr('id');

		//iterating through data object
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
		$('#pageContainer').before(detailView);
		$('body').addClass('noScroll');
		$('#detailOverlay').fadeIn();
		
		$('.goBack').on('click', function(){
			$('body').removeClass('noScroll');

			goBackToProject(id);

			$('#detailOverlay').fadeOut('slow', function(){	
				$(this).remove();
			});
		});
	};

	// this function scrools the body back to the last clicked Project,after the overlay has been
	var goBackToProject = function(viewedProject){
		console.log('back to project called');
		console.log(viewedProject);

		var navbarHeight = $('#mainNavbar').height();
		$('html, body').scrollTop($('#'+viewedProject+'').offset().top - (navbarHeight - 5));
	}; // end of goBackToProject fix
		

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
	
	$(document).ready(function(){
		init();
	});	
});
	