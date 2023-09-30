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
import { View, StyleSheet,} from 'react-native';
import { w, h } from "../../../../utils/Dimensions";
import AppStyles from "../../../../AppStyles/AppStyles";
import InputText from '../../../../components/InputText';
import SuggestionTextInput from '../../../../components/SuggestionTextInput';
import SuggestionList from '../../../../components/SuggestionList';
import SearchUtils from "../../../../utils/SearchUtils";
import CustomRadioButton from '../../../../components/CustomRadioButton';
import CustomLabel from '../../../../components/CustomLabel';







var searchName = 'studentPostSuggestion'


class GroupDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      // currentIndex: 1,
    }
    this.postSuggestionListresultClick = this.postSuggestionListresultClick.bind(this)

  }


  chooseOptions(type) {
    const {
      stateObject
    } = this.props

    const { dataModel, groupEmptyrecord } = stateObject.state
    if (type == 'class') {
      groupEmptyrecord.studentName = '';
      groupEmptyrecord.studentID = '';
      stateObject.parentStateChange({
        selectOption: type,
        dataModel: dataModel
      })
    }
    else if (type == 'student') {
      groupEmptyrecord.class = ''
      stateObject.parentStateChange({
        selectOption: type,
        dataModel: dataModel
      })
    }


  }

  postSuggestionListresultClick(data) {
    const { stateObject } = this.props
    const { dataModel, groupEmptyrecord } = stateObject.state
    const { parentStateChange } = stateObject
    switch (searchName) {
      case 'studentPostSuggestion':
        groupEmptyrecord.studentName = data.StudentName;
        groupEmptyrecord.studentID = data.StudentId;
        break
      case 'classPostSuggestion':
        groupEmptyrecord.class = data.classCode;
        break
    }
    parentStateChange({ groupEmptyrecord: groupEmptyrecord })
  }


  render() {
    const {
      stateObject,
      currentIndex
    } = this.props

    const { dataModel, editable, errorField, groupEmptyrecord } = stateObject.state
    const { parentStateChange } = stateObject
    var currentInd = 0
    if (currentIndex >= 1) {
      currentInd = currentIndex - 1
    }


    return (
      <View>

        <CustomLabel
          label={'Member Type'}
          required={false}
          template={
            <View style={[AppStyles.flexDirectionRow]}>
              <CustomRadioButton
                label={'Class'}
                onPress={() => this.chooseOptions('class')}
                checked={stateObject.state.selectOption == 'class' ? true : false}
                disabled={false}
              />

              <CustomRadioButton
                label={'Student'}
                onPress={() => this.chooseOptions('student')}
                checked={stateObject.state.selectOption == 'student' ? true : false}
                disabled={false}
              />

            </View>
          }
        />




        {stateObject.state.selectOption == 'class' && <SuggestionTextInput
          tooltipReq={true}
          tooltipMsg={'Mention the class for which the group is to be created.Both Classes and Students should not be selected.'}
          tooltipStyle={styles.tooltipStyle}
          required={false}
          // editable={primaryKeyEditable}
          label={'Class'}
          placeholder={'Select class'}
          secureTextEntry={false}
          value={groupEmptyrecord.class}
          onFocus={() => {
            searchName = 'classPostSuggestion'
            SearchUtils.functions.launchSuggestion(stateObject, '', 'class')
          }}
          onClear={() => {
            groupEmptyrecord.class = '';
            parentStateChange({ groupEmptyrecord: groupEmptyrecord })
          }}
        //  errorMessage={GeneralUtils.functions.getErrorMessage('field1',groupEmptyrecord.class,errorField,[],'Class')}
        />}


        {stateObject.state.selectOption == 'student' && <View>
          <View style={[AppStyles.marginTop_1]}>
            <SuggestionTextInput
              tooltipReq={true}
              tooltipMsg={'Mention the students to create a group.Both Classes and Students should not be selected.'}
              tooltipStyle={styles.tooltipStyle}
              // required={false}
              editable={editable}
              label={'Student Name'}
              placeholder={'Select student name'}
              secureTextEntry={false}
              value={groupEmptyrecord.studentName}
              onFocus={() => {
                searchName = 'studentPostSuggestion'
                //  if(groupEmptyrecord.teacherName == null || groupEmptyrecord.teacherName == '' ){
                SearchUtils.functions.launchSuggestion(stateObject, '', 'studentName')
                //  }
              }
              }
              onClear={() => {
                groupEmptyrecord.studentName = '';
                groupEmptyrecord.studentID = '';
                parentStateChange({ groupEmptyrecord: groupEmptyrecord })
              }}
            />

          </View>
          <View style={[AppStyles.marginTop_1]}>
            <InputText
              required={false}
              editable={false}
              label={'Student ID'}
              value={groupEmptyrecord.studentID}
            />

          </View>
        </View>}

        <SuggestionList
          stateObject={stateObject}
          searchFieldName={stateObject.state.searchFieldName}
          searchText={stateObject.state.searchText}
          visible={stateObject.state.seachVisible}
          searchName={searchName}
          colHeading={searchName == 'studentPostSuggestion' ? ['Name', 'Id'] : ['Class', 'Desc', 'Year/Standard', 'Major/Section']}
          mapping={searchName == 'studentPostSuggestion' ? ['StudentName', 'StudentId'] : ['classCode', 'classDesc', 'standard', 'section']}
          SuggestionHeading={searchName == 'studentPostSuggestion' ? 'Student' : 'Class'}
          postSuggestionListresultClick={this.postSuggestionListresultClick}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tooltipStyle: {
    height: h('20%'), width: w('60%')
  }
})
export default GroupDetails;

