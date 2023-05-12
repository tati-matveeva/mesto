//переменные
const popupElements = document.querySelector('.popup');

const popupCloseButtonElement = document.querySelectorAll('.popup__button-close');
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
const imagePopupBoxElement = imagePopupElement.querySelector('.popup-image__box');

const elementsElement = document.querySelector('.elements__container');
const cardTemplate = document.querySelector('#cardTemplate').content;

const submitProfileElement = popupProfileElement.querySelector('.popup__button-submit');
const inputProfileForm = popupProfileElement.querySelectorAll('.popup__input');

const submitAddElement = popupAddElement.querySelector('.popup__button-submit');
const inputAddForm = popupAddElement.querySelectorAll('.popup__input');


//массив для карточек 
const initialCards = [
  {
    name: 'Челябинская область',
    link: 'https://images.unsplash.com/photo-1661154649880-a11d195ecacc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80'
  },
  {
    name: 'Териберка',
    link: 'https://images.unsplash.com/photo-1606841002936-38996d5eea7f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
  },
  {
    name: 'Санкт-Петербург',
    link: 'https://images.unsplash.com/photo-1615116280262-8ad0321e70cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80'
  },
  {
    name: 'Мыс Хамелеон',
    link: 'https://images.unsplash.com/photo-1623617105388-ec22d118cfc5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80'
  },
  {
    name: 'Владивосток',
    link: 'https://images.unsplash.com/photo-1643281237869-90f896c8fd6f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80'
  },
  {
    name: 'Байкал',
    link: 'https://images.unsplash.com/photo-1614093576028-920b30d65326?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80'
  }
];

//открытие попап
function openPopup (popup){
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEscape);
}

profileEditButtonElement.addEventListener('click', () => {
  resetErrorForm(formProfileElement);
  inputNameNew.value = inputName.textContent;
  inputJobNew.value = inputJob.textContent;
  toggleButton(inputProfileForm, submitProfileElement, validationConfig.inactiveButtonClass)
  openPopup(popupProfileElement);
});

//закрытие попап
function closePopup (popup){
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEscape);
}

popupCloseButtonElement.forEach((element) => {
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
function closePopupOverlay(evt){
  if (evt.target === evt.currentTarget){
    closePopup(evt.target);
  }
};

popupProfileElement.addEventListener('click', (evt) => {
  closePopupOverlay(evt);
})

popupAddElement.addEventListener('click', (evt) => {
  closePopupOverlay(evt);
})

imagePopupElement.addEventListener('click', (evt) => {
  closePopupOverlay(evt);
})

//Добавление новых данных и сохранение 
formProfileElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  inputName.textContent = inputNameNew.value;
  inputJob.textContent = inputJobNew.value;
  closePopup(popupProfileElement);
});

//открытые попапа добавления новых карточек
profileAddButtonElement.addEventListener('click', () => {
  formAddElement.reset();
  resetErrorForm(formAddElement);
  toggleButton(inputAddForm, submitAddElement, validationConfig.inactiveButtonClass)
  openPopup(popupAddElement);
})

//карточки
function newCard(object){
  const cardElement = cardTemplate.querySelector('.elements__element').cloneNode(true);
  const imageElement = cardElement.querySelector('.elements__image');
  const deleteElement = cardElement.querySelector('.elements__delete-button');
  const likeElement = cardElement.querySelector('.elements__like-button');
  imageElement.alt = object.name;
  imageElement.src = object.link;
  cardElement.querySelector('.elements__name').textContent = object.name;
  likeElement.addEventListener('click', (evt) => evt.target.classList.toggle('elements__like-button_active'));
  deleteElement.addEventListener('click', (evt) => evt.target.closest('.elements__element').remove());

  imageElement.addEventListener('click', () => {
    popupImageElement.src = object.link;
    popupImageElement.alt = object.name;
    imagePopupCaption.textContent = object.name;
    openPopup(imagePopupElement);
  })
  return cardElement;
}

initialCards.forEach((element) => {
  const card = newCard(element);
  elementsElement.append(card);
})

formAddElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const objectNewCardInfo = {name: inputTitle.value, link: inputLink.value};
  elementsElement.prepend(newCard(objectNewCardInfo));
  closePopup(popupAddElement);
  evt.target.reset();
})

enableValidation(validationConfig);