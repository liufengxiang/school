import * as types from '../actions/types';

/*
{
	"week_1":{
		"tag_1":{"count":2},
		"tag_5":{"count":1}
	},
	"week_2":{
		"tag_1":{"count":2},
		"tag_5":{"count":1},
		...
	},
}
*/
export default function tag_count(tagCountData = {}, action) {
  switch (action.type) {
  	case types.SET_TAG_COUNT:
  		return action.v;
  	case types.CLEAR_TAG_COUNT:
  		return {};
  	default:
  		return tagCountData;
  }
}  