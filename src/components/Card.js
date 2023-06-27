class Card {
  constructor(cardData, cardTemplate, openCardPopup){
    this._cardData = cardData;
    this._link = cardData.link;
    this._name = cardData.title;
    this._cardTemplate = cardTemplate;
    this._openCardPopup = openCardPopup;
  }

  _getClone(){
    return document.querySelector(this._cardTemplate).content.querySelector('.elements__element').cloneNode(true);
  }

  _buttonLike = () => {
    this._likeElement.classList.toggle('elements__like-button_active');
  }

  _buttonDelete = () => {
    this._cloneElement.remove();
    this.__cloneElement = null;
  }

  _openImagePopup = () => {
    this._openCardPopup(this._cardData);
  }

  _setEventListener(){
    this._likeElement.addEventListener('click', this._buttonLike);
    this._deleteElement.addEventListener('click', this._buttonDelete);
    this._imageElement.addEventListener('click', this._openImagePopup);
  }

  createCard(){
    this._cloneElement = this._getClone();
    this._imageElement = this._cloneElement.querySelector('.elements__image');
    this._deleteElement = this._cloneElement.querySelector('.elements__delete-button');
    this._likeElement = this._cloneElement.querySelector('.elements__like-button');
    this._nameElement = this._cloneElement.querySelector('.elements__name');
    this._imageElement.src = this._link;
    this._imageElement.alt = `Фото ${this._name}`;
    this._nameElement.textContent = this._name;
    this._setEventListener();
    return this._cloneElement;
  }
}

export default Card