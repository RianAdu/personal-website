/*********************
PROJECT DETAILS JSON
**********************/

const projectObject = [{
	"cdss": {
		"id": "cdss",
		"title": "Anything But Sorry",
		"copy": "<p class='portfolio-details__description-copy'>While working for FCB Canada, I was assigned with the task of building this website from the ground up. Being the only developer in a team of talented individuals, I managed to create an exceptional website for an <span class='text-nowrap'>award-winning</span> <span class='text-nowrap'>digital marketing campaign.<span></p><p class='portfolio-details__description-copy'>The combination of intuitive user experience, lightbox video implementation and an easy to use share functionality helped to generate an estimated <span class='text-nowrap'>1.23 million</span> views and <span class='text-nowrap'>41.8 thousand</span> social media shares.<br /> The campaign was awarded <a target='_blank' href='https://www.oneclub.org/awards/theoneshow/-award/30993/anything-but-sorry' class='portfolio-details__description-link'>Gold at The One Show Awards</a> and <a target='_blank' href='https://clios.com/awards/winner/public-relations/down-syndrome-awareness/anything-but-sorry-38068' class='portfolio-details__description-link'>Bronze at the <span class='text-nowrap'>Clio Awards</span></a>.</p>",
		"technologies": ["html", "css", "javascript", "jquery", "bootstrap"],

		"getImages": function() {
			const imgCount = 4;
			let markup = '';
			for (let i = 1; i <= imgCount; i++) {
				markup += `
				<picture>
					<!--[if gte IE 9]><video style="display: none;">
					<![endif]-->
					<source media="(min-width: 1200px)" srcset="img/${this.id}/${this.id}_details_${i}_lg_1x.jpg 1x,
					img/${this.id}/${this.id}_details_${i}_lg_2x.jpg 2x,
					img/${this.id}/${this.id}_details_${i}_lg_3x.jpg 3x">
					<source media="(min-width: 992px)" srcset="img/${this.id}/${this.id}_details_${i}_md_1x.jpg 1x,
					img/${this.id}/${this.id}_details_${i}_md_2x.jpg 2x,
					img/${this.id}/${this.id}_details_${i}_md_3x.jpg 3x">
					<source media="(min-width: 481px)" srcset="img/${this.id}/${this.id}_details_${i}_sm_1x.jpg 1x,
					img/${this.id}/${this.id}_details_${i}_sm_2x.jpg 2x,
					img/${this.id}/${this.id}_details_${i}_sm_3x.jpg 3x">
					<!--[if gte IE 9]></video>
					<![endif]-->
					<img class="img-responsive portfolio-details__image" srcset="img/${this.id}/${this.id}_details_${i}_xs_1x.jpg 1x,
					img/${this.id}/${this.id}_details_${i}_xs_2x.jpg 2x,
					img/${this.id}/${this.id}_details_${i}_xs_3x.jpg 3x" alt="${this.alt}" src="img/${this.id}/${this.id}_details_${i}_xs_2x.jpg">
				</picture>`;
			}
			return markup;
		},
		"setTechnologies": function() {
			let techStack = '';

			for(language of this.technologies) {
				techStack += `
				<div class="portfolio-details__technology-icon-wrap">
					<img class="portfolio-details__technology-icon" src="img/technology_icons/${language}.svg" alt="${language}">
				</div>
				`;
			}
			return techStack;
		},
		"url": "https://anythingbutsorry.com",
		"alt": "Canadian Down Syndrome Society - Anything But Sorry Campaign"
	},

	"medicare": {
		"id": "medicare",
		"title": "Medicare Hamburg",
		"copy": "<p class='portfolio-details__description-copy'>I was approached by Medicare to build a modern, responsive website for them. Taking the lead on the project, I planned all development stages and discussed specific feature requirements in advance with my client. In addition, I helped to determine visual assets like stock photos that would best communicate their core values.</p><p class='portfolio-details__description-copy'>I built the site with WordPress by creating a complete customized child theme and setting up supplemental plugins for SEO and page speed optimization. Not only was this approach cost and time efficient, but it also gave my client an easy to use website that allowed them to edit content on their own.</p>",
		"technologies": ["html", "css", "javascript", "php", "wordpress"],
		"getImages": function() {
			const imgCount = 3;
			let markup = '';
			for (let i = 1; i <= imgCount; i++) {
				markup += `
				<picture>
					<!--[if gte IE 9]><video style="display: none;">
					<![endif]-->
					<source media="(min-width: 1200px)" srcset="img/${this.id}/${this.id}_details_${i}_lg_1x.jpg 1x,
					img/${this.id}/${this.id}_details_${i}_lg_2x.jpg 2x,
					img/${this.id}/${this.id}_details_${i}_lg_3x.jpg 3x">
					<source media="(min-width: 992px)" srcset="img/${this.id}/${this.id}_details_${i}_md_1x.jpg 1x,
					img/${this.id}/${this.id}_details_${i}_md_2x.jpg 2x,
					img/${this.id}/${this.id}_details_${i}_md_3x.jpg 3x">
					<source media="(min-width: 481px)" srcset="img/${this.id}/${this.id}_details_${i}_sm_1x.jpg 1x,
					img/${this.id}/${this.id}_details_${i}_sm_2x.jpg 2x,
					img/${this.id}/${this.id}_details_${i}_sm_3x.jpg 3x">
					<!--[if gte IE 9]></video>
					<![endif]-->
					<img class="img-responsive portfolio-details__image" srcset="img/${this.id}/${this.id}_details_${i}_xs_1x.jpg 1x,
					img/${this.id}/${this.id}_details_${i}_xs_2x.jpg 2x,
					img/${this.id}/${this.id}_details_${i}_xs_3x.jpg 3x" alt="${this.alt}" src="img/${this.id}/${this.id}_details_${i}_xs_2x.jpg">
				</picture>`;
			}
			return markup;
		},
		"setTechnologies": function() {
			let techStack = '';

			for(language of this.technologies) {
				techStack += `
				<div class="portfolio-details__technology-icon-wrap">
					<img class="portfolio-details__technology-icon" src="img/technology_icons/${language}.svg" alt="${language}">
				</div>
				`;
			}
			return techStack;
		},
		"url": "https://www.medicare-hamburg.de",
		"alt": "Medicare Hamburg"
	},
	"s2g": {
		"id": "s2g",
		"title": "Solutions 2 GO",
		"copy": "<p class='portfolio-details__description-copy'>The Solutions 2 GO website had been completely redesigned, optimized and modernized, and the company was in need for a web developer who would not only build the website but could also support them in creating a more intuitive user experience. </p><p class='portfolio-details__description-copy'>The company found me and my services through recommendation. During the development process I worked closely together with the Director of Strategic Initiatives and the Marketing Designer. It was a very collaborative and communicative process which was essential in creating new ideas and setting functional requirements. The end result was a professional, intuitive and visually compelling <span class='text-nowrap'>responsive website.</span></p>",
		"technologies": ["html", "css", "javascript", "php", "bootstrap", "jquery"],
		"getImages": function() {
			const imgCount = 3;
			let markup = '';
			for (let i = 1; i <= imgCount; i++) {
				markup += `
				<picture>
					<!--[if gte IE 9]><video style="display: none;">
					<![endif]-->
					<source media="(min-width: 1200px)" srcset="img/${this.id}/${this.id}_details_${i}_lg_1x.jpg 1x,
					img/${this.id}/${this.id}_details_${i}_lg_2x.jpg 2x,
					img/${this.id}/${this.id}_details_${i}_lg_3x.jpg 3x">
					<source media="(min-width: 992px)" srcset="img/${this.id}/${this.id}_details_${i}_md_1x.jpg 1x,
					img/${this.id}/${this.id}_details_${i}_md_2x.jpg 2x,
					img/${this.id}/${this.id}_details_${i}_md_3x.jpg 3x">
					<source media="(min-width: 481px)" srcset="img/${this.id}/${this.id}_details_${i}_sm_1x.jpg 1x,
					img/${this.id}/${this.id}_details_${i}_sm_2x.jpg 2x,
					img/${this.id}/${this.id}_details_${i}_sm_3x.jpg 3x">
					<!--[if gte IE 9]></video>
					<![endif]-->
					<img class="img-responsive portfolio-details__image" srcset="img/${this.id}/${this.id}_details_${i}_xs_1x.jpg 1x,
					img/${this.id}/${this.id}_details_${i}_xs_2x.jpg 2x,
					img/${this.id}/${this.id}_details_${i}_xs_3x.jpg 3x" alt="${this.alt}" src="img/${this.id}/${this.id}_details_${i}_xs_2x.jpg">
				</picture>`;
			}
			return markup;
		},
		"setTechnologies": function() {
			let techStack = '';
			for(language of this.technologies) {
				techStack += `
				<div class="portfolio-details__technology-icon-wrap">
					<img class="portfolio-details__technology-icon" src="img/technology_icons/${language}.svg" alt="${language}">
				</div>
				`;
			}
			return techStack;
		},
		"url": "https://www.solutions2go.ca",
		"alt": "Solutions 2 GO"
	}
}];

