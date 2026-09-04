
const modals = () => {
  function bindModal(triggerSelector, modalSelector, closeSelector) {
    const trigger = document.querySelectorAll(triggerSelector),
          modal = document.querySelector(modalSelector),
          close = document.querySelector(closeSelector);

    trigger.forEach(item => {
      item.addEventListener("click", e => {
        if (e.target) {
          e.preventDefault();
          openModal(modalSelector);
        }
      });
    });

    close.addEventListener("click", () => closeModal(modalSelector));

    modal.addEventListener("click", e => {
      if (e.target === modal) {
        closeModal(modalSelector);
      }
    });
  }

  bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
  bindModal('.phone_link', '.popup', '.popup .popup_close');
  
}

const modalTimerId = setTimeout(() => openModal('.popup'), 6000000);

function openModal(modalSelector) {
  document.querySelector(modalSelector).classList.add('show');
  document.body.classList.add('modal-open');

  clearTimeout(modalTimerId);
}

function closeModal(modalSelector) {
  document.querySelector(modalSelector).classList.remove('show');
  document.body.classList.remove('modal-open');
}

export default modals;