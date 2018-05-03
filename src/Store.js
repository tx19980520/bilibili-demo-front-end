
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunkMiddleware from 'redux-thunk'
import {reducer as recommendReducer} from './recommendForm/'
import {reducer as indexReducer} from "./Index/";
import {reducer as onlineReducer} from "./online/";
import {reducer as specReducer} from "./specificAnime/";

const reducer = combineReducers({
    /*animes: animeReducer,
    page: pageReducer,*/
    recommend: recommendReducer,
    index: indexReducer,
    online: onlineReducer,
    specific: specReducer
});

const middlewares = [thunkMiddleware];


const storeEnhancers = compose(
    applyMiddleware(...middlewares)
);

export default createStore(reducer, {}, storeEnhancers);

