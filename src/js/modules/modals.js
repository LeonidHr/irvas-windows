import { validateForm } from "./forms";

const modals = (
  triggerSelector, 
  modalSelector, 
  closeSelector, 
  isCloseByOverlay = true, 
  isValidation = false,
) => {
  const trigger = document.querySelectorAll(triggerSelector),
        modal = document.querySelector(modalSelector),
        close = document.querySelector(closeSelector);

  trigger.forEach(item => {
    item.addEventListener("click", e => {
      if (e.target) {
        e.preventDefault();

        if (isValidation) {
          if (!validateForm(item.closest('form'))) {
            return;
          }
        }

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
  const scrollWidth = window.innerWidth - document.documentElement.clientWidth;
  closeAllModals();
  
  document.querySelector(modalSelector).classList.add('show', 'animated_4ms', 'fadeIn');
  document.body.classList.add('modal-open');
  document.body.style.marginRight = `${scrollWidth}px`;

  clearTimeout(modalTimerId);
}

function closeAllModals() {
  const modalsArr = document.querySelectorAll('[data-modal]');

  modalsArr.forEach(item => {
    closeModal(`.${item.dataset.modal}`);
  });
}

function closeModal(modalSelector) {
  document.body.style.marginRight = '0px';
  document.querySelector(modalSelector).classList.remove('show', 'animated_4ms', 'fadeIn');
  document.body.classList.remove('modal-open');
}

export {closeModal};
export default modals;