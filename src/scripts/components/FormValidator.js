class FormValidator{
  constructor(config, form){
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._errorSelector = config.errorSelector;
    this._inputErrorClass = config.inputErrorClass;
    this._errorTextClass = config.errorTextClass;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._form = form;
    this._button = form.querySelector(this._submitButtonSelector);
    this._inputList = form.querySelectorAll(this._inputSelector);
  }

  _showInputError(errorText, input){
    errorText.classList.add(this._errorTextClass);
    errorText.textContent = input.validationMessage;
  }
  
  _hideInputError(errorText, input){
    input.classList.remove(this._errorTextClass);
    errorText.textContent = '';

  }

  _activeButton(){
    this._button.classList.remove(this._inactiveButtonClass);
    this._button.removeAttribute('disabled');
  }

  _disableButtonClass(){
    this._button.classList.add(this._inactiveButtonClass);
    this._button.setAttribute('disabled', true);
  }

  _validInput(){
    return Array.from(this._inputList).every(input => input.validity.valid);
  }

  _toggleButton(){
    this._validInput() ? this._activeButton() : this._disableButtonClass();
  }
  
  _checkValidity(input){
    const errorText = this._form.querySelector(`${this._errorSelector}${input.name}`);
    input.validity.valid ? this._hideInputError(errorText, input) : this._showInputError(errorText, input);
  }

  _hangEventListener(){
    this._inputList.forEach(input => {
      input.addEventListener('input', () => {
        this._checkValidity(input);
        this._toggleButton();
      })
    })
  }

  enableValidation(){
    this._hangEventListener();
  }

  resetErrorForm(){
    this._inputList.forEach(input => {
      const errorTextElement = this._form.querySelector(`${this._errorSelector}${input.name}`)
        if (!input.validity.valid){
          this._hideInputError(input, errorTextElement)
        }
    })
    this._disableButtonClass()
  }
}

export default FormValidator