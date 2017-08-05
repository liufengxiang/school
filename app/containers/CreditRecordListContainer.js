import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CreditRecordList from '../components/CreditRecordList';
import * as creditActions from '../actions/credit';

function mapStateToProps(state) {
  return {
    creditRecordList : state.creditRecordList
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(creditActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CreditRecordList);