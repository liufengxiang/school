import React, { Component, PropTypes } from 'react';
import { InputItem, Button, WingBlank, WhiteSpace, List, Flex, NavBar, Icon, Toast, Accordion } from 'antd-mobile';
import { timeList } from '../data/timeList';
import { schoolList } from '../data/schoolList';
import Static from './time_plan/Static';
import Empty from './time_plan/Empty';
import Tag from './time_plan/Tag';
import { getTodayDate } from '../utils/func';
export default class TimePlanAddMany extends Component {
  constructor(props){
    super(props);
  }


  //在server端从time_plan表取得数据的时候先写入一份到time_plan_tag_record，只能解决部分问题
  //因为如果client中已经有规划数据，就不会触发initTimePlan事件，就不会再有后续行为
  //所以改为在client端执行同步操作
  //一定要在initTimeplan初始化好后再执行
  _doSync(){
    let { submitDate, timeplanSync, timePlanList } = this.props;
    let todayDate = getTodayDate();
    if (typeof(timePlanList.week_1) != 'undefined'){
      if (submitDate.length == 0 || todayDate != submitDate){
        console.log('未同步，正在同步..');
        timeplanSync();
      }else {
        console.log('已同步');
      }
    }else {
      console.log('timeplanlist未完成初始化');
    }
    
  }

  //除了首次render之后调用componentDidMount，其它render结束之后都是调用componentDidUpdate
  componentDidMount(){
    this._doSync();
    //console.log('componentDidMount here');
  }

  componentDidUpdate(){
    this._doSync();
    //console.log('componentDidUpdate here');
    //getTagCount不能放在这里，因为getTagCount后会导致tagCountData变化，会再次触发componentDidUpdate方法，再次导致。。。 一直循环
  }

