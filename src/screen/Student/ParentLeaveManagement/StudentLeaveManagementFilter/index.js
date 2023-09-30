
import React, { Component } from "react";
import { View, StyleSheet, Platform } from 'react-native';
import SearchUtils from "../../../../utils/SearchUtils";
import AppStyles from "../../../../AppStyles/AppStyles";
import SuggestionList from '../../../../components/SuggestionList';
import FilterSuggestionTextInput from '../../../../components/FilterSuggestionTextInput';
import SubScreenUtils from "../../../../utils/SubScreenUtils";



class StudentLeaveManagementFilter extends Component {
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
    const { summaryDataModel, editable } = stateObject.state
    const { parentStateChange } = stateObject
    return (<View style={AppStyles.marginTop_1}>
      <FilterSuggestionTextInput
        required={false}
        label={'Select Student'}
        placeholder={'Select student name'}
        secureTextEntry={false}
        value={summaryDataModel.filter.studentName}
        onFocus={() => {
          SearchUtils.functions.launchSuggestion(stateObject, '', 'studentName')
        }
        }
        onClear={() => {
          summaryDataModel.filter.studentName = '';
          parentStateChange({ summaryDataModel: summaryDataModel })
        }}
      />
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
export default StudentLeaveManagementFilter;

