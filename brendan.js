var timer = 6000;
var lastScrollLocation = 0;
var cards = [];
var tags = [];
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
            $('#carousel-ul').append('<li id=\'carousel-item-' + i + '\' style=\'background-color: ' + cards[i].bgColor + '\'><div class=\'item-inner\'>' + cards[i].content + '</div></li>');

            // Setting Dots
            if (i === 0) {
                $('#dot-inner').append('<div id=\'dot-' + i + '\' class=\'dot white-dot\' data-place=\'' + i + '\'></div>');
            }
            else {
                $('#dot-inner').append('<div id=\'dot-' + i + '\' class=\'dot\' data-place=\'' + i + '\'></div>');
            }
            // Array of DOM elements to run .forEach in snapScroll
            tags.push($('#carousel-item-' + i));
        }

        // Move the last list item before the first item. The purpose of this is if the user clicks previous he will be able to see the last item.
        $('#carousel-ul li:first').before($('#carousel-ul li:last'));

        // Key-frame animation adding bounce
        setTimeout(function () {
            $('#carousel-ul').addClass('bounce');
        }, 500);
    }

    populateCarousel(cards);

/* Manual Slide Right
//////////////////////////////////////////////////////////*/
    $('#right-scroll').click(function(){

        var currentDot = $('.white-dot').data('place');
        var nextDot = parseInt($('.white-dot').data('place')) + 1 ;

        slideRight(currentDot, nextDot, 500);
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
            var currentDot = x || $('.white-dot').data('place');
            var nextDot = y || parseInt($('.white-dot').data('place')) + 1 ;

            if (nextDot === cards.length) {
                $('#dot-' + currentDot).removeClass('white-dot');
                $('#dot-0').addClass('white-dot')
            }
            else {
                $('#dot-' + currentDot).removeClass('white-dot');
                $('#dot-' + nextDot).addClass('white-dot')
            }
        });
    }

/* Manual Slide Left
//////////////////////////////////////////////////////////*/
    $('#left-scroll').click(function(){

        var currentDot = $('.white-dot').data('place');
        var nextDot = parseInt($('.white-dot').data('place')) - 1 ;

        slideLeft(currentDot, nextDot, 500);

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
            var currentDot = x || $('.white-dot').data('place');
            var nextDot = y || parseInt($('.white-dot').data('place')) - 1 ;

            if (nextDot === -1) {
                $('#dot-' + currentDot).removeClass('white-dot');
                $('#dot-' + (cards.length - 1)).addClass('white-dot')
            }
            else {
                $('#dot-' + currentDot).removeClass('white-dot');
                $('#dot-' + nextDot).addClass('white-dot')
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
            var currentDot = $('.white-dot').data('place');
            var nextDot = parseInt($('.white-dot').data('place')) + 1 ;

            if (nextDot === cards.length) {
                $('#dot-' + currentDot).removeClass('white-dot');
                $('#dot-0').addClass('white-dot')
            }
            else {
                $('#dot-' + currentDot).removeClass('white-dot');
                $('#dot-' + nextDot).addClass('white-dot')
            }
        });
    };

// Calling function at time interval 6s
    var timerId = setInterval(function() {
            if ($(window).width() < 910) {
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
    $('.dot').on('click', function () {
        var currentDot = parseInt($('.white-dot').data('place'));
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

    // Scroll Event
    $('#carousel-inner').on('scroll', function () {

        if($(window).width() < 910) {
            determineDirection($(this))
        }
    });

    function determineDirection ($target) {

        var currentScrollLocation = $target.scrollLeft();

        if (lastScrollLocation <= currentScrollLocation ) {
            snapScrollLeft(currentScrollLocation);
        }
        else {
            snapScrollRight(currentScrollLocation);
        }

        lastScrollLocation = currentScrollLocation;
    } // End Determine Direction

    function snapScrollLeft (currentScrollLocation) {

        var left = currentScrollLocation;

        tags.forEach(function(x, y) {
            var itemWidth = x.outerWidth();
            var adjustedIndex = y + 1;
            var itemPositionLeft = itemWidth * y;
            var itemPositionRight = itemWidth * adjustedIndex;

            if (left - 10 > itemWidth * (tags.length - 1)) {
                console.log('bad')
                $('#carousel-inner').animate({
                    scrollLeft: itemWidth * (tags.length - 1) }, 200, function () {
                });
            }
            else if (left % itemWidth < 10) {return;}
            else if (left > itemPositionLeft && left < itemPositionRight && left % 10 === 0) {
                $('#carousel-inner').off('scroll');
                $('#carousel-inner').animate({
                    scrollLeft: itemPositionRight },
                    300,
                    function () {

                        // Temporarily remove scrolling ability from carousel
                        console.log('hide stuff!')
                        $(this).css('overflow-x', 'hidden');

                        // Slide Dots
                        $('.dot').removeClass('white-dot')
                        $('#dot-' + adjustedIndex).addClass('white-dot');

                        setTimeout(function () {
                            $('#carousel-inner').on('scroll', function(){
                                determineDirection($(this))
                            });  // End Listener
                            console.log('unhide stuff!')
                            $('#carousel-inner').css('overflow-x', 'scroll');
                        }, 300); // End Timeout

                    }); // End Animate
            } // End Else if
        }); // End forEach
    } // End SnapScrollLeft

    function snapScrollRight (currentScrollLocation) {

        var left = currentScrollLocation;

        tags.forEach(function(x, y) {
            var itemWidth = x.outerWidth();
            var adjustedIndex = y + 1;
            var itemPositionLeft = itemWidth * y;
            var itemPositionRight = itemWidth * adjustedIndex;

            if (left + 20 > itemWidth * (tags.length - 1)) {
                console.log('good')
            }
            else if (left === 0 || (left + 10) % itemWidth < 10) {return;}
            else if (left > itemPositionLeft && left < itemPositionRight && left % 10 === 0) {
                $('#carousel-inner').off('scroll');
                $('#carousel-inner').animate({
                    scrollLeft: itemPositionLeft },
                    300,
                    function () {

                        // Temporarily remove scrolling ability from carousel
                        console.log('hide stuff!')
                        $(this).css('overflow-x', 'hidden');

                        // Slide Dots
                        $('.dot').removeClass('white-dot')
                        $('#dot-' + y).addClass('white-dot');

                        setTimeout(function () {
                            $('#carousel-inner').on('scroll', function(){
                                determineDirection($(this))
                            });  // End Listener
                            console.log('unhide stuff!')
                            $('#carousel-inner').css('overflow-x', 'scroll');
                    }, 300); // End Timeout
                });
            }
        });
    }; // End snapScrollRight
}); // End Doc Ready



