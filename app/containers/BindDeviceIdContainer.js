import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import BindDeviceId from '../components/BindDeviceId';
import * as ucenterActions from '../actions/ucenter';

function mapStateToProps(state) {
  return {
    uinfo : state.uinfo
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ucenterActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BindDeviceId);