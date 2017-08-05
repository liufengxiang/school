import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Picker, List, InputItem, NavBar,  WingBlank, WhiteSpace, Icon, Button } from 'antd-mobile';

export default class Ok extends Component {
	constructor(props){
		super(props);
	}

	render() {
		let { profile } = this.props;
		return (
				<div>
					<NavBar leftContent={<Link to='/' style={{color:'#108ee9'}} className='nabbar_link'>返回</Link>} mode="light" onLeftClick={(e) => {}}
					className='my_navbar_title'
				    >用户资料</NavBar>
				    <WhiteSpace size="sm" />
				    <div className='my_container_blank'></div>

				    <List>
				      <List.Item
				        extra={typeof(profile) == 'undefined' ? '...' : profile.truename}
				        arrow="empty"
				        onClick={() => {}}
				      >
				        真实姓名
				      </List.Item>
				      <List.Item
				        extra={typeof(profile) == 'undefined' ? '...' : profile.school_name}
				        arrow="empty"
				      >
				        学校
				      </List.Item>
				      <List.Item
				        extra={typeof(profile) == 'undefined' ? '...' : profile.xi_name}
				        arrow="empty"
				      >
				        系
				      </List.Item>
				      <List.Item
				        extra={typeof(profile) == 'undefined' ? '...' : profile.nianji_name}
				        arrow="empty"
				      >
				        年级
				      </List.Item>
				      <List.Item
				        extra={typeof(profile) == 'undefined' ? '...' : profile.banji_name}
				        arrow="empty"
				      >
				        班级
				      </List.Item>
				    </List>
				</div>
			);
	}
}