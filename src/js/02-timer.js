import "flatpickr/dist/flatpickr.min.css";
import flatpickr from "flatpickr";

const refs = {
  input: document.getElementById('datetime-picker'),
  start: document.querySelector('button[type="button"]'),
};

refs.start.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

const fp = flatpickr(refs.input, options);
