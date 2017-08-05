import * as types from '../actions/types';

export default function goods_info(infoList = {}, action) {
  switch (action.type) {
  	case types.SET_GOODS_INFO_SINGLE:
  		let key = 'info_' + action.gid;
  		let obj = {};
  		obj[key] = action.v;
  		return Object.assign({}, infoList, obj);
  	case types.CLEAR_GOODS_INFO:
  		return {};
  	default:
  		return infoList;
  }
}  