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
import { View, StyleSheet, } from 'react-native';
import SelectListUtils from '../../../../utils/SelectListUtils'
import AppStyles from "../../../../AppStyles/AppStyles";
import InputText from '../../../../components/InputText';
import GeneralUtils from "../../../../utils/GeneralUtils";
import NewScreenDropDownPicker from '../../../../components/NewScreenDropDownPicker';
import CustomTimePicker from "../../../../components/CustomTimePicker"
import SubScreenUtils from "../../../../utils/SubScreenUtils";
import SuggestionTextInput from '../../../../components/SuggestionTextInput';
import SuggestionList from '../../../../components/SuggestionList';
import SearchUtils from "../../../../utils/SearchUtils";









class InstituteClassConfigPeriod extends Component {
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
    const { dataModel,periodTimingsEmptyrecord } = stateObject.state
    // const dummyTimeTable = cloneDeep(dataModel)
    periodTimingsEmptyrecord.teacherName = data.TeacherName;
    periodTimingsEmptyrecord.teacherID = data.TeacherId;


    // for (let item of dummyTimeTable.timeTable) {
    //   if (item.day == periodList.day) {
    //     item = periodList
    //   }
    // }

  }


  render() {
    const {
      stateObject,
      currentIndex
    } = this.props

    const { dataModel, editable, errorField, periodTimingsEmptyrecord } = stateObject.state
    const { parentStateChange } = stateObject
    var currentInd = 0
    if (currentIndex >= 1) {
      currentInd = currentIndex - 1
    }


    return (
      <View>
        <InputText
          required={false}
          editable={false}
          label={'Period number'}
          secureTextEntry={false}
          onChangeText={text => {
            periodTimingsEmptyrecord.periodNumber = text
            parentStateChange({ periodTimingsEmptyrecord: periodTimingsEmptyrecord })
          }}
          value={periodTimingsEmptyrecord.periodNumber}
          errorMessage={GeneralUtils.functions.getErrorMessage('field7', periodTimingsEmptyrecord.periodNumber, errorField, [], 'Period number')}
        />


        <View style={AppStyles.marginTop_1}>
          <CustomTimePicker
            required={false}
            editable={true}
            label={'Timing'}
            placeholder={'Pick start time'}
            secureTextEntry={false}
            value={`${SubScreenUtils.functions.getTimeValue(periodTimingsEmptyrecord.startTime.hour, periodTimingsEmptyrecord.startTime.min)} - ${SubScreenUtils.functions.getTimeValue(periodTimingsEmptyrecord.endTime.hour, periodTimingsEmptyrecord.endTime.min)}`}
            mode="time"
            onDateChange={value => {
              periodTimingsEmptyrecord.startTime.hour = SubScreenUtils.functions.setTimeValue(value).hour;
              periodTimingsEmptyrecord.startTime.min = SubScreenUtils.functions.setTimeValue(value).min;
              parentStateChange({ periodTimingsEmptyrecord: periodTimingsEmptyrecord })
            }}
            errorMessage={GeneralUtils.functions.getErrorMessage('field9', periodTimingsEmptyrecord.startTime.hour, errorField, [], 'Start Time')}
            is24Hour={true}
          />
        </View>

        <View >
          <NewScreenDropDownPicker
            editable={false}
            required={true}
            label={'Subject'}
            stateObject={stateObject}
            items={SelectListUtils.functions.selectMaster.SubjectMaster}
            value={periodTimingsEmptyrecord.subjectID}
            placeholder="Select subject"
            onChangeValue={(value) => {
              periodTimingsEmptyrecord.subjectID = value;
              parentStateChange({ periodTimingsEmptyrecord: periodTimingsEmptyrecord })

            }}
            dropdownName={'subjectDropdown'} 
            subHeadingRecordName = "a subject"
            onClear={() => {
              periodTimingsEmptyrecord.subjectID = '';
              parentStateChange({ periodTimingsEmptyrecord: periodTimingsEmptyrecord })
            }}
            errorMessage={GeneralUtils.functions.getErrorMessage('field8', periodTimingsEmptyrecord.subjectID, errorField, [], 'Subject')}
          />
        </View>


        <View style={[AppStyles.marginTop_1]}>


          <SuggestionTextInput
            required={false}
            editable={false}
            label={'Teacher Name'}
            placeholder={'Select teacher name'}
            secureTextEntry={false}
            value={periodTimingsEmptyrecord.teacherName}
            onFocus={() => {
              //  if(dataModel.teacherName == null || dataModel.teacherName == '' ){
              SearchUtils.functions.launchSuggestion(stateObject, '', 'teacherName')
              //  }
            }
            }
            onClear={() => {
              periodTimingsEmptyrecord.teacherName = '';
              periodTimingsEmptyrecord.teacherID = '';
              parentStateChange({ periodTimingsEmptyrecord: periodTimingsEmptyrecord })
            }}
            errorMessage={GeneralUtils.functions.getErrorMessage('field8', periodTimingsEmptyrecord.teacherName, errorField, [], 'Subject')}
          />

        </View>
        <View style={[AppStyles.marginTop_1]}>
          <InputText
            required={false}
            editable={false}
            label={'Teacher ID'}
            value={periodTimingsEmptyrecord.teacherID}
          />

        </View>

        <SuggestionList
        stateObject={stateObject}
        searchFieldName={stateObject.state.searchFieldName}
        searchText={stateObject.state.searchText}
        visible={stateObject.state.seachVisible}
        searchName={'teacherPostSuggestion'}
        colHeading={['Name', 'Id',]}
        mapping={['TeacherName', 'TeacherId',]}
        postSuggestionListresultClick={this.postSuggestionListresultClick}
        SuggestionHeading={'Teacher'}
      />



      </View>
    );
  }
}

const styles = StyleSheet.create({

})
export default InstituteClassConfigPeriod;

