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
