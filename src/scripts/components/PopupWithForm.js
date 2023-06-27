import Popup from "./Popup.js";

export default class PopupWithForm extends Popup{
  constructor(popupSelector, functionSubmit){
    super(popupSelector);
    this._functionSubmit = functionSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = this._form.querySelectorAll('.popup__input');
  }

  getInputValues(){
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
    this._form.addEventListener('submit', this._functionSubmit)
  }

  close(){
    super.close();
    this._form.reset();
  }
}