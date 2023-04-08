const showError = (formElement, inputElement, errorMessage, data) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('form__input_type_error');
    errorElement.textContent = errorMessage;
};

const hideError = (formElement, inputElement, data) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('form__input_type_error');
    errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, data) => {
    if (inputElement.validity.valid) {
        hideError(formElement, inputElement, data);
    } else {
        showError(formElement, inputElement, inputElement.validationMessage, data);
    }
};

const reviewValidity = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.form__input'));
    const buttonElement = formElement.querySelector('.form__save-btn');
    inputList.forEach((inputElement) => {
        if (!inputElement.validity.valid) {
            hideError(formElement, inputElement);
        }
    });
};

const reviewButtonState = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.form__input'));
    const buttonElement = formElement.querySelector('.form__save-btn');
    inputList.forEach((inputElement) => {
        toggleButtonState(inputList, buttonElement);
    });
};


const setEventListeners = (formElement, data) => {
    const inputList = Array.from(formElement.querySelectorAll(data.inputSelector));
    const buttonElement = formElement.querySelector(data.submitButtonSelector);
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement, data);
            toggleButtonState(inputList, buttonElement);
        });
    });
};

const enableValidation = (data) => {
    const formList = Array.from(document.querySelectorAll(data.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(formElement, data);
    });
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add('form__save-btn_disabled');
        buttonElement.setAttribute('disabled', '');
    } else {
        buttonElement.classList.remove('form__save-btn_disabled');
        buttonElement.removeAttribute('disabled', '');
    }
};

enableValidation({
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__save-btn',
    inactiveButtonClass: 'form__save-btn_disabled',
    inputErrorClass: 'form__input_type_error',
});