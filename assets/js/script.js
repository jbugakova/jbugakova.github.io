$(() => {
	$('.owl-carousel.head-carousel').owlCarousel({
		items: 1,
		margin: 10,
		loop: true,
		autoplay: true,
		autoplayTimeout: 3000,
		autoplayHoverPause: true
	});
	$('.owl-carousel.people-say-carousel').owlCarousel({
		items: 1,
		loop: true,
		autoplay: true,
		startPosition: 2,
		autoplayTimeout: 2000,
		autoplayHoverPause: true
	});
  
	const navpanel = $('#navpanel');
	let isMenuOpen = false;
	
	initialPageLoad();
	
	$(window).on('scroll', onScrollWindow);
	$('#nav-toggle').on('click', onBurgerMenuToggle);
	$('#play-video').on('click', onPlayVideoClick);
	$('.nav-link').on('click', shoothScroll);
	
	function initialPageLoad() {
		navpanel.addClass('transition');
		checkScroll();
		toggleNavigationLinks();
	}
	function onScrollWindow() {
		checkScroll();
		toggleNavigationLinks();
	}
	function onBurgerMenuToggle() {
		if(isMenuOpen) {
			closeMenu();
		} else {
			openMenu();
		}
	}
	function onPlayVideoClick() {
		$('.cover').fadeOut(1000, function() {
			$(this).remove();
			$('.video').show();
			$('.video').find('iframe').attr('src', 'https://www.youtube.com/embed/91sFlP6aa5Q?autoplay=1');
		});
	}
	function shoothScroll(e) {
	  	e.preventDefault();
		const sectionId = $(this).data('scroll');
		const blockOffset = $(sectionId).offset().top;
		$('html,body').animate({
			scrollTop: blockOffset - getCurrentNavPanelHeight() + 1
		}, 500);
		
		if(isMenuOpen) {
			closeMenu();
		}
	}
	function checkScroll() {
		let scrollOffset = getScrollTop();

		if(scrollOffset >= 100) {
			navpanel.addClass('scrolled-panel');
		}
		else {
			navpanel.removeClass('scrolled-panel');
		}
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
		let currentSection = null;
		if(currentWindowTopPos >= contactTopPosition) {
			currentSection = 'contact';
		} else if(currentWindowTopPos >= peopleSayTopPosition) {
			currentSection = 'people-say';
		} else if(currentWindowTopPos >= worksTopPosition) {
			currentSection = 'works';
		} else if(currentWindowTopPos >= teamTopPosition) {
			currentSection = 'team';
		} else if(currentWindowTopPos >= expertiseTopPosition) {
			currentSection = 'expertise';
		} else if(currentWindowTopPos >= aboutTopPosition) {
			currentSection = 'about';
		} else {
			currentSection = 'home';
		}
		activateCurrentAnchor(currentSection);
	}
	function getCurrentNavPanelHeight() {
		return Number(navpanel.css('height').replace('px', ''));
	}
	function activateCurrentAnchor(sectionId) {
		$('.nav-link.active').removeClass('active');
		$(`a[data-scroll="#${sectionId}"]`).addClass('active');
	}
	function getScrollTop() {
		return $(window).scrollTop();
	}
	function closeMenu() {
		isMenuOpen = false;
		$('#nav-toggle').removeClass('active');
		$('#topnav').removeClass('active');
		$('body').css('overflow', 'auto');
		
		if(!$('#topnav').hasClass('active') && getScrollTop() === 0) {
			navpanel.removeClass('scrolled-panel');
		}
	}
	function openMenu() {
		isMenuOpen = true;
		$('#nav-toggle').addClass('active');
		$('#topnav').addClass('active');
		navpanel.addClass('scrolled-panel');
		$('body').css('overflow', 'hidden');
	}
});