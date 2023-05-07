/** Карточка */

export class Card {
    constructor (data, templateSelector, openPopupImg) {
        this._data = data;
        this._templateSelector = templateSelector;
        this._openPopupImg = openPopupImg;
    }

    /** Получение элемента карточки */
    _getCardElement() {
        this._cardElement = document.querySelector(this._templateSelector).content.querySelector('.card').cloneNode(true);

        return this._cardElement;
    }

    /** Лайк карточки */
    _handleLikeBtn() {
        this._newCard.querySelector('.card__like-btn').classList.toggle('card__like-btn_liked');
    }

    /** Удаление карточки */
    _handleRemoveBtn() {
        this._newCard.remove();
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
            this._openPopupImg(this._data)
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

        this._newCardImg.setAttribute('src', this._data.link);
        this._newCardImg.setAttribute('alt', `Фотография места: ${this._data.name}`);
        this._newCardDescription.textContent = this._data.name;
        
        return this._newCard;
    }
}