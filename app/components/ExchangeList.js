import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Picker, List, InputItem, NavBar, WingBlank, WhiteSpace, Icon, Button, Flex, Card } from 'antd-mobile';
import { getLocalTime2 } from '../utils/func';

export default class ExchangeList extends Component {
	constructor(props){
		super(props);
		this.state = {
			curPage : 1
		}
	}

	getMore(){
		let { getMoreCashList } = this.props;
		let nextPage = this.state.curPage + 1;
		this.setState({
			curPage : nextPage
		});
		getMoreCashList(nextPage);
	}

	componentWillMount(){
		let { cashList, initCashList } = this.props;
		if (cashList.length == 0){
			initCashList();
		}
	}

	render() {
		let { cashList } = this.props;

		return (
				<div>
					<NavBar leftContent={<Link to='/' style={{color:'#108ee9'}} className='nabbar_link'>返回</Link>} mode="light" onLeftClick={(e) => {}}
					className='my_navbar_title'
				    >兑换记录</NavBar>
				    <WhiteSpace size="sm" />
				    <div className='my_container_blank'></div>

				    <div className='exchange_list_container'>
				    {
				    	cashList.length > 0
				    	?
				    	cashList.map(function(item){
				    		return (
				    				<div key={item.id} className='exchange_item'>
								    	<div className='exchange_goods_title'>{item.title}</div>
								    	<div className='exchange_info'>
								    		<div>积分数：{item.score}</div>
								    		<div>兑换时间：{getLocalTime2(item.create_time)}</div>
								    		<div>通过</div>
								    	</div>
								    </div>
				    			)
				    	})
				    	:
				    	<div className='no_record'>没有记录</div>
				    }
				    </div>
				    <WhiteSpace size="sm" />
				    <Button onClick={(e) => {this.getMore();}}>更多...</Button>
				    <WhiteSpace size="md" />
				</div>
			);
	}
}