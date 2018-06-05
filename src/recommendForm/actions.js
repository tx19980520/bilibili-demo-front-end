import { RECOMMEND_START, RECOMMEND_FAILURE, RECOMMEND_SUCCESS } from './actionType.js'
import { FETCH_ANIMES_SUCCESS, FETCH_ANIMES_START, FETCH_ANIMES_FAILURE } from "./actionType.js"
import { IMG_LOAD } from './actionType.js'
import { POST_FEEDBACK_SUCCESS, POST_FEEDBACK_FAILURE, POST_FEEDBACK_START } from "./actionType.js"
import {
    FEED_CLOSE,
    FEED_OPEN,
    SAVE_FIELD,
    FLUSH_DATA,
    FLUSH_SEARCH,
    MODIFY_POSTLIST,
    MODIFY_POSTKEY,
    CHANGE_POSTLIST
} from "./actionType.js";
const recommendStart = () => ({
    type:RECOMMEND_START
})

const recommendSuccess = (body) => {
    return{
    type: RECOMMEND_SUCCESS,
    recommendList: body.recommendList,
    code:body.code,
    animeList: body.animeList
    }
}
const recommendFailure = (error) => ({
    type:RECOMMEND_FAILURE,
    error
})
export const loadStatus = (pos) => ({
	type:IMG_LOAD,
	pos
})
export const submitRecommend = (animelist) => {
    return (dispatch) => {
        const apiUrl = "http://localhost:8080/api/postRecommend";
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
                responseJson = {...responseJson, animeList: animelist} //meta the post data
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
const postFeedbackStart = () => ({
    type:POST_FEEDBACK_START,
})
const postFeedbackFailure = (err) => ({
    type:POST_FEEDBACK_FAILURE,
    err
})
const postFeedbackSuccess = (data) => ({
    type:POST_FEEDBACK_SUCCESS,
    data
})
export const postFeedBack = (postList, feedback) => {
    return (dispatch) => {
        const apiUrl = "http://localhost:8080/api/postFeedback"
        dispatch(postFeedbackStart());
        let options={
			mode: 'cors',
			method:"POST",
            headers:{
                'Accept':"application/json",
                'Content-Type': 'application/json;charset=utf-8',
            },
            body:JSON.stringify({postList: postList, feedback: feedback}),
        }
        return fetch(apiUrl,options).then((response) => {
            response.json().then((responseJson) => {
                dispatch(postFeedbackSuccess(responseJson));
            }).catch((error) => {
                dispatch(postFeedbackFailure(error));
            });
        }).catch((error) => {
            dispatch(postFeedbackFailure(error));
        })
    };
}

export const saveField = (payload) => ({
  type:SAVE_FIELD,
  payload
})

export const feedOpen = () => ({
    type: FEED_OPEN
})

export const feedClose = () => ({
    type: FEED_CLOSE
})

export const flushData = () => ({//clean all data after a post feedback
    type: FLUSH_DATA
})

export const flushSearch = () => ({
    type: FLUSH_SEARCH
})

export const modifyPostList = (array) => ({
    type: MODIFY_POSTLIST,
    array
})

export const modifyPostKey = (keys) => ({
    type: MODIFY_POSTKEY,
    keys
})
export const changePostList = (pos, word) => ({
    type: CHANGE_POSTLIST,
    pos,
    word

})