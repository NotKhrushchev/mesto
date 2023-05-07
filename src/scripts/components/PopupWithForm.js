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
        const inputValues = {};
        this._form.querySelectorAll('.form__input').forEach(input => {
            inputValues[input.name] = input.value;
        });
        return inputValues;
    }

    /** Установка данных профиля в инпуты формы */
    setInputValues(profileData) {
        this._form.querySelectorAll('.form__input').forEach(input => {
            input.name = profileData.name;
            input.interest = profileData.interest;
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

        this._form.addEventListener('submit', (evt) => {
            this._submitForm(evt);
        })
    }
}