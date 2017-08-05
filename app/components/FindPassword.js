import React, { Component, PropTypes } from 'react';
import { InputItem, Button, WingBlank, WhiteSpace, List, Flex, NavBar, Icon, Toast, Modal } from 'antd-mobile';
import { Link } from 'react-router';
import { checkMobile, toastFail } from '../utils/func';

export default class FindPassword extends Component {
	constructor(props){
		super(props);
		this.state = {
			username 	: '',
			mobile 		: '',
			mobile_code : ''
		}
	}

	_checkUsernameMobile(username, mobile){
		if (username.length == 0){
			toastFail('请填写用户名');
			return false;
		}
		if (!checkMobile(mobile)){
			toastFail('请输入正确的手机号');
			return false;
		}
		return true;
	}

	doSendCode(){
		//因为发送前，要验证用户名和手机是否匹配，防止恶意发短信. sendCode会要求uid和password, 
		//而sendCodeWithoutLogin是没有这些信息的，所以找回密码时需要username和mobile
		//而注册时是没有办法处理的
		let { sendCodeWithoutLogin } = this.props;
		if (this._checkUsernameMobile(this.state.username, this.state.mobile)) {
			sendCodeWithoutLogin(this.state.mobile, 3, this.state.username);	
		}
	}

	doFindPassword(){
		let { findPassword } = this.props;
		if (this._checkUsernameMobile(this.state.username, this.state.mobile)) {
			if (this.state.mobile_code.length == 0){
				toastFail('请输入验证码');
				return false;
			}
			findPassword(this.state.username, this.state.mobile, this.state.mobile_code);
		}
	}

	render() {
		let { login, gotoRegister, gotoFindPassword } = this.props;
		
		return (
				<div>
					<NavBar leftContent={<Link to='/login' style={{color:'#108ee9'}} className='nabbar_link'>返回</Link>} mode="light" onLeftClick={(e) => {}}
					className='my_navbar_title'
				    >找回密码</NavBar>
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
						        type="text"
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
						  <WingBlank size="md">
						  	<Button type="primary" onClick={(e) => {this.doFindPassword();}}>立即找回</Button>
						  </WingBlank>
						  <WhiteSpace size="md" />
					  </List> 
				</div>
			);
	}
}