/*
 * author: Krushanu Mohapatra
 * email: mohapatrakrushanu@gmail.com
 * ref: 'http://kellylougheed.com/hiit/'
 */
window.onload = function () {

	var seconds = 20;
	var rounds = 4;
	var rest = true;
	var interval;

	var intervalTime = 20;
	var breakTime = 10;
	var roundsCount = 4;

	var settingsButton = document.getElementById("settings");
	var intervalInput = document.getElementById("intervalTime");
	var breakInput = document.getElementById("breakTime");
	var roundsInput = document.getElementById("roundsCount");

	var startButton = document.getElementById("start");
	var pauseButton = document.getElementById("pause");
	var resetButton = document.getElementById("reset");

	var statusHeader = document.getElementById("status");
	var secondsSpan = document.getElementById("sec");
	var roundSpan = document.getElementById("round");

	settingsButton.onclick = function () {
		intervalTime = Math.floor(intervalInput.value * 1);
		breakTime = Math.floor(breakInput.value * 1);
		roundsCount = Math.floor(roundsInput.value * 1)
		if (checkForValidInput()) {
			reset();
		} else {
			alert('Invalid Entry !!!')
		}
	}

	startButton.onclick = function () {
		if (checkForValidInput()) {
			rest = false;
			changeToGo();
			interval = setInterval(countdownSeconds, 1000);
		} else {
			alert('Invalid Entry !!!')
		}
	}

	resetButton.onclick = function () {
		reset();
	}

	function reset() {
		clearInterval(interval);
		seconds = intervalTime;
		rounds = roundsCount;
		secondsSpan.innerText = seconds;
		roundSpan.innerText = rounds;
		rest = true;
	}

	pauseButton.onclick = function () {
		clearInterval(interval);

	}
	
	function countdownSeconds() {
		if (rounds) {
			seconds -= 1;
			secondsSpan.innerText = seconds;
			checkForStateChange();
		} else {
			clearInterval(interval);
			secondsSpan.innerText = 'Congrats !!!';
		}
	}

	function checkForValidInput() {
		var rtnValue = false;
		if ( intervalTime > 0 && breakTime > 0 && roundsCount > 0 ) rtnValue = true;
		return rtnValue;
	}

	function checkForStateChange() {
		if (seconds == 0 && rest == false) {
			seconds = breakTime + 1;
			rest = true;
			rounds -= 1;
			changeToRest();
		} else if (seconds == 0 && rest == true) {
			seconds = intervalTime + 1;
			rest = false;
			changeToGo();
		}
	}

	function changeToRest() {
		roundSpan.innerText = rounds;
		$("body").css("background", "cyan");
		statusHeader.innerText = "Rest";
	}

	function changeToGo() {
		$("body").css("background", "pink");
		statusHeader.innerText = "Go!";
	}

}