import {FETCH_FEEDBACK_START, FETCH_FEEDBACK_SUCCESS, FETCH_FEEDBACK_FAILURE} from "./actionType.js"
import {DELETE_FEEDBACK_START, DELETE_FEEDBACK_SUCCESS, DELETE_FEEDBACK_FAILURE} from "./actionType.js"
import {MERGE_FEEDBACK_START, MERGE_FEEDBACK_SUCCESS, MERGE_FEEDBACK_FAILURE} from "./actionType.js"
export default (state = {step: "", data:[]}, action) => {
    switch(action.type) {
        case FETCH_FEEDBACK_START: {
			return {...state, step:action.type, }
        }
        case FETCH_FEEDBACK_SUCCESS: {
			return {...state, step:action.type}
        }
		case FETCH_FEEDBACK_FAILURE: {
			return {...state, step:action.type}
        }
		case DELETE_FEEDBACK_START: {
			return {...state, step:action.type}
        }
        case DELETE_FEEDBACK_SUCCESS: {
			return {...state, step:action.type}
        }
		case DELETE_FEEDBACK_FAILURE: {
			return {...state,step:action.type}
        }
		case MERGE_FEEDBACK_START: {
			return {...state, step:action.type}
        }
        case MERGE_FEEDBACK_SUCCESS: {
			return {...state, step:action.type}
        }
		case MERGE_FEEDBACK_FAILURE: {
			return {...state, step:action.type}
        }
        default: {
            return state;
        }
    }
}