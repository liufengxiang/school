import React, { Component, PropTypes } from 'react';
import { InputItem, Button, WingBlank, WhiteSpace, List, Flex, NavBar, Icon, Toast } from 'antd-mobile';
import { Link } from 'react-router';
import { checkMobile, parseMobile, toastFail, toastSuccess } from '../utils/func';

export default class Login extends Component {
	constructor(props){
		super(props);
		this.state = {
			username : '',
			password : '',
			mobile_code : '',
		}
	}

	doClear(){
		let { clearLoginMobile } = this.props;
		this.setState({mobile_code:''});
		clearLoginMobile();
	}

	doSendCode(){
		let { sendCodeWithoutLogin, loginInfo } = this.props;
		if (!checkMobile(loginInfo.mobile)){
			toastFail('请输入正确的手机号');
			return false;
		}
		sendCodeWithoutLogin(loginInfo.mobile, 4, '', ''); //只需要mobile和type，不需要username和device_id
	}

	//不为undefined肯不为''，才算有值，因为clear事件会把将设置为''
	_getMobile(){
		let { loginInfo } = this.props;
		let mobile = '';
		if (typeof(loginInfo.mobile) != 'undefined'){
			if (loginInfo.mobile.length > 0){
				mobile = loginInfo.mobile;
			}
		}
		return mobile;
	}

	doLogin(username, password){
		let { login } = this.props;
		if (username.length == 0 || password.length == 0){
			toastFail('请输入用户名和密码', 1);
			return false;
		}
		login(username, password, 863970021906268, this._getMobile(), this.state.mobile_code); //api.deviceId
	}

	componentWillMount(){
		let { checkLogin } = this.props;
		checkLogin();
	}

	render() {
		let { gotoRegister, gotoFindPassword, loginInfo } = this.props;
		return (
				<div>
					<NavBar iconName='' mode="light" onLeftClick={(e) => {}}
					className='my_navbar_title'
				    >用户登录</NavBar>
					<WhiteSpace size="sm" />
					<div className='my_container_blank'></div>

						<List>
						  <InputItem
					        name="mobile"
					        type="text"
					        value={this.state.username}
							onChange={(value)=>{this.setState({username:value}); this.doClear();}}
					        placeholder="请填写用户名"
					      >用户名</InputItem>


					      <WhiteSpace size="md" />
					      <InputItem
					        name="repassword"
					        type="password"
					        value={this.state.password}
							onChange={(value)=>{this.setState({password:value});}}
					        placeholder="请填写登录密码"
					      >密码</InputItem>

					      {
					      	(typeof(loginInfo.mobile) != 'undefined') &&  loginInfo.mobile.length > 0
					      	?
					      	<div>
						      	<WingBlank>
						      		<WhiteSpace size="md" />
						      		<div className='mobile_tip'>点击右侧按钮向<span className='mobile_span'>{parseMobile(loginInfo.mobile)}</span>发送验证码</div>
						      	</WingBlank>
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
					        </div>
					      	:
					      	''
					      }

					      <WhiteSpace size="md" />
						  <WingBlank size="md">
						  	<Button type="primary" onClick={(e) => {this.doLogin(this.state.username, this.state.password);}}>登录</Button>
						    <WhiteSpace size="sm" />
						  	<Button type="warning" onClick={(e) => {gotoFindPassword();}}>忘记密码，立即找回</Button>
						    <WhiteSpace size="sm" />
						  	<Button onClick={(e) => {gotoRegister();}}>没有账号，立即注册</Button>
						  </WingBlank>
						  <WhiteSpace size="md" />
					  </List>
				</div>
			);
	}
}