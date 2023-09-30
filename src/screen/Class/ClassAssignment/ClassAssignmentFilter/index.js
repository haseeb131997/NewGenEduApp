
import React, { Component } from "react";
import { View, StyleSheet, Platform } from 'react-native';
import SearchUtils from "../../../../utils/SearchUtils";
import SelectListUtils from '../../../../utils/SelectListUtils'
import AppStyles from "../../../../AppStyles/AppStyles";
import CustomDropDownPicker from '../../../../components/CustomDropDownPicker';
import SuggestionList from '../../../../components/SuggestionList';
import FilterSuggestionTextInput from '../../../../components/FilterSuggestionTextInput';
import FilterCustomDatePicker from "../../../../components/FilterCustomDatePicker"





class ClassAssignmentFilter extends Component {
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
    const { summaryDataModel, editable } = stateObject.state
    const { parentStateChange } = stateObject
    return (<View style={[AppStyles.margin_1]}>
      <FilterSuggestionTextInput
        required={false}
        editable={editable}
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
            subHeadingRecordName = "a subject"
            onClear={() => {
              summaryDataModel.filter.subjectID= '';
              parentStateChange({ summaryDataModel: summaryDataModel })
            }}
        />
      </View>

      <View>
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
            subHeadingRecordName = "a year"
            onClear={() => {
              summaryDataModel.filter.year= '';
              parentStateChange({ summaryDataModel: summaryDataModel })
            }}
        />
      </View>

      <View >
        <CustomDropDownPicker
          label={'Select month'}
          stateObject={stateObject}
          items={SelectListUtils.functions.selectMaster.MonthMaster}
          value={SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.MonthMaster, summaryDataModel.filter.month )}
          placeholder="Select month"
          onChangeValue={(value) => {
            summaryDataModel.filter.month = value;
            parentStateChange({ summaryDataModel: summaryDataModel })
          }}
          dropdownName={'monthDropdown'} 
            subHeadingRecordName = "a month"
            onClear={() => {
              summaryDataModel.filter.month= '';
              parentStateChange({ summaryDataModel: summaryDataModel })
            }}
        />
      </View>


      {/* <View >
        <FilterCustomDatePicker
          required={false}
          label={'From Date'}
          placeholder={'Pick from date'}
          secureTextEntry={false}
          value={summaryDataModel.filter.fromDate}
          format="DD-MM-YYYY"
          mode="date"
          onDateChange={value => {
            summaryDataModel.filter.fromDate = value;
            parentStateChange({ summaryDataModel: summaryDataModel })
          }}

        />
      </View>
      <View style={AppStyles.marginTop_1}>
        <FilterCustomDatePicker
          required={false}
          label={'to Date'}
          placeholder={'Pick to date'}
          secureTextEntry={false}
          value={summaryDataModel.filter.toDate}
          onDateChange={value => {
            summaryDataModel.filter.toDate = value;
            parentStateChange({ summaryDataModel: summaryDataModel })
          }}
        />

      </View> */}

      {/* <View >
        <CustomDropDownPicker
          stateObject={stateObject}
          label={'Select Type'}
          items={SelectListUtils.functions.selectMaster.AssignmentTypesMaster}
          value={SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.AssignmentTypesMaster, summaryDataModel.filter.type)}
          placeholder="Select Type"
          onChangeValue={(value) => {
            summaryDataModel.filter.type = value;
            parentStateChange({ summaryDataModel: summaryDataModel })
          }}
          dropdownName={'typeDropdown'} 
            subHeadingRecordName = "a type"
            onClear={() => {
              summaryDataModel.filter.type= '';
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
export default ClassAssignmentFilter;

