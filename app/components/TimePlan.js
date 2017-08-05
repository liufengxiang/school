import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Picker, List, InputItem, NavBar,  WingBlank, WhiteSpace, Icon, Button, Flex, Steps } from 'antd-mobile';
import { isLogin, getUid } from '../utils/func';

/*
//访问此组件需要已经完善了用户资料





*/
export default class TimePlan extends Component {
	render() {
		return (
				<div>
					<NavBar leftContent="返回" mode="light" onLeftClick={(e) => this.props.history.replace('/')}
				      rightContent={[<Icon key="0" type="user" />, <Icon key="1" type="search" />, <Icon key="2" type="plus" />]}
				    >时间规划</NavBar>

				    <WhiteSpace size="md" />

				    		<List>
						    	<List.Item extra={<Button disabled size="small" inline><Icon type="cross" /></Button>}>
						    		11:45 英语
						    	</List.Item>

						    	<List.Item multipleLine extra={<Button disabled size="small" inline><Icon type="check" /></Button>}>
						    		12:00 英语
						    	</List.Item>

						    	<List.Item extra={<Button type="primary" size="small" inline><Icon type="scan" /></Button>}>
						    		12:15 英语
						    	</List.Item>

						    	<List.Item extra={<Button disabled size="small" inline><Icon type="scan" /></Button>}>
						    		12:30 英语
						    	</List.Item>
						    </List>
				    

				    <WhiteSpace size="md" />
				</div>
			);
	}
}