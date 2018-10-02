$(function(){
  var App = {
    
    const: {
      navbarHeight: 65
    },

    var: {
      historyFlag: null,
      animationEnd: 'animationend oAnimationEnd mozAnimationEnd webkitAnimationEnd',
      windowWidth: null
    },

    dom:{
      hamburgerMenu: null,
      headerWrapper: null,
      headerTitle: null,
      navbar: null,
      mobileNav: null,
      showMoreButton: null,
      contactForm: null,
      formGroups: null,
      formInputs: null,
      hiddenField: null
    },
 
    init: function(){
      App.cacheDom();
      App.getWindowWidth();
      App.setBackgroundType();
      App.setSmoothScroll(1300);
      App.setLandscapeHeaderPos();
      App.setNavbarBgColor();
      App.setNavbarBgOnScroll();
      App.formValidation();
      App.bindEvents();
    },

    cacheDom: function(){
      App.dom.hamburgerMenu = $('.navbar-toggle');
      App.dom.headerWrapper = $('.header__wrapper');
      App.dom.headerTitle = $('.header__title-name');
      App.dom.navbar = $('.navbar');
      App.dom.mobileNav = $('#mobile-nav');
      App.dom.showMoreButton = $('.show-more');
      App.dom.contactForm = $('#contact-form');
      App.dom.formGroups = $('.form-group');
      App.dom.formInputs = $('.form-control');
      App.dom.hiddenField = $('.contact__form--custom-field');
    },

    bindEvents: function(){
      App.dom.mobileNav.on('show.bs.collapse hide.bs.collapse', App.setNavbarBgOnMobile);
      App.dom.showMoreButton.on('click', App.showProjectDetails);

      //$(window).scroll(App.setParallax);

      //user can hit the back button when project details are visible
			$(window).on('popstate', function(){
				if(App.var.historyFlag !== undefined){
					App.closeProjectDetails(App.var.historyFlag);
				}
      });

      $(window).on('orientationchange, resize', function(){
        App.setLandscapeHeaderPos();
        App.setNavbarBgColor();
        App.getWindowWidth();
      });
    },

    getWindowWidth: function(){
      App.var.windowWidth = $(window).width();
    },

    setLandscapeHeaderPos: function(){
      var windHeight = $(window).height();
      
      if(windHeight < 450){
				App.dom.headerWrapper.addClass('header__wrapper--landscape');
			}
			else{
				App.dom.headerWrapper.removeClass('header__wrapper--landscape');
			}
    },

    setBackgroundType: function(){
			//if device is not mobile set class for parallax background
			var isMobile = /Android|iPad|iPhone|iPod|webOS|Windows Phone|SymbianOS/.test(navigator.userAgent) && !window.MSStream;

      if(!isMobile) {
        $('.bg').each(function(){
          $(this).removeClass('bg').addClass('bg--type-fixed');
        });
      }
    },

    setParallax: function() {
      var wScroll = $(window).scrollTop();
      $('.bg--type-parallax').css('background-position', 'center '+(wScroll * 0.5 )+'px');
    },

    setSmoothScroll: function(duration){
      $('a[href^="#"]').on('click', function(e){
        var target = $($(this).attr('href'));
        var dataTag = $(this).attr('data-tag');
        var hashTag = this.hash;
    
        if(target.length){
          e.preventDefault();
         
          //close mobile menu before scrolling when nav menu link and brand logo was clicked
          if(App.var.windowWidth < 768 && dataTag == undefined || !App.dom.hamburgerMenu.hasClass('collapsed') && dataTag == 'home') {
            App.dom.hamburgerMenu.click();
          }
    
          $('html, body').animate({
            scrollTop: target.offset().top - (App.const.navbarHeight - 1)
          }, duration);
        }
        App.setBrowserHistory(hashTag);
      });
    }, 

    //setting browser history in case user uses back button instead of menu
    setBrowserHistory: function(hashID){
      var section = hashID.split('#')[1];
      
      if(history.pushState) {
        history.pushState(null, null, null);
      }
      else {
        location.hash = section;
      }
    }, 

    setNavbarBgColor: function(wScrollTop){
      var headerTitlePos = App.dom.headerTitle.offset().top;
    
      if(wScrollTop == undefined) {
        var wScrollTop = $(window).scrollTop();
      }

      if(wScrollTop >= headerTitlePos - App.const.navbarHeight) {
        App.dom.navbar.addClass('navbar-inverse--faded-in');
      }
      else {
        App.dom.navbar.removeClass('navbar-inverse--faded-in');
      }
    },

    setNavbarBgOnScroll: function () {
      $(window).scroll(function(){
        var wScroll = $(window).scrollTop();
        App.setNavbarBgColor(wScroll);
      });
    },

    setNavbarBgOnMobile: function(){
      if(App.var.windowWidth < 768) {
        App.dom.navbar.toggleClass('navbar-inverse--faded-in-mobile');
      }
    },
    
    showProjectDetails: function(){
      var clickedProject = $(this).parent().parent().parent().attr('id');
      App.var.historyFlag = clickedProject;
      var detailsMarkup;

      $('.portfolio-details__overlay').remove();
     
      for(var i in projectObject){
        var projects = projectObject[i];
        
        for(var x in projects){
          var project = projects[x];
    
          if(x == clickedProject){
            detailsMarkup = Mustache.render(projectTemplate, project);
          }
        } 
      } 
      App.finalizeProjectDetails(detailsMarkup, clickedProject);
    },

    finalizeProjectDetails: function(projectView, id){
      var tag = '#'+id;
      $('body').prepend(projectView).addClass('body--prevent-scrolling');

      //checking window width to decide which animation to use!
      if(App.var.windowWidth < 992) {
        $('.portfolio-details__overlay').addClass('animated slideInRight');
      }
      else {
        $('.portfolio-details__overlay').addClass('animated slideInDown');
      }

      App.setBrowserHistory(tag);
      $('.portfolio-details__close-button, .portfolio-details__button--close').on('click', function(){
        return App.closeProjectDetails(id);
      });
    },
    
    closeProjectDetails: function(id) {
      $('body').removeClass('body--prevent-scrolling');
      App.scrollBackToProject(id);
      $('.portfolio-details__close-button, .portfolio-details__button--close').off('click');
      
      //checking window width to decide which animation to use!
      if(App.var.windowWidth < 992) {
        $('.portfolio-details__overlay').addClass('animated slideOutRight').one(App.var.animationEnd, function(){
          $(this).remove();
        });
      }
      else {
        $('.portfolio-details__overlay').addClass('animated slideOutUp').one(App.var.animationEnd, function(){
          $(this).remove();
        });
      }
      //setting the flag undefined so that popstate only calls this function when neccessary
			App.var.historyFlag = undefined;
    },

    scrollBackToProject: function(viewedProject){
      // this function scrolls the body back to the last clicked Project, after the overlay has been closed
			$('html, body').scrollTop($('#'+viewedProject+'').offset().top - (App.const.navbarHeight - 1));
    },

    //resetting the form input after submit
    resetContactForm: function(){
      App.dom.formGroups.each(function(){
        $(this).removeClass('has-success has-error has-feedback');
      });

      $('form span.glyphicon').removeClass('glyphicon-remove glyphicon-ok');
    },

    formValidation: function(){
      App.dom.contactForm.validate({
				errorPlacement: function(error, element){
          // Add the Bootstrap `help-block` class to the error element
          error.addClass( "help-block" );
          error.insertBefore(element);

          // Add the span element, if doesn't exists, and apply the icon classes to it.
          if ( !element.next( "span" )[ 0 ] ) {
            $( "<span class='glyphicon glyphicon-remove form-control-feedback'></span>" ).insertAfter( element );
          }
        },

        highlight: function ( element, errorClass, validClass ) {
          $( element ).parents( ".form-group" ).addClass( "has-error has-feedback" ).removeClass( "has-success" );
          $( element ).next( "span" ).addClass( "glyphicon-remove" ).removeClass( "glyphicon-ok" );
        },

        unhighlight: function ( element, errorClass, validClass ) { 
          $( element ).parents( ".form-group" ).addClass( "has-success has-feedback" ).removeClass( "has-error" );
          $( element ).next( "span" ).addClass( "glyphicon-ok" ).removeClass( "glyphicon-remove" );
        },

        // added custom pre validation to avoid autobot spam
        submitHandler: function(form, e) {   
          if(App.dom.hiddenField.val().length > 0 ) {
            e.preventDefault();
            
            App.dom.formInputs.each(function(){
              $(this).val('').blur();
            });
            return false; 
          }

          else {
            form.submit();
            form.reset();
            App.resetContactForm();
          }
        }
			});
    }
  }; // App

  $(document).ready(function(){
    App.init();
  });

});
 