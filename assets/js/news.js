"use strict";

document.addEventListener("DOMContentLoaded", function () {
    const yearSelect = document.querySelector('#yearSelect');
    const currentYear = new Date().getFullYear();
    for(let year = currentYear; year >= 2024; year--) {
        const option = document.createElement('option');
        option.value = year.toString();
        option.textContent = year;
        yearSelect.appendChild(option);
    }

    function updateNewsList(selectedYear) {
        fetch('/co-creation/assets/js/news.json').then(response => response.json()).then(data => {
            const newsData = data.newsData;
            const filteredNews = newsData.filter(news => {
                const newsYear = parseInt(news.date.split('.')[0], 10);
                return selectedYear === -1 || selectedYear === newsYear;
            });
            const newsListHTML = filteredNews.map(news =>
                `<li class="news__item">${news.url !== "" ? `<a href="${news.url}" target="_blank">` : ""}
                    <div class="news__head head"><p class="date">${news.date}</p>${news.category !== "" ? `<p class="category">${news.category}</p>` : ""}${news.area !== "" ? `<p class="area">${news.area}</p>` : ""}</div>
                    <p class="cut-text news__text">${news.text}</p>
                ${news.url !== "" ? `</a>` : ""}</li>`
                ).join('');

                const moreButton = filteredNews.length > 10 ? `<div class="detail btn-more"><a href="">さらに表示する<div class="arrow hover-arrow__wrapper"><span class="hover-arrow__cover"><img class="hover-down-off" src="../assets/img/common/arrow_down.svg" alt=""><img class="hover-down-on" src="../assets/img/common/arrow_down.svg" alt=""></span></div></a></div>`: "";

            const result = document.querySelector('.result');
            result.innerHTML = `<ul class="news__list">${newsListHTML}</ul>${moreButton}`;  
            trimTextElements(document.querySelectorAll('.cut-text'));

            if(filteredNews.length > 10) {
                const moreButton = document.querySelector('.btn-more');
                moreButton.addEventListener('click', function(e) {
                    e.preventDefault();
                    const newsItems = document.querySelectorAll('.news__item');
                    newsItems.forEach((item, index) => {
                        if(index >= 10) {
                            item.style.display = 'block';
                        }
                    })
                    moreButton.style.display = 'none';
                })
            }
            
        }).catch(error => console.error('json fetch error'));
    }
    updateNewsList(currentYear);

    yearSelect.addEventListener('change', function() {
        const selectedYear = parseInt(yearSelect.value, 10);
        updateNewsList(selectedYear);
    })

    function setLoadEvent() {
        window.addEventListener('load', windowLoaded);
    }

    const html = document.querySelector('html');
    const loading = document.querySelector('.js-load');

    function windowLoaded() {
        if (!html) return;

        html.classList.add('is-load');

        const body = document.querySelector('body');
        if (body) {
            if (html.classList.contains('device-mobile')) {
                body.style.overflow = "hidden";
            }
        }
        handleLoad();

    }

    function handleLoad() {
        setTimeout(function () {
            html.classList.add('is-loaded');
        }, 1000)
    }

    setLoadEvent();

    trimTextElements(document.querySelectorAll('.cut-text'));
});

function trimTextElements(elements) {
    const newsCutCount = window.innerWidth > 990 ? 69 : 46;

    elements.forEach(function (elem) {
        const selfText = elem.textContent.trim();
        let textTrim = '';

        if (elem.closest('#news') !== null) {
        } else {
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

