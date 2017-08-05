import * as types from '../actions/types';
import { getTodayDate } from '../utils/func';

export default function submitDate(submitDate = '', action) {
  switch (action.type) {
  	case types.SET_SUBMIT_TIMEPLAN_DATE:
  		//console.log('在这里');
	    let todayDate = getTodayDate();
  		return todayDate;
  	case types.CLEAR_SUBMIT_TIMEPLAN_DATE:
  		return '';
  	default:
  		return submitDate;
  }
}  