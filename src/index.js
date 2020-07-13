import animateScene from './scene';
import './info';
import './index.html';
import './index.css';

const canvas = document.getElementById('canvas');
animateScene(canvas);

let resizeTimeout;

window.addEventListener('resize', () => {
  if (resizeTimeout !== undefined) {
    clearTimeout(resizeTimeout);
  }
  resizeTimeout = setTimeout(() => window.location.reload(), 1000);
});
