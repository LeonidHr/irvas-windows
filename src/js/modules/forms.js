import { closeModal } from "./modals";
import checkPhoneInputs from "./checkPhoneInputs";

const forms = (calcState) => {
  const formsArr = document.querySelectorAll('form');

  const statusMessages = {
    loading: 'Загрузка...',
    success: 'Данные успешно отправлены',
    failure: 'Произошла ошибка'
  }

  checkPhoneInputs('input[name="user_phone"]');

  const postData = async (url, data) => {
    document.querySelector('.status').textContent = statusMessages.loading;

    const res = await fetch(url, {
      method: 'POST',
      body: data
    });

    return await res.text();
  }

  const resetInputs = () => {
    const inputsArr = document.querySelectorAll('input');

    inputsArr.forEach(inp => {
      if (inp.type === 'radio' || inp.type === 'checkbox') {
        inp.checked = false;
      } else {
        inp.value = '';
      }
    });
  }

  formsArr.forEach(form => {
    const reqInputs = form.querySelectorAll('[required]:not([type="radio"])');
    const radioGroups = form.querySelectorAll('.radio-group');

    reqInputs.forEach(inp => {
      inp.addEventListener('input', () => {
        if (inp.value.trim() !== '') {
          removeError(inp);
        }
      }); 
    });

    radioGroups.forEach(item => {
      const radios = item.querySelectorAll('input[type="radio"]');

      radios.forEach(radio => {
        radio.addEventListener('change', () => {
          removeError(item);
        });
      });
    });



    form.addEventListener("submit", e => {
      e.preventDefault();
      
      if(!validateForm(form)) {
        return;
      }

      const formData = new FormData(form);
      if (form.dataset.calc === 'end') {
        for (let key in calcState) {
          formData.append(key, calcState[key]);
        }
      }

      const statusMessage = document.createElement('div');
      statusMessage.classList.add('status');
      form.appendChild(statusMessage);

      postData('./assets/server.php', formData)
        .then(res => {
          console.log(res);
          statusMessage.textContent = statusMessages.success;
        })
        .catch(error => {
          console.log(error);
          statusMessage.textContent = statusMessages.failure;
        })
        .finally(() => {
          resetInputs();  
          setTimeout(() => {
            statusMessage.remove();

            if (form.closest('[data-modal]')) {
              closeModal(`.${form.closest('[data-modal]').dataset.modal}`)
            }
          }, 5000);
        });
    });
  });

}

function showError(element) {
  element.classList.add('error');
  const errorMessage = document.createElement('div');
  errorMessage.classList.add('error-message');

  errorMessage.textContent =
    element.dataset.error ||
    'Заполните это поле';

  element.insertAdjacentElement('afterend', errorMessage);
}

function removeError(element) {
  element.classList.remove('error');

  const errorMessage = element.nextElementSibling;

  if (errorMessage?.classList.contains('error-message')) {
    errorMessage.remove();
  }
}

function validateForm (form) {
  const reqInputs = form.querySelectorAll('[required]:not([type="radio"])');
  const radioGroups = form.querySelectorAll('.radio-group');
  let isValid = true;

  reqInputs.forEach(inp => {
    removeError(inp);

    if (inp.value.trim() === '') {
      showError(inp);
      isValid = false;
    }
  });

  radioGroups.forEach(group => {
    const isChecked = group.querySelector('input[type="radio"]:checked');

    removeError(group);

    if (!isChecked) {
      showError(group);
      isValid = false;
    }
  });

  return isValid;
}

export {validateForm}

export default forms;