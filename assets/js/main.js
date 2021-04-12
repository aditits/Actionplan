console.log('%c Proudly Crafted with ZiOn.', 'background: #222; color: #bada55');

/* ---------------------------------------------- /*
 * Preloader
 /* ---------------------------------------------- */
(function(){
    $(window).on('load', function() {
        $('.loader').fadeOut();
        $('.page-loader').delay(350).fadeOut('slow');
    });

    $(document).ready(function() {

        /* ---------------------------------------------- /*
         * WOW Animation When You Scroll
         /* ---------------------------------------------- */

        wow = new WOW({
            mobile: false
        });
        wow.init();


        /* ---------------------------------------------- /*
         * Scroll top
         /* ---------------------------------------------- */

        $(window).scroll(function() {
            if ($(this).scrollTop() > 100) {
                $('.scroll-up').fadeIn();
            } else {
                $('.scroll-up').fadeOut();
            }
        });

        $('a[href="#totop"]').click(function() {
            $('html, body').animate({ scrollTop: 0 }, 'slow');
            return false;
        });


        /* ---------------------------------------------- /*
         * Initialization General Scripts for all pages
         /* ---------------------------------------------- */

        var homeSection = $('.home-section'),
            navbar      = $('.navbar-custom'),
            navHeight   = navbar.height(),
            worksgrid   = $('#works-grid'),
            width       = Math.max($(window).width(), window.innerWidth),
            mobileTest  = false;

        if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            mobileTest = true;
        }

        buildHomeSection(homeSection);
        navbarAnimation(navbar, homeSection, navHeight);
        navbarSubmenu(width);
        hoverDropdown(width, mobileTest);

        $(window).resize(function() {
            var width = Math.max($(window).width(), window.innerWidth);
            buildHomeSection(homeSection);
            hoverDropdown(width, mobileTest);
        });

        $(window).scroll(function() {
            effectsHomeSection(homeSection, this);
            navbarAnimation(navbar, homeSection, navHeight);
        });

        /* ---------------------------------------------- /*
         * Set sections backgrounds
         /* ---------------------------------------------- */

        var module = $('.home-section, .module, .module-small, .side-image');
        module.each(function(i) {
            if ($(this).attr('data-background')) {
                $(this).css('background-image', 'url(' + $(this).attr('data-background') + ')');
            }
        });

        /* ---------------------------------------------- /*
         * Home section height
         /* ---------------------------------------------- */

        function buildHomeSection(homeSection) {
            if (homeSection.length > 0) {
                if (homeSection.hasClass('home-full-height')) {
                    homeSection.height($(window).height());
                } else {
                    homeSection.height($(window).height() * 0.85);
                }
            }
        }


        /* ---------------------------------------------- /*
         * Home section effects
         /* ---------------------------------------------- */

        function effectsHomeSection(homeSection, scrollTopp) {
            if (homeSection.length > 0) {
                var homeSHeight = homeSection.height();
                var topScroll = $(document).scrollTop();
                if ((homeSection.hasClass('home-parallax')) && ($(scrollTopp).scrollTop() <= homeSHeight)) {
                    homeSection.css('top', (topScroll * 0.55));
                }
                if (homeSection.hasClass('home-fade') && ($(scrollTopp).scrollTop() <= homeSHeight)) {
                    var caption = $('.caption-content');
                    caption.css('opacity', (1 - topScroll/homeSection.height() * 1));
                }
            }
        }

        /* ---------------------------------------------- /*
         * Intro slider setup
         /* ---------------------------------------------- */

        if( $('.hero-slider').length > 0 ) {
            $('.hero-slider').flexslider( {
                animation: "fade",
                animationSpeed: 1000,
                animationLoop: true,
                prevText: '',
                nextText: '',
                before: function(slider) {
                    $('.titan-caption').fadeOut().animate({top:'-80px'},{queue:false, easing: 'swing', duration: 700});
                    slider.slides.eq(slider.currentSlide).delay(500);
                    slider.slides.eq(slider.animatingTo).delay(500);
                },
                after: function(slider) {
                    $('.titan-caption').fadeIn().animate({top:'0'},{queue:false, easing: 'swing', duration: 700});
                },
                useCSS: true
            });
        }


        /* ---------------------------------------------- /*
         * Rotate
         /* ---------------------------------------------- */

        $(".rotate").textrotator({
            animation: "dissolve",
            separator: "|",
            speed: 3000
        });


        /* ---------------------------------------------- /*
         * Transparent navbar animation
         /* ---------------------------------------------- */

        function navbarAnimation(navbar, homeSection, navHeight) {
            var topScroll = $(window).scrollTop();
            if (navbar.length > 0 && homeSection.length > 0) {
                if(topScroll >= navHeight) {
                    navbar.removeClass('navbar-transparent');
                } else {
                    navbar.addClass('navbar-transparent');
                }
            }
        }

        /* ---------------------------------------------- /*
         * Navbar submenu
         /* ---------------------------------------------- */

        function navbarSubmenu(width) {
            if (width > 767) {
                $('.navbar-custom .navbar-nav > li.dropdown').hover(function() {
                    var MenuLeftOffset  = $('.dropdown-menu', $(this)).offset().left;
                    var Menu1LevelWidth = $('.dropdown-menu', $(this)).width();
                    if (width - MenuLeftOffset < Menu1LevelWidth * 2) {
                        $(this).children('.dropdown-menu').addClass('leftauto');
                    } else {
                        $(this).children('.dropdown-menu').removeClass('leftauto');
                    }
                    if ($('.dropdown', $(this)).length > 0) {
                        var Menu2LevelWidth = $('.dropdown-menu', $(this)).width();
                        if (width - MenuLeftOffset - Menu1LevelWidth < Menu2LevelWidth) {
                            $(this).children('.dropdown-menu').addClass('left-side');
                        } else {
                            $(this).children('.dropdown-menu').removeClass('left-side');
                        }
                    }
                });
            }
        }

        /* ---------------------------------------------- /*
         * Navbar hover dropdown on desctop
         /* ---------------------------------------------- */

        function hoverDropdown(width, mobileTest) {
            if ((width > 767) && (mobileTest !== true)) {
                $('.navbar-custom .navbar-nav > li.dropdown, .navbar-custom li.dropdown > ul > li.dropdown').removeClass('open');
                var delay = 0;
                var setTimeoutConst;
                $('.navbar-custom .navbar-nav > li.dropdown, .navbar-custom li.dropdown > ul > li.dropdown').hover(function() {
                        var $this = $(this);
                        setTimeoutConst = setTimeout(function() {
                            $this.addClass('open');
                            $this.find('.dropdown-toggle').addClass('disabled');
                        }, delay);
                    },
                    function() {
                        clearTimeout(setTimeoutConst);
                        $(this).removeClass('open');
                        $(this).find('.dropdown-toggle').removeClass('disabled');
                    });
            } else {
                $('.navbar-custom .navbar-nav > li.dropdown, .navbar-custom li.dropdown > ul > li.dropdown').unbind('mouseenter mouseleave');
                $('.navbar-custom [data-toggle=dropdown]').not('.binded').addClass('binded').on('click', function(event) {
                    event.preventDefault();
                    event.stopPropagation();
                    $(this).parent().siblings().removeClass('open');
                    $(this).parent().siblings().find('[data-toggle=dropdown]').parent().removeClass('open');
                    $(this).parent().toggleClass('open');
                });
            }
        }

        /* ---------------------------------------------- /*
         * Navbar collapse on click
         /* ---------------------------------------------- */

        $(document).on('click','.navbar-collapse.in',function(e) {
            if( $(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle' ) {
                $(this).collapse('hide');
            }
        });


        /* ---------------------------------------------- /*
         * Video popup, Gallery
         /* ---------------------------------------------- */

        $('.video-pop-up').magnificPopup({
            type: 'iframe'
        });

        $(".gallery-item").magnificPopup({
            delegate: 'a',
            type: 'image',
            gallery: {
                enabled: true,
                navigateByImgClick: true,
                preload: [0,1]
            },
            image: {
                titleSrc: 'title',
                tError: 'The image could not be loaded.'
            }
        });


        /* ---------------------------------------------- /*
         * Portfolio
         /* ---------------------------------------------- */

        var worksgrid   = $('#works-grid'),
            worksgrid_mode;

        if (worksgrid.hasClass('works-grid-masonry')) {
            worksgrid_mode = 'masonry';
        } else {
            worksgrid_mode = 'fitRows';
        }

        worksgrid.imagesLoaded(function() {
            worksgrid.isotope({
                layoutMode: worksgrid_mode,
                itemSelector: '.work-item'
            });
        });

        $('#filters a').click(function() {
            $('#filters .current').removeClass('current');
            $(this).addClass('current');
            var selector = $(this).attr('data-filter');

            worksgrid.isotope({
                filter: selector,
                animationOptions: {
                    duration: 750,
                    easing: 'linear',
                    queue: false
                }
            });

            return false;
        });


        /* ---------------------------------------------- /*
         * Testimonials
         /* ---------------------------------------------- */

        if ($('.testimonials-slider').length > 0 ) {
            $('.testimonials-slider').flexslider( {
                animation: "slide",
                smoothHeight: true
            });
        }


        /* ---------------------------------------------- /*
         * Post Slider
         /* ---------------------------------------------- */

        if ($('.post-images-slider').length > 0 ) {
            $('.post-images-slider').flexslider( {
                animation: "slide",
                smoothHeight: true,
            });
        }


        /* ---------------------------------------------- /*
         * Progress bar animations
         /* ---------------------------------------------- */

        $('.progress-bar').each(function(i) {
            $(this).appear(function() {
                var percent = $(this).attr('aria-valuenow');
                $(this).animate({'width' : percent + '%'});
                $(this).find('span').animate({'opacity' : 1}, 900);
                $(this).find('span').countTo({from: 0, to: percent, speed: 900, refreshInterval: 30});
            });
        });


        /* ---------------------------------------------- /*
         * Funfact Count-up
         /* ---------------------------------------------- */

        $('.count-item').each(function(i) {
            $(this).appear(function() {
                var number = $(this).find('.count-to').data('countto');
                $(this).find('.count-to').countTo({from: 0, to: number, speed: 1200, refreshInterval: 30});
            });
        });


        /* ---------------------------------------------- /*
         * Youtube video background
         /* ---------------------------------------------- */

        $(function(){
            $(".video-player").mb_YTPlayer();
        });

        $('#video-play').click(function(event) {
            event.preventDefault();
            if ($(this).hasClass('fa-play')) {
                $('.video-player').playYTP();
            } else {
                $('.video-player').pauseYTP();
            }
            $(this).toggleClass('fa-play fa-pause');
            return false;
        });

        $('#video-volume').click(function(event) {
            event.preventDefault();
            if ($(this).hasClass('fa-volume-off')) {
                $('.video-player').YTPUnmute();
            } else {
                $('.video-player').YTPMute();
            }
            $(this).toggleClass('fa-volume-off fa-volume-up');
            return false;
        });


        /* ---------------------------------------------- /*
         * Owl Carousel
         /* ---------------------------------------------- */

        $('.owl-carousel').each(function(i) {

            // Check items number
            if ($(this).data('items') > 0) {
                items = $(this).data('items');
            } else {
                items = 4;
            }

            // Check pagination true/false
            if (($(this).data('pagination') > 0) && ($(this).data('pagination') === true)) {
                pagination = true;
            } else {
                pagination = false;
            }

            // Check navigation true/false
            if (($(this).data('navigation') > 0) && ($(this).data('navigation') === true)) {
                navigation = true;
            } else {
                navigation = false;
            }

            // Build carousel
            $(this).owlCarousel( {
                navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
                nav: navigation,
                dots: pagination,
                loop: true,
                dotsSpeed: 400,
                items: items,
                navSpeed: 300,
                autoplay: 2000
            });

        });


        /* ---------------------------------------------- /*
         * Blog masonry
         /* ---------------------------------------------- */

        $('.post-masonry').imagesLoaded(function() {
            $('.post-masonry').masonry();
        });


        /* ---------------------------------------------- /*
         * Scroll Animation
         /* ---------------------------------------------- */

        $('.section-scroll').bind('click', function(e) {
            var anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $(anchor.attr('href')).offset().top - 50
            }, 1000);
            e.preventDefault();
        });

        /*===============================================================
         Working Contact Form
         ================================================================*/

        $("#contactForm").submit(function (e) {

            e.preventDefault();
            var $ = jQuery;

            var postData = $(this).serializeArray(),
                formURL = $(this).attr("action"),
                $cfResponse = $('#contactFormResponse'),
                $cfsubmit = $("#cfsubmit"),
                cfsubmitText = $cfsubmit.text();

            $cfsubmit.text("Sending...");


            $.ajax(
                {
                    url: formURL,
                    type: "POST",
                    data: postData,
                    success: function (data) {
                        $cfResponse.html(data);
                        $cfsubmit.text(cfsubmitText);
                        $('#contactForm input[name=name]').val('');
                        $('#contactForm input[name=email]').val('');
                        $('#contactForm textarea[name=message]').val('');
                    },
                    error: function (data) {
                        alert("Error occurd! Please try again");
                    }
                });

            return false;

        });


        /*===============================================================
         Working Request A Call Form
         ================================================================*/

        $("#requestACall").submit(function (e) {

            e.preventDefault();
            var $ = jQuery;

            var postData = $(this).serializeArray(),
                formURL = $(this).attr("action"),
                $cfResponse = $('#requestFormResponse'),
                $cfsubmit = $("#racSubmit"),
                cfsubmitText = $cfsubmit.text();

            $cfsubmit.text("Sending...");


            $.ajax(
                {
                    url: formURL,
                    type: "POST",
                    data: postData,
                    success: function (data) {
                        $cfResponse.html(data);
                        $cfsubmit.text(cfsubmitText);
                        $('#requestACall input[name=name]').val('');
                        $('#requestACall input[name=subject]').val('');
                        $('#requestACall textarea[name=phone]').val('');
                    },
                    error: function (data) {
                        alert("Error occurd! Please try again");
                    }
                });

            return false;

        });


        /*===============================================================
         Working Reservation Form
         ================================================================*/

        $("#reservationForm").submit(function (e) {

            e.preventDefault();
            var $ = jQuery;

            var postData = $(this).serializeArray(),
                formURL = $(this).attr("action"),
                $cfResponse = $('#reservationFormResponse'),
                $cfsubmit = $("#rfsubmit"),
                cfsubmitText = $cfsubmit.text();

            $cfsubmit.text("Sending...");


            $.ajax(
                {
                    url: formURL,
                    type: "POST",
                    data: postData,
                    success: function (data) {
                        $cfResponse.html(data);
                        $cfsubmit.text(cfsubmitText);
                        $('#reservationForm input[name=date]').val('');
                        $('#reservationForm input[name=time]').val('');
                        $('#reservationForm textarea[name=people]').val('');
                        $('#reservationForm textarea[name=email]').val('');
                    },
                    error: function (data) {
                        alert("Error occurd! Please try again");
                    }
                });

            return false;

        });


        /* ---------------------------------------------- /*
         * Subscribe form ajax
         /* ---------------------------------------------- */

        $('#subscription-form').submit(function(e) {

            e.preventDefault();
            var $form           = $('#subscription-form');
            var submit          = $('#subscription-form-submit');
            var ajaxResponse    = $('#subscription-response');
            var email           = $('input#semail').val();

            $.ajax({
                type: 'POST',
                url: 'assets/php/subscribe.php',
                dataType: 'json',
                data: {
                    email: email
                },
                cache: false,
                beforeSend: function(result) {
                    submit.empty();
                    submit.append('<i class="fa fa-cog fa-spin"></i> Wait...');
                },
                success: function(result) {
                    if(result.sendstatus == 1) {
                        ajaxResponse.html(result.message);
                        $form.fadeOut(500);
                    } else {
                        ajaxResponse.html(result.message);
                    }
                }
            });

        });


        /* ---------------------------------------------- /*
         * Google Map
         /* ---------------------------------------------- */

        if($("#map").length == 0 || typeof google == 'undefined') return;

        // When the window has finished loading create our google map below
        google.maps.event.addDomListener(window, 'load', init);

        var mkr = new google.maps.LatLng(40.6700, -74.2000);
        var cntr = (mobileTest) ? mkr : new google.maps.LatLng(40.6700, -73.9400);

        function init() {
            // Basic options for a simple Google Map
            // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
            var mapOptions = {
                // How zoomed in you want the map to start at (always required)
                zoom: 11,
                scrollwheel: false,
                // The latitude and longitude to center the map (always required)
                center: cntr, // New York

                // How you would like to style the map.
                // This is where you would paste any style found on Snazzy Maps.
                styles: [
                    {
                        "featureType": "all",
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "visibility": "on"
                            },
                            {
                                "saturation": "-11"
                            }
                        ]
                    },
                    {
                        "featureType": "administrative",
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "saturation": "22"
                            }
                        ]
                    },
                    {
                        "featureType": "administrative",
                        "elementType": "geometry.stroke",
                        "stylers": [
                            {
                                "saturation": "-58"
                            },
                            {
                                "color": "#cfcece"
                            }
                        ]
                    },
                    {
                        "featureType": "administrative",
                        "elementType": "labels.text",
                        "stylers": [
                            {
                                "color": "#f8f8f8"
                            }
                        ]
                    },
                    {
                        "featureType": "administrative",
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "color": "#999999"
                            },
                            {
                                "visibility": "on"
                            }
                        ]
                    },
                    {
                        "featureType": "administrative",
                        "elementType": "labels.text.stroke",
                        "stylers": [
                            {
                                "visibility": "on"
                            }
                        ]
                    },
                    {
                        "featureType": "administrative.country",
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "color": "#f9f9f9"
                            },
                            {
                                "visibility": "simplified"
                            }
                        ]
                    },
                    {
                        "featureType": "landscape",
                        "elementType": "all",
                        "stylers": [
                            {
                                "color": "#f2f2f2"
                            }
                        ]
                    },
                    {
                        "featureType": "landscape",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "saturation": "-19"
                            },
                            {
                                "lightness": "-2"
                            },
                            {
                                "visibility": "on"
                            }
                        ]
                    },
                    {
                        "featureType": "poi",
                        "elementType": "all",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "road",
                        "elementType": "all",
                        "stylers": [
                            {
                                "saturation": -100
                            },
                            {
                                "lightness": 45
                            }
                        ]
                    },
                    {
                        "featureType": "road.highway",
                        "elementType": "all",
                        "stylers": [
                            {
                                "visibility": "simplified"
                            }
                        ]
                    },
                    {
                        "featureType": "road.arterial",
                        "elementType": "labels.icon",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "transit",
                        "elementType": "all",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "water",
                        "elementType": "all",
                        "stylers": [
                            {
                                "color": "#d8e1e5"
                            },
                            {
                                "visibility": "on"
                            }
                        ]
                    },
                    {
                        "featureType": "water",
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "color": "#dedede"
                            }
                        ]
                    },
                    {
                        "featureType": "water",
                        "elementType": "labels.text",
                        "stylers": [
                            {
                                "color": "#cbcbcb"
                            }
                        ]
                    },
                    {
                        "featureType": "water",
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "color": "#9c9c9c"
                            }
                        ]
                    },
                    {
                        "featureType": "water",
                        "elementType": "labels.text.stroke",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    }
                ]
            };

            // Get the HTML DOM element that will contain your map
            // We are using a div with id="map" seen below in the <body>
            var mapElement = document.getElementById('map');

            // Create the Google Map using our element and options defined above
            var map = new google.maps.Map(mapElement, mapOptions);

            // Let's also add a marker while we're at it
            var image = new google.maps.MarkerImage('assets/images/map-icon.png',
                new google.maps.Size(59, 65),
                new google.maps.Point(0, 0),
                new google.maps.Point(24, 42)
            );

            var marker = new google.maps.Marker({
                position: mkr,
                icon: image,
                title: 'Titan',
                infoWindow: {
                    content: '<p><strong>Rival</strong><br/>121 Somewhere Ave, Suite 123<br/>P: (123) 456-7890<br/>Australia</p>'
                },
                map: map,
            });
        }

    });
})(jQuery);




































