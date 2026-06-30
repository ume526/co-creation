if (typeof gsap !== 'undefined' || typeof ScrollTrigger !== 'undefined') {

  gsap.registerPlugin(ScrollTrigger);

  gsap.set('.treasure__open', { opacity: 0 });
  gsap.set('.map__item', {
    opacity: 0,
    scale: 0,
    x: 0,
    y: 0,
  });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.treasure__box',
      start: 'center 50%',
      once: true,
    },
  });

  tl.set('.treasure__map', { y: 100, scale: 0, opacity: 0 })
    .to('.treasure__close', { opacity: 0, duration: 1 })
    .to('.treasure__open', { opacity: 1, duration: 1 }, '<')
    .to({}, { duration: 0.2 })
    .to('.treasure__box', { scale: 0, opacity: 0, duration: 1, ease: 'back.out(1.5)' })
    .to('.treasure__map', { y: 0, scale: 1, opacity: 1, duration: 1.2, ease: 'back.out(1.5)' }, '<') 
    .fromTo(
      '.map__item',
      {
        opacity: 0,
        scale: 0,
        x: () => gsap.utils.random(-20, 20),
        y: () => gsap.utils.random(30, 80),
        rotation: () => gsap.utils.random(-25, 25),
      },
      {
        opacity: 1,
        scale: 1,
        x: 0,
        y: 0,
        rotation: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: 'back.out(2)',
      },
      '<'
    );

  // PageFlip
  const bookElm = document.getElementById('book');
  const pageFlip = new St.PageFlip(bookElm, {
    width: 400,
    height: 400,
    showCover: false, 
    mobileScrollSupport: false,
    maxShadowOpacity: 0.3,
  });

  pageFlip.loadFromHTML(document.querySelectorAll('.page'));
  let autoFlip;

  function startAutoFlip() {
    autoFlip = setInterval(() => {
      if (pageFlip.getCurrentPageIndex() < pageFlip.getPageCount() - 2) {
        pageFlip.flipNext();
      } else {
        clearInterval(autoFlip);
      }
    }, 1000);
  }

  bookElm.addEventListener('mouseenter', () => {
    clearInterval(autoFlip);
  });

  bookElm.addEventListener('mouseleave', () => {
    autoFlip = setInterval(() => {
      if (pageFlip.getCurrentPageIndex() < pageFlip.getPageCount() - 2) {
        pageFlip.flipNext();
      }
    }, 1000);
  });

  ScrollTrigger.create({
    trigger: '.book',
    start: 'top 60%',
    once: true,
    onEnter: () => {
      tl.from('.book', { y: 50, opacity: 0, duration: 0 })
        .to('.book', { y: -10, duration: 0.3 }) 
        .call(() => { startAutoFlip(); });
    },
  });
}

const tag = document.createElement("script");
tag.src = "https://www.youtube.com/player_api";
const firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
let players = [];

function onYouTubeIframeAPIReady() {
	players.push(createPlayer("player1", "yGplLlqK21U", 712, 400));
	players.push(createPlayer("player2", "avI127rI98A", 338, 190));
	players.push(createPlayer("player3", "hzXgUUbA9F0", 338, 190));
}

function createPlayer(playerId, videoId, width, height) {
	return new YT.Player(playerId, {
		width: width,
		height: height,
		videoId: videoId,
		playerVars: {
			loop: 1,
			rel: 0,
			playsinline: 1,
		},
		events: {
			onReady: function (event) {
				onPlayerReady(event, playerId);
			},
		},
	});
}
function onPlayerReady(event, playerId) {
	const player = event.target;
	const playButton = document.querySelector(`.${playerId} .thumb`);
	playButton.addEventListener("click", function () {
		player.playVideo();
		playButton.style.display = "none";
	});
}

const slideCount = document.querySelectorAll('.swiper .swiper-slide').length;

const isLoop = slideCount > 3;
const swiper = new Swiper('.swiper', {
	loop: isLoop,
	// autoplay: {
	// 	delay: 3000,
	// },
	pagination: {
		el: '.swiper-pagination',
		clickable: true,
	},
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},

	slidesPerView: 1,

	breakpoints: {
		769: {
			slidesPerView: 3,
			spaceBetween: 26,
		}
	},

	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},

	on: {
		init(swiper) {
			toggleNavigation(swiper);
		},
		resize(swiper) {
			toggleNavigation(swiper);
		}
	}

});

function toggleNavigation(swiper) {
	const totalSlides = swiper.slides.length;
	const slidesPerView = swiper.params.slidesPerView;

	if (totalSlides <= slidesPerView) {
		swiper.navigation.disable();
	} else {
		swiper.navigation.enable();
	}
}
