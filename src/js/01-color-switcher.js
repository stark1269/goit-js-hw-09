const refs = {
  start: document.querySelector('button[data-start]'),
  stop: document.querySelector('button[data-stop]'),
  body: document.querySelector('body'),
};

let timeId = null;
refs.stop.disabled = true;

function setBodyColor() {
  refs.body.style.backgroundColor = getRandomHexColor();
};

function onClickStart() {
  timeId = setInterval(setBodyColor, 1000);
  refs.start.disabled = true;
  refs.stop.disabled = false;
};

function onClickStop() { 
  clearInterval(timeId);
  refs.stop.disabled = true;
  refs.start.disabled = false;
};

refs.start.addEventListener('click', onClickStart);
refs.stop.addEventListener('click', onClickStop);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};