//переменные для валидации
const validationConfig = {
  allforms: document.forms, //все формы
  inputSelector: '.popup__input', //inputList
  submitButtonSelector: '.popup__button-submit', //button
  errorSelector: '.popup__error_type_', //шаблон для инпутов

  inactiveButtonClass: 'popup__button-submit_inactive', //кнопка выкл
  inputErrorClass: 'popup__input_invalid', //инпут
  errorTextClass: 'popup__error_visible', //спан текст ошибки
};

//валидация
function enableValidation(config){
  const forms = Array.from(config.allforms);
    forms.forEach((form) => {
    const inputList = form.querySelectorAll(config.inputSelector);
    const button = form.querySelector(config.submitButtonSelector);
    hangEventListener(inputList, button, config.errorSelector, config.errorTextClass, config.inactiveButtonClass, config.inputErrorClass);
  })
}

function hangEventListener(inputList, button, errorSelector, errorTextClass, inactiveButtonClass, inputErrorClass){
  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      checkValidity(input, errorSelector, inputErrorClass, errorTextClass);
      toggleButton(inputList, button, inactiveButtonClass);
    })
  })
}

// проверяем валидацию
function checkValidity(input, errorSelector, inputErrorClass, errorTextClass){
  const errorTextElement = document.querySelector(`${errorSelector}${input.name}`)
  if (input.validity.valid){
    hideInputError(input, errorTextElement, inputErrorClass, errorTextClass);
  }
  else showInputError(input, errorTextElement, inputErrorClass, errorTextClass);
}

//показать ошибку
function showInputError(input, errorTextElement, inputErrorClass, errorTextClass){
  input.classList.add(inputErrorClass);
  errorTextElement.textContent = input.validationMessage;//???
  errorTextElement.classList.add(errorTextClass);
}

//скрыть ошибку
function hideInputError(input, errorTextElement, inputErrorClass, errorTextClass){
  input.classList.remove(inputErrorClass);
  errorTextElement.textContent = '';
  errorTextElement.classList.remove(errorTextClass);
}

//проверяем кнопку
function toggleButton(inputList, button, inactiveButtonClass){
  if (validInput(inputList)){
    activeButton(button, inactiveButtonClass);
  }
  else inactiveButton(button, inactiveButtonClass);
}

function validInput(inputList){
  return Array.from(inputList).every((input) => input.validity.valid)
}

//кнопка активна
function activeButton(button, inactiveButtonClass){
  button.classList.remove(inactiveButtonClass);
  button.removeAttribute('disabled');
}

//кнопка не активна
function inactiveButton(button, inactiveButtonClass){
  button.classList.add(inactiveButtonClass);
  button.setAttribute('disabled', true);
}

//сбрасываем ошибки в инпутах при закрытии формы на closeButton
function resetErrorForm(form){
  form.querySelectorAll(validationConfig.inputSelector).forEach((input) => {
    const errorTextElement = document.querySelector(`${validationConfig.errorSelector}${input.name}`)
    if (!input.validity.valid){
      hideInputError(input, errorTextElement, validationConfig.inputErrorClass, validationConfig.errorTextClass)
    }
  })
}