
import React from "react";
import { View, Text } from "react-native";
import InstituteClassConfigGeneral from './InstituteClassConfigGeneral';
import InstituteClassConfigPeriod from './InstituteClassConfigPeriod';
import Exception from '../../../utils/Exception'
import AppStyles from "../../../AppStyles/AppStyles";
import Remarks from './../../../components/Remarks';
import CreateCompleted from './../../../components/CreateCompleted';

import { Divider, Subheading, Title } from 'react-native-paper';




class CreateTemplate { }

 



CreateTemplate.CreateMandatory = function (stateObject) {
  stateObject.state.errorField = []
  var mandatoryCheckError = false;

  switch (stateObject.state.currentStep) {
    case 1:
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
      break
      case 2 :
        if (stateObject.state.dataModel.periodTimings.length == 0 || stateObject.state.dataModel.periodTimings == null) {
          Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-001', errorMessage: '', errorParam: ['Period Timings'] }])
          return false;
        }
        break
  }
  return true;  
}


// CreateTemplate.Mandatory = function (stateObject) {
 
//   const { periodTimingsEmptyrecord } = stateObject.state
//   stateObject.state.errorField = []
//   var mandatoryCheckError = false;
//       if (periodTimingsEmptyrecord.periodNumber == '' || periodTimingsEmptyrecord.periodNumber == null) {
//         mandatoryCheckError = true
//         stateObject.state.errorField.push('field7')
//       }
//       if (periodTimingsEmptyrecord.noon == '' || periodTimingsEmptyrecord.noon == null) {
  
//         mandatoryCheckError = true
//         stateObject.state.errorField.push('field8')
//       }
//       if ((periodTimingsEmptyrecord.startTime.hour == '' || periodTimingsEmptyrecord.startTime.hour == null) && (periodTimingsEmptyrecord.startTime.min == '' || periodTimingsEmptyrecord.startTime.min == null)) {
  
//         mandatoryCheckError = true
//         stateObject.state.errorField.push('field9')
//       }
  
//       if ((periodTimingsEmptyrecord.endTime.hour == '' || periodTimingsEmptyrecord.endTime.hour == null) && (periodTimingsEmptyrecord.endTime.min == '' || periodTimingsEmptyrecord.endTime.min == null)) {
  
//         mandatoryCheckError = true
//         stateObject.state.errorField.push('field10')
//       }
//       if (mandatoryCheckError) {
//         Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-080', errorMessage: '', errorParam: '' }])
//         return false
//       }
//       else {
//         return true
//       }
// }




CreateTemplate.CreateConfig = function (stateObject) {
  return(<View>
    {stateObject.state.currentStep == 1 &&
      <View>
        <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[0]}</Subheading>
        {/* <Divider style={AppStyles.marginTop_1}/> */}
        <InstituteClassConfigGeneral
          stateObject={stateObject}
        />
      </View>
    }
    {stateObject.state.currentStep == 2 &&
        <InstituteClassConfigPeriod
          stateObject={stateObject}
        />
    }
     {stateObject.state.currentStep == 3 &&
        <Remarks
          stateObject={stateObject}
        />
    }
     {stateObject.state.currentStep == 4 &&
        <CreateCompleted
        title={stateObject.state.heading}
          stateObject={stateObject}
        />

    }
  </View>)

}


module.exports = {
  functions: CreateTemplate
}