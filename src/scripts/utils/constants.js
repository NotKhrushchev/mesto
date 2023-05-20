export const initialCards = [
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
]

export const validationData = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save-btn',
  inactiveButtonClass: 'form__save-btn_disabled',
  inputErrorClass: 'form__input_type_error',
}

export const profileEditBtn = document.querySelector('.profile__edit-btn');
export const placeAddBtn = document.querySelector('.profile__add-btn');
export const formPlace = document.querySelector('.form_type_place');
export const formProfile = document.querySelector('.form_type_profile');
export const cardContainerSelector = '.cards';
export const popupProfileSelector = '.popup_type_profile';
export const popupImgSelector = '.popup_type_img';
export const popupPlaceSelector = '.popup_type_place';
export const cardTemplateSelector = '.card-template';
export const profileNameSelector = '.profile__name';
export const profileInterestSelector = '.profile__interest';
export const profileAvatarSelector = '.profile__avatar'