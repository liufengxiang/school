import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Picker, List, InputItem, NavBar,  WingBlank, WhiteSpace, Icon, Button, Popup, Menu, Modal, Toast } from 'antd-mobile';
//import { schoolList } from '../../data/schoolList';
import { toastFail } from '../../utils/func';

export default class Not extends Component {
	constructor(props){
		super(props);
		this.state = {
			truename 	: '',
			school_id 	: 0,
			xi_id 		: 0,
			nianji_id 	: 0,
			banji_id 	: 0
		};
	}

	showContainer(key, stateKey, title){ //key: schoolList, xiList, nianjiList, banjiList
		let { sxnb } = this.props;
		let innerObj = sxnb[key];
		Popup.show(<div>
	      <div className='popup_title'>
	          <div>{title}</div>
	          <div><span onClick={() => Popup.hide()}><Icon type="cross" /></span></div>
	      </div>
      	  <Menu data={innerObj.dataList} value={[this.state[stateKey]]} level={1} onChange={(v) => {let obj={}; obj[stateKey] = v[0]; this.setState(obj);}} height={Math.round(document.documentElement.clientHeight / 3)} />
	    </div>, { animationType: 'slide-up' });
	}

	doComplete(){
		let { completeProfile } = this.props;
		if (this.state.truename.length == 0){
			toastFail('请填写真实姓名');
			return false;
		}
		if (this.state.school_id * this.state.xi_id * this.state.nianji_id * this.state.banji_id == 0){
			toastFail('请完善所有资料后提交');
			return false;
		}
		Modal.alert('提示', '提交后不可更改，确定提交吗?', [
		    { text: '取消', onPress: () => console.log('cancel') },
		    { text: '确定', onPress: () => completeProfile(this.state.truename, this.state.school_id, this.state.xi_id, this.state.nianji_id, this.state.banji_id) },
		  ]);
	}

	render() {
		let { sxnb } = this.props;
		return (
				<div>
					<NavBar leftContent={<Link to='/' style={{color:'#108ee9'}} className='nabbar_link'>返回</Link>} onLeftClick={(e) => {}} mode="light"
					className='my_navbar_title'
				    >完善资料</NavBar>
				    <WhiteSpace size="sm" />
				    <div className='my_container_blank'></div>

					<List style={{ backgroundColor: 'white' }}>
						<InputItem
						        name="truename"
						        type="text"
						        value={this.state.truename}
								onChange={(value)=>{this.setState({truename:value});}}
						        placeholder="请填写真实姓名"
						      >真实姓名</InputItem>

				        <WingBlank>
					      	<div className='select_btn' 
					      		onClick={(e) => {this.showContainer('schoolList', 'school_id', '请选择学校');}}>
					      		<span className='select_title'>选择学校：</span>
					      		{this.state.school_id > 0 ? sxnb.schoolList.objList['school_' + this.state.school_id]['title'] : <span className="select_text">请点击此处选择</span>}
					      	</div>
					      	<div className='select_btn' 
					      		onClick={(e) => {this.showContainer('xiList', 'xi_id', '请选择系');}}>
					      		<span className='select_title'>选 择 系 ：</span>
					      		{this.state.xi_id > 0 ? sxnb.xiList.objList['xi_' + this.state.xi_id]['title'] : <span className="select_text">请点击此处选择</span>}
					      	</div>
					      	<div className='select_btn' 
					      		onClick={(e) => {this.showContainer('nianjiList', 'nianji_id', '请选择年级');}}>
					      		<span className='select_title'>选择年级：</span>
					      		{this.state.nianji_id > 0 ? sxnb.nianjiList.objList['nianji_' + this.state.nianji_id]['title'] : <span className="select_text">请点击此处选择</span>}
					      	</div>
					      	<div className='select_btn' 
					      		onClick={(e) => {this.showContainer('banjiList', 'banji_id', '请选择班级');}}>
					      		<span className='select_title'>选择班级：</span>
					      		{this.state.banji_id > 0 ? sxnb.banjiList.objList['banji_' + this.state.banji_id]['title'] : <span className="select_text">请点击此处选择</span>}
					      	</div>
					      </WingBlank>
				    </List> 

				    <WhiteSpace size="sm" />
				    <WingBlank size="sm">
					<Button type="primary" onClick={e => {this.doComplete();}}>确定提交 （提交后不能更改！！）</Button>
					</WingBlank>
				</div>
			);
	}
}