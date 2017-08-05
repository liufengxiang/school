import * as types from '../actions/types';

export default function news(newsList = [], action) {
  switch (action.type) {
  	case types.SET_NEWS_LIST:
  		return action.v;
  	case types.SET_MORE_NEWS_LIST:
  		return [...newsList, ...action.v];
  	case types.CLEAR_NEWS_LIST:
  		return [];
  	default:
  		return newsList;
  }
}  