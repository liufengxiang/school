import * as types from './types';
import { Toast, Modal } from 'antd-mobile';
import { push } from 'react-router-redux';
import 'whatwg-fetch';
import { initJiguang, getLocalUid, getLocalPassword, changeLocalPassword, toastLoading, toastSuccess, toastFail, toastInfo, toastHide, myConfirm } from '../utils/func';
import { addOneCreditRecord } from './credit';
import { clearLoginMobile, addOneCash } from './ucenter';
import { SERVER_HOST_API } from './server_info';

export function changeSelectedTab(v){
	return {
		type : types.CHANGE_SELECTED_TAB,
		v
	}
}

export function checkDeviceId(device_id){
	return function(dispatch){
    	return fetch(SERVER_HOST_API + '/user/checkDeviceId.json?uid=' + getLocalUid() + '&password=' + getLocalPassword() + '&device_id=' + device_id).then(function(res){
    		return res.json();
    	}).then(function(data){
    		if (data.status == 1){
    			dispatch(setDeviceIdState(data.ext.state));
    		}else if (data.status == 5) {
                dispatch(logoutDirect());
            }else {
    			toastFail(data.msg);
    		}
    	}).catch(function(e){
    		toastFail('服务器错误');
    	})
    }
}
export function setDeviceIdState(v){
	return {
		type : types.SET_DEVICEID_STATE,
		v
	}
}

//资讯相关
export function initNewsList(cateid){
	return function(dispatch){
    	return fetch(SERVER_HOST_API + '/article/getList.json?cateid=' + cateid).then(function(res){
    		return res.json();
    	}).then(function(data){
    		if (data.status == 1){
    			dispatch(setNewsList(data.ext.articleList));	
    		}
    	}).catch(function(e){
    		toastFail('服务器错误');
    	})
    }
}
export function setNewsList(v){
	return {
		type : types.SET_NEWS_LIST,
		v
	}
}
export function getMoreNewsList(cateid, page){
	return function(dispatch){
		toastLoading('正在获取...',  600);
    	return fetch(SERVER_HOST_API + '/article/getList.json?cateid=' + cateid + '&p=' + page).then(function(res){
    		return res.json();
    	}).then(function(data){
    		toastHide();
    		if (data.status == 1){
    			dispatch(setMoreNewsList(data.ext.articleList));
    		}else {
    			toastInfo(data.msg, 1);
    		}
    	}).catch(function(e){
    		toastFail('服务器错误');
    	})
    }
}
export function setMoreNewsList(v){
	return {
		type : types.SET_MORE_NEWS_LIST,
		v
	}
}

export function getNewsInfo(id){
	return (dispatch, getState) => {
    	toastLoading('正在加载...',  600);
        return fetch(SERVER_HOST_API + '/article/info.json?id=' + id).then(function(res){
    		return res.json();
    	}).then(function(data){
    		if (data.status == 1){
    			dispatch(setNewsInfoSingle(id, data.ext.info))
    			toastHide();
    		}
    	}).catch(function(e){
    		console.log(e);
    	})
    }
}
export function setNewsInfoSingle(id, v){
	return {
		type : types.SET_NEWS_INFO_SINGLE,
		id,
		v
	}
}

