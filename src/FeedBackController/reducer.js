import { FETCH_FEEDBACK_START, FETCH_FEEDBACK_SUCCESS, FETCH_FEEDBACK_FAILURE } from "./actionType.js"
import { DELETE_FEEDBACK_START, DELETE_FEEDBACK_SUCCESS, DELETE_FEEDBACK_FAILURE } from "./actionType.js"
import { MERGE_FEEDBACK_START, MERGE_FEEDBACK_SUCCESS, MERGE_FEEDBACK_FAILURE } from "./actionType.js"
import { FEED_CLOSE , SELECT_CHANGE } from "./actionType";
export default (state = {step: "", feedbackData: [], selectID: [], deleteCode: 304, postCode: 304, fetchCode: 304, selectedRowKeys: []}, action) => {
    switch(action.type) {
        case FETCH_FEEDBACK_START: {
			return {...state, step: action.type,feedbackData: [], selectID: [], fetchCode: 303}
        }
        case FETCH_FEEDBACK_SUCCESS: {
			return {...state, step: action.type, feedbackData: action.data, selectedRowKeys: [], fetchCode: 200}
        }
		case FETCH_FEEDBACK_FAILURE: {
			return {...state, step: action.type, feedbackData: [], fetchCode: 404}
        }
		case DELETE_FEEDBACK_START: {
			return {...state, step: action.type, deleteCode: 303}
        }
        case DELETE_FEEDBACK_SUCCESS: {
			return {...state, step: action.type, selectedRowKeys: [], deleteCode: 200}
        }
		case DELETE_FEEDBACK_FAILURE: {
			return {...state,step: action.type, deleteCode: 404}
        }
		case MERGE_FEEDBACK_START: {
			return {...state, step: action.type, mergeCode: 303}
        }
        case MERGE_FEEDBACK_SUCCESS: {
			return {...state, step: action.type, selectedRowKeys: [], mergeCode: 200}
        }
		case MERGE_FEEDBACK_FAILURE: {
			return {...state, step: action.type, mergeCode: 404}
        }
        case FEED_CLOSE: {
		    return {...state, step: action.type, mergeCode: 304, deleteCode: 304, fetchCode: 304, selectedRowKeys: []}
        }
        case SELECT_CHANGE: {
            return {...state, step: action.type, selectedRowKeys: action.pos}
        }
        default: {
            return state;
        }
    }
}