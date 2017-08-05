import React, { Component, PropTypes } from 'react';
import { List,  WingBlank, WhiteSpace, Icon, Button, Flex, Modal } from 'antd-mobile';
import { timeList } from '../../data/timeList';

class Static extends Component {
	constructor(props){
		super(props);
		this.state = {
			delButtonDisabled : true, //默认不能删除
			scanButtonDisabled : true, //默认不能扫描
		}
	}

	confirmDelTag(startIndex, endIndex, weekId){
		let { delTag } = this.props;
		Modal.alert('删除标签', '确定删除吗?', [
		    { text: '取消', onPress: () => console.log('cancel') },
		    { text: '确定', onPress: () => {
				delTag(startIndex, endIndex, weekId);
		    } },
		  ]);
	}

	isInTime(startTime, endTime){
		let date 		= new Date();
		let hour 		= date.getHours(); 
     	let minutes 	= date.getMinutes(); 
     	let startArr 		= startTime.split(':');
     	let startHour 		= parseInt(startArr[0]);
     	let startMinutes 	= parseInt(startArr[1]);
     	if (hour > startHour || (hour == startHour && minutes >= startMinutes)){
     		let endtArr 		= endTime.split(':');
	     	let endHour 		= parseInt(endtArr[0]);
	     	let endMinutes 		= parseInt(endtArr[1]);
	     	if (hour < endHour || (hour == endHour && minutes < endMinutes)){
	     		return true;
	     	}
     	}
     	return false;
	}

	componentWillMount(){
		//判断当前Tag是否可扫描，是否可删除
		let {startIndex, endIndex, weekId} = this.props;
		let date 		= new Date();
		let startTime 	= timeList[startIndex];
		startTime 		= startTime.replace(/\s/g,"");
		let endTime 	= timeList[endIndex];
		endTime 		= endTime.replace(/\s/g,"");
		let day 		= date.getDay();
		if ('week_' + day == weekId){ //今天才能判断时间是否在中间
			if (this.isInTime(startTime, endTime)){
				this.setState({scanButtonDisabled : false}); //在时间段内才解禁
			}
		}else {
			this.setState({delButtonDisabled : false});
		}
	}

	render() {
		let {startIndex, endIndex, tagName, delTag, weekId} = this.props;
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
							<div className={'tagInner'} style={{height:innerHeight}}>
								
								<div>
									{tagName}
								</div>
								<div>
									<Button inline size="small" disabled={this.state.scanButtonDisabled} type="warning" onClick={(e) => {}} style={{marginRight:'5px'}}>
										<Icon type="scan" />
									</Button>

									<Button inline size="small" disabled={this.state.delButtonDisabled} type="warning" onClick={(e) => {this.confirmDelTag(startIndex, endIndex, weekId);}}>
										<Icon type="cross" />
									</Button>
								</div>
							</div>
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