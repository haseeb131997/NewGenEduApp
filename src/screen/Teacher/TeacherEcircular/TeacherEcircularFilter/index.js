
import React, { Component } from "react";
import { View, StyleSheet, Platform } from 'react-native';
import SelectListUtils from '../../../../utils/SelectListUtils'
import AppStyles from "../../../../AppStyles/AppStyles";
import CustomDropDownPicker from '../../../../components/CustomDropDownPicker';

import FilterCustomDatePicker from "../../../../components/FilterCustomDatePicker"






class TeacherEcircularFilter extends Component {
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
      <View >
      <CustomDropDownPicker
          // required={true}
          label={'Signature status'}
          stateObject={stateObject}
          items={SelectListUtils.functions.selectMaster.SignMasterMaster}
          value={SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.SignMasterMaster, summaryDataModel.filter.signStatus)}
          placeholder="Select signature status"
          onChangeValue={(value) => {
            summaryDataModel.filter.signStatus = value;
            parentStateChange({ summaryDataModel: summaryDataModel })
          }}
          dropdownName={'signatureDropdown'}
          subHeadingRecordName="a staff signature status"
          onClear={() => {
            summaryDataModel.filter.signStatus = '';
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
      <View >
        <FilterCustomDatePicker
          required={false}
          label={'To Date'}
          placeholder={'Pick to date'}
          secureTextEntry={false}
          value={summaryDataModel.filter.toDate}
          onDateChange={value => {
            summaryDataModel.filter.toDate = value;
            parentStateChange({ summaryDataModel: summaryDataModel })
          }}
        />

      </View> *}

      

     

      {/*<View >
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
          summaryDataModel.filter.authStat = '';
          parentStateChange({ summaryDataModel: summaryDataModel })
        }}
        />
      </View>*/}
   
    </View>
    );
  }
}


const styles = StyleSheet.create({

})
export default TeacherEcircularFilter;

