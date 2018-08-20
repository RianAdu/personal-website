
function animatedScroll (){
  $('a[href^="#"]').on('click', function(e){
    var navbar = 65;
    var target = $( $(this).attr('href') );
    var hashTag = this.hash;
      
    if(target.length){
      e.preventDefault();
      
      //close mobile menu
      if($( window ).width() < 768) {
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
  console.log('hashID: '+hashID);
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

$(document).ready(function(){
  animatedScroll();
  $('.show-more').on('click', showProjectDetails);
});