//兑换商品相关
export function initGoodsList(cateid){
	return function(dispatch){
    	return fetch(SERVER_HOST_API + '/goods/getList.json?id=' + cateid).then(function(res){
    		return res.json();
    	}).then(function(data){
    		if (data.status == 1){
    			dispatch(setGoodsList(data.ext.goodsList));	
    		}
    	}).catch(function(e){
    		toastFail('服务器错误');
    	})
    }
}
export function setGoodsList(v){
	return {
		type : types.SET_GOODS_LIST,
		v
	}
}
export function getMoreGoodsList(cateid, page){
	return function(dispatch){
		toastLoading('正在获取...',  600);
    	return fetch(SERVER_HOST_API + '/goods/getList.json?id=' + cateid + '&p=' + page).then(function(res){
    		return res.json();
    	}).then(function(data){
    		toastHide();
    		if (data.status == 1){
    			dispatch(setMoreGoodsList(data.ext.goodsList));
    		}else {
    			toastInfo(data.msg, 1);
    		}
    	}).catch(function(e){
    		toastFail('服务器错误');
    	})
    }
}
export function setMoreGoodsList(v){
	return {
		type : types.SET_MORE_GOODS_LIST,
		v
	}
}
export function getGoodsInfo(gid){
	return (dispatch, getState) => {
    	toastLoading('正在加载...',  600);
        return fetch(SERVER_HOST_API + '/goods/info.json?id=' + gid).then(function(res){
    		return res.json();
    	}).then(function(data){
    		if (data.status == 1){
    			dispatch(setGoodsInfoSingle(gid, data.ext.info))
    			toastHide();
    		}
    	}).catch(function(e){
    		console.log(e);
    	})
    }
}
export function setGoodsInfoSingle(gid, v){
	return {
		type : types.SET_GOODS_INFO_SINGLE,
		gid,
		v
	}
}

export function exchangeGoods(gid){
	return (dispatch, getState) => {
        let state = getState();
        let jsonData = {uid : getLocalUid(), password : getLocalPassword(), gid : gid};
        let body = 'jsonData=' + JSON.stringify(jsonData);
        toastLoading('正在提交');
		fetch(SERVER_HOST_API + '/goods/exchange.json', {
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
				toastSuccess(data.msg);
				dispatch(changeScore(data.ext.score));
				dispatch(addOneCreditRecord(data.ext.newRecord));
				dispatch(addOneCash(data.ext.newCash));
			}else if (data.status == 5) {
                dispatch(logoutDirect());
            }else {
				toastFail(data.msg, 1);
			}
		}).catch(function(e){
			toastHide();
			toastFail('服务器错误', 1);
		});
    }
}
export function changeScore(v){
	return {
		type : types.CHANGE_SCORE,
		v
	}
}

export function initTags(){
	return function(dispatch){
    	return fetch(SERVER_HOST_API + '/tag/getList.json?uid=' + getLocalUid() + '&password=' + getLocalPassword()).then(function(res){
    		return res.json();
    	}).then(function(data){
    		//如果不加这一层判断，直接用data.ext.tags，若是服务器返回错误，则由于data.ext.tags没有值，就会触发catch中的语句
    		if (data.status == 1){ 
    			dispatch(setTags(data.ext.tags));
    		}else if (data.status == 5){
    			//dispatch(logoutDirect()); 给最后一个，因为只需要弹出一个就够了
    		}
    	}).catch(function(e){
    		console.log(e);
    	})
    }
}
export function setTags(v){
	return {
		type : types.SET_TAGS,
		v
	}
}

export function initBaseUinfo(){
	return function(dispatch){
    	return fetch(SERVER_HOST_API + '/user/getBaseUinfo.json?uid=' + getLocalUid() + '&password=' + getLocalPassword()).then(function(res){
    		return res.json();
    	}).then(function(data){
    		if (data.status == 1) {
    			dispatch(setBaseUinfo(data.ext.uinfo));
    		} else if (data.status == 5) {
    			Toast.hide(); //如果Toast.info还未关闭，则关掉
    			dispatch(logoutDirect());
    		};
    	}).catch(function(e){
    		console.log(e);
    	})
    }
}
export function setBaseUinfo(v){
	return {
		type : types.SET_BASE_UINFO,
		v
	}
}

export function initExtUinfo(){
	return function(dispatch){
    	return fetch(SERVER_HOST_API + '/user/getExtUinfo.json?uid=' + getLocalUid() + '&password=' + getLocalPassword()).then(function(res){
    		return res.json();
    	}).then(function(data){
    		if (data.status == 1) {
    			dispatch(setExtUinfo(data.ext.uinfo));
    		}else if (data.status == 5) {
                dispatch(logoutDirect());
            }else {
            	toastFail(data.msg);
            }
    	}).catch(function(e){
    		toastFail('服务器错误');
    	})
    }
}
export function setExtUinfo(v){
	return {
		type : types.SET_Ext_UINFO,
		v
	}
}

