import { initialCards, validationData } from "./scripts/utils/constants.js";
import { Card } from "./scripts/components/Card.js";
import { FormValidator } from "./scripts/components/FormValidator.js";

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

const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
};

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEsc);
};

const initClosePopupByOverlay = (popup) => {
  popup.addEventListener("click", (evt) => {
    if (evt.currentTarget === evt.target) {
      closePopup(popup);
    }
  });
};

const closePopupByEsc = (evt) => {
  if (evt.key === 'Escape') {
    const currentPopup = document.querySelector('.popup_opened');
    closePopup(currentPopup);
  }
};

const openProfileForm = () => {
  profileFormValidation.reviewValidity();
  formInputName.value = profileName.textContent;
  formInputInterest.value = profileInterest.textContent;
  openPopup(popupTypeProfile);
  profileFormValidation.toggleButtonState();
};

const openPlaceForm = () => {
  placeFormValidation.reviewValidity();
  openPopup(popupTypePlace);
  formPlace.reset()
  placeFormValidation.toggleButtonState();
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
  initClosePopupByOverlay(popupElement);
});

popupTypeProfileCloseBtn.addEventListener('click', () => {
  closePopup(popupTypeProfile);
});

popupTypePlaceCloseBtn.addEventListener('click', () => {
  closePopup(popupTypePlace);
});

popupTypeImgCloseBtn.addEventListener('click', () => {
  closePopup(popupTypeImg);
});

profileEditBtn.addEventListener('click', openProfileForm);

formProfile.addEventListener('submit', handleFormProfileSubmit);

placeAddBtn.addEventListener('click', openPlaceForm);

formPlace.addEventListener('submit', handleFormPlaceSubmit);
