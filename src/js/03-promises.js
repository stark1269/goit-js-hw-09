import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('form'),
  delay: document.querySelector('input[name="delay"]'),
  step: document.querySelector('input[name="step"]'),
  amount: document.querySelector('input[name="amount"]'),
};

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
  const shouldResolve = Math.random() > 0.3;
    
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      };
    }, delay);
  });
};

function onSubmitForm(e) {
e.preventDefault();
  
const firstDelay = Number(refs.delay.value);
const delayStep = Number(refs.step.value);

for (let i = 0; i < refs.amount.value; i++) {

  createPromise(1 + i, firstDelay + i * delayStep).then(({ position, delay }) => {
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  }).catch(({ position, delay }) => {
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
};
refs.form.reset();
};

refs.form.addEventListener('submit', onSubmitForm);