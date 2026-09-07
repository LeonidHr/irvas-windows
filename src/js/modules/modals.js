
const modals = (triggerSelector, modalSelector, closeSelector, isCloseByOverlay = true) => {
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
    if (e.target === modal && isCloseByOverlay) {
      closeModal(modalSelector);
    }
  });
}

const modalTimerId = setTimeout(() => openModal('.popup'), 6000000);

function openModal(modalSelector) {
  closeAllModals();
  
  document.querySelector(modalSelector).classList.add('show', 'animated_4ms', 'fadeIn');
  document.body.classList.add('modal-open');

  clearTimeout(modalTimerId);
}

function closeAllModals() {
  const modalsArr = document.querySelectorAll('[data-modal]');

  modalsArr.forEach(item => {
    closeModal(`.${item.dataset.modal}`);
  });
}

function closeModal(modalSelector) {
  document.querySelector(modalSelector).classList.remove('show', 'animated_4ms', 'fadeIn');
  document.body.classList.remove('modal-open');
}

export {closeModal};
export default modals;