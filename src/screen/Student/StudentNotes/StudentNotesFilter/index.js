
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




class StudentNotesFilter extends Component {
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

      {/* <FilterSuggestionTextInput
        required={false}
        editable={editable}
        label={'Year/Standrad'}
        placeholder={'Select Year/Standrad'}
        secureTextEntry={false}
        value={summaryDataModel.filter.standard}
        onFocus={() => {
          //  if(summaryDataModel.filter.Class == null || summaryDataModel.filter.Class == '' ){
          SearchUtils.functions.launchSuggestion(stateObject, '', 'standard')
          //  }
        }
        }
        onClear={() => {
          summaryDataModel.filter.standard = '';
          parentStateChange({ summaryDataModel: summaryDataModel })
        }}
      /> */}

    {(stateObject.state.userType == 'A' || stateObject.state.userType == 'T' || stateObject.state.userType == 'O') &&  <View >
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

})
export default StudentNotesFilter;

