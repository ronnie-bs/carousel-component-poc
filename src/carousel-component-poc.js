// function scrollHandler() {
//     console.log('scrollHandler...');
//     document.get
// }

function showCardPositions() {
    var carouselContainerElem = document.getElementsByClassName('carousel-container')[0];
    // carouselContainerElem.getBoundingClientRect().left;
    console.log('carouselContainerElem', carouselContainerElem.getBoundingClientRect().left);

    var cardContainerElem = document.getElementsByClassName('card-container');
    for (var i = 0; i < cardContainerElem.length; i++) {
        console.log('cardContainerElem[' + i + ']', cardContainerElem[i].offsetLeft, cardContainerElem[i].offsetTop);
    }

    console.log('---------------------');
}
