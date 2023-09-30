

import React from "react";
import { View, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import InstituteHolidayGeneral from './InstituteHolidayGeneral';
import InstituteHolidayCalendar from './InstituteHolidayCalendar';

import GeneralUtils from "../../../utils/GeneralUtils";
import AppStyles from "../../../AppStyles/AppStyles";
import Exception from '../../../utils/Exception'
import Remarks from './../../../components/Remarks';
import { Caption, Divider, Subheading, Title } from 'react-native-paper';
import { w, h } from "../../../utils/Dimensions";










class EditTemplate { }


EditTemplate.ModificationMandatory = function (stateObject) {
  stateObject.state.errorField = []
  var mandatoryCheckError = false;
  if (stateObject.state.dataModel.month == '' || stateObject.state.dataModel.month == null) {
    // Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-001', errorMessage: '', errorParam: ['Month'] }])
    // return false;
    mandatoryCheckError = true
    stateObject.state.errorField.push('field1')
  }
  if (stateObject.state.dataModel.year == '' || stateObject.state.dataModel.year == null) {
    // Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-001', errorMessage: '', errorParam: ['Year'] }])
    // return false;
    mandatoryCheckError = true
    stateObject.state.errorField.push('field2')
  }

  if (stateObject.state.selectOption == '' || stateObject.state.selectOption == null) {
    // Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-001', errorMessage: '', errorParam: ['Class'] }])
    // return false;
    mandatoryCheckError = true
    stateObject.state.errorField.push('field4')
  }

  if (stateObject.state.dataModel.classCode == '' || stateObject.state.dataModel.classCode == null) {
    // Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-001', errorMessage: '', errorParam: ['Class'] }])
    // return false;
    mandatoryCheckError = true
    stateObject.state.errorField.push('field3')
  }

  if (mandatoryCheckError) {
    Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-080', errorMessage: '', errorParam: '' }])
    return false
  }
  else {
    return true
  }
  return true;
}


EditTemplate.ModificationConfig = function (stateObject) {
  return (<View>
    <View>
      <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[1]}</Subheading>
      {/* <Divider style={AppStyles.marginTop_1} /> */}
      <InstituteHolidayGeneral
        stateObject={stateObject}
      />
    </View>

    <View style={AppStyles.marginTop_2}>
      <InstituteHolidayCalendar
        stateObject={stateObject}
      />
    </View>
    <Divider style={AppStyles.marginTop_3} />
    <View style={AppStyles.marginTop_2}>
      <Remarks
        stateObject={stateObject}
      />
    </View>

  </View>)

}



module.exports = {
  functions: EditTemplate
}