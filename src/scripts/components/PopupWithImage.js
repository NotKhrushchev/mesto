/** Попап картинки */
import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

    /** Открытие попапа картинки */
    open = (cardData) => {
        super.open();
        this._imageForPopup = this._popup.querySelector('.popup__img');
        this._imageForPopup.setAttribute('src', cardData.link);
        this._imageForPopup.setAttribute('alt', `Фото места: ${cardData.name}`);
        this._popup.querySelector('.popup__caption').textContent = cardData.name;
    }
}