  render() {
    let { timePlanList, timeList, tags, tagCountData, getTagCount, addEmpty, addStatic, addTag, delTag, mergeTag, scanTag, commitTimePlan } = this.props;
    let weekList = {'week_1':'周一', 'week_2':'周二', 'week_3':'周三', 'week_4':'周四', 'week_5':'周五', 'week_6':'周六', 'week_7':'周日',}
    let panels = [];
    let index = 0; 
    let day = new Date().getDay();
    for (var weekId in timePlanList){
      index ++;
      //let header = (index < day ? '下' : '本') + weekList[weekId] + (index == day ? '[今天]' : '');
      let header = weekList[weekId] + (index == day || index==7&&day==0 ? ' （今天）' : '');
      panels.push(
          <Accordion.Panel header={header} key={weekId}>
              <List>
                {
                  timePlanList[weekId].map((item) => {
                    if (typeof(item.title) != "undefined"){
                      return <Static key={item.startIndex} timeList={timeList} startIndex={item.startIndex} endIndex={item.endIndex} title={item.title} weekId={weekId} />
                    }else if (typeof(item.tagName) != "undefined"){
                      return <Tag key={item.startIndex} tagCountData={tagCountData} timeList={timeList} startIndex={item.startIndex} endIndex={item.endIndex} tagId={item.tagId} tagName={item.tagName} delTag={delTag} scanTag={scanTag} weekId={weekId} />
                    }else {
                      return <Empty key={item.startIndex} timeList={timeList} startIndex={item.startIndex} endIndex={item.endIndex} addEmpty={addEmpty} addStatic={addStatic} addTag={addTag} delTag={delTag} mergeTag={mergeTag} weekId={weekId} tags={tags} />
                    }
                  })
                
                }
              </List>
            </Accordion.Panel>
        );
    }

    //因为点击展开要触发getTagCount事件，所以不能有默认展开项
    return (
        /*<div>
          <NavBar mode="light" iconName=''
              className='my_navbar_title'
              rightContent={<Button inline size="small" className='my_small_btn' type="primary" onClick={(e) => {commitTimePlan()}}>提交</Button>}
            >plantech</NavBar>
          <WhiteSpace size="sm" />
          <div className='my_container_blank'></div>

          <Accordion
            defaultActiveKey=""
            accordion
            onChange={(key) => {if (typeof(key) != 'undefined'){getTagCount();}}}
          >
            {panels}
          </Accordion>

          <WhiteSpace size="lg" />
          <WhiteSpace size="lg" />
          <WhiteSpace size="lg" />
          <WhiteSpace size="sm" />
        </div>*/

        <div className="timeindex">
            <div className="time_left">
                <ul className="time_month">
                    <li className="time_week ">
                        <i className="time_xingqi">1</i>
                        <span className="time_yue">JAN</span>
                    </li>
                    <li className="time_week time_week1">
                        <i className="time_xingqi">2</i>
                        <span className="time_yue">JAN</span>
                    </li>
                    <li className="time_week ">
                        <i className="time_xingqi">3</i>
                        <span className="time_yue">JAN</span>
                    </li>
                    <li className="time_week ">
                        <i className="time_xingqi">4</i>
                        <span className="time_yue">JAN</span>
                    </li>
                    <li className="time_week ">
                        <i className="time_xingqi">5</i>
                        <span className="time_yue">JAN</span>
                    </li>

                    <li className="time_week ">
                        <i className="time_xingqi">6</i>
                        <span className="time_yue">JAN</span>
                    </li>
                    <li className="time_week ">
                        <i className="time_xingqi">7</i>
                        <span className="time_yue">JAN</span>
                    </li>
                    <li className="time_add">
                        <span>+</span>
                    </li>
                </ul>

            </div>
            <div className="time_right">
                <div className="time_content">
                    <div className="time_info">
                        <span className="time_infozh">星期二</span>
                        <span className="time_infoch">Tuesday</span>
                        <span className="time_jiantou"></span>
                        <div className="time_infotz">
                        <span className="time_infotz1">
                            <i className="time_infonum">3</i>
                        </span>
                        </div>
                    </div>
                    <ul className="time_conlist">
                        <li className="time_cont ">

                            <span className="time_begin">04:45</span>
                            <span className="time_hengxian"></span>
                            <span className="time_over">05:50</span>

                            <span className="time_study">计算机</span>
                            <span className="time_shuxian"></span>
                            <span className="time_fenlei">SPOERTS</span>
                            <span className="time_studycn">computer</span>

                            <Icon className="anticon time_size" type="anticon-anticon_dingwei" />
                            <span className="time_weizhi">山西传媒大学行知楼,111室</span>

                            <span className="time_jindutiao"></span>
                        </li>
                        <li className="time_cont time_cont1">

                            <span className="time_begin">04:45</span>
                            <span className="time_hengxian"></span>
                            <span className="time_over">05:50</span>

                            <span className="time_study">计算机</span>
                            <span className="time_shuxian"></span>
                            <span className="time_fenlei">SPOERTS</span>
                            <span className="time_studycn">computer</span>

                            <i className="iconfont time_size">&#xe62e;</i>
                            <span className="time_weizhi">山西传媒大学行知楼,111室</span>

                            <span className=" time_jindutiao1"></span>
                        </li>
                        <li className="time_cont time_cont1 time_cont2">

                            <span className="time_begin">04:45</span>
                            <span className="time_hengxian"></span>
                            <span className="time_over">05:50</span>

                            <span className="time_study">计算机</span>
                            <span className="time_shuxian"></span>
                            <span className="time_fenlei">SPOERTS</span>
                            <span className="time_studycn">computer</span>

                            <i className="iconfont time_size">&#xe62e;</i>
                            <span className="time_weizhi">山西传媒大学行知楼,111室</span>

                            <span className="time_jindutiao"></span>
                        </li>
                        <li className="time_cont time_cont1">

                            <span className="time_begin">04:45</span>
                            <span className="time_hengxian"></span>
                            <span className="time_over">05:50</span>

                            <span className="time_study">计算机</span>
                            <span className="time_shuxian"></span>
                            <span className="time_fenlei">SPOERTS</span>
                            <span className="time_studycn">computer</span>

                            <i className="iconfont time_size">&#xe62e;</i>
                            <span className="time_weizhi">山西传媒大学行知楼,111室</span>

                            <span className="time_jindutiao1">

                        </span>
                        </li>
                    </ul>
                </div>
                <div class="time_foot">
                    <a href="#">
                        <i class="iconfont time_stime">&#xe601;</i>
                    </a>
                    <a href="#">
                        <i class="iconfont time_zudui">&#xe619;</i>
                    </a>
                    <a href="">
                        <i class="iconfont time_geren">&#xe600;</i>
                    </a>
                </div>
            </div>
        </div>
      );
  }
}







