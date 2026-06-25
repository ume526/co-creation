"use strict";
document.addEventListener("DOMContentLoaded", async function () {
  const includes = document.querySelectorAll('[data-include]');
  for (const include of includes) {
    const filePath = '/co-creation/assets/inc/' + include.dataset.include + '.html';
    try {
      const response = await fetch(filePath);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const html = await response.text();
      include.innerHTML = html;
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }

  const menuBtn = document.querySelector('.menu__button');
  const body = document.querySelector('body');
  const menuLinks = document.querySelectorAll('.header-nav__link');

  function toggleMenu() {
    menuBtn.classList.toggle('open');
    body.classList.toggle('menu-open');

  }
  menuBtn.addEventListener('click', toggleMenu);

  menuLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      menuBtn.classList.remove('open');
      body.classList.remove('menu-open');
    });
  });

  document.querySelector('.container').classList.add('show');

  function setLoadEvent() {
    window.addEventListener('load', windowLoaded);
  }

  const html = document.querySelector('html');
  function windowLoaded() {
    if (!html) return;
    html.classList.add('is-load');
    handleLoad();
  }

  function handleLoad() {
    setTimeout(function () {
      html.classList.add('is-loaded');
    }, 1000)
  }
  setLoadEvent();

new ScrollObserver('.appear', (el, inview) => {
  el.classList.toggle('inview', inview);
}, {
  once: false,
});

new ScrollObserver('.scroll-trigger', (el, inview) => {
  document.body.classList.toggle('is-footer-visible', inview);
}, {
  once: false,
  rootMargin: '-200px 0px -200px 0px'
});

  const globalHeaderHeight = 62;
  window.addEventListener('scroll', function () {
    if (window.scrollY > globalHeaderHeight) {
      menuBtn.classList.add('fixed');
    } else {
      menuBtn.classList.remove('fixed');
    }
  })

  trimTextElements(document.querySelectorAll('.cut-text'));
  trimTextElements(document.querySelectorAll('.cut-title'));

  function trimTextElements(elements) {
    const newsCutCount = window.innerWidth > 990 ? 36: 40;
    const cardCutCount = window.innerWidth > 990 ? 34: 39;

    elements.forEach(function (elem) {
        const selfText = elem.textContent.trim();
        let textTrim = '';

        let isCardTitleChild = elem.closest('.result') && elem.closest('.card__title') !== null;
        if (isCardTitleChild) {
          textTrim = selfText.substr(0, cardCutCount);
        } else if (elem.closest('#case') !== null) {
            textTrim = selfText.substr(0, newsCutCount);
        } 

        function textTrimming() {
            elem.innerHTML = textTrim + '...';
            elem.style.visibility = 'visible';
        }

        if (textTrim.length < selfText.length) {
            textTrimming();
        } else {
            elem.innerHTML = selfText;
            elem.style.visibility = 'visible';
        }
    })
}


  const ua = (navigator.userAgentData && navigator.userAgentData.userAgent) ? navigator.userAgentData.userAgent.toLowerCase() : navigator.userAgent.toLowerCase();
  const htmlEl = document.querySelector('html');
  console.log(ua)
  if (ua.indexOf('ipad') > -1 || ua.indexOf('macintosh') > -1 && 'ontouchend' in document) {
    htmlEl.classList.add("iPad");
  } else if (ua.includes("msie")) {
    htmlEl.classList.add("ieMode");
  } else if (ua.includes("firefox")) {
    htmlEl.classList.add("firefoxMode");
  } else if (ua.includes("iphone")) {
    htmlEl.classList.add("iphoneMode");
  } else if (ua.includes("android")) {
    htmlEl.classList.add("androidMode");
  } else if (ua.includes("mac")) {
    htmlEl.classList.add("macMode");
  }
});

$(function () {
  $('a[href^="#"]').on("click", function (e) {
    e.preventDefault();

    let speed = 400;
    let href = $(this).attr("href");
    if (href === "#") return;

    let target = $(href == "#" || href == "" ? "html" : href);
    if (target.length === 0) return;

    let position = target.offset().top;
    $("body,html").animate({ scrollTop: position }, speed);
    return false;
  });
});
