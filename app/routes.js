import React from 'react';
import { Route, IndexRoute } from 'react-router';
import BlankWindow from './components/BlankWindow';
import MyAppContainer from './containers/MyAppContainer';
import RegisterContainer from './containers/RegisterContainer';
import LoginContainer from './containers/LoginContainer';
import ProfileContainer from './containers/ProfileContainer';
import BindMobileContainer from './containers/BindMobileContainer';
import ChangePasswordContainer from './containers/ChangePasswordContainer';
import ExchangeListContainer from './containers/ExchangeListContainer';
import CreditRecordListContainer from './containers/CreditRecordListContainer';
import GoodsDetailContainer from './containers/GoodsDetailContainer';
import NewsDetailContainer from './containers/NewsDetailContainer';
import FindPasswordContainer from './containers/FindPasswordContainer';
import BindDeviceIdContainer from './containers/BindDeviceIdContainer';
import MessageListContainer from './containers/MessageListContainer';
import { needAuth, needComplete } from './utils/func';

/*
如果有定义父子关系的路由，则父路由中需要 this.props.children 才能在对应的地方加载子路由中内容
*/
export default (
	<Route path="/" component={BlankWindow}>
		<IndexRoute component={MyAppContainer} onEnter={needComplete} />
		<Route path="profile" component={ProfileContainer} onEnter={needAuth} />
		<Route path="bind-mobile" component={BindMobileContainer} onEnter={needComplete} />
		<Route path="bind-device-id" component={BindDeviceIdContainer} onEnter={needComplete} />
		<Route path="change-password" component={ChangePasswordContainer} onEnter={needComplete} />
		<Route path="exchange-list" component={ExchangeListContainer} onEnter={needComplete} />
		<Route path="goods-detail/:gid" component={GoodsDetailContainer} onEnter={needComplete} />
		<Route path="news-detail/:id" component={NewsDetailContainer} onEnter={needComplete} />
		<Route path="credit-record-list" component={CreditRecordListContainer} onEnter={needComplete} />
		<Route path="message-list" component={MessageListContainer} onEnter={needComplete} />

		<Route path="register" component={RegisterContainer} />
		<Route path="login" component={LoginContainer} />
		<Route path="find-password" component={FindPasswordContainer} />
	</Route>
);