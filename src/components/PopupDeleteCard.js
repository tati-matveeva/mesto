import Popup from "./Popup.js"

export default class PopupDeleteCard extends Popup{
  constructor(popupSelector, functionSubmit){
    super(popupSelector);
    this._functionSubmit = functionSubmit;
    this._submitButton = this._form.querySelector('.popup__button-submit');
    this._textButtonDefault = this._submitButton.textContent;
  }

  setEventListeners(){
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitButton.textContent = `${this._submitButton.textContent}...`;
      this._functionSubmit({ element: this._element, cardId: this._cardId });
    });
  }

  textButtonNew(){
    this._submitButton.textContent = this._textButtonDefault;
  }

  open = ({ element, cardId }) => {
    super.open();
    this._element = element;
    this._cardId = cardId;
  }
}