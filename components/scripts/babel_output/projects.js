"use strict";

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/*********************
PROJECT DETAILS JSON
**********************/
var projectObject = [{
  cdss: {
    id: 'cdss',
    title: 'Anything But Sorry',
    copy: "<p class='portfolio-details__description-copy'>While working for FCB Canada, I was assigned with the task of building this website from the ground up. Being the only developer in a team of talented individuals, I managed to create an exceptional website for an <span class='text-nowrap'>award-winning</span> <span class='text-nowrap'>digital marketing campaign.<span></p><p class='portfolio-details__description-copy'>The combination of intuitive user experience, lightbox video implementation and an easy to use share functionality helped to generate an estimated <span class='text-nowrap'>1.23 million</span> views and <span class='text-nowrap'>41.8 thousand</span> social media shares.<br /> The campaign was awarded <a target='_blank' href='https://www.oneclub.org/awards/theoneshow/-award/30993/anything-but-sorry' class='portfolio-details__description-link'>Gold at The One Show Awards</a> and <a target='_blank' href='https://clios.com/awards/winner/public-relations/down-syndrome-awareness/anything-but-sorry-38068' class='portfolio-details__description-link'>Bronze at the <span class='text-nowrap'>Clio Awards</span></a>.</p>",
    technologies: ['html', 'css', 'javascript', 'jquery', 'bootstrap'],
    getImages: function getImages() {
      var imgCount = 4;
      var markup = '';

      for (var i = 1; i <= imgCount; i++) {
        markup += "\n\t\t\t\t<picture>\n\t\t\t\t\t<!--[if gte IE 9]><video style=\"display: none;\">\n\t\t\t\t\t<![endif]-->\n\t\t\t\t\t<source media=\"(min-width: 1200px)\" srcset=\"img/".concat(this.id, "/").concat(this.id, "_details_").concat(i, "_lg_1x.jpg 1x,\n\t\t\t\t\timg/").concat(this.id, "/").concat(this.id, "_details_").concat(i, "_lg_2x.jpg 2x,\n\t\t\t\t\timg/").concat(this.id, "/").concat(this.id, "_details_").concat(i, "_lg_3x.jpg 3x\">\n\t\t\t\t\t<source media=\"(min-width: 992px)\" srcset=\"img/").concat(this.id, "/").concat(this.id, "_details_").concat(i, "_md_1x.jpg 1x,\n\t\t\t\t\timg/").concat(this.id, "/").concat(this.id, "_details_").concat(i, "_md_2x.jpg 2x,\n\t\t\t\t\timg/").concat(this.id, "/").concat(this.id, "_details_").concat(i, "_md_3x.jpg 3x\">\n\t\t\t\t\t<source media=\"(min-width: 481px)\" srcset=\"img/").concat(this.id, "/").concat(this.id, "_details_").concat(i, "_sm_1x.jpg 1x,\n\t\t\t\t\timg/").concat(this.id, "/").concat(this.id, "_details_").concat(i, "_sm_2x.jpg 2x,\n\t\t\t\t\timg/").concat(this.id, "/").concat(this.id, "_details_").concat(i, "_sm_3x.jpg 3x\">\n\t\t\t\t\t<!--[if gte IE 9]></video>\n\t\t\t\t\t<![endif]-->\n\t\t\t\t\t<img class=\"img-responsive portfolio-details__image\" srcset=\"img/").concat(this.id, "/").concat(this.id, "_details_").concat(i, "_xs_1x.jpg 1x,\n\t\t\t\t\timg/").concat(this.id, "/").concat(this.id, "_details_").concat(i, "_xs_2x.jpg 2x,\n\t\t\t\t\timg/").concat(this.id, "/").concat(this.id, "_details_").concat(i, "_xs_3x.jpg 3x\" alt=\"").concat(this.alt, "\" src=\"img/").concat(this.id, "/").concat(this.id, "_details_").concat(i, "_xs_2x.jpg\">\n\t\t\t\t</picture>");
      }

      return markup;
    },
    setTechnologies: function setTechnologies() {
      var techStack = '';

      var _iterator = _createForOfIteratorHelper(this.technologies),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          language = _step.value;
          techStack += "\n\t\t\t\t<div class=\"portfolio-details__technology-icon-wrap\">\n\t\t\t\t\t<img class=\"portfolio-details__technology-icon\" src=\"img/technology_icons/".concat(language, ".svg\" alt=\"").concat(language, "\">\n\t\t\t\t</div>\n\t\t\t\t");
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return techStack;
    },
    url: 'https://anythingbutsorry.com',
    alt: 'Canadian Down Syndrome Society - Anything But Sorry Campaign'
  },
  medicare: {
    id: 'medicare',
    title: 'Medicare Hamburg',
    copy: "<p class='portfolio-details__description-copy'>I was approached by Medicare to build a modern, responsive website for them. Taking the lead on the project, I planned all development stages and discussed specific feature requirements in advance with my client. In addition, I helped to determine visual assets like stock photos that would best communicate their core values.</p><p class='portfolio-details__description-copy'>I built the site with WordPress by creating a complete customized child theme and setting up supplemental plugins for SEO and page speed optimization. Not only was this approach cost and time efficient, but it also gave my client an easy to use website that allowed them to edit content on their own.</p>",
    technologies: ['html', 'css', 'javascript', 'php', 'wordpress'],
    getImages: function getImages() {
      var imgCount = 3;
      var markup = '';

      for (var i = 1; i <= imgCount; i++) {
        markup += "\n\t\t\t\t<picture>\n\t\t\t\t\t<!--[if gte IE 9]><video style=\"display: none;\">\n\t\t\t\t\t<![endif]-->\n\t\t\t\t\t<source media=\"(min-width: 1200px)\" srcset=\"img/".concat(this.id, "/").concat(this.id, "_details_").concat(i, "_lg_1x.jpg 1x,\n\t\t\t\t\timg/").concat(this.id, "/").concat(this.id, "_details_").concat(i, "_lg_2x.jpg 2x,\n\t\t\t\t\timg/").concat(this.id, "/").concat(this.id, "_details_").concat(i, "_lg_3x.jpg 3x\">\n\t\t\t\t\t<source media=\"(min-width: 992px)\" srcset=\"img/").concat(this.id, "/").concat(this.id, "_details_").concat(i, "_md_1x.jpg 1x,\n\t\t\t\t\timg/").concat(this.id, "/").concat(this.id, "_details_").concat(i, "_md_2x.jpg 2x,\n\t\t\t\t\timg/").concat(this.id, "/").concat(this.id, "_details_").concat(i, "_md_3x.jpg 3x\">\n\t\t\t\t\t<source media=\"(min-width: 481px)\" srcset=\"img/").concat(this.id, "/").concat(this.id, "_details_").concat(i, "_sm_1x.jpg 1x,\n\t\t\t\t\timg/").concat(this.id, "/").concat(this.id, "_details_").concat(i, "_sm_2x.jpg 2x,\n\t\t\t\t\timg/").concat(this.id, "/").concat(this.id, "_details_").concat(i, "_sm_3x.jpg 3x\">\n\t\t\t\t\t<!--[if gte IE 9]></video>\n\t\t\t\t\t<![endif]-->\n\t\t\t\t\t<img class=\"img-responsive portfolio-details__image\" srcset=\"img/").concat(this.id, "/").concat(this.id, "_details_").concat(i, "_xs_1x.jpg 1x,\n\t\t\t\t\timg/").concat(this.id, "/").concat(this.id, "_details_").concat(i, "_xs_2x.jpg 2x,\n\t\t\t\t\timg/").concat(this.id, "/").concat(this.id, "_details_").concat(i, "_xs_3x.jpg 3x\" alt=\"").concat(this.alt, "\" src=\"img/").concat(this.id, "/").concat(this.id, "_details_").concat(i, "_xs_2x.jpg\">\n\t\t\t\t</picture>");
      }

      return markup;
    },
    setTechnologies: function setTechnologies() {
      var techStack = '';

      var _iterator2 = _createForOfIteratorHelper(this.technologies),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          language = _step2.value;
          techStack += "\n\t\t\t\t<div class=\"portfolio-details__technology-icon-wrap\">\n\t\t\t\t\t<img class=\"portfolio-details__technology-icon\" src=\"img/technology_icons/".concat(language, ".svg\" alt=\"").concat(language, "\">\n\t\t\t\t</div>\n\t\t\t\t");
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      return techStack;
    },
    url: 'https://www.medicare-hamburg.de',
    alt: 'Medicare Hamburg'
  },
  s2g: {
    id: 's2g',
    title: 'Solutions 2 GO',
    copy: "<p class='portfolio-details__description-copy'>The Solutions 2 GO website had been completely redesigned, optimized and modernized, and the company was in need for a web developer who would not only build the website but could also support them in creating a more intuitive user experience. </p><p class='portfolio-details__description-copy'>The company found me and my services through recommendation. During the development process I worked closely together with the Director of Strategic Initiatives and the Marketing Designer. It was a very collaborative and communicative process which was essential in creating new ideas and setting functional requirements. The end result was a professional, intuitive and visually compelling <span class='text-nowrap'>responsive website.</span></p>",
    technologies: ['html', 'css', 'javascript', 'php', 'bootstrap', 'jquery'],
    getImages: function getImages() {
      var imgCount = 3;
      var markup = '';

      for (var i = 1; i <= imgCount; i++) {
        markup += "\n\t\t\t\t<picture>\n\t\t\t\t\t<!--[if gte IE 9]><video style=\"display: none;\">\n\t\t\t\t\t<![endif]-->\n\t\t\t\t\t<source media=\"(min-width: 1200px)\" srcset=\"img/".concat(this.id, "/").concat(this.id, "_details_").concat(i, "_lg_1x.jpg 1x,\n\t\t\t\t\timg/").concat(this.id, "/").concat(this.id, "_details_").concat(i, "_lg_2x.jpg 2x,\n\t\t\t\t\timg/").concat(this.id, "/").concat(this.id, "_details_").concat(i, "_lg_3x.jpg 3x\">\n\t\t\t\t\t<source media=\"(min-width: 992px)\" srcset=\"img/").concat(this.id, "/").concat(this.id, "_details_").concat(i, "_md_1x.jpg 1x,\n\t\t\t\t\timg/").concat(this.id, "/").concat(this.id, "_details_").concat(i, "_md_2x.jpg 2x,\n\t\t\t\t\timg/").concat(this.id, "/").concat(this.id, "_details_").concat(i, "_md_3x.jpg 3x\">\n\t\t\t\t\t<source media=\"(min-width: 481px)\" srcset=\"img/").concat(this.id, "/").concat(this.id, "_details_").concat(i, "_sm_1x.jpg 1x,\n\t\t\t\t\timg/").concat(this.id, "/").concat(this.id, "_details_").concat(i, "_sm_2x.jpg 2x,\n\t\t\t\t\timg/").concat(this.id, "/").concat(this.id, "_details_").concat(i, "_sm_3x.jpg 3x\">\n\t\t\t\t\t<!--[if gte IE 9]></video>\n\t\t\t\t\t<![endif]-->\n\t\t\t\t\t<img class=\"img-responsive portfolio-details__image\" srcset=\"img/").concat(this.id, "/").concat(this.id, "_details_").concat(i, "_xs_1x.jpg 1x,\n\t\t\t\t\timg/").concat(this.id, "/").concat(this.id, "_details_").concat(i, "_xs_2x.jpg 2x,\n\t\t\t\t\timg/").concat(this.id, "/").concat(this.id, "_details_").concat(i, "_xs_3x.jpg 3x\" alt=\"").concat(this.alt, "\" src=\"img/").concat(this.id, "/").concat(this.id, "_details_").concat(i, "_xs_2x.jpg\">\n\t\t\t\t</picture>");
      }

      return markup;
    },
    setTechnologies: function setTechnologies() {
      var techStack = '';

      var _iterator3 = _createForOfIteratorHelper(this.technologies),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          language = _step3.value;
          techStack += "\n\t\t\t\t<div class=\"portfolio-details__technology-icon-wrap\">\n\t\t\t\t\t<img class=\"portfolio-details__technology-icon\" src=\"img/technology_icons/".concat(language, ".svg\" alt=\"").concat(language, "\">\n\t\t\t\t</div>\n\t\t\t\t");
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }

      return techStack;
    },
    url: 'https://www.solutions2go.ca',
    alt: 'Solutions 2 GO'
  }
}];