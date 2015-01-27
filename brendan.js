var cards = [];

viewPort = $(window).width();
function Card(desktopPic, tabletPic, mobilePic,  altText, bgColor, html) {
    this.desktopPic = desktopPic;
    this.tabletPic = tabletPic;
    this.mobilePic = mobilePic;
    this.altText = altText;
    this.bgColor = bgColor;
    this.html = [
        '<img class=\'image-desktop carousel-image-' + cards.length + '\' src=\'' +this.desktopPic + '\' alt=\'' + this.alt + '\'/>',
        '<img class=\'image-tablet carousel-image-' + cards.length + '\' src=\'' + this.tabletPic + '\' alt=\'' + this.alt + '\'/>',
        '<img class=\'image-mobile carousel-image-' + cards.length + '\' src=\'' + this.mobilePic + '\' alt=\'' + this.alt + '\'/>',
        html
    ];
    this.content = this.html.join('');
}
cards = [
    new Card('Banner1.jpg',
        'http://placekitten.com/890/243',
        'http://placekitten.com/600/243',
        'heyo',
        '#fff',
        [
            '<div class=\'carousel-content-0\'>',
            '<h1 class=\'carousel-item-header\'>Hello 1</h1>',
            '<h3 class=\'carousel-item-subheader\'>Subtitle</h3>',
            '<button><a href=\'http://www.google.com\'>Men\'s Glasses ›</a></button>',
            '</div>'
        ].join('')
    ),
    new Card('http://placekitten.com/1000/330',
        'http://placekitten.com/890/243',
        'http://placekitten.com/600/243',
        'Brandon',
        '#fff',
        [
            '<div class=\'carousel-content-1\'>',
            '<h1 class=\'carousel-item-header\'>Hello 1</h1>',
            '<h3 class=\'carousel-item-subheader\'>Subtitle</h3>',
            '<button><a href=\'http://www.google.com\'>Men\'s Glasses ›</a></button>',
            '</div>'
        ].join('')
    ),
    new Card('http://placekitten.com/1000/331',
        'http://placekitten.com/890/243',
        'http://placekitten.com/600/243',
        'Austin',
        '#fff',
        [
            '<div class=\'carousel-content-2\'>',
            '<h1 class=\'carousel-item-header\'>Hello 1</h1>',
            '<h3 class=\'carousel-item-subheader\'>Subtitle</h3>',
            '<button><a href=\'mathdrquinn.github.io/Peralta_blueion\'>Men\'s Glasses ›</a></button>',
            '</div>'
        ].join('')
    )
];

// Populate first Carousel-item
$('#carousel-ul').append('<li id=\'carousel-item-' + 0 + '\' class=\'swiper-slide\' data-dot=\'' + 0 + '\' style=\'background-color: ' + cards[0].bgColor + '\'><div class=\'item-inner\'>' + cards[0].content + '</div></li>');


$(document).ready(function(){

 /* Populates carousel with images
//////////////////////////////////////////////////////////*/
    function populateCarousel (cards) {
        for (var i=1; i < cards.length; i++) {

            // Populates carousel-ul with li's
            $('#carousel-ul').append('<li id=\'carousel-item-' + i + '\' class=\'swiper-slide\' data-dot=\'' + i + '\' style=\'background-color: ' + cards[i].bgColor + '\'><div class=\'item-inner\'>' + cards[i].content + '</div></li>');
        }

        //// Key-frame animation adding bounce
        //setTimeout(function () {
        //    $('#carousel-ul').addClass('bounce');
        //}, 500);
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



