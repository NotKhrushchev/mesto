/** Общий класс попап */

export class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._handleEscButton = this._handleEscButton.bind(this);
    }

    /** Закрытие попапа по Esc */
    _handleEscButton(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    /** Открытие попапа */
    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscButton);

    }

    /** Закрытие попапа */
    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscButton);
    }

    /** Обновление состояния кнопки сабмита */
    setSubmitBtnState(active) {
        active === true ? this._submitBtn.textContent = `${this._submitBtn.textContent}...` : this._submitBtn.textContent = this._submitBtn.textContent.replaceAll('.', '')
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
    }
}