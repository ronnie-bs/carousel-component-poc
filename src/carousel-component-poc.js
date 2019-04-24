let priorLeftOffset = -1;
let priorRightOffset = -1;

function onLoad() {
    computeCardPositions();
}

function scrollHandler() {
    computeCardPositions();
}

function computeCardPositions() {
    var carouselContainerElem = document.getElementsByClassName('carousel-container')[0];
    const carouselBound = carouselContainerElem.getBoundingClientRect();
    const carouselBoundLeft = Math.trunc(carouselBound.left);
    const carouselBoundRight = Math.trunc(carouselBound.right);
    // console.log('caroundBoundLeft', caroundBoundLeft);
    // console.log('caroundBoundRight', caroundBoundRight);

    var cardContainerElem = document.getElementsByClassName('card-container');
    for (var i = 0; i < cardContainerElem.length; i++) {
        const pElem = cardContainerElem[i].getElementsByTagName('p')[0];
        const iconElem = cardContainerElem[i].getElementsByClassName('icon')[0];
        const cardContainerBound = cardContainerElem[i].getBoundingClientRect();
        const cardContainerRelPos = Math.trunc(cardContainerBound.left + cardContainerBound.width);

        if (cardContainerRelPos > carouselBoundRight) {
            if (cardContainerBound.left <= carouselBoundRight) {
                const pct = Math.trunc((carouselBoundRight - cardContainerBound.left) / cardContainerBound.width * 100);
                // console.log('pct', i, pct);
                if (pct >= 0 && pct <= 100) {
                    const offsetFactor = 40;
                    const offsetBuffer = 3;
                    let offset = pct <= (100 - offsetFactor) ? (pct - offsetFactor) : (pct - offsetFactor) + (pct - (100 - offsetFactor)) + offsetBuffer;
                    priorRightOffset = (priorRightOffset === -1 || offset < priorRightOffset) ? offset : priorRightOffset;
                    offset = priorRightOffset;
                    // console.log('offset', offset);
                    cardContainerElem[i].style.background = 'linear-gradient(to right, rgba(255, 255, 255, 1) ' + offset + '%, rgba(255, 255, 255, 0) ' + pct + '%)';
                    pElem.style.maskImage = 'linear-gradient(to right, rgba(255, 255, 255, 1) ' + offset + '%, rgba(255 ,255, 255, 0)' + pct + '%)';
                    pElem.style.webkitMaskImage = 'linear-gradient(to right, rgba(255, 255, 255, 1) ' + offset + '%, rgba(255, 255, 255, 0)' + pct + '%)';
                    iconElem.style.maskImage = 'linear-gradient(to right, rgba(255, 255, 255, 1) ' + offset + '%, rgba(255 ,255, 255, 0)' + pct + '%)';
                    iconElem.style.webkitMaskImage = 'linear-gradient(to right, rgba(255, 255, 255, 1) ' + offset + '%, rgba(255, 255, 255, 0)' + pct + '%)';
                } else {
                    priorRightOffset = -1;
                    cardContainerElem[i].style.background = 'rgba(255, 255, 255, 1)';
                    pElem.style.maskImage = 'unset';
                    pElem.style.webkitMaskImage = 'unset';
                    iconElem.style.maskImage = 'unset';
                    iconElem.style.webkitMaskImage = 'unset';
                }
            }
        } else if (cardContainerBound.left < carouselBoundLeft) {
            // console.log('cardContainerRelPos', i, cardContainerRelPos);
            // console.log('carouselBoundLeft', i, carouselBoundLeft);
            const pct = Math.trunc((cardContainerBound.right - carouselBoundLeft) / cardContainerBound.width * 100);
            // console.log('pct', i, pct);

            if (pct >= 0 && pct <= 100 ) {
                const offsetFactor = 40;
                const offsetBuffer = 3;
                let offset = pct <= (100 - offsetFactor) ? (pct - offsetFactor) : (pct - offsetFactor) + (pct - (100 - offsetFactor)) + offsetBuffer;
                priorLeftOffset = (priorLeftOffset === -1 || offset < priorLeftOffset) ? offset : priorLeftOffset;
                offset = priorLeftOffset;
                // console.log('offset', offset);
                cardContainerElem[i].style.background = 'linear-gradient(to left, rgba(255, 255, 255, 1) ' + offset + '%, rgba(255, 255, 255, 0) ' + pct + '%)';
                pElem.style.maskImage = 'linear-gradient(to left, rgba(255, 255, 255, 1) ' + offset + '%, rgba(255 ,255, 255, 0)' + pct + '%)';
                pElem.style.webkitMaskImage = 'linear-gradient(to left, rgba(255, 255, 255, 1) ' + offset + '%, rgba(255, 255, 255, 0)' + pct + '%)';
                iconElem.style.maskImage = 'linear-gradient(to left, rgba(255, 255, 255, 1) ' + offset + '%, rgba(255 ,255, 255, 0)' + pct + '%)';
                iconElem.style.webkitMaskImage = 'linear-gradient(to left, rgba(255, 255, 255, 1) ' + offset + '%, rgba(255, 255, 255, 0)' + pct + '%)';
            } else {
                priorLeftOffset = -1;
                cardContainerElem[i].style.background = 'rgba(255, 255, 255, 1)';
                pElem.style.maskImage = 'unset';
                pElem.style.webkitMaskImage = 'unset';
                iconElem.style.maskImage = 'unset';
                iconElem.style.webkitMaskImage = 'unset';
            }
        } else {
            priorLeftOffset = -1;
            priorRightOffset = -1;
            cardContainerElem[i].style.background = 'rgba(255, 255, 255, 1)';;
            pElem.style.maskImage = 'unset';
            pElem.style.webkitMaskImage = 'unset';
            iconElem.style.maskImage = 'unset';
            iconElem.style.webkitMaskImage = 'unset';
        }
    } 

    // console.log('---------------------');
}
