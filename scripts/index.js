import { initialCards } from "./cards.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

const validationData = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save-btn',
  inactiveButtonClass: 'form__save-btn_disabled',
  inputErrorClass: 'form__input_type_error',
}

const cardArea = document.querySelector('.cards');
const profileEditBtn = document.querySelector('.profile__edit-btn');
const profileName = document.querySelector('.profile__name');
const profileInterest = document.querySelector('.profile__interest');
const popupTypeProfile = document.querySelector('.popup_type_profile');
const popupTypePlace = document.querySelector('.popup_type_place');
const formInputName = document.querySelector('.form__input_type_name');
const formInputInterest = document.querySelector('.form__input_type_interest');
const formInputDescription = document.querySelector('.form__input_type_desc');
const formInputLink = document.querySelector('.form__input_type_link');
const popupTypeProfileCloseBtn = document.querySelector('.profile-close-btn');
const popupTypePlaceCloseBtn = document.querySelector('.place-close-btn');
const popupTypeImgCloseBtn = document.querySelector('.img-close-btn');
const formProfile = document.querySelector('.form_type_profile');
const formPlace = document.querySelector('.form_type_place');
const placeAddBtn = document.querySelector('.profile__add-btn');
const popupTypeImg = document.querySelector('.popup_type_img');
const popupImg = document.querySelector('.popup__img');
const popupCaption = document.querySelector('.popup__caption');
const popupList = Array.from(document.querySelectorAll('.popup'));
const profileFormValidation = new FormValidator(validationData, formProfile);
const placeFormValidation = new FormValidator(validationData, formPlace);

profileFormValidation.enableValidation();

placeFormValidation.enableValidation();

const openPopup = (popupType) => {
  popupType.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
};

const closePopup = (popupType) => {
  popupType.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEsc);
};

const closePopupByOverlay = (popupType) => {
  popupType.addEventListener("click", (evt) => {
    if (evt.currentTarget === evt.target) {
      closePopup(popupType);
    }
  });
};

const closePopupByEsc = (evt) => {
  if (evt.key === 'Escape') {
    const currentPopup = document.querySelector('.popup_opened');
    closePopup(currentPopup);
  }
};

const editProfileForm = () => {
  profileFormValidation.reviewValidity();
  formInputName.value = profileName.textContent;
  formInputInterest.value = profileInterest.textContent;
  openPopup(popupTypeProfile);
  profileFormValidation.reviewButtonState();
};

const editPlaceForm = () => {
  placeFormValidation.reviewValidity();
  openPopup(popupTypePlace);
  formPlace.reset()
  placeFormValidation.reviewButtonState();
};

const handleFormProfileSubmit = (evt) => {
  evt.preventDefault();
  profileName.textContent = formInputName.value;
  profileInterest.textContent = formInputInterest.value;
  closePopup(popupTypeProfile);
};

const handleFormPlaceSubmit = (evt) => {
  evt.preventDefault();
  const cardData = {
    name: formInputDescription.value,
    link: formInputLink.value
  };
  prependNewCard(cardArea, createNewCard(cardData));
  closePopup(popupTypePlace);
};

const openPopupImg = (data) => {
  popupImg.setAttribute('src', data.link);
  popupImg.setAttribute('alt', `Фото места: ${data.name}`);
  popupCaption.textContent = data.name;
  openPopup(popupTypeImg);
};

const createNewCard = (item) => {
  const card = new Card(item, '.card-template', openPopupImg);
  const cardElement = card.generateCard();
  return cardElement;
};

const prependNewCard = (container, cardElement) => {
  container.prepend(cardElement);
};

initialCards.forEach(item => {
  prependNewCard(cardArea, createNewCard(item));
});

popupList.forEach(popupElement => {
  closePopupByOverlay(popupElement);
})

// closePopupByOverlay(popupTypeProfile);

// closePopupByOverlay(popupTypePlace);

// closePopupByOverlay(popupTypeImg);

popupTypeProfileCloseBtn.addEventListener('click', () => {
  closePopup(popupTypeProfile);
});

popupTypePlaceCloseBtn.addEventListener('click', () => {
  closePopup(popupTypePlace);
});

popupTypeImgCloseBtn.addEventListener('click', () => {
  closePopup(popupTypeImg);
});

profileEditBtn.addEventListener('click', editProfileForm);

formProfile.addEventListener('submit', handleFormProfileSubmit);

placeAddBtn.addEventListener('click', editPlaceForm);

formPlace.addEventListener('submit', handleFormPlaceSubmit);
