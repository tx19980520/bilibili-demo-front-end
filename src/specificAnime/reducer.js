import * as actions from "./actionType.js";
export default (state={allready:false, modalSwitch:false, nestedSwitch:false,
                            result:{ code:200,"cover":"full/fd7d3e991fc21da334d70e5da8aef884ae1e1938.jpg","animeTitle":"我的妹妹不可能那么可爱 第二季",
                            "specific":{"__v":0,
                            "actor":[],
                            "episodes":[]
                                }
                            }
                        },action) => {
    switch(action.type)
    {
        case actions.DATA_SUBMIT_START:{
            return {...state, allready:false};
        }
        case actions.DATA_SUBMIT_SUCESS:{
            return {...state, result:action.result}
        }
        case actions.DATA_SUBMIT_FAILURE:{
            return {...state, allready:true, result:action.result};
        }
        case actions.NESTED_OPEN:{
            return {...state, nestedSwitch:true};
        }
        case actions.NESTED_CLOSE:{
            return {...state, nestedSwitch:false};
        }
        case actions.MODAL_OPEN:{
            return {...state, modalSwitch:true};
        }
        case actions.MODAL_CLOSE:{
            return {...state, modalSwitch:false};
        }
        case actions.DATA_INIT_START:{
            return {...state, allready:false};
        }
        case actions.DATA_INIT_FAILURE:{
            return {...state, allready:false, result:action.data}
        }
        case actions.DATA_INIT_SUCCESS:{
            return {...state, allready:true, result:action.data}
        }
        default:{
            return state;
        }
    }
}