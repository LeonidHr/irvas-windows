"use strict";

import './slider';
import modals from './modules/modals';
import tabs from './modules/tabs';
import forms from './modules/forms';
import changeModalState from './modules/changeModalState';
import timer from './modules/timer';

window.addEventListener("DOMContentLoaded", () => {
  const calcState = {
    form: document.querySelector('.do_image_more').dataset.balconIcon,
    type: document.querySelector('#view_type').value
  };

  modals('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
  modals('.phone_link', '.popup', '.popup .popup_close');
  modals('.popup_calc_btn', '.popup_calc ', '.popup_calc_close');
  modals('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false, true);
  modals('.popup_calc_profile_button', '.popup_calc_end ', '.popup_calc_end_close', false, true);
  
  tabs('.glazing_slider', '.glazing_block', '.glazing_content', 'active');
  tabs('.decoration_slider', '.no_click', '.decoration_content > div > div', 'after_click');
  tabs('.balcon_icons', '.balcon_icons_img', '.big_img > img', 'do_image_more', 'inline');
  
  changeModalState(calcState);
  forms(calcState);
  timer('.container1', '2026-09-25');
});