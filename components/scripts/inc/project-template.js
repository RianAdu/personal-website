var projectTemplate = '<div class="portfolio-details__overlay"><article class="portfolio-details__wrapper"><section class="portfolio-details"><div class="container">'+
'<div class="row"><div class="portfolio-details__description col-xs-12 col-md-9"><span class="portfolio-details__close-button lnr lnr-cross"></span>'+
'<h2 class="portfolio-details__description-title">{{{title}}}</h2>{{{copy}}}'+
'<h3 class="portfolio-details__description-subheader">Technologies</h3>{{{setTechnologies}}}</div> </div> </div><div class="portfolio-details__images-wrapper"><div class="container"><div class="row">'+
'<div class="portfolio-details__images col-xs-12">{{{getImages}}}<div class="portfolio-details__button-wrapper">'+
'<a href="{{{url}}}" target="_blank" class="portfolio-details__button portfolio-details__button--first btn-custom btn">Visit website</a>'+
'<button class="portfolio-details__button portfolio-details__button--close btn-custom btn"> Close project</button></div></div></div></div></div></section> </article></div>';