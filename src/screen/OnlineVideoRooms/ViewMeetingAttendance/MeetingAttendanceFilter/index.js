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

import SelectListUtils from '../../../../utils/SelectListUtils'
import AppStyles from "../../../../AppStyles/AppStyles";
import CustomDropDownPicker from '../../../../components/CustomDropDownPicker';
import GeneralUtils from "../../../../utils/GeneralUtils";
import SuggestionList from '../../../../components/SuggestionList';
import FilterSuggestionTextInput from '../../../../components/FilterSuggestionTextInput';
import SearchUtils from "../../../../utils/SearchUtils";
import SubScreenUtils from "../../../../utils/SubScreenUtils";



class MeetingAttendanceFilter extends Component {
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
    const { summaryDataModel, editable,errorField } = stateObject.state
    const { parentStateChange } = stateObject
    return (
      <View style={[AppStyles.margin_1]}>
       { (stateObject.state.userType == 'P') &&
        <FilterSuggestionTextInput
          required={true}
          label={stateObject.state.userType == 'P' ? 'Select Student' : 'Student Name'}
          placeholder={'Select student name'}
          secureTextEntry={false}
          value={summaryDataModel.filter.studentName}
          onFocus={() => {
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
        
        
        }
 {(stateObject.state.userType == 'A' || stateObject.state.userType == 'T' || stateObject.state.userType == 'O') && <View>
   <CustomDropDownPicker
        required= {true}
         label={'Select Meeting Type'}
          stateObject={stateObject}
          items={SelectListUtils.functions.selectMaster.MeetingScreenTypeMaster}
          value={SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.MeetingScreenTypeMaster, summaryDataModel.filter.meetingScreenType)}
          placeholder="Select Meeting Type"
          onChangeValue={(value) => {
            summaryDataModel.filter.meetingScreenType = value;
            parentStateChange({ summaryDataModel: summaryDataModel })
          }}
          dropdownName={'meetingTypeDropdown'} 
            subHeadingRecordName = "a Meeting Type"
            onClear={() => {
              summaryDataModel.filter.meetingScreenType = '';
              parentStateChange({ summaryDataModel: summaryDataModel })
            }}
         errorMessage={GeneralUtils.functions.getErrorMessage('field1', summaryDataModel.filter.meetingScreenType, errorField, [], 'Meeting Type')}
  
        />
        <CustomDropDownPicker
        required= {true}
         label={'Select month'}
          stateObject={stateObject}
          items={SelectListUtils.functions.selectMaster.MonthMaster}
          value={SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.MonthMaster, summaryDataModel.filter.month)}
          placeholder="Select month"
          onChangeValue={(value) => {
            summaryDataModel.filter.month = value;
            parentStateChange({ summaryDataModel: summaryDataModel })
          }}
          dropdownName={'monthDropdown'} 
            subHeadingRecordName = "a month"
            onClear={() => {
              summaryDataModel.filter.month = '';
              parentStateChange({ summaryDataModel: summaryDataModel })
            }}
            errorMessage={GeneralUtils.functions.getErrorMessage('field2', summaryDataModel.filter.meetingScreenType, errorField, [], 'Month')}
     
        />  
        <CustomDropDownPicker
        required= {true}
         label={'Select year'}
          stateObject={stateObject}
          items={SelectListUtils.functions.selectMaster.YearMaster}
          value={SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.YearMaster, summaryDataModel.filter.year)}
          placeholder="Select year"
          onChangeValue={(value) => {
            summaryDataModel.filter.year = value;
            parentStateChange({ summaryDataModel: summaryDataModel })
          }}
          dropdownName={'yearDropdown'} 
            subHeadingRecordName = "a year"
            onClear={() => {
              summaryDataModel.filter.year = '';
              parentStateChange({ summaryDataModel: summaryDataModel })
            }}
            errorMessage={GeneralUtils.functions.getErrorMessage('field3', summaryDataModel.filter.year, errorField, [], 'year')}
   
        />

 </View>}
 
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
  container: {
    zIndex: 1000
  }
})
export default MeetingAttendanceFilter;

