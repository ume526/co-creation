
"use strict";
document.addEventListener('DOMContentLoaded', function () {
    const swiperElement = document.querySelector('.swiper-slider');
    if (swiperElement) {
        initSlider(swiperElement);
    }
    const swiper = new Swiper('.swiper', {
        loop: true,
        speed: 1600,
        slidesPerView: '1',
        slideToClickedSlide: false,
        effect: 'fade',
        preventClicks: true,
        allowTouchMove: true,
        touchMoveStopPropagation:true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false
        },
    });
    function triggerColorAnimation() {
        const mainTitle = document.querySelector('.main__title');
        mainTitle.classList.remove('show');
        setTimeout(function() {
            mainTitle.classList.add('show');
        },100)
    }
    swiper.on('slideChange', () => {
        triggerColorAnimation();
    })
    // trimTextElements(document.querySelectorAll('.news__text'));
});

function initSlider(el) {
    const options = {
        centeredSlides: false,
        disableOnInteraction: false,
        slidesPerView: 1.1,
        spaceBetween: 15,
        speed: 2000,
        autoplay: true,
        loop: true,
        breakpoints: {
            769: {
                slidesPerView: 2.367,
                spaceBetween: 40,
            }
        },
        scrollbar: {
            el: ".swiper-scrollbar",
            hide: false,
            draggable: true
        }
    };
    const breakPoint = 768;
    if (breakPoint < window.innerWidth) {
        options.centeredSlides = false;
    }
    new Swiper(el, options);

};
