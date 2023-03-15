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
      name: 'Эльбрус, Кавказ',
      link: 'https://images.unsplash.com/photo-1521311587563-6a3fb9fbaff7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
    },
    {
      name: 'Ингушетия',
      link: 'https://images.unsplash.com/photo-1653629154315-f05e1c1abbc6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
    },
    {
      name: 'Краснодар',
      link: 'https://images.unsplash.com/photo-1589232908988-6092a0aecf38?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80'
    },
    {
      name: 'Сочи',
      link: 'https://images.unsplash.com/photo-1549092156-04ee20673b6e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80'
    },
    {
      name: 'Петропавловск-Камчатский',
      link: 'https://images.unsplash.com/photo-1615971533465-af32184646e5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=685&q=80'
    },
    {
      name: 'Коми',                                                                                                                  
      link: 'https://images.unsplash.com/photo-1675544952106-a834ffd24c0e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80'
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