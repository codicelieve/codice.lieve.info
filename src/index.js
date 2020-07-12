import animateScene from './scene';
import infoButtonClick from './info';
import './index.html';

const canvas = document.getElementById('canvas');
animateScene(canvas);

const info = document.getElementById('info-button');
info.addEventListener('click', infoButtonClick);
