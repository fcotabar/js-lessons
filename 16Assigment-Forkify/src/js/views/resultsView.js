import View from './View.js';
import previewView from './previewView.js';

import icons from 'url:../../img/icons.svg';

class ResultsView extends View {
    constructor() {
        super();

        this._parentElement = document.querySelector('.results');
        this._errorMsg = 'No recipes found for your query! Please try again ;)';
        // this._message = 'Success msg';
    }

    _generateMarkup() {
        // console.log(this._data);
        return this._data.map(recipe => previewView.render(recipe, false)).join('');
    }


}

export default new ResultsView();