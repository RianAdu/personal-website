"use strict";

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/* ========================================================================
 * Custom JavaScript - App.js
 * ======================================================================== */
$(function () {
  var App = {
    variables: {
      navbarHeight: 65,
      historyFlag: null,
      animationEnd: 'animationend oAnimationEnd mozAnimationEnd webkitAnimationEnd',
      windowWidth: null
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
      hiddenField: null,
      submitModal: null,
      formGroups: null,
      formInputs: null,
      currentYear: null,
      pageInitOverlay: null
    },
    init: function init() {
      App.cacheDom();
      App.loadWebFonts();
      App.getWindowWidth();
      App.setBackgroundType();
      App.setSmoothScroll(1300);
      App.setLandscapeHeaderPos();
      App.setNavbarBgColor();
      App.setNavbarBgOnScroll();
      App.formValidation();
      App.setCurrentYear();
      App.bindEvents();
      App.pageStart();
    },
    cacheDom: function cacheDom() {
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
      App.dom.submitModal = $('#submit-success-modal');
      App.dom.pageInitOverlay = $('.page_init_overlay');
      App.dom.currentYear = document.querySelector('.footer__content-year');
    },
    bindEvents: function bindEvents() {
      App.dom.mobileNav.on('show.bs.collapse hide.bs.collapse', App.setNavbarBgOnMobile);
      App.dom.showMoreButton.on('click', App.showProjectDetails); //user can hit the back button when project details are visible

      $(window).on('popstate', function () {
        if (App.variables.historyFlag) {
          App.closeProjectDetails(App.variables.historyFlag);
        }
      });
      $(window).on('orientationchange, resize', function () {
        App.setLandscapeHeaderPos();
        App.setNavbarBgColor();
        App.getWindowWidth();
      }); //Modal clears form when close button is called

      App.dom.submitModal.on('hide.bs.modal', function () {
        App.resetContactForm();
      });
    },
    setCurrentYear: function setCurrentYear() {
      App.dom.currentYear.innerText = new Date().getFullYear();
    },
    getWindowWidth: function getWindowWidth() {
      App.variables.windowWidth = window.innerWidth;
    },
    fadeAnimation: function fadeAnimation(element, animation) {
      element.addClass('animated ' + animation);
    },
    loadWebFonts: function loadWebFonts() {
      WebFont.load({
        google: {
          families: ['Open+Sans:300,400,600', 'Orbitron', 'Exo+2:300,400,700']
        }
      });
    },
    pageStart: function pageStart() {
      setTimeout(function () {
        App.dom.pageInitOverlay.fadeOut('slow', function () {
          App.fadeAnimation(App.dom.headerTitle, 'fadeInUp');
          App.fadeAnimation(App.dom.headerSubtitle, 'fadeInUp');
          App.fadeAnimation(App.dom.headerEnter, 'fadeIn');
          $(this).remove();
        });
      }, 500);
    },
    setLandscapeHeaderPos: function setLandscapeHeaderPos() {
      var windHeight = window.innerHeight;
      windHeight < 450 ? App.dom.headerWrapper.addClass('header__wrapper--landscape') : App.dom.headerWrapper.removeClass('header__wrapper--landscape');
    },
    setBackgroundType: function setBackgroundType() {
      //if device is not mobile set class for parallax background
      var isMobile = /Android|iPad|iPhone|iPod|webOS|Windows Phone|SymbianOS/.test(navigator.userAgent) && !window.MSStream;

      if (!isMobile) {
        $('.bg').each(function () {
          $(this).removeClass('bg').addClass('bg--type-fixed');
        });
      }
    },
    setSmoothScroll: function setSmoothScroll(duration) {
      $('a[href^="#"]').on('click', function (e) {
        var target = $($(this).attr('href'));
        var dataTag = $(this).attr('data-tag');
        var hashTag = this.hash;

        if (target.length && hashTag !== '#testimonial-carousel') {
          e.preventDefault(); //close mobile menu before scrolling when nav menu link and brand logo was clicked

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
    setBrowserHistory: function setBrowserHistory(hashID) {
      var section = hashID.split('#')[1];

      if (history.pushState) {
        history.pushState(null, null, null);
      } else {
        location.hash = section;
      }
    },
    setNavbarBgColor: function setNavbarBgColor(wScrollTop) {
      var headerTitlePos = App.dom.headerTitle.offset().top;

      if (wScrollTop == undefined) {
        wScrollTop = $(window).scrollTop();
      }

      if (wScrollTop >= headerTitlePos - App.variables.navbarHeight) {
        App.dom.navbar.addClass('navbar-inverse--faded-in');
      } else {
        App.dom.navbar.removeClass('navbar-inverse--faded-in');
      }
    },
    setNavbarBgOnScroll: function setNavbarBgOnScroll() {
      $(window).scroll(function () {
        var wScroll = $(window).scrollTop();
        App.setNavbarBgColor(wScroll);
      });
    },
    setNavbarBgOnMobile: function setNavbarBgOnMobile() {
      if (App.variables.windowWidth < 768) {
        App.dom.navbar.toggleClass('navbar-inverse--faded-in-mobile');
      }
    },
    showProjectDetails: function showProjectDetails() {
      var detailsMarkup;
      var clickedProject = $(this).parent().parent().parent().attr('id');
      App.variables.historyFlag = clickedProject;
      $('.portfolio-details__overlay').remove();

      var _iterator = _createForOfIteratorHelper(projectObject),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          projects = _step.value;

          for (projectKey in projects) {
            if (projectKey === clickedProject) {
              detailsMarkup = Mustache.render(projectTemplate, projects[projectKey]);
            }
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      App.finalizeProjectDetails(detailsMarkup, clickedProject);
    },
    finalizeProjectDetails: function finalizeProjectDetails(projectView, id) {
      var tag = '#' + id;
      App.dom.pageBody.prepend(projectView); //checking window width to decide which animation to use!

      if (App.variables.windowWidth < 992) {
        $('.portfolio-details__overlay').addClass('animated slideInRight').one(App.variables.animationEnd, function () {
          App.dom.pageBody.addClass('body--prevent-scrolling');
          $(this).css('overflow-y', 'auto');
        });
      } else {
        $('.portfolio-details__overlay').addClass('animated slideInDown').one(App.variables.animationEnd, function () {
          App.dom.pageBody.addClass('body--prevent-scrolling');
          $(this).css('overflow-y', 'auto');
        });
      }

      App.setBrowserHistory(tag);
      $('.portfolio-details__close-button, .portfolio-details__button--close').on('click', function () {
        return App.closeProjectDetails(id);
      });
    },
    closeProjectDetails: function closeProjectDetails(id) {
      App.dom.pageBody.removeClass('body--prevent-scrolling');
      $('.portfolio-details__overlay').css('overflow-y', 'hidden');
      App.scrollBackToProject(id);
      $('.portfolio-details__close-button, .portfolio-details__button--close').off('click'); //checking window width to decide which animation to use!

      if (App.variables.windowWidth < 992) {
        $('.portfolio-details__overlay').addClass('animated slideOutRight').one(App.variables.animationEnd, function () {
          $(this).remove();
        });
      } else {
        $('.portfolio-details__overlay').addClass('animated slideOutUp').one(App.variables.animationEnd, function () {
          $(this).remove();
        });
      } //setting the flag undefined so that popstate only calls this function when neccessary


      App.variables.historyFlag = undefined;
    },
    scrollBackToProject: function scrollBackToProject(viewedProject) {
      // this function scrolls the body back to the last clicked Project, after the overlay has been closed
      $('html, body').scrollTop($('#' + viewedProject + '').offset().top - (App.variables.navbarHeight - 1));
    },
    //resetting the form input after submit or when a SPAM bot was trying to submit
    resetContactForm: function resetContactForm() {
      App.dom.contactForm.trigger('reset');
      App.dom.formGroups.each(function () {
        $(this).removeClass('has-success has-error has-feedback');
      });
      $('form span.glyphicon').removeClass('glyphicon-remove glyphicon-ok');
    },
    //Using jQuery validate plugin combined with bootstrap error classes
    formValidation: function formValidation() {
      App.dom.contactForm.validate({
        errorPlacement: function errorPlacement(error, element) {
          // Add the Bootstrap `help-block` class to the error element
          error.addClass("help-block");
          error.insertBefore(element); // Add the span element, if doesn't exists, and apply the icon classes to it.

          if (!element.next("span")[0]) {
            $("<span class='glyphicon glyphicon-remove form-control-feedback'></span>").insertAfter(element);
          }
        },
        highlight: function highlight(element, errorClass, validClass) {
          $(element).parents(".form-group").addClass("has-error has-feedback").removeClass("has-success");
          $(element).next("span").addClass("glyphicon-remove").removeClass("glyphicon-ok");
        },
        unhighlight: function unhighlight(element, errorClass, validClass) {
          $(element).parents(".form-group").addClass("has-success has-feedback").removeClass("has-error");
          $(element).next("span").addClass("glyphicon-ok").removeClass("glyphicon-remove");
        },
        submitHandler: function submitHandler(form, e) {
          e.preventDefault();

          if (App.dom.hiddenField.val().length > 0) {
            App.resetContactForm();
            return false;
          } else {
            $.post(App.dom.contactForm.attr("action"), App.dom.contactForm.serialize()).then(function () {
              App.dom.submitModal.modal();
            });
          }
        }
      });
    }
  }; // App

  $(document).ready(function () {
    App.init();
  });
});