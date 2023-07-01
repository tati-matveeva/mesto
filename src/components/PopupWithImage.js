import Popup from "./Popup.js";

export default class PopupWithImage extends Popup{
  constructor(popupSelector){
    super(popupSelector);
    this._popupImage = this._popup.querySelector('.figure__image');
    this._imagePopupCaption = this._popup.querySelector('.figure__caption');
  }

  open = (cardData) => {
    this._popupImage.src = cardData.link;
    this._popupImage.alt = `Фото ${cardData.title}`;
    this._imagePopupCaption.textContent = cardData.name;
    super.open();
  }
}