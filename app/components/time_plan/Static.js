import React, { Component, PropTypes } from 'react';
import { List,  WingBlank, WhiteSpace, Icon, Button, Flex } from 'antd-mobile';
//import { timeList } from '../../data/timeList';

class Static extends Component {
	constructor(props){
		super(props);
	}

	render() {
		let {startIndex, endIndex, title, weekId, timeList} = this.props;
		let len = endIndex - startIndex;
		//let outHeight = (45 * len) + 'px';
		//let innerHeight = (45 * len - 10) + 'px';
		let innerHeight = (45 * len) + 'px';
		let timeLineList = [];
		for (let i = startIndex; i <= endIndex; i ++){
			timeLineList.push(timeList.dataList[i]);
		}

		return (
				<div className='time_plan_block static_block' style={{height:innerHeight}}>
					<div className='left_time_container'>
						{timeLineList.map(function(item){
							return (<div key={item}>{item}</div>);
						})}
					</div>
					<div className='title_container static_title'>{title}</div>
				</div>
			);
	}
}

Static.defaultProps = {
    startIndex : 0,
    endIndex : 0,
    title : ''
}

Static.propTypes = {
    startIndex: PropTypes.number.isRequired,
    endIndex: PropTypes.number.isRequired,
    title: React.PropTypes.string.isRequired,
}

export default Static;