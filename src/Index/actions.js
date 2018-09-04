import { ANIME_FETCH_FAILURE, ANIME_FETCH_START, ANIME_FETCH_SUCCESS } from "./actionType";// anime
import { GET_TOTAL_PAGE, GET_PAGE_SUCCESS, GET_PAGE_FAILURE } from "./actionType.js";//page
import { SEARCH_WORD_FAILURE, SEARCH_WORD_START, SEARCH_WORD_SUCCESS } from "./actionType.js";
import { LOAD_CHANGE } from "./actionType.js";
/*ajax*/
export const picLoadDone = (pos) => ({
    type:LOAD_CHANGE,
    pos:pos
});
let ajaxId = 0;
const dispatchIfValid = (action, dispatch, seqId) => {
    if(ajaxId === seqId)
    {
        return dispatch(action);
    }
};
//search
 const fetchAnimeStart = () => ({
    type:ANIME_FETCH_START
});
 const fetchAnimeSucess = (result) => ({
    type:ANIME_FETCH_SUCCESS,
    result
});
 const  fetchAnimeFailure = (error) => ({
    type:ANIME_FETCH_FAILURE,
    error
});

export const fetchAnime = () => {
    return (dispatch) => {
        const apiUrl = `/api/getAnime`;
        let getId = ++ ajaxId;
        dispatchIfValid(fetchAnimeStart(),dispatch,getId);

        return fetch(apiUrl).then((response) => {
            if (response.status !== 200 && response.status !== 304) {
                throw new Error('Fail to get response with status ' + response.status);
            }

            response.json().then((responseJson) => {
                dispatchIfValid(fetchAnimeSucess(responseJson),dispatch,getId);
            }).catch((error) => {
                dispatchIfValid(fetchAnimeFailure(error),dispatch,getId);
            });
        }).catch((error) => {
            dispatchIfValid(fetchAnimeFailure(error),dispatch,getId);
        })
    };
};
export const fetchAnimebyPage = (page) => {
    return (dispatch) => {
        const apiUrl = `/api/getAnime?page=${page}`;
        let pageId = ++ ajaxId;
        dispatchIfValid(fetchAnimeStart(),dispatch,pageId);

        return fetch(apiUrl).then((response) => {
            if (response.status !== 200 && response.status !== 304) {
                throw new Error('Fail to get response with status ' + response.status);
            }

            response.json().then((responseJson) => {
                dispatchIfValid(fetchAnimeSucess(responseJson),dispatch,pageId);
            }).catch((error) => {
                dispatchIfValid(fetchAnimeFailure(error),dispatch,pageId);
            });
        }).catch((error) => {
            dispatchIfValid(fetchAnimeFailure(error),dispatch,pageId);
        });
    };
};




const  fetchPageStart =()=>({
        type: GET_TOTAL_PAGE
    }
);
export const fetchPageSucess =(result)=>({
        type: GET_PAGE_SUCCESS,
        result
    }
);
const fetchPageFailure =(error)=>({
        type:GET_PAGE_FAILURE,
        error
    }
);
export const fetchPage=()=>{
    return (dispatch) => {
        const apiUrl = `/api/getPage`;

        dispatch(fetchPageStart());

        return fetch(apiUrl).then((response) => {
            if (response.status !== 200 && response.status !== 304) {
                throw new Error('Fail to get response with status ' + response.status);
            }

            response.json().then((responseJson) => {
                dispatch(fetchPageSucess(responseJson));
            }).catch((error) => {
                dispatch(fetchPageFailure(error));
            });
        }).catch((error) => {
            dispatch(fetchPageFailure(error));
        })
    };
};

/**/
const searchInitStart=()=>(
    {
        type:SEARCH_WORD_START
    });
const searchInitSucess=(result)=>(
    {
        type: SEARCH_WORD_SUCCESS,
        result
    });
const searchInitFailure=(err)=>(
    {
        type: SEARCH_WORD_FAILURE,
        err
    });
export const searchInit=(word)=>{
    return (dispatch) => {
        const apiUrl = `/api/getSearchList?word=${word}`;//这个地方我们改成了使用动态的后台取数据
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
const searchWordSuccess=(result)=>({
    type:SEARCH_WORD_SUCCESS,
    result
});
export const searchWord=(word,page=1)=>{
    return (dispatch)=>{
        let containerUrl = `/api/getSearchList?word=${word}&page=${page}`;
        const seqId = ++ ajaxId;

        dispatchIfValid(searchWordStart(),dispatch,seqId);
        fetch(containerUrl).then((response)=>{
            response.json().then((responseJson)=>{
                dispatchIfValid(searchWordSuccess(responseJson),dispatch,seqId)
            }).catch((err)=>{
                dispatchIfValid(searchWordFailure(err),dispatch,seqId)
            });
        }).catch((err)=>{
            dispatchIfValid(searchWordFailure(err),dispatch,seqId)
        });
    }
};