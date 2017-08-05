import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Picker, List, InputItem, NavBar, WingBlank, WhiteSpace, Icon, Button, Flex } from 'antd-mobile';
import { getLocalTime2 } from '../utils/func';

export default class NewsList extends Component {
	constructor(props){
		super(props);
		this.state = {
			curPage : 1
		}
	}

	getMore(){
		let { getMoreNewsList } = this.props;
		let nextPage = this.state.curPage + 1;
		this.setState({
			curPage : nextPage
		});
		getMoreNewsList(41, nextPage);
	}

	render() {
		let { newsList } = this.props;
		return (
				<div>
					<NavBar mode="light" iconName="" className='my_navbar_title'>资讯列表</NavBar>
				    <WhiteSpace size="sm" />
				    <div className='my_container_blank'></div>
				    
				    <List>
				    {
		    			newsList.length > 0
		    			?
		    			newsList.map(function(news){
		    				return (
		    						<List.Item key={news.id}
		    							extra={getLocalTime2(news.create_time)}
		    						><Link to={{pathname:"news-detail/"+news.id}}>{news.title}</Link></List.Item>
		    					)
		    			})
		    			:
		    			<div className='no_record'>没有数据</div>
		    		}
				    </List>
				    
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