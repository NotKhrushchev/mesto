/** Отрисовка элементов */

export class Section {
    constructor(renderer, containerSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    /** Установка элемента в контейнер */
    setItem(item) {
        this._container.prepend(item);
    }

    /** Отрисовка всех элементов */
    renderItems(items) {
        items.forEach(item => {
            this._renderer(item);
        });
    }
}