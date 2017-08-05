import * as types from './types';
import { Toast } from 'antd-mobile';
import { push } from 'react-router-redux';
import 'whatwg-fetch';
import { getLocalUid, getLocalPassword, changeLocalPassword, toastLoading, toastSuccess, toastFail, toastInfo, toastHide } from '../utils/func';
import { SERVER_HOST_API } from './server_info';
import { logoutDirect } from './app';

export function initCreditRecordList(){
	return function(dispatch){
        toastLoading('正在加载...');
    	return fetch(SERVER_HOST_API + '/creditRecord/getList.json?uid=' + getLocalUid() + '&password=' + getLocalPassword()).then(function(res){
    		return res.json();
    	}).then(function(data){
            toastHide();
            if (data.status == 1){
                dispatch(setCreditRecordList(data.ext.creditRecordList));
            }else if (data.status == 5) {
                dispatch(logoutDirect());
            }else {
                //toastFail(data.msg, 1);
            }
    	}).catch(function(e){
            console.log(e);
            toastHide();
    		toastFail('服务器错误');
    	})
    }
}
export function setCreditRecordList(v){
	return {
		type : types.SET_CREDIT_RECORD_LIST,
		v
	}
}
export function getMoreCreditRecordList(page){
	return function(dispatch){
		toastLoading('正在获取...');
    	return fetch(SERVER_HOST_API + '/creditRecord/getList.json?uid=' + getLocalUid() + '&password=' + getLocalPassword() + '&p=' + page).then(function(res){
    		return res.json();
    	}).then(function(data){
    		toastHide();
    		if (data.status == 1){
    			dispatch(setMoreCreditRecordList(data.ext.creditRecordList));
    		}else if (data.status == 5) {
                dispatch(logoutDirect());
            }else {
    			toastInfo(data.msg);
    		}
    	}).catch(function(e){
            console.log(e);
    		toastFail('服务器错误');
    	})
    }
}
export function setMoreCreditRecordList(v){
	return {
		type : types.SET_MORE_CREDIT_RECORD_LIST,
		v
	}
}
export function addOneCreditRecord(v){
    return {
        type : types.ADD_ONE_CREDIT_RECORD,
        v
    }
}