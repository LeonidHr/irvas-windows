import { closeModal } from "./modals";
import checkPhoneInputs from "./checkPhoneInputs";

const forms = (calcState) => {
  const formsArr = document.querySelectorAll('form'),
        inputsArr = document.querySelectorAll('input'),
        errorsArr = [];

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
    inputsArr.forEach(inp => {
      inp.value = '';
    })
  }

  formsArr.forEach(form => {
    form.addEventListener("submit", e => {
      e.preventDefault();
      
      const formData = new FormData(form);
      if (form.dataset.calc === 'end') {
        for (let key in calcState) {
          formData.append(key, calcState[key]);
        }
      }

      // formData.forEach((value, key) => {
      //   if (!value.trim()) {
      //     errorsArr.push(key);
      //   }
      // });

      // errorsArr.forEach(error => {
      //   form.querySelector(`[name="${error}"]`).classList.add('error');
      // });



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

            if (form.classList.contains('form-modal')) {
              closeModal(`.${form.name}`)
            }
          }, 5000);
        });
    });
  });

}

export default forms;