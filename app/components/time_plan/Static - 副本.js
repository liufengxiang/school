import React, { Component, PropTypes } from 'react';
import { List,  WingBlank, WhiteSpace, Icon, Button, Flex } from 'antd-mobile';
import { timeList } from '../../data/timeList';

class Static extends Component {
	constructor(props){
		super(props);
	}

	render() {
		let {startIndex, endIndex, title, weekId} = this.props;
		let len = endIndex - startIndex;
		let outHeight = (45 * len) + 'px';
		let innerHeight = (45 * len - 10) + 'px';
		let timeLineList = [];
		for (let i = startIndex; i <= endIndex; i ++){
			timeLineList.push(timeList[i]);
		}

		return (
				<List.Item style={{height:outHeight}}>	    	
					<Flex>
						<Flex.Item className={'left_time_container'} style={{flexFlow:'column', height:innerHeight}}>
							{timeLineList.map(function(item){
								return (<div key={item}>{item}</div>);
							})}
						</Flex.Item>
						<Flex.Item style={{flex:6}}>
							<Button disabled style={{height:innerHeight}}>{title}</Button>
						</Flex.Item>
					</Flex>
				</List.Item>
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