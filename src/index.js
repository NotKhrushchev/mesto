import { cardContainerSelector, initialCards, popupImgSelector, popupProfileSelector, validationData } from "./scripts/utils/constants.js";
import { Card } from "./scripts/components/Card.js";
import { FormValidator } from "./scripts/components/FormValidator.js";
import { Section } from "./scripts/components/Section.js";
import { PopupWithImage } from "./scripts/components/PopupWithImage.js";
import { PopupWithForm } from "./scripts/components/PopupWithForm.js";


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
const profileFormValidation = new FormValidator(validationData, formProfile);
const placeFormValidation = new FormValidator(validationData, formPlace);

profileFormValidation.enableValidation();

placeFormValidation.enableValidation();

const profileFormPopup = new PopupWithForm(popupProfileSelector, (evt) => {
  evt.preventDefault();
  profileName.textContent = formInputName.value;
  profileInterest.textContent = formInputInterest.value;
  profileFormPopup.close();
});
profileFormPopup.setEventListeners();

const openPlaceForm = () => {
  placeFormValidation.reviewValidity();
  openPopup(popupTypePlace);
  formPlace.reset()
  placeFormValidation.toggleButtonState();
};

// const handleFormProfileSubmit = (evt) => {
//   evt.preventDefault();
//   profileName.textContent = formInputName.value;
//   profileInterest.textContent = formInputInterest.value;
//   profileFormPopup.close();
// };

const handleFormPlaceSubmit = (evt) => {
  evt.preventDefault();
  const cardData = {
    name: formInputDescription.value,
    link: formInputLink.value
  };
  prependNewCard(cardContainerSelector, createNewCard(cardData));
  closePopup(popupTypePlace);
};

const popupImg = new PopupWithImage(popupImgSelector);
popupImg.setEventListeners();

const createNewCard = (item) => {
  const card = new Card(item, '.card-template', popupImg.open);
  const cardElement = card.generateCard();
  return cardElement;
};

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, '.card-template', popupImg.open);
    const cardElement = card.generateCard();
    cardList.setItem(cardElement);
  }
}, cardContainerSelector);

cardList.renderItems();

const prependNewCard = (containerSelector, cardElement) => {
  const container = document.querySelector(containerSelector);
  container.prepend(cardElement);
};

profileEditBtn.addEventListener('click', () => {
  profileFormPopup.open()
});

placeAddBtn.addEventListener('click', openPlaceForm);

formPlace.addEventListener('submit', handleFormPlaceSubmit);
