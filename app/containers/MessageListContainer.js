import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MessageList from '../components/MessageList';
import * as ucenterActions from '../actions/ucenter';

function mapStateToProps(state) {
  return {
    //creditRecordList : state.creditRecordList
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ucenterActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageList);