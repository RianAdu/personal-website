
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
}

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
}

$('.show-more').on('click', showProjectDetails);