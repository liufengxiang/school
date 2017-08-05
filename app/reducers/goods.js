import * as types from '../actions/types';

export default function goods(goodsList = [], action) {
  switch (action.type) {
  	case types.SET_GOODS_LIST:
  		return action.v;
  	case types.SET_MORE_GOODS_LIST:
  		return [...goodsList, ...action.v];
  	case types.CLEAR_GOODS_LIST:
  		return [];
  	default:
  		return goodsList;
  }
}  