var timer = 6000;
cards = [];
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
            '<button><a href="#">Men\'s Glasses ›</a></button>',
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
            '<button><a href="#">Men\'s Glasses ›</a></button>',
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
            '<button><a href="#">Men\'s Glasses ›</a></button>',
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
            '<button><a href="#">Men\'s Glasses ›</a></button>',
            '</div>'
        ].join('')
    )

];

$(document).ready(function(){

 /* Populates carousel with images
//////////////////////////////////////////////////////////*/
    var $carousel = $('.carousel-container');
    function populateCarousel (cards) {

        for (var i=0; i < cards.length; i++) {
            $('#carousel-ul').append('<li class=\'carousel-item\' style=\'background-color: ' + cards[i].bgColor + '\'>' + cards[i].content + '</li>')
            if (i === 0) {
                $('#dot-inner').append('<div id=\'dot-' + i + '\' class=\'dot white-dot\' data-place=\'' + i + '\'></div>');
            }
            else {
                $('#dot-inner').append('<div id=\'dot-' + i + '\' class=\'dot\' data-place=\'' + i + '\'></div>');
            }
        }
    }

    populateCarousel(cards);

//move the last list item before the first item. The purpose of this is if the user clicks previous he will be able to see the last item.
    $('#carousel-ul li:first').before($('#carousel-ul li:last'));

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
            console.log('in completion function')
            //and get the left indent to the default -210px
            $('#carousel-ul').css('left', startLeftIndent);
            var currentDot = x || $('.white-dot').data('place');
            var nextDot = y || parseInt($('.white-dot').data('place')) + 1 ;
            console.log(nextDot)
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

        var itemWidth = $('#carousel-ul li').outerWidth() + 10; // 10 is for compensation for margin

        /* same as for sliding right except that it's current left indent + the item width (for the sliding right it's - itemWidth) */
        var leftIndent = startLeftIndent + itemWidth;

        $('#carousel-ul').animate({'left' : leftIndent}, time,function(){

            /* when sliding to left we are moving the last item before the first item */
            $('#carousel-ul li:first').before($('#carousel-ul li:last'));
            console.log('in completion function')
            /* and again, when we make that change we are setting the left indent of our unordered list to the default -210px */
            $('#carousel-ul').css('left', startLeftIndent);

            // Move Dot
            var currentDot = x || $('.white-dot').data('place');
            var nextDot = y || parseInt($('.white-dot').data('place')) - 1 ;
            console.log(nextDot)
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
        var itemWidth = $('#carousel-ul li').outerWidth() + 10; // 10 is for compensation for margin

        // Calculate the new left indent of the unordered list
        var leftIndent = parseInt($('#carousel-ul').css('left')) - itemWidth;

        // Make the sliding effect using jquery's anumate function '
        $('#carousel-ul').animate({'left' : leftIndent},function(){

            //get the first list item and put it after the last list item (that's how the infinite effects is made) '
            $('#carousel-ul li:last').after($('#carousel-ul li:first'));
            console.log('in completion function')
            //and get the left indent to the default -210px
            $('#carousel-ul').css('left', startLeftIndent);

            // Move Dot
            var currentDot = $('.white-dot').data('place');
            var nextDot = parseInt($('.white-dot').data('place')) + 1 ;
            console.log(nextDot)
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

//Calling function at time interval 6s
    var timerId = setInterval(function() {
            if (viewPort < 910) {
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
        console.log(x + ', ' + y)
        if (x < y) {
            console.log('move forward')
            // scroll right
            slideRight(x, y, 350)
            dotSlide(++x, y, a, b)
        }
        else if (x > y) {
            console.log('move backward')
            // scroll left
            slideLeft(x, y, 350);
            dotSlide(--x, y, a, b);
        }
        else {
            // do nothing
            return;
        }
    }
});


