
import React, { Component } from "react";
import { View, StyleSheet,Platform } from 'react-native';
import SearchUtils from "../../../../utils/SearchUtils";
import SelectListUtils from '../../../../utils/SelectListUtils'
import AppStyles from "../../../../AppStyles/AppStyles";
import CustomDropDownPicker from '../../../../components/CustomDropDownPicker';
import SuggestionList from '../../../../components/SuggestionList';
import FilterSuggestionTextInput from '../../../../components/FilterSuggestionTextInput';
import FilterCustomDatePicker from "../../../../components/FilterCustomDatePicker"
import FilterInputText from '../../../../components/FilterInputText';





class InstituteFeePaymentFilter extends Component {
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

          <FilterInputText
          required={false}
          label={'Payment amount'}
          placeholder={'Type payment amount'}
          value={summaryDataModel.filter.paymentPaid}
          onChangeText={text => {
            summaryDataModel.filter.paymentPaid = text
            parentStateChange({ summaryDataModel: summaryDataModel })
          }}

        />


     <View >
        <FilterCustomDatePicker
          required={true}
          label={'Payment Date'}
          placeholder={'Pick due date'}
          secureTextEntry={false}
          value={summaryDataModel.filter.paymentDate}
          format="DD-MM-YYYY"
          mode="date"
          onDateChange={value => {
            summaryDataModel.filter.paymentDate = value;
            parentStateChange({ summaryDataModel: summaryDataModel })
          }}

        />
      </View>

     
    {/*}
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
          subHeadingRecordName = "an approval status"
          onClear={() => {
          summaryDataModel.filter.authStat= '';
          parentStateChange({ summaryDataModel: summaryDataModel })
        }}
        />
      </View> */}
      
    </View>
    );
  }
}


const styles = StyleSheet.create({

})
export default InstituteFeePaymentFilter;

