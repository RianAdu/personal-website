var projectTemplate = '<div class="portfolio-details__overlay"><article class="portfolio-details__wrapper"><section class="portfolio-details"><div class="container">'+
'<div class="row"><div class="portfolio-details__description col-xs-12 text-center"><span class="portfolio-details__close-button lnr lnr-cross"></span>'+
'<h2 class="portfolio-details__description-title">{{{title}}}</h2><p class="portfolio-details__description-copy">{{{copy}}}</p>'+
'<h3 class="portfolio-details__description-subheader">Technologies</h3><p class="portfolio-details__description-technologies">{{#technologies}}'+
'{{.}}{{/technologies}}</p></div> </div> </div><div class="portfolio-details__images-wrapper"><div class="container"><div class="row">'+
'<div class="portfolio-details__images col-xs-12"><picture><!--[if gte IE 9]><video style="display: none;"><![endif]-->'+
'<source srcset="img/projects/{{id}}/{{id}}_details@3.png" media="(min-width: 768px)">'+
'<source srcset="img/projects/{{id}}/{{id}}_details@2.png" media="(min-width: 200px)">'+
'<!--[if gte IE 9]></video><![endif]-->'+
'<img class="img-responsive" src="img/projects/{{id}}/{{id}}_details@3.png" srcset="img/projects/{{id}}/{{id}}_details@3.png" alt="{{alt}}">'+
'</picture><div class="portfolio-details__button-wrapper">'+
'<a href="{{{url}}}" target="_blank" class="portfolio-details__button portfolio-details__button--first btn-custom btn">Visit website</a>'+
'<button class="portfolio-details__button portfolio-details__button--close btn-custom btn"> Close project</button></div></div></div></div></div></section> </article></div>';