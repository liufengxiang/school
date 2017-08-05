import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import timePlan from './timePlan';
import time from './time';
import ucenter from './ucenter';
import tab from './tab';
import tags from './tags';
import goods from './goods';
import goods_info from './goods_info';
import news from './news';
import news_info from './news_info';
import cash from './cash';
import creditRecord from './credit_record';
import login from './login';
import sxnb from './sxnb';
import submitDate from './submitDate';
import tag_count from './tag_count';

const rootReducer = combineReducers({
    timePlan 		: timePlan,
    timeList        : time,
    uinfo 			: ucenter,
    selectedTab 	: tab,
    tags 			: tags,
    goodsList 		: goods,
    goodsInfoList 	: goods_info,
    newsList        : news,
    newsInfoList    : news_info,
    cashList 		: cash,
    creditRecordList : creditRecord,
    loginInfo		: login,
    sxnb            : sxnb,
    submitDate      : submitDate,
    tagCountData    : tag_count,
    routing 		: routing
});

export default rootReducer;