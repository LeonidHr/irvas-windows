

const timer = (timerSelector, deadline) => {
  function calcRemainingTime(endtime) {
    const total = Date.parse(endtime) - Date.parse(new Date),
          seconds = Math.floor((total / 1000) % 60),
          minutes = Math.floor((total / (1000 * 60)) % 60),
          hours = Math.floor((total / (1000 * 60 * 60)) % 24),
          days = Math.floor((total / (1000 * 60 * 60 * 24)));
  
    return {total, seconds, minutes, hours, days};
  }

  function initTimer(timerSelector, deadline) {
    const timer = document.querySelector(timerSelector),
          secondsWrap = timer.querySelector('#seconds'),
          minutesWrap = timer.querySelector('#minutes'),
          hoursWrap = timer.querySelector('#hours'),
          daysWrap = timer.querySelector('#days'),
          timerId = setInterval(changeTimer, 1000);

    changeTimer();

    function changeTimer() {
      const {total, seconds, minutes, hours, days} = calcRemainingTime(deadline);

      if (total <= 0) {
        secondsWrap.textContent = "00";
        minutesWrap.textContent = "00";
        hoursWrap.textContent = "00";
        daysWrap.textContent = "00";
        clearInterval(timerId);
        return;
      }

      secondsWrap.textContent = addZero(seconds);
      minutesWrap.textContent = addZero(minutes);
      hoursWrap.textContent = addZero(hours);
      daysWrap.textContent = addZero(days);
    }
  }

  function addZero(num) {
    if (num <= 9) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  initTimer(timerSelector, deadline);
};

export default timer;