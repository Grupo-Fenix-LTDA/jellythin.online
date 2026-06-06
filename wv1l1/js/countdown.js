/**
 * JoinTrix Countdown Timer
 * Displays a looping 20-minute countdown in all .stopwatch elements.
 * When timer hits 0, .claim-timer hides and .claim-act-text shows "ACT NOW!".
 * After 5 seconds, timer restarts and swaps back.
 * SOP: 20 min regressive timer logo abaixo da headline de oferta.
 */
document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  var INITIAL_SECONDS = 1200; // 20 minutes
  var ACT_NOW_DURATION = 5;  // seconds to show "ACT NOW!" before restarting
  var remaining = INITIAL_SECONDS;
  var stopwatches = document.querySelectorAll('.stopwatch');
  var claimTimers = document.querySelectorAll('.claim-timer');
  var claimActTexts = document.querySelectorAll('.claim-act-text');
  var isActNowPhase = false;
  var actNowCounter = 0;

  if (!stopwatches.length) return;

  function pad(n) {
    return n < 10 ? '0' + n : '' + n;
  }

  function formatTime(totalSeconds) {
    var mins = Math.floor(totalSeconds / 60);
    var secs = totalSeconds % 60;
    return pad(mins) + ':' + pad(secs);
  }

  function updateDisplay() {
    var display = formatTime(remaining);
    for (var i = 0; i < stopwatches.length; i++) {
      stopwatches[i].textContent = display;
    }
  }

  function showActNow() {
    for (var i = 0; i < claimTimers.length; i++) {
      claimTimers[i].style.display = 'none';
    }
    for (var j = 0; j < claimActTexts.length; j++) {
      claimActTexts[j].style.display = 'inline';
    }
  }

  function showTimer() {
    for (var i = 0; i < claimTimers.length; i++) {
      claimTimers[i].style.display = 'inline';
    }
    for (var j = 0; j < claimActTexts.length; j++) {
      claimActTexts[j].style.display = 'none';
    }
  }

  updateDisplay();

  setInterval(function () {
    if (isActNowPhase) {
      actNowCounter++;
      if (actNowCounter >= ACT_NOW_DURATION) {
        isActNowPhase = false;
        actNowCounter = 0;
        remaining = INITIAL_SECONDS;
        showTimer();
        updateDisplay();
      }
      return;
    }

    remaining--;

    if (remaining < 0) {
      isActNowPhase = true;
      actNowCounter = 0;
      showActNow();
      return;
    }

    updateDisplay();
  }, 1000);
});
