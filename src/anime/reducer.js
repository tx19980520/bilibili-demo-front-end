import {ANIME_FETCH_START, ANIME_FETCH_SUCESS, ANIME_FETCH_FAILURE} from './actionType.js';
export default (state = {step: ANIME_FETCH_START}, action) => {
    switch(action.type) {
        case ANIME_FETCH_START: {
            return state;
        }
        case ANIME_FETCH_SUCESS: {
            return {...state, step:ANIME_FETCH_SUCESS, ...action.result};
        }
        case ANIME_FETCH_FAILURE: {
            return {step:ANIME_FETCH_FAILURE};
        }
        default: {
            return state;
        }
    }
}