import * as types from './types';
import { Toast, Modal } from 'antd-mobile';
import { push } from 'react-router-redux';
import 'whatwg-fetch';
import { getLocalUid, getLocalPassword, changeLocalPassword, toastLoading, toastSuccess, toastFail, toastInfo, toastHide, isLogin } from '../utils/func';
import { setDeviceIdState, logoutDirect } from './app';
import { SERVER_HOST_API } from './server_info';

export function checkLogin(){
	//如果已登录，则跳转，目前是供Login组件使用
	//之所以放在action中是为了方便使用dispatch和push
	return function(dispatch){
    	if (isLogin()){ 
			setTimeout(function(){
				dispatch(push('/'));
			}, 100);
		}
    }
}

export function completeProfile(truename, school_id, xi_id, nianji_id, banji_id){
	return (dispatch, getState) => {
        let jsonData = {uid:getLocalUid(), password:getLocalPassword(), truename:truename, school_id:school_id, xi_id:xi_id, nianji_id:nianji_id, banji_id:banji_id};
        let body = 'jsonData=' + JSON.stringify(jsonData);

        toastLoading('正在提交...');
		fetch(SERVER_HOST_API + '/user/completeProfile.json', {
			method:'POST', 
			headers: {
					    "Content-Type": "application/x-www-form-urlencoded" //指定了后请求的header就是Form data,而不是request payload
					  }, 
				body : body
		}).then(function(res){
			return res.json();
		}).then(function(data){
			toastHide();
			if (data.status == 1){
				// dispatch(setIsComplete(1)); //setIsComplete，会在App组件中执行initComplete来执行，新view返回的时候，会执行will,所以这里不需要
				// dispatch(setProfile(jsonData)); //在Profile组件中自己会看情况执行init，所以这里不需要
				localStorage.setItem("local_isComplete", 1); //这里也没有执行额外的，因为App组件会自己init
				toastSuccess(data.msg);
				setTimeout(function(){dispatch(push('/'));}, 1500);
			}else if (data.status == 5) {
                dispatch(logoutDirect());
            }else {
				toastFail(data.msg, 1);
			}
		}).catch(function(e){
			toastHide();
			toastFail('服务器错误');
		});
    }
}

export function initProfile(){
	toastLoading();
	return function(dispatch){
    	return fetch(SERVER_HOST_API + '/user/getProfile.json?uid=' + getLocalUid() + '&password=' + getLocalPassword()).then(function(res){
    		return res.json();
    	}).then(function(data){
    		toastHide();
    		if (data.status == 1){
    			dispatch(setProfile(data.ext.profile))
    		}else if (data.status == 5) {
                dispatch(logoutDirect());
            }else {
    			//toastFail(data.msg, 1);
    		}
    	}).catch(function(e){
    		toastHide();
    		toastFail('服务器错误');
    	})
    }
}
export function setProfile(v){
	return {
		type : types.SET_PROFILE,
		v
	}
}

export function bindMobile(mobile, mobile_code){
	return (dispatch, getState) => {
        let jsonData = {uid:getLocalUid(), password:getLocalPassword(), mobile:mobile, mobile_code:mobile_code};
        let body = 'jsonData=' + JSON.stringify(jsonData);

        toastLoading('正在提交...');
		fetch(SERVER_HOST_API + '/user/bindMobile.json', {
			method:'POST', 
			headers: {
					    "Content-Type": "application/x-www-form-urlencoded" //指定了后请求的header就是Form data,而不是request payload
					  }, 
				body : body
		}).then(function(res){
			return res.json();
		}).then(function(data){
			toastHide();
			if (data.status == 1){
				toastSuccess(data.msg, 1);
				dispatch(changeMobile(data.ext.mobile))
				setTimeout(function(){dispatch(push('/'));}, 1500);
			}else if (data.status == 5) {
                dispatch(logoutDirect());
            }else {
				toastFail(data.msg, 1);
			}
		}).catch(function(e){
			toastHide();
			toastFail('服务器错误');
		});
    }
}
export function changeMobile(v){
	return {
		type : types.CHANGE_MOBILE,
		v
	}
}

export function bindDeviceId(mobile, mobile_code, device_id){
	return (dispatch, getState) => {
        let jsonData = {uid:getLocalUid(), password:getLocalPassword(), mobile:mobile, mobile_code:mobile_code, device_id:device_id};
        let body = 'jsonData=' + JSON.stringify(jsonData);

        toastLoading('正在提交...');
		fetch(SERVER_HOST_API + '/user/bindDeviceId.json', {
			method:'POST', 
			headers: {
					    "Content-Type": "application/x-www-form-urlencoded" //指定了后请求的header就是Form data,而不是request payload
					  }, 
				body : body
		}).then(function(res){
			return res.json();
		}).then(function(data){
			toastHide();
			if (data.status == 1){
				toastSuccess(data.msg, 1);
				dispatch(setDeviceIdState(1));
				setTimeout(function(){dispatch(push('/'));}, 1500);
			}else if (data.status == 5) {
                dispatch(logoutDirect());
            }else {
				toastFail(data.msg, 1);
			}
		}).catch(function(e){
			toastHide();
			toastFail('服务器错误');
		});
    }
}

