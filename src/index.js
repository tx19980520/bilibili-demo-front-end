import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import './index.css';
import "./All.css";
import store from './Store.js'
import BilibiliRouter from "./BilibiliRouter.js";
ReactDOM.render(
    <Provider store={store}>
        <BilibiliRouter />
    </Provider>,
    document.getElementById('root')
);