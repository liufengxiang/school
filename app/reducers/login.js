import * as types from '../actions/types';

/*
{
  mobile : '' //设备异常时要向哪个手机号发送验证码
  device_id_state : 1/0 当前登录的设备是否和当前登录的账号绑定了 1代表已经绑定，0未绑定
}
*/
export default function login(loginInfo = {}, action) {
  switch (action.type) {
  	case types.SET_LOGIN_MOBILE:
  		return Object.assign({}, loginInfo, {mobile:action.v});
    case types.CLEAR_LOGIN_MOBILE:
      return Object.assign({}, loginInfo, {mobile:''});
    case types.SET_DEVICEID_STATE:
    	return Object.assign({}, loginInfo, {device_id_state:action.v});
  	default:
  		return loginInfo;
  }
}  