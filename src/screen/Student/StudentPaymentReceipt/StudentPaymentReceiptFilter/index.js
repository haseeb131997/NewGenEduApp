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
import AppStyles from "../../../../AppStyles/AppStyles";
import FilterSuggestionTextInput from '../../../../components/FilterSuggestionTextInput';
import SuggestionList from '../../../../components/SuggestionList';
import SearchUtils from "../../../../utils/SearchUtils";
import GeneralUtils from "../../../../utils/GeneralUtils";
//import FilterInputText from '../../../../components/FilterInputText';
import SubScreenUtils from "../../../../utils/SubScreenUtils";







class StudentPaymentReceiptFilter extends Component {
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
    const {  summaryDataModel } = stateObject.state
    const { parentStateChange } = stateObject
    const dummyDatamodel = Object.assign({}, summaryDataModel)
    dummyDatamodel.filter.studentName = data.StudentName;
    dummyDatamodel.filter.studentID = data.StudentId;
    // parentStateChange({ summaryDataModel: dummyDatamodel })

    if(stateObject.state.userType == 'P' || stateObject.state.userType == 'S'){
    await  parentStateChange({ summaryDataModel: dummyDatamodel,
         displayContent:'summaryDataModel' })
      SubScreenUtils.functions.parentSummaryData(stateObject)
    }
    else{
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
{/* 
{(summaryDataModel.filter.studentID != '' && (stateObject.state.userType == 'A' || stateObject.state.userType == 'T' || stateObject.state.userType == 'A' || stateObject.state.userType == 'O')) && <FilterInputText
          required={false}
          editable={false}
          label={'Student Id'}
          // placeholder={'Student Id'}
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
export default StudentPaymentReceiptFilter;

