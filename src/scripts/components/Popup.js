/** Общий класс попап */

export class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
    }

    /** Закрытие попапа по Esc */
    _handleEscButton(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    /** Открытие попапа */
    open = () => {
        this._popup.classList.add('popup_opened');
    }

    /** Закрытие попапа */
    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', () => {
            this.close();
        });
    }

    /** Слушатель на элементы попапа */
    setEventListeners() {
        this._popup.addEventListener("click", (evt) => {
            if (evt.currentTarget === evt.target) {
              this.close();
            }
        });

        this._popup.querySelector('.popup__close-btn').addEventListener('click', () => {
            this.close();
        });

        document.addEventListener('keydown', (evt) => {
            this._handleEscButton(evt)
        });
    }
}