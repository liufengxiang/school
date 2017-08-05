import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Picker, List, InputItem, NavBar,  WingBlank, WhiteSpace, Icon, Button, Toast } from 'antd-mobile';
import { toastFail } from '../utils/func';

export default class ChangePassword extends Component {
	constructor(props){
		super(props);
		this.state = {
			oldpassword : '',
			newpassword : '',
			renewpassword : ''
		};
	}

	doChangePassword(oldpassword, newpassword, renewpassword){
		//判断的语句不能放在action中
		let { changePassword } = this.props;
		if (oldpassword.length == 0 || newpassword.length == 0 || renewpassword.length == 0) {
			toastFail('请完善表单', 1);
			return false;
		};
		if (newpassword != renewpassword) {
			toastFail('两次新密码不同', 1);
			return false;
		};
		changePassword(oldpassword, newpassword, renewpassword);
	}

	render() {
		return (
				<div>
					<NavBar leftContent={<Link to='/' style={{color:'#108ee9'}} className='nabbar_link'>返回</Link>} mode="light" onLeftClick={(e) => {}}
					className='my_navbar_title'
				    >修改密码</NavBar>
					<WhiteSpace size="sm" />
					<div className='my_container_blank'></div>
					
					<List>
					  <InputItem
				        name="oldpassword"
				        type="password"
				        labelNumber={4}
				        value={this.state.oldpassword}
						onChange={(value)=>{this.setState({oldpassword:value});}}
				        placeholder="请填写旧密码"
				      >旧密码</InputItem>
				      <InputItem
				        name="newpassword"
				        type="password"
				        labelNumber={4}
				        value={this.state.newpassword}
						onChange={(value)=>{this.setState({newpassword:value});}}
				        placeholder="请填写新密码"
				      >新密码</InputItem>
				      <InputItem
				        name="renewpassword"
				        type="password"
				        labelNumber={4}
				        value={this.state.renewpassword}
						onChange={(value)=>{this.setState({renewpassword:value});}}
				        placeholder="请填再次输入新密码"
				      >确认密码</InputItem>

					  <WhiteSpace size="md" />
					  <WingBlank size="md">
					  	<Button type="primary" onClick={(e) => {this.doChangePassword(this.state.oldpassword, this.state.newpassword, this.state.renewpassword);}}>确定修改</Button>
					  </WingBlank>
					  <WhiteSpace size="md" />
					</List>  
				</div>
			);
	}
}