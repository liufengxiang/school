import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import NewsDetail from '../components/NewsDetail';
import * as appActions from '../actions/app';

function mapStateToProps(state) {
  return {
    newsInfoList : state.newsInfoList
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(appActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsDetail); //time动作绑定到了APP，作为APP的属性,因为APP组件中主要是操作