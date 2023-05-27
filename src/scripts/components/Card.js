/** Карточка */

export class Card {
    constructor (data, myId, templateSelector, openRemoveCardPopup, handleCardClick) {
        this._data = data;
        this._myId = myId;
        this._templateSelector = templateSelector;
        this._openRemoveCardPopup = openRemoveCardPopup;
        this._handleCardClick = handleCardClick;
    }

    /** Получение элемента карточки */
    _getCardElement() {
        this._cardElement = document.querySelector(this._templateSelector).content.querySelector('.card').cloneNode(true);

        return this._cardElement;
    }

    /** Лайк карточки */
    _handleLikeBtn() {
        this._newCardLikeBtn.classList.toggle('card__like-btn_liked');
    }

    /** Открытие попапа удаления карточки */
    _handleRemoveBtn() {
        this._openRemoveCardPopup(this, this._data._id);
    }

    /** Слушатели на элементы карточки */
    _setEventListeners() {
        this._newCardLikeBtn.addEventListener('click', () => {
            this._handleLikeBtn();
        });
        this._newCardRemoveBtn.addEventListener('click', () => {
            this._handleRemoveBtn();
        });
        this._newCardImg.addEventListener('click', () => {
            this._handleCardClick(this._data)
        });
    }

    /** Создание новой карточки */
    generateCard() {
        this._newCard = this._getCardElement();
        this._newCardImg = this._newCard.querySelector('.card__img');
        this._newCardDescription = this._newCard.querySelector('.card__desc');
        this._newCardLikeBtn = this._newCard.querySelector('.card__like-btn');
        this._newCardRemoveBtn = this._newCard.querySelector('.card__remove-btn');
        
        this._setEventListeners();

        this._newCardImg.src = this._data.link;
        this._newCardImg.alt = `Фотография места: ${this._data.name}`;
        this._newCardDescription.textContent = this._data.name;
        if(this._data.owner._id !== this._myId) {
            this._newCardRemoveBtn.remove()
        }
        
        return this._newCard;
    }

    /** Удалить карточку */
    removeCard() {
        this._cardElement.remove()
    }
}