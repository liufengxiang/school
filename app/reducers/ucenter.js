import * as types from '../actions/types';

/*
默认都是 undefined
{
	isComplete : 0,
	profile : {...},
  baseUinfo : {},
  extUinfo : {}
}
*/
export default function ucenter(uinfo = {}, action) {
  switch (action.type) {
  	case types.SET_IS_COMPLETE:
  		return Object.assign({}, uinfo, {isComplete : action.v}); //可以为已完成1，未完成0
  	case types.SET_PROFILE:
  		return Object.assign({}, uinfo, {profile : action.v});
    case types.SET_BASE_UINFO:
      return Object.assign({}, uinfo, {baseUinfo : action.v});
    case types.SET_EXT_UINFO:
      return Object.assign({}, uinfo, {extUinfo : action.v});
    case types.CHANGE_MOBILE:
      //mobile是在baseUinfo下面存放
      let newBaseUinfo = Object.assign({}, uinfo.baseUinfo, {mobile : action.v});
      return Object.assign({}, uinfo, {baseUinfo : newBaseUinfo});
    case types.CHANGE_SCORE:
      let newBaseUinfo2 = Object.assign({}, uinfo.baseUinfo, {score : action.v});
      return Object.assign({}, uinfo, {baseUinfo : newBaseUinfo2});
    case types.CLEAR_UINFO:
      return {};
  	default:
  		return uinfo;
  }
}  