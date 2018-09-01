$(function(){
  var App = {
    
    const: {
      navbarHeight: 65
    },

    var: {
      historyFlag: null
    },

    dom:{
      hamburgerMenu: null,
      headerTitle: null,
      navbar: null,
      mobileNav: null,
      showMoreButton: null
    },

    init: function(){
      App.cacheDom();
      App.setBackgroundEffect();
      App.smoothScroll();
      App.setNavbarBgColor();
      App.setNavbarBgOnScroll();
      App.bindEvents();
    },

    cacheDom: function(){
      App.dom.hamburgerMenu = $('.navbar-toggle');
      App.dom.headerTitle = $('.header__title-name');
      App.dom.navbar = $('.navbar');
      App.dom.mobileNav = $('#mobile-nav');
      App.dom.showMoreButton = $('.show-more');
    },

    bindEvents: function(){
      App.dom.mobileNav.on('show.bs.collapse hide.bs.collapse', App.setNavbarBgOnMobile);
      App.dom.showMoreButton.on('click', App.showProjectDetails);
      
      $(window).scroll(App.parallax);
      //user can hit the back button when project details are visible
			$(window).on('popstate', function(){
				if(App.var.historyFlag !== undefined){
					App.closeProjectDetails(App.var.historyFlag);
				}
			});
    },

    setBackgroundEffect: function(){
			//if device does run iOS, remove basic parallax from background
			var isMobile = /Android|iPad|iPhone|iPod|webOS|Windows Phone|SymbianOS/.test(navigator.userAgent) && !window.MSStream;

      if(!isMobile) {
        $('.el--bg').each(function(){
          $(this).removeClass('el--bg').addClass('el--bg-parallax');
        });
      }
    },

    smoothScroll: function(){
      $('a[href^="#"]').on('click', function(e){
        var target = $($(this).attr('href'));
        var dataTag = $(this).attr('data-tag');
        var hashTag = this.hash;
    
        if(target.length){
          e.preventDefault();
         
          //close mobile menu before scrolling when nav menu link and brand logo was clicked
          if($(window).width() < 768 && dataTag == undefined || !App.dom.hamburgerMenu.hasClass('collapsed') && dataTag == 'home') {
            App.dom.hamburgerMenu.click();
          }
    
          $('html, body').animate({
            scrollTop: target.offset().top - (App.const.navbarHeight - 1)
          }, 1100);
        }
        App.setBrowserHistory(hashTag);
      });
    }, 

    //setting the history in case the user hits the back button
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
    
      $(window).on('orientationchange', function(){
        headerTitlePos = App.dom.headerTitle.offset().top;
      });
    },

    setNavbarBgOnMobile: function(){
      if($(window).width() < 768) {
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
      $('body').prepend(projectView).addClass('el--prevent-scrolling');
      $('.portfolio-details__overlay').fadeIn('slow');
      App.setBrowserHistory(tag);
      
      $('.portfolio-details__close-button, .portfolio-details__button--close').on('click', function(){
        return App.closeProjectDetails(id);
      });
    },
    
    closeProjectDetails: function(id) {
      $('body').removeClass('el--prevent-scrolling');
      App.scrollBackToProject(id);

      $('.portfolio-details__close-button, .portfolio-details__button--close').off('click');
      
      $('.portfolio-details__overlay').fadeOut('slow', function(){
        $(this).remove();
      }); 
      
      //setting the flag undefined so that popstate only calls this function when neccessary
			App.var.historyFlag = undefined;
    },

    scrollBackToProject: function(viewedProject){
      // this function scrolls the body back to the last clicked Project, after the overlay has been closed
			$('html, body').scrollTop($('#'+viewedProject+'').offset().top - (App.const.navbarHeight - 1));
    },
    
    parallax: function() {
      var wScroll = $(window).scrollTop();
      $('.el--bg-parallax').css('background-position', 'center '+(wScroll * 0.5 )+'px');
    }   
  }; // App

  $(document).ready(function(){
    App.init();
  });

});
 