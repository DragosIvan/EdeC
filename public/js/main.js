$(document).ready(function() {

	var windowHeight = $(window).height() - 200;

	if ($('.main-wrapper').height() < windowHeight) $('.main-wrapper').css('height', windowHeight);

});