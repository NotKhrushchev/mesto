const profileEditBtn = document.querySelector('.profile__edit-btn');
const profileName = document.querySelector('.profile__name');
const profileInterest = document.querySelector('.profile__interest');
const popupTypeProfile = document.querySelector('.popup_type_profile');
const popupTypePlace = document.querySelector('.popup_type_place');
const formName = document.querySelector('.form__input_type_name');
const formInterest = document.querySelector('.form__input_type_interest');
const formDesc = document.querySelector('.form__input_type_desc');
const formLink = document.querySelector('.form__input_type_link')
const popupTypeProfileCloseBtn = document.querySelector('.profile-close-btn');
const popupTypePlaceCloseBtn = document.querySelector('.place-close-btn');
const popupTypeImgCloseBtn = document.querySelector('.img-close-btn');
const formProfile = document.querySelector('.form_type_profile');
const formPlace = document.querySelector('.form_type_place');
const placeAddBtn = document.querySelector('.profile__add-btn');
const cardTemplate = document.querySelector('.card-template').content.querySelector('.card');
const popupTypeImg = document.querySelector('.popup_type_img');
const popupImg = document.querySelector('.popup__img');
const popupCaption = document.querySelector('.popup__caption');
const cardArea = document.querySelector('.cards');


const createCard = (data) => {
  const newCard = cardTemplate.cloneNode(true);
  const cardImg = newCard.querySelector('.card__img');
  const cardDesc = newCard.querySelector('.card__desc');
  const cardRemoveBtn = newCard.querySelector('.card__remove-btn');
  const cardLikeBtn = newCard.querySelector('.card__like-btn');
  cardImg.setAttribute('src', data.link);
  cardImg.setAttribute('alt', `Фотография места: ${data.name}`);
  cardDesc.textContent = data.name;
  
  cardLikeBtn.addEventListener('click', (evt) => {
    const currentLike = evt.target;
    currentLike.classList.toggle('card__like-btn_liked');
  });

  cardRemoveBtn.addEventListener('click', (evt) => {
    const currentCard = evt.target.closest('.card');
    currentCard.remove();
  });

  cardImg.addEventListener('click', () => {
    popupImg.setAttribute('src', data.link);
    popupImg.setAttribute('alt', `Фото места: ${data.name}`);
    popupCaption.textContent = data.name;
    openPopup(popupTypeImg);
    overlayClosePopup(popupTypeImg);
  });

  return newCard;
};

const renderCard = (data) => {
  const finishedCard = createCard(data);
  cardArea.prepend(finishedCard);
};

initialCards.forEach((data) => {
  renderCard(data);
});

const openPopup = (popupType) => {
  popupType.classList.add('popup_opened');
};

const closePopup = (popupType) => {
  popupType.classList.remove('popup_opened');
};

const overlayClosePopup = (popupType) => {
  popupType.addEventListener("click", (evt) => {
    if (evt.currentTarget === evt.target) {
      closePopup(popupType);
    }
  });
};

const editProfileForm = () => {
  reviewValidity(formProfile);
  formName.value = profileName.textContent;
  formInterest.value = profileInterest.textContent;
  openPopup(popupTypeProfile);
  reviewButtonState(formProfile);
  overlayClosePopup(popupTypeProfile);
};

const editPlaceForm = () => {
  reviewValidity(formPlace);
  openPopup(popupTypePlace);
  formDesc.value = '';
  formLink.value = '';
  reviewButtonState(formPlace);
  overlayClosePopup(popupTypePlace);
};

const handleFormProfileSubmit = (evt) => {
  evt.preventDefault();
  profileName.textContent = formName.value;
  profileInterest.textContent = formInterest.value;
  closePopup(popupTypeProfile);
};

const handleFormPlaceSubmit = (evt) => {
  evt.preventDefault();
  const cardData = {
    name: formDesc.value,
    link: formLink.value
  };
  renderCard(cardData);
  closePopup(popupTypePlace);
};

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