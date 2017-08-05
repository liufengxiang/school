import * as types from '../actions/types';
import { Toast } from 'antd-mobile';

function s(objectList){
  return objectList.sort(function(a, b){
    return a.startIndex - b.startIndex
  });
}

function isEmpty(obj){
  if (typeof(obj.title) == "undefined" && typeof(obj.tagName) == "undefined"){
    return true;
  }
  return false;
}

//add操作后要重新根据startIndex由小到大排序
//删除tag后需要把空间添加到empty
export default function timePlan(lists = [], action) {
  let weekId = action.weekId;
  let obj = {};
  switch (action.type) {
    case types.SET_TIMEPLANLIST:
      return action.timePlanList;
    case types.ADD_EMPTY:
      obj = {};
      obj[weekId] = s([...lists[weekId], {startIndex:action.startIndex, endIndex:action.endIndex}]);
      return Object.assign({}, lists, obj);
      //return s([...lists, {startIndex:action.startIndex, endIndex:action.endIndex}]);
    case types.ADD_STATIC:
      obj = {};
      obj[weekId] = s([...lists[weekId], {startIndex:action.startIndex, endIndex:action.endIndex, title:action.title}]);
      return Object.assign({}, lists, obj);
      //return s([...lists, {startIndex:action.startIndex, endIndex:action.endIndex, title:action.title}]);
    case types.ADD_TAG:
      obj = {};
      obj[weekId] = s([...lists[weekId], {startIndex:action.startIndex, endIndex:action.endIndex, tagId:action.tagId, tagName:action.tagName}]);
      return Object.assign({}, lists, obj);
      //return s([...lists, {startIndex:action.startIndex, endIndex:action.endIndex, tagName:action.tagName}]);
    case types.DEL_TAG:
      /*return lists.filter((item) => {
      	//return item.startIndex != action.startIndex && item.endIndex != action.endIndex;
        return !(item.startIndex == action.startIndex && item.endIndex == action.endIndex);
      });*/

      //点击添加标签时，会删除原来的Empty标签，然后添加对应的（1个，2个，或3个）标签（Tag, Empty）,添加的逻辑已经在Empty标签中添加了
      //所以此处对于这类删除（Empty标签的添加操作触发的删除）不用再作处理，否则会因为重复处理而报错 ( 能否整合到一起 ？？？？？？？ )
      let newLists = [...lists[weekId]]; //如果直接赋值 newLists = lists 则是传引用，不能
      for (let i = 0; i < newLists.length; i ++){
        if (newLists[i].startIndex == action.startIndex && newLists[i].endIndex == action.endIndex){
          
          //添加对于Tag的删除后的额外操作（上面已经注释，不用对Empty的添加操作触发删除做额外处理）
          if (typeof(newLists[i].tagName) != "undefined"){ //有tagName则为Tag标签
            let finalStartIndex = action.startIndex;
            let finalEndIndex   = action.endIndex;
            let preEmpty = false;
            let nextEmpty = false;
            let preItem = newLists[i - 1];
            if (typeof(preItem) != "undefined"){
              if (isEmpty(preItem)){
                finalStartIndex = preItem.startIndex;
                preEmpty = true;
              }
            }
            let nextItem = newLists[i + 1];
            if (typeof(nextItem) != "undefined"){
              if (isEmpty(nextItem)){
                finalEndIndex = nextItem.endIndex;
                nextEmpty = true;
              }
            }
            //全部要判断完后一起删除，否则由于会影响到原数组的值，导致i的错位
            if (preEmpty && nextEmpty){
              newLists.splice(i - 1, 3);
            }else if (preEmpty && !nextEmpty){
              newLists.splice(i - 1, 2);
            }else if (!preEmpty && nextEmpty){
              newLists.splice(i, 2);
            }else {
              newLists.splice(i, 1);
            }
            newLists.push({startIndex:finalStartIndex, endIndex:finalEndIndex});
          }else {
            newLists.splice(i, 1);
          }
          //end
          break;
        }
      }
      //return s(newLists);
      obj = {};
      obj[weekId] = s(newLists)
      return Object.assign({}, lists, obj);
    case types.CLEAR_TIME_PLAN_LIST:
      return [];
    default: //原始的是排序好的，因为后台录入的数据肯定是按顺序的
      return lists;
  }
}