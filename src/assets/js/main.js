'use strict';

var url = 'http://jerome-pira.be/projets/dataplayv3/assets/js/data.json';
var canvasLeftSelector = document.querySelector('#canvas--left');
var ctx = canvasLeftSelector.getContext('2d');
canvasLeftSelector.width = 300;
canvasLeftSelector.height = 300;
var x = canvasLeftSelector.width / 2;
var y = canvasLeftSelector.height / 2;
var diskRound = new Image();
diskRound.src = "http://jerome-pira.be/projets/dataplayv3/assets/images/vynil.svg";
var minText = document.querySelector('#mintext');
var gammeText = document.querySelector('#gammetext');
var bpmText = document.querySelector('#bpmtext');
var gammeButton = document.querySelector('#gamme');
var bpmButton = document.querySelector('#bpm');
var getBackInfos = document.querySelector("#back_infos");
var linkInfos = document.querySelector('#link_infos');
var anecContainer = document.querySelector('#anecdote');
var controleButton = document.querySelector('#testButton');
var playme = document.getElementById('player_audio');

import Wave from "@foobar404/wave"
let wave = new Wave();
disabledButton();





function centerDisk() {
	ctx.beginPath();
	ctx.arc(x, y, 35, 0, 2 * Math.PI);
	ctx.fillStyle = '#eef6f9';
	ctx.fill();
}

function basicDisk() {
	ctx.beginPath();
	ctx.arc(x, y, 150, 0, 2 * Math.PI);
	ctx.drawImage(diskRound, 0, 0, 300, 300);
	ctx.closePath();
}

function centerDiskDot() {
	ctx.beginPath();
	ctx.arc(x, y, 5, 0, 2 * Math.PI);
	ctx.fillStyle = '#262e31';
	ctx.fill();
}

function clearCanvas() {
	canvasLeftSelector.removeAttribute('data-genre');
	canvasLeftSelector.removeAttribute('data-gamme');
	canvasLeftSelector.removeAttribute('data-bpm');
	canvasLeftSelector.removeAttribute('data-duree');
	ctx.restore();
	ctx.clearRect(0, 0, 300, 300);
	noDots = true;
}
fetch(url)
	.then((response) => {
		return response.json();
	})
	.then((data) => {
		var selectorMusic = document.getElementById('select-music');

		function testOption() {
			for (var i = 0; i < data.musique.length; i++) {
				var addOption = document.createElement('option');
				var textOption = document.createTextNode(`${data.musique[i].titre}` + " - " + `${data.musique[i].artiste}` + " (" + `${data.musique[i].annee}` + ") ");
				addOption.value = "music_" + [i + 1];
				addOption.appendChild(textOption);
				selectorMusic.appendChild(addOption);
			}
		}
		testOption();
		selectorMusic.addEventListener('change', choiceSelector);

		function choiceSelector(choice) {
			for (var i = 0; i < data.musique.length; i++) {
				if (choice.target.value === "music_0") {
					clearCanvas();
					clearInner();
					disabledButton();
					resetButtonColor();
					getBackInfos.innerHTML = "";
					linkInfos.innerHTML = "";
					anecContainer.innerHTML = "Choisissez une musique.";
					visHidden();
					CercleBarProgress.style.marginLeft = "0%";
                    canvasLeftSelector.classList.add('paused')
				} else if (choice.target.value === "music_" + [i + 1]) {
					clearInner();
					canvasLeftSelector.setAttribute('data-gamme', `${data.musique[i].gamme}`);
					canvasLeftSelector.setAttribute('data-bpm', `${data.musique[i].bpm}`);
					canvasLeftSelector.setAttribute('data-min', `${data.musique[i].dureemin}`);
					canvasLeftSelector.setAttribute('data-art', `${data.musique[i].artiste}`);
					canvasLeftSelector.setAttribute('data-ms', `${data.musique[i].dureems}`);
					ctx.restore();
					ctx.clearRect(0, 0, 300, 300);
					noDots = true;
					basicDisk();
					centerDisk();
					centerDiskDot();
					minText.innerHTML = `${data.musique[i].dureemin}`;
					enabledButton();
					resetButtonColor();
					getBackInfos.innerHTML = "";
					linkInfos.innerHTML = "";
					anecContainer.innerHTML = `${data.musique[i].anecdote}`;
					visNotHidden();
					CercleBarProgress.style.marginLeft = "0%";
					musicChanger();
					controleButton.classList.remove("musique__play--pause");
					controleButton.classList.add("musique__play");
                    canvasLeftSelector.classList.add('paused')
				}
			}
		}
	});
