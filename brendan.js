var cards = [];

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

    });

/* Manual Slide Left
//////////////////////////////////////////////////////////*/
    $('#left-scroll').click(function(e){

        e.preventDefault();
        mySwiper.swipePrev();

    });

/* Snap scroll Event and Carousel
////////////////////////////////////////////////////////// */

    // Swipe.js
    if(viewPort > 910) {
        var mySwiper = new Swiper('.swiper-container',{
            mode:'horizontal',
            loop: true,
            pagination: '#dot-inner',
            paginationClickable: true,
            keyboardControl: true,
            autoplay: 5000,
            autoplayDisableInteraction: true
        });
    }
    else {
        var mySwiper = new Swiper('.swiper-container',{
            mode:'horizontal',
            loop: true,
            pagination: '#dot-inner',
            paginationClickable: true,
            keyboardControl: true
        });
    }

}); // End Doc Ready



