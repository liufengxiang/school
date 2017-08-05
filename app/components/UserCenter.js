import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Picker, List, InputItem, NavBar,  WingBlank, WhiteSpace, Icon, Button, Badge } from 'antd-mobile';

export default class UserCenter extends Component {
	constructor(props){
		super(props);
	}

	render() {
		let { uinfo, loginInfo, logout } = this.props;
		return (
				<div>
					<NavBar mode="light" iconName="" className='my_navbar_title'>会员中心</NavBar>
				    <WhiteSpace size="sm" />
				    <div className='my_container_blank'></div>
				    
					<List>
						<List.Item
				          thumb="./images/icon_me2.png"
				          arrow="horizontal"
				          extra={uinfo.isComplete == 1 ? '已完善' : '请先完善资料'}
				          error={uinfo.isComplete == 1}
				        ><Link to="/profile">{uinfo.isComplete == 1 ? '点击查看' : '完善资料'}</Link></List.Item>
				        <List.Item
				          thumb="./images/icon_bindmobile2.png"
				          arrow="horizontal"
				          extra={typeof(uinfo.baseUinfo) == 'undefined' ? '...' : uinfo.baseUinfo.mobile}
				          error
				        ><Link to="/bind-mobile">更换新手机号</Link></List.Item>

				        {/*
				        <List.Item
				          thumb="./images/icon_bindmobile2.png"
				          arrow="horizontal"
				          extra={typeof(loginInfo.device_id_state) == 'undefined' ? '...' : (loginInfo.device_id_state == 0 ? <span>未绑定此设备</span> : <span>已绑定此设备</span>)}
				          error
				        >
				        {typeof(loginInfo.device_id_state) == 'undefined' ? <div className='list_item_not_click'>绑定设备</div> : (loginInfo.device_id_state == 0 ? <Link to="/bind-device-id">绑定设备</Link> : <div className='list_item_not_click'>绑定设备</div>)}
				        </List.Item>
				        */}

				        <List.Item
				          thumb="./images/icon_changepassword2.png"
				          arrow="horizontal"
				        ><Link to="/change-password">修改密码</Link></List.Item>
				        <List.Item
				          thumb="./images/icon_exchange2.png"
				          arrow="horizontal"
				          error
				        ><Link to="/exchange-list">兑换记录</Link></List.Item>
				        <List.Item
				          thumb="./images/icon_score2.png"
				          arrow="horizontal"
				          extra={'积分：' + (typeof(uinfo.baseUinfo) == 'undefined' ? '...' : uinfo.baseUinfo.score)}
				          error
				        ><Link to="/credit-record-list">积分记录</Link></List.Item>

				        {/*
				        <List.Item
				          thumb="./images/icon_msg2.png"
				          arrow="horizontal"
				          extra={<Badge text={77} />}
				          error
				        ><Link to="/message-list">站内信</Link></List.Item>
				    	*/}

				        <WhiteSpace size="md" />
				        <WingBlank size="md">
					  		<Button type="primary" onClick={(e) => {logout();}}>退出登录</Button>
						</WingBlank>
						<WhiteSpace size="md" />
				    </List> 
				</div>
			);
	}
}