import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Picker, List, Toast, InputItem, NavBar, WingBlank, WhiteSpace, Icon, Button, Flex } from 'antd-mobile';
import { toastFail, showShareWx } from '../utils/func';

export default class Checkin extends Component {
	constructor(props){
		super(props);
		this.state = {
			cancleAble : false
		}
	}

	doCheckin(){
		let { checkin } = this.props;
		let me = this;
		var FNScanner = api.require('FNScanner');
		FNScanner.openView({
			//rect : {x:(api.winWidth - 200) / 2, y:82, w:200, h:200},
			rect : {x:(api.winWidth - 200) / 2, y:57, w:200, h:200},
		    autorotation: false
		}, function(ret, err) {
			me.setState({cancleAble : true});
		    if (ret) {
		    	if (ret.eventType == 'success'){
		    		me.setState({cancleAble : false});
		    		FNScanner.closeView();

		    		var baiduLocation = api.require('baiduLocation');
					baiduLocation.startLocation({
					    accuracy: '10m',
					    filter: 1,
					    autoStop: true
					}, function(locationRet, err) {
					    if (locationRet.status) {
					        let location = {lon:locationRet.longitude, lat:locationRet.latitude};
					        checkin(location, ret.content);
					    } else {
					        toastFail('坐标获取失败');
					    }
					});
		    	}
		    } else {
		        toastFail('扫描失败,请重新扫描');
		    }
		});

	}

	cancel(){
		var FNScanner = api.require('FNScanner');
		FNScanner.closeView();
		this.setState({cancleAble : false});
	}

	componentWillMount(){
		//console.log('componentWillMount');
	}

	render() {
		return (
				<div>
					<NavBar mode="light" iconName="" 
					className='my_navbar_title'
					rightContent={<Button inline size="small" className='my_small_btn' type="primary" onClick={(e) => {showShareWx('我刚刚在时间规划系统中签到了！！');}}>分享</Button>}
					>上课签到</NavBar>
				    <WhiteSpace size="sm" />
				    <div className='my_container_blank'></div>

					 <div className='scan_container'>	 
		    			<div className="scan_box">
		    				<div className="scan_box_container">
		    					<div className="tip">
		    						<div>请扫描教室二维码签到</div>
		    						<div>{this.state.success ? '扫描成功' : ''}</div>
		    					</div>
		    				</div>
		    				<WhiteSpace size="md" />
		    				<Button type="primary" onClick={(e) => {this.doCheckin();}}>签到</Button>
		    				<WhiteSpace size="sm" />
		    				{this.state.cancleAble ? <Button type="primary" onClick={(e) => {this.cancel();}}>取消</Button> : <Button type="primary" disabled>取消</Button>}
		    			</div>
					</div>

				</div>
			);
	}
}