
import React, { Component } from "react";
import { View, StyleSheet, Image, TouchableOpacity, TouchableWithoutFeedback, Platform } from 'react-native';
import { TextInput, Card, Text, Avatar } from 'react-native-paper';
import { w, h } from "../../../../utils/Dimensions";
import SearchUtils from "../../../../utils/SearchUtils";
import SelectListUtils from '../../../../utils/SelectListUtils'
import AppStyles from "../../../../AppStyles/AppStyles";
import CustomDropDownPicker from '../../../../components/CustomDropDownPicker';
import SuggestionList from '../../../../components/SuggestionList';
import FilterSuggestionTextInput from '../../../../components/FilterSuggestionTextInput';
import FilterCustomDatePicker from "../../../../components/FilterCustomDatePicker"





class ClassStudentRegisterFilter extends Component {
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
        // editable={editable}
        label={'Class'}
        placeholder={'Select class'}
        secureTextEntry={false}
        value={summaryDataModel.filter.classCode}
        onFocus={() => {
          SearchUtils.functions.launchSuggestion(stateObject, '', 'class')
        }
        }
        onClear={() => {
          summaryDataModel.filter.classCode = '';
          parentStateChange({ summaryDataModel: summaryDataModel })
        }}
      />

      <View >
        <FilterCustomDatePicker
          required={false}
          label={'Start Date'}
          placeholder={'Pick start date'}
          secureTextEntry={false}
          value={summaryDataModel.filter.startDate}
          format="DD-MM-YYYY"
          mode="date"
          onDateChange={value => {
            summaryDataModel.filter.startDate = value;
            parentStateChange({ summaryDataModel: summaryDataModel })
          }}
        />
      </View>
      <View >
        <FilterCustomDatePicker
          required={false}
          label={'End Date'}
          placeholder={'Pick end date'}
          secureTextEntry={false}
          value={summaryDataModel.filter.endDate}
          onDateChange={value => {
            summaryDataModel.filter.endDate = value;
            parentStateChange({ summaryDataModel: summaryDataModel })
          }}
        />

      </View>
      <View >
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
            summaryDataModel.filter.authStat= '';
            parentStateChange({ summaryDataModel: summaryDataModel })
          }}
        />
      </View>
      <SuggestionList
        stateObject={stateObject}
        searchFieldName={stateObject.state.searchFieldName}
        searchText={stateObject.state.searchText}
        visible={stateObject.state.seachVisible}
        searchName={'classSummaryDataModel2'}
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
export default ClassStudentRegisterFilter;

