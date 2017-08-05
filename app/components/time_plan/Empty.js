import React, { Component, PropTypes } from 'react';
import { List,  WingBlank, WhiteSpace, Icon, Button, Flex, Popup, Picker, Menu, InputItem, Toast } from 'antd-mobile';
//import { timeList } from '../../data/timeList';
import { getPickerData, getPickerText, toastFail } from '../../utils/func';

class Empty extends Component {
	constructor(props){
		super(props);
		this.state = {
			selectedCateId : 0,
			selectedTagId : 0,
			startIndex : 0,
			endIndex : 0,
			btnDisabled : false
		};
	}

	getLabel(cateId, tagId, cateObjList, tagObjList, type = 'all'){
		let label = '请选择标签';
		if (cateId > 0 && tagId > 0){ //点击“添加标签”按钮弹出popup时，就会执行此方法，此时cateId, tagId都为0
			let cateKey 	= 'qrcode_category_' + cateId;
			let cateTitle 	= cateObjList[cateKey].title;
			let tagKey	 = 'qrcode_' + tagId;
			let tagTitle = tagObjList[tagKey].title
			label = type == 'all' ? (cateTitle + ' --> ' + tagTitle) : tagTitle;
		}
		return label;
	}

	showAdd(startIndex, endIndex) {
		let { tags, timeList } = this.props;
		let el = <div>
	      <List>
	      	<div className='popup_title title_underline'>
	          <div>添加标签</div>
	          <div><span onClick={() => Popup.hide()}><Icon type="cross" /></span></div>
	        </div>
	        <Picker 
	        	style={{height:Math.round(document.documentElement.clientHeight / 2)}}
	        	data={getPickerData(startIndex, endIndex, timeList.dataList)} 
	        	//value={[this.state.startIndex, this.state.endIndex]} //默认是此标签的开始与结束ID,不能加，因为会打开时就有显示，并且没有入state，提交会报错
	        	title="开始 --> 结束" 
	        	cols={2} 
	        	onChange={(v) => {this.setState({startIndex:v[0], endIndex:v[1]}); let me=this; setTimeout(function(){Popup.hide(); me.showAdd(startIndex, endIndex);}, 1);}} //点击“确定”时触发
	        	onPickerChange={(v) => {this.setState({startIndex:v[0], endIndex:v[1]});}} //滚动时触发
	        	extra={getPickerText(this.state.startIndex, this.state.endIndex, timeList.objList)}
	        	>
	          <List.Item arrow="horizontal">时间段</List.Item>
	        </Picker>

	        <Picker 
	        	style={{height:Math.round(document.documentElement.clientHeight / 2)}}
	        	data={tags.dataList} 
	        	//value={[tags.dataList[0].value, tags.dataList[0].children[0].value]} //默认是第一个分类的第一个元素，不能加，否则一打开就有显示，且没有入state，提交会报错
	        	title="分类 --> 标签" 
	        	cols={2} 
	        	onChange={(v) => {this.setState({selectedCateId:v[0], selectedTagId:v[1]}); let me=this; setTimeout(function(){Popup.hide(); me.showAdd(startIndex, endIndex);}, 1);}} 
	        	onPickerChange={(v) => {this.setState({selectedCateId:v[0], selectedTagId:v[1]});}} 
	        	extra={this.getLabel(this.state.selectedCateId, this.state.selectedTagId, tags.cateObjList, tags.tagObjList, '')}
	        	>
	          <List.Item arrow="horizontal">标签</List.Item>
	        </Picker>
	      </List>
	      <WingBlank>
	      	<WhiteSpace />
	      	<Button type="primary" onClick={() => this.doAddTag()}>添加</Button>
	      	<WhiteSpace />
	      </WingBlank>
	    </div>
    	Popup.show(el, { animationType: 'slide-up', maskClosable : false });
  	}

  	doAddTag(){ //weekId可以通过函数参数来传递，也可以直接通过props取得
  		let { startIndex, endIndex, addEmpty, addStatic, addTag, delTag, mergeTag, weekId, tags } = this.props;

  		//判断 //this.state.startIndex可以为0，因为第一个时间点的下标就是0
  		if (this.state.selectedCateId * this.state.selectedTagId * this.state.endIndex == 0){
  			toastFail('请选择时间段和标签');
  			return false;
  		}

  		var selectedLabel = this.getLabel(this.state.selectedCateId, this.state.selectedTagId, tags.cateObjList, tags.tagObjList, '');
  		delTag(startIndex, endIndex, weekId); //删除原来的，添加新添加的，添加碎片
  		addTag(this.state.startIndex, this.state.endIndex, this.state.selectedTagId, selectedLabel, weekId);
  		if (this.state.startIndex == startIndex && this.state.endIndex == endIndex) { 
  			//nothing
  			mergeTag(this.state.startIndex, this.state.endIndex, this.state.selectedTagId, selectedLabel, weekId, 'all');
		}else if (this.state.startIndex == startIndex && this.state.endIndex < endIndex){ 
			addEmpty(this.state.endIndex, endIndex, weekId);
			mergeTag(this.state.startIndex, this.state.endIndex, this.state.selectedTagId, selectedLabel, weekId, 'up');
		}else if (this.state.startIndex > startIndex && this.state.endIndex == endIndex){ 
			addEmpty(startIndex, this.state.startIndex, weekId);
			mergeTag(this.state.startIndex, this.state.endIndex, this.state.selectedTagId, selectedLabel, weekId, 'down');
		}else if (this.state.startIndex > startIndex && this.state.endIndex < endIndex){ 
			addEmpty(startIndex, this.state.startIndex, weekId);
			addEmpty(this.state.endIndex, endIndex, weekId);
		}
	  	Popup.hide();

	  	//将上面选中的值归0，因为会出现点击其它“添加”按钮出来的弹出窗口默认就有这些上面已经选中的值，直接“确定”会造成key重复
	  	this.setState({selectedCateId:0, selectedTagId:0, startIndex:0, endIndex:0});
	}

	componentWillMount(){
		let { weekId } = this.props;
		let date 	   = new Date();
		let day 	   = date.getDay();
		if ('week_' + day == weekId || weekId=='week_7' && day==0){ //不能添加当天
			this.setState({btnDisabled : true});
		}
	}

	render() {
		let {startIndex, endIndex, timeList} = this.props;
		let len = endIndex - startIndex;
		let timeLineList = [];
		//let outHeight = (45 * len) + 'px';
		//let innerHeight = (45 * len - 10) + 'px';
		let innerHeight = (45 * len) + 'px';
		for (let i = startIndex; i <= endIndex; i ++){
			timeLineList.push(timeList.dataList[i]);
		}

		return (
				<div className='time_plan_block empty_block' style={{height:innerHeight}}>
					<div className='left_time_containermy_navbar_title'>
						{timeLineList.map(function(item){
							return (<div key={item}>{item}</div>);
						})}
					</div>
					<div className='title_container'>
						{ 
							this.state.btnDisabled
							?
							<Button 
								onClick={(e) => {this.showAdd(startIndex, endIndex)}}
								inline
								size='large'
								disabled
								style={{backgroundColor:'#EEE', color:'#CCC'}}
								>
								当日不能编辑</Button>
							:
							<Button 
								onClick={(e) => {this.showAdd(startIndex, endIndex)}}
								inline
								size='large'
								style={{backgroundColor:'#b4e2fc', color:'#666'}}
								>
								添加标签</Button>
						}
					</div>
				</div>
			);
	}
}

//backgroundColor:'#b4e2fc', color:'white'
//backgroundColor:'#FFF', color:'#8e41ff'  背景图片时

Empty.defaultProps = {
    startIndex : 0,
    endIndex : 0,
    addTag : '',
    delTag : ''
}

Empty.propTypes = {
    startIndex: PropTypes.number.isRequired,
    endIndex: PropTypes.number.isRequired,
    addTag: PropTypes.func.isRequired,
    delTag: PropTypes.func.isRequired
}

export default Empty;