$(document).ready(function() {
	setTimeout(function() {
		var windowHeight = $(window).height() - 200;	

		if ($('.main-wrapper').height() < windowHeight) $('.main-wrapper').css('height', windowHeight);

		
		$('.slider-arrow').css('left', ($('.active-nav').width()/2 - 15)*$('.active-nav').data('nav'));

		// var logosWidth = 0;

		// jQuery.each($('.util-link img').width(), function(key, value) {
		// 	console.log(value)
		// })

		// console.log(logosWidth)
		// $('.util-link img').css('margin', '0 ' + $('.util-link').width() / 6)

		$('.main-wrapper').css('visibility', 'visible');
	}, 500)
});

$(window).on('load', function() {
	$('.main-wrapper').css('visibility', 'visible');
})