
//slick
$('.page-discount_slider--items').slick({
	dots: false,
	slidesToShow: 1,
	slidesToScroll: 1,
	autoplay: true,
	autoplaySpeed: 4500
});

$('#slide').slick({
	dots: true,
	infinite: true,
	speed: 500,
	fade: true,
	cssEase: 'linear',
	autoplay: true,
	autoplaySpeed: 5000
});


//nav
$(document).ready(function(){
	var touch 	= $('#touch-menu');
	var menu 	= $('.menu');

	$(touch).on('click', function(e) {
		e.preventDefault();
		menu.slideToggle();
	});

	$(window).resize(function(){
		var w = $(window).width();
		if(w > 1024 && menu.is(':hidden')) {
			menu.removeAttr('style');
		}
	});

});
//content
$(".fancybox").fancybox({
	padding: 0,

	openEffect : 'elastic',
	openSpeed  : 650,

	closeEffect : 'elastic',
	closeSpeed  : 550,

	closeClick : true,

	beforeShow: function () {
		this.title = $(this.element).attr('title');
		this.title = '<h3>' + this.title + '</h3>' + '<p>' + $(this.element).parents('.cd-gallery-items__fancy').find('img').attr('alt') + '</p>';
	},

	helpers : {
		title : {
			type: 'inside'
		},
		overlay : {
			css : {
				'background' : 'rgba(0,0,0,0.8)'
			}
		}
	}
});

jQuery(document).ready(function(){
	var productCustomization = $('.cd-customization'),
		cart = $('.cd-cart'),
		animating = false;

	initCustomization(productCustomization);

	$('body').on('click', function(event){
		//if user clicks outside the .cd-gallery list items - remove the .hover class and close the open ul.size/ul.color list elements
		if( $(event.target).is('body') || $(event.target).is('.cd-gallery') ) {
			deactivateCustomization();
		}
	});

	function initCustomization(items) {
		items.each(function(){
			var actual = $(this),
				selectOptions = actual.find('[data-type="select"]'),
				addToCartBtn = actual.find('.add-to-cart'),
				touchSettings = actual.next('.cd-customization-trigger');

			//detect click on ul.size/ul.color list elements
			selectOptions.on('click', function(event) {
				var selected = $(this);
				//open/close options list
				selected.toggleClass('is-open');
				resetCustomization(selected);

				if($(event.target).is('li')) {
					// update selected option
					var activeItem = $(event.target),
						index = activeItem.index() + 1;

					activeItem.addClass('active').siblings().removeClass('active');
					selected.removeClass('selected-1 selected-2 selected-3').addClass('selected-'+index);
					// if color has been changed, update the visible product image
					selected.hasClass('color') && updateSlider(selected, index-1);
				}
			});

			//detect click on the add-to-cart button
			addToCartBtn.on('click', function() {
				if(!animating) {
					//animate if not already animating
					animating =  true;
					resetCustomization(addToCartBtn);

					addToCartBtn.addClass('is-added').find('path').eq(0).animate({
						//draw the check icon
						'stroke-dashoffset':0
					}, 300, function(){
						setTimeout(function(){
							updateCart();
							addToCartBtn.removeClass('is-added').find('em').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
								//wait for the end of the transition to reset the check icon
								addToCartBtn.find('path').eq(0).css('stroke-dashoffset', '19.79');
								animating =  false;
							});

							if( $('.no-csstransitions').length > 0 ) {
								// check if browser doesn't support css transitions
								addToCartBtn.find('path').eq(0).css('stroke-dashoffset', '19.79');
								animating =  false;
							}
						}, 600);
					});
				}
			});

			//detect click on the settings icon - touch devices only
			touchSettings.on('click', function(event){
				event.preventDefault();
				resetCustomization(addToCartBtn);
			});
		});
	}

	function updateSlider(actual, index) {
		var slider = actual.parent('.cd-customization').prev('a').children('.cd-slider-wrapper'),
			slides = slider.children('li');

		slides.eq(index).removeClass('move-left').addClass('selected').prevAll().removeClass('selected').addClass('move-left').end().nextAll().removeClass('selected move-left');
	}

	function resetCustomization(selectOptions) {
		//close ul.clor/ul.size if they were left open and user is not interacting with them anymore
		//remove the .hover class from items if user is interacting with a different one
		selectOptions.siblings('[data-type="select"]').removeClass('is-open').end().parents('.cd-single-item').addClass('hover').parent('li').siblings('li').find('.cd-single-item').removeClass('hover').end().find('[data-type="select"]').removeClass('is-open');
	}

	function deactivateCustomization() {
		productCustomization.parent('.cd-single-item').removeClass('hover').end().find('[data-type="select"]').removeClass('is-open');
	}

	function updateCart() {
		//show counter if this is the first item added to the cart
		( !cart.hasClass('items-added') ) && cart.addClass('items-added');

		var cartItems = cart.find('span'),
			text = parseInt(cartItems.text()) + 1;
		cartItems.text(text);
	}
});
/* ==========  START GOOGLE MAP ========== */

