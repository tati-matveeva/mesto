import Popup from "./Popup.js"

export default class PopupDeleteCard extends Popup{
  constructor(popupSelector, functionSubmit){
    super(popupSelector);
    this._functionSubmit = functionSubmit;
  }

  setEventListeners(){
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._functionSubmit(this._element);
      this.close();
    });
  }

  open = (element) => {
    super.open();
    this._element = element;
  }
}