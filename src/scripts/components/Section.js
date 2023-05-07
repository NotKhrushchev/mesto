/** Отрисовка элементов */

export class Section {
    constructor({items, renderer}, containerSelector) {
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    /** Установка элемента в контейнер */
    setItem(item) {
        this._container.prepend(item);
    }

    /** Отрисовка всех элементов */
    renderItems() {
        this._items.forEach(item => {
            this._renderer(item);
        });
    }
}