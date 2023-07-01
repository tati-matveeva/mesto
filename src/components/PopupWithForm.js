import Popup from "./Popup.js";

export default class PopupWithForm extends Popup{
  constructor(popupSelector, functionSubmit){
    super(popupSelector);
    this._functionSubmit = functionSubmit;
    this._inputList = this._form.querySelectorAll('.popup__input');
  }

  _getInputValues(){
    this._values = {};
    this._inputList.forEach(input => {
      this._values[input.name] = input.value
    })
    return this._values
  }

  setInputValues(userData){
    this._inputList.forEach(input => {
      input.value = userData[input.name];
    })
  }

  setEventListeners(){
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._functionSubmit(this._getInputValues());
      this.close();
    });
  }

  close(){
    super.close();
    this._form.reset();
  }
}