//require jQuery
var $ = require('jquery');

//show mobile Menu function
$('#menuIcon').on('click', function(){
	$('nav ul').slideToggle('slow');
});
