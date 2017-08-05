import React, { Component, PropTypes } from 'react';
import { Picker, List, InputItem, NavBar,  WingBlank, WhiteSpace, Icon, Button } from 'antd-mobile';
import Not from './profile/Not';
import Ok from './profile/Ok';

export default class Profile extends Component {
	constructor(props){
		super(props);
	}

	componentWillMount(){
		let { uinfo, initProfile } = this.props;
		if (uinfo.isComplete == 1){ //已经完善了资料，才能获取资料
			if (typeof(uinfo.profile) == 'undefined'){ //如果没有数据(只有初始数据)，则获取。通常是第一次加载的时候
				initProfile(); //获取到了后，会set一下这个值，所以这个地方只会执行一次
			}
		}

		//完善资料相关
		//因为App需要needComplete，所以如果没有完善资料，这里是undefined
		if (uinfo.isComplete == 0 || typeof(uinfo.isComplete) == 'undefined'){
			console.log('not complete, do init...');
			let { sxnb, initSchoolList, initXiList, initNianjiList, initBanjiList } = this.props;
			if (typeof(sxnb.schoolList) == 'undefined'){
				initSchoolList();
			}
			if (typeof(sxnb.xiList) == 'undefined'){
				initXiList();
			}
			if (typeof(sxnb.nianjiList) == 'undefined'){
				initNianjiList();
			}
			if (typeof(sxnb.banjiList) == 'undefined'){
				initBanjiList();
			}
		}
	}

	render() {
		let { completeProfile, uinfo, sxnb } = this.props;
		return (
				<div>
					{uinfo.isComplete == 1 ? <Ok profile={uinfo.profile}/> : <Not completeProfile={completeProfile} sxnb={sxnb} />}
				</div>
			);
	}
}