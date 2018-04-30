
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';

import thunkMiddleware from 'redux-thunk'
//import {reducer as animeReducer} from './anime/';
//import {reducer as pageReducer} from './page/';
import {reducer as indexReducer} from "./Index/";
import {reducer as onlineReducer} from "./online/";
import {reducer as specReducer} from "./specificAnime/";

const reducer = combineReducers({
    /*animes: animeReducer,
    page: pageReducer,*/
    index: indexReducer,
    online: onlineReducer,
    specific: specReducer
});

const middlewares = [thunkMiddleware];


const storeEnhancers = compose(
    applyMiddleware(...middlewares)
);

export default createStore(reducer, {}, storeEnhancers);

