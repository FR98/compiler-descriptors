import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import App from './App';
import { configureStore } from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));

const { store } = configureStore();

root.render(
    <React.StrictMode>
        <Provider store={ store }>
            <App />
        </Provider>
    </React.StrictMode>
);
