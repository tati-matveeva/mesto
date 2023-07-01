const profileEditButtonElement = document.querySelector('.profile__edit-button');
const profileAddButtonElement = document.querySelector('.profile__add-button');
const avatarButtonElement = document.querySelector('.profile__avatar-button')

//переменные селекторов
const cardTemplate = '#cardTemplate';
const popupProfileSelector = '.profile-popup';
const popupAddSelector = '.add-popup';
const popupImageSelector = '.popup-image';
const elementSelector = '.elements__container';
const popupAvatarSelector = '.popup-avatar';
const popupDeleteSelector = '.popup-delete';


const info = {
  profileNameSelector: '.profile__title',
  profileJobSelector: '.profile__subtitle',
  profileAvatarSelector: '.profile__avatar'
}

//переменные для валидации
const validationConfig = {
  inputSelector: '.popup__input', //inputList
  submitButtonSelector: '.popup__button-submit', //button
  errorSelector: '.popup__error_type_', //шаблон для инпутов
  inactiveButtonClass: 'popup__button-submit_inactive', //кнопка выкл
  inputErrorClass: 'popup__input_invalid', //инпут
  errorTextClass: 'popup__error_visible', //спан текст ошибки
};

export {
  profileEditButtonElement,
  profileAddButtonElement,
  avatarButtonElement,
  cardTemplate,
  popupProfileSelector,
  popupAddSelector,
  popupImageSelector,
  elementSelector,
  popupAvatarSelector,
  popupDeleteSelector,
  info,
  validationConfig
}