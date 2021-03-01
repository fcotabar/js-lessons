import View from './View.js';
import previewView from './previewView.js';

import icons from 'url:../../img/icons.svg';

class BookmarksView extends View {
    constructor() {
        super();

        this._parentElement = document.querySelector('.bookmarks__list');
        this._errorMsg = 'No bookmarks yet. Find a nice recipe and bookmark it ;)';
        // this._message = 'Success msg';
    }

    addHandlerRender(handler) {
        window.addEventListener('load', handler);
    }


    _generateMarkup() {
        // console.log(this._data);
        return this._data.map(bookmark => previewView.render(bookmark, false)).join('');
    }


}

export default new BookmarksView();