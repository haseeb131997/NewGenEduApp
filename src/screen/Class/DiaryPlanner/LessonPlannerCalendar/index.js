/*
 * * Â© Copyright 2017-2020 IBD Tecnologies Private Limited.
 * *                       3/506 Kannadhsan Street ,ShanmugaNagar,Porur
 * *                       Chennai - 600125.
 * *                       India
 * *
 * * This source is part of the General Framework and is copyrighted by
 * * IBD Technologies Private Limited.
 * *
 * * All rights reserved.  No part of this work may be reproduced, stored in a
 * * retrieval system, adopted or transmitted in any form or by any means,
 * * electronic, mechanical, photographic, graphic, optic recording or otherwise,
 * * translated in any language or computer language, without the prior written
 * * permission of IBD Technologies Private Limited.
 /**/
/**/
/**/


import React, { Component } from "react";
import { View, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { Card, Subheading, Text, Title } from 'react-native-paper';
import moment from 'moment';


import SelectListUtils from '../../../../utils/SelectListUtils'



import LabelText from '../../../../components/LabelText';

import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import Ribbon from "../../../../components/Ribbon";
import { h } from "../../../../utils/Dimensions";
import AppStyles from "../../../../AppStyles/AppStyles";
import SideMenu from "../../../../components/SideMenu";
import CustomButtons from '../../../../components/CustomButtons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { UiColor } from '../../../../theme';
import SubScreenUtils from "../../../../utils/SubScreenUtils";
import { result } from "lodash";

import NewOperation from "../../../../utils/NewOperation";



class LessonPlannerCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      items: {},
      childPlanObject: null

    }
  }





  getPlanDetails(date) {
    const {
      stateObject
    } = this.props
    var oldDate = date.split('-')
    var newDate = `${oldDate[2]}-${oldDate[1]}-${oldDate[0]}`
    for (let i = 0; i < stateObject.state.childViewDetails.childResults.length; i++) {
      if (stateObject.state.childViewDetails.childResults[i].date == newDate) {
        return stateObject.state.childViewDetails.childResults[i]
      }
    }
  }


  getPlanCount(date) {
    const {
      stateObject
    } = this.props
    var oldDate = date.split('-')
    var newDate = `${oldDate[2]}-${oldDate[1]}-${oldDate[0]}`

    var compPercentage = 0;
    var compCount = 0;
    var notCompCount = 0;
    var totalLessonPlans = 0;





    for (let i = 0; i < stateObject.state.childViewDetails.childResults.length; i++) {
      if (stateObject.state.childViewDetails.childResults[i].date == newDate) {
        for (let j = 0; j < stateObject.state.childViewDetails.childResults[i].lessonResults.length; j++) {
          // if (stateObject.state.childViewDetails.childResults[i].lessonResults[j].status == "Completed") {
          //   compCount++;
          // } else {
          //   notCompCount++;
          // }
          totalLessonPlans++;
        }
        // if (stateObject.state.childViewDetails.childResults[i].lessonResults.length != 0) {
        //   compPercentage = (compCount / stateObject.state.childViewDetails.childResults[i].lessonResults.length) * 100;
        // }
        // else {
        //   compPercentage = 0;
        // }
      }
    }

    return {
      compPercentage,
      compCount,
      notCompCount,
      totalLessonPlans
    }


  }


  getEmptyPlanDetails() {
    const {
      stateObject
    } = this.props
    // dataModel.studentName = planData.details.studentName
    // dataModel.studentID = planData.details.studentID

    // console.log(stateObject.state.childViewDetails,"stateObject.state.childViewDetails")

    var planDetails = {
      classID: stateObject.state.childViewDetails.classID
    }
    return planDetails

  }



  loadItems(day) {
    const {
      stateObject
    } = this.props
    const { childViewDetails } = stateObject.state

    var dataModelDate = []

    setTimeout(() => {
      for (let i = 0; i < stateObject.state.childViewDetails.childResults.length; i++) {
        var olddate = stateObject.state.childViewDetails.childResults[i].date.split('-')
        var newDate = `${olddate[2]}-${olddate[1]}-${olddate[0]}`
        dataModelDate.push(newDate)
      }




      var month = childViewDetails.month.length == 1 ? `0${childViewDetails.month}` : childViewDetails.month
      var startDate = moment(`${childViewDetails.year}-${month}-01`, 'YYYY-MM-DD')
      var date = new Date(startDate);
      var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      var enddate = moment(lastDay, 'YYYY-MM-DD')
      var new_startDate = startDate
      var Difference_In_date = moment.duration(enddate.diff(startDate)).asDays() + 1;
      for (var k = 0; k < Difference_In_date; k++) {
        new_startDate = moment(startDate, 'YYYY-MM-DD').add(k, 'days').format('YYYY-MM-DD');
        this.state.items[new_startDate] = [];
        if (dataModelDate.indexOf(new_startDate) !== -1) {
          this.state.items[new_startDate].push({
            compPercentage: this.getPlanCount(new_startDate).compPercentage,
            totalLessonPlans: this.getPlanCount(new_startDate).totalLessonPlans,
            planStatus: true,
            //  details: stateObject.state.childViewDetails.childResults[i],
            details: this.getPlanDetails(new_startDate),
            date: new_startDate,
            compCount: this.getPlanCount(new_startDate).compCount,
            notCompCount: this.getPlanCount(new_startDate).notCompCount,
          })
        }
        else {
          this.state.items[new_startDate].push({
            // name: "No Plan",
            compPercentage: 0,
            totalLessonPlans: 0,
            planStatus: false,
            details: this.getEmptyPlanDetails(),
            date: new_startDate,
            compCount: 0,
            notCompCount: 0,
          });
        }
      }


      const newItems = {};
      Object.keys(this.state.items).forEach(key => {
        newItems[key] = this.state.items[key];
      });
      this.setState({
        items: newItems,
        childPlanObject: childViewDetails
      });
      stateObject.state.calendarLoaditems = newItems;
    }, 1000);
  }



  async addNewPlan(planData) {
    const {
      stateObject,

    } = this.props

    const { dataModel } = stateObject.state
    await SubScreenUtils.functions.createNew(stateObject)
    dataModel.classID = planData.details.classID
    var olddate = planData.date.split('-')
    var newDate = `${olddate[2]}-${olddate[1]}-${olddate[0]}`
    dataModel.date = newDate
    stateObject.parentStateChange({
      dataModel: dataModel
    })


  }

  viewDetails(viewDetail, index) {
    const { stateObject } = this.props;
    viewDetail.studentID = stateObject.state.summaryDataModel.filter.studentID
    stateObject.setState({
      viewDetail: viewDetail,
      currentOperation: 'Query',
      selectedTabIndex: 0
    }, () => {
      NewOperation.functions.screenEventHandler(stateObject)
    })
  }

  renderItem(item) {
    // console.log(item, "item renderItem")
    const {
      stateObject
    } = this.props

    var colorStatus = '';

    if (item.compPercentage == 100) {
      colorStatus = "A";
    }
    else if (moment().isAfter(item.date)) {
      colorStatus = "R";
    }
    else {
      colorStatus = "U";
    }




    return item.planStatus ? (

      <View style={styles.mainContainer}>
      
        <View style={AppStyles.row_space_between}>
        <Ribbon
                  stateObject={stateObject}
                  label={SelectListUtils.functions.getSelectedValueNew(SelectListUtils.functions.selectMaster.AuthStatusMaster, item.details.authStat)}
                  status={item.details.authStat}
                />
           <View style={[AppStyles.marginTop_1, AppStyles.marginRight_1]}>
            <SideMenu
              summaryResultIndex={stateObject.state.summaryResultIndex}
              viewDetail={item.details}
              stateObject={stateObject}
              menuTitle={['View', 'Edit', 'Delete']}
            // menuTitle={['View', 'Edit', 'Delete', 'Approve/Reject']}
            />
          </View> 
        </View>

        <View style={AppStyles.margin_2}>
          {/* <Subheading>Diary Plan Details</Subheading> */}
          <Subheading>Plan applicable to {item.details.totalStudents} students</Subheading>

          <View style={AppStyles.marginTop_1}>
            <Text style={AppStyles.textColor}>Total topics planned for the day : <Text>{item.totalLessonPlans}</Text></Text>
            {/* {item.details.totalStudents != 0 && <Text style={AppStyles.textColor}>No. of total students : <Text>{item.details.totalStudents}</Text></Text>} */}
            {item.details.completedStudents != 0 && <Text style={AppStyles.textColor}>No. of students completed : <Text>{item.details.completedStudents}</Text></Text>}

            {(item.details.totalStudents - item.details.completedStudents) != 0 && <Text style={AppStyles.textColor}>No. of students yet to complete : <Text>{item.details.totalStudents - item.details.completedStudents}</Text></Text>}

          </View>
        </View>
        {/* {(stateObject.state.userType == 'A' || stateObject.state.userType == 'T' || stateObject.state.userType == 'O') &&
          <View style={[AppStyles.alignItems, AppStyles.marginTop_2, AppStyles.marginBottom_3]}>
            <CustomButtons
              onPress={() => this.viewDetails(item.details, 0)}
              title="View Plan"
              // titleStyle={AppStyles.signInTextStyle}
              buttonStyle={{ backgroundColor: UiColor.SKYBLUE }}
            />
          </View>} */}

      </View>
    ) : (
      <View style={styles.mainContainer}>
        <View style={AppStyles.margin_2}>
          <Subheading>There is no plan</Subheading>
          <View style={[AppStyles.alignItems, AppStyles.marginTop_3]}>
            <CustomButtons
              onPress={() => this.addNewPlan(item)}
              title="Add daily plan"
              titleStyle={AppStyles.signInTextStyle}
              buttonStyle={{ backgroundColor: UiColor.SKYBLUE }}
              icon={
                <Ionicons
                  name="md-add"
                  size={AppStyles.addIconSize.height}
                  color="white"
                  style={AppStyles.addIconStyle}
                />
              }
            />
          </View>
        </View>
      </View>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}>
        <Text>This is empty date!</Text>
      </View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }





  render() {
    const {
      stateObject
    } = this.props
    const {  childViewDetails } = stateObject.state

    var month = childViewDetails.month.length == 1 ? `0${childViewDetails.month}` : childViewDetails.month
    var startDate = `${childViewDetails.year}-${month}-01`
    var date = new Date(startDate);
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    var enddate = moment(lastDay, 'YYYY-MM-DD').format('YYYY-MM-DD')

    if (stateObject.state.calendarEmptyRefresh) {
      this.state.items = {}
    }
    if (stateObject.state.calendarRefresh) {
      this.state.items = stateObject.state.calendarLoaditems;
    }


   

    return (
      <Agenda
        items={this.state.items}
        loadItemsForMonth={this.loadItems.bind(this)}
        selected={startDate}
        renderItem={this.renderItem.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
        showClosingKnob={true}
        minDate={startDate}
        maxDate={enddate}
        pastScrollRange={1}
        futureScrollRange={1}
        onRefresh={() => console.log('refreshing...')}
      />



    );
  }
}


const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#fff', marginTop: h('12%'), width: '95%'
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  }
});

export default LessonPlannerCalendar;

