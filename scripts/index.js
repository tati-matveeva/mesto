//переменные
const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__button-close');
const popupOpenButtonElement = document.querySelector('.profile__edit-button');
const profileElement = document.querySelector('.profile__info');
const inputName = profileElement.querySelector('.profile__title');
const inputJob = profileElement.querySelector('.profile__subtitle');
let inputNameNew = popupElement.querySelector('.popup__input_type_name');
let inputJobNew = popupElement.querySelector('.popup__input_type_occupation');
const formButtomSubmit = popupElement.querySelector('.popup__button-submit');
//открыли
function openPopup () {
  inputNameNew.value = inputName.textContent;
  inputJobNew.value = inputJob.textContent;
  popupElement.classList.add('popup_opened');
};
popupOpenButtonElement.addEventListener('click', openPopup);

//закрыли
function closePopup () {
  popupElement.classList.remove('popup_opened');
};
popupCloseButtonElement.addEventListener('click', closePopup);

//сохранение и новые данные

function popupSubmitButtonElement (evt) {
  evt.preventDefault();
  inputName.textContent = inputNameNew.value;
  inputJob.textContent = inputJobNew.value;
  closePopup ();
};

formButtomSubmit.addEventListener('click', popupSubmitButtonElement);
