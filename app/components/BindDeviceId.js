import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Flex, List, InputItem, NavBar,  WingBlank, WhiteSpace, Icon, Button, Toast } from 'antd-mobile';
import { checkMobile, parseMobile, toastFail } from '../utils/func';

export default class BindDeviceId extends Component {
	constructor(props){
		super(props);
		this.state = {
			mobile_code : ''
		};
	}

	doSendCode(){
		let { sendCode, uinfo } = this.props;
		/*if (!checkMobile(this.state.mobile)){
			toastFail('请输入正确的手机号');
			return false;
		}*/
		sendCode(uinfo.baseUinfo.mobile, 5);
	}

	doBindDeviceId(){
		let { bindDeviceId, uinfo } = this.props;
		if (this.state.mobile_code.length == 0) {
			toastFail('请输入手机验证码', 1);
			return false;
		};
		bindDeviceId(uinfo.baseUinfo.mobile, this.state.mobile_code, api.deviceId); //api.deviceId
	}

	render() {
		let { uinfo } = this.props;
		return (
				<div>
					<NavBar leftContent={<Link to='/' style={{color:'#108ee9'}} className='nabbar_link'>返回</Link>} mode="light" onLeftClick={(e) => {}}
					className='my_navbar_title'
				    >绑定新设备</NavBar>
					<WhiteSpace size="sm" />
					<div className='my_container_blank'></div>

					<List>
						<List.Item multipleLine wrap>
						<div className='list_item_title'>您正在将当前登录账号与此设备绑定！</div>
						<WhiteSpace size='sm'/>
						<div className='mobile_tip_middle'>我们将向<span className='mobile_span'>{typeof(uinfo.baseUinfo) == 'undefined' ? '...' : parseMobile(uinfo.baseUinfo.mobile)}</span>发送验证码</div>
						</List.Item>
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
						  	<Button type="primary" onClick={(e) => {this.doBindDeviceId();}}>确认绑定</Button>
						  </WingBlank>
						  <WhiteSpace size="md" />
					  </List>

					  
				</div>
			);
	}
}