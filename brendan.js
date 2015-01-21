var timer = 6000;
var lastScrollLocation = 0;
var cards = [];
var tags = [];
var $cInner = $('#carousel-inner');

viewPort = $(window).width();
function Card(pic, altText, bgColor, html) {
    this.pic = pic;
    this.altText = altText;
    this.bgColor = bgColor;
    this.html = [
        '<img class=\'carousel-image-' + cards.length + '\' src=\'' + this.pic + '\' alt=\'' + this.alt + '\'/>',
        html
    ];
    this.content = this.html.join('');
}
cards = [
    new Card('Banner1.jpg',
        'heyo',
        '#fff',
        [
            '<div class=\'carousel-content-0\'>',
            '<h1 class=\'carousel-item-header\'>Hello 1</h1>',
            '<h3 class=\'carousel-item-subheader\'>Subtitle</h3>',
            '<button><a href="Peralta_blueion">Men\'s Glasses ›</a></button>',
            '</div>'
        ].join('')
    ),
    new Card('http://placekitten.com/1000/330',
        'Brandon',
        '#fff',
        [
            '<div class=\'carousel-content-1\'>',
            '<h1 class=\'carousel-item-header\'>Hello 1</h1>',
            '<h3 class=\'carousel-item-subheader\'>Subtitle</h3>',
            '<button><a href="Peralta_blueion">Men\'s Glasses ›</a></button>',
            '</div>'
        ].join('')
    ),
    new Card('http://placekitten.com/1000/331',
        'Austin',
        '#fff',
        [
            '<div class=\'carousel-content-2\'>',
            '<h1 class=\'carousel-item-header\'>Hello 1</h1>',
            '<h3 class=\'carousel-item-subheader\'>Subtitle</h3>',
            '<button><a href="Peralta_blueion">Men\'s Glasses ›</a></button>',
            '</div>'
        ].join('')
    ),
    new Card('http://placekitten.com/1000/329',
        'Stephanie',
        '#fff',
        [
            '<div class=\'carousel-content-3\'>',
            '<h1 class=\'carousel-item-header\'>Hello 1</h1>',
            '<h3 class=\'carousel-item-subheader\'>Subtitle</h3>',
            '<button><a href="Peralta_blueion">Men\'s Glasses ›</a></button>',
            '</div>'
        ].join('')
    )

];

