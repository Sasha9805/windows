const timer = (id, deadline) => {

  const addZero = num => {
    if (num <= 9) {
      return `0${num}`;
    } else {
      return num;
    }
  };
  
  const getTimeRemaining = endtime => {
    const t = Date.parse(endtime) - Date.now(),
          seconds = Math.floor((t / 1000) % 60),
          minutes = Math.floor((t / (1000 * 60)) % 60),
          hours = Math.floor((t / (1000 * 60 * 60)) % 24),
          days = Math.floor(t / (1000 * 60 * 60 * 24));

    return {
      total: t,
      seconds,
      minutes,
      hours,
      days
    };
  };

  const setClock = (selector, endtime) => {
    const timer = document.querySelector(selector),
          days = timer.querySelector('#days'),
          hours = timer.querySelector('#hours'),
          minutes = timer.querySelector('#minutes'),
          seconds = timer.querySelector('#seconds'),
          timeInterval = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
      const t = getTimeRemaining(endtime);

      // Или исп. ф-ю addZero
      days.textContent = `0${t.days}`.slice(-2);
      hours.textContent = `0${t.hours}`.slice(-2);
      minutes.textContent = `0${t.minutes}`.slice(-2);
      seconds.textContent = `0${t.seconds}`.slice(-2);

      if (t.total <= 0) {
        days.textContent = '00';
        hours.textContent = '00';
        minutes.textContent = '00';
        seconds.textContent = '00';

        clearInterval(timeInterval);
      }
    }

  };

  setClock(id, deadline);

};

export default timer;