/** Попап формы */
import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(popupSelector, submitForm) {
        super(popupSelector);
        this._submitForm = submitForm;
        this._form = this._popup.querySelector('.form');
        this._submitBtn = this._form.querySelector('.form__save-btn');
        this._inputList = this._form.querySelectorAll('.form__input');
    }

    /** Получение значений инпутов */
    getInputValues() {
        this._inputValues = {};
        this._inputList.forEach(input => {
            this._inputValues[input.name] = input.value;
        });
        return this._inputValues;
    }

    /** Возвращение данных профиля в инпуты формы */
    setInputValues(profileData) {
        this._inputList.forEach(input => {
            input.value = profileData[input.name];
        });
    }

    /** Сброс инпутов */
    close() {
        super.close();
        this._form.reset();
    }

    /** Сабмит формы */
    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', this._submitForm)
    }
}