$(document).ready(function(){

 /* Populates carousel with images
//////////////////////////////////////////////////////////*/
    function populateCarousel (cards) {
        for (var i=0; i < cards.length; i++) {

            // Populates carousel-ul with li's
            $('#carousel-ul').append('<li id=\'carousel-item-' + i + '\' class=\'swiper-slide\' data-dot=\'' + i + '\' style=\'background-color: ' + cards[i].bgColor + '\'><div class=\'item-inner\'>' + cards[i].content + '</div></li>');

            //// Setting Dots
            //if (i === 0) {
            //    $('#dot-inner').append('<div id=\'dot-' + i + '\' class=\'dot white-dot\' data-place=\'' + i + '\'></div>');
            //}
            //else {
            //    $('#dot-inner').append('<div id=\'dot-' + i + '\' class=\'dot\' data-place=\'' + i + '\'></div>');
            //}
            // Array of DOM elements to run .forEach in snapScroll
            tags.push($('#carousel-item-' + i));
        }

        // Key-frame animation adding bounce
        setTimeout(function () {
            $('#carousel-ul').addClass('bounce');
        }, 500);
    }

    populateCarousel(cards);

/* Manual Slide Right
//////////////////////////////////////////////////////////*/
    $('#right-scroll').click(function(e){

        e.preventDefault();
        mySwiper.swipeNext();

        //var currentDot = $('.swiper-active-switch').index() + 1;
        //var nextDot = currentDot + 1 ;
        //
        //slideRight(currentDot, nextDot, 500);
    });

    function slideRight(x, y, time) {
        // Ends timed scroll
        clearInterval(timerId);

        // Get starting left indent
        var startLeftIndent = parseInt($('#carousel-ul').css('left'));
        // Get the width of the items ( i like making the jquery part dynamic, so if you change the width in the css you won't have o change it here too ) '
        var itemWidth = $('#carousel-ul li').outerWidth() + 10; // 10 is for compensation for margin

        // Calculate the new left indent of the unordered list
        var leftIndent = startLeftIndent - itemWidth;

        // Make the sliding effect using jquery's anumate function '
        $('#carousel-ul').animate({'left' : leftIndent}, time,function(){

            // Get the first list item and put it after the last list item (that's how the infinite effects is made) '
            $('#carousel-ul li:last').after($('#carousel-ul li:first'));

            //and get the left indent to the default -210px
            $('#carousel-ul').css('left', startLeftIndent);
            var currentDot = x;
            var nextDot = y;

            if (nextDot === cards.length + 1) {
                $('.swiper-pagination-switch').removeClass('swiper-visible-switch swiper-active-switch');
                $('.swiper-pagination-switch:nth-child(1)').addClass('swiper-visible-switch swiper-active-switch')
            }
            else {
                $('.swiper-pagination-switch:nth-child(' + currentDot + ')').removeClass('swiper-visible-switch swiper-active-switch');
                $('.swiper-pagination-switch:nth-child(' + nextDot + ')').addClass('swiper-visible-switch swiper-active-switch')
            }
        });
    }

/* Manual Slide Left
//////////////////////////////////////////////////////////*/
    $('#left-scroll').click(function(e){

        e.preventDefault();
        mySwiper.swipePrev();

        //var currentDot = $('.swiper-active-switch').index() + 1;
        //var nextDot = currentDot - 1 ;
        //
        //slideLeft(currentDot, nextDot, 500);

    });

    function slideLeft (x, y, time) {

        // Ends timed scroll
        clearInterval(timerId);

        // Get starting left indent
        var startLeftIndent = parseInt($('#carousel-ul').css('left'));

        var itemWidth = $('#carousel-ul li').outerWidth(); // 10 is for compensation for margin

        /* same as for sliding right except that it's current left indent + the item width (for the sliding right it's - itemWidth) */
        var leftIndent = startLeftIndent + itemWidth;

        $('#carousel-ul').animate({'left' : leftIndent}, time,function(){

            /* when sliding to left we are moving the last item before the first item */
            $('#carousel-ul li:first').before($('#carousel-ul li:last'));

            /* and again, when we make that change we are setting the left indent of our unordered list to the default -210px */
            $('#carousel-ul').css('left', startLeftIndent);

            // Move Dot
            var currentDot = x;
            var nextDot = y;

            if (nextDot === 0) {
                $('.swiper-pagination-switch').removeClass('swiper-visible-switch swiper-active-switch');
                $('.swiper-pagination-switch:nth-child(' + cards.length + ')').addClass('swiper-visible-switch swiper-active-switch')
            }
            else {
                $('.swiper-pagination-switch:nth-child(' + currentDot + ')').removeClass('swiper-visible-switch swiper-active-switch');
                $('.swiper-pagination-switch:nth-child(' + nextDot + ')').addClass('swiper-visible-switch swiper-active-switch')
            }
        });
    }

/* Carousel function
////////////////////////////////////////////////////////*/
    function runCarousel (cards) {

        // Get starting left indent
        var startLeftIndent = parseInt($('#carousel-ul').css('left'));

        // Get the width of the items ( i like making the jquery part dynamic, so if you change the width in the css you won't have o change it here too ) '
        var itemWidth = $('#carousel-ul li').outerWidth();

        // Calculate the new left indent of the unordered list
        var leftIndent = parseInt($('#carousel-ul').css('left')) - itemWidth;

        // Make the sliding effect using jquery's anumate function '
        $('#carousel-ul').animate({'left' : leftIndent},function(){

            // Get the first list item and put it after the last list item (that's how the infinite effects is made) '
            $('#carousel-ul li:last').after($('#carousel-ul li:first'));

            // And get the left indent to the default
            $('#carousel-ul').css('left', startLeftIndent);

            // Move Dot
            var currentDot = $('.swiper-active-switch').index() + 1;
            var nextDot = currentDot + 1 ;

            if (nextDot === cards.length + 1) {
                $('.swiper-pagination-switch').removeClass('swiper-visible-switch swiper-active-switch');
                $('.swiper-pagination-switch:nth-child(1)').addClass('swiper-visible-switch swiper-active-switch')
            }
            else {
                $('.swiper-pagination-switch:nth-child(' + currentDot + ')').removeClass('swiper-visible-switch swiper-active-switch');
                $('.swiper-pagination-switch:nth-child(' + nextDot + ')').addClass('swiper-visible-switch swiper-active-switch')
            }
        });
    };

// Calling function at time interval 6s
    var timerId = setInterval(function() {
            if ($(window).width() <= 910) {
                clearInterval(timerId);
            }
            else {
                runCarousel(cards)
            }
        },
        timer
    );

/* Slide to specific Image
////////////////////////////////////////////////////////*/
    $('.swiper-pagination-switch').on('click', function () {
        var currentDot = parseInt($('.swiper-active-switch').data('place'));
        var selectedDot = parseInt($(this).data('place'));

        dotSlide(currentDot, selectedDot, currentDot, selectedDot);
    });

    function dotSlide (x, y, a, b) {

        if (x < y) {

            // scroll right
            slideRight(x, y, 350)
            dotSlide(++x, y, a, b)
        }
        else if (x > y) {

            // scroll left
            slideLeft(x, y, 350);
            dotSlide(--x, y, a, b);
        }
        else {
            // do nothing
            return;
        }
    }

/* Snap scroll Event
////////////////////////////////////////////////////////// */

    $(window).resize(function () {
        oldViewPort = viewPort;
        viewPort = $(this).width();
        console.log('oldView: ' + oldViewPort + ', viewPort: ' + viewPort);

        if(viewPort <= 910 && oldViewPort > 910) {
            console.log('create swiper')

            //end auto play
            if (viewPort < 910) {
                console.log('kill autoplay!!!!!!!!!!!!')
                clearInterval(timerId);
            }
        }
        else if(viewPort > 910 && oldViewPort <= 910 ) {
            console.log('swiper is removed')
            if ($(window).width() < 910) {
            }
        }
        else {
            console.log('should not be here')
        }

    });

    // Swipe.js
    var mySwiper = new Swiper('.swiper-container',{
        mode:'horizontal',
        loop: true,
        pagination: '#dot-inner',
        paginationClickable: true,
        keyboardControl: true
    });

    $('.swiper-container').on('swipe', function () {
        var dot = mySwiper.activeSlide().data('dot');
        console.log(dot);
        $('.dot').removeClass('swiper-active-switch');
        $('#dot-' + dot).addClass('swiper-active-switch');
    })
    $('.swiper-container').on('mouseup', function () {
        var dot = mySwiper.activeSlide().data('dot');
        console.log('mouseup!!!!');
        $('.dot').removeClass('swiper-active-switch');
        $('#dot-' + dot).addClass('swiper-active-switch');


    })
}); // End Doc Ready



