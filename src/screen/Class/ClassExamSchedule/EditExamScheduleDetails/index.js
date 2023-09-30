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
import { View, StyleSheet, Image, TouchableWithoutFeedback, ScrollView,Platform } from 'react-native';
import { Subheading } from 'react-native-paper';
import { w, h } from "../../../../utils/Dimensions";
import SelectListUtils from '../../../../utils/SelectListUtils'
import AppStyles from "../../../../AppStyles/AppStyles";
import InputText from '../../../../components/InputText';
import GeneralUtils from "../../../../utils/GeneralUtils";
import NewScreenDropDownPicker from '../../../../components/NewScreenDropDownPicker';
import CustomTimePicker from "../../../../components/CustomTimePicker"
import SubScreenUtils from "../../../../utils/SubScreenUtils";
import SuggestionList from '../../../../components/SuggestionList';
import SuggestionTextInput from '../../../../components/SuggestionTextInput';
import CustomDatePicker from "../../../../components/CustomDatePicker"
import SearchUtils from "../../../../utils/SearchUtils";








class EditExamScheduleDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      // currentIndex: 1,
    }
    this.postSuggestionListresultClick = this.postSuggestionListresultClick.bind(this)

  }


  postSuggestionListresultClick(data) {
    const { stateObject } = this.props
    const { dataModel, Subjectschedulesemptyrecord } = stateObject.state
    const { parentStateChange } = stateObject
    Subjectschedulesemptyrecord.hall = data.classCode;
    parentStateChange({ Subjectschedulesemptyrecord: stateObject.state.Subjectschedulesemptyrecord })
  }



  // var Subjectschedulesemptyrecord = {
    // idx: '',
    //       subjectID: "",
    //       date: "",
    //       startTime: {
    //         hour: "",
    //         min: ""
    //       },
    //       endTime: {
    //         hour: "",
    //         min: ""
    //       },
    //       hall: "",
    //       maxMark: '',
    //       syllabus: ''
  // }


  render() {
    const {
      stateObject,
      currentIndex
    } = this.props

    const { dataModel, editable, errorField,Subjectschedulesemptyrecord } = stateObject.state
    const { parentStateChange } = stateObject
   
console.log(Subjectschedulesemptyrecord,"Subjectschedulesemptyrecord")
    return (
      <View>
      <Subheading style={AppStyles.bold_600}>{'Subject Schedule Details'}</Subheading>
        <View style={[AppStyles.marginTop_2]}>
          <NewScreenDropDownPicker
            editable={editable}
            required={true}
            label={'Subject'}
            stateObject={stateObject}
            items={SelectListUtils.functions.selectMaster.SubjectMaster}
            value={SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.SubjectMaster, Subjectschedulesemptyrecord.subjectID)}
            placeholder="Select Subject"
            onChangeValue={(value) => {
              Subjectschedulesemptyrecord.subjectID = value;
              parentStateChange({ Subjectschedulesemptyrecord: Subjectschedulesemptyrecord })
            }}
            dropdownName={'subjectDropdown'} 
            subHeadingRecordName = "a subject"
            onClear={() => {
              Subjectschedulesemptyrecord.subjectID= '';
              parentStateChange({ Subjectschedulesemptyrecord: Subjectschedulesemptyrecord })
            }}
            errorMessage={GeneralUtils.functions.getErrorMessage('field1', Subjectschedulesemptyrecord.subjectID, errorField, [], 'Subject')}
          />
        </View>


        <View style={AppStyles.marginTop_1}>
          <CustomDatePicker
            tooltipReq={true}
            tooltipMsg={'Specify the date on which the exam is to be held. '}
            // tooltipStyle={styles.tooltipStyle}
            required={true}
            label={'Date'}
            placeholder={'Pick date'}
            secureTextEntry={false}
            // onChangeText={text => console.log(text,'p')}
            value={Subjectschedulesemptyrecord.date}
            format="DD-MM-YYYY"
            mode="date"
            onDateChange={value => {
              Subjectschedulesemptyrecord.date = value;
              parentStateChange({ Subjectschedulesemptyrecord: Subjectschedulesemptyrecord })
            }}
            errorMessage={GeneralUtils.functions.getErrorMessage('field2', Subjectschedulesemptyrecord.date, errorField, [], 'Date')}
          />
        </View>


        <View style={AppStyles.marginTop_1}>
          <CustomTimePicker
            tooltipReq={true}
            tooltipMsg={'Specify the time at which the exam is to be started.'}
            // tooltipStyle={styles.tooltipStyle}
            required={true}
            editable={editable}
            label={'Start Time'}
            placeholder={'Pick start time'}
            secureTextEntry={false}
            value={SubScreenUtils.functions.getTimeValue(Subjectschedulesemptyrecord.startTime.hour,Subjectschedulesemptyrecord.startTime.min)}
            mode="time"
            onDateChange={value => {
              
              Subjectschedulesemptyrecord.startTime.hour = SubScreenUtils.functions.setTimeValue(value).hour;
              Subjectschedulesemptyrecord.startTime.min = SubScreenUtils.functions.setTimeValue(value).min;
              parentStateChange({ Subjectschedulesemptyrecord: Subjectschedulesemptyrecord })
            }}
            errorMessage={GeneralUtils.functions.getErrorMessage('field3',  Subjectschedulesemptyrecord.startTime.hour, errorField, [], 'Start Time')}
            is24Hour={true}
          />
        </View>

        <View style={AppStyles.marginTop_1}>
          <CustomTimePicker
            tooltipReq={true}
            tooltipMsg={'Specify the time at which the exam is to be finished. '}
            // tooltipStyle={styles.tooltipStyle}
            required={true}
            editable={editable}
            label={'End Time'}
            placeholder={'Pick end time'}
            secureTextEntry={false}
            value={SubScreenUtils.functions.getTimeValue(Subjectschedulesemptyrecord.endTime.hour,Subjectschedulesemptyrecord.endTime.min)}
            mode="time"
            onDateChange={value => {
              Subjectschedulesemptyrecord.endTime.hour = SubScreenUtils.functions.setTimeValue(value).hour;
              Subjectschedulesemptyrecord.endTime.min = SubScreenUtils.functions.setTimeValue(value).min;
              parentStateChange({ Subjectschedulesemptyrecord: Subjectschedulesemptyrecord })
            }}
            errorMessage={GeneralUtils.functions.getErrorMessage('field4', Subjectschedulesemptyrecord.endTime.hour, errorField, [], 'End Time')}
            is24Hour={true}
          />
        </View>


      <View style={[AppStyles.marginTop_1]}>
        <SuggestionTextInput
          tooltipReq={true}
          tooltipMsg={'Mention the class where the exam is to be held. '}
          // tooltipStyle={styles.tooltipStyle}
          required={false}
           label={'Hall'}
           placeholder={'Select class'}
           secureTextEntry={false}
           value={Subjectschedulesemptyrecord.hall}
          onFocus={()=>  
            { 
            //  if(Subjectschedulesemptyrecord.hall == null || Subjectschedulesemptyrecord.hall == '' ){
               SearchUtils.functions.launchSuggestion(stateObject,'', 'class')
            //  }
           }  
          }
          onClear={()=> { 
            Subjectschedulesemptyrecord.hall = '';
            parentStateChange({ dataModel: dataModel })
           }}
          // errorMessage={GeneralUtils.functions.getErrorMessage('field5', Subjectschedulesemptyrecord.hall, errorField, [], 'Hall')}
        />
      </View>

      <InputText
        tooltipReq={true}
        tooltipMsg={'Enter the maximum marks to be secured in an examination.'}
        tooltipStyle={styles.tooltipStyle}
          required={true}
          label={'Maximum Mark'}
          keyboardType='numeric'
          secureTextEntry={false}
          onChangeText={text => {
            Subjectschedulesemptyrecord.maxMark = text
            parentStateChange({ Subjectschedulesemptyrecord: Subjectschedulesemptyrecord })
          }}
          value={Subjectschedulesemptyrecord.maxMark}
        errorMessage={GeneralUtils.functions.getErrorMessage('field6', Subjectschedulesemptyrecord.maxMark, errorField, [], 'Maximum Mark')}
        />


      <InputText
       tooltipReq={true}
       tooltipMsg={'Mention the lessons or units of the subject considered for the exam.'}
       tooltipStyle={styles.tooltipStyle}
          required={true}
          label={'Syllabus/Remarks'}
          secureTextEntry={false}
          onChangeText={text => {
            Subjectschedulesemptyrecord.syllabus = text
            parentStateChange({ Subjectschedulesemptyrecord: Subjectschedulesemptyrecord })
          }}
          value={Subjectschedulesemptyrecord.syllabus}
          multiline={true}
        errorMessage={GeneralUtils.functions.getErrorMessage('field7', Subjectschedulesemptyrecord.syllabus, errorField, [], 'Syllabus/Remarks')}
        />



      <SuggestionList
        stateObject={stateObject}
        searchFieldName={stateObject.state.searchFieldName}
        searchText={stateObject.state.searchText}
        visible={stateObject.state.seachVisible}
        searchName={'classPostSuggestion'}
        colHeading={['Class', 'Desc', 'Year/Standard', 'Major/Section']}
        mapping={['classCode', 'classDesc', 'standard', 'section']}
        SuggestionHeading={'Hall'}
        postSuggestionListresultClick={this.postSuggestionListresultClick}
      /> 





      </View>
    );
  }
}

const styles = StyleSheet.create({
  tooltipStyle:{
     height:h('15%'),width:w('50%'),
  }
})
export default EditExamScheduleDetails;

