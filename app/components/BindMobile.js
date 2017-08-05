import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Flex, List, InputItem, NavBar,  WingBlank, WhiteSpace, Icon, Button, Toast } from 'antd-mobile';
import { checkMobile, toastFail } from '../utils/func';

export default class BindMobile extends Component {
	constructor(props){
		super(props);
		this.state = {
			mobile : '',
			mobile_code : ''
		};
	}

	doSendCode(){
		let { sendCode } = this.props;
		if (!checkMobile(this.state.mobile)){
			toastFail('请输入正确的手机号');
			return false;
		}
		sendCode(this.state.mobile, 2);
	}

	render() {
		let { bindMobile } = this.props;
		return (
				<div>
					<NavBar leftContent={<Link to='/' style={{color:'#108ee9'}} className='nabbar_link'>返回</Link>} mode="light" onLeftClick={(e) => {}}
					className='my_navbar_title'
				    >更换新手机号</NavBar>
					<WhiteSpace size="sm" />
					<div className='my_container_blank'></div>

					<List>
						<InputItem
					        name="mobile"
					        type="text"
					        value={this.state.mobile}
							onChange={(value)=>{this.setState({mobile:value});}}
					        placeholder="请填写新手机号"
					      >新手机号</InputItem>
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
				            <Flex.Item style={{'textAlign':'right', 'marginRight':'10px'}}>
				              <Button size="small" inline type="warning" className='my_small_btn' onClick={(e) => {this.doSendCode();}}>发送验证码</Button>
				            </Flex.Item>
				        </Flex>

				        <WhiteSpace size="md" />
						  <WingBlank size="md">
						  	<Button type="primary" onClick={(e) => {bindMobile(this.state.mobile, this.state.mobile_code);}}>提交</Button>
						  </WingBlank>
						  <WhiteSpace size="md" />
					  </List>

					  
				</div>
			);
	}
}