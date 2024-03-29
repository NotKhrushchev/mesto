import "./index.css";
import { 
  cardContainerSelector, 
  cardTemplateSelector, 
  formPlace, formProfile, 
  placeAddBtn, 
  popupImgSelector, 
  popupPlaceSelector, 
  popupProfileSelector, 
  profileEditBtn,
  setAvatarBtn,
  profileInterestSelector, 
  profileNameSelector,
  profileAvatarSelector,
  validationData,
  popupRemoveCardSelector,
  popupSetAvatarSelector,
  formSetAvatar
} from "../scripts/utils/constants.js";
import { Card } from "../scripts/components/Card.js";
import { FormValidator } from "../scripts/components/FormValidator.js";
import { Section } from "../scripts/components/Section.js";
import { PopupWithImage } from "../scripts/components/PopupWithImage.js";
import { PopupWithForm } from "../scripts/components/PopupWithForm.js";
import { UserInfo } from "../scripts/components/UserInfo.js";
import { Api } from "../scripts/components/Api";
import { PopupWithConfirmation } from "../scripts/components/PopupWithConfirmation";

/** Универсальная форма обращения к серверу */
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66',
  headers: {
    authorization: '7d1c3a82-a021-491f-b430-9bbe901628a4',
    'Content-Type': 'application/json'
  }
})

/** Хранилище личного Id*/
let myId

/** Создание готовой карточки */
const createCard = (item) => {
  const card = new Card (
    item,
    myId,
    cardTemplateSelector,
    removeCardPopup.open,
    popupImg.open,
    (cardId) => {
      if (card.checkLikeStatus()) {
        api.setCardLike(cardId)
        .then(res => {
          card.toggleLikeBtn(res.likes);
        })
        .catch(err => console.log(err));
      } else {
        api.removeCardLike(cardId)
        .then(res => {
          card.toggleLikeBtn(res.likes);
        })
        .catch(err => console.log(err));
      }
    }
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

/** Валидация формы обновления аватара */
const setAvatarFormValidation = new FormValidator(validationData, formSetAvatar);
setAvatarFormValidation.enableValidation();

/** Форма редактирования профиля */
const profileFormPopup = new PopupWithForm(
  popupProfileSelector,
  () => {
    profileFormPopup.setSubmitBtnState(true)
    api.setProfileInfo(profileFormPopup.getInputValues())
      .then(res => {
        profileInfo.setUserInfo(res)
        profileFormPopup.close()
      }
      )
      .catch(err => {
        console.log(err);
      })
      .finally(() => profileFormPopup.setSubmitBtnState(false))
  }
);
profileFormPopup.setEventListeners();

/** Форма добавления карточки */
const placeFormPopup = new PopupWithForm(
  popupPlaceSelector, 
  () => {
    placeFormPopup.setSubmitBtnState(true)
    api.postNewCard(placeFormPopup.getInputValues())
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
    .finally(() => placeFormPopup.setSubmitBtnState(false))
  }
);
placeFormPopup.setEventListeners();

/** Попап удаления карточки */
const removeCardPopup = new PopupWithConfirmation(
  popupRemoveCardSelector,
  (card, cardId) => {
    removeCardPopup.setSubmitBtnState(true)
    api.removeCard(cardId)
    .then(() => 
      card.removeCard(),
      removeCardPopup.close()
    )
    .catch(err => {
      console.log(err);
    })
    .finally(() => removeCardPopup.setSubmitBtnState(false))
  }
)
removeCardPopup.setEventListeners();

/** Попап изменения аватара */
const setAvatarPopup = new PopupWithForm(
  popupSetAvatarSelector,
  () => {
    setAvatarPopup.setSubmitBtnState(true)
    api.setAvatar(setAvatarPopup.getInputValues().link)
    .then(res => {
      profileInfo.setUserInfo(res)
      setAvatarPopup.close()
    }
    )
    .catch(err => {
      console.log(err);
    })
    .finally(() => setAvatarPopup.setSubmitBtnState(false))
  }
)
setAvatarPopup.setEventListeners()

/** Инициализация данных пользователя */
const profileInfo = new UserInfo({
  nameSelector: profileNameSelector, 
  interestSelector: profileInterestSelector,
  avatarSelector: profileAvatarSelector
});

/** Попап картинки */
const popupImg = new PopupWithImage(popupImgSelector);
popupImg.setEventListeners();

/** Отрисовка карточек */
const cardList = new Section(
  (item) => {
    cardList.setItem(
      createCard(item, cardTemplateSelector, popupImg.open)
    );
  },
  cardContainerSelector);

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

/** Слушатель на кнопку изменения аватара профиля */
setAvatarBtn.addEventListener('click', () => {
  setAvatarFormValidation.toggleButtonState();
  setAvatarFormValidation.reviewValidity();
  setAvatarPopup.open();
}) 

/** Получение карточек и данных пользователя */
Promise.all([api.getProfileInfo(), api.getInitialCards()])
.then(([info, initialCards]) => {
  profileInfo.setUserInfo(info)
  myId = info._id
  cardList.renderItems(initialCards.reverse())
})
.catch((err)=>{
  console.log(err);
})