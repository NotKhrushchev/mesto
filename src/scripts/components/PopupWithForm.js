/** Попап формы */
import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(popupSelector, submitForm) {
        super(popupSelector);
        this._submitForm = submitForm;
        this._form = this._popup.querySelector('.form');
    }

    /** Получение значений инпутов */
    getInputValues() {
        this._inputValues = {};
        this._form.querySelectorAll('.form__input').forEach(input => {
            this._inputValues[input.name] = input.value;
        });
        return this._inputValues;
    }

    /** Возвращение данных профиля в инпуты формы */
    setInputValues(profileData) {
        console.log(profileData);
        this._form.querySelectorAll('.form__input').forEach(input => {
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