function onLoad() {
    computeCardPositions();
}

function scrollHandler() {
    computeCardPositions();
}

function computeCardPositions() {
    var carouselContainerElem = document.getElementsByClassName('carousel-container')[0];
    const carouselBound = carouselContainerElem.getBoundingClientRect();
    const caroundBoundRight = Math.trunc(carouselBound.right);
    // console.log('caroundBoundRight', caroundBoundRight);

    var cardContainerElem = document.getElementsByClassName('card-container');
    for (var i = 0; i < cardContainerElem.length; i++) {
        // const pElem = cardContainerElem[i].getElementsByTagName('p')[0];
        const cardContainerBound = cardContainerElem[i].getBoundingClientRect();
        const cardContainerRelPos = Math.trunc(cardContainerBound.left + cardContainerBound.width);

        if (cardContainerRelPos > caroundBoundRight) {
            // console.log('cardContainerRelPos', i, cardContainerRelPos);
            if (cardContainerBound.left <= caroundBoundRight) {
                const pct = Math.trunc((caroundBoundRight - cardContainerBound.left) / cardContainerBound.width * 100);
                console.log('pct', i, pct);
                if (pct < 99 ) {
                    // const offset = pct > 20 ? 20 : 5;
                    const offset = pct <= 80 ? pct - 20 : (2 * pct - 105) ;
                    console.log('offset', offset);
                    cardContainerElem[i].style.background = 'unset';
                    cardContainerElem[i].style.backgroundImage = 'linear-gradient(to right, white ' + offset + '%, rgba(255, 255, 255, 0) ' + pct + '%)';
                    // pElem.style.maskImage = 'linear-gradient(to right, rgba(0,0,0,1) ' + (pct - 20) + ', rgba(0,0,0,0)' + pct + '%)';
                    // pElem.style.webkitMaskImage = 'linear-gradient(to right, rgba(0,0,0,1) ' + (pct - 20) + ', rgba(0,0,0,0)' + pct + '%)';
                } else {
                    cardContainerElem[i].style.background = 'white';
                    cardContainerElem[i].style.backgroundImage = 'unset';
                    // pElem.style.maskImage = 'unset';
                    // pElem.style.webkitMaskImage = 'unset';
                }
            }
            // cardContainerElem[i].classList.add('last-card');
        } else {
            // cardContainerElem[i].classList.remove('last-card');
            cardContainerElem[i].style.background = 'white';
            cardContainerElem[i].style.backgroundImage = 'unset';
            // pElem.style.maskImage = 'unset';
            // pElem.style.webkitMaskImage = 'unset';
        }
    } 

    // console.log('---------------------');
}
