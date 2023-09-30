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
import { View, StyleSheet, Image, TouchableOpacity, Platform } from 'react-native';
import AppStyles from "../../../../AppStyles/AppStyles";
import ExamSuggestion from '../../../../components/ExamSuggestion';
import SuggestionList from '../../../../components/SuggestionList';
//import SearchUtils from "../../../../utils/SearchUtils";
import GeneralUtils from "../../../../utils/GeneralUtils";
//import FilterInputText from '../../../../components/FilterInputText';
import CustomDropDownPicker from '../../../../components/CustomDropDownPicker';
import SelectListUtils from '../../../../utils/SelectListUtils'










class StudentSoftSkillFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
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

<ExamSuggestion
        required={true}
        editable={true}
        stateObject= {stateObject} 
        classCode={"class"} 
        classDescription="classDesc" 
        examID='exam'
        examDescription='examDescription'
        compType='Filter'
        errorMessage={GeneralUtils.functions.getErrorMessage('field3', summaryDataModel.filter.exam, errorField, [], 'Exam')}
        />    
          {/* <FilterSuggestionTextInput
          required={true}
          label={'Class'}
          placeholder={'Select class'}
          secureTextEntry={false}
          value={summaryDataModel.filter.class}
          onFocus={() => {

            SearchUtils.functions.launchSuggestion(stateObject, '', 'class')
          }
          }
          onClear={() => {
            summaryDataModel.filter.class = '';
            parentStateChange({ summaryDataModel: summaryDataModel })
          }}
          errorMessage={GeneralUtils.functions.getErrorMessage('field1', summaryDataModel.filter.class, errorField, [], 'Class')}
        />

        {summaryDataModel.filter.studentID != '' && <FilterInputText
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
        /> 

<CustomDropDownPicker
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
        />
*/}

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
        />}

       {/*} <SuggestionList
          stateObject={stateObject}
          searchFieldName={stateObject.state.searchFieldName}
          searchText={stateObject.state.searchText}
          visible={stateObject.state.seachVisible}
          searchName={'classSummaryDataModel1'}
          colHeading={['Class', 'Desc','Year/Standard','Major/Section']}
          mapping={['classCode', 'classDesc','standard','section']}
          SuggestionHeading={'Class'}
        />*/}
      </View>

    );
  }
}

const styles = StyleSheet.create({

})
export default StudentSoftSkillFilter;

