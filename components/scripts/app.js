const navbarHeight = 65;

function smoothScroll (){
  $('a[href^="#"]').on('click', function(e){
    var target = $($(this).attr('href'));
    var dataTag = $(this).attr('data-tag');
    var hashTag = this.hash;

    if(target.length){
      e.preventDefault();
      
      //close mobile menu before scrolling when nav menu link and brand logo was clicked
      if($(window).width() < 768 && dataTag == undefined || !$('.navbar-toggle').hasClass('collapsed') && dataTag == 'home') {
        $('.navbar-toggle').click();
      }

      $('html, body').animate({
        scrollTop: target.offset().top - (navbarHeight - 1)
      }, 1100);
    }
    setBrowserHistory(hashTag);
  });
} //smoothScroll


function setBrowserHistory(hashID){
  var page = hashID.split('#')[1];
  //setting the history in case the user hits the back button
  if(history.pushState) {
    history.pushState(null, null, null);
  }
  else {
    location.hash = page;
  }
} //setBrowserHistory

function fadeInNav() {
  var headerTitle = $('.header__title-name');
  var navbar = $('.navbar');
  var headerTitlePos = headerTitle.offset().top;

  $(window).scroll(function(){
    var wScroll = $(window).scrollTop();
    
    if(wScroll >= headerTitlePos - navbarHeight) {
      navbar.addClass('navbar-inverse--faded-in');
    }
    else {
      navbar.removeClass('navbar-inverse--faded-in');
    }
  });

  $(window).on('orientationchange', function(){
    headerTitlePos = headerTitle.offset().top;
  });
}

function fadeInMobileNav(){
  $('#mobile-nav').on('show.bs.collapse hide.bs.collapse', function(){
    if($(window).width() < 768) {
      $('.navbar').toggleClass('navbar-inverse--faded-in-mobile');
    }
  });
}



function showProjectDetails(){
  var clickedProject = $(this).parent().parent().parent().attr('id');
  var detailsMarkup;
  $('.portfolio-details__overlay').remove();
  
  for(var i in projectObject){
    var projects = projectObject[i];
    for(var x in projects){
      var project = projects[x];

      if(x == clickedProject){
        detailsMarkup = Mustache.render(projectTemplate, project);
      }// end of if-clause
    } // end of 2nd for-loop
  } // end of 1st for-loop
  console.log(detailsMarkup);
  finalizeDetails(detailsMarkup);
} //showProjectDetails

function finalizeDetails(detailView){
  $('body').css('overflow','hidden');
  
  $('body').prepend(detailView);
  $('.portfolio-details__overlay').fadeIn('slow');
  $('.portfolio-details__close-button, .portfolio-details__button--close').on('click', function(){
    //return Rian.closeDetails(id);
    $('body').css('overflow','scroll');
    $('.portfolio-details__close-button, .portfolio-details__button--close').off('click');
    $('.portfolio-details__overlay').fadeOut('slow', function(){
      $(this).remove();
    });  
  });
} //finalizeDetails

function parallax() {
  var wScroll = $(window).scrollTop();
  $('.parallax--bg').css('background-position', 'center '+(wScroll * 0.5 )+'px');
}

$(document).ready(function(){
  smoothScroll();
  $('.show-more').on('click', showProjectDetails);
  fadeInNav();
  fadeInMobileNav();
  $(window).scroll(parallax)
});
