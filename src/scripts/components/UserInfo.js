/** Отображение информации о пользователе */

export class UserInfo {
    constructor({nameSelector, interestSelector}) {
        this._name = document.querySelector(nameSelector);
        this._interest = document.querySelector(interestSelector);
    }

    /** Получение инофрмации о пользователе */
    getUserInfo() {
        this._profileInfo = {}
        this._profileInfo.name = this._name.textContent;
        this._profileInfo.interest = this._interest.textContent;
        return this._profileInfo;
    }

    /** Возвращение информации о пользователе */
    setUserInfo(profileData) {
        this._name.textContent = profileData.name;
        this._interest.textContent = profileData.interest;
    }
}