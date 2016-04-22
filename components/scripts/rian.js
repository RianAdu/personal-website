//require jQuery
var $ = require('jquery');

//show window width
$(window).on('resize', function(){
	var width = $(window).width();
	$('.showSize').text(width);
});

//show mobile Menu function
$('#mobileMenuIcon').on('click', function(){
	$('#mobileDropDown').slideToggle();
});