export function changePassword(oldPassword, newPassword, reNewPassword){
	return (dispatch, getState) => {
        let jsonData = {uid:getLocalUid(), oldPassword:oldPassword, newPassword:newPassword, reNewPassword:reNewPassword};
        let body = 'jsonData=' + JSON.stringify(jsonData);

        toastLoading('正在提交...');
		fetch(SERVER_HOST_API + '/user/changePassword.json', {
			method:'POST', 
			headers: {
					    "Content-Type": "application/x-www-form-urlencoded" //指定了后请求的header就是Form data,而不是request payload
					  }, 
				body : body
		}).then(function(res){
			return res.json();
		}).then(function(data){
			toastHide();
			if (data.status == 1){
				toastSuccess(data.msg, 1);
				changeLocalPassword(data.ext.newpassword);
				setTimeout(function(){dispatch(push('/'));}, 1500);
			}else {
				toastFail(data.msg, 1);
			}
		}).catch(function(e){
			toastHide();
			toastFail('服务器错误');
		});
    }
}

export function initCashList(){
	return (dispatch, getState) => {
    	toastLoading();
        return fetch(SERVER_HOST_API + '/cash/getList.json?uid=' + getLocalUid() + '&password=' + getLocalPassword()).then(function(res){
    		return res.json();
    	}).then(function(data){
    		toastHide();
    		if (data.status == 1){
    			dispatch(setCashList(data.ext.cashList))
    		}else if (data.status == 5) {
                dispatch(logoutDirect());
            }else {
    			//toastFail(data.msg, 1);
    		}
    	}).catch(function(e){
    		console.log(e);
    	})
    }
}
export function setCashList(v){
	return {
		type : types.SET_CASH_LIST,
		v
	}
}
export function getMoreCashList(page){
	return function(dispatch){
		toastLoading('正在获取');
    	return fetch(SERVER_HOST_API + '/cash/getList.json?uid=' + getLocalUid() + '&password=' + getLocalPassword() + '&p=' + page).then(function(res){
    		return res.json();
    	}).then(function(data){
    		toastHide();
    		if (data.status == 1){
    			dispatch(setMoreCashList(data.ext.cashList));
    		}else if (data.status == 5) {
                dispatch(logoutDirect());
            }else {
    			toastInfo(data.msg, 1);
    		}
    	}).catch(function(e){
    		toastHide();
    		toastFail('服务器错误');
    	})
    }
}
export function setMoreCashList(v){
	return {
		type : types.SET_MORE_CASH_LIST,
		v
	}
}
export function addOneCash(v){
    return {
        type : types.ADD_ONE_CASH,
        v
    }
}

export function gotoRegister(){
	return (dispatch, getState) => {
        dispatch(push('/register'));
    }
}

export function register(username, mobile, mobile_code, password, rePassword, device_id){
    return (dispatch, getState) => {
        let jsonData = {username:username, mobile:mobile, mobile_code:mobile_code, password:password, rePassword:rePassword, device_id:device_id};
        let body = 'jsonData=' + JSON.stringify(jsonData);

        toastLoading('正在提交...');
		fetch(SERVER_HOST_API + '/user/register.json', {
			method:'POST', 
			headers: {
					    "Content-Type": "application/x-www-form-urlencoded" //指定了后请求的header就是Form data,而不是request payload
					  }, 
				body : body
		}).then(function(res){
			return res.json();
		}).then(function(data){
			toastHide();
			if (data.status == 1){
				toastSuccess(data.msg, 1);
				setTimeout(function(){dispatch(push('/login'));}, 1500);
			}else {
				toastFail(data.msg, 1);
			}
		}).catch(function(e){
			toastHide();
			toastFail('服务器错误');
		});
    }
}

export function gotoLogin(){
	return (dispatch, getState) => {
        dispatch(push('/login'));
    }
}
export function setLoginMobile(v){
	return {
		type : types.SET_LOGIN_MOBILE,
		v
	}
}
export function clearLoginMobile(){
	return {
		type : types.CLEAR_LOGIN_MOBILE
	}
}
export function login(username, password, device_id, mobile, mobile_code){
	return (dispatch, getState) => {
        let jsonData = {username:username, password:password, device_id:device_id, mobile:mobile, mobile_code:mobile_code};
        let body = 'jsonData=' + JSON.stringify(jsonData);

        toastLoading('正在提交...');
		fetch(SERVER_HOST_API + '/user/login.json', {
			method:'POST', 
			headers: {
					    "Content-Type": "application/x-www-form-urlencoded" //指定了后请求的header就是Form data,而不是request payload
					  }, 
				body : body
		}).then(function(res){
			return res.json();
		}).then(function(data){
			toastHide();
			if (data.status == 1){
				localStorage.setItem("local_uid", data.ext.uid);
				localStorage.setItem("local_password", data.ext.password);
				localStorage.setItem("local_isComplete", data.ext.isComplete);
				toastSuccess(data.msg, 1);
				setTimeout(function(){dispatch(push('/'));}, 1500);
			}else if(data.status == 2) {//
				toastInfo(data.msg);
				dispatch(setLoginMobile(data.ext.mobile));
			}else {
				toastFail(data.msg, 1);
			}
		}).catch(function(e){
			toastHide();
			toastFail('服务器错误');
		});
    }
}



















