import {SEARCH_FETCH_FIALURE,SEARCH_FETCH_START,SEARCH_FETCH_SUCESS} from "./actionType.js";
import {SEARCH_WORD_FAILURE,SEARCH_WORD_START} from "./actionType";
import {actions as animeActions} from "../anime/";
import {actions as pageActions} from "../page/";
let fetchAnimeSucess = animeActions.fetchAnimeSucess
let fetchPageSucess = pageActions.fetchPageSucess;
const searchInitStart=()=>(
            {
                type:SEARCH_FETCH_START
            });
const searchInitSucess=(result)=>(
    {
        type: SEARCH_FETCH_SUCESS,
        result
    });
const searchInitFailure=(err)=>(
    {
        type: SEARCH_FETCH_FIALURE,
        err
    });
export const searchInit=(word)=>{
    return (dispatch) => {
        const apiUrl = `/api/getSearchList?word=`+word;//这个地方我们改成了使用动态的后台取数据

        dispatch(searchInitStart());

        return fetch(apiUrl).then((response) => {
            response.json().then((responseJson) => {
                dispatch(searchInitSucess(responseJson));
            }).catch((error) => {
                dispatch(searchInitFailure(error));
            });
        }).catch((error) => {
            dispatch(searchInitFailure(error));
        })
    };
};
const searchWordStart=()=>({
    type:SEARCH_WORD_START
});
const searchWordFailure=(err)=>({
    type:SEARCH_WORD_FAILURE,
    err
});
let searchId = 0;
export const searchWord=(word)=>{
    return (dispatch)=>{
         let containerUrl = `/api/search?word=`+word;
         let pageUrl = `/api/getSearchPage?word=`+word;
         const seqId = ++ searchId;
         const dispatchIfValid=(action)=>{
             if(searchId === seqId)
             {
                 return dispatch(action);
             }
         };
        dispatchIfValid(searchWordStart());
        fetch(containerUrl).then((response)=>{
            response.json().then((responseJson)=>{
                dispatchIfValid(fetchAnimeSucess(responseJson))
            }).catch((err)=>{
                dispatchIfValid(searchWordFailure(err))
            });
        }).catch((err)=>{
            dispatchIfValid(searchWordFailure(err))
        });
        fetch(pageUrl).then((response)=>{
            response.json().then((responseJson)=>{
                dispatchIfValid(fetchPageSucess(responseJson))
            }).catch((err)=>{
                dispatchIfValid(searchWordFailure(err))
            });
        }).catch((err)=>{
            dispatchIfValid(searchWordFailure(err))
        });
    }
};