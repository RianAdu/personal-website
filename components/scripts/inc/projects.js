
/*********************
PROJECT DETAILS JSON
**********************/

var projectObject = [{
	"medicare": {
		"id": "medicare",
		"title": "Medicare Hamburg",
		"copy": "<p class='portfolio-details__description-copy'>I developed this website using WordPress. Not only did it speed up my development process, but it also gave my client the possibility to easily update their websites content on their own.</p>",
		"technologies": ["html", "css", "javascript", "wordpress", "php"],
		"getImages": function(){
			var imgCount = 3;
			var markup = '';	
			for(var i = 1; i <=imgCount; i++){
				markup +=  '<picture><!--[if gte IE 9]><video style="display: none;"><![endif]--><source media="(min-width: 1200px)" srcset="img/projects/'+this.id+'/'+this.id+'_details_'+i+'_lg_1x.jpg 1x, img/projects/'+this.id+'/'+this.id+'_details_'+i+'_lg_2x.jpg 2x, img/projects/'+this.id+'/'+this.id+'_details_'+i+'_lg_3x.jpg 3x"><source media="(min-width: 992px)" srcset="img/projects/'+this.id+'/'+this.id+'_details_'+i+'_md_1x.jpg 1x, img/projects/'+this.id+'/'+this.id+'_details_'+i+'_md_2x.jpg 2x, img/projects/'+this.id+'/'+this.id+'_details_'+i+'_md_3x.jpg 3x"> <source media="(min-width: 481px)" srcset="img/projects/'+this.id+'/'+this.id+'_details_'+i+'_sm_1x.jpg 1x, img/projects/'+this.id+'/'+this.id+'_details_'+i+'_sm_2x.jpg 2x, img/projects/'+this.id+'/'+this.id+'_details_'+i+'_sm_3x.jpg 3x"><!--[if gte IE 9]></video><![endif]--><img class="img-responsive portfolio-details__images" srcset="img/projects/'+this.id+'/'+this.id+'_details_'+i+'_xs_1x.jpg 1x, img/projects/'+this.id+'/'+this.id+'_details_'+i+'_xs_2x.jpg 2x, img/projects/'+this.id+'/'+this.id+'_details_'+i+'_xs_3x.jpg 3x" alt="'+this.alt+'" src="img/projects/'+this.id+'/'+this.id+'_details_'+i+'_xs_2x.jpg"></picture>';
			}
			return markup;
		},
		"setTechnologies": function(){
			var technologies = '';
			for(var i=0; i < this.technologies.length; i++) {
				technologies += '<div class="portfolio-details__technology-icon-wrap"><img class="portfolio-details__technology-icon " src="img/technology_icons/'+this.technologies[i]+'.svg" alt="'+this.technologies[i]+'"></div>';
			}
			return technologies;
		},
		"url": "http://www.medicare-hamburg.de",
		"alt": "Medicare Hamburg"
	},

	"cdss": {
		"id": "cdss",
		"title": "Anything But Sorry",
		"copy": "<p class='portfolio-details__description-copy'>While working for FCB Canada, I was assigned with the task of building this website from ground up. By being the only developer in a team of talented individuals, I managed to create an exceptional website for an <span class='text-nowrap'>award-winning</span> <span class='text-nowrap'>digital marketing campaign.<span></p><p class='portfolio-details__description-copy'>The combination of intuitive user experience, lightbox video implementation and an easy to use share functionality helped to generate an estimated 1.23 million views, 41.8 thousand social media shares.<br /> The campaign was awarded with <a target='_blank' href='https://www.oneclub.org/awards/theoneshow/-award/30993/anything-but-sorry' class='portfolio-details__description-link'>Gold at the \"The One Show awards\"</a> and <a target='_blank' href='https://clios.com/awards/winner/public-relations/down-syndrome-awareness/anything-but-sorry-38068' class='portfolio-details__description-link'>Bronze at the <span class='text-nowrap'>\"Clio Awards\"</span></a>.</p>",
		"technologies": ["html", "css", "javascript", "jquery", "bootstrap"],
		
		"getImages": function(){
			var imgCount = 4;
			var markup = '';	
			for(var i = 1; i <=imgCount; i++){ 
				markup +=  '<picture><!--[if gte IE 9]><video style="display: none;"><![endif]--><source media="(min-width: 1200px)" srcset="img/projects/'+this.id+'/'+this.id+'_details_'+i+'_lg_1x.jpg 1x, img/projects/'+this.id+'/'+this.id+'_details_'+i+'_lg_2x.jpg 2x, img/projects/'+this.id+'/'+this.id+'_details_'+i+'_lg_3x.jpg 3x"><source media="(min-width: 992px)" srcset="img/projects/'+this.id+'/'+this.id+'_details_'+i+'_md_1x.jpg 1x, img/projects/'+this.id+'/'+this.id+'_details_'+i+'_md_2x.jpg 2x, img/projects/'+this.id+'/'+this.id+'_details_'+i+'_md_3x.jpg 3x"> <source media="(min-width: 481px)" srcset="img/projects/'+this.id+'/'+this.id+'_details_'+i+'_sm_1x.jpg 1x, img/projects/'+this.id+'/'+this.id+'_details_'+i+'_sm_2x.jpg 2x, img/projects/'+this.id+'/'+this.id+'_details_'+i+'_sm_3x.jpg 3x"><!--[if gte IE 9]></video><![endif]--><img class="img-responsive portfolio-details__images" srcset="img/projects/'+this.id+'/'+this.id+'_details_'+i+'_xs_1x.jpg 1x, img/projects/'+this.id+'/'+this.id+'_details_'+i+'_xs_2x.jpg 2x, img/projects/'+this.id+'/'+this.id+'_details_'+i+'_xs_3x.jpg 3x" alt="'+this.alt+'" src="img/projects/'+this.id+'/'+this.id+'_details_'+i+'_xs_2x.jpg"></picture>';
			}
			return markup;
		},
		"setTechnologies": function(){
			var technologies = '';
			for(var i=0; i < this.technologies.length; i++) {
				technologies += '<div class="portfolio-details__technology-icon-wrap"><img class="portfolio-details__technology-icon " src="img/technology_icons/'+this.technologies[i]+'.svg" alt="'+this.technologies[i]+'"></div>';
			}
			return technologies;
		},
		"url": "http://anythingbutsorry.com",
		"alt": "Canadian Down Syndrome Society - Anything But Sorry Campaign"
	}
}];