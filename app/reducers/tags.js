import * as types from '../actions/types';

/*
'dataList' 分类-》标签列表
'tagObjList'  标签对象  key为qrcode_1,..
'cateObjList'  分类对象  key为qrcode_category_1,..
*/
export default function tag(tags = {}, action) {
  switch (action.type) {
  	case types.SET_TAGS:
  		return action.v; //action.v就是一个对象
  	case types.CLEAR_TAGS:
  		return {};
  	default:
  		return tags;
  }
}  