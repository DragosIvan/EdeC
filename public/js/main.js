// $( document ).ready( function() {

// 	var accordionCounter = 0;

// 	$( '#main-iframe-compare, #main-iframe-plan-details' ).on( 'click', '.column-row-accordion-toggle', function() {
// 			var target = $( this ).find('span span').data( 'toggle-id' );

// 			$( '.column-row-accordion-toggle' ).each( function(index) {
// 				if ( $( this ).find('span span').data( 'toggle-id' ) == target ) {
// 					if ( $( this ).find('.glyphicon').hasClass( 'glyphicon-plus' ) ) {
// 						$( this ).find('.glyphicon').removeClass( 'glyphicon-plus' );
// 						$( this ).find('.glyphicon').addClass( 'glyphicon-minus' );
// 					} else {
// 						$( this ).find('.glyphicon').removeClass( 'glyphicon-minus' );
// 						$( this ).find('.glyphicon').addClass( 'glyphicon-plus' );
// 					} 
// 				}
// 			});

// 			$( '.column-row-accordion' ).each( function(index) {
// 				if ( $( this ).data( 'toggle-accordion-id' ) ==  target )
// 					$( this ).slideToggle(200);
// 			});
// 	});

// 	$( '.expand-all-accordions' ).on( 'click', function() {
// 		$( '.column-row-accordion' ).slideDown(200);
// 		$( '.column-row-accordion-toggle' ).each( function(index) {
// 			if ( $( this ).find('.glyphicon').hasClass( 'glyphicon-plus' ) ) {
// 				$( this ).find('.glyphicon').removeClass( 'glyphicon-plus' );
// 				$( this ).find('.glyphicon').addClass( 'glyphicon-minus' );
// 			}
// 		});
// 	});

// 	$( '.contract-all-accordions' ).on( 'click', function() {
// 		$( '.column-row-accordion' ).slideUp(200);
// 		$( '.column-row-accordion-toggle' ).each( function(index) {
// 			if ( $( this ).find('.glyphicon').hasClass( 'glyphicon-minus' ) ) {
// 				$( this ).find('.glyphicon').removeClass( 'glyphicon-minus' );
// 				$( this ).find('.glyphicon').addClass( 'glyphicon-plus' );
// 			}
// 		});
// 	});

// 	setTimeout(function() {
// 		$( '.column-row' ).each( function(index) {
// 			$( this ).find('span').attr('title', $( this ).find('span:first-of-type').text());

// 			if ( $( this ).find('span:first-of-type').text().length >= 50 )
// 				$( this ).find('span:first-of-type').text($( this ).find('span:first-of-type').text().slice(0, 49) + '...');
// 		});

// 		$( '.column-row-title' ).each( function(index) {
// 			$( this ).find('span').attr('title', $( this ).find('span:first-of-type').text());

// 			if ( $( this ).find('span:first-of-type').text().length > 50 )
// 				$( this ).find('span:first-of-type').text($( this ).find('span:first-of-type').text().slice(0, 49) + '...');
// 		});


// 		$( '.compare-title-details-1' ).each( function(index) {
// 			$( this ).find('span').attr('title', $( this ).find('span:first-of-type').text());

// 			if ( $( this ).find('span').text().length > 45 )
// 				$( this ).find('span:first-of-type').text($( this ).find('span:first-of-type').text().slice(0, 44) + '...');
// 		});

// 		$( '.compare-title-details-2' ).each( function(index) {
// 			$( this ).find('span').attr('title', $( this ).find('span:first-of-type').text());

// 			if ( $( this ).find('span').text().length > 35 )
// 				$( this ).find('span:first-of-type').text($( this ).find('span:first-of-type').text().slice(0, 34) + '...');
// 		}); 

// 	}, 500);

// 	$( '#reset-prices' ).on( 'click', function() {
// 		$( '.offer-price' ).each( function(index) {
// 			$( this ).text('$' + (parseFloat($( this ).data('initial-price')).toFixed(2)));
// 		});

