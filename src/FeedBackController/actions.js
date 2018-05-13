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
	type: FETCH_FEEDBACK_FAILURE
	err
})
export const fetFeedback = () => {
	
}

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
	
}

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

export const deleteFeedback = (selected) => {
	
}

