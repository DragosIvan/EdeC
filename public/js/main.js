$(document).ready(function() {

	// START GENERAL JS //
	// setTimeout(function() {
		var windowHeight = $(window).height() - 220;	

		if ($('.main-wrapper').height() < windowHeight) {
			$('.main-wrapper').css('height', windowHeight);
			$('.main-wrapper').addClass('adjusted-height');
		}

		$('.slider-arrow').css('left', ($('.active-nav').width()/2 - 15)*$('.active-nav').data('nav'));

		$('.main-wrapper').css('visibility', 'visible');
	// }, 500)

	$(window).on('resize', function() {
		var windowHeight = $(window).height() - 220;	

		if ($('.main-wrapper').height() < windowHeight) $('.main-wrapper').css('height', windowHeight);
		$('.slider-arrow').css('left', ($('.active-nav').width()/2 - 15)*$('.active-nav').data('nav'));
	})
	// END GENERAL JS //

// ######################################################################################################################################

	// START REGISTRATION PAGE JS //
	$('.homepage-slider-nav').on('click', function() {
		if (!$('.active-slide').hasClass('slide-' + $(this).data('nav'))) {
			$('.active-slide').fadeOut(500);
			var slideNumber = $(this).data('nav');
			setTimeout(function() {
				$('.active-slide').removeClass('active-slide');
				$('.slide-' + slideNumber).fadeIn(500);
			}, 500);
			setTimeout(function() {	
				$('.slide-' + slideNumber).addClass('active-slide');
			}, 1000);

			$('.slider-arrow').animate({
				left: ($('.active-nav').width()/2 - 15) + $('.active-nav').width()*(slideNumber-1)
			}, 750);
		}

	});
	// END GENERAL JS //

// ######################################################################################################################################

	// START REGISTRATION PAGE JS //
	var error = '<div class="error-message"><ul>';

	$('.go-to-optional-registration').on('click', function() {
		var r = '.register-form .registration-mandatory ';
		if ($(r+'#password').val() != $(r+'#repeat-password').val()) error += '<li>The two passwords do not match !</li>';
		$(r+'input').each(function(){
			if ($(this).val() == '') error += "<li>Please fill in all the required fields !</li>"
		});

		scrollToTop();
		
		if (error == '<div class="error-message"><ul>') {
			error = '';
			$('.registration-mandatory').fadeOut(500);
			setTimeout(function(){
				$('.registration-optional').fadeIn(500);
			}, 500)
		} else {
			error += "</ul></div>";
			$('.error-message').remove();
			$('.register-main-wrapper h2').before(error);
			if ($('.main-wrapper').hasClass('adjusted-height')) $('.main-wrapper').height(windowHeight + $('.error-message').height());
		}
	});

	$('.go-to-mandatory-registration').on('click', function() {
		error = '<div class="error-message"><ul>';
		scrollToTop();
		$('.registration-optional').fadeOut(500);
		setTimeout(function(){
			$('.registration-mandatory').fadeIn(500);
		}, 500)
	});	

	$('.submit-registration').on('click', function() {
		if (error == '') $('.register-form').submit();
		else {
			scrollToTop();
			$('.registration-optional').fadeOut(500);
			setTimeout(function(){
				$('.registration-mandatory').fadeIn(500);
			}, 500)
		}
	})
	// END REGISTRATION PAGE JS//

// ######################################################################################################################################
});

var timeOut;
function scrollToTop() {
  if (document.body.scrollTop != 0 || document.documentElement.scrollTop != 0){
    window.scrollBy(0, -50);
    timeOut = setTimeout('scrollToTop()', 10);
  } else clearTimeout(timeOut);
}