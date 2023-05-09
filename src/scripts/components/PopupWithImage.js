/** Попап картинки */
import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._imageForPopup = this._popup.querySelector('.popup__img');
        this._popupCaption = this._popup.querySelector('.popup__caption');
    }

    /** Открытие попапа картинки */
    open = (cardData) => {
        super.open();
        this._imageForPopup.setAttribute('src', cardData.link);
        this._imageForPopup.setAttribute('alt', `Фото места: ${cardData.name}`);
        this._popupCaption.textContent = cardData.name;
    }
}