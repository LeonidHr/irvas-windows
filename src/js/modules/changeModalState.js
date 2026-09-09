import checkPhoneInputs from "./checkPhoneInputs";

const changeModalState = (state) => {
  const windowForms = document.querySelectorAll('.balcon_icons_img'),
        windowWidth = document.querySelectorAll('#width'),
        windowHeight = document.querySelectorAll('#height'),
        windowType = document.querySelectorAll('#view_type'),
        windowProfile = document.querySelectorAll('.checkbox');

  checkPhoneInputs('#width');
  checkPhoneInputs('#height');

  function bindModalState(elem, event, prop) {
    elem.forEach((item, i) => {
      item.addEventListener(event, e => {
        switch(item.nodeName) {
          case('SPAN') :
            state[prop] = i;
            break;
          case('INPUT') :
            if (item.type === 'radio') {
              elem[0].checked ? state[prop] = 'Холодное' : state[prop] = 'Теплое';
            } else {
              state[prop] = item.value;
            }
            break;
          case('SELECT') :
            state[prop] = item.value;
            break
        }
      });
    });
  }


  bindModalState(windowForms, 'click', 'form');
  bindModalState(windowWidth, 'input', 'width');
  bindModalState(windowHeight, 'input', 'height');
  bindModalState(windowType, 'change', 'type');
  bindModalState(windowProfile, 'change', 'profile');
}

export default changeModalState;