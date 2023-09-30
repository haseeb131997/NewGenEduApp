
import React, { Component } from "react";
import { View, StyleSheet, Platform } from 'react-native';
import SearchUtils from "../../../../utils/SearchUtils";
import SelectListUtils from '../../../../utils/SelectListUtils'
import AppStyles from "../../../../AppStyles/AppStyles";
import CustomDropDownPicker from '../../../../components/CustomDropDownPicker';
import SuggestionList from '../../../../components/SuggestionList';
import FilterSuggestionTextInput from '../../../../components/FilterSuggestionTextInput';

import GeneralUtils from "../../../../utils/GeneralUtils";
import SubScreenUtils from "../../../../utils/SubScreenUtils";




class OnlineVideoClassRoomFilter extends Component {
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
    return (<View style={[AppStyles.margin_1]}>
      {(stateObject.state.userType == 'P' || stateObject.state.userType == 'S') &&
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

        />}

      {(stateObject.state.userType == 'A' || stateObject.state.userType == 'T' || stateObject.state.userType == 'O') && <View >
        <CustomDropDownPicker
          // required={true}
          label={'Subject'}
          stateObject={stateObject}
          items={SelectListUtils.functions.selectMaster.SubjectMaster}
          value={SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.SubjectMaster, summaryDataModel.filter.subject)}
          placeholder="Select Subject"
          onChangeValue={(value) => {
            summaryDataModel.filter.subject = value;
            parentStateChange({ summaryDataModel: summaryDataModel })
          }}
          dropdownName={'subjectDropdown'}
          subHeadingRecordName="a subject"
          onClear={() => {
            summaryDataModel.filter.subject = '';
            parentStateChange({ summaryDataModel: summaryDataModel })
          }}
        />

        <CustomDropDownPicker
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
          subHeadingRecordName="a month"
          onClear={() => {
            summaryDataModel.filter.month = '';
            parentStateChange({ summaryDataModel: summaryDataModel })
          }}
        />

        <CustomDropDownPicker
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
          subHeadingRecordName="a year"
          onClear={() => {
            summaryDataModel.filter.year = '';
            parentStateChange({ summaryDataModel: summaryDataModel })
          }}
        />
      </View>}



      {/* <View >
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
      </View> */}
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
export default OnlineVideoClassRoomFilter;

