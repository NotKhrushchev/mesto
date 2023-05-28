/** Попап удаления карточки */
import { Popup } from "./Popup";

export class PopupWithConfirmation extends Popup {
    constructor(popupSelector, submitFunction) {
        super(popupSelector);
        this._submitFunction = submitFunction;
        this._form = this._popup.querySelector('.form');
        this._submitBtn = this._form.querySelector('.form__save-btn');
    }

    /** Открытие попапа удаления карточки */
    open = (card) => {
        super.open();
        this._card = card;
    }

    /** Сабмит формы */
    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitFunction(this._card._data._id)
        })
    }
}