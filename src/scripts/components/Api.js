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
        })
    }
}