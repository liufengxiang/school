import * as types from '../actions/types';

export default function news_info(infoList = {}, action) {
  switch (action.type) {
  	case types.SET_NEWS_INFO_SINGLE:
  		let key = 'info_' + action.id;
  		let obj = {};
  		obj[key] = action.v;
  		return Object.assign({}, infoList, obj);
  	case types.CLEAR_NEWS_INFO:
  		return {};
  	default:
  		return infoList;
  }
}  