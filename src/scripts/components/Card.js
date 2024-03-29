/** Карточка */

export class Card {
    constructor (data, myId, templateSelector, openRemoveCardPopup, handleCardClick, handleLikeClick) {
        this._data = data;
        this._myId = myId;
        this._templateSelector = templateSelector;
        this._openRemoveCardPopup = openRemoveCardPopup;
        this._handleCardClick = handleCardClick;
        this._handleLikeClick = handleLikeClick;
    }

    /** Получение элемента карточки */
    _getCardElement() {
        this._cardElement = document.querySelector(this._templateSelector).content.querySelector('.card').cloneNode(true);

        return this._cardElement;
    }

    /** Лайк карточки */
    _handleLikeBtn() {
        this._handleLikeClick(this._data._id);
    }

    /** Фиксация количества лайков */
    _likeCounter() { 
        console.log(this._myId)
        this._counter = this._cardElement.querySelector('.card__like-counter')
        if (this._data.likes.some(like => like._id === this._myId)){
            this._newCardLikeBtn.classList.add('card__like-btn_liked')
        }
        this._counter.textContent = this._data.likes.length
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
        
        this._likeCounter()
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

    /** Контроль состояния счетчика лайков */
    toggleLikeBtn(likes) {
        this._newCardLikeBtn.classList.toggle('card__like-btn_liked');
        this._counter.textContent = likes.length
    }

    /** Проверка нажатия на лайк */
    checkLikeStatus() {
        if (!this._newCardLikeBtn.classList.contains('card__like-btn_liked')) {
            return true
        } else {
            return false
        }
    }
}