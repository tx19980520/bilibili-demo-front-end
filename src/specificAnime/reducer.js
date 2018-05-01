import * as actions from "./actionType.js";
export default (state={all_ready:false,modalSwitch:false,nestedSwitch:false,result:{ code:200,"cover":"full/fd7d3e991fc21da334d70e5da8aef884ae1e1938.jpg","animeTitle":"我的妹妹不可能那么可爱 第二季","specific":{"__v":0,"actor":[{"role":"高坂京介","actor_id":0,"actor":"中村悠一"},{"role":"高坂桐乃","actor_id":0,"actor":"竹達彩奈"},{"role":"五更琉璃","actor_id":0,"actor":"花澤香菜"},{"role":"来栖加奈子","actor_id":0,"actor":"田村由加莉"},{"role":"新垣绫濑","actor_id":0,"actor":"早見沙織"},{"role":"槙岛沙织","actor_id":0,"actor":"生天目仁美"},{"role":"田村麻奈实","actor_id":0,"actor":"佐藤聡美"},{"role":"赤城濑菜","actor_id":0,"actor":"伊瀬茉莉也"},{"role":"樱井秋美","actor_id":0,"actor":"佐倉綾音"}],"episodes":[{"index":"16","update_time":"2014-08-01 19:19:29.0","from":"bangumi","is_webplay":"0","index_title":"我的妹妹不可能这么可爱","coins":"0","cover":"http://i0.hdslb.com/bfs/bangumi/588c602d71c027f3f5ce2453b954ebce1f478855.jpg","mid":"928123","episode_id":"65191","webplay_url":"http://bangumi.bilibili.com/anime/2661/play#65191","av_id":"1358908","episode_status":2,"page":"16"}]}}},action)=>{
    switch(action.type)
    {
        case actions.DATA_SUBMIT_START:{
            return {...state,all_ready:false};
        }
        case actions.DATA_SUBMIT_SUCESS:{
            return {...state,result:action.result}
        }
        case actions.DATA_SUBMIT_FAILURE:{
            return {...state,all_ready:true,result:action.result};
        }
        case actions.NESTED_OPEN:{
            return {...state,nestedSwitch:true};
        }
        case actions.NESTED_CLOSE:{
            return {...state,nestedSwitch:false};
        }
        case actions.MODAL_OPEN:{
            return {...state,modalSwitch:true};
        }
        case actions.MODAL_CLOSE:{
            return {...state,modalSwitch:false};
        }
        case actions.DATA_INIT_START:{
            return {...state,all_ready:false};
        }
        case actions.DATA_INIT_FAILURE:{
            return {...state,all_ready:false,result:action.data}
        }
        case actions.DATA_INIT_SUCCESS:{
            console.log(action);
            return {...state,all_ready:true,result:action.data}
        }
        default:{
            return state;
        }
    }
}