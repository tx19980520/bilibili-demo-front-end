import {GET_TOTAL_PAGE,GET_PAGE_SUCESS,GET_PAGE_FAILURE} from "./actionType.js";
const  fetchPageStart =()=>({
        type: GET_TOTAL_PAGE
    }
);
const fetchPageSucess =(result)=>({
        type: GET_PAGE_SUCESS,
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
        const apiUrl = `/getPage`;

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
}