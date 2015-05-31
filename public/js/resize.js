$(document).ready(function() {
	resizeWrapper();
	$('.slider-arrow').css('left', ($('.active-nav').width()/2 - 15)*$('.active-nav').data('nav'));
	setTimeout(function() {
		$('body').css('visibility', 'visible');
	}, 300);

	$(window).on('resize', function() {
		resizeWrapper();
		$('.slider-arrow').css('left', ($('.active-nav').width()/2 - 15)*$('.active-nav').data('nav'));
	})

	// var page = window.location.origin+"/products/";
	// var pageProduct = window.location.origin+"/product/";
	// var pageNumber = parseInt(window.location.href.split("/")[4]);
	// var address, pageNumberNext, pageNumberPrev;

	// pageNumberNext = pageNumber + 1;
	// address = page + pageNumberNext;
	// $('#products-next').attr('href', address);

	// pageNumberPrev = pageNumber - 1;
	// if (pageNumberPrev == 0) pageNumberPrev = 1;
	// address = page + pageNumberPrev;
	// $('#products-previous').attr('href', address);
})

function resizeWrapper() {
	var windowHeight = $(window).height()-180;
	$('.main-wrapper').css('min-height', windowHeight);
}