// 		$( '#subsidySection span').text('Want to know if you are subsidy eligible? - Click here to calculate.');
// 	});	

// 	$( '#subsidySection span' ).on( 'click', function() {
// 		$( '#subsidyModal' ).modal( 'show' );
// 	});

// 	$( '.second-btn-netw' ).on('click', function() {
// 		$( '.in-network-detail' ).css('display', 'none');
// 		$( '.out-network-detail' ).css('display', 'block');
// 	});

// 	$( '.first-btn-netw' ).on('click', function() {
// 		$( '.in-network-detail' ).css('display', 'block');
// 		$( '.out-network-detail' ).css('display', 'none');
// 	});

// /*****	plus-minus header icons		*****/
// 	$('body').on('click', '.options-list', function() {
// 		$('.options-list i').each(function() {
// 			if ($(this).hasClass('opened'))
// 				$(this).removeClass('opened');
// 		});

// 		$(this).find('i').addClass('opened');

// 		$('.options-list i').each(function() {
// 			if( $(this).hasClass('glyphicon-minus') && !$(this).hasClass('opened')) {
// 				$(this).removeClass('glyphicon-minus');
// 				$(this).addClass('glyphicon-plus');
// 			}
// 		});

// 		if( $(this).find('i').hasClass('glyphicon-plus') ) {
// 			$(this).find('i').removeClass('glyphicon-plus');
// 			$(this).find('i').addClass('glyphicon-minus');
// 		} else {
// 			$(this).find('i').removeClass('glyphicon-minus');
// 			$(this).find('i').addClass('glyphicon-plus');
// 		}
// 	});

// 	// filtering plans listed
// 	$( 'body' ).on( 'click' , '#filter-body label' , function() {
// 		if (!$('body').hasClass('loadingPlans')) {
// 			$('body').addClass('loadingPlans');

// 			var getCategoryTitle = $(this).attr('rel');
// 			var getCategoryValue = $(this).attr('id');

// 			$('#filter-body label').each(function() {
// 				if ( $(this).attr('id') != getCategoryValue )
// 					$(this).removeClass('crossed');
// 			});

// 			if ( $(this).hasClass('crossed') ) {
// 				$(this).removeClass('crossed');

// 				$(".offer-var").each(function() {
// 					$(this).css('display', 'block');
// 				});

// 				$('#search-no-results').removeClass('show-no-results').addClass('hide-no-results');
// 			} else {
// 				$(this).addClass('crossed');

// 				if ( getCategoryTitle == 'price-category' ) {
// 					var minPrice = getCategoryValue.split('-')[0];
// 					var maxPrice = getCategoryValue.split('-')[1];

// 					$(".offer-var").each(function() {
// 						$(this).css('display', 'block');

// 						if ( parseFloat($(this).attr('rel').split('&&')[0]) <= parseFloat(minPrice) ||  parseFloat($(this).attr('rel').split('&&')[0]) >= parseFloat(maxPrice) )
// 							$(this).css('display', 'none');
// 					});
// 				}
// 				else if ( getCategoryTitle == 'deductible-category' ) {
// 					var minDeductible = getCategoryValue.split('-')[0];
// 					var maxDeductible = getCategoryValue.split('-')[1];

// 					$(".offer-var").each(function() {
// 						$(this).css('display', 'block');

// 						if ( parseFloat($(this).attr('rel').split('&&')[1].replace(',', '')) < parseFloat(minDeductible) ||  parseFloat($(this).attr('rel').split('&&')[1].replace(',', '')) > parseFloat(maxDeductible) )
// 							$(this).css('display', 'none');
// 					});
// 				}
// 				else if ( getCategoryTitle == 'metal-category' ) {
// 					var metalType = getCategoryValue;

// 					$(".offer-var").each(function() {
// 						$(this).css('display', 'block');

// 						if ( $(this).attr('rel').split('&&')[2] != metalType)
// 							$(this).css('display', 'none');
// 					});
// 				}
// 				else if ( getCategoryTitle == 'coinsurance-category' ) {
// 					var coinsuranceCategory = getCategoryValue;

