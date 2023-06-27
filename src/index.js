import './pages/index.css';

import {
  initialCards,
  profileEditButtonElement,
  profileAddButtonElement,
  formProfileElement,
  formAddElement,
  cardTemplate,
  popupProfileSelector,
  popupAddSelector,
  popupImageSelector,
  elementSelector,
  info,
  validationConfig
} from './scripts/utils/constants.js';

import Card from './scripts/components/Card.js';
import FormValidator from './scripts/components/FormValidator.js';
import PopupWithImage from './scripts/components/PopupWithImage.js';
import Section from './scripts/components/Section.js';
import UserInfo from './scripts/components/UserInfo.js';
import PopupWithForm from './scripts/components/PopupWithForm.js';




const userInfo = new UserInfo(info);

const popupImage = new PopupWithImage(popupImageSelector);
popupImage.setEventListeners();

//отрисовка карточек из массива
const section = new Section({
  items: initialCards, 
  renderer: (element) => {
    const card = new Card(element, cardTemplate, popupImage.open);
    return card.createCard();
  }
}, elementSelector)

section.addArrayCards()

//сабмит профиля
const popupProfile = new PopupWithForm(popupProfileSelector, (evt) => {
  evt.preventDefault();
  userInfo.setUserInfo(popupProfile.getInputValues());
  popupProfile.close();
})

popupProfile.setEventListeners()

//сабмит для добавления карточек
const popupAddCard = new PopupWithForm(popupAddSelector, (evt) => {
  evt.preventDefault();
  section.addItem(section.renderer(popupAddCard.getInputValues()))
  popupAddCard.close();
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