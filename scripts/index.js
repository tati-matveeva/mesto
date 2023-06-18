import initialCards from './array.js'
import Card from './Card.js';
import FormValidator from './FormValidator.js';

//переменные
const popupElements = document.querySelector('.popup');

const popupCloseButtonElements = document.querySelectorAll('.popup__button-close');
const profileEditButtonElement = document.querySelector('.profile__edit-button');
const profileAddButtonElement = document.querySelector('.profile__add-button');
const inputName = document.querySelector('.profile__title');
const inputJob = document.querySelector('.profile__subtitle');
const inputNameNew = popupElements.querySelector('.popup__input_type_name');
const inputJobNew = popupElements.querySelector('.popup__input_type_occupation');

const popupProfileElement = document.querySelector('.profile-popup');
const formProfileElement = popupProfileElement.querySelector('.popup__form');

const popupAddElement = document.querySelector('.add-popup');
const formAddElement = popupAddElement.querySelector('.popup__form');
const inputTitle = formAddElement.querySelector('.popup__input_type_title');
const inputLink = formAddElement.querySelector('.popup__input_type_link');

const imagePopupElement = document.querySelector('.popup-image');
const popupImageElement = imagePopupElement.querySelector('.figure__image');
const imagePopupCaption = imagePopupElement.querySelector('.figure__caption');

const elementsElement = document.querySelector('.elements__container');
const cardTemplate = '#cardTemplate';

//переменные для валидации
const validationConfig = {
  inputSelector: '.popup__input', //inputList
  submitButtonSelector: '.popup__button-submit', //button
  errorSelector: '.popup__error_type_', //шаблон для инпутов
  inactiveButtonClass: 'popup__button-submit_inactive', //кнопка выкл
  inputErrorClass: 'popup__input_invalid', //инпут
  errorTextClass: 'popup__error_visible', //спан текст ошибки
};

//открытие попап
function openPopup (popup){
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEscape);
}

//открытие попап редактирования профиля
profileEditButtonElement.addEventListener('click', () => {
  formProfileElement.reset();
  formProfileValidation.resetErrorForm();
  inputNameNew.value = inputName.textContent;
  inputJobNew.value = inputJob.textContent;
  openPopup(popupProfileElement);
});

//закрытие попап
function closePopup(popup){
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEscape);
}

//закрытие на крестик
popupCloseButtonElements.forEach((element) => {
  const popup = element.closest('.popup');
  element.addEventListener('click', () => {
    closePopup(popup);
  })
});

//закрытие на esc
function closePopupEscape(evt){
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

//закрытие по оверлею
const popups = document.querySelectorAll('.popup'); //Ищем все попапы
popups.forEach((popup) => {
 popup.addEventListener('click', (evt) => {
  //Благодаря всплытию при клике на крестик мы поймаем событие на элементе попапа.
  //Проверяем что кликнули на оверлей или на крестик.
  if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close-button')){
   closePopup(popup);
  }
 });
}); 

//Добавление новых данных в профиль и сохранение 
formProfileElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  inputName.textContent = inputNameNew.value;
  inputJob.textContent = inputJobNew.value;
  closePopup(popupProfileElement);
});

//открытые попапа добавления новых карточек
profileAddButtonElement.addEventListener('click', () => {
  formAddElement.reset();
  formAddElementValidation.resetErrorForm();
  openPopup(popupAddElement);
})

//открытие попап фото
function openCardPopup(cardData){
  popupImageElement.src = cardData.link;
  popupImageElement.alt = cardData.name;
  imagePopupCaption.textContent = cardData.name;
  openPopup(imagePopupElement);
}

//создание карточки
function newCard(element){
  const card = new Card(element, cardTemplate, openCardPopup);
  const cardElement = card.createCard();
  return cardElement;
}

//добавление карточки в контейнер
function addNewCard(container, card) {
  container.prepend(card);
}

//создание карточек из массива
initialCards.forEach(element => {
  addNewCard(elementsElement, newCard(element))
})

//сабмит для добавления карточек
formAddElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const objectNewCardInfo = {name: inputTitle.value, link: inputLink.value};
  const card = newCard(objectNewCardInfo);
  addNewCard(elementsElement, card);
  closePopup(popupAddElement);
});

//FormValidator для formProfileElement и запуск валидации
const formProfileValidation = new FormValidator(validationConfig, formProfileElement);
formProfileValidation.enableValidation();

//FormValidator для formAddElement и запуск валидации
const formAddElementValidation = new FormValidator(validationConfig, formAddElement);
formAddElementValidation.enableValidation();