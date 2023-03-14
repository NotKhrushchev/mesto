const profileEditBtn = document.querySelector('.profile__edit-btn');
const profileName = document.querySelector('.profile__name');
const profileInterest = document.querySelector('.profile__interest');
const popup = document.querySelector('.popup');
const popupName = document.querySelector('.popup__input_type_name');
const popupInterest = document.querySelector('.popup__input_type_interest');
const popupCloseBtn = document.querySelector('.popup__close-btn');
const formElement = document.querySelector('.form');
const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

const createCard = (data) => {
    const newCard = document.querySelector('.card-template').content.querySelector('.card').cloneNode(true);
    const cardImg = newCard.querySelector('.card__img');
    const cardDesc = newCard.querySelector('.card__desc');
    cardImg.setAttribute('src', data.link);
    cardDesc.textContent = data.name;
    return newCard;
};

initialCards.forEach((data) => {
    const card = createCard(data);
    const cardArrea = document.querySelector('.cards');
    cardArrea.append(card);
});

const openPopup = () => {
    popup.classList.add('popup_opened');
};

const closePopup = () => {
    popup.classList.remove('popup_opened');
};

const editForm = () => {
    openPopup();
    popupName.value = profileName.textContent;
    popupInterest.value = profileInterest.textContent;
};

const handleFormSubmit = (evt) => {
    evt.preventDefault();
    profileName.textContent = popupName.value;
    profileInterest.textContent = popupInterest.value;
    closePopup();
};

profileEditBtn.addEventListener('click', editForm);

popupCloseBtn.addEventListener('click', closePopup);

formElement.addEventListener('submit', handleFormSubmit);