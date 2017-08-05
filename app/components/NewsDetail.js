import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Picker, List, InputItem, NavBar, WingBlank, WhiteSpace, Icon, Button, Modal } from 'antd-mobile';
import { getLocalTime2 } from '../utils/func';

export default class NewsDetail extends Component {
	constructor(props){
		super(props);
	}

	componentWillMount(){
		let { newsInfoList, getNewsInfo } = this.props;
		let id = this.props.params.id;
		let key = 'info_' + id;
		if (typeof(newsInfoList[key]) == 'undefined'){
			getNewsInfo(id);
		}
	}

	render() {
		let { newsInfoList } = this.props;
		let id = this.props.params.id;
		let key = 'info_' + id;
		let info = newsInfoList[key];
		
		return (
				<div>
					<NavBar leftContent={<Link to='/' style={{color:'#108ee9'}} className='nabbar_link'>返回</Link>} mode="light" 
					className='my_navbar_title'
					onLeftClick={(e) => {}}
				    >{typeof(info) != 'undefined' ? info.title : '...'}</NavBar>
				    <WhiteSpace size="sm" />
				    <div className='my_container_blank'></div>

				    <WingBlank size="sm">
				    	<div className='detail_info'>
				    		<div>发布时间：{typeof(info) != 'undefined' ? getLocalTime2(info.create_time) : '...'}</div>
				    	</div>
				    	<div className='detail_content'>{typeof(info) != 'undefined' ? info.content : '......'}</div>
				    	<WhiteSpace />
				    </WingBlank>
				    <WhiteSpace />
				</div>
			);
	}
}