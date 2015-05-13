$(document).ready(function() {

	// START GENERAL JS //
	setTimeout(function() {
		var windowHeight = $(window).height() - 200;	

		if ($('.main-wrapper').height() < windowHeight) $('.main-wrapper').css('height', windowHeight);

		$('.slider-arrow').css('left', ($('.active-nav').width()/2 - 15)*$('.active-nav').data('nav'));

		$('.main-wrapper').css('visibility', 'visible');
	}, 500)

	$(window).on('resize', function() {
		var windowHeight = $(window).height() - 200;	

		if ($('.main-wrapper').height() < windowHeight) $('.main-wrapper').css('height', windowHeight);
	})
	// END GENERAL JS //



	// START REGISTRATION PAGE JS //
	$('.go-to-optional-registration').on('click', function() {
		scrollToTop();
		$('.registration-mandatory').fadeOut(500);
		setTimeout(function(){
			$('.registration-optional').fadeIn(500);
		}, 500)
	});

	$('.go-to-mandatory-registration').on('click', function() {
		scrollToTop();
		$('.registration-optional').fadeOut(500);
		setTimeout(function(){
			$('.registration-mandatory').fadeIn(500);
		}, 500)
	});	

	$('.submit-registration').on('click', function() {
		$('.register-form').submit();
	})
	// END REGISTRATION PAGE JS//
});

var timeOut;
function scrollToTop() {
  if (document.body.scrollTop != 0 || document.documentElement.scrollTop != 0){
    window.scrollBy(0, -50);
    timeOut = setTimeout('scrollToTop()', 10);
  } else clearTimeout(timeOut);
}