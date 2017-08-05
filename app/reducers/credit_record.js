import * as types from '../actions/types';

export default function creditRecord(creditRecordList = [], action) {
  switch (action.type) {
  	case types.SET_CREDIT_RECORD_LIST:
  		return action.v;
  	case types.SET_MORE_CREDIT_RECORD_LIST:
  		return [...creditRecordList, ...action.v];
  	case types.ADD_ONE_CREDIT_RECORD: //新加的一条是要放在最前面，因为最新
  		if (creditRecordList.length > 0){ //已经有数据的时候再加，没有数据会触发初始化，没必要加，加了反而会影响初始化，使初始化跳过
  			return [action.v, ...creditRecordList];
  		}
  		return creditRecordList;
    case types.CLEAR_CREDIT_RECORD_LIST:
      return [];
  	default:
  		return creditRecordList;
  }
}  