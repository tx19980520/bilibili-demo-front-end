import {SEARCH_FETCH_FIALURE,SEARCH_FETCH_SUCESS,SEARCH_FETCH_START} from "./actionType.js";
export default (state={code:304,list:[]},action)=>{
    switch(action.type)
    {
        case SEARCH_FETCH_START:{
            return state;
        }
        case SEARCH_FETCH_SUCESS:{
            return {code:action.result.code,list: action.result.list}
        }
        case SEARCH_FETCH_FIALURE:{
            return {code:201,list:[]}
        }
        default:{
            return state;
        }
    }
}