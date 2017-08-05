import React, { Component, PropTypes } from 'react';
import { InputItem, Button, WingBlank, WhiteSpace, List, Flex, NavBar, Icon, Toast } from 'antd-mobile';
import { checkMobile, toastFail } from '../utils/func';

export default class Register extends Component {
	constructor(props){
		super(props);
		this.state = {
			username : '',
			mobile : '',
			mobile_code : '',
			password : '',
			repassword : ''
		};
	}

	doSendCode(){
		let { sendCodeWithoutLogin } = this.props;
		if (!checkMobile(this.state.mobile)){
			toastFail('请输入正确的手机号');
			return false;
		}
		sendCodeWithoutLogin(this.state.mobile, 1, '', api.deviceId); //api.deviceId
	}

	doRegister(username, mobile, mobile_code, password, repassword){
		let { register } = this.props;
		if (username.length == 0 || username.length > 30) {
			toastFail('用户名长度为1到30之间');
			return false;
		}
		if (!checkMobile(mobile)){
			toastFail('请输入正确的手机号');
			return false;
		}
		if (mobile_code.length == 0){
			toastFail('请输入验证码');
			return false;	
		}
		if (password.length < 6 || password.length > 30) {
			toastFail('密码长度为6到30之间');
			return false;
		}
		if (password != repassword) {
			toastFail('两次密码不同');
			return false;
		}
		register(username, mobile, mobile_code, password, repassword, api.deviceId); //api.deviceId
	}

	render() {
		let { gotoLogin } = this.props;
		return (
				<div>
					<NavBar iconName='' mode="light" onLeftClick={(e) => {}}
					className='my_navbar_title'
				    >新用户注册</NavBar>
					<WhiteSpace size="sm" />
					<div className='my_container_blank'></div>

					<List>
						<InputItem
							name="username"
							type="text"
							value={this.state.username}
							onChange={(value)=>{this.setState({username:value});}}
							placeholder="请输入用户名"
						  >用户名</InputItem>
						  <WhiteSpace size="md" />

						<InputItem
							name="mobile"
							type="text"
							value={this.state.mobile}
							onChange={(value)=>{this.setState({mobile:value});}}
							placeholder="请输入手机号"
						  >手机号</InputItem>
						  <WhiteSpace size="md" />

						  <Flex>
				            <Flex.Item style={{flex:3}}>
				              <InputItem
						        name="mobile_code"
						        type="number"
						        value={this.state.mobile_code}
								onChange={(value)=>{this.setState({mobile_code:value});}}
						        placeholder="请输入手机验证码"
						      >验证码</InputItem>
				            </Flex.Item>
				            <Flex.Item>
				              <Button type="warning" size="small" className='my_small_btn' inline onClick={(e) => {this.doSendCode();}}>发送验证码</Button>
				            </Flex.Item>
				          </Flex>
				          <WhiteSpace size="md" />

						  <InputItem
					        name="password"
					        type="password"
					        value={this.state.password}
							onChange={(value)=>{this.setState({password:value});}}
					        placeholder="请填写密码"
					      >密码</InputItem>


					      <WhiteSpace size="md" />
					      <InputItem
					        name="repassword"
					        type="password"
					        error={this.state.error_password}
					        value={this.state.repassword}
							onChange={(value)=>{this.setState({repassword:value});}}
					        placeholder="请填写确认密码"
					      >确认密码</InputItem>

					      <WhiteSpace size="md" />
						  <WingBlank size="md">
						  	<Button type="primary" onClick={(e) => {this.doRegister(this.state.username, this.state.mobile, this.state.mobile_code, this.state.password, this.state.repassword);}}>注册</Button>
						    <WhiteSpace size="sm" />
						  	<Button onClick={(e) => {gotoLogin();}}>已有账号，立即登录</Button>			
						  </WingBlank>
						  <WhiteSpace size="md" />
					  </List>
				</div>
			);
	}
}