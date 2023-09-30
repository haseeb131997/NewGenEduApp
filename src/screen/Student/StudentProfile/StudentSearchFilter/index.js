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
import { w, h } from "../../../../utils/Dimensions";
import SelectListUtils from '../../../../utils/SelectListUtils'
import AppStyles from "../../../../AppStyles/AppStyles";
import CustomDropDownPicker from '../../../../components/CustomDropDownPicker';
import FilterSuggestionTextInput from '../../../../components/FilterSuggestionTextInput';
import SuggestionList from '../../../../components/SuggestionList';
import SearchUtils from "../../../../utils/SearchUtils";
import SubScreenUtils from "../../../../utils/SubScreenUtils";




var searchName = 'studentPostSuggestion'

class StudentSearchFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }
    this.postSuggestionListresultClick = this.postSuggestionListresultClick.bind(this)
  }

  async postSuggestionListresultClick(data) {
    const { stateObject } = this.props
    const { summaryDataModel } = stateObject.state
    const { parentStateChange } = stateObject
    const dummyDatamodel = Object.assign({}, summaryDataModel)
    dummyDatamodel.filter.studentName = data.StudentName;
    dummyDatamodel.filter.studentID = data.StudentId;

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
    const { summaryDataModel, editable } = stateObject.state
    const { parentStateChange } = stateObject
    return (
      <View style={[AppStyles.margin_1]}>
        <FilterSuggestionTextInput
          required={false}
          editable={editable}
          label={'Student Name'}
          placeholder={'Select Student Name'}
          secureTextEntry={false}
          value={summaryDataModel.filter.studentName}
          onFocus={() => {
            searchName = 'studentPostSuggestion'
            SearchUtils.functions.launchSuggestion(stateObject, '', 'studentName')
          }
          }
          onClear={() => {
            summaryDataModel.filter.studentName = '';
            parentStateChange({ summaryDataModel: summaryDataModel })
          }}
        />


     {(stateObject.state.userType == 'A' || stateObject.state.userType == 'T' || stateObject.state.userType == 'O') && <View>
       <FilterSuggestionTextInput
          required={false}
          editable={editable}
          label={'Student Id'}
          placeholder={'Select Student Id'}
          secureTextEntry={false}
          value={summaryDataModel.filter.studentID}
          onFocus={() => {
            searchName = 'studentPostSuggestion'
            SearchUtils.functions.launchSuggestion(stateObject, '', 'studentID')
          }
          }
          onClear={() => {
            summaryDataModel.filter.studentID = '';
            parentStateChange({ summaryDataModel: summaryDataModel })
          }}
        />


        <FilterSuggestionTextInput
          required={false}
          editable={editable}
          label={'Class'}
          placeholder={'Select class'}
          secureTextEntry={false}
          value={summaryDataModel.filter.class}
          onFocus={() => {
            searchName = 'classSummaryDataModel1'
            SearchUtils.functions.launchSuggestion(stateObject, '', 'class')
          }
          }
          onClear={() => {
            summaryDataModel.filter.class = '';
            parentStateChange({ summaryDataModel: summaryDataModel })
          }}
        />



        <CustomDropDownPicker
          stateObject={stateObject}
          label={'Select Approval status'}
          items={SelectListUtils.functions.selectMaster.AuthStatusMaster}
          value={SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.AuthStatusMaster, summaryDataModel.filter.authStat)}
          placeholder="Select Approval status"
          onChangeValue={(value) => {
            summaryDataModel.filter.authStat = value;
            parentStateChange({ summaryDataModel: summaryDataModel })
          }}
          dropdownName={'authDropdown'}
          subHeadingRecordName="an approval status"
          onClear={() => {
            summaryDataModel.filter.authStat = '';
            parentStateChange({ summaryDataModel: summaryDataModel })
          }}
        />

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
  container: {
    zIndex: 1000
  }
})
export default StudentSearchFilter;