export function gotoFindPassword(){
	return (dispatch, getState) => {
        dispatch(push('/find-password'));
    }
}

export function findPassword(username, mobile, mobile_code){
	return (dispatch, getState) => {
        let jsonData = {username:username, mobile:mobile, mobile_code:mobile_code};
        let body = 'jsonData=' + JSON.stringify(jsonData);

        toastLoading('正在提交...');
		fetch(SERVER_HOST_API + '/user/findPassword.json', {
			method:'POST', 
			headers: {
					    "Content-Type": "application/x-www-form-urlencoded" //指定了后请求的header就是Form data,而不是request payload
					  }, 
				body : body
		}).then(function(res){
			return res.json();
		}).then(function(data){
			toastHide();
			if (data.status == 1){
				Modal.alert('找回密码成功', '您的新密码是'+data.ext.newPassword+',请登录后修改', [
				    { text: '确定', onPress: () => console.log('cancel') },
				]);
				dispatch(push('/login'));
				//setTimeout(function(){dispatch(push('/'));}, 1500);
			}else {
				toastFail(data.msg, 1);
			}
		}).catch(function(e){
			toastHide();
			toastFail('服务器错误');
		});
    }
}







export function sendCode(mobile, type){
	return function(dispatch){
		toastLoading('正在发送...',  600);
    	return fetch(SERVER_HOST_API + '/sms/sendCode.json?uid=' + getLocalUid() + '&password=' + getLocalPassword() + '&mobile=' + mobile + '&type=' + type).then(function(res){
    		return res.json();
    	}).then(function(data){
    		toastHide();
    		if (data.status == 1){
    			toastSuccess(data.msg);
    		}else if (data.status == 5) {
                dispatch(logoutDirect());
            }else {
    			toastFail(data.msg, 1);
    		}
    	}).catch(function(e){
    		toastHide();
    		toastFail('服务器错误');
    	})
    }
}
export function sendCodeWithoutLogin(mobile, type, username, device_id){
	username = username || '';
	device_id = device_id || '';
	return function(dispatch){
		toastLoading('正在发送...',  600);
    	return fetch(SERVER_HOST_API + '/sms/sendCodeWithoutLogin.json?mobile=' + mobile + '&type=' + type + '&username=' + username + '&device_id=' + device_id).then(function(res){
    		return res.json();
    	}).then(function(data){
    		toastHide();
    		if (data.status == 1){
    			toastSuccess(data.msg);
    		}else {
    			toastFail(data.msg, 1);
    		}
    	}).catch(function(e){
    		toastHide();
    		toastFail('服务器错误');
    	})
    }
}









//完善资料相关
export function initSchoolList(){
	return function(dispatch){
    	return fetch(SERVER_HOST_API + '/school/getSchoolList.json').then(function(res){
    		return res.json();
    	}).then(function(data){
    		dispatch(setSchoolList(data.ext.schoolList));
    	}).catch(function(e){
    		toastFail('服务器错误');
    	})
    }
}
export function setSchoolList(schoolList){
	return {
		type : types.SET_SCHOOL_LIST,
		schoolList
	}
}
export function initXiList(){
	return function(dispatch){
    	return fetch(SERVER_HOST_API + '/school/getXiList.json').then(function(res){
    		return res.json();
    	}).then(function(data){
    		dispatch(setXiList(data.ext.xiList));
    	}).catch(function(e){
    		toastFail('服务器错误');
    	})
    }
}
export function setXiList(xiList){
	return {
		type : types.SET_XI_LIST,
		xiList
	}
}
export function initNianjiList(){
	return function(dispatch){
    	return fetch(SERVER_HOST_API + '/school/getNianjiList.json').then(function(res){
    		return res.json();
    	}).then(function(data){
    		dispatch(setNianjiList(data.ext.nianjiList));
    	}).catch(function(e){
    		toastFail('服务器错误');
    	})
    }
}
export function setNianjiList(nianjiList){
	return {
		type : types.SET_NIANJI_LIST,
		nianjiList
	}
}
export function initBanjiList(){
	return function(dispatch){
    	return fetch(SERVER_HOST_API + '/school/getBanjiList.json').then(function(res){
    		return res.json();
    	}).then(function(data){
    		dispatch(setBanjiList(data.ext.banjiList));
    	}).catch(function(e){
    		toastFail('服务器错误');
    	})
    }
}
export function setBanjiList(banjiList){
	return {
		type : types.SET_BANJI_LIST,
		banjiList
	}
}