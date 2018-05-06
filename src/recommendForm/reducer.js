import {RECOMMEND_START,RECOMMEND_FAILURE,RECOMMEND_SUCCESS} from './actionType.js'
import {FETCH_ANIMES_SUCCESS,FETCH_ANIMES_START,FETCH_ANIMES_FAILURE} from "./actionType"
export default (state={data:[], animeList:[], init:false, postover:true}, action) =>{
    switch(action.type)
    {
        case RECOMMEND_SUCCESS:{
            return {...state, type:action.type, data:action.data, postover:true}
        }
        case RECOMMEND_FAILURE:{
            return {...state, type:action.type, data:[], postover:true};
        }
        case RECOMMEND_START:{
            return {...state, type:action.type, data:[], postover:true};
        }
        case FETCH_ANIMES_FAILURE:{
            return {...state, type:action.type, init:false, animeList:[]}
        }
        case  FETCH_ANIMES_START:{
            return {...state, type:action.type, init:false, animeList:[]}
        }
        case FETCH_ANIMES_SUCCESS:{
            return {...state, type:action.type, init:true, animeList:action.data.searchlist}
        }
        default:{
            return state;
        }
    }
}