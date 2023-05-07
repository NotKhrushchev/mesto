import { cardContainerSelector, initialCards, popupProfileSelector, validationData } from "./scripts/utils/constants.js";
import { Card } from "./scripts/components/Card.js";
import { FormValidator } from "./scripts/components/FormValidator.js";
import { Section } from "./scripts/components/Section.js";


const profileEditBtn = document.querySelector('.profile__edit-btn');
const profileName = document.querySelector('.profile__name');
const profileInterest = document.querySelector('.profile__interest');

const popupTypePlace = document.querySelector('.popup_type_place');
const formInputName = document.querySelector('.form__input_type_name');
const formInputInterest = document.querySelector('.form__input_type_interest');
const formInputDescription = document.querySelector('.form__input_type_desc');
const formInputLink = document.querySelector('.form__input_type_link');
const formProfile = document.querySelector('.form_type_profile');
const formPlace = document.querySelector('.form_type_place');
const placeAddBtn = document.querySelector('.profile__add-btn');
const popupTypeImg = document.querySelector('.popup_type_img');
const popupImg = document.querySelector('.popup__img');
const popupCaption = document.querySelector('.popup__caption');
const profileFormValidation = new FormValidator(validationData, formProfile);
const placeFormValidation = new FormValidator(validationData, formPlace);

profileFormValidation.enableValidation();

placeFormValidation.enableValidation();

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
  prependNewCard(cardContainerSelector, createNewCard(cardData));
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

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, '.card-template', openPopupImg);
    const cardElement = card.generateCard();
    cardList.setItem(cardElement);
  }
}, cardContainerSelector);

cardList.renderItems();

const prependNewCard = (containerSelector, cardElement) => {
  const container = document.querySelector(containerSelector)
  container.prepend(cardElement);
};

profileEditBtn.addEventListener('click', () => {});

formProfile.addEventListener('submit', handleFormProfileSubmit);

placeAddBtn.addEventListener('click', openPlaceForm);

formPlace.addEventListener('submit', handleFormPlaceSubmit);
