import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Picker, List, InputItem, NavBar,  WingBlank, WhiteSpace, Icon, Button, Flex, Modal, Popup, Menu } from 'antd-mobile';
import { isLogin, getUid } from '../utils/func';
import { timeList } from '../data/timeList';
import { schoolList } from '../data/schoolList';
import Static from './time_plan/Static';
import Empty from './time_plan/Empty';
import Tag from './time_plan/Tag';

export default class TimePlanAdd extends Component {
	constructor(props){
		super(props);
	}

	render() {
		let { timePlanList, addEmpty, addStatic, addTag, delTag } = this.props;
		return (
			<div>
					<NavBar mode="light" iconName=''
				      rightContent={<Button inline size="small" type="primary" onClick={(e)=>{alert('add');}}><Icon type="plus" /></Button>}
				    >时间规划</NavBar>

				    <WhiteSpace size="md" />
				    		<List>
				    			{
				    				timePlanList.map((item) => {
				    					if (typeof(item.title) != "undefined"){
				    						return <Static key={item.startIndex} startIndex={item.startIndex} endIndex={item.endIndex} title={item.title} />
					    				}else if (typeof(item.tagName) != "undefined"){
					    					return <Tag key={item.startIndex} startIndex={item.startIndex} endIndex={item.endIndex} tagName={item.tagName} delTag={delTag} />
					    				}else {
					    					return <Empty key={item.startIndex} startIndex={item.startIndex} endIndex={item.endIndex} addEmpty={addEmpty} addStatic={addStatic} addTag={addTag} delTag
					    					={delTag} />
					    				}
				    				})

				    			}
						    	<List.Item><Button>Here1</Button></List.Item>
						    	<List.Item><Button>Here2</Button></List.Item>
						    </List>
				    <WhiteSpace size="md" />


				</div>

			);
	}
}