(function() {
  // Horizontal Timeline - by CodyHouse.co
  var HorizontalTimeline = function(element) {
        this.element = element;
        this.datesContainer = this.element.getElementsByClassName('cd-h-timeline__dates')[0];
        this.line = this.datesContainer.getElementsByClassName('cd-h-timeline__line')[0]; // grey line in the top timeline section
        this.fillingLine = this.datesContainer.getElementsByClassName('cd-h-timeline__filling-line')[0]; // green filling line in the top timeline section  
        this.date = this.line.getElementsByClassName('cd-h-timeline__date');
        this.selectedDate = this.line.getElementsByClassName('cd-h-timeline__date--selected')[0];
        this.dateValues = parseDate(this);
        this.minLapse = calcMinLapse(this);
        this.navigation = this.element.getElementsByClassName('cd-h-timeline__navigation');
        this.contentWrapper = this.element.getElementsByClassName('cd-h-timeline__events')[0];
        this.content = this.contentWrapper.getElementsByClassName('cd-h-timeline__event');
        
        this.eventsMinDistance = 60; // min distance between two consecutive events (in px)
        this.eventsMaxDistance = 200; // max distance between two consecutive events (in px)
        this.translate = 0; // this will be used to store the translate value of this.line
        this.lineLength = 0; //total length of this.line
        
        // store index of selected and previous selected dates
        this.oldDateIndex = Util.getIndexInArray(this.date, this.selectedDate);
        this.newDateIndex = this.oldDateIndex;

        initTimeline(this);
        initEvents(this);
  };

  function initTimeline(timeline) {
    // set dates left position
    var left = 0;
        for (var i = 0; i < timeline.dateValues.length; i++) { 
            var j = (i == 0) ? 0 : i - 1;
        var distance = daydiff(timeline.dateValues[j], timeline.dateValues[i]),
            distanceNorm = (Math.round(distance/timeline.minLapse) + 2)*timeline.eventsMinDistance;
    
        if(distanceNorm < timeline.eventsMinDistance) {
            distanceNorm = timeline.eventsMinDistance;
        } else if(distanceNorm > timeline.eventsMaxDistance) {
            distanceNorm = timeline.eventsMaxDistance;
        }
        left = left + distanceNorm;
        timeline.date[i].setAttribute('style', 'left:' + left+'px');
        }
        
        // set line/filling line dimensions
    timeline.line.style.width = (left + timeline.eventsMinDistance)+'px';
        timeline.lineLength = left + timeline.eventsMinDistance;
        // reveal timeline
        Util.addClass(timeline.element, 'cd-h-timeline--loaded');
        selectNewDate(timeline, timeline.selectedDate);
        resetTimelinePosition(timeline, 'next');
  };

  function initEvents(timeline) {
    var self = timeline;
        // click on arrow navigation
        self.navigation[0].addEventListener('click', function(event){
            event.preventDefault();
            translateTimeline(self, 'prev');
        });
        self.navigation[1].addEventListener('click', function(event){
            event.preventDefault();
            translateTimeline(self, 'next');
        });

        //swipe on timeline
        new SwipeContent(self.datesContainer);
        self.datesContainer.addEventListener('swipeLeft', function(event){
            translateTimeline(self, 'next');
        });
        self.datesContainer.addEventListener('swipeRight', function(event){
            translateTimeline(self, 'prev');
        });

        //select a new event
        for(var i = 0; i < self.date.length; i++) {
            (function(i){
                self.date[i].addEventListener('click', function(event){
                    event.preventDefault();
                    selectNewDate(self, event.target);
                });

                self.content[i].addEventListener('animationend', function(event){
                    if( i == self.newDateIndex && self.newDateIndex != self.oldDateIndex) resetAnimation(self);
                });
            })(i);
        }
  };

  function updateFilling(timeline) { // update fillingLine scale value
        var dateStyle = window.getComputedStyle(timeline.selectedDate, null),
            left = dateStyle.getPropertyValue("left"),
            width = dateStyle.getPropertyValue("width");
        
        left = Number(left.replace('px', '')) + Number(width.replace('px', ''))/2;
        timeline.fillingLine.style.transform = 'scaleX('+(left/timeline.lineLength)+')';
    };

  function translateTimeline(timeline, direction) { // translate timeline (and date elements)
    var containerWidth = timeline.datesContainer.offsetWidth;
    if(direction) {
        timeline.translate = (direction == 'next') ? timeline.translate - containerWidth + timeline.eventsMinDistance : timeline.translate + containerWidth - timeline.eventsMinDistance;
    }
    if( 0 - timeline.translate > timeline.lineLength - containerWidth ) timeline.translate = containerWidth - timeline.lineLength;
    if( timeline.translate > 0 ) timeline.translate = 0;

    timeline.line.style.transform = 'translateX('+timeline.translate+'px)';
    // update the navigation items status (toggle inactive class)
        (timeline.translate == 0 ) ? Util.addClass(timeline.navigation[0], 'cd-h-timeline__navigation--inactive') : Util.removeClass(timeline.navigation[0], 'cd-h-timeline__navigation--inactive');
        (timeline.translate == containerWidth - timeline.lineLength ) ? Util.addClass(timeline.navigation[1], 'cd-h-timeline__navigation--inactive') : Util.removeClass(timeline.navigation[1], 'cd-h-timeline__navigation--inactive');
  };

    function selectNewDate(timeline, target) { // ned date has been selected -> update timeline
        timeline.newDateIndex = Util.getIndexInArray(timeline.date, target);
        timeline.oldDateIndex = Util.getIndexInArray(timeline.date, timeline.selectedDate);
        Util.removeClass(timeline.selectedDate, 'cd-h-timeline__date--selected');
        Util.addClass(timeline.date[timeline.newDateIndex], 'cd-h-timeline__date--selected');
        timeline.selectedDate = timeline.date[timeline.newDateIndex];
        updateOlderEvents(timeline);
        updateVisibleContent(timeline);
        updateFilling(timeline);
    };

    function updateOlderEvents(timeline) { // update older events style
        for(var i = 0; i < timeline.date.length; i++) {
            (i < timeline.newDateIndex) ? Util.addClass(timeline.date[i], 'cd-h-timeline__date--older-event') : Util.removeClass(timeline.date[i], 'cd-h-timeline__date--older-event');
        }
    };

    function updateVisibleContent(timeline) { // show content of new selected date
        if (timeline.newDateIndex > timeline.oldDateIndex) {
            var classEntering = 'cd-h-timeline__event--selected cd-h-timeline__event--enter-right',
                classLeaving = 'cd-h-timeline__event--leave-left';
        } else if(timeline.newDateIndex < timeline.oldDateIndex) {
            var classEntering = 'cd-h-timeline__event--selected cd-h-timeline__event--enter-left',
                classLeaving = 'cd-h-timeline__event--leave-right';
        } else {
            var classEntering = 'cd-h-timeline__event--selected',
                classLeaving = '';
        }

        Util.addClass(timeline.content[timeline.newDateIndex], classEntering);
        if (timeline.newDateIndex != timeline.oldDateIndex) {
            Util.removeClass(timeline.content[timeline.oldDateIndex], 'cd-h-timeline__event--selected');
            Util.addClass(timeline.content[timeline.oldDateIndex], classLeaving);
            timeline.contentWrapper.style.height = timeline.content[timeline.newDateIndex].offsetHeight + 'px';
        }
    };

    function resetAnimation(timeline) { // reset content classes when entering animation is over
        timeline.contentWrapper.style.height = null;
        Util.removeClass(timeline.content[timeline.newDateIndex], 'cd-h-timeline__event--enter-right cd-h-timeline__event--enter-left');
        Util.removeClass(timeline.content[timeline.oldDateIndex], 'cd-h-timeline__event--leave-right cd-h-timeline__event--leave-left');
    };

    function keyNavigateTimeline(timeline, direction) { // navigate the timeline using the keyboard
        var newIndex = (direction == 'next') ? timeline.newDateIndex + 1 : timeline.newDateIndex - 1;
        if(newIndex < 0 || newIndex >= timeline.date.length) return;
        selectNewDate(timeline, timeline.date[newIndex]);
        resetTimelinePosition(timeline, direction);
    };
    
    function resetTimelinePosition(timeline, direction) { //translate timeline according to new selected event position
        var eventStyle = window.getComputedStyle(timeline.selectedDate, null),
            eventLeft = Number(eventStyle.getPropertyValue('left').replace('px', '')),
            timelineWidth = timeline.datesContainer.offsetWidth;

    if( (direction == 'next' && eventLeft >= timelineWidth - timeline.translate) || (direction == 'prev' && eventLeft <= - timeline.translate) ) {
        timeline.translate = timelineWidth/2 - eventLeft;
        translateTimeline(timeline, false);
    }
  };

  function parseDate(timeline) { // get timestamp value for each date
        var dateArrays = [];
        for(var i = 0; i < timeline.date.length; i++) {
            var singleDate = timeline.date[i].getAttribute('data-date'),
                dateComp = singleDate.split('T');
            
            if( dateComp.length > 1 ) { //both DD/MM/YEAR and time are provided
                var dayComp = dateComp[0].split('/'),
                    timeComp = dateComp[1].split(':');
            } else if( dateComp[0].indexOf(':') >=0 ) { //only time is provide
                var dayComp = ["2000", "0", "0"],
                    timeComp = dateComp[0].split(':');
            } else { //only DD/MM/YEAR
                var dayComp = dateComp[0].split('/'),
                    timeComp = ["0", "0"];
            }
            var newDate = new Date(dayComp[2], dayComp[1]-1, dayComp[0], timeComp[0], timeComp[1]);
            dateArrays.push(newDate);
        }
      return dateArrays;
  };

  function calcMinLapse(timeline) { // determine the minimum distance among events
        var dateDistances = [];
        for(var i = 1; i < timeline.dateValues.length; i++) { 
        var distance = daydiff(timeline.dateValues[i-1], timeline.dateValues[i]);
        if(distance > 0) dateDistances.push(distance);
        }

        return (dateDistances.length > 0 ) ? Math.min.apply(null, dateDistances) : 86400000;
    };

    function daydiff(first, second) { // time distance between events
        return Math.round((second-first));
    };

  window.HorizontalTimeline = HorizontalTimeline;

  var horizontalTimeline = document.getElementsByClassName('js-cd-h-timeline'),
    horizontalTimelineTimelineArray = [];
  if(horizontalTimeline.length > 0) {
        for(var i = 0; i < horizontalTimeline.length; i++) {
            horizontalTimelineTimelineArray.push(new HorizontalTimeline(horizontalTimeline[i])); 
        }
        // navigate the timeline when inside the viewport using the keyboard
        document.addEventListener('keydown', function(event){
            if( (event.keyCode && event.keyCode == 39) || ( event.key && event.key.toLowerCase() == 'arrowright') ) {
                updateHorizontalTimeline('next'); // move to next event
            } else if((event.keyCode && event.keyCode == 37) || ( event.key && event.key.toLowerCase() == 'arrowleft')) {
                updateHorizontalTimeline('prev'); // move to prev event
            }
        });
  };

  function updateHorizontalTimeline(direction) {
        for(var i = 0; i < horizontalTimelineTimelineArray.length; i++) {
            if(elementInViewport(horizontalTimeline[i])) keyNavigateTimeline(horizontalTimelineTimelineArray[i], direction);
        }
  };

  /*
        How to tell if a DOM element is visible in the current viewport?
        http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
    */
    function elementInViewport(el) {
        var top = el.offsetTop;
        var left = el.offsetLeft;
        var width = el.offsetWidth;
        var height = el.offsetHeight;

        while(el.offsetParent) {
            el = el.offsetParent;
            top += el.offsetTop;
            left += el.offsetLeft;
        }

        return (
            top < (window.pageYOffset + window.innerHeight) &&
            left < (window.pageXOffset + window.innerWidth) &&
            (top + height) > window.pageYOffset &&
            (left + width) > window.pageXOffset
        );
    }
}());
