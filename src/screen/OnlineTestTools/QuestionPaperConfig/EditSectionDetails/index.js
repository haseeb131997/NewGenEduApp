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
import { View, StyleSheet, Image, TouchableWithoutFeedback, ScrollView, Platform } from 'react-native';
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
import InputTextArea from '../../../../components/InputTextArea';








class EditSectionDetails extends Component {
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
    const { dataModel, sectionDetailsEmptyrecord } = stateObject.state
    const { parentStateChange } = stateObject
    sectionDetailsEmptyrecord.hall = data.classCode;
    parentStateChange({ sectionDetailsEmptyrecord: stateObject.state.sectionDetailsEmptyrecord })
  }






  render() {
    const {
      stateObject,
      currentIndex
    } = this.props

    const { dataModel, editable, errorField, sectionDetailsEmptyrecord } = stateObject.state
    const { parentStateChange } = stateObject


    return (
      <View>
        {/* <Subheading style={AppStyles.bold_600}>{'Section Details'}</Subheading> */}

        <InputText
          // tooltipReq={true}
          // tooltipMsg={'By default, system will provide an auto-generated Student ID that can be used. If the institute wants to assign their own student ID, then that ID can be entered replacing the auto-generated ID'}
          // tooltipStyle={styles.tooltipStyle}
          required={true}
          label={'Section Name'}
          secureTextEntry={false}
          onChangeText={text => {
            sectionDetailsEmptyrecord.sectionName = text
            parentStateChange({ sectionDetailsEmptyrecord: sectionDetailsEmptyrecord })
          }}
          value={sectionDetailsEmptyrecord.sectionName}
          errorMessage={GeneralUtils.functions.getErrorMessage('field1', sectionDetailsEmptyrecord.sectionName, errorField, [], 'Section Name')}
        />

        <InputText
          // tooltipReq={true}
          // tooltipMsg={'Enter the maximum marks to be secured in an examination.'}
          // tooltipStyle={styles.tooltipStyle}
          required={true}
          label={'Maximum Question'}
          keyboardType='numeric'
          secureTextEntry={false}
          onChangeText={text => {
            sectionDetailsEmptyrecord.maxQuestion = text
            parentStateChange({ sectionDetailsEmptyrecord: sectionDetailsEmptyrecord })
          }}
          value={sectionDetailsEmptyrecord.maxQuestion}
          errorMessage={GeneralUtils.functions.getErrorMessage('field2', sectionDetailsEmptyrecord.maxQuestion, errorField, [], 'Maximum Question')}
        />

        <InputText
          // tooltipReq={true}
          // tooltipMsg={'Enter the maximum marks to be secured in an examination.'}
          // tooltipStyle={styles.tooltipStyle}
          required={true}
          label={'Maximum Mark'}
          keyboardType='numeric'
          secureTextEntry={false}
          onChangeText={text => {
            sectionDetailsEmptyrecord.maxMark = text
            parentStateChange({ sectionDetailsEmptyrecord: sectionDetailsEmptyrecord })
          }}
          value={sectionDetailsEmptyrecord.maxMark}
          errorMessage={GeneralUtils.functions.getErrorMessage('field3', sectionDetailsEmptyrecord.maxMark, errorField, [], 'Maximum Mark')}
        />


        <View style={AppStyles.marginTop_1}>
          <CustomTimePicker
            tooltipReq={false}
            tooltipMsg={'Specify the time at which the exam is to be started.'}
            // tooltipStyle={styles.tooltipStyle}
            required={true}
            editable={editable}
            label={'Maximum Alloted Time'}
            placeholder={'Pick maximum alloted time'}
            secureTextEntry={false}
            value={SubScreenUtils.functions.getTimeValue(sectionDetailsEmptyrecord.maxTimeHour, sectionDetailsEmptyrecord.maxTimeMin)}
            mode="time"
            onDateChange={value => {
              sectionDetailsEmptyrecord.maxTimeHour = SubScreenUtils.functions.setTimeValue(value).hour;
              sectionDetailsEmptyrecord.maxTimeMin = SubScreenUtils.functions.setTimeValue(value).min;
              parentStateChange({ sectionDetailsEmptyrecord: sectionDetailsEmptyrecord })
            }}
            errorMessage={GeneralUtils.functions.getErrorMessage('field4', sectionDetailsEmptyrecord.maxTimeHour, errorField, [], 'Maximum Alloted Time')}
            is24Hour={true}
          />
        </View>


        <InputTextArea
          required={true}
          editable={!editable}
          label={'Section Instructions'}
          secureTextEntry={false}
          value={sectionDetailsEmptyrecord.sectionInstructions}
          placeholder={'Enter section instructions'}
          onChangeText={text => {
            sectionDetailsEmptyrecord.sectionInstructions = text
            parentStateChange({ sectionDetailsEmptyrecord: sectionDetailsEmptyrecord })
          }}
          errorMessage={GeneralUtils.functions.getErrorMessage('field5', sectionDetailsEmptyrecord.sectionInstructions, errorField, [], 'Section Instructions')}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  tooltipStyle: {
    height: h('15%'), width: w('50%'),
  }
})
export default EditSectionDetails;

