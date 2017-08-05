import * as types from '../actions/types';

/*
dataList => ["06 : 00","06 : 15","06 : 30",...] 列表
objList => {"time_0":"06 : 00","time_1":"06 : 15","time_2":"06 : 30", ...}  对象
*/
export default function time(timeList = {}, action) {
  switch (action.type) {
  	case types.SET_TIME_LIST:
  		return action.timeList; //action.timeList就是一个对象
  	case types.CLEAR_TIME_LIST:
  		return {};
  	default:
  		return timeList;
  }
}  