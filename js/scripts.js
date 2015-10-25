'use strict';
(function($){

    var header_placeholder = $('#header-placeholder'),
        header = $('#primary-navigation-container'),
        header_height = header.innerHeight(),

        header_offset = header.offset(),
        is_sticky = $('body').hasClass('sticky-header'),

        $header_background = $('.transparent-header #header-wrap .image-background img'),

        edge_limit = $('#page').width();

    function wbk_sticky(){
        if( is_sticky && $(window).width() >= '768' && header.length){

            var window_scroll = $(window).scrollTop();

            if( window_scroll >= header_offset.top ){

                header.addClass('is-sticky');
                header_placeholder.css('height', header_height);

            }
            else {
                header.removeClass('is-sticky');

                header_placeholder.css('height',0);
            }
        }
    }


    function wbk_resize_header() {
        if($header_background.length && $(window).width() >= '768') {
            $('.transparent-header #header-wrap').height($header_background.height());
        } else {
            $('#header-wrap').css('height', 'auto');
        }
    }

    function wbk_center_slider_caption(){
        var $caption = $('.slider-container .caption');
        var controllers_height = 0;

        if($(window).width() >= '992')
            controllers_height = parseInt($('.controllers-container').height()/2, 10);

        if($caption.length) {
            $caption.each(function(){
               $(this).css('margin-top', '-' + parseInt($(this).height()/2 + controllers_height, 10) + 'px');
            });
        }
    }

    $(window).on('load', function(){
        wbk_resize_header();
        wbk_center_slider_caption();
        wbk_sticky();
    });

    $(window).on('resize',function(){
        wbk_resize_header();
        wbk_center_slider_caption();
        edge_limit = $('#page').width();
    });

    $(window).on('scroll', function(){
        wbk_sticky();
    });

    function calculate_edge(who) {
        var elm = $(who).find('ul').first();
        if(elm.length) {
            var off = elm .offset(),
                l = off.left,
                w = elm.width(),

                isEntirelyVisible = (l+ w <= edge_limit);

            if ( ! isEntirelyVisible ) {
                $(who).addClass('edge');
            } else {
                $(who).removeClass('edge');
            }
        }
    }

    $(".nav li").on('mouseenter', function(){
        var someElement = $(this),
            elm = $(this).find('ul').first();

        elm.addClass('opening');
        var timeoutId = setTimeout(function(){
                elm.addClass('opened');
            }, 600);
        //set the timeoutId, allowing us to clear this trigger if the mouse comes back over
        someElement.data('timeoutId', timeoutId);

        calculate_edge(this);

    }).on('mouseleave', function(){
        clearTimeout($(this).data('timeoutId'));
        var elm = $(this).find('ul').first();
        elm.removeClass('opened');
        elm.removeClass('opening');

        calculate_edge(this);

    });

    //Parallax initialization
    $.stellar();

    //Scroll effects on elements
    new WOW().init();
})(jQuery);
