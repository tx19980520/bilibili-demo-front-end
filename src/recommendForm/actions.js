import {RECOMMEND_START,RECOMMEND_FAILURE,RECOMMEND_SUCCESS} from './actionType.js'
import {FETCH_ANIMES_SUCCESS,FETCH_ANIMES_START,FETCH_ANIMES_FAILURE} from "./actionType"
const RecommendStart = () =>({
    type:RECOMMEND_START
})

const RecommendSuccess = (data) =>({
    type:RECOMMEND_SUCCESS,
    data
})
const RecommendFailure = (error) =>({
    type:RECOMMEND_FAILURE,
    error
})
export const SubmitRecommend = (animelist) =>{
    return (dispatch) => {
        const apiUrl = `/api/getOnlineData`;

        dispatch(RecommendStart());
        let options={
            body:animelist,
            headers:{
                'Accept':"application/json",
                'Content-Type': 'application/json'
            }
        }
        return fetch(apiUrl,options).then((response) => {

            response.json().then((responseJson) => {
                console.log(responseJson);
                dispatch(RecommendSuccess(responseJson));
            }).catch((error) => {
                dispatch(RecommendFailure(error));
            });
        }).catch((error) => {
            dispatch(RecommendFailure(error));
        })
    };
}

export const FetchAnimeStart = () =>({
    type:FETCH_ANIMES_START
})


const FetchAnimeSuccess = (data) =>({
    type:FETCH_ANIMES_SUCCESS,
    data
})

const FetchAnimeFailure = (error) =>({
    type:FETCH_ANIMES_FAILURE,
    error
})

export const FetchAnimeList = (word) => {
    return (dispatch) =>{
        dispatch(FetchAnimeStart());
        const apiUrl = `/api/getSearchList?word=${word}`;
        return fetch(apiUrl).then((response)=>{
            response.json().then((responseJson)=>{
                dispatch(FetchAnimeSuccess(responseJson))
            }).catch((error) => {
                dispatch(FetchAnimeFailure(error));
            })
        }).catch((error) => {
            dispatch(FetchAnimeFailure(error));
        })
    }
}