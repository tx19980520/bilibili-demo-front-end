import {RECOMMEND_START,RECOMMEND_FAILURE,RECOMMEND_SUCCESS} from './actionType.js'
import {FETCH_ANIMES_SUCCESS,FETCH_ANIMES_START,FETCH_ANIMES_FAILURE} from "./actionType.js"
import {POST_FEEDBACK_SUCCESS, POST_FEEDBACK_FAILURE, POST_FEEDBACK_START} from "./actionType.js"
import {IMG_LOAD} from "./actionType.js"
import {FEED_OPEN, FEED_CLOSE, SAVE_FIELD, FLUSH_DATA} from "./actionType";
export default (state = {imgLoad: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], feedOpen: false, postList: [], recommendList: [], code: 304, recommendFeedBack: {}, animeList: [], init: false, postover: true,postcode: 200}, action) =>{
    switch(action.type)
    {
        case RECOMMEND_SUCCESS:{
            let recommendFeedBack = {}
            action.recommendList.forEach(item => {
                recommendFeedBack[item.animeTitle] = 3.0
            })
            return {...state, postList:action.animeList, postcode:action.code, type:action.type, recommendFeedBack: recommendFeedBack,
                     recommendList: action.recommendList, postover: true}
        }
        case RECOMMEND_FAILURE:{
            return {...state, postList: [], postcode:400, type:action.type, recommendList:[], postover: true};
        }
        case RECOMMEND_START:{
            return {...state, allRight: false, imgLoad: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], recommendFeedBack: {}, type: action.type, recommendList: [], postover: false};
        }
        case FETCH_ANIMES_FAILURE:{
            return {...state, type: action.type, init: false, animeList: []}
        }
        case  FETCH_ANIMES_START:{
            return {...state, type: action.type, init: false, animeList: []}
        }
        case FETCH_ANIMES_SUCCESS:{
            return {...state, type: action.type, init: true, animeList: action.data.searchlist}
        }
		case IMG_LOAD:{
			let {imgLoad} = state
			imgLoad[action.pos] = 1;
			for(let i = 0, len = 10; i < len; ++i)
			{
				if(imgLoad === 0)
				{
					return {...state, imgLoad: imgLoad, allRight: false}
				}
			}
            return {...state, imgLoad: imgLoad, allRight: true}
		}
        case SAVE_FIELD:{
            let recommendFeedBack = state.recommendFeedBack
            recommendFeedBack[Object.keys(action.payload)[0]] = action.payload[Object.keys(action.payload)[0]].value;
            return {...state, recommendFeedBack: recommendFeedBack}
        }
        case POST_FEEDBACK_FAILURE:{
            return {...state, code: 404}
        }
        case POST_FEEDBACK_START:{
            return {...state, code: 304}
        }
        case POST_FEEDBACK_SUCCESS:{
            return {...state, code: 200, recommendFeedBack: {}}
        }
        case FEED_OPEN:{
            return {...state, feedOpen: true}
        }
        case FEED_CLOSE:{
            return {...state, feedOpen: false}
        }
        case FLUSH_DATA:{
            return {imgLoad: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], feedOpen: false, postList: [], recommendList: [], code: 304, recommendFeedBack: {}, animeList: [], init: false, postover: true,postcode: 200}
        }
        default:{
            return state;
        }
    }
}