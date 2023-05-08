import { cardContainerSelector, cardTemplateSelector, formPlace, formProfile, initialCards, placeAddBtn, popupImgSelector, popupPlaceSelector, popupProfileSelector, profileEditBtn, profileInterestSelector, profileNameSelector, validationData } from "./scripts/utils/constants.js";
import { Card } from "./scripts/components/Card.js";
import { FormValidator } from "./scripts/components/FormValidator.js";
import { Section } from "./scripts/components/Section.js";
import { PopupWithImage } from "./scripts/components/PopupWithImage.js";
import { PopupWithForm } from "./scripts/components/PopupWithForm.js";
import { UserInfo } from "./scripts/components/UserInfo.js";

/** Вадидация формы редактирования профиля */
const profileFormValidation = new FormValidator(validationData, formProfile);
profileFormValidation.enableValidation();

/** Вадидация формы создания карточки */
const placeFormValidation = new FormValidator(validationData, formPlace);
placeFormValidation.enableValidation();

/** Форма редактирования профиля */
const profileFormPopup = new PopupWithForm(
  popupProfileSelector, 
  (evt) => {
  evt.preventDefault();
  profileInfo.setUserInfo(profileFormPopup.getInputValues())
  profileFormPopup.close();
  }
);
profileFormPopup.setEventListeners();

/** Форма добавления карточки */
const placeFormPopup = new PopupWithForm(
  popupPlaceSelector, 
  (evt) => {
    evt.preventDefault();
    const card = new Card(placeFormPopup.getInputValues(), cardTemplateSelector, popupImg.open);
    const cardElement = card.generateCard();
    cardList.setItem(cardElement);
    placeFormPopup.close()
  }
);
placeFormPopup.setEventListeners();

/** Отображение данных о пользователе */
const profileInfo = new UserInfo({nameSelector: profileNameSelector, interestSelector: profileInterestSelector});

/** Попап картинки */
const popupImg = new PopupWithImage(popupImgSelector);
popupImg.setEventListeners();

/** Отрисовка начальных карточек */
const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, cardTemplateSelector, popupImg.open);
    const cardElement = card.generateCard();
    cardList.setItem(cardElement);
  }
}, cardContainerSelector);
cardList.renderItems();

/** Слушатель на кнопку редактроования профиля */
profileEditBtn.addEventListener('click', () => {
  profileFormValidation.reviewValidity();
  profileFormPopup.setInputValues(profileInfo.getUserInfo());
  profileFormValidation.toggleButtonState();
  profileFormPopup.open();
});

/** Слушатель на кнопку добавления карточки */
placeAddBtn.addEventListener('click', () => {
  placeFormValidation.toggleButtonState();
  placeFormValidation.reviewValidity();
  placeFormPopup.open();
});