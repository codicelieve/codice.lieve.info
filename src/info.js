import './info.css';

const body = document.getElementsByTagName('body')[0];
const infoBox = document.getElementById('info');
const infoButton = document.getElementById('info-button');

// Toggle css classes on the body to show/hide info button
infoButton.addEventListener('click', (e) => {
  if (!body.classList.contains('info')) {
    body.classList.remove('info-out');
    body.classList.add('info');
  } else {
    body.classList.remove('info');
    body.classList.add('info-out');
  }

  e.preventDefault();
});

infoBox.addEventListener('animationend', (e) => {
  if (e.animationName === 'close-info') {
    // Hide the box element or it will prevent clicking the balloon
    body.classList.remove('info');
    body.classList.remove('info-out');
  }
});
