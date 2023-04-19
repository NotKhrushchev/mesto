export class Card {
    constructor (data, templateSelector, openPopupImg) {
        this._data = data;
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this._openPopupImg = openPopupImg;
    }

    _getCardElement () {
        this._cardElement = document.querySelector(this._templateSelector).content.querySelector('.card').cloneNode(true);

        return this._cardElement;
    }

    _handleLikeBtn () {
        this._newCard.querySelector('.card__like-btn').classList.toggle('card__like-btn_liked');
    }

    _handleRemoveBtn () {
        this._newCard.remove();
    }

    _handleOpenPopup () {
        this._openPopupImg(this._data)
    }

    _setEventListeners () {
        this._newCard.querySelector('.card__like-btn').addEventListener('click', () => {
            this._handleLikeBtn();
        });
        this._newCard.querySelector('.card__remove-btn').addEventListener('click', () => {
            this._handleRemoveBtn();
        });
        this._newCard.querySelector('.card__img').addEventListener('click', () => {
            this._handleOpenPopup()
        });
    }

    generateCard () {
        this._newCard = this._getCardElement();

        this._setEventListeners();

        this._newCard.querySelector('.card__img').setAttribute('src', this._link);
        this._newCard.querySelector('.card__img').setAttribute('alt', `Фотография места: ${this._name}`);
        this._newCard.querySelector('.card__desc').textContent = this._name;
        
        return this._newCard;
    }
}