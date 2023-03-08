let profileEditBtn = document.querySelector('.profile__edit-btn');
let profileName = document.querySelector('.profile__name');
let profileInterest = document.querySelector('.profile__interest');
let popup = document.querySelector('.popup');
let popupName = document.querySelector('.popup__input_type_name');
let popupInterest = document.querySelector('.popup__input_type_interest');
let popupCloseBtn = document.querySelector('.popup__close-btn');
let formElement = document.querySelector('.form');

function openPopup () {
    popup.classList.add('popup_opened');
    editForm();
};

function closePopup () {
    popup.classList.remove('popup_opened');
};

function editForm () {
    popupName.value = profileName.textContent;
    popupInterest.value = profileInterest.textContent;
};

function handleFormSubmit (evt) {
    evt.preventDefault();
    profileName.textContent = popupName.value;
    profileInterest.textContent = popupInterest.value;
    closePopup();
};

profileEditBtn.addEventListener('click', openPopup);

popupCloseBtn.addEventListener('click', closePopup);

formElement.addEventListener('submit', handleFormSubmit);