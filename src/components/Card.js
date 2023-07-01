class Card {
  constructor(cardData, cardTemplate, openCardPopup, openDeletePopup, ){
    this._cardData = cardData;
    this._link = cardData.link;
    this._name = cardData.name;
    this._myId = cardData.myId;
    this._ownerId = cardData.owner._id;
    this._cardTemplate = cardTemplate;
    this._openCardPopup = openCardPopup;
    this._openDeletePopup = openDeletePopup;
    this._cloneElement = document.querySelector(cardTemplate).content.querySelector('.elements__element').cloneNode(true);
    this._imageElement = this._cloneElement.querySelector('.elements__image');
    this._deleteElement = this._cloneElement.querySelector('.elements__delete-button');
    this._likeElement = this._cloneElement.querySelector('.elements__like-button');
    this._nameElement = this._cloneElement.querySelector('.elements__name');
  }

  _buttonLike = () => {
    this._likeElement.classList.toggle('elements__like-button_active');
    console.log(this._myId)
    console.log(this._ownerId)
    console.log(this._deleteElement)

  }

  _buttonDelete = () => {
    this._openDeletePopup(this)
  }

  _openImagePopup = () => {
    this._openCardPopup(this._cardData);
  }

  _setEventListener(){
    this._likeElement.addEventListener('click', this._buttonLike);
    this._deleteElement.addEventListener('click', this._buttonDelete);
    this._imageElement.addEventListener('click', this._openImagePopup);
  }

  _compareId(){
    this._myId === this._ownerId ?  this._deleteElement.visibility = 'visible' : this._deleteElement.remove();
  }

  removeCard(){
    this._cloneElement.remove();
    this._cloneElement = null;
  }

  createCard(){
    this._imageElement.src = this._link;
    this._imageElement.alt = `Фото ${this._name}`;
    this._nameElement.textContent = this._name;

    this._setEventListener();
    this._compareId();
    return this._cloneElement;
  }
}

export default Card