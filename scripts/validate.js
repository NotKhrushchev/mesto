const validationData = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__save-btn',
    inactiveButtonClass: 'form__save-btn_disabled',
    inputErrorClass: 'form__input_type_error',
}

const showError = (formElement, inputElement, errorMessage, {inputErrorClass}) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
};

const hideError = (formElement, inputElement, {inputErrorClass}) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, {...rest}) => {
    if (inputElement.validity.valid) {
        hideError(formElement, inputElement, rest);
    } else {
        showError(formElement, inputElement, inputElement.validationMessage, rest);
    }
};

const reviewValidity = (formElement, {inputSelector, ...rest}) => {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    inputList.forEach((inputElement) => {
        if (!inputElement.validity.valid) {
            hideError(formElement, inputElement, rest);
        }
    });
};

const reviewButtonState = (formElement, {inputSelector, submitButtonSelector, ...rest}) => {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);
    inputList.forEach(() => {
        toggleButtonState(inputList, buttonElement, rest);
    });
};


const setEventListeners = (formElement, {inputSelector, submitButtonSelector, ...rest}) => {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);
    toggleButtonState(inputList, buttonElement, rest);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement, rest);
            toggleButtonState(inputList, buttonElement, rest);
        });
    });
};

const enableValidation = ({formSelector, ...rest}) => {
    const formList = Array.from(document.querySelectorAll(formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(formElement, rest);
    });
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

const toggleButtonState = (inputList, buttonElement, {inactiveButtonClass}) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(inactiveButtonClass);
        buttonElement.setAttribute('disabled', '');
    } else {
        buttonElement.classList.remove(inactiveButtonClass);
        buttonElement.removeAttribute('disabled', '');
    }
};

enableValidation(validationData);