import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Picker, List, InputItem, NavBar, WingBlank, WhiteSpace, Icon, Button, Modal } from 'antd-mobile';
import { getLocalTime2 } from '../utils/func';

export default class GoodsDetail extends Component {
	constructor(props){
		super(props);
	}

	exchange(gid, score){
		let { exchangeGoods } = this.props;
		Modal.alert('兑换此商品', '确定兑换吗,您将扣除 ' + score + ' 积分?', [
		    { text: '取消', onPress: () => console.log('cancel') },
		    { text: '确定', onPress: () => {exchangeGoods(gid);} },
		  ]);
	}

	//不能在render方法中调用setState方法，可以放到此处在render之前调用
	componentWillMount(){
		let gid = this.props.params.gid;
		let { goodsInfoList, getGoodsInfo } = this.props;
		let key = 'info_' + gid;
		if (typeof(goodsInfoList[key]) == 'undefined'){
			getGoodsInfo(gid);
		}
	}

	//redux中的state变化，引起props变化，会调用render方法，里面的都会重新执行，但是不会触发componentWillMount
	render() {
		let { uinfo } = this.props; //在PC中单独刷新此页是不会获取到此值的，因为uinfo需要在App中通过initBaseUinfo获取
		let gid = this.props.params.gid;
		let key = 'info_' + gid;
		let { goodsInfoList } = this.props;
		let info = goodsInfoList[key];
		
		return (
				<div>
					<NavBar leftContent={<Link to='/' style={{color:'#108ee9'}} className='nabbar_link'>返回</Link>} mode="light" 
					className='my_navbar_title'
					onLeftClick={(e) => {}}
					rightContent={typeof(info) != 'undefined' ? (parseInt(uinfo.baseUinfo.score) >= parseInt(info.score) ? <Button type="primary" size="small" className='my_small_btn' inline onClick={(e) => {this.exchange(gid, info.score);}}>兑换</Button> : <Button disabled size="small" inline>积分不足</Button>) : <Button type="primary" size="small" className='my_small_btn' inline>兑换</Button>}
				    >{typeof(info) != 'undefined' ? info.title : '...'}</NavBar>
				    <WhiteSpace size="sm" />
				    <div className='my_container_blank'></div>

				    <WingBlank size="sm">
				    	<div className='detail_info'>
				    		<div>积分数：{typeof(info) != 'undefined' ? info.score : '...'}</div> 
				    		<div>发布时间：{typeof(info) != 'undefined' ? getLocalTime2(info.create_time) : '...'}</div>
				    	</div>
				    	<div className='detail_content'>{typeof(info) != 'undefined' ? info.content : '......'}</div>
				    	<WhiteSpace />
				    	<div className=''>
				    		 {typeof(info) != 'undefined' ? (parseInt(uinfo.baseUinfo.score) >= parseInt(info.score) ? <Button type="primary" onClick={(e) => {this.exchange(gid, info.score);}}>立即兑换</Button> : <Button disabled>积分不足</Button>) : <Button type="primary">立即兑换</Button>}
				    	</div>
				    </WingBlank>
				    <WhiteSpace />
				</div>
			);
	}
}