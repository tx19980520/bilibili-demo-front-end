import {FETCH_FEEDBACK_START, FETCH_FEEDBACK_SUCCESS, FETCH_FEEDBACK_FAILURE} from "./actionType.js"
import {DELETE_FEEDBACK_START, DELETE_FEEDBACK_SUCCESS, DELETE_FEEDBACK_FAILURE} from "./actionType.js"
import {MERGE_FEEDBACK_START, MERGE_FEEDBACK_SUCCESS, MERGE_FEEDBACK_FAILURE} from "./actionType.js"
const fetchFeedbackStart = () => ({
	type: FETCH_FEEDBACK_START
})
const fetchFeedbackSuccess = (result) => ({
	type: FETCH_FEEDBACK_SUCCESS,
	data: result
})
const fetchFeedbackFailure = (err) => ({
	type: FETCH_FEEDBACK_FAILURE,
	err
})

export const fetFeedback = () => {
    return (dispatch) => {
        const apiUrl = `/api/getSearchList?word=`; // 这里没改
        dispatch(fetchFeedbackStart())
        return fetch(apiUrl).then((response) => {
            response.json().then((responseJson) => {
                dispatch(fetchFeedbackSuccess(responseJson));
            }).catch((error) => {
                dispatch(fetchFeedbackFailure(error));
            });
        }).catch((error) => {
            dispatch(fetchFeedbackFailure(error));
        })
    };
}


// delete
const deleteFeedbackStart = () => ({
	type: DELETE_FEEDBACK_START
})

const deleteFeedbackFailure = (err) => ({
	type: DELETE_FEEDBACK_FAILURE,
	err
})

const deleteFeedbackSuccess = (result) => ({
	type: DELETE_FEEDBACK_SUCCESS,
	msg:result
})


export const deleteFeedback = (selected) => {
    return (dispatch) => {
        const apiUrl = `/api/getSearchList?word`; // 这里没改
        dispatch(deleteFeedbackStart());
        let data = {"deletelist":selected};
        dispatch(deleteFeedbackStart());
        let options={
            mode: 'cors',
            method:"POST",
            headers:{
                'Accept':"application/json",
                'Content-Type': 'application/json;charset=utf-8',
            },
            body:JSON.stringify(data),
        }
        return fetch(apiUrl,options).then((response) => {
            response.json().then((responseJson) => {
                dispatch(deleteFeedbackSuccess(responseJson));
            }).catch((error) => {
                dispatch(deleteFeedbackFailure(error));
            });
        }).catch((error) => {
            dispatch(deleteFeedbackFailure(error));
        })
    };
}

// merge
const mergeFeedbackStart = () => ({
	type: MERGE_FEEDBACK_START
})
const mergeFeedbackFailure = (err) => ({
	type: MERGE_FEEDBACK_FAILURE,
	err
})
const mergeFeedbackSuccess = (result) => ({
	type: MERGE_FEEDBACK_SUCCESS,
	msg:result
})

export const mergeFeedback = (selected) => {
	
}

