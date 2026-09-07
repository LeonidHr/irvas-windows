
const checkPhoneInputs = (selector) => {
  const inputsPhoneArr = document.querySelectorAll(selector);
  
  inputsPhoneArr.forEach(input => {
    input.addEventListener('input', () => {
      input.value = input.value.replace(/\D/, '');
    })
  });
}

export default checkPhoneInputs;