// When the window has finished loading create our google map below
google.maps.event.addDomListener(window, 'load', init);

function init() {
	// Basic options for a simple Google Map
	// For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions

	var myLatLng = new google.maps.LatLng(48.827558, 9.315709);

	var mapOptions = {
		zoom: 15,
		center: myLatLng,
		disableDefaultUI: true,
		scrollwheel: false,
		navigationControl: true,
		mapTypeControl: false,
		scaleControl: false,
		draggable: true,

		// How you would like to style the map.
		// This is where you would paste any style found on Snazzy Maps.
		styles: [{
			featureType: 'water',
			stylers: [{
				color: '#46bcec'
			}, {
				visibility: 'on'
			}]
		}, {
			featureType: 'landscape',
			stylers: [{
				color: '#f2f2f2'
			}]
		}, {
			featureType: 'road',
			stylers: [{
				saturation: -100
			}, {
				lightness: 45
			}]
		}, {
			featureType: 'road.highway',
			stylers: [{
				visibility: 'simplified'
			}]
		}, {
			featureType: 'road.arterial',
			elementType: 'labels.icon',
			stylers: [{
				visibility: 'off'
			}]
		}, {
			featureType: 'administrative',
			elementType: 'labels.text.fill',
			stylers: [{
				color: '#444444'
			}]
		}, {
			featureType: 'transit',
			stylers: [{
				visibility: 'off'
			}]
		}, {
			featureType: 'poi',
			stylers: [{
				visibility: 'off'
			}]
		}]
	};

	// Get the HTML DOM element that will contain your map
	// We are using a div with id="map" seen below in the <body>
	var mapElement = document.getElementById('map-canvas');

	// Create the Google Map using our element and options defined above
	var map = new google.maps.Map(mapElement, mapOptions);

	// Let's also add a marker while we're at it
	var marker = new google.maps.Marker({
		position: new google.maps.LatLng(48.827558, 9.315709),
		map: map,
		icon: 'img/icons/map-marker.png',
	});
}


// ========== END GOOGLE MAP ========== //
var wow = new WOW ({
	offset:       75,          // distance to the element when triggering the animation (default is 0)
	mobile:       false       // trigger animations on mobile devices (default is true)
});
wow.init();

if ($('#back-to-top').length) {
	var scrollTrigger = 300, // px
		backToTop = function () {
			var scrollTop = $(window).scrollTop();
			if (scrollTop > scrollTrigger) {
				$('#back-to-top').addClass('show');
			} else {
				$('#back-to-top').removeClass('show');
			}if (screen.width < 960){
				$('#back-to-top').removeClass('show');
			}
		};
	backToTop();
	$(window).on('scroll', function () {
		backToTop();
	});
	$('#back-to-top').on('click', function (e) {
		e.preventDefault();
		$('html,body').animate({
			scrollTop: 0
		}, 700);
	});
}

//rating
(function ( $ ) {

	$.fn.rating = function( method, options ) {
		method = method || 'create';
		// This is the easiest way to have default options.
		var settings = $.extend({
			// These are the defaults.
			limit: 5,
			value: 5,
			glyph: "glyphicon-star",
			coloroff: "rgb(200,200,200)",
			coloron: "#FFD203",
			size: "2.0em",
			cursor: "default",
			onClick: function () {},
			endofarray: "idontmatter"
		}, options );
		var style = "";
		style = style + "font-size:" + settings.size + "; ";
		style = style + "color:" + settings.coloroff + "; ";
		style = style + "cursor:" + settings.cursor + "; ";



		if (method == 'create')
		{
			//this.html('');	//junk whatever was there

			//initialize the data-rating property
			this.each(function(){
				attr = $(this).attr('data-rating');
				if (attr === undefined || attr === false) { $(this).attr('data-rating',settings.value); }
			})

			//bolt in the glyphs
			for (var i = 0; i < settings.limit; i++)
			{
				this.append('<span data-value="' + (i+1) + '" class="ratingicon glyphicon ' + settings.glyph + '" style="' + style + '" aria-hidden="true"></span>');
			}

			//paint
			this.each(function() { paint($(this)); });

		}
		if (method == 'set')
		{
			this.attr('data-rating',options);
			this.each(function() { paint($(this)); });
		}
		if (method == 'get')
		{
			return this.attr('data-rating');
		}
		//register the click events
		this.find("span.ratingicon").click(function() {
			rating = $(this).attr('data-value')
			$(this).parent().attr('data-rating',rating);
			paint($(this).parent());
			settings.onClick.call( $(this).parent() );
		})
		function paint(div)
		{
			rating = parseInt(div.attr('data-rating'));
			div.find("input").val(rating);	//if there is an input in the div lets set it's value
			div.find("span.ratingicon").each(function(){	//now paint the stars

				var rating = parseInt($(this).parent().attr('data-rating'));
				var value = parseInt($(this).attr('data-value'));
				if (value > rating) { $(this).css('color',settings.coloroff); }
				else { $(this).css('color',settings.coloron); }
			})
		}

	};

	//Rate items--------------------------------------------
}( jQuery ));

$(document).ready(function(){

	$(".stars-default").rating();

});

//Modal window REGISTRARION----------------------------------------
$('#myModal').modal('show');

//Validation contact form
$(document).ready(function() {
	$('#contact_form').bootstrapValidator({
		// To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
		feedbackIcons: {
			valid: 'glyphicon glyphicon-ok',
			invalid: 'glyphicon glyphicon-remove',
			validating: 'glyphicon glyphicon-refresh'
		},
		fields: {
			first_name: {
				validators: {
					stringLength: {
						min: 2,
					},
					notEmpty: {
						message: 'Please supply your first name'
					}
				}
			},
			last_name: {
				validators: {
					stringLength: {
						min: 2,
					},
					notEmpty: {
						message: 'Please supply your last name'
					}
				}
			},
			email: {
				validators: {
					notEmpty: {
						message: 'Please supply your email address'
					},
					emailAddress: {
						message: 'Please supply a valid email address'
					}
				}
			},
			phone: {
				validators: {
					notEmpty: {
						message: 'Please supply your phone number'
					},
					phone: {
						country: 'US',
						message: 'Please supply a vaild phone number with area code'
					}
				}
			},
			address: {
				validators: {
					stringLength: {
						min: 8,
					},
					notEmpty: {
						message: 'Please supply your street address'
					}
				}
			},
			city: {
				validators: {
					stringLength: {
						min: 4,
					},
					notEmpty: {
						message: 'Please supply your city'
					}
				}
			},
			state: {
				validators: {
					notEmpty: {
						message: 'Please select your state'
					}
				}
			},
			zip: {
				validators: {
					notEmpty: {
						message: 'Please supply your zip code'
					},
					zipCode: {
						country: 'US',
						message: 'Please supply a vaild zip code'
					}
				}
			},
			comment: {
				validators: {
					stringLength: {
						min: 10,
						max: 200,
						message:'Please enter at least 10 characters and no more than 200'
					},
					notEmpty: {
						message: 'Please supply a description of your project'
					}
				}
			}
		}
	})
		.on('success.form.bv', function(e) {
			$('#success_message').slideDown({ opacity: "show" }, "slow") // Do something ...
			$('#contact_form').data('bootstrapValidator').resetForm();

			// Prevent form submission
			e.preventDefault();

			// Get the form instance
			var $form = $(e.target);

			// Get the BootstrapValidator instance
			var bv = $form.data('bootstrapValidator');

			// Use Ajax to submit form data
			$.post($form.attr('action'), $form.serialize(), function(result) {
				console.log(result);
			}, 'json');
		});
});

