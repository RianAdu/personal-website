/* ========================================================================
 * Custom JavaScript - App.js
 * ======================================================================== */

$(function() {
  const App = {

    variables: {
      navbarHeight: 65,
      historyFlag: null,
      animationEnd: 'animationend oAnimationEnd mozAnimationEnd webkitAnimationEnd',
      windowWidth: null,
      mailService: 'https://formspree.io/',
      mailName: 'info',
      mailDomain: 'rian-adu',
      formMethod: 'POST'
    },

    dom: {
      pageBody: null,
      hamburgerMenu: null,
      headerWrapper: null,
      headerTitle: null,
      headerSubtitle: null,
      headerEnter: null,
      navbar: null,
      mobileNav: null,
      showMoreButton: null,
      contactForm: null,
      formGroups: null,
      formInputs: null,
      hiddenField: null,
      pageInitOverlay: null
    },

    init: function() {
      App.cacheDom();
      App.loadWebFonts();
      App.getWindowWidth();
      App.setBackgroundType();
      App.setSmoothScroll(1300);
      App.setLandscapeHeaderPos();
      App.setNavbarBgColor();
      App.setNavbarBgOnScroll();
      App.setFormAction();
      App.formValidation();
      App.bindEvents();
      App.pageStart();
    },

    cacheDom: function() {
      App.dom.pageBody = $('body');
      App.dom.hamburgerMenu = $('.navbar-toggle');
      App.dom.headerWrapper = $('.header__wrapper');
      App.dom.headerTitle = $('.header__title-name');
      App.dom.headerSubtitle = $('.header__subtitle');
      App.dom.headerEnter = $('.header__enter-icon');
      App.dom.navbar = $('.navbar');
      App.dom.mobileNav = $('#mobile-nav');
      App.dom.showMoreButton = $('.show-more');
      App.dom.contactForm = $('#contact-form');
      App.dom.formGroups = $('.form-group');
      App.dom.formInputs = $('.form-control');
      App.dom.hiddenField = $('.contact__form--custom-field');
      App.dom.pageInitOverlay = $('.page_init_overlay');
    },

    bindEvents: function() {
      App.dom.mobileNav.on('show.bs.collapse hide.bs.collapse', App.setNavbarBgOnMobile);
      App.dom.showMoreButton.on('click', App.showProjectDetails);

      //user can hit the back button when project details are visible
      $(window).on('popstate', function() {
        if (App.variables.historyFlag) {
          App.closeProjectDetails(App.variables.historyFlag);
        }
      });

      $(window).on('orientationchange, resize', function() {
        App.setLandscapeHeaderPos();
        App.setNavbarBgColor();
        App.getWindowWidth();
      });
    },

    getWindowWidth: function() {
      App.variables.windowWidth = window.innerWidth;
    },

    fadeAnimation: function(element, animation) {
      element.addClass('animated ' + animation);
    },

    loadWebFonts: function() {
      WebFont.load({
        google: {
          families: ['Open+Sans:300,400,600', 'Orbitron', 'Exo+2:300,400,700']
        }
      });
    },

    pageStart: function() {
      setTimeout(function() {
        App.dom.pageInitOverlay.fadeOut('slow', function() {
          App.fadeAnimation(App.dom.headerTitle, 'fadeInUp');
          App.fadeAnimation(App.dom.headerSubtitle, 'fadeInUp');
          App.fadeAnimation(App.dom.headerEnter, 'fadeIn');
          $(this).remove();
        });
      }, 500);
    },

    setLandscapeHeaderPos: function() {
      const windHeight = window.innerHeight;
      windHeight < 450 ? App.dom.headerWrapper.addClass('header__wrapper--landscape') : App.dom.headerWrapper.removeClass('header__wrapper--landscape');
    },

    setBackgroundType: function() {
      //if device is not mobile set class for parallax background
      const isMobile = /Android|iPad|iPhone|iPod|webOS|Windows Phone|SymbianOS/.test(navigator.userAgent) && !window.MSStream;

      if (!isMobile) {
        $('.bg').each(function() {
          $(this).removeClass('bg').addClass('bg--type-fixed');
        });
      }
    },

    setSmoothScroll: function(duration) {
      $('a[href^="#"]').on('click', function(e) {
        const target = $($(this).attr('href'));
        const dataTag = $(this).attr('data-tag');
        const hashTag = this.hash;

        if (target.length && hashTag !== '#testimonial-carousel') {
          e.preventDefault();

          //close mobile menu before scrolling when nav menu link and brand logo was clicked
          if (App.variables.windowWidth < 768 && dataTag == undefined || !App.dom.hamburgerMenu.hasClass('collapsed') && dataTag == 'home') {
            App.dom.hamburgerMenu.click();
          }

          $('html, body').animate({
            scrollTop: target.offset().top - (App.variables.navbarHeight - 1)
          }, duration);
        }
        App.setBrowserHistory(hashTag);
      });
    },

    //setting browser history in case user uses back button instead of menu
    setBrowserHistory: function(hashID) {
      const section = hashID.split('#')[1];

      if (history.pushState) {
        history.pushState(null, null, null);
      } else {
        location.hash = section;
      }
    },

    setNavbarBgColor: function(wScrollTop) {
      const headerTitlePos = App.dom.headerTitle.offset().top;

      if (wScrollTop == undefined) {
        wScrollTop = $(window).scrollTop();
      }

      if (wScrollTop >= headerTitlePos - App.variables.navbarHeight) {
        App.dom.navbar.addClass('navbar-inverse--faded-in');
      } else {
        App.dom.navbar.removeClass('navbar-inverse--faded-in');
      }
    },

    setNavbarBgOnScroll: function() {
      $(window).scroll(function() {
        const wScroll = $(window).scrollTop();
        App.setNavbarBgColor(wScroll);
      });
    },

    setNavbarBgOnMobile: function() {
      if (App.variables.windowWidth < 768) {
        App.dom.navbar.toggleClass('navbar-inverse--faded-in-mobile');
      }
    },

    showProjectDetails: function() {
      let detailsMarkup;
      const clickedProject = $(this).parent().parent().parent().attr('id');

      App.variables.historyFlag = clickedProject;
      $('.portfolio-details__overlay').remove();

      for (projects of projectObject) {
        for (projectKey in projects) {
          if (projectKey === clickedProject) {
            detailsMarkup = Mustache.render(projectTemplate, projects[projectKey]);
          }
        }
      }
      App.finalizeProjectDetails(detailsMarkup, clickedProject);
    },

    finalizeProjectDetails: function(projectView, id) {
      const tag = '#' + id;
      App.dom.pageBody.prepend(projectView);

      //checking window width to decide which animation to use!
      if (App.variables.windowWidth < 992) {
        $('.portfolio-details__overlay').addClass('animated slideInRight').one(App.variables.animationEnd, function() {
          App.dom.pageBody.addClass('body--prevent-scrolling');
          $(this).css('overflow-y', 'auto');
        });
      } else {
        $('.portfolio-details__overlay').addClass('animated slideInDown').one(App.variables.animationEnd, function() {
          App.dom.pageBody.addClass('body--prevent-scrolling');
          $(this).css('overflow-y', 'auto');
        });
      }

      App.setBrowserHistory(tag);
      $('.portfolio-details__close-button, .portfolio-details__button--close').on('click', function() {
        return App.closeProjectDetails(id);
      });
    },

    closeProjectDetails: function(id) {
      App.dom.pageBody.removeClass('body--prevent-scrolling');
      $('.portfolio-details__overlay').css('overflow-y', 'hidden');

      App.scrollBackToProject(id);
      $('.portfolio-details__close-button, .portfolio-details__button--close').off('click');

      //checking window width to decide which animation to use!
      if (App.variables.windowWidth < 992) {
        $('.portfolio-details__overlay').addClass('animated slideOutRight').one(App.variables.animationEnd, function() {
          $(this).remove();
        });
      } else {
        $('.portfolio-details__overlay').addClass('animated slideOutUp').one(App.variables.animationEnd, function() {
          $(this).remove();
        });
      }
      //setting the flag undefined so that popstate only calls this function when neccessary
      App.variables.historyFlag = undefined;
    },

    scrollBackToProject: function(viewedProject) {
      // this function scrolls the body back to the last clicked Project, after the overlay has been closed
      $('html, body').scrollTop($('#' + viewedProject + '').offset().top - (App.variables.navbarHeight - 1));
    },

    //resetting the form input after submit
    resetContactForm: function() {
      App.dom.formGroups.each(function() {
        $(this).removeClass('has-success has-error has-feedback');
      });

      $('form span.glyphicon').removeClass('glyphicon-remove glyphicon-ok');
    },

    //setting the form action to not have the email address exposed to autobots.
    setFormAction: function() {
      App.dom.contactForm
        .attr('action', '' + App.variables.mailService + App.variables.mailName + '@' + App.variables.mailDomain + '.' + 'com')
        .attr('method', '' + App.variables.formMethod);
      $(window).off('focus');
    },

    //Using jQuery validate plugin combined with bootstrap error classes
    formValidation: function() {
      App.dom.contactForm.validate({
        errorPlacement: function(error, element) {
          // Add the Bootstrap `help-block` class to the error element
          error.addClass("help-block");
          error.insertBefore(element);

          // Add the span element, if doesn't exists, and apply the icon classes to it.
          if (!element.next("span")[0]) {
            $("<span class='glyphicon glyphicon-remove form-control-feedback'></span>").insertAfter(element);
          }
        },

        highlight: function(element, errorClass, validClass) {
          $(element).parents(".form-group").addClass("has-error has-feedback").removeClass("has-success");
          $(element).next("span").addClass("glyphicon-remove").removeClass("glyphicon-ok");
        },

        unhighlight: function(element, errorClass, validClass) {
          $(element).parents(".form-group").addClass("has-success has-feedback").removeClass("has-error");
          $(element).next("span").addClass("glyphicon-ok").removeClass("glyphicon-remove");
        },

        // added custom pre validation to avoid autobot spam
        submitHandler: function(form, e) {
          if (App.dom.hiddenField.val().length > 0) {
            e.preventDefault();

            App.dom.formInputs.each(function() {
              $(this).val('').blur();
            });
            return false;
          } else {
            form.submit();
            $(window).on('focus', function() {
              form.reset();
              App.resetContactForm();
            });
          }
        }
      });
    }
  }; // App

  $(document).ready(function() {
    App.init();
  });
});