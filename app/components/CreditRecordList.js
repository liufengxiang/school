import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Picker, List, InputItem, NavBar,  WingBlank, WhiteSpace, Icon, Button } from 'antd-mobile';
import { getLocalTime } from '../utils/func';

export default class CreditList extends Component {
	constructor(props){
		super(props);
		this.state = {
			curPage : 1
		}
	}

	getMore(){
		let { getMoreCreditRecordList } = this.props;
		let nextPage = this.state.curPage + 1;
		this.setState({
			curPage : nextPage
		});
		getMoreCreditRecordList(nextPage);
	}

	componentWillMount(){
		let { creditRecordList, initCreditRecordList } = this.props;
		if (creditRecordList.length == 0){
			initCreditRecordList();
		}
	}

	render() {
		let { creditRecordList } = this.props;
		return (
				<div>
					<NavBar leftContent={<Link to='/' style={{color:'#108ee9'}} className='nabbar_link'>返回</Link>} mode="light" onLeftClick={(e) => {}}
					className='my_navbar_title'
				    >积分详情</NavBar>
				    <WhiteSpace size="sm" />
				    <div className='my_container_blank'></div>
					
					<div className='credit_list_container'>
				    {
				    	creditRecordList.length > 0 
				    	?
				    	creditRecordList.map(function(item){
				    		return (
				    				<div key={item.id} className='credit_item'>
								    	<div className='credit_title'>{item.remark}</div>
								    	<div className='credit_info'>
								    		<div>积分变动：{item.delta}</div>
								    		<div>操作时间：{getLocalTime(item.create_time)}</div>
								    	</div>
								    </div>
				    			)
				    	})
				    	:
				    	<div className='no_record'>没有记录</div>
				    }
				    </div>

					<WhiteSpace size="sm" />
					<WingBlank size="sm">
				    	<Button onClick={(e) => {this.getMore();}}>更多...</Button>
				    </WingBlank>
				    <WhiteSpace />
				</div>
			);
	}
}