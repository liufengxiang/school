import React, { Component, PropTypes } from 'react';
import { List,  WingBlank, WhiteSpace, Icon, Button, Flex, Modal, Popup, Badge } from 'antd-mobile';
//import { timeList } from '../../data/timeList';
import { toastFail } from '../../utils/func';

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
		let {startIndex, endIndex, weekId, timeList} = this.props;
		let date 		= new Date();
		let startTime 	= timeList.dataList[startIndex];
		startTime 		= startTime.replace(/\s/g,"");
		let endTime 	= timeList.dataList[endIndex];
		endTime 		= endTime.replace(/\s/g,"");
		let day 		= date.getDay();
		if ('week_' + day == weekId || weekId=='week_7' && day==0){ //今天才能判断时间是否在中间
			if (this.isInTime(startTime, endTime)){
				this.setState({scanButtonDisabled : false}); //在时间段内才解禁
			}
		}else {
			this.setState({delButtonDisabled : false}); //不是当天，都可以删除，即当天的话就不能删除，与“添加按钮”=》“当天不可编辑”对应，因为“编辑”包含“删除”操作
		}
	}

	showScan() {
		//let { tags, timeList } = this.props;
		let el = <div>
			      	<div className='popup_title title_underline'>
			          <div>请扫描二维码</div>
			          <div><span onClick={() => {this.onClose();}}><Icon type="cross" /></span></div>
			        </div>

			        <div className='scan_container'>	 
		    			<div className="scan_box">
		    				<div className="scan_box_container">
		    					<div className="tip">
		    						<div>请扫描二维码</div>
		    						<div>{this.state.success ? '扫描成功' : ''}</div>
		    					</div>
		    				</div>
		    				<WhiteSpace size="md" />
		    				<Button type="primary" onClick={(e) => {this.doScan();}}>扫描</Button>
		    			</div>
					</div>
			    </div>
    	Popup.show(el, { animationType: 'slide-up', maskClosable : false });
  	}

  	doScan(){
		let { scanTag } = this.props;
		let me = this;
		var FNScanner = api.require('FNScanner');
		FNScanner.openView({
			//rect : {x:(api.winWidth - 200) / 2, y:(api.winHeight - 267), w:200, h:200},
			rect : {x:(api.winWidth - 200) / 2, y:(api.winHeight - 242), w:200, h:200},
		    autorotation: false
		}, function(ret, err) {
		    if (ret) {
		    	if (ret.eventType == 'success'){
		    		FNScanner.closeView();

		    		var baiduLocation = api.require('baiduLocation');
					baiduLocation.startLocation({
					    accuracy: '10m',
					    filter: 1,
					    autoStop: true
					}, function(locationRet, err) {
					    if (locationRet.status) {
					        let location = {lon:locationRet.longitude, lat:locationRet.latitude};
					        scanTag(location, ret.content);
					    } else {
					        toastFail('坐标获取失败');
					    }
					});
		    	}
		    } else {
		        toastFail('扫描失败,请重新扫描');
		    }
		});

	}

	onClose(){
		var FNScanner = api.require('FNScanner');
		FNScanner.closeView();
		Popup.hide()
	}

	render() {
		let {startIndex, endIndex, tagId, tagName, delTag, weekId, timeList, tagCountData} = this.props;


		/*console.log(tagCountData);
		console.log(weekId);
		let curTagCount = 0;
		if (typeof(tagCountData[weekId]) != 'undefined'){
			let weekData = tagCountData[weekId];
			if (typeof(weekData['tag_' + tagId]) != 'undefined'){
				let tagData = weekData['tag_' + tagId];
				console.log(tagData);
				console.log(tagData.count);
				let curTagCount = tagData.count;
				console.log('cur tag count:' + curTagCount);


			}
		}
		console.log('cur tag count:' + curTagCount);*/


		let len = endIndex - startIndex;
		//let outHeight = (45 * len) + 'px';
		//let innerHeight = (45 * len - 10) + 'px';
		let innerHeight = (45 * len) + 'px';
		let timeLineList = [];
		for (let i = startIndex; i <= endIndex; i ++){
			timeLineList.push(timeList.dataList[i]);
		}

		return (
				<div className='time_plan_block tag_block' style={{height:innerHeight}}>
					<div className='left_time_container'>
						{timeLineList.map(function(item){
							return (<div key={item}>{item}</div>);
						})}
					</div>
					<div className='title_container title_container_tag'>
						<div className='tag_title'>
							{tagName}
							{
								(typeof(tagCountData[weekId]) != 'undefined')
								?
									(typeof(tagCountData[weekId]['tag_' + tagId]) != 'undefined')
									?
									<Badge overflowCount={5000} text={tagCountData[weekId]['tag_' + tagId].count} style={{ marginLeft: 5 }} />
									:
									''
								:
								''
							}
						</div>
						<div>
							<Button inline size="small" disabled={this.state.scanButtonDisabled} type="warning" onClick={(e) => {this.showScan();}} style={{marginRight:'5px'}}>
								<Icon type="scan" />
							</Button>

							<Button inline size="small" disabled={this.state.delButtonDisabled} type="warning" onClick={(e) => {this.confirmDelTag(startIndex, endIndex, weekId);}}>
								<Icon type="cross" />
							</Button>
						</div>
					</div>
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