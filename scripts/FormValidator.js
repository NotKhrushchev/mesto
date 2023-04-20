export class FormValidator {
    constructor (data, formElement) {
        this._formElement = formElement;
        this._inputSelector = data.inputSelector;
        this._submitButtonSelector = data.submitButtonSelector;
        this._inactiveButtonClass = data.inactiveButtonClass;
        this._inputErrorClass = data.inputErrorClass;
    }

    _showError = (inputElement, errorMessage) => {
        this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`).textContent = errorMessage;
        inputElement.classList.add(this._inputErrorClass);
    };

    _hideError = (inputElement) => {
        this._formElement.querySelector(`.${inputElement.id}-error`).textContent = '';
        inputElement.classList.remove(this._inputErrorClass);
    };

    _checkInputValidity = (inputElement) => {
        if (inputElement.validity.valid) {
            this._hideError(inputElement);
        } else {
            this._showError(inputElement, inputElement.validationMessage);
        }
    };

    _hasInvalidInput = () => {
        return this._inputList.some(inputElement => {
            return !inputElement.validity.valid;
        });
    };

    _setEventListeners = () => {
        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
        this.toggleButtonState();
        this._inputList.forEach(inputElement => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this.toggleButtonState();
            });
        });
    };

    enableValidation = () => {
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        this._setEventListeners();
    };

    toggleButtonState = () => {
        if (this._hasInvalidInput()) {
            this._buttonElement.classList.add(this._inactiveButtonClass);
            this._buttonElement.setAttribute('disabled', '');
        } else {
            this._buttonElement.classList.remove(this._inactiveButtonClass);
            this._buttonElement.removeAttribute('disabled', '');
        }
    };

    
    reviewValidity = () => {
        this._inputList.forEach(inputElement => {
            if (!inputElement.validity.valid) {
                this._hideError(inputElement);
            }
        });
    };
}