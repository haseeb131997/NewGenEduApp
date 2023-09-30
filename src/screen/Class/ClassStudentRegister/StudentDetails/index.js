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
import { TextInput, Card, Text, Divider } from 'react-native-paper';
import { w, h } from "../../../../utils/Dimensions";
import SelectListUtils from '../../../../utils/SelectListUtils'
import AppStyles from "../../../../AppStyles/AppStyles";
import InputText from '../../../../components/InputText';
import SuggestionTextInput from '../../../../components/SuggestionTextInput';
import SuggestionList from '../../../../components/SuggestionList';
import SearchUtils from "../../../../utils/SearchUtils";
import GeneralUtils from "../../../../utils/GeneralUtils";







var searchName = 'studentPostSuggestion'


class StudentDetails extends Component {
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
    const { dataModel, studentsEmptyrecord } = stateObject.state
    const { parentStateChange } = stateObject

    studentsEmptyrecord.studentName = data.StudentName;
    studentsEmptyrecord.studentID = data.StudentId;
    parentStateChange({ studentsEmptyrecord: studentsEmptyrecord })
  }


  render() {
    const {
      stateObject,
      currentIndex
    } = this.props

    const { dataModel, editable, errorField, studentsEmptyrecord } = stateObject.state
    const { parentStateChange } = stateObject
    var currentInd = 0
    if (currentIndex >= 1) {
      currentInd = currentIndex - 1
    }


    return (
      <View>
        <View style={[AppStyles.marginTop_1]}>
          <SuggestionTextInput
           tooltipReq={true}
           tooltipMsg={'Mention the students to be assigned under the selected class.'}
            // required={false}
            editable={editable}
            label={'Student Name'}
            placeholder={'Select student name'}
            secureTextEntry={false}
            value={studentsEmptyrecord.studentName}
            onFocus={() => {
              searchName = 'studentPostSuggestion'
              //  if(studentsEmptyrecord.teacherName == null || studentsEmptyrecord.teacherName == '' ){
              SearchUtils.functions.launchSuggestion(stateObject, '', 'studentName')
              //  }


            }
            }
            onClear={() => {
              studentsEmptyrecord.studentName = '';
              studentsEmptyrecord.studentID = '';
              parentStateChange({ studentsEmptyrecord: studentsEmptyrecord })
            }}

            errorMessage={GeneralUtils.functions.getErrorMessage('field5',studentsEmptyrecord.studentName, errorField, [], 'Student Name')}

          />

        </View>
        <View style={[AppStyles.marginTop_1]}>
          <InputText
            required={false}
            editable={false}
            label={'Student ID'}
            value={studentsEmptyrecord.studentID}
        // errorMessage={GeneralUtils.functions.getErrorMessage('field6', studentsEmptyrecord.studentID, errorField, [], 'Student ID')}

          />

        </View>

        <SuggestionList
          stateObject={stateObject}
          searchFieldName={stateObject.state.searchFieldName}
          searchText={stateObject.state.searchText}
          visible={stateObject.state.seachVisible}
          searchName={'studentPostSuggestion'}
          colHeading={['Name', 'Id']}
          mapping={['StudentName', 'StudentId']}
          SuggestionHeading={'Student'}
          postSuggestionListresultClick={this.postSuggestionListresultClick}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({

})
export default StudentDetails;

