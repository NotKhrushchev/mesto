import "./pages/index.css";
import { 
  cardContainerSelector, 
  cardTemplateSelector, 
  formPlace, formProfile, 
  placeAddBtn, 
  popupImgSelector, 
  popupPlaceSelector, 
  popupProfileSelector, 
  profileEditBtn, 
  profileInterestSelector, 
  profileNameSelector,
  profileAvatarSelector,
  validationData,
  popupRemoveCardSelector
} from "./scripts/utils/constants.js";
import { Card } from "./scripts/components/Card.js";
import { FormValidator } from "./scripts/components/FormValidator.js";
import { Section } from "./scripts/components/Section.js";
import { PopupWithImage } from "./scripts/components/PopupWithImage.js";
import { PopupWithForm } from "./scripts/components/PopupWithForm.js";
import { UserInfo } from "./scripts/components/UserInfo.js";
import { Api } from "./scripts/components/Api";
import { PopupWithRemoveCardForm } from "./scripts/components/PopupWithRemoveCardForm";

/** Хранилище личного Id*/
let myId = ''

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
  .then(res => {
    profileInfo.setUserInfo(res)
    myId = res._id
  })
  .catch(err => console.log(err));

/** Создание готовой карточки */
const createCard = (item) => {
  const card = new Card (
    item,
    myId,
    cardTemplateSelector,
    removeCardPopup.open,
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
  () => {
    api.setProfileInfo(profileFormPopup.getInputValues())
      .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
      .then(res => 
        profileInfo.setUserInfo(res),
        profileFormPopup.close()
      )
      .catch(err => {
        console.log(err);
      })
      .finally(profileFormPopup.setSubmitBtnState(true))
  }
);
profileFormPopup.setEventListeners();

/** Форма добавления карточки */
const placeFormPopup = new PopupWithForm(
  popupPlaceSelector, 
  () => {
    api.postNewCard(placeFormPopup.getInputValues())
    .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
    .then(res => {
      cardList.setItem(
        createCard(res, cardTemplateSelector, popupImg.open)
      )
      placeFormPopup.close()
    }
    )
    .catch(err => {
      console.log(err);
    })
    .finally(placeFormPopup.setSubmitBtnState(true))
  }
);
placeFormPopup.setEventListeners();

const removeCardPopup = new PopupWithRemoveCardForm(
  popupRemoveCardSelector,
  (card) => {
    api.removeCard(card._data._id)
    .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
    .then(() => 
      card.removeCard(),
      removeCardPopup.close()
    )
    .catch(err => {
      console.log(err);
    })
    .finally(placeFormPopup.setSubmitBtnState(true))
  }
)

removeCardPopup.setEventListeners()

/** Инициализация данных пользователя */
const profileInfo = new UserInfo({
  nameSelector: profileNameSelector, 
  interestSelector: profileInterestSelector,
  avatarSelector: profileAvatarSelector
});

/** Попап картинки */
const popupImg = new PopupWithImage(popupImgSelector);
popupImg.setEventListeners();

/** Отрисовка начальных карточек */
const cardList = new Section(
  (item) => {
    cardList.setItem(
      createCard(item, cardTemplateSelector, popupImg.open)
    );
  },
  cardContainerSelector);
api.getInitialCards()
.then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
.then(res => cardList.renderItems(res.reverse()));

/** Слушатель на кнопку редактроования профиля */
profileEditBtn.addEventListener('click', () => {
  profileFormValidation.reviewValidity();
  profileFormPopup.setInputValues(profileInfo.getUserInfo());
  profileFormPopup.setSubmitBtnState(false)
  profileFormValidation.toggleButtonState();
  profileFormPopup.open();
});

/** Слушатель на кнопку добавления карточки */
placeAddBtn.addEventListener('click', () => {
  placeFormValidation.toggleButtonState();
  placeFormValidation.reviewValidity();
  placeFormPopup.setSubmitBtnState(false)
  placeFormPopup.open();
});