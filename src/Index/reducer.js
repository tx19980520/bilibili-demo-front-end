import {ANIME_FETCH_START, ANIME_FETCH_SUCCESS, ANIME_FETCH_FAILURE,GET_TOTAL_PAGE,GET_PAGE_SUCCESS,GET_PAGE_FAILURE} from './actionType.js';
import {SEARCH_WORD_FAILURE, SEARCH_WORD_START, SEARCH_WORD_SUCCESS} from "../search/actionType";
export default (state = {step: ANIME_FETCH_START,page:-1,pagesearch:false,reload: false,animeslist:[],searchlist:[],animecode:200,searchcode:200}, action) => {
    switch(action.type) {
        case ANIME_FETCH_SUCCESS: {
            return {...state, step:ANIME_FETCH_SUCCESS,reload:false,animeslist:action.result.list,pagesearch:false};
        }
        case ANIME_FETCH_FAILURE: {
            return {...state,step:ANIME_FETCH_FAILURE,animeslist:[],animecode:action.result.code,pagesearch:false};
        }
        case GET_TOTAL_PAGE: {
            return {...state,pagesearch:false};
        }
        case GET_PAGE_SUCCESS: {
            return {...state,page:action.result.pages,pagesearch:false};
        }
        case GET_PAGE_FAILURE: {
            return {...state, page:-1,pagesearch:false};
        }
        case ANIME_FETCH_START: {
            return {...state,reload:true}
        }
        /*about search */
        case SEARCH_WORD_START:{
            console.log("search now");
            return {...state,searchcode:action.code,animeslist:[],reload:true,pagesearch:true};
        }
        case SEARCH_WORD_SUCCESS:{
            console.log("success",action.result);
            return {...state,page:action.result.totalPage,pagesearch:true,searchcode:action.code,searchlist: action.result.searchList,animeslist:action.result.animeList,reload:false}
        }
        case SEARCH_WORD_FAILURE:{
            return {...state,searchcode:201,searchlist:[],animeslist:[]}
        }
        default: {
            return state;
        }
    }
}