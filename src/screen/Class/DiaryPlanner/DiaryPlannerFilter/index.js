
import React, { Component } from "react";
import { View, StyleSheet, Platform } from 'react-native';
import SearchUtils from "../../../../utils/SearchUtils";
import SelectListUtils from '../../../../utils/SelectListUtils'
import AppStyles from "../../../../AppStyles/AppStyles";
import CustomDropDownPicker from '../../../../components/CustomDropDownPicker';
import SuggestionList from '../../../../components/SuggestionList';
import FilterSuggestionTextInput from '../../../../components/FilterSuggestionTextInput';
import FilterCustomDatePicker from "../../../../components/FilterCustomDatePicker"
import GeneralUtils from "../../../../utils/GeneralUtils";
import SubScreenUtils from "../../../../utils/SubScreenUtils";






class DiaryPlannerFilter extends Component {
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
    const { summaryDataModel, errorField } = stateObject.state
    const { parentStateChange } = stateObject
    return (<View style={[AppStyles.margin_1]}>
        <FilterSuggestionTextInput
        required={false}
        label={'Class'}
        placeholder={'Select class'}
        secureTextEntry={false}
        value={summaryDataModel.filter.classID}
        onFocus={() => {
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


    <View>
  
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



   
    </View>





      {/* <View >
        <CustomDropDownPicker
          stateObject={this}
          label={'Status'}
          items={SelectListUtils.functions.selectMaster.PlanStatusMaster}
          value={SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.PlanStatusMaster, summaryDataModel.filter.status)}
          placeholder="Select status"
          onChangeValue={(value) => {
            summaryDataModel.filter.status = value;
            parentStateChange({ summaryDataModel: summaryDataModel })
          }}
          dropdownName={'statusDropdown'}
          subHeadingRecordName="a status"
          onClear={() => {
            summaryDataModel.filter.status = '';
            parentStateChange({ summaryDataModel: summaryDataModel })
          }}
        />
      </View> */}
       <SuggestionList
        stateObject={stateObject}
        searchFieldName={stateObject.state.searchFieldName}
        searchText={stateObject.state.searchText}
        visible={stateObject.state.seachVisible}
        searchName={'classIdSummaryDataModel'}
        colHeading={['Class', 'Desc', 'Year/Standard', 'Major/Section']}
        mapping={['classCode', 'classDesc', 'standard', 'section']}
        SuggestionHeading={'Class'}
      />
    </View>
    );
  }
}


const styles = StyleSheet.create({

})
export default DiaryPlannerFilter;

