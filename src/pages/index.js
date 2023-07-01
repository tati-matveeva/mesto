import './index.css';

import {
  initialCards,
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
} from '../utils/constants.js';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupDeleteCard from '../components/PopupDeleteCard.js';


const popupProfileElement = document.querySelector('.profile-popup');
const formProfileElement = popupProfileElement.querySelector('.popup__form');
const popupAddElement = document.querySelector('.add-popup');
const formAddElement = popupAddElement.querySelector('.popup__form');
const popupAvatarElement = document.querySelector('.popup-avatar');
const formAvatarElement = popupAvatarElement.querySelector('.popup__form');

const userInfo = new UserInfo(info);

const popupImage = new PopupWithImage(popupImageSelector);
popupImage.setEventListeners();


//сабмит для удаления карточки
const popupDeleteCard = new PopupDeleteCard(popupDeleteSelector, (element) => {
  element.removeCard();
  popupDeleteCard.close();
})
popupDeleteCard.setEventListeners();

//------------------------------------------------------------------------
//отрисовка карточек

function createNewCard (element){
  const card = new Card(element, cardTemplate, popupImage.open, popupDeleteCard.open);
  return card.createCard();
}

const section = new Section({
  items: initialCards, 
  renderer: (element) => {
    section.addItem(createNewCard(element))
  }
}, elementSelector)

section.addArrayCards()
 //------------------------------------------------------------------------
 //сабмит для профиля
const popupProfile = new PopupWithForm(popupProfileSelector, (data) => {
  userInfo.setUserInfo(data);
}) 

popupProfile.setEventListeners()

//сабмит для добавления карточек
const popupAddCard = new PopupWithForm(popupAddSelector, (data) => {
  section.addItem(createNewCard(data))
  
});

popupAddCard.setEventListeners();

//сабмит для попап аватар
const popupAvatar = new PopupWithForm(popupAvatarSelector, (data) => {
  avatarButtonElement.src = data.avatar;
})

avatarButtonElement.addEventListener('click', () =>{
  formAvatarElement.reset();
  formAvatarValidation.resetErrorForm();
  popupAvatar.open();
})
popupAvatar.setEventListeners();

//------------------------------------------------------------------------
//FormValidator для formProfileElement и запуск валидации
const formProfileValidation = new FormValidator(validationConfig, formProfileElement);
formProfileValidation.enableValidation();

//FormValidator для formAddElement и запуск валидации
const formAddElementValidation = new FormValidator(validationConfig, formAddElement);
formAddElementValidation.enableValidation();

const formAvatarValidation = new FormValidator(validationConfig, formAvatarElement);
formAvatarValidation.enableValidation();
//------------------------------------------------------------------------
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

