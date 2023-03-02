import Notiflix from 'notiflix';
import "flatpickr/dist/flatpickr.min.css";
import flatpickr from "flatpickr";

const refs = {
  input: document.querySelector('#datetime-picker'),
  start: document.querySelector('button[data-start]'),
  timer: document.querySelector('.timer'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

refs.start.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future!');
      refs.start.disabled = true;
    } else refs.start.disabled = false;
  },
};

flatpickr(refs.input, options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

function addLeadingZero(value) { 
  return value.toString().padStart(2, '0');
};

function onClickStart() { 
  const timer = setInterval(() => {
  const timeDifference = new Date(refs.input.value) - new Date();
  refs.start.disabled = true;

    if (timeDifference >= 0) {
      const timeObject = convertMs(timeDifference);
      
      refs.timer.style.color = 'green';

      refs.days.textContent = addLeadingZero(timeObject.days);
      refs.hours.textContent = addLeadingZero(timeObject.hours);
      refs.minutes.textContent = addLeadingZero(timeObject.minutes);
      refs.seconds.textContent = addLeadingZero(timeObject.seconds);

      if (timeDifference <= 10000) {
        refs.timer.style.color = 'red';
      };

    } else {
      clearInterval(timer);
      refs.timer.style.color = 'black';
    };
}, 1000);
};

refs.start.addEventListener('click', onClickStart);