import {RECOMMEND_START, RECOMMEND_FAILURE, RECOMMEND_SUCCESS} from './actionType.js'
import {FETCH_ANIMES_SUCCESS, FETCH_ANIMES_START, FETCH_ANIMES_FAILURE} from "./actionType"
const recommendStart = () => ({
    type:RECOMMEND_START
})

const recommendSuccess = (data) => ({
    type:RECOMMEND_SUCCESS,
    data
})
const recommendFailure = (error) => ({
    type:RECOMMEND_FAILURE,
    error
})
export const submitRecommend = (animelist) => {
    return (dispatch) => {
        const apiUrl = `http://localhost:8080/api/postRecommend`;
        /*
        let data = new FormData()
        data.append('animelist',animelist);
        */
        let data = {"animelist":animelist};
        dispatch(recommendStart());
        let options={
			mode: 'cors',
			method:"POST",
            headers:{
                'Accept':"application/json",
                'Content-Type': 'application/json;charset=utf-8',
            },
            body:JSON.stringify(data),
        }
        return fetch(apiUrl,options).then((response) => {

            response.json().then((responseJson) => {
                console.log(responseJson);
                dispatch(recommendSuccess(responseJson));
            }).catch((error) => {
                dispatch(recommendFailure(error));
            });
        }).catch((error) => {
            dispatch(recommendFailure(error));
        })
    };
}

export const fetchAnimeStart = () => ({
    type:FETCH_ANIMES_START
})


const fetchAnimeSuccess = (data) => ({
    type:FETCH_ANIMES_SUCCESS,
    data
})

const fetchAnimeFailure = (error) => ({
    type:FETCH_ANIMES_FAILURE,
    error
})

export const fetchAnimeList = (word) => {
    return (dispatch) =>{
        dispatch(fetchAnimeStart());
        const apiUrl = `/api/getSearchList?word=${word}`;
        return fetch(apiUrl).then((response)=>{
            response.json().then((responseJson)=>{
                dispatch(fetchAnimeSuccess(responseJson))
            }).catch((error) => {
                dispatch(fetchAnimeFailure(error));
            })
        }).catch((error) => {
            dispatch(fetchAnimeFailure(error));
        })
    }
}