// 					$(".offer-var").each(function() {
// 						$(this).css('display', 'block');

// 						if ( parseFloat($(this).attr('rel').split('&&')[3]) != parseFloat(coinsuranceCategory))
// 							$(this).css('display', 'none');
// 					});
// 				}

// 				if ( $(this).find('.set-total-value').html() === '0' )
// 					$('#search-no-results').removeClass('hide-no-results').addClass('show-no-results');
// 				else
// 					$('#search-no-results').removeClass('show-no-results').addClass('hide-no-results');
// 			}
// 		}

// 		setTimeout(function () {
// 			$('body').removeClass('loadingPlans');
// 		}, 100);
// 	});

// 	// subsidy
// 	var householdIncome = $( '#household-income' ).val();

// 	$('body').on('click', '.calculate-subsidy-btn', function() {
// 		var subsidyValues = $(this).attr("rel");
// 		var currentHouseholdIncome = $( '#household-income' ).val();

// 		if (subsidyValues.split('&&')[0] === currentHouseholdIncome)
// 			$('#calculated-subsidy').val(subsidyValues.split('&&')[1]);

// 		if ( $('#calculated-subsidy').val() && $('#calculated-subsidy').val() !== '0.00' && $('#calculated-subsidy').val() !== 'NaN' ) {
// 			$( '#apply-subsidy' ).attr('href', '/plans/listing/' + $('#calculated-subsidy').val()).css({
// 				'opacity' : '1',
// 				'cursor' : 'pointer'
// 			}).hover(function(){
// 				$(this).css('color', '#FFFFFF');
// 			}, function(){
// 			    $(this).css('color', '#58acc2');
// 			});
// 		}

// 		householdIncome = $( '#household-income' ).val();		
// 	});

// 	setTimeout(function () {
// 		if ( !$('#household-income').val() ||  $('#calculated-subsidy').val() )
// 			householdIncome = $( '#household-income' ).val();

// 		if ( $('#calculated-subsidy').val() && $('#calculated-subsidy').val() !== '0.00' && $('#calculated-subsidy').val() !== 'NaN' ) {
// 			$( '#apply-subsidy' ).attr('href', '/plans/listing/' + $('#calculated-subsidy').val()).css({
// 				'opacity' : '1',
// 				'cursor' : 'pointer'
// 			}).hover(function(){
// 				$(this).css('color', '#FFFFFF');
// 			}, function(){
// 			    $(this).css('color', '#58acc2');
// 			});
// 		}
// 	}, 500);

// 	$( '#household-income' ).on('keyup blur', function(e) {
// 		this.value = this.value.replace(/[^0-9\.]/g,'');
// 		if ( this.value !== householdIncome ) {
// 			$('#calculated-subsidy').val('');
// 			$( '#apply-subsidy' ).attr('href', 'javascript:void(0)').css({
// 				'opacity' : '0.5',
// 				'cursor' : 'default'
// 			}).hover(function(){
// 				$(this).css('color', '#58acc2');
// 			});
// 			$( '#apply-subsidy:hover' ).attr('href', 'javascript:void(0)').css('color', '#FFFFFF');
// 		}
// 	});

// 	// Family Details page - validation
// 	$('body').on('click', 'input:radio', function() {
// 		var emptyValue = 0;
// 	    $('input.setValidationForm').each(function () {
// 	    	if ( this.value === '' )
// 	    		emptyValue = 1;
// 	    });

// 	    if (emptyValue === 0)
// 	    	$('form.familyDetailsForm').attr('onSubmit', "return true");
// 	});

// 	$( 'body' ).on( 'mouseup', '.dependent-relationship ul li', function() {
// 		if ( $(this).text().length > 18 ) {
// 			var temp = $(this).text();
// 			var tempElem = $(this).parent().parent().find('button');
// 			setTimeout( function() {
// 				tempElem.html( temp.slice(0, 14) + '...' + '<span class="caret"></span>');
// 			}, 0);
// 		}
// 	});
// });