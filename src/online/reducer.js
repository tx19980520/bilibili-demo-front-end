import {ONLINE_START, ONLINE_SUCESS, ONLINE_FAILURE} from './actionType.js';
var  chartData = {};
var  data = [];
for (let i = 0; i < 20; i += 1) {
    data.push({
        x: (new Date().getTime()) + (1000 * 60 * 30 * i),
        y1: Math.floor(Math.random() * 100) + 1000,
        y2: Math.floor(Math.random() * 100) + 10,
    });
}
var date = new Date()
chartData['data'] = data;
chartData['year'] = date.getFullYear()
chartData['month'] = date.getMonth()+1
chartData['date'] = date.getDate()
export default (state={onlineData:chartData}, action) => {
    switch(action.type) {
        case ONLINE_START: {
            return state;
        }
        case ONLINE_SUCESS: {
            if (action.result.code === 201)
                return state;
            return {onlineData:action.result};
        }
        case ONLINE_FAILURE: {
            return {onlineData:chartData};
        }
        default: {
            return state;
        }
    }
}