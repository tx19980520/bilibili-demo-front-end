import * as actions from "./actionType.js";
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
 const dataInit=()=> ({
        type: actions.DATA_INIT_START
     });
 const dataSccuess =(data)=>({
        type:actions.DATA_INIT_SUCCESS,
        data
    });
 const dataFailure=(err)=>({
        type:actions.DATA_SUBMIT_FAILURE,
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
export const specData=(animeId)=>{
  return (dispatch) =>{
      const apiUrl = `/api/AnimeSpecific/${animeId}`;
      dispatch(dataInit());
      return fetch(apiUrl).then((response)=>{
          response.json().then((responseJson) => {
              if(responseJson.code === 201)
              {
                  dispatch(dataFailure(responseJson))
              }
              else{
                  dispatch(dataSccuess(responseJson));
              }

          }).catch((error) => {
              dispatch(dataFailure({code:201,text:error}));
          });
      })
  }
};
export const  dataSubmit=(data)=>{
    return (dispatch) => {
        const apiUrl = `/api/postNewData`;//这个地方我们改成了使用动态的后台取数据

        dispatch(SubmitStart());

        return fetch(apiUrl,{method:"POST",headers:{'Content-Type': 'application/json'},body:data}).then((response) => {
            response.json().then(checkStatus).then((responseJson) => {
                dispatch(SubmitSuccess(responseJson));
            }).catch((error) => {
                dispatch(SubmitFailure(error));
            });
        }).catch((error) => {
            dispatch(SubmitFailure(error));
        })
    };
};