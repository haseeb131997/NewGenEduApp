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
import { View, StyleSheet, TextInput, TouchableOpacity, Platform } from 'react-native';
import AppStyles from "../../../../AppStyles/AppStyles";
import FilterSuggestionTextInput from '../../../../components/FilterSuggestionTextInput';
import SuggestionList from '../../../../components/SuggestionList';
import SearchUtils from "../../../../utils/SearchUtils";
import GeneralUtils from "../../../../utils/GeneralUtils";
import FilterInputText from '../../../../components/FilterInputText';
//import CustomDropDownPicker from '../../../../components/CustomDropDownPicker';
//import SelectListUtils from '../../../../utils/SelectListUtils'
import SubScreenUtils from "../../../../utils/SubScreenUtils";
import {  Text} from 'react-native-paper';
import { UiColor } from '../../../../theme';
import { h } from "../../../../utils/Dimensions";







var searchName;

class StudentSoftSkillFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }
    this.postSuggestionListresultClick = this.postSuggestionListresultClick.bind(this)
  }

  async postSuggestionListresultClick(data) {
    console.log(data)
    const { stateObject } = this.props
    const { summaryDataModel } = stateObject.state
    const { parentStateChange } = stateObject
    const dummyDatamodel = Object.assign({}, summaryDataModel)
    dummyDatamodel.filter.studentName = data.StudentName;
    dummyDatamodel.filter.studentID = data.StudentId;
    // parentStateChange({ summaryDataModel: dummyDatamodel })

    if (stateObject.state.userType == 'P' || stateObject.state.userType == 'S') {
      await parentStateChange({
        summaryDataModel: dummyDatamodel,
        displayContent: 'summaryDataModel'
      })
      SubScreenUtils.functions.parentSummaryData(stateObject)
    }
    else {
      parentStateChange({ summaryDataModel: dummyDatamodel })
    }

  }


  render() {
    const {
      stateObject
    } = this.props
    const { summaryDataModel, errorField } = stateObject.state
    const { parentStateChange } = stateObject
    return (
      <View style={[AppStyles.margin_1]}>
        <FilterSuggestionTextInput
          required={true}
          label={stateObject.state.userType == 'P' ? 'Select Student' : 'Student Name'}
          placeholder={'Select student name'}
          secureTextEntry={false}
          value={summaryDataModel.filter.studentName}
          onFocus={() => {
            searchName ='studentPostSuggestion'   
            SearchUtils.functions.launchSuggestion(stateObject, '', 'studentName')
          }
          }
          onClear={() => {
            summaryDataModel.filter.studentName = '';
            summaryDataModel.filter.studentID = '';
            parentStateChange({ summaryDataModel: summaryDataModel })
          }}
          errorMessage={GeneralUtils.functions.getErrorMessage('field1', summaryDataModel.filter.studentName, errorField, [], 'Student Name')}
        />

        {(summaryDataModel.filter.studentID != '' && (stateObject.state.userType == 'A' || stateObject.state.userType == 'T' || stateObject.state.userType == 'A' || stateObject.state.userType == 'O')) && <FilterInputText
          required={false}
          editable={false}
          label={'Student Id'}
          // placeholder={'Student Id'}
          value={summaryDataModel.filter.studentID}

        />}

        {/* <FilterSuggestionTextInput
          required={true}
          label={'Student Id'}
          placeholder={'Select student Id'}
          secureTextEntry={false}
          value={summaryDataModel.filter.studentID}
          onFocus={() => {
      
            SearchUtils.functions.launchSuggestion(stateObject, '', 'studentID')
          }
          }
          onClear={() => {
            summaryDataModel.filter.studentID = '';
            parentStateChange({ summaryDataModel: summaryDataModel })
          }}
          errorMessage={GeneralUtils.functions.getErrorMessage('field2', summaryDataModel.filter.studentID, errorField, [], 'Student ID')}
        /> */}

        {(stateObject.state.userType == 'A' || stateObject.state.userType == 'T' || stateObject.state.userType == 'O') && /*<CustomDropDownPicker
          required={true}
          label={'Exam'}
          stateObject={stateObject}
          items={SelectListUtils.functions.selectMaster.ExamMaster}
          value={SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.ExamMaster, summaryDataModel.filter.exam)}
          placeholder="Select exam"
          onChangeValue={(value) => {
            summaryDataModel.filter.exam = value;
            parentStateChange({ summaryDataModel: summaryDataModel })
          }}
          dropdownName={'examDropdown'}
          subHeadingRecordName="an exam"
          onClear={() => {
            summaryDataModel.filter.exam = '';
            parentStateChange({ summaryDataModel: summaryDataModel })
          }}
          errorMessage={GeneralUtils.functions.getErrorMessage('field3', summaryDataModel.filter.exam, errorField, [], 'Exam')}
        />}*/


<View style={[styles.container,AppStyles.margin_1]}>
      <View style={AppStyles.flexDirectionRow}>
<View>
      <FilterSuggestionTextInput
          //tooltipReq={true}
          //tooltipMsg={'Mention the exam is to be assessed.'}
          // tooltipStyle={styles.tooltipStyle}
          applyLeftStyle={true}
          required={true}
          editable={false}
          label={'Exam'}
          placeholder={'Select Exam'}
          secureTextEntry={false}
          value={summaryDataModel.filter.examDescription}
          onFocus={() => {
            searchName='ExamSearchFilter'
            //  if(dataModel.class == null || dataModel.class == '' ){
            SearchUtils.functions.launchSuggestion(stateObject, '', 'ExamSearch')
            //  }
          }
          }
          onClear={() => {
            summaryDataModel.filter.exam = '';
            summaryDataModel.filter.examDescription = '';
            summaryDataModel.filter.class = '';
            summaryDataModel.filter.classDesc= '';
            parentStateChange({ summaryDataModel: summaryDataModel })
          }}
          errorMessage={GeneralUtils.functions.getErrorMessage('field3', summaryDataModel.filter.exam, errorField, [], 'Exam')}
        />
        
      
            
              <Text style={[styles.labelStyle]}>
                Class
                </Text>
               <View style={[styles.inputView, AppStyles.marginTop_1]}>
          {console.log('classDescription',summaryDataModel.filter.classDesc)}
            <TextInput
              autoCapitalize='none'
              value={summaryDataModel.filter.classDesc==''?'Defaulted by selecting the Exam':summaryDataModel.filter.classDesc}
              secureTextEntry={false}
              // onChangeText={text => onChangeText(text)}
              style={styles.inputs}
              editable={false}
              //placeholder={placeholder}
              pointerEvents="none"
            />
            </View>
            
       
         
      </View> 
</View>
</View>



/*
        {(stateObject.state.userType == 'A' || stateObject.state.userType == 'T' || stateObject.state.userType == 'O') && <CustomDropDownPicker
          // required={true}
          label={'Parent signature status'}
          stateObject={stateObject}
          items={SelectListUtils.functions.selectMaster.SignMasterMaster}
          value={SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.SignMasterMaster, summaryDataModel.filter.signStatus)}
          placeholder="Select parent signature status"
          onChangeValue={(value) => {
            summaryDataModel.filter.signStatus = value;
            parentStateChange({ summaryDataModel: summaryDataModel })
          }}
          dropdownName={'signatureDropdown'}
          subHeadingRecordName="a parent signature status"
          onClear={() => {
            summaryDataModel.filter.signStatus = '';
            parentStateChange({ summaryDataModel: summaryDataModel })
          }}
        */}
        {<SuggestionList
          stateObject={stateObject}
          searchFieldName={stateObject.state.searchFieldName}
          searchText={stateObject.state.searchText}
          visible={stateObject.state.seachVisible}
          searchName={searchName}
          colHeading={searchName=='studentPostSuggestion'?['Name', 'Id']:['Exam','Class Desc','Start Date','End Date']}
          mapping={searchName=='studentPostSuggestion'?['StudentName', 'StudentId']:['examDescription','classDescription','startDate','endDate']}
          SuggestionHeading={searchName=='studentPostSuggestion'?'Student':'Exam'}
          postSuggestionListresultClick={searchName=='studentPostSuggestion'?this.postSuggestionListresultClick:null}
          
      />}
      </View>

    );
  }
}

const styles = StyleSheet.create({
  inputs: {
    flex: 1,
    color: UiColor.DRAK_GRAY_COLOR,
   paddingHorizontal: 5,

  },
  inputView: {
    width: '100%',
    height: h('6%'),
    backgroundColor: UiColor.WHITE,
    borderRadius: 6,
    paddingHorizontal: 10,
    display: 'flex',
    flexDirection: 'row'
  },
  labelStyle: {
    // marginLeft:h('1%'),
    fontWeight: '400'
  },
})
export default StudentSoftSkillFilter;

