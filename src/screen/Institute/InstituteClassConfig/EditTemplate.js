

import React from "react";
import { View, Text } from "react-native";
import InstituteClassConfigFilter from './InstituteClassConfigFilter';
import TabScreen from '../../../components/TabScreen';
import AuditDetail from './../../../components/AuditDetail';
import InstituteClassConfigGeneral from './InstituteClassConfigGeneral';
import InstituteClassConfigPeriod from './InstituteClassConfigPeriod';
import GeneralUtils from "../../../utils/GeneralUtils";
import AppStyles from "../../../AppStyles/AppStyles";
import Exception from '../../../utils/Exception'
import { Caption, Divider, Subheading, Title } from 'react-native-paper';
import Remarks from './../../../components/Remarks';











class EditTemplate { }



EditTemplate.ModificationMandatory = function (stateObject) {
  stateObject.state.errorField = []
  var mandatoryCheckError = false;
  
  if (stateObject.state.dataModel.Class == '' || stateObject.state.dataModel.Class == null) {
    // Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-001', errorMessage: '', errorParam: ['Class Code'] }])
    // return false;
    mandatoryCheckError = true
    stateObject.state.errorField.push('field1')
  }
  if (stateObject.state.dataModel.ClassDesc == '' || stateObject.state.dataModel.ClassDesc == null) {
    // Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-001', errorMessage: '', errorParam: ['Class Description'] }])
    // return false;
    mandatoryCheckError = true
    stateObject.state.errorField.push('field2')
  }
  if (stateObject.state.dataModel.Standard == '' || stateObject.state.dataModel.Standard == null) {
    // Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-001', errorMessage: '', errorParam: ['Year/Standard'] }])
    // return false;
    mandatoryCheckError = true
    stateObject.state.errorField.push('field4')
  }

  if (stateObject.state.dataModel.attendance == '' || stateObject.state.dataModel.attendance == null) {
    // Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-001', errorMessage: '', errorParam: ['Attendance'] }])
    // return false;
    mandatoryCheckError = true
    stateObject.state.errorField.push('field6')
  }
  if (mandatoryCheckError) {
    Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-080', errorMessage: '', errorParam: '' }])
    return false
  }
  else {
    return true
  }
    
      // if (stateObject.state.dataModel.periodTimings.length == 0 || stateObject.state.dataModel.periodTimings == null) {
      //   Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-001', errorMessage: '', errorParam: ['Period Timings'] }])
      //   return false;
      // }
  return true;
}


EditTemplate.ModificationConfig = function (stateObject) {
  return (<View>
    <View>
      <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[0]}</Subheading>
      {/* <Divider style={AppStyles.marginTop_1} /> */}
        <InstituteClassConfigGeneral
          stateObject={stateObject}
        />
    </View>
    <Divider style={AppStyles.marginTop_3} />
    <View style={AppStyles.marginTop_2}>
      <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[1]}</Subheading>
      {/* <Divider style={AppStyles.marginTop_1} /> */}
        <InstituteClassConfigPeriod
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