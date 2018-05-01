import {ANIME_FETCH_START, ANIME_FETCH_SUCCESS, ANIME_FETCH_FAILURE,GET_TOTAL_PAGE,GET_PAGE_SUCCESS,GET_PAGE_FAILURE} from './actionType.js';
import {SEARCH_WORD_FAILURE, SEARCH_WORD_START, SEARCH_WORD_SUCCESS} from "./actionType.js";
import {LOAD_CHANGE} from "./actionType.js";
export default (state = {step: ANIME_FETCH_START,page:-1,pagesearch:false,reload: false,animeslist:[],searchlist:[],animecode:200,searchcode:200,allright:false,loadcontroller:[]}, action) => {
    switch(action.type) {
        case ANIME_FETCH_SUCCESS: {
            let {loadcontroller} = state;
            for (let i = 0; i < 20; ++i)
            {
                loadcontroller[i] = 0;
            }
            return {...state, step:ANIME_FETCH_SUCCESS,reload:false,animeslist:action.result.list,pagesearch:false,allright:false,loadcontroller:loadcontroller};
        }
        case ANIME_FETCH_FAILURE: {
            return {...state,step:ANIME_FETCH_FAILURE,animeslist:[],animecode:action.result.code,reload:true,pagesearch:false};
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
            return {...state,reload:true,pagesearch:false}
        }
        case LOAD_CHANGE:{
            let {loadcontroller,allright} = state;
            loadcontroller[action.pos] = 1;
            if(allright === true)
                return {...state,allright:allright,loadcontroller:loadcontroller};
            allright = true;
            for (let i = 0; i < 20; ++i)
            {
                if(loadcontroller[i] === 0)
                {
                    allright = false;
                    break;
                }
            }
            console.log("status:",allright);
            return {...state,allright:allright,loadcontroller:loadcontroller}
        }
        /*about search */
        case SEARCH_WORD_START:{
            console.log("search now");
            let loadcontroller = [];
            for (let i = 0; i < 20; ++i)
            {
                loadcontroller[i] = 0;
            }
            return {...state,searchcode:action.code,animeslist:[],reload:true,pagesearch:true,allright:false,loadcontroller:loadcontroller};
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