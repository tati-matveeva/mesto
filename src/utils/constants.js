//массив для карточек 
const initialCards = [
  {
    title: 'Челябинская область',
    link: 'https://images.unsplash.com/photo-1661154649880-a11d195ecacc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80'
  },
  {
    title: 'Териберка',
    link: 'https://images.unsplash.com/photo-1606841002936-38996d5eea7f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
  },
  {
    title: 'Санкт-Петербург',
    link: 'https://images.unsplash.com/photo-1615116280262-8ad0321e70cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80'
  },
  {
    title: 'Мыс Хамелеон',
    link: 'https://images.unsplash.com/photo-1623617105388-ec22d118cfc5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80'
  },
  {
    title: 'Владивосток',
    link: 'https://images.unsplash.com/photo-1643281237869-90f896c8fd6f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80'
  },
  {
    title: 'Байкал',
    link: 'https://images.unsplash.com/photo-1614093576028-920b30d65326?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80'
  }
];


const profileEditButtonElement = document.querySelector('.profile__edit-button');
const profileAddButtonElement = document.querySelector('.profile__add-button');

//переменные селекторов
const cardTemplate = '#cardTemplate';
const popupProfileSelector = '.profile-popup';
const popupAddSelector = '.add-popup';
const popupImageSelector = '.popup-image';
const elementSelector = '.elements__container';

const info = {
  profileNameSelector: '.profile__title',
  profileJobSelector: '.profile__subtitle'
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
  initialCards,
  profileEditButtonElement,
  profileAddButtonElement,
  cardTemplate,
  popupProfileSelector,
  popupAddSelector,
  popupImageSelector,
  elementSelector,
  info,
  validationConfig
}