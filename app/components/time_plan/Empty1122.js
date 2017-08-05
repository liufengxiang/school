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
			btnDisabled : false,

			popup_selected_startIndex : 0,
			popup_selected_endIndex : 0,
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
		console.log(tags);
		console.log(this.state.selectedCateId);
  		console.log(this.state.selectedTagId);
		/*let el = <div>
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
	        	title="选择时间" 
	        	cols={2} 
	        	onChange={(v) => {this.setState({startIndex:v[0], endIndex:v[1]});}} 
	        	onPickerChange={(v) => {this.setState({startIndex:v[0], endIndex:v[1]});}} 
	        	extra={this.state.startIndex}
	        	>
	          <List.Item arrow="horizontal" extra={this.state.startIndex}>开始时间,结束时间</List.Item>
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
	    </div>*/
	    let el = <div>
	    	<div className='popup_title'>
	          <div>添加标签</div>
	          <div><span onClick={() => Popup.hide()}><Icon type="cross" /></span></div>
	      	</div>
	    	<WingBlank>
		      	<div className='select_btn' 
		      		onClick={(e) => {this.showTimeContainer(startIndex, endIndex - 1, '请选择开始时间', 'start');}}>
		      		<span className='select_title'>开始时间：</span>
		      		请点击此处选择
		      	</div>
		      	<div className='select_btn' 
		      		onClick={(e) => {this.showTimeContainer(this.state.popup_selected_startIndex + 1, endIndex, '请选择结束时间', 'end');}}>
		      		<span className='select_title'>结束时间：</span>
		      		请点击此处选择
		      	</div>
		      	<div className='select_btn' 
		      		onClick={(e) => {this.showTagContainer(tags);}}>
		      		<span className='select_title'>选择标签：</span>
		      		{(this.state.selectedCateId > 0 && this.state.selectedTagId > 0) ? tags.tagObjList['qrcode_' + this.state.selectedTagId]['title'] : <span className="select_text">请点击此处选择</span>}
		      	</div>
		      </WingBlank>
		      <WingBlank size="md">
		      	<WhiteSpace />
		      	<Button type="primary" onClick={() => this.doAddTag()}>添加</Button>
		      	<WhiteSpace />
		      </WingBlank>
	    </div>
    	Popup.show(el, { animationType: 'slide-up', maskClosable : false });
  	}

  	showTimeContainer(startIndex, endIndex, title, type){
  		let l = [];
  		for (var i = startIndex; i <= endIndex; i ++){
  			let obj = {label:timeList[i], value:i};
  			l.push(obj);
  		}
  		let pop = Popup.newInstance();
		pop.show(<div>
	      <div className='popup_title'>
	          <div>{title}</div>
	          <div><span onClick={() => pop.hide()}><Icon type="cross" /></span></div>
	      </div>
      	  <Menu data={l} level={1} onChange={(v) => {let obj={}; let stateKey = type == 'start' ? 'popup_selected_startIndex' : 'popup_selected_endIndex'; obj[stateKey] = v[0]; this.setState(obj); console.log(obj);}} height={Math.round(document.documentElement.clientHeight / 2)} />
	    </div>, { animationType: 'slide-up' });
  	}

  	showTagContainer(tags){
  		let pop = Popup.newInstance();
  		pop.show(<div>
	  			<div className='popup_title'>
		          <div>请选择标签</div>
		          <div><span onClick={() => pop.hide()}><Icon type="cross" /></span></div>
		        </div>
	        	<Menu data={tags.dataList} onChange={(value) => {this.setState({selectedCateId:value[0], selectedTagId:value[1]});}} height={Math.round(document.documentElement.clientHeight / 2)} />
  			</div>, { animationType: 'slide-up', maskClosable : true });
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
		//let outHeight = (45 * len) + 'px';
		//let innerHeight = (45 * len - 10) + 'px';
		let innerHeight = (45 * len) + 'px';
		for (let i = startIndex; i <= endIndex; i ++){
			timeLineList.push(timeList[i]);
		}

		return (
				<div className='time_plan_block empty_block' style={{height:innerHeight}}>
					<div className='left_time_container'>
						{timeLineList.map(function(item){
							return (<div key={item}>{item}</div>);
						})}
					</div>
					<div className='title_container'>
						<Button 
						onClick={(e) => {this.showAdd(startIndex, endIndex)}}
						inline
						size='large'
						disabled={this.state.btnDisabled}
						style={{backgroundColor:'#2eadf7', color:'white'}}
						>
						添加标签</Button>
					</div>
				</div>
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