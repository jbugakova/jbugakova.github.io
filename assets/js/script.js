$(() => {
	$(".owl-carousel.head-carousel").owlCarousel({
		items: 1,
		margin: 10,
		loop: true,
		autoplay: true,
		autoplayTimeout: 3000,
		autoplayHoverPause: true
	});
	$(".owl-carousel.people-say-carousel").owlCarousel({
		items: 1,
		loop: true,
		autoplay: true,
		startPosition: 2,
		autoplayTimeout: 2000,
		autoplayHoverPause: true
	});

	const navpanel = $('#navpanel');
	
	initialPageLoad();
	
	$(window).on("scroll", checkScroll);
	$(window).on("scroll", toggleNavigationLinks);
	$("#nav-toggle").on("click", onBurgerMenuToggle);
	$('#play-video').on('click', onPlayVideoClick);
	$("[data-scroll]").on("click", shoothScroll);
	
	
	function initialPageLoad() {
		navpanel.addClass('transition');
		checkScroll();
		toggleNavigationLinks();
	}
	function checkScroll() {
		let scrollOffset = getScrollTop();
	
		if(scrollOffset >= 100) {
			navpanel.addClass("scrolled-panel");
		}
		else {
			navpanel.removeClass("scrolled-panel");
		}
	}
	function getScrollTop() {
		return $(window).scrollTop();
	}
	function onBurgerMenuToggle() {
		$("#nav-toggle").toggleClass("active");
		$("#topnav").toggleClass("active");
	
		if(!$("#topnav").hasClass("active") && getScrollTop() === 0) {
				navpanel.removeClass("scrolled-panel");
		} else {
			navpanel.addClass("scrolled-panel");
		}
	}
	function onPlayVideoClick() {
		$('.cover').fadeOut(1000, function() {
			$(this).remove();
			$('.video').show();
			$('.video').find('iframe').attr('src', '#');
		});
	}
	function shoothScroll(e) {
		e.preventDefault();
	
		if(isBurgerMenuOpened) {
			onBurgerMenuToggle();
		}
	
		const sectionId = $(this).data("scroll");
		const blockOffset = $(sectionId).offset().top;
	
		$("html,body").animate({
			scrollTop: blockOffset - getCurrentNavPanelHeight() + 1
		}, 500);
	}
	function isBurgerMenuOpened() {
		return $("#nav-toggle").hasClass('active');
	}
	function toggleNavigationLinks() {
		const navPanelHeight = getCurrentNavPanelHeight();
		const currentWindowTopPos = $(window).scrollTop();
		const aboutTopPosition = $('#about').offset().top - navPanelHeight;
		const expertiseTopPosition = $('#expertise').offset().top - navPanelHeight;
		const teamTopPosition = $('#team').offset().top - navPanelHeight;
		const worksTopPosition = $('#works').offset().top - navPanelHeight;
		const peopleSayTopPosition = $('#people-say').offset().top - navPanelHeight;
		const contactTopPosition = $('#contact').offset().top - navPanelHeight;
	
		if(currentWindowTopPos >= contactTopPosition) {
			activateCurrentAnchor('contact');
		} else if(currentWindowTopPos >= peopleSayTopPosition) {
			activateCurrentAnchor('people-say');
		} else if(currentWindowTopPos >= worksTopPosition) {
			activateCurrentAnchor('works');
		} else if(currentWindowTopPos >= teamTopPosition) {
			activateCurrentAnchor('team');
		} else if(currentWindowTopPos >= expertiseTopPosition) {
			activateCurrentAnchor('expertise');
		} else if(currentWindowTopPos >= aboutTopPosition) {
			activateCurrentAnchor('about');;
		} else {
			activateCurrentAnchor('home');
		}
	}
	function getCurrentNavPanelHeight() {
		return Number(navpanel.css('height').replace('px', ''));
	}
	function activateCurrentAnchor(sectionId) {
		$('.nav-link.active').removeClass('active');
		$('a[data-scroll="#' + sectionId + '"]').addClass('active');
	}
});