import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Profile from '../components/Profile';
import * as ucenterActions from '../actions/ucenter';

function mapStateToProps(state) {
  return {
    uinfo : state.uinfo,
    sxnb  : state.sxnb
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ucenterActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile); //time动作绑定到了APP，作为APP的属性,因为APP组件中主要是操作