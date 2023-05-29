/** Попап удаления карточки */
import { Popup } from "./Popup";

export class PopupWithConfirmation extends Popup {
    constructor(popupSelector, submitFunction) {
        super(popupSelector);
        this._submitFunction = submitFunction;
        this._form = this._popup.querySelector('.form');
        this._submitBtn = this._form.querySelector('.form__save-btn');
        this._submitBtnTextOriginal = this._submitBtn.textContent;
    }

    /** Открытие попапа удаления карточки */
    open = (card, cardId) => {
        super.open();
        this._card = card;
        this._cardId = cardId;
    }

    /** Обновление состояния кнопки сабмита */
    setSubmitBtnState(active) {
        active === true ? this._submitBtn.textContent = `Да...` : this._submitBtn.textContent = this._submitBtnTextOriginal
    }

    /** Сабмит формы */
    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitFunction(this._card, this._cardId)
        })
    }
}