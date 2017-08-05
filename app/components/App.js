import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { TabBar } from 'antd-mobile';
import Profile from './Profile';
import UserCenter from './UserCenter';
import Checkin from './Checkin';
import TimePlanAdd from './TimePlanAdd';
import TimePlanAddMany from './TimePlanAddMany';
import GoodsList from './GoodsList';
import NewsList from './NewsList';

class App extends Component {
	constructor(props){
		super(props);
	}

	componentWillMount(){
		let { timePlanList, initTimePlanList, timeList, initTimeList, initComplete, uinfo, initBaseUinfo, initExtUinfo, tags, initTags, goodsList, initGoodsList, newsList, initNewsList, loginInfo, checkDeviceId } = this.props;
		//初始化App所需要的所有资料
		//初始化操作分为需要uid与password参与的与不需要参与的
		//对于需要参与的，如果验证失败就提示登录信息过期，重新登录
		//对于不需要参与的，则直接重新初始化
		//其它组件的初始化过程与此相同
		if (typeof(timePlanList.week_1) == 'undefined'){
			initTimePlanList();  //时间规划列表	
		}
		if (typeof(timeList.dataList) == 'undefined'){
			initTimeList();
		}
		if (typeof(tags.dataList) == 'undefined'){
			initTags();
		}
		if (goodsList.length == 0){
			initGoodsList(46); //兑换商品列表
		}
		if (newsList.length == 0){
			initNewsList(41); //资讯列表
		}
		//虽然是needComplete后才能到App,但此处要初始化值出来，不能删除
		if (typeof(uinfo.isComplete) == 'undefined'){
			initComplete(); //是否完善了资料
		}
		if (typeof(uinfo.baseUinfo) == 'undefined'){ //不初始化extUinfo，因为不知道是否已经完善isComplete //可以取得extUinfo,因为App组件是needComplete
			initBaseUinfo(); //基础信息，不包括member_ext，因为可能未完善资料
		}
		//移动到initTimePlanList中，因为它已经做了延迟
		/*if (typeof(loginInfo.device_id_state) == 'undefined'){
			checkDeviceId(api.deviceId); //api.deviceId
		}*/
		/*
		action中只对initTimePlanList加了Toast.loading，因为
		只有第一屏才需要加载提示，其它屏都会加载完成通常，否则如果多屏都有加载提示，会关不掉(Toast.hide())问题。其实只要保证其它子页面在加载时能取到已经初始化的值就行
		即使没有加载完成，会在加载完成后改变展示结果 
		如果已经有值，就不用再初始化，这样的话如果server中数据变化，这里得退出才行。或者给一个全局同步数据的按钮？？
		*/
		/*
		当异步的请求有返回了的时候，store的state会更新，则组件的props会更新，会让组件重新render
		只需要先判断是否为undefined，是的话给个点位符，等异步执行完成后一系统触发会更新这些点位符
		如果不判断undefined，JS会报undefined的错
		*/
	}

	componentDidMount(){
		//除了首次render之后调用componentDidMount，其它render结束之后都是调用componentDidUpdate
		//console.log('app componentDidMount');
		//initJiguang(); 放到了initTimePlanList
	}

	componentDidUpdate(){
		//console.log('app componentDidUpdate');
	}

	render() {
		let { timePlanList, timeList, submitDate, tagCountData, getTagCount, timeplanSync, tags, goodsList, getMoreGoodsList, newsList, getMoreNewsList, addEmpty, addStatic, addTag, delTag, mergeTag, commitTimePlan, uinfo, selectedTab, changeSelectedTab, logout, checkin, scanTag, loginInfo } = this.props;
		return (
			<div>

				<TabBar
					unselectedTintColor="#949494"
					tintColor="#33A3F4"
					barTintColor="white"
				  >

				  	<TabBar.Item
					  icon={require('../images/zhongbiaobai@2x.png')}
					  selectedIcon={require('../images/zhongbiaolv-02@2x.png')}
					  title="规划"
					  key="规划"
					  selected={selectedTab === 'greenTab'}
					  onPress={() => {changeSelectedTab('greenTab'); getTagCount();}} //这里是离开返回时触发，其它是点击header时触发
					>
					  <TimePlanAddMany submitDate={submitDate} tagCountData={tagCountData} getTagCount={getTagCount} timeplanSync={timeplanSync} timePlanList={timePlanList} timeList={timeList} addEmpty={addEmpty} addStatic={addStatic} addTag={addTag} delTag={delTag} mergeTag={mergeTag} commitTimePlan={commitTimePlan} tags={tags} scanTag={scanTag} />
					</TabBar.Item>
					<TabBar.Item
					  icon={require('../images/icon_checkin1.png')}
					  selectedIcon={require('../images/icon_checkin2.png')}
					  title="签到"
					  key="签到"
					  selected={selectedTab === 'redTab'}
					  onPress={() => {changeSelectedTab('redTab');}}
					  data-seed="logId1"
					>
					  <Checkin checkin={checkin} />
					</TabBar.Item>
					<TabBar.Item
					  icon={require('../images/icon_exchange1.png')}
					  selectedIcon={require('../images/icon_exchange2.png')}
					  title="兑换"
					  key="兑换"
					  selected={selectedTab === 'yellowTab'}
					  onPress={() => {changeSelectedTab('yellowTab');}}
					>
					  <GoodsList goodsList={goodsList} getMoreGoodsList={getMoreGoodsList} />
					</TabBar.Item>
					<TabBar.Item
					  icon={require('../images/icon_news1.png')}
					  selectedIcon={require('../images/icon_news2.png')}
					  title="资讯"
					  key="资讯"
					  selected={selectedTab === 'greyTab'}
					  onPress={() => {changeSelectedTab('greyTab');}}
					>
					  <NewsList newsList={newsList} getMoreNewsList={getMoreNewsList} />
					</TabBar.Item>
					<TabBar.Item
					  title="我"
					  key="我"
					  icon={require('../images/icon_me1.png')}
					  selectedIcon={require('../images/icon_me2.png')}
					  selected={selectedTab === 'blueTab'}
					  onPress={() => {changeSelectedTab('blueTab');}}
					  data-seed="logId"
					>
					  <UserCenter uinfo={uinfo} loginInfo={loginInfo} logout={logout} />
					</TabBar.Item>


				</TabBar>



				/*<div className="time_foot">
					<a href="#">
						<i className="iconfont time_stime">&#xe601;</i>
					</a>
					<a href="#">
						<i className="iconfont time_zudui">&#xe619;</i>
					</a>
					<a href="">
						<i className="iconfont time_geren">&#xe600;</i>
					</a>
				</div>*/
			</div>
			);
	}
}

export default App;