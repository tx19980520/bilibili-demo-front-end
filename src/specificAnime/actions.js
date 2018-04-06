import * as actions from "actionType.js";
export const ModalOpen=()=>(
    {
        type: actions.MODAL_OPEN
    });
export const ModalClose=()=>(
    {
        type: actions.MODAL_CLOSE
    });
export const NestedOpen=()=>(
    {
        type: actions.NESTED_OPEN
    });
export const NestedClose=()=>(
    {
        type: actions.NESTED_CLOSE
    });
 const SubmitStart=()=>(
    {
        type: actions.DATA_SUBMIT_START
    });
 const SubmitSuccess=(data)=>(
    {
        type: actions.DATA_SUBMIT_START,
        data
    });
 const SubmitFailure=(err)=>(
    {
        type: actions.DATA_SUBMIT_START,
        err
    });
function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response
    } else {
        let error = new Error(response.statusText);
        error.response = response;
        throw error
    }
}
export const  dataSubmit=(data)=>{
    return (dispatch) => {
        const apiUrl = `/postNewData`;//这个地方我们改成了使用动态的后台取数据

        dispatch(SubmitStart());

        return fetch(apiUrl,{method:POST,headers:{'Content-Type': 'application/json'},body:data}).then((response) => {
            response.json().then(checkStatus).then((responseJson) => {
                dispatch(SubmitSuccess(responseJson));
            }).catch((error) => {
                dispatch(SubmitFailure(error));
            });
        }).catch((error) => {
            dispatch(searchInitFailure(error));
        })
    };
};