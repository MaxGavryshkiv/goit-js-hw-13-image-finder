import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

function modal(event) {
  if (event.target.nodeName !== 'IMG') {
    return;
  }

  const instance = basicLightbox.create(
    `<img src="${event.target.dataset.source}" alt="bigPictures">`,
  );

  instance.show();
}

export default modal;
