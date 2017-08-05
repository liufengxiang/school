import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import App from '../components/App';
import * as appActions from '../actions/app';

function mapStateToProps(state) {
  return {
    timePlanList  : state.timePlan,
    timeList      : state.timeList,
    uinfo 		    : state.uinfo,
    tags 		      : state.tags,
    goodsList 	  : state.goodsList,
    newsList	    : state.newsList,
    selectedTab   : state.selectedTab,
    loginInfo	    : state.loginInfo,
    submitDate    : state.submitDate,
    tagCountData  : state.tagCountData,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(appActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App); //time动作绑定到了APP，作为APP的属性,因为APP组件中主要是操作