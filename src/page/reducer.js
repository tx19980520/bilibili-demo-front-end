import {GET_TOTAL_PAGE, GET_PAGE_SUCESS, GET_PAGE_FAILURE} from './actionType.js';
export default (state={page:-1}, action) => {
    switch(action.type) {
        case GET_TOTAL_PAGE: {
            return state;
        }
        case GET_PAGE_SUCESS: {
            return {page:action.result};
        }
        case GET_PAGE_FAILURE: {
            return {page:-1};
        }
        default: {
            return state;
        }
    }
}