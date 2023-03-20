const profileEditBtn = document.querySelector('.profile__edit-btn');
const profileName = document.querySelector('.profile__name');
const profileInterest = document.querySelector('.profile__interest');
const popupProfile = document.querySelector('.popup_type_profile');
const popupPlace = document.querySelector('.popup_type_place');
const formName = document.querySelector('.form__input_type_name');
const formInterest = document.querySelector('.form__input_type_interest');
const formDesc = document.querySelector('.form__input_type_desc');
const formLink = document.querySelector('.form__input_type_link')
const popupProfileCloseBtn = document.querySelector('.popup_type_profile__close-btn');
const popupPlaceCloseBtn = document.querySelector('.popup_type_place__close-btn');
const popupImgCloseBtn = document.querySelector('.popup_type_img__close-btn');
const formProfile = document.querySelector('.form_type_profile');
const formPlace = document.querySelector('.form_type_place');
const placeAddBtn = document.querySelector('.profile__add-btn');
const initialCards = [
    {
      name: 'Коми',                                                                                                                  
      link: 'https://images.unsplash.com/photo-1675544952106-a834ffd24c0e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80'
    },
        {
      name: 'Петропавловск-Камчатский',
      link: 'https://images.unsplash.com/photo-1615971533465-af32184646e5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=685&q=80'
    },
    {
      name: 'Сочи',
      link: 'https://images.unsplash.com/photo-1549092156-04ee20673b6e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80'
    },
    {
      name: 'Краснодар',
      link: 'https://images.unsplash.com/photo-1589232908988-6092a0aecf38?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80'
    },
    {
      name: 'Ингушетия',
      link: 'https://images.unsplash.com/photo-1653629154315-f05e1c1abbc6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
    },
    {
      name: 'Эльбрус, Кавказ',
      link: 'https://images.unsplash.com/photo-1521311587563-6a3fb9fbaff7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
    }
  ];

const createCard = (data) => {
  const newCard = document.querySelector('.card-template').content.querySelector('.card').cloneNode(true);
  const cardImg = newCard.querySelector('.card__img');
  const cardDesc = newCard.querySelector('.card__desc');
  const cardArea = document.querySelector('.cards');
  const cardRemoveBtn = newCard.querySelector('.card__remove-btn');
  const cardLikeBtn = newCard.querySelector('.card__like-btn');
  cardImg.setAttribute('src', data.link);
  cardImg.setAttribute('alt', 'Фотография места: ' + data.name)
  cardDesc.textContent = data.name;
  
  cardLikeBtn.addEventListener('click', (evt) => {
    const currentLike = evt.target;
    currentLike.classList.toggle('card__like-btn_liked');
  });

  cardRemoveBtn.addEventListener('click', (evt) => {
    const currentCard = evt.target.closest('.card');
    currentCard.remove();
  });

  cardImg.addEventListener('click', (evt) => {
    const currentImg = evt.target;
    const currentCard = evt.target.closest('.card');
    const currentCardCaption = currentCard.querySelector('.card__desc')
    const popupImg = document.querySelector('.popup_type_img');
    const cardImg = document.querySelector('.popup__img');
    const cardCaption = document.querySelector('.popup__caption');
    cardImg.setAttribute('src', currentImg.src);
    cardImg.setAttribute('alt', currentImg.alt)
    cardCaption.textContent = currentCardCaption.textContent;
    popupImg.classList.add('popup_opened');
    popupImgCloseBtn.addEventListener('click', () => {
      popupImg.classList.remove('popup_opened');
    });
  });

  cardArea.prepend(newCard);
};

initialCards.forEach((data) => {
  createCard(data);
});

const openProfilePopup = () => {
  popupProfile.classList.add('popup_opened');
};

const closeProfilePopup = () => {
  popupProfile.classList.remove('popup_opened');
};

const openPlacePopup = () => {
  popupPlace.classList.add('popup_opened');
};

const closePlacePopup = () => {
  popupPlace.classList.remove('popup_opened');
};

const editProfileForm = () => {
  openProfilePopup();
  formName.value = profileName.textContent;
  formInterest.value = profileInterest.textContent;
};

const handleFormProfileSubmit = (evt) => {
  evt.preventDefault();
  profileName.textContent = formName.value;
  profileInterest.textContent = formInterest.value;
  closeProfilePopup();
};

const editPlace = () => {
  openPlacePopup();
  formDesc.value = '';
  formLink.value = '';
};

const handleFormPlaceSubmit = (evt) => {
  evt.preventDefault();
  const cardData = {
    name: formDesc.value,
    link: formLink.value
  };
  createCard(cardData);
  closePlacePopup();
};

profileEditBtn.addEventListener('click', editProfileForm);

popupProfileCloseBtn.addEventListener('click', closeProfilePopup);

popupPlaceCloseBtn.addEventListener('click', closePlacePopup);

formProfile.addEventListener('submit', handleFormProfileSubmit);

placeAddBtn.addEventListener('click', editPlace);

formPlace.addEventListener('submit', handleFormPlaceSubmit);