export function initComplete(){
	return function(dispatch){
    	return fetch(SERVER_HOST_API + '/user/isComplete.json?uid=' + getLocalUid() + '&password=' + getLocalPassword()).then(function(res){
    		return res.json();
    	}).then(function(data){
    		if (data.status == 1){
    			dispatch(setIsComplete(data.ext.isComplete))
    		}else if (data.status == 5){
    			//dispatch(logoutDirect()); 最后一个弹出就够了
    		}
    		
    	}).catch(function(e){
    		toastFail('服务器错误');
    	})
    }
}
export function setIsComplete(v){
	return {
		type : types.SET_IS_COMPLETE,
		v
	}
}

/*export function initTimePlanList() {
    return (dispatch, getState) => {
    	//对在App组件中第一个初始化的方法，要做特别处理
    	//因为此时api对象还没有，设备还没准备完成,此时只能使用ant的Toast
    	let count = 0;
		let interval = setInterval(function(){
			count ++;
			if (count <= 25 && typeof(api) == 'undefined'){ //count限制是为了在WEB上看效果
				toastHide(); //先将下面这个打开的销毁，保证内存中永远只有一个Toast对象存在,不能放在下面
				Toast.info('设备准备中', 100);
			}else {
				clearInterval(interval);
				Toast.hide(); //先销毁仅剩的一个Toast (即上面的Toast.info)
				toastLoading(); 
		        return fetch(SERVER_HOST_API + '/timePlan/getPlans.json?uid=' + getLocalUid() + '&password=' + getLocalPassword()).then(function(res){
		    		return res.json();
		    	}).then(function(data){
		    		if (data.status == 1){
		    			toastHide();
		    			dispatch(setTimePlanList(data.ext.timePlanList))
		    		}
		    	}).catch(function(e){
		    		console.log(e);
		    	})
			}
		}, 100);
    }
}*/
export function initTimePlanList() {
	Toast.info('设备准备中');
    return (dispatch, getState) => {
    	fetch(SERVER_HOST_API + '/index/waiting').then(function(res){
    		return res.json();
    	}).then(function(data){
    		Toast.hide();
    		toastLoading();
    		return fetch(SERVER_HOST_API + '/timePlan/getPlans.json?uid=' + getLocalUid() + '&password=' + getLocalPassword()).then(function(res){
	    		return res.json();
	    	}).then(function(data){
	    		toastHide();
	    		if (data.status == 1){
	    			dispatch(setTimePlanList(data.ext.timePlanList));
	    			//所有组件只有App组件需要做这样的处理，因为：
	    			//Login通常情况下是在加载完成后才有操作，如登录
	    			//Register同上
	    			//App组件中的其它子组件都是App完成后才执行
	    			//不用判断是否已经取得，就是多执行几次请求
	    			//实际中也不会请求多次，因为initTimePlanList只会执行一次就中止，所以在这里面也只会随initTimePlanList只执行一次
	    			//可以参考这种写法，将App组件中需要延迟的事件都写到这里
	    			//if (typeof(loginInfo.device_id_state) == 'undefined'){ 
					dispatch(checkDeviceId(api.deviceId)); //api.deviceId
					//}
					initJiguang();
	    		}else if (data.status == 5){
	    			//dispatch(logoutDirect()); 什么都不做，给最后一个，因为只需要弹出一个就够了
	    		}
	    	}).catch(function(e){
	    		console.log(e);
	    	})
    	});
    }
}
export function setTimePlanList(timePlanList){
	return {
		type : types.SET_TIMEPLANLIST,
		timePlanList
	}
}

