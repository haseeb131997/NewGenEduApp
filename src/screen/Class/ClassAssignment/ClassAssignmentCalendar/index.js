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
import { View, StyleSheet, Alert, Image } from 'react-native';
import { Card, Subheading, Text, Title ,Caption} from 'react-native-paper';
import moment from 'moment';
import { Agenda } from 'react-native-calendars';
import Ribbon from "../../../../components/Ribbon";
import { h } from "../../../../utils/Dimensions";
import AppStyles from "../../../../AppStyles/AppStyles";
import SideMenu from "../../../../components/SideMenu";
import CustomButtons from '../../../../components/CustomButtons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { UiColor } from '../../../../theme';
import SubScreenUtils from "../../../../utils/SubScreenUtils";
import SelectListUtils from '../../../../utils/SelectListUtils'





class ClassAssignmentCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      items: {},
      // childPlanObject: null

    }
  }


  // static getDerivedStateFromProps(nextProps, prevState) {
  //   if(!isEqual(nextProps.stateObject.calendarLoaditems, prevState.items)){
  //     return {
  //       items: nextProps.stateObject.calendarLoaditems,
  //     };
  //   }
  //   return null
  // }




  getAssignmentDetails(date) {
    const {
      stateObject
    } = this.props
    var oldDate = date.split('-')
    var newDate = `${oldDate[2]}-${oldDate[1]}-${oldDate[0]}`


    for (let i = 0; i < stateObject.state.childViewDetails.assignmentDetails.length; i++) {

      if (stateObject.state.childViewDetails.assignmentDetails[i].dueDate == newDate) {
        stateObject.state.childViewDetails.assignmentDetails[i].classID = stateObject.state.childViewDetails.classID
        stateObject.state.childViewDetails.assignmentDetails[i].classDescription = stateObject.state.childViewDetails.classDescription
        return stateObject.state.childViewDetails.assignmentDetails[i]
      }
    }
  }

  getEmptyAssignmentDetails(date) {
    const {
      stateObject
    } = this.props

   var assignmentDetails ={
     classID:stateObject.state.childViewDetails.classID,
    classDescription:stateObject.state.childViewDetails.classDescription,
    subjectID: stateObject.state.childViewDetails.subjectID,
    subjectName: stateObject.state.childViewDetails.subjectName,
   }
        return assignmentDetails
     
  }

  loadItems() {
    const {
      stateObject
    } = this.props
    const { childViewDetails } = stateObject.state

    var dataModelDate = []

    setTimeout(() => {
      for (let i = 0; i < stateObject.state.childViewDetails.assignmentDetails.length; i++) {
        var olddate = stateObject.state.childViewDetails.assignmentDetails[i].dueDate.split('-')
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
            status: true,
            details: this.getAssignmentDetails(new_startDate),
            date: new_startDate,
          })
        }
        else {
          this.state.items[new_startDate].push({
            status: false,
           // details: stateObject.state.childViewDetails,
            details:this.getEmptyAssignmentDetails(new_startDate),
            date: new_startDate,
          });
        }
      }

      const newItems = {};
      Object.keys(this.state.items).forEach(key => {
        newItems[key] = this.state.items[key];
      });

      


      this.setState({
        items: newItems,
      });

      // stateObject.state.calendarLoaditems=newItems;
      // stateObject.parentStateChange({
      //   calendarLoaditems:newItems
      // })

    }, 1000);
  }



  async addNewAssignemnt(item) {
    const {
      stateObject,

    } = this.props

    const { storedDataModel,dataModel } = stateObject.state

    var olddate = item.date.split('-')
    var newDate = `${olddate[2]}-${olddate[1]}-${olddate[0]}`
    var obj = {}
 
    obj.dueDate = newDate
    obj.subjectID = item.details.subjectID
    obj.subjectName = item.details.subjectName
    obj.classID = item.details.classID
    obj.classDescription = item.details.classDescription
    stateObject.state.storedDataModel = obj

    stateObject.parentStateChange({
      storedDataModel: stateObject.state.storedDataModel,
    })
    await SubScreenUtils.functions.createNew(stateObject)
    
   
  }

  renderItem(item) {
    // console.log(item, "item renderItem")
    const {
      stateObject
    } = this.props

        

    return item.status ? (

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
          {/* <Subheading>Attendance</Subheading> */}
          <Subheading>{item.details.assignmentDescription}</Subheading>
          <View style={AppStyles.marginTop_1}>
         <View style={[AppStyles.flexDirectionRow,AppStyles.alignItems]}>
         <Image resizeMode='contain' style={[AppStyles.inactiveMoreIcon, AppStyles.succusImgColor]}
            source={require('./../../../../asssets/icons/com006.png')}
          />
        
            <View style={[AppStyles.marginLeft_1,AppStyles.flexDirectionRow,AppStyles.alignItems]}><Text style={AppStyles.textColor}>No. of students submitted : </Text>
            <Caption style={[AppStyles.successBatchStyle]}>{item.details.submittedStudentCount}</Caption>
            </View>
         </View>
         <View style={[AppStyles.flexDirectionRow,AppStyles.alignItems,AppStyles.marginTop_1]}>
         <Image resizeMode='contain' style={[AppStyles.inactiveMoreIcon, AppStyles.errorImgColor]}
            source={require('./../../../../asssets/icons/com006.png')}
          />
            <View style={[AppStyles.marginLeft_1,AppStyles.flexDirectionRow,AppStyles.alignItems]}><Text style={AppStyles.textColor}>No. of students not submitted : </Text>
            <Caption style={[AppStyles.errorBatchStyle]}>{item.details.notSubmittedStudentCount}</Caption>
            </View>
         </View>


            {/* <Text style={AppStyles.textColor}>No. of students absent: <Text>{item.details.absentStudents}</Text></Text> */}
          </View>
        </View>
      </View>
    ) : (
      <View style={styles.mainContainer}>
        <View style={AppStyles.margin_2}>
          <Subheading>There is no assignment</Subheading>
          <View style={[AppStyles.alignItems, AppStyles.marginTop_3]}>
            <CustomButtons
              onPress={() => this.addNewAssignemnt(item)}
              title="Create new Assignment"
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



  // onRefresh (){
  //   const {
  //     stateObject
  //   } = this.props

  //   stateObject.parentStateChange({
  //     calendarRefresh:false
  //   })
  // }


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
    // this.state.items=stateObject.state.calendarLoaditems;


     if(stateObject.state.calendarEmptyRefresh){
      this.state.items = {}
     }
     if(stateObject.state.calendarRefresh){
      this.state.items = stateObject.state.calendarLoaditems;
     }



    return (
      <Agenda
        items= {this.state.items}
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
        // onRefresh={() => this.onRefresh()}
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
  },

});

export default ClassAssignmentCalendar;

