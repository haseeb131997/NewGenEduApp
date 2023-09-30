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
import FilterSuggestionTextInput from '../../../../components/FilterSuggestionTextInput';
import SuggestionList from '../../../../components/SuggestionList';
import SearchUtils from "../../../../utils/SearchUtils";
import CustomDropDownPicker from '../../../../components/CustomDropDownPicker';
import GeneralUtils from "../../../../utils/GeneralUtils";
//import FilterInputText from '../../../../components/FilterInputText';






class StudentAttendanceFilter extends Component {
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
        <FilterSuggestionTextInput
          required={true}
          label={'Student Name'}
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

        {/* {summaryDataModel.filter.studentID  != '' && <FilterInputText
          required={false}
          editable={false}
          label={'Student Id'}
          value={summaryDataModel.filter.studentID}
        
        />} */}


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

        <CustomDropDownPicker
          required={true}
          label={'Month'}
          stateObject={stateObject}
          items={SelectListUtils.functions.selectMaster.MonthMaster}
          value={SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.MonthMaster, summaryDataModel.filter.month)}
          placeholder="Select month"
          onChangeValue={(value) => {
            summaryDataModel.filter.month = value;
            parentStateChange({ summaryDataModel: summaryDataModel })
          }}
          dropdownName={'monthDropdown'}
          subHeadingRecordName="a month"
          onClear={() => {
            summaryDataModel.filter.month = '';
            parentStateChange({ summaryDataModel: summaryDataModel })
          }}
          errorMessage={GeneralUtils.functions.getErrorMessage('field4', summaryDataModel.filter.month, errorField, [], 'Month')}
        />


        <CustomDropDownPicker
          required={true}
          label={'Year'}
          stateObject={stateObject}
          items={SelectListUtils.functions.selectMaster.YearMaster}
          value={SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.YearMaster, summaryDataModel.filter.year)}
          placeholder="Select year"
          onChangeValue={(value) => {
            summaryDataModel.filter.year = value;
            parentStateChange({ summaryDataModel: summaryDataModel })
          }}
          dropdownName={'yearDropdown'}
          subHeadingRecordName="a year"
          onClear={() => {
            summaryDataModel.filter.year = '';
            parentStateChange({ summaryDataModel: summaryDataModel })
          }}
          errorMessage={GeneralUtils.functions.getErrorMessage('field3', summaryDataModel.filter.year, errorField, [], 'Year')}
        />




        <SuggestionList
          stateObject={stateObject}
          searchFieldName={stateObject.state.searchFieldName}
          searchText={stateObject.state.searchText}
          visible={stateObject.state.seachVisible}
          searchName={'student'}
          colHeading={['Name', 'Id']}
          mapping={['StudentName', 'StudentId']}
          SuggestionHeading={'Student'}
        />
      </View>

    );
  }
}

const styles = StyleSheet.create({  
})
export default StudentAttendanceFilter;

