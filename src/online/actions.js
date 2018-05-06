import {ONLINE_START,ONLINE_SUCESS,ONLINE_FAILURE} from "./actionType.js";
const fetchOnlineStart = () => ({
    type:ONLINE_START
});
const fetchOnlineSucess = (result) => ({
        type: ONLINE_SUCESS,
        result
});
const fetchOnlineFailure = () => {
    var chartData = [];
    for (let i = 0; i < 20; i += 1) {
        chartData.push({
            x: (new Date().getTime()) + (1000 * 60 * 30 * i),
            y1: Math.floor(Math.random() * 100) + 1000,
            y2: Math.floor(Math.random() * 100) + 10,
        });
    }
    return {
        type:ONLINE_FAILURE,
        chartData
    }
}
export const onlineInit = () => {
    return (dispatch) => {
        const apiUrl = `/api/getOnlineData`;

        dispatch(fetchOnlineStart());

        return fetch(apiUrl).then((response) => {

            response.json().then((responseJson) => {
                dispatch(fetchOnlineSucess(responseJson));
            }).catch((error) => {
                dispatch(fetchOnlineFailure(error));
            });
        }).catch((error) => {
            dispatch(fetchOnlineFailure(error));
        })
    };
}
