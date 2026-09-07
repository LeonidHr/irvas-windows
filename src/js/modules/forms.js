import { closeModal } from "./modals";

const forms = () => {
  const formsArr = document.querySelectorAll('form'),
        inputsArr = document.querySelectorAll('input'),
        inputsPhoneArr = document.querySelectorAll('input[name="user_phone"]');

  const statusMessages = {
    loading: 'Загрузка...',
    success: 'Данные успешно отправлены',
    failure: 'Произошла ошибка'
  }

  inputsPhoneArr.forEach(input => {
    input.addEventListener('input', () => {
      input.value = input.value.replace(/\D/, '');
    })
  })

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

      const statusMessage = document.createElement('div');
      statusMessage.classList.add('status');
      form.appendChild(statusMessage);

      const formData = new FormData(form);

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