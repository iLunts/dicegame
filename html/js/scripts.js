$(document).ready(function(){
    
    //date
    
    var deadline = 'April 1 2018 23:59:59';
    
    function getTimeRemaining(endtime){
        var t = Date.parse(endtime) - Date.parse(new Date());
        var seconds = Math.floor( (t/1000) % 60 );
        var minutes = Math.floor( (t/1000/60) % 60 );
        var hours = Math.floor( (t/(1000*60*60)) % 24 );
        var days = Math.floor( t/(1000*60*60*24) );
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }
    
    var timeObj = {
        days: 'timer_days',
        hours: 'timer_hours',
        minutes: 'timer_minutes',
        seconds: 'timer_seconds'
    }
    
    function firstInitializeClock(objId, endtime) {
        var t = getTimeRemaining(endtime);
        if ( t.total > 0 ) {
            var days = document.getElementById(objId.days);
            var hours = document.getElementById(objId.hours);
            var minutes = document.getElementById(objId.minutes);
            var seconds = document.getElementById(objId.seconds);


            days.innerHTML = ('0' + t.days).slice(-2);
            hours.innerHTML = ('0' + t.hours).slice(-2);
            minutes.innerHTML = ('0' + t.minutes).slice(-2);
            seconds.innerHTML = ('0' + t.seconds).slice(-2);
        }
    }
    
    function initializeClock(objId, endtime) {
        var days = document.getElementById(objId.days);
        var hours = document.getElementById(objId.hours);
        var minutes = document.getElementById(objId.minutes);
        var seconds = document.getElementById(objId.seconds);
        
        var timeinterval = setInterval(function(){
            var t = getTimeRemaining(endtime);
            
            days.innerHTML = ('0' + t.days).slice(-2);
            hours.innerHTML = ('0' + t.hours).slice(-2);
            minutes.innerHTML = ('0' + t.minutes).slice(-2);
            seconds.innerHTML = ('0' + t.seconds).slice(-2);
            if ( t.total <= 0 ) {
                clearInterval(timeinterval);
            }
        }, 1000);
    }
    
    firstInitializeClock(timeObj, deadline);
    initializeClock(timeObj, deadline);
    
    
    $('span.economy__tab').on('click', function(){
       $('span.economy__tab').removeClass('active');
       $(this).addClass('active');
       var currentPage = $(this).data('tab');

       $('div.economy__page__wrap').removeClass('active');
       $($('div.economy__page__wrap')[currentPage]).addClass('active');
    });
    
    $('.questions__item__title').on('click', function(){
        $('.questions__item__desc:visible').slideUp(250);
        $('.questions__item__title').not(this).find('i').removeClass('active');
        $(this).next().stop().slideToggle(250);
        $(this).find('i').toggleClass('active');
    });
    
    
    $('.footer__social__input').on('input', function () {
        if ($(this).val().length > 0) {
            $(this).siblings('span.placeholder').addClass('active');
        }
        else {
            $(this).siblings('span.placeholder').removeClass('active');
        }
    });
    
    var timer;
    
    $('.team__item__more--btn').on('click', function(){
        
        var item = $(this).siblings('.team__item__desc');
        
        item.addClass('active');
        timer = setTimeout(function(){
            item.removeClass('active');
        }, 5000)
    })
    $('.team__item__desc').on('click', function(){
        $(this).removeClass('active');
    });
    
    $('.social__media__btn').on('click', function(){
        $('.social__media').toggleClass('active');
        
        $('#popup__whitepaper').fadeOut(200);
        $('main, footer').removeClass('blur');
    });
    
    var swiperData = {
        direction: 'vertical',
        height: 250,
        initialSlide: 0,
        slidesPerView: 1,
        on: {
            touchEnd: function(e){
                if (this.isEnd) {
                    $("html, body").animate({
                        scrollTop: $('#how-work').offset().top
                    }, 500)
                }
                if (this.isBeginning) {
                    $("html, body").animate({
                        scrollTop: $('.about').offset().top
                    }, 500)
                }
                console.log(this);
            }
        }
    };

    var menu_selector = "nav";
    function onScroll(){
        var scroll_top = $(document).scrollTop();
        $(menu_selector + " a.nav__link").each(function(){
            var hash = $(this).attr("href");
            var target = $(hash);
            if (target.position().top <= scroll_top && target.position().top + target.outerHeight() > scroll_top) {
                $(menu_selector + " a.active").removeClass("active");
                $(this).addClass("active");
                if ($(target).is('#features') && $(window).width() > 1083) {
                    
                    $('.features__item__wrap').delay(500).addClass('active');
                }
            }
        });
        if ($(window).scrollTop() > 75) {
            $('header').addClass('active');
        }else {
            $('header').removeClass('active');
        }
        
        $('.nav__lang').removeClass('active');
        $('.social__media').removeClass('active');
        
    }
    
	$(document).on("scroll", onScroll);
	$("a[href^=\\#]").click(function(e){
		e.preventDefault();
		$(document).off("scroll");
		$(menu_selector + " a.active").removeClass("active");
		$(this).addClass("active");
		var hash = $(this).attr("href");
		var target = $(hash);
		$("html, body").animate({
		    scrollTop: target.offset().top
		}, 500, function(){
			window.location.hash = hash;
			$(document).on("scroll", onScroll);
            if ($(target).is('#features') && $(window).width() < 1083) {
                $('.features__item__wrap').delay(500).addClass('active');
            }
		});
	});
    
    $('.nav__lang').on('click', function(e){
        if ($(e.target).is('.nav__lang__short')) {
            $('.nav__lang').toggleClass('active');
            
            $('header > .container .social__media').css({
                'z-index': '-1'
            })
        }
    });
    
    $('.counter__docs__whitepaper').on('click', function(){
        
        $('.nav__btn').removeClass('active');
        $('nav').removeClass('active');
        
        $('main, footer').addClass('blur');
        $('#popup__whitepaper').fadeIn(700);
    });
    
    $('.popup__whitepaper__close').on('click', function(){
        $('#popup__whitepaper').fadeOut(200);
        $('main, footer').removeClass('blur');
    })
    
    
    jQuery('#road-map').scrollbar();
    
    
    var mySwiper = undefined;
    function initSwiper() {
        var screenWidth = $(window).width();
        if(screenWidth < 1084 && mySwiper == undefined) {            
            mySwiper = new Swiper('.swiper-container', swiperData);
            $('.features__item__wrap').removeClass('active');
        } else if (screenWidth > 1084 && mySwiper != undefined) {
            mySwiper.destroy();
            mySwiper = undefined;
            jQuery('.swiper-wrapper').removeAttr('style');
            jQuery('.swiper-slide').removeAttr('style');            
        }
    }

    //Swiper plugin initialization
    initSwiper();

    //Swiper plugin initialization on window resize
    $(window).on('resize', function(){
        initSwiper();        
    });
    
    $('.nav__btn').on('click', function(){
        if ($('#popup__whitepaper').is(':visible')) {
            console.log(123);
            
            $('main, footer').removeClass('blur');
            $('#popup__whitepaper').hide();
        }
        $('main, footer').toggleClass('blur');
        
        $(this).toggleClass('active');
        $('nav').toggleClass('active');
    })

    
    if ($(window).width() < 800) {
        $('.nav__lang__wrap').on('click', function(e) {
            if ($(e.target).hasClass('nav__lang__wrap')) {
                $('.nav__lang').removeClass('active');
                $('header > .container .social__media').css({
                    'z-index': '0'
                })
            }
        })
    }
});