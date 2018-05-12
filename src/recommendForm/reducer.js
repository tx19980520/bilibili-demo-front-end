import {RECOMMEND_START,RECOMMEND_FAILURE,RECOMMEND_SUCCESS} from './actionType.js'
import {FETCH_ANIMES_SUCCESS,FETCH_ANIMES_START,FETCH_ANIMES_FAILURE} from "./actionType.js"
import {IMG_LOAD} from "./actionType.js"
export default (state={imgLoad:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], recommendList:[], animeList:[], init:false, postover:true,postcode:200}, action) =>{
    switch(action.type)
    {
        case RECOMMEND_SUCCESS:{
            return {...state, postcode:action.recommendlist.code, type:action.type, recommendList:action.recommendlist.animelist, postover:true}
        }
        case RECOMMEND_FAILURE:{
            return {...state, postcode:400, type:action.type, recommendList:[], postover:true};
        }
        case RECOMMEND_START:{
            return {...state, allRight:false, imgLoad:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], type:action.type, recommendList:[], postover:false};
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
		case IMG_LOAD:{
			let {imgLoad} = state
			imgLoad[action.pos] = 1;
			for(let i = 0, len = 10; i < len; ++i)
			{
				if(imgLoad == 0)
				{
					return {...state, imgLoad:imgLoad, allRight:false}
				}
			}
            return {...state, imgLoad:imgLoad, allRight:true}
		}
        default:{
            return state;
        }
    }
}