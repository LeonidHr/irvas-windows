
const gallery = (parentSelector) => {
  const parent = document.querySelector(parentSelector),
        imgPopup = document.createElement('div'),
        imgBig = document.createElement('img');

  imgPopup.classList.add('popup-img');

  parent.appendChild(imgPopup);
  imgPopup.appendChild(imgBig);

  imgBig.style.cssText = `
    max-height: 90vh;
    max-width: 80vw;
    object-fit: contain;
  `;

  imgPopup.style.justifyContent = 'center';
  imgPopup.style.alignItems = 'center';

  parent.addEventListener("click", e => {
    e.preventDefault();
    const target = e.target;

    if (target && target.closest('.preview')) {
      const scrollWidth = window.innerWidth - document.documentElement.clientWidth;
      imgBig.setAttribute('src', target.closest('a').getAttribute('href'));
      imgPopup.classList.add('animated_4ms', 'fadeIn');
      imgPopup.style.display = 'flex';
      document.body.classList.add('modal-open');
      document.body.style.marginRight = `${scrollWidth}px`;
    }

    if (target && target.matches('.popup-img')) {
      imgPopup.classList.remove('animated_4ms', 'fadeIn');
      imgPopup.style.display = 'none';
      document.body.classList.remove('modal-open');
      document.body.style.marginRight = '0px';
    }
  });
}

export default gallery;