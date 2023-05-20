import "./pages/index.css";
import { 
  cardContainerSelector, 
  cardTemplateSelector, 
  formPlace, formProfile, 
  initialCards, 
  placeAddBtn, 
  popupImgSelector, 
  popupPlaceSelector, 
  popupProfileSelector, 
  profileEditBtn, 
  profileInterestSelector, 
  profileNameSelector, 
  validationData 
} from "./scripts/utils/constants.js";
import { Card } from "./scripts/components/Card.js";
import { FormValidator } from "./scripts/components/FormValidator.js";
import { Section } from "./scripts/components/Section.js";
import { PopupWithImage } from "./scripts/components/PopupWithImage.js";
import { PopupWithForm } from "./scripts/components/PopupWithForm.js";
import { UserInfo } from "./scripts/components/UserInfo.js";
import { Api } from "./scripts/components/Api";

/** Универсальная форма обращения к серверу */
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66',
  headers: {
    authorization: '7d1c3a82-a021-491f-b430-9bbe901628a4',
    'Content-Type': 'application/json'
  }
})

/** Загрузка данных профиля */
api.getProfileInfo()
  .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
  .then(res => profileInfo.setUserInfo(res));

/** Создание готовой карточки */
const createCard = (item) => {
  const card = new Card (
    item,
    cardTemplateSelector,
    popupImg.open
  );
  const cardElement = card.generateCard();
  return cardElement;
};

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
    cardList.setItem(
      createCard(placeFormPopup.getInputValues(), cardTemplateSelector, popupImg.open)
    );
    placeFormPopup.close()
  }
);
placeFormPopup.setEventListeners();

/** Отображение данных о пользователе */
const profileInfo = new UserInfo({
  nameSelector: profileNameSelector, 
  interestSelector: profileInterestSelector
});

/** Попап картинки */
const popupImg = new PopupWithImage(popupImgSelector);
popupImg.setEventListeners();

/** Отрисовка начальных карточек */
const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    cardList.setItem(
      createCard(item, cardTemplateSelector, popupImg.open)
    );
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