import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import GoodsDetail from '../components/GoodsDetail';
import * as appActions from '../actions/app';

function mapStateToProps(state) {
  return {
  	uinfo : state.uinfo,
    goodsInfoList : state.goodsInfoList
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(appActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GoodsDetail); //time动作绑定到了APP，作为APP的属性,因为APP组件中主要是操作