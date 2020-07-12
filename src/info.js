import './info.css';

export default function infoButtonClick() {
  const body = document.getElementsByTagName('body')[0];
  body.classList.toggle('info');
}
