import { Popup } from "./Popup";

export class PopupWithRemoveCardForm extends Popup {
    constructor(popupSelector, submitFunction) {
        super(popupSelector);
        this._submitFunction = submitFunction;
        this._form = this._popup.querySelector('.form');
    }

    open = (card) => {
        super.open();
        this._card = card;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitFunction(this._card, this._cardId)
        })
    }
}