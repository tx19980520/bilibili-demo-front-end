import {ANIME_FETCH_START, ANIME_FETCH_SUCCESS, ANIME_FETCH_FAILURE,GET_TOTAL_PAGE,GET_PAGE_SUCCESS,GET_PAGE_FAILURE} from './actionType.js';
import {SEARCH_WORD_FAILURE, SEARCH_WORD_START, SEARCH_WORD_SUCCESS} from "./actionType.js";
import {LOAD_CHANGE} from "./actionType.js";
export default (state = {step: ANIME_FETCH_START,page:-1, pageSearch:false, reload: false, animesList:[], searchList:[], animeCode:200, searchCode:200, allright:false, loadController:[]}, action) => {
    switch(action.type) {
        case ANIME_FETCH_SUCCESS: {
            let {loadController} = state;
            for (let i = 0; i < 20; ++i)
            {
                loadController[i] = 0;
            }
            return {...state, step:ANIME_FETCH_SUCCESS, reload:false, animesList:action.result.list, pageSearch:false, allright:false, loadController:loadController};
        }
        case ANIME_FETCH_FAILURE: {
            return {...state, step:ANIME_FETCH_FAILURE, animesList:[], animeCode:action.result.code, reload:true, pageSearch:false};
        }
        case GET_TOTAL_PAGE: {
            return {...state, pageSearch:false};
        }
        case GET_PAGE_SUCCESS: {
            return {...state, page:action.result.pages, pageSearch:false};
        }
        case GET_PAGE_FAILURE: {
            return {...state, page:-1, pageSearch:false};
        }
        case ANIME_FETCH_START: {
            return {...state, reload:true, pageSearch:false}
        }
        case LOAD_CHANGE:{
            let {loadController, allright} = state;
            loadController[action.pos] = 1;
            if (allright === true)
                return {...state,allright:allright, loadController:loadController};
            allright = true;
            for (let i = 0; i < 20; ++i)
            {
                if (loadController[i] === 0)
                {
                    allright = false;
                    break;
                }
            }
            return {...state, allright:allright, loadController:loadController}
        }
        /*about search */
        case SEARCH_WORD_START:{
            let loadController = [];
            for (let i = 0; i < 20; ++i)
            {
                loadController[i] = 0;
            }
            return {...state, searchCode:action.code, animesList:[], reload:true, pageSearch:true, allright:false, loadController:loadController};
        }
        case SEARCH_WORD_SUCCESS:{
            return {...state, page:action.result.totalPage, pageSearch:true, searchCode:action.code, searchList: action.result.searchList, animesList:action.result.animeList, reload:false}
        }
        case SEARCH_WORD_FAILURE:{
            return {...state, searchCode:201, searchList:[], animesList:[]}
        }
        default: {
            return state;
        }
    }
}