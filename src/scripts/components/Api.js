//** Запросы к серверу */
export class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl,
        this._headers = options.headers
    }

    /** Запрос на получение информации профиля */
    getProfileInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
        });
    }

    /** Запрос на изменение информации профиля */
    setProfileInfo(profileData) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: profileData.name,
                about: profileData.interest
            })
        })
    }

    /** Запрос на загрузку всех карточек */
    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers
        })
    }

    /** Запрос на публикацию карточки */
    postNewCard(cardData) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: cardData.name,
                link: cardData.link
            })
        })
    }

    /** Запрос на удаление карточки */
    removeCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers
        })
    }

    /** Запрос на установку лайка у карточки */
    setCardLike(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: this._headers
        })
    }

    /** Запрос на снятие лайка у карточки */
    removeCardLike(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: this._headers
        })
    }

    /** Запрос на изменение аватара */
    setAvatar(avatarLink) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: avatarLink
            })
        })
    }
}