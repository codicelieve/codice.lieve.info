import './info.css';

export default function infoButtonClick() {
  const body = document.getElementsByTagName('body')[0];
  if (!body.classList.contains('info')) {
    body.classList.remove('info-out');
    body.classList.add('info');
  } else {
    body.classList.remove('info');
    body.classList.add('info-out');
  }
}
