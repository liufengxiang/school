import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Picker, List, InputItem, NavBar, WingBlank, WhiteSpace, Icon, Button, Flex } from 'antd-mobile';
import GoodsItem from './goods/GoodsItem';

export default class GoodsList extends Component {
	constructor(props){
		super(props);
		this.state = {
			curPage : 1
		}
	}

	getMore(){
		let { getMoreGoodsList } = this.props;
		let nextPage = this.state.curPage + 1;
		this.setState({
			curPage : nextPage
		});
		getMoreGoodsList(49, nextPage);
	}

	render() {
		let { goodsList } = this.props;
		return (
				<div>
					<NavBar mode="light" iconName="" className='my_navbar_title'>商品列表</NavBar>
				    <WhiteSpace size="sm" />
				    <div className='my_container_blank'></div>
				    
			    	<div className="goods_list_container">
			    		{
			    			goodsList.length > 0
			    			?
			    			goodsList.map(function(goods){
			    				return <GoodsItem key={goods.id} gid={goods.id} thumb={goods.thumb} title={goods.title} description={goods.description} score={goods.score} />
			    			})
			    			:
			    			<div className='no_record'>没有数据</div>
			    		}
			    	</div>
				    
				    <WhiteSpace size="sm" />
				    <WingBlank size="sm">
				    	<Button onClick={(e) => {this.getMore();}}>更多...</Button>
				    </WingBlank>
				    <WhiteSpace size="lg" />
			        <WhiteSpace size="lg" />
			        <WhiteSpace size="lg" />
			        <WhiteSpace size="lg" />
			        <WhiteSpace size="sm"/>
				</div>
			);
	}
}