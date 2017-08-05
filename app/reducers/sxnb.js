import * as types from '../actions/types';

/*
schoolList实际上是包含schoolObjList和schoolData这两个key的一个对象
schoolObjList 供Menu选择后显示使用[{school_1:{title:'a', id:5}}, ...]
schoolData  供Menu使用 [{label:'', value:},...]

schoolList只是其中的一个key
*/
export default function sxnb(obj = {}, action) {
  switch (action.type) {
  	case types.SET_SCHOOL_LIST:
  		return Object.assign({}, obj, {schoolList:action.schoolList});
  	case types.SET_XI_LIST:
  		return Object.assign({}, obj, {xiList:action.xiList});
  	case types.SET_NIANJI_LIST:
  		return Object.assign({}, obj, {nianjiList:action.nianjiList});
  	case types.SET_BANJI_LIST:
  		return Object.assign({}, obj, {banjiList:action.banjiList});
  	default:
  		return obj;
  }
}  