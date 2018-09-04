$(document).ready(function () {
	$('.sidenav').sidenav({
		closeOnClick: true
	})


	$('.hero-slider').not('.slick-initialized').slick({
		dots: false,
		infinite: true,
		speed: 500,
		fade: true,
		arrows: false,
		autoplay: true,
		autoplaySpeed: 8000,
		cssEase: 'linear'
	});


	$('.gallery-images').not('.slick-initialized').slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		autoplay: true,
		infinite: false,
		arrows: false,
		dots: false,
		autoplaySpeed: 2000,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1
				}
			}]
	});

    $('.comments-list').not('.slick-initialized').slick({
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        infinite: false,
        arrows: false,
        dots: false,
        autoplaySpeed: 6000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }]
    });

	$(window).scroll(function () {
		if ($(this).scrollTop() > 50) {
			$('.scrollTop:hidden').stop(true, true).fadeIn();
		} else {
			$('.scrollTop').stop(true, true).fadeOut();
		}
	});

	$(function () {
		$(".scroll-btn").click(function () {
			$("html,body").animate({scrollTop: $("header").offset().top}, "1500");
			return false
		})
	});


	$('a[href*="#"]')
		.not('[href="#"]')
		.not('[href="#0"]')
		.click(function (event) {
			// On-page links
			if (
				location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
				&&
				location.hostname == this.hostname
			) {
				// Figure out element to scroll to
				var target = $(this.hash);
				target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
				// Does a scroll target exist?
				if (target.length) {
					// Only prevent default if animation is actually gonna happen
					event.preventDefault();
					$('html, body').animate({
						scrollTop: target.offset().top
					}, 1000, function () {
						// Callback after animation
						// Must change focus!
						var $target = $(target);
						$target.focus();
						if ($target.is(":focus")) { // Checking if the target was focused
							return false;
						} else {
							$target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
							$target.focus(); // Set focus again
						}
						;
					});
				}
			}
		});

	$('#open-image').click(function (e) {
		e.preventDefault();
		$(this).ekkoLightbox();
	});


// Hide Header on on scroll down
	var didScroll;
	var lastScrollTop = 0;
	var delta = 5;
	var navbarHeight = $('.main-nav-wrap').outerHeight();

	$(window).scroll(function (event) {
		didScroll = true;
	});

	setInterval(function () {
		if (didScroll) {
			hasScrolled();
			didScroll = false;
		}
	}, 0);

	function hasScrolled() {
		var st = $(this).scrollTop();

		// Make sure they scroll more than delta
		if (Math.abs(lastScrollTop - st) <= delta)
			return;

		if (st > lastScrollTop && st > navbarHeight) {
			// Scroll Down
			$('.main-nav-wrap').removeClass('nav-down').addClass('nav-up');
		} else {
			// Scroll Up
			if (st + $(window).height() < $(document).height()) {
				$('.main-nav-wrap').removeClass('nav-up').addClass('nav-down');
			}
		}

		lastScrollTop = st;
	}

});

function initMap() {
	var uluru = {lat: 50.355862, lng: 30.942708};
	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 16,
		center: uluru
	});
	var marker = new google.maps.Marker({
		position: uluru,
		map: map
	});
}

document.addEventListener('DOMContentLoaded', function() {
	var elems = document.querySelectorAll('.parallax');
	var instances = M.Parallax.init(elems);
});


document.addEventListener('DOMContentLoaded', function() {
	var elems = document.querySelectorAll('.collapsible');
	var instances = M.Collapsible.init(elems);
});