export function initTimeList() { 
    return (dispatch, getState) => {
        return fetch(SERVER_HOST_API + '/timePlan/getTimeList.json').then(function(res){
    		return res.json();
    	}).then(function(data){
    		if (data.status == 1){
    			dispatch(setTimeList(data.ext.timeList))
    		}
    	}).catch(function(e){
    		console.log(e);
    	})
    }
}
export function setTimeList(timeList){
	return {
		type : types.SET_TIME_LIST,
		timeList
	}
}

export function commitTimePlan(){ 
	return (dispatch, getState) => {
        let state = getState();
        let jsonData = {uid:getLocalUid(), password:getLocalPassword(), timePlan:state.timePlan}
        let body = 'jsonData=' + JSON.stringify(jsonData);
        toastLoading('正在提交');
		fetch(SERVER_HOST_API + '/timePlan/doPlan.json', {
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
				dispatch(setSubmitTimeplanDate());
			}else if (data.status == 5){
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

export function addEmpty(startIndex, endIndex, weekId){
	return {
		type : types.ADD_EMPTY,
		startIndex,
		endIndex,
		weekId
	}
}

export function addStatic(startIndex, endIndex, title, weekId){
	return {
		type : types.ADD_STATIC,
		startIndex,
		endIndex,
		title,
		weekId
	}
}

export function addTag(startIndex, endIndex, tagId, tagName, weekId){
	return {
		type : types.ADD_TAG,
		startIndex,
		endIndex,
		tagId,
		tagName,
		weekId
	}
}

export function delTag(startIndex, endIndex, weekId){
	return {
		type : types.DEL_TAG,
		startIndex,
		endIndex,
		weekId
	}
}

export function mergeTag(startIndex, endIndex, tagId, tagName, weekId, direction){ //direction方向  up, down, all
	return {
		type : types.MERGE_TAG,
		startIndex,
		endIndex,
		tagId,
		tagName,
		weekId,
		direction
	}
}

export function checkin(location, scanContent){
	return (dispatch, getState) => {
        let jsonData = {uid:getLocalUid(), password:getLocalPassword(), location:location, scanContent:scanContent}
        let body = 'jsonData=' + JSON.stringify(jsonData);
        toastLoading('正在提交');
		fetch(SERVER_HOST_API + '/user/checkin.json', {
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
				dispatch(changeScore(data.ext.score));
				dispatch(addOneCreditRecord(data.ext.newRecord));
			}else if (data.status == 2){
				toastSuccess(data.msg);
			}else if (data.status == 5) {
                dispatch(logoutDirect());
            }else {
				toastFail(data.msg, 1);
			}
		}).catch(function(e){
			toastHide();
			toastFail('服务器错误', 1);
		});
    }
}

export function scanTag(location, scanContent){
	return (dispatch, getState) => {
        let jsonData = {uid:getLocalUid(), password:getLocalPassword(), location:location, scanContent:scanContent}
        let body = 'jsonData=' + JSON.stringify(jsonData);
        toastLoading('正在提交');
		fetch(SERVER_HOST_API + '/tag/scan.json', {
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
				dispatch(changeScore(data.ext.score));
				dispatch(addOneCreditRecord(data.ext.newRecord));
			}else if (data.status == 2) { //由于最大积分限制，此次奖励积分数为0
				toastSuccess(data.msg);
			}else if (data.status == 5) {
                dispatch(logoutDirect());
            }else {
				toastFail(data.msg, 1);
			}
		}).catch(function(e){
			toastHide();
			toastFail('服务器错误', 1);
		});
    }
}

export function logout(){
	return (dispatch, getState) => {
		Modal.alert('退出', '确定退出吗?', [
		    { text: '取消', onPress: () => console.log('cancel') },
		    { text: '确定', onPress: () => {
		    	localStorage.removeItem("local_uid");
				localStorage.removeItem("local_password");
				localStorage.removeItem("local_isComplete");

				//clear
				dispatch(clearCreditRecordList());
				dispatch(clearCashList());
				dispatch(clearGoodsList());
				dispatch(clearGoodsInfo());
				dispatch(clearTags());
				dispatch(clearTimePlanList());
				dispatch(clearUinfo());
				dispatch(clearLoginMobile());
				dispatch(clearTagCount());

				setTimeout(function(){dispatch(push('/login'));}, 500);
		    } },
		  ]);
	}
}
export function logoutDirect(){
	return true; //账号密码错误的情况下，会触发
	return (dispatch, getState) => {
		Modal.alert('重新登录', '登录信息已过期', [
		    //{ text: '取消', onPress: () => console.log('cancel') },
		    { text: '确定', onPress: () => {
		    	localStorage.removeItem("local_uid");
				localStorage.removeItem("local_password");
				localStorage.removeItem("local_isComplete");

				//clear
				dispatch(clearCreditRecordList());
				dispatch(clearCashList());
				dispatch(clearGoodsList());
				dispatch(clearGoodsInfo());
				dispatch(clearTags());
				dispatch(clearTimePlanList());
				dispatch(clearUinfo());
				dispatch(clearLoginMobile());
				dispatch(clearTagCount());

				setTimeout(function(){dispatch(push('/login'));}, 500);
		    } },
		  ]);
	}
}

//clear
export function clearCreditRecordList(){
	return {
		type : types.CLEAR_CREDIT_RECORD_LIST
	}
}
export function clearCashList(){
	return {
		type : types.CLEAR_CASH_LIST
	}
}
export function clearGoodsList(){
	return {
		type : types.CLEAR_GOODS_LIST
	}
}
export function clearGoodsInfo(){
	return {
		type : types.CLEAR_GOODS_INFO
	}
}
export function clearTags(){
	return {
		type : types.CLEAR_TAGS
	}
}
export function clearTimePlanList(){
	return {
		type : types.CLEAR_TIME_PLAN_LIST
	}
}
export function clearUinfo(){
	return {
		type : types.CLEAR_UINFO
	}
}

//timeplanSync实际上就是commitTimePlan，
//timeplanSync是commitTimePlan的自动提交版本
//都要触发dispatch(setSubmitTimeplanDate());事件来更改提交的时间，为下一次是否自动提交作参考
export function timeplanSync(){ 
	return (dispatch, getState) => {
        let state = getState();
        let jsonData = {uid:getLocalUid(), password:getLocalPassword(), timePlan:state.timePlan}
        let body = 'jsonData=' + JSON.stringify(jsonData);
        //toastLoading('正在同步..');
		fetch(SERVER_HOST_API + '/timePlan/doPlan.json', {
			method:'POST', 
			headers: {
					    "Content-Type": "application/x-www-form-urlencoded" //指定了后请求的header就是Form data,而不是request payload
					  }, 
				body : body
		}).then(function(res){
			return res.json();
		}).then(function(data){
			//toastHide();
			if (data.status == 1){
				//toastSuccess('同步成功' + data.msg, 1);
				dispatch(setSubmitTimeplanDate());
			}else {
				//toastFail('同步失败' + data.msg, 1);
			}
		}).catch(function(e){
			//toastHide();
			//toastFail('服务器错误');
		});
    }
}
export function setSubmitTimeplanDate(){
	return {
		type : types.SET_SUBMIT_TIMEPLAN_DATE
	}
}

export function getTagCount(){
	return function(dispatch){
    	return fetch(SERVER_HOST_API + '/timePlan/getTagCount.json?uid=' + getLocalUid() + '&password=' + getLocalPassword()).then(function(res){
    		return res.json();
    	}).then(function(data){
    		if (data.status == 1){
    			dispatch(setTagCount(data.ext.tagCountData));	
    		}else if (data.status == 5) {
                dispatch(logoutDirect());
            }else {
    			//toastFail(data.msg);
    		}
    	}).catch(function(e){
    		toastFail('服务器错误');
    	})
    }
}
export function setTagCount(v){
	return {
		type : types.SET_TAG_COUNT,
		v
	}
}
export function clearTagCount(){
	return {
		type : types.CLEAR_TAG_COUNT
	}
}