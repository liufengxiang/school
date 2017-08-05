import * as types from '../actions/types';

export default function tab(selectedTab = 'greenTab', action) {
  switch (action.type) {
  	case types.CHANGE_SELECTED_TAB:
  		return action.v;
  	default:
  		return selectedTab;
  }
}  