var noColorGamme = true;
gammeButton.addEventListener('click', centerDiskColor);

function centerDiskColor() {
	var dataGamme = canvasLeftSelector.getAttribute('data-gamme');
	colorGammeButton();
	if ((dataGamme === 'A') && (noColorGamme)) {
		centerDisk();
		ctx.fillStyle = '#1abc9c';
		ctx.fill();
		centerDiskDot();
		noColorGamme = false;
	} else if ((dataGamme === 'B') && (noColorGamme)) {
		centerDisk();
		ctx.fillStyle = '#2ecc71';
		ctx.fill();
		centerDiskDot();
		noColorGamme = false;
	} else if ((dataGamme === 'C') && (noColorGamme)) {
		centerDisk();
		ctx.fillStyle = '#3498db';
		ctx.fill();
		centerDiskDot();
		noColorGamme = false;
	} else if ((dataGamme === 'D') && (noColorGamme)) {
		centerDisk();
		ctx.fillStyle = '#9b59b6';
		ctx.fill();
		centerDiskDot();
		noColorGamme = false;
	} else if ((dataGamme === 'E') && (noColorGamme)) {
		centerDisk();
		ctx.fillStyle = '#f1c40f';
		ctx.fill();
		centerDiskDot();
		noColorGamme = false;
	} else if ((dataGamme === 'F') && (noColorGamme)) {
		centerDisk();
		ctx.fillStyle = '#e67e22';
		ctx.fill();
		centerDiskDot();
		noColorGamme = false;
	} else if ((dataGamme === 'G') && (noColorGamme)) {
		centerDisk();
		ctx.fillStyle = '#e74c3c';
		ctx.fill();
		centerDiskDot();
		noColorGamme = false;
	} else if (!noColorGamme) {
		centerDisk();
		centerDiskDot();
		noColorGamme = true;
	}
	gammeText.innerHTML = dataGamme + "*";
	getBackInfos.innerHTML = "*Les gammes sont basées sur le système anglais :";
	linkInfos.innerHTML = "en savoir plus";
}
var noDots = true;
var buttonBPMColor = false;
bpmButton.addEventListener('click', () => {
	function drawDots() {
		for (var i = 0; i <= dots; i++) {
			ctx.beginPath();
			var dist = Math.random() * 300;
			var angle = Math.random() * 300;
			var rand_x = dist * Math.cos(angle) + x;
			var rand_y = dist * Math.sin(angle) + y;
			ctx.arc(rand_x, rand_y, 1, 0, 2 * Math.PI);
			ctx.fillStyle = "#F1EAC5";
			ctx.fill();
			ctx.closePath();
		}
	}

	function drawDotsClip() {
		colorBPMButton();
		if ((noDots) && (noColorGamme)) {
			drawDots();
			centerDisk();
			centerDiskDot();
			noDots = false;
			noColorGamme = true;
		} else if ((!noDots) && (!noColorGamme)) {
			ctx.clearRect(0, 0, 300, 300);
			basicDisk();
			centerDisk();
			centerDiskDot();
			noDots = true;
			noColorGamme = true;
		} else if ((noDots) && (!noColorGamme)) {
			drawDots();
			centerDisk();
			centerDiskDot();
			noDots = false;
			noColorGamme = true;
		} else if ((!noDots) && (noColorGamme)) {
			ctx.clearRect(0, 0, 300, 300);
			basicDisk();
			centerDisk();
			centerDiskDot();
			noDots = true;
			noColorGamme = true;
		}
	}
	var dataBPM = canvasLeftSelector.getAttribute('data-bpm');
	var dots = 0;
	bpmText.innerHTML = dataBPM;
	parseInt(dataBPM);
	if (dataBPM >= 160) {
		dots = 6000;
		drawDotsClip();
	} else if (dataBPM < 160 && dataBPM >= 140) {
		dots = 5000;
		drawDotsClip();
	} else if (dataBPM < 140 && dataBPM >= 120) {
		dots = 4000;
		drawDotsClip();
	} else if (dataBPM < 120 && dataBPM >= 100) {
		dots = 3000;
		drawDotsClip();
	} else if (dataBPM < 100 && dataBPM >= 80) {
		dots = 2000;
		drawDotsClip();
	} else {
		dots = 1000;
		drawDotsClip();
	}
});

function musicChanger() {
	var dataArt = canvasLeftSelector.getAttribute('data-art');

	if (dataArt === "Queens") {
		playme.src = 'assets/musiques/Bohemian_Rhapsody.mp3';
		playme.load();
	} else if (dataArt === "Bob marley, Wailers") {
		playme.src = 'assets/musiques/Could_you_be_love.mp3';
		playme.load();
	} else if (dataArt === "Shakira, Freshlyground") {
		playme.src = 'assets/musiques/Waka_Waka.mp3';
		playme.load();
	} else if (dataArt === "Haddaway") {
		playme.src = 'assets/musiques/What_is_love.mp3';
		playme.load();
	} else if (dataArt === "Stevie Wonder") {
		playme.src = 'assets/musiques/Superstition.mp3';
		playme.load();
	} else if (dataArt === "Freeze Corleone") {
		playme.src = 'assets/musiques/Freeze_Raël.mp3';
		playme.load();
	} else if (dataArt === "Israel kamakawiwo'ole") {
		playme.src = 'assets/musiques/Over_the_rainbow.mp3';
		playme.load();
	} else if (dataArt === "Daft Punk") {
		playme.src = 'assets/musiques/Around_the_world.mp3';
		playme.load();
	} else if (dataArt === "Charles Aznavour") {
		playme.src = 'assets/musiques/La_bohême.mp3';
		playme.load();
	}
}

function clearInner() {
	minText.innerHTML = "";
	bpmText.innerHTML = "";
	gammeText.innerHTML = "";
}

function disabledButton() {
	gammeButton.disabled = true;
	gammeButton.style.cursor = "not-allowed";
	gammeButton.style.opacity = "0.5";
	bpmButton.disabled = true;
	bpmButton.style.cursor = "not-allowed";
	bpmButton.style.opacity = "0.5";
}

function enabledButton() {
	gammeButton.disabled = false;
	gammeButton.style.cursor = "pointer";
	gammeButton.style.opacity = "";
	bpmButton.disabled = false;
	bpmButton.style.cursor = "pointer";
	bpmButton.style.opacity = "";
}
var buttonBPMColor = true;

function colorBPMButton() {
	if (buttonBPMColor) {
		bpmButton.style.color = "white";
		bpmButton.style.backgroundColor = "#143399";
		buttonBPMColor = false;
	} else if (!buttonBPMColor) {
		bpmButton.style.color = "";
		bpmButton.style.backgroundColor = "";
		buttonBPMColor = true;
	}
}
var buttonGammeColor = true;

function colorGammeButton() {
	if (buttonGammeColor) {
		gammeButton.style.color = "white";
		gammeButton.style.backgroundColor = "#143399";
		buttonGammeColor = false;
	} else if (!buttonGammeColor) {
		gammeButton.style.color = "";
		gammeButton.style.backgroundColor = "";
		buttonGammeColor = true;
	}
}

function resetButtonColor() {
	bpmButton.style.color = "";
	bpmButton.style.backgroundColor = "";
	buttonBPMColor = true;
	gammeButton.style.color = "";
	gammeButton.style.backgroundColor = "";
	buttonGammeColor = true;
}
var CercleBarProgress = document.querySelector(".musique__progress");
var BarProgress = document.querySelector(".musique__progressbar");

function play(idLecteur) {
	var Lecteur = document.querySelector('#' + idLecteur);
	if (Lecteur.paused) {
		Lecteur.play();
		controleButton.classList.add("musique__play--pause");
		canvasLeftSelector.classList.add('anim')
		canvasLeftSelector.classList.remove('paused')
	} else {
		Lecteur.pause();
		controleButton.classList.remove("musique__play--pause");
		canvasLeftSelector.classList.add('paused')
	}
}

function update(Lecteur) {
	var duration = Lecteur.duration;
	var time = Lecteur.currentTime;
	var fraction = time / duration;
	var percent = Math.ceil(fraction * 100);
	CercleBarProgress.style.marginLeft = percent + "%";
}
var controlMusic = document.querySelector('.musique__controle');

function visNotHidden() {
	BarProgress.classList.remove('vis_hidden');
	CercleBarProgress.classList.remove('vis_hidden');
	controlMusic.classList.remove('vis_hidden');
}

function visHidden() {
	BarProgress.classList.add('vis_hidden');
	CercleBarProgress.classList.add('vis_hidden');
	controlMusic.classList.add('vis_hidden');
}