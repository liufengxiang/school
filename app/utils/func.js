import React, { Component, PropTypes } from 'react';
import { Toast, Modal, Popup, List, Icon, WingBlank, WhiteSpace, Button } from 'antd-mobile';
//import { timeList } from '../data/timeList';

export function isLogin(){
	let local_uid = localStorage.getItem("local_uid");
	if (local_uid == null || typeof(local_uid) == 'undefined' || local_uid == 0){
		return false;
	}
	return true;
}

export function isComplete(){
	let local_isComplete = localStorage.getItem("local_isComplete");
	if (local_isComplete == null || typeof(local_isComplete) == 'undefined' || local_isComplete == 0){
		return false;
	}
	return true;
}

export function getLocalUid(){
	let local_uid = 0;
	if (isLogin()){
		local_uid = localStorage.getItem("local_uid");
	}
	return local_uid;
}

export function getLocalPassword(){
	let local_password = '';
	if (isLogin()){
		local_password = localStorage.getItem("local_password");
	}
	return local_password;
}

export function changeLocalPassword(v){
	localStorage.setItem("local_password", v);
}

export function doLogin(data){
	localStorage.setItem("local_uid", data.uid);
	localStorage.setItem("local_password", data.password);
}

export function doLogout(){
	localStorage.removeItem("local_uid");
	localStorage.removeItem("local_password");
}

export function needAuth(nextState, replace){
    if (!isLogin()) {
        replace({ pathname: '/login' }); //未登录时跳转到登录页
    }
}

export function needComplete(nextState, replace){
    if (!isLogin()) {
        replace({ pathname: '/login' }); //未登录时跳转到登录页
    }
    if (!isComplete()){
    	replace({ pathname: '/profile' });
    }
}

export function doGet(url){
	Toast.loading('正在加载...',  600);
	fetch(url).then(function(res){  //请求成功
		if (res.ok) {  //WEB服务器程序处理成功 (包括注册成功，注册失败：可能由于已经有了相同数据)
			res.json().then(function(data){
				Toast.hide();
				if (data.status == 1){ //程序处理成功，但处理的结果可能有正确和错误
					Toast.success(data.msg, 1);
				}else {
					Toast.fail(data.msg, 1);
				}
			});
		}else if (res.status == 401) {
		    Toast.hide();
		    Toast.fail('没有权限');
		}
	}, function(err){ //请求失败
		Toast.hide();
		Toast.fail('加载失败');
	});
}

//在promise中无法更改返回值
//所以在外部无法知道操作结果来实现跳转
// go => this.props.history.replace()
export function doPost(url, body, jumpUrl, go, callbackFunc){
	callbackFunc = callbackFunc || '';
	Toast.loading('正在提交...',  600);
	fetch(url, {
		method:'POST', 
		headers: {
				    "Content-Type": "application/x-www-form-urlencoded" //指定了后请求的header就是Form data,而不是request payload
				  }, 
			body : body
	}).then(function(res){  //请求成功
		if (res.ok) {  //WEB服务器程序处理成功 (包括注册成功，注册失败：可能由于已经有了相同数据)
			res.json().then(function(data){
				Toast.hide();
				if (data.status == 1){ //程序处理成功，但处理的结果可能有正确和错误
					Toast.success(data.msg, 2);
					if (callbackFunc != ''){
						callbackFunc(data.ext); //将ext中所有数据传入callbackFunc中,对应的方法中取所需的key
					}
					go(jumpUrl);
				}else {
					Toast.fail(data.msg, 2);
				}
			});
		}else if (res.status == 401) {
		    Toast.hide();
		    Toast.fail('没有权限');
		}
	}, function(err){ //请求失败
		Toast.hide();
		Toast.fail('提交失败');
	});
}

export function getPickerData(startIndex, endIndex, timeList){
	let pickerData = [];
	let pickerItem = {};
	for (let m = startIndex; m < endIndex; m ++){
		let children = [];
		let childrenItem = {};
		for (let n = m + 1; n <= endIndex; n ++){
			childrenItem = {value:n, label:timeList[n]}; 
			children.push(childrenItem);
		}
		pickerItem = {value:m, label:timeList[m], children:children};
		pickerData.push(pickerItem);
	}
	return pickerData;
}

//{"time_0":"06 : 00","time_1":"06 : 15","time_2":"06 : 30", ...}
export function getPickerText(startIndex, endIndex, objList){
	let txt = '请选择时间段';
	if (startIndex < endIndex){
		let startKey = 'time_' + startIndex;
		let startTxt = objList[startKey]
		let endKey = 'time_' + endIndex;
		let endTxt = objList[endKey]
		txt = startTxt + ' -> ' + endTxt;
	}
	return txt;
}

export function getLocalTime(nS) {
   return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ').replace(/上午|下午/g, "");     
}

