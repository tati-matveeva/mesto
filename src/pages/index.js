import './index.css';

import {
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

import Api from '../components/Api.js';

const popupProfileElement = document.querySelector('.profile-popup');
const formProfileElement = popupProfileElement.querySelector('.popup__form');
const popupAddElement = document.querySelector('.add-popup');
const formAddElement = popupAddElement.querySelector('.popup__form');
const popupAvatarElement = document.querySelector('.popup-avatar');
const formAvatarElement = popupAvatarElement.querySelector('.popup__form');

const userInfo = new UserInfo(info);

const popupImage = new PopupWithImage(popupImageSelector);
popupImage.setEventListeners();

//------------------------------------------------------------------------
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-69',
  headers: {
    authorization: 'b2122897-68ea-4fe2-be39-76c88a44d2f7',
    'Content-Type': 'application/json'
  }
}); 

//------------------------------------------------------------------------
//сабмит для удаления карточки
const popupDeleteCard = new PopupDeleteCard(popupDeleteSelector, ({ element, cardId}) => {
  api.deleteCard(cardId)
    .then(() => {
      element.removeCard();
      popupDeleteCard.close();
    })
    .catch((error) =>
      console.error(`Ошибка при удалении карточки ${error}`))
    .finally(() => popupDeleteCard.textButtonNew())
})
popupDeleteCard.setEventListeners();

//------------------------------------------------------------------------
//отрисовка карточек

function createNewCard (element){
  const card = new Card(element, cardTemplate, popupImage.open, popupDeleteCard.open, (likeElement, cardId) => {
    if (likeElement.classList.contains('elements__like-button_active')){
      api.deleteLike(cardId)
        .then(res => {
          console.log(res);
          card.toggleLike(res.likes);
        })
        .catch((error) =>
          console.error(`Ошибка при удалении лайка ${error}`))
    } else {
      api.addLike(cardId)
        .then(res => {
          card.toggleLike(res.likes)
      })
        .catch((error) =>
          console.error(`Ошибка при установке лайка ${error}`))
    }
  
  });
  return card.createCard();
}

const section = new Section((element) => {
  section.addItemAppend(createNewCard(element))
  }, elementSelector)

 //------------------------------------------------------------------------
 //сабмит для профиля
const popupProfile = new PopupWithForm(popupProfileSelector, (data) => {
  api.setUserInfo(data)
  .then(res => {
    userInfo.setUserInfo({ username: res.name, occupation: res.about, avatar: res.avatar })
    popupProfile.close();
  })
  .catch((error) =>
    console.error(`Ошибка при редактировании профиля ${error}`))
  .finally(() => popupProfile.textButtonNew())
}) 

popupProfile.setEventListeners()

//сабмит для добавления карточек
const popupAddCard = new PopupWithForm(popupAddSelector, (data) => {
  Promise.all([api.getInfo(), api.addCard(data)])
  .then(([userData, cardData]) => {
    cardData.myId = userData._id;
    section.addItem(createNewCard(cardData))
    popupAddCard.close();
  })
  .catch((error) =>
      console.error(`Ошибка при добавлении карточки ${error}`))
  .finally(() => popupAddCard.textButtonNew())
});

popupAddCard.setEventListeners();

//сабмит для попап аватар
const popupAvatar = new PopupWithForm(popupAvatarSelector, (data) => {
  avatarButtonElement.src = data.avatar;
  api.setAvatar(data)
    .then(res => {
      userInfo.setUserInfo({ username: res.name, occupation: res.about, avatar: res.avatar })
      popupAvatar.close();
    })
    .catch((error) =>
      console.error(`Ошибка при редактировании аватара ${error}`))
    .finally(() => popupAvatar.textButtonNew())
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

//------------------------------------------------------------------------

Promise.all([api.getInfo(), api.getInitialCards()])
  .then(([userData, cardData]) => {
    cardData.forEach(element => element.myId = userData._id)
    userInfo.setUserInfo({ username: userData.name, occupation: userData.about, avatar: userData.avatar })
    section.addArrayCards(cardData);
  })
  .catch((error) =>
    console.error(`Ошибка при загрузке данных страницы ${error}`))
  .finally()