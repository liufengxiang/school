import React, { Component, PropTypes } from 'react';
import { List,  WingBlank, WhiteSpace, Icon, Button, Flex, Popup, Picker, Menu, InputItem } from 'antd-mobile';
import { timeList } from '../../data/timeList';
import { getPickerData } from '../../utils/func';

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

	getLabel(cateId, tagId){
		let { tags } = this.props;
		for (var i = 0; i < tags.length; i ++){
			if (tags[i]['value'] == cateId){
				var children = tags[i]['children'];
				for (var j = 0; j < children.length; j ++){
					if (children[j]['value'] == tagId){
						return children[j]['label'];
					}
				}
			}
		}
	}

	showAdd(startIndex, endIndex) {
		let { tags } = this.props;
		let el = <div>
	      <List renderHeader={() => (
	        <div style={{ position: 'relative' }}>
	          <b>添加标签</b>
	          <span
	            style={{
	              position: 'absolute', right: 3, top: -5,
	            }}
	            onClick={() => Popup.hide()}
	          >
	            <Icon type="cross" />
	          </span>
	        </div>)
	      }
	      >
	        <Picker 
	        	data={getPickerData(startIndex, endIndex)} 
	        	title="开始->结束" 
	        	cols={2} 
	        	onChange={(v) => {this.setState({startIndex:v[0], endIndex:v[1]});}} 
	        	onPickerChange={(v) => {this.setState({startIndex:v[0], endIndex:v[1]});}} 
	        	extra=''
	        	>
	          <List.Item arrow="horizontal">开始->结束</List.Item>
	        </Picker>
	        <List.Item>
	        	<Menu height={250} data={tags} onChange={(value) => {this.setState({selectedCateId:value[0], selectedTagId:value[1]});}} />
	        </List.Item>
	      </List>
	       <ul style={{ padding: '0.18rem 0.3rem' }} className="popup-ul">
	        <li style={{ marginTop: '0.18rem' }}>
	          <Button type="primary" onClick={() => this.doAddTag()}>添加</Button>
	        </li>
	      </ul>
	    </div>
    	Popup.show(el, { animationType: 'slide-up', maskClosable : false });
  	}

  	doAddTag(){ //weekId可以通过函数参数来传递，也可以直接通过props取得
  		var selectedLabel = this.getLabel(this.state.selectedCateId, this.state.selectedTagId);
  		// console.log(selectedLabel); return false;
  		let { startIndex, endIndex, addEmpty, addStatic, addTag, delTag, weekId } = this.props;
  		delTag(startIndex, endIndex, weekId); //删除原来的，添加新添加的，添加碎片
  		addTag(this.state.startIndex, this.state.endIndex, this.state.selectedTagId, selectedLabel, weekId);
  		if (this.state.startIndex == startIndex && this.state.endIndex == endIndex) { 
  			//nothing
		}else if (this.state.startIndex == startIndex && this.state.endIndex < endIndex){ 
			addEmpty(this.state.endIndex, endIndex, weekId);
		}else if (this.state.startIndex > startIndex && this.state.endIndex == endIndex){ 
			addEmpty(startIndex, this.state.startIndex, weekId);
		}else if (this.state.startIndex > startIndex && this.state.endIndex < endIndex){ 
			addEmpty(startIndex, this.state.startIndex, weekId);
			addEmpty(this.state.endIndex, endIndex, weekId);
		}
	  	Popup.hide();
	}

	componentWillMount(){
		let { weekId } = this.props;
		let date 	   = new Date();
		let day 	   = date.getDay();
		if ('week_' + day == weekId){ //不能添加当天
			this.setState({btnDisabled : true});
		}
	}

	render() {
		let {startIndex, endIndex} = this.props;
		let len = endIndex - startIndex;
		let timeLineList = [];
		let outHeight = (45 * len) + 'px';
		let innerHeight = (45 * len - 10) + 'px';
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
							<Button type="primary" disabled={this.state.btnDisabled} onClick={(e) => {this.showAdd(startIndex, endIndex)}} style={{height:innerHeight}}>添加标签</Button>
						</Flex.Item>
					</Flex>
				</List.Item>
			);
	}
}

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