import animateScene from './scene';
import infoButtonClick from './info';
import './index.html';
import './index.css';

const canvas = document.getElementById('canvas');
animateScene(canvas);

const info = document.getElementById('info-button');
info.addEventListener('click', infoButtonClick);

let resizeTimeout;

window.addEventListener('resize', () => {
  if (resizeTimeout !== undefined) {
    clearTimeout(resizeTimeout);
  }
  resizeTimeout = setTimeout(() => window.location.reload(), 1000);
});
