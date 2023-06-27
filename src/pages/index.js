import './index.css';

import {
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
} from '../utils/constants.js';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';

const popupProfileElement = document.querySelector('.profile-popup');
const formProfileElement = popupProfileElement.querySelector('.popup__form');
const popupAddElement = document.querySelector('.add-popup');
const formAddElement = popupAddElement.querySelector('.popup__form');

const userInfo = new UserInfo(info);

const popupImage = new PopupWithImage(popupImageSelector);
popupImage.setEventListeners();

//отрисовка карточек
const section = new Section({
  items: initialCards, 
  renderer: (element) => {
    const card = new Card(element, cardTemplate, popupImage.open);
    return card.createCard();
  }
}, elementSelector)

section.addArrayCards()
 
const popupProfile = new PopupWithForm(popupProfileSelector, (data) => {
  userInfo.setUserInfo(data);
}) 

popupProfile.setEventListeners()

//сабмит для добавления карточек
const popupAddCard = new PopupWithForm(popupAddSelector, (data) => {
  // section.addItem(data);
  section.addItem(section.renderer(data));
});

popupAddCard.setEventListeners();

//FormValidator для formProfileElement и запуск валидации
const formProfileValidation = new FormValidator(validationConfig, formProfileElement);
formProfileValidation.enableValidation();

//FormValidator для formAddElement и запуск валидации
const formAddElementValidation = new FormValidator(validationConfig, formAddElement);
formAddElementValidation.enableValidation();


//открытие попап редактирования профиля
profileEditButtonElement.addEventListener('click', () => {
  formProfileValidation.resetErrorForm();
  popupProfile.setInputValues(userInfo.getUserInfo());
  popupProfile.open();
});

//открытые попапа добавления новых карточек
profileAddButtonElement.addEventListener('click', () => {
  formAddElement.reset();
  formAddElementValidation.resetErrorForm();
  popupAddCard.open();
})