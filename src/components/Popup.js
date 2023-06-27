export default class Popup {
  constructor(popupSelector){
    this._popup = document.querySelector(popupSelector);
    this._popupCloseButtonElements = this._popup.querySelector('.popup__button-close');
  }

  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _handleCloseBtn = () => {
    this.close();
  }

  _handleOverlay = (evt) => {
    if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__button-close')){
      this.close();
    }
  }

  setEventListeners(){
    this._popupCloseButtonElements.addEventListener('click', this._handleCloseBtn);
    this._popup.addEventListener('click', this._handleOverlay);
  }

  open(){
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close(){
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }
}