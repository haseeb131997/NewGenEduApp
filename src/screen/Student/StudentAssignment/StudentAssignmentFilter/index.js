
import React, { Component } from "react";
import { View, StyleSheet, Platform } from 'react-native';
import SearchUtils from "../../../../utils/SearchUtils";
import AppStyles from "../../../../AppStyles/AppStyles";
import SuggestionList from '../../../../components/SuggestionList';
import FilterSuggestionTextInput from '../../../../components/FilterSuggestionTextInput';
import GeneralUtils from "../../../../utils/GeneralUtils";
import SubScreenUtils from "../../../../utils/SubScreenUtils";
import CustomDropDownPicker from '../../../../components/CustomDropDownPicker';
import SelectListUtils from '../../../../utils/SelectListUtils'


var searchName = 'studentPostSuggestion'

class StudentAssignmentFilter extends Component {
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
  
    // parentStateChange({ summaryDataModel: dummyDatamodel })

    console.log(data,"data")

    switch (searchName) {
      case 'studentPostSuggestion':
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
        break
      case 'classPostSuggestion':
          dummyDatamodel.filter.classID = data.classCode;
          parentStateChange({ summaryDataModel: dummyDatamodel })

        break
    }



  }



  render() {
    const {
      stateObject
    } = this.props
    const { summaryDataModel, errorField } = stateObject.state
    const { parentStateChange } = stateObject
    return (<View style={[AppStyles.margin_1]}>
      <FilterSuggestionTextInput
        required={true}
        label={stateObject.state.userType == 'P' ? 'Select Student' : 'Student Name'}
        placeholder={'Select student name'}
        secureTextEntry={false}
        value={summaryDataModel.filter.studentName}
        onFocus={() => {
          searchName = 'studentPostSuggestion'
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


      {(stateObject.state.userType == 'A' || stateObject.state.userType == 'T' || stateObject.state.userType == 'O') && <View>

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


        <CustomDropDownPicker
          // required={true}
          label={'Subject'}
          stateObject={stateObject}
          items={SelectListUtils.functions.selectMaster.SubjectMaster}
          value={SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.SubjectMaster, summaryDataModel.filter.subjectID)}
          placeholder="Select Subject"
          onChangeValue={(value) => {
            summaryDataModel.filter.subjectID = value;
            parentStateChange({ summaryDataModel: summaryDataModel })
          }}
          dropdownName={'subjectDropdown'}
          subHeadingRecordName="a subject"
          onClear={() => {
            summaryDataModel.filter.subjectID = '';
            parentStateChange({ summaryDataModel: summaryDataModel })
          }}
        />

{/*
        <FilterSuggestionTextInput
          required={false}
          // editable={editable}
          label={'Class'}
          placeholder={'Select class'}
          secureTextEntry={false}
          value={summaryDataModel.filter.classID}
          onFocus={() => {
            searchName = 'classPostSuggestion'
            //  if(summaryDataModel.filter.Class == null || summaryDataModel.filter.Class == '' ){
            SearchUtils.functions.launchSuggestion(stateObject, '', 'class')
            //  }
          }
          }
          onClear={() => {
            summaryDataModel.filter.classID = '';
            parentStateChange({ summaryDataModel: summaryDataModel })
          }}
        />
        */}




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

})
export default StudentAssignmentFilter;

