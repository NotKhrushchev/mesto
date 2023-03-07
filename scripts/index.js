let profileEditBtn = document.querySelector('.profile__edit-btn');
let profileName = document.querySelector('.profile__name');
let profileInterest = document.querySelector('.profile__interest');
let popup = document.querySelector('.popup');
let popupName = document.querySelector('.popup__name');
let popupInterest = document.querySelector('.popup__interest');
let popupCloseBtn = document.querySelector('.popup__close-btn');
let formElement = document.querySelector('.popup__form');

console.log(formElement)

function openPopup () {
    popup.style.display = 'flex'
    popupName.value = profileName.textContent;
    popupInterest.value = profileInterest.textContent
};

function closePopup () {
    popup.style.display = 'none'
};

profileEditBtn.addEventListener('click', openPopup);

popupCloseBtn.addEventListener('click', closePopup);

function handleFormSubmit (evt) {
    evt.preventDefault();
    profileName.textContent = popupName.value
    profileInterest.textContent = popupInterest.value
    closePopup()
};

formElement.addEventListener('submit', handleFormSubmit);