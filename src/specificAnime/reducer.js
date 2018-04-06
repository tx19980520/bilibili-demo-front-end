import * as actions from "./actionType.js";
export default (state={modalSwitch:false,nestedSwitch:false,result:{word:"请稍后...服务器太渣了，大爷给个赏钱吧"}},action)=>{
    switch(action.type)
    {
        case actions.DATA_SUBMIT_START:{
            return state;
        }
        case actions.DATA_SUBMIT_SUCESS:{
            return {...state,result:action.result}
        }
        case actions.DATA_SUBMIT_FAILURE:{
            return {...state,result:action.result};
        }
        case actions.NESTED_OPEN:{
            return {...state,nestedSwitch:true};
        }
        case actions.NESTED_FAILURE:{
            return {...state,nestedSwitch:false};
        }
        case actions.MODAL_OPEN:{
            return {...state,modalSwitch:true};
        }
        case actions.MODAL_FAILURE:{
            return {...state,modalSwitch:false};
        }
        default:{
            return state;
        }
    }
}