
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';

import thunkMiddleware from 'redux-thunk'
import {reducer as animeReducer} from './anime/';
import {reducer as pageReducer} from './page/';
import {reducer as onlineReducer} from "./online/";
import {reducer as searchReducer} from "./search/";

const reducer = combineReducers({
    animes: animeReducer,
    page: pageReducer,
    online: onlineReducer,
    search: searchReducer
});

const middlewares = [thunkMiddleware];


const storeEnhancers = compose(
    applyMiddleware(...middlewares)
);

export default createStore(reducer, {}, storeEnhancers);

