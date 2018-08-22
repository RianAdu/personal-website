
function animatedScroll (){
  $('a[href^="#"]').on('click', function(e){
    var navbar = 65;
    var target = $($(this).attr('href'));
    var dataTag = $(this).attr('data-tag');
    var hashTag = this.hash;

    if(target.length){
      e.preventDefault();
      
      //close mobile menu only when nav menu link was clicked
      if($(window).width() < 768 && dataTag == undefined) {
        $('.navbar-toggle').click();
      }

      $('html, body').animate({
        scrollTop: target.offset().top - (navbar - 1)
      }, 1100);
    }

    setBrowserHistory(hashTag);
  });
} //animatedScroll

function setBrowserHistory(hashID){
  var tmp = hashID.split('#');
  var section = tmp[1];

  //setting the history in case the user hits the back button
  if(history.pushState) {
    history.pushState(null, null, null);
  }
  else {
    location.hash = section;
  }
} //setBrowserHistory



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
  animatedScroll();
  $('.show-more').on('click', showProjectDetails);
  $(window).scroll(parallax);
});
