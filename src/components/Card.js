class Card {
  constructor(cardData, cardTemplate, openCardPopup, openDeletePopup, myId, pressedLike){
    this._cardData = cardData;
    this._link = cardData.link;
    this._name = cardData.name;
    this._myId = myId;
    this._ownerId = cardData.owner._id;
    this._cardId = cardData._id;
    this._likes = cardData.likes;
    this._likesLength = cardData.likes.length;
    this._pressedLike = pressedLike;
    this._cardTemplate = cardTemplate;
    this._openCardPopup = openCardPopup;
    this._openDeletePopup = openDeletePopup;
    this._cloneElement = document.querySelector(cardTemplate).content.querySelector('.elements__element').cloneNode(true);
    this._imageElement = this._cloneElement.querySelector('.elements__image');
    this._deleteElement = this._cloneElement.querySelector('.elements__delete-button');
    this._likeElement = this._cloneElement.querySelector('.elements__like-button');
    this._nameElement = this._cloneElement.querySelector('.elements__name');
    this._likeCounter = this._cloneElement.querySelector('.elements__like-counter');
  }

  _buttonLike = () => {
    this._pressedLike(this._cardId, this.isLiked.bind(this));
    console.log('нажали лайк')
  }

  _buttonDelete = () => {
    this._openDeletePopup({ element: this, cardId: this._cardId })
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
    console.log(this._myId)
    console.log(this._ownerId)
    this._myId === this._ownerId ?  this._deleteElement.visibility = 'visible' : this._deleteElement.remove();
  }

  checkLike(){
    this._likes.forEach(item => {
    console.log(this._myId)
      if (item._id === this._myId) {
        this._likeElement.classList.add('elements__like-button_active');        
      } else {
        this._likeElement.classList.remove('elements__like-button_active');      
      }
      
    })
    this._likeCounter.textContent = this._likesLength
  }

  toggleLike(likes) {
    this._likeElement.classList.toggle('elements__like-button_active');
    this._likeCounter.textContent = likes.length
  }

  removeCard(){
    this._cloneElement.remove();
    this._cloneElement = null;
  }

  createCard(){
    this._imageElement.src = this._link;
    this._imageElement.alt = `Фото ${this._name}`;
    this._nameElement.textContent = this._name;
    this.checkLike();
    this._setEventListener();
    this._compareId();
    return this._cloneElement;
  }

  isLiked(){
    console.log(this._likeElement)
    if (this._likeElement.classList.contains('elements__like-button_active')) {
      return true
    } else {
      return false
    }
  }
}

export default Card