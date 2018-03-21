import {SEARCH_FETCH_FIALURE,SEARCH_FETCH_START,SEARCH_FETCH_SUCESS} from "./actionType.js";
import {SEARCH_WORD_FAILURE,SEARCH_WORD_START} from "./actionType";
import {actions} from "../anime/";
let fetchAnimeSucess = actions.fetchAnimeSucess

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
export const searchInit=()=>{
    return (dispatch) => {
        const apiUrl = `/getSearchList`;

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
         let apiURL = `/search?word=`+word;
         const seqId = ++ searchId;
         const dispatchIfValid=(action)=>{
             if(searchId === seqId)
             {
                 return dispatch(action);
             }
         };
        dispatchIfValid(searchWordStart());
        fetch(apiURL).then((response)=>{
            response.json().then((responseJson)=>{
                dispatchIfValid(fetchAnimeSucess(responseJson))
            }).catch((err)=>{
                dispatchIfValid(searchWordFailure(err))
            });
        }).catch((err)=>{
            dispatchIfValid(searchWordFailure(err))
        });
    }
};