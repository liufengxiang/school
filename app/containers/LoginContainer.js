import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Login from '../components/Login';
import * as ucenterActions from '../actions/ucenter';

function mapStateToProps(state) {
  return {
    loginInfo : state.loginInfo
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ucenterActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login); //time动作绑定到了APP，作为APP的属性,因为APP组件中主要是操作