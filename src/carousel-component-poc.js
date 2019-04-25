let priorLeftOffset = -1;
let priorRightOffset = -1;

if (!Math.trunc) {
    Math.trunc = Math.trunc || function(x) {
        if (isNaN(x)) {
            return NaN;
        }
        if (x > 0) {
            return Math.floor(x);
        }
        return Math.ceil(x);
    };
}

function animateScrollLeft(carouselElem, scrollPx, iPos=0, jPos=0) {
    setTimeout(function () {
        carouselElem.scrollLeft -= 2;
        const i = iPos - 2;
        const j = jPos + 2;
        if (j < scrollPx) {
            animateScrollLeft(carouselElem, scrollPx, i, j);
        }
    }, 7);
}

function animateScrollRight(carouselElem, scrollPx, iPos=0) {
    setTimeout(function () {
        carouselElem.scrollLeft += 2;
        const i = iPos + 2;
        if (i < (scrollPx * 2 - 20)) {
            animateScrollRight(carouselElem, scrollPx, i);
        }
    }, 3);
}

function scrollCarouselLeft() {
    const carouselContainerElem = document.getElementsByClassName('carousel-container')[0];
    const carouselBound = carouselContainerElem.getBoundingClientRect();
    const carouselBoundLeft = Math.trunc(carouselBound.left);
    const cardSpacing = 20;

    let cardIndex = -1;
    let cardBound = null;
    var cardContainerElem = document.getElementsByClassName('card-container');
    for (var i = 0; i < cardContainerElem.length; i++) {
        const cardContainerBound = cardContainerElem[i].getBoundingClientRect();

        if (cardContainerBound.left > carouselBoundLeft) {
            cardIndex = i - 1;
            cardBound = cardContainerBound;
            break;
        }
    }

    if (cardIndex > -1) {
        const scrollPx = cardBound.width - (cardBound.left - carouselBoundLeft) + cardSpacing;
        // carouselContainerElem.scrollLeft -= scrollPx;
        animateScrollLeft(carouselContainerElem, scrollPx);
    }
}

function scrollCarouselRight() {
    const carouselContainerElem = document.getElementsByClassName('carousel-container')[0];
    const carouselBound = carouselContainerElem.getBoundingClientRect();
    const carouselBoundRight = Math.trunc(carouselBound.right);

    let cardIndex = -1;
    let cardBound = null;
    var cardContainerElem = document.getElementsByClassName('card-container');
    for (var i = 0; i < cardContainerElem.length; i++) {
        const cardContainerBound = cardContainerElem[i].getBoundingClientRect();
        const cardContainerRelPos = Math.trunc(cardContainerBound.left + cardContainerBound.width);

        if (cardContainerRelPos > carouselBoundRight) {
            cardIndex = i;
            cardBound = cardContainerBound;
            break;
        }
    }

    if (cardIndex > -1) {
        const scrollPx = cardBound.width - (carouselBoundRight - cardBound.left);
        // carouselContainerElem.scrollLeft += scrollPx;
        animateScrollRight(carouselContainerElem, scrollPx);
    }
}

function onLoad() {
    computeCardPositions();
}

function scrollHandler() {
    computeCardPositions();
}

function computeCardPositions() {
    const carouselContainerElem = document.getElementsByClassName('carousel-container')[0];
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
                    cardContainerElem[i].style.filter = 'progid:DXImageTransform.Microsoft.gradient(startColorstr=rgba(255, 255, 255, 1), endColorstr=rgba(255, 255, 255, 0), GradientType=1)'
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