export function getLocalTime2(nS) {     
   return new Date(parseInt(nS) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ").replace(/上午|下午/g, "").substr(0,10);      
}

export function checkMobile(mobile){  
    var length = mobile.length;  
    if(length == 11 && /^(((13[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(14[0-9]{1})|)+\d{8})$/.test(mobile)){  
        return true;  
    }
    return false;
}

export function parseMobile(mobile){
	mobile = mobile.substr(0, 3) + '****' + mobile.substr(6);
	return mobile;
}

export function toastLoading(msg = '正在加载...', duration = 600, text = ''){
	if (typeof(api) == 'undefined'){
		Toast.loading(msg, duration);
	}else {
		api.showProgress({
		    style: 'default',
		    animationType: 'fade',
		    title: msg,
		    text: text,
		    modal: true
		});
	}
}

export function toastSuccess(msg, duration = 1, location = 'bottom'){
	if (typeof(api) == 'undefined'){
		Toast.success(msg, duration);
	}else {
		api.toast({
		    msg: msg,
		    duration: duration * 1000,
		    location: location
		});
	}
}

export function toastFail(msg = '服务器错误', duration = 1, location = 'bottom'){
	if (typeof(api) == 'undefined'){
		Toast.fail(msg, duration);
	}else {
		api.toast({
		    msg: msg,
		    duration: duration * 1000,
		    location: location
		});
	}
}

export function toastInfo(msg, duration = 1, location = 'bottom'){
	if (typeof(api) == 'undefined'){
		Toast.info(msg, duration);
	}else {
		api.toast({
		    msg: msg,
		    duration: duration * 1000,
		    location: location
		});
	}
}

export function toastHide(){
	if (typeof(api) == 'undefined'){
		Toast.hide();
	}else {
		api.hideProgress();
	}
}

export function myConfirm(title, msg, cancelText='取消', okText='确定'){
	if (typeof(api) == 'undefined'){
		Modal.alert(title, msg, [
		    { text: cancelText, onPress: () => {return 0;}},
		    { text: okText, onPress: () => {return 1;}},
		  ]);
	}else {
		api.confirm({
		    title: title,
		    msg: msg,
		    buttons: [cancelText, okText]
		}, function(ret, err) {
		    var index = ret.buttonIndex;
		    if (index == 1){ //cancel
		    	return 0;
		    }
		    return 1;
		});
	}

}

export function initJiguang(){
	if (typeof(api) == 'undefined'){
		//console.log('not init api');
	}else {
		//alert('init api already');
		var ajpush = api.require('ajpush');  
	    var param = {  
	        alias : 'stu_' + getLocalUid()
	        //tags : ['tag1', 'tag2']  
	    };  
	    ajpush.bindAliasAndTags(param, function(ret) {  
	        var statusCode = ret.statusCode;  
	        //alert('alias : '+'stu_' + getLocalUid())
	        //alert('statusCode :' + statusCode );
	    });  
	    ajpush.init(function(ret) {  
	        if (ret && ret.status) {  
	            //success  
	            /*ajpush.setListener(function(ret) {  
	                var id = ret.id;  
	                var title = ret.title;  
	                var content = ret.content;  
	                var extra = ret.extra;  
	                console.log("id=" + id + ",title=" + title + ",content=" + content + ",extra=" + extra);  
	            });*/  
	            //alert('极光初始化成功');
	        }else {
	        	//alert('极光初始化失败');
	        }
	    });
	}
}

export function getTodayDate(){
	let v = '';
	let myDate 		= new Date();
    let fullYear 	= myDate.getFullYear();    //获取完整的年份(4位,1970-????)
    let month 		= myDate.getMonth() + 1;       //获取当前月份(0-11,0代表1月)
    let date 		= myDate.getDate();
    v = fullYear + '/' + month + '/' + date;
    return v;
}

export function showShareWx(v, type = 'text'){
	//console.log('abc'); return false;
	if (type == 'text'){
		let el = <div>
	      <List>
	      	<div className='popup_title title_underline'>
	          <div>分享</div>
	          <div><span onClick={() => Popup.hide()}><Icon type="cross" /></span></div>
	        </div>
	        <div className='wx_text_content'>{v}</div>
	      </List>
	      <WingBlank>
	      	<WhiteSpace />
	      	<Button type="primary" onClick={() => {shareTextToWx(v); Popup.hide();}}>分享到微信朋友圈</Button>
	      	<WhiteSpace />
	      </WingBlank>
	    </div>
		Popup.show(el, { animationType: 'slide-up', maskClosable : false });
	}else {
		alert('未知类型');
	}
}
function shareTextToWx(text){
	var wx = api.require('wx');
	wx.isInstalled(function(ret, err) {
	    if (ret.installed) {
	        wx.shareText({
			    apiKey: '',
			    scene: 'timeline',
			    text: text
			}, function(ret, err) {
			    if (ret.status) {
			        toastSuccess('分享成功');
			    } else {
			        //错误码：
	                //-1（未知错误）
	                //0（成功）
	                //1（apiKey非法）
	                //2（用户取消）
	                //3（发送失败）
	                //4（授权拒绝）
	                //5（微信服务器返回的不支持错误）
	                //6 (当前设备未安装微信客户端)
	                //7 (注册SDK失败)
	                if (err.code == 2){
	                	toastFail('已取消');
	                }else if (err.code == 3){
	                	toastFail('发送失败');
	                }else if (err.code == 6){
	                	toastFail('当前设备未安装微信客户端');
	                }
			    }
			});
	    } else {
	        toastFail('当前设备未安装微信客户端');
	    }
	});
}