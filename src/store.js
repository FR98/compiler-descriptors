import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducer from './reducers';

export const configureStore = () => {

    const store = composeWithDevTools()(createStore)(reducer);

    return { store };
}