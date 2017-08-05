import * as types from '../actions/types';

export default function cash(cashList = [], action) {
  switch (action.type) {
  	case types.SET_CASH_LIST:
  		return action.v;
  	case types.SET_MORE_CASH_LIST:
  		return [...cashList, ...action.v];
    case types.ADD_ONE_CASH: //新加的一条是要放在最前面，因为最新
      if (cashList.length > 0){ //已经有数据的时候再加，没有数据会触发初始化，没必要加，加了反而会影响初始化，使初始化跳过
        return [action.v, ...cashList];
      }
      return creditRecordList;      
  	case types.CLEAR_CASH_LIST:
  		return [];
  	default:
  		return cashList;
  }
}  