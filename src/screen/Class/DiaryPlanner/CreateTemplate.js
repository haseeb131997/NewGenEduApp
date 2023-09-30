
import React from "react";
import { View, Text } from "react-native";
import DiaryPlannerGeneral from './DiaryPlannerGeneral';
import DiaryPlannerDetail from './DiaryPlannerDetail';
import Exception from '../../../utils/Exception'
import AppStyles from "../../../AppStyles/AppStyles";
import Remarks from './../../../components/Remarks';
import CreateCompleted from './../../../components/CreateCompleted';
import NotificationConfiguration from './../../../components/NotificationConfiguration';

import { Divider, Subheading, Title } from 'react-native-paper';




class CreateTemplate { }

 



CreateTemplate.CreateMandatory = function (stateObject) {
  stateObject.state.errorField = []
  var mandatoryCheckError = false;

  switch (stateObject.state.currentStep) {
    case 1:
      if (stateObject.state.dataModel.classID == '' || stateObject.state.dataModel.classID == null) {
        // Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-001', errorMessage: '', errorParam: ['Class Code'] }])
        // return false;
        mandatoryCheckError = true
        stateObject.state.errorField.push('field1')
      }
      if (stateObject.state.dataModel.date == '' || stateObject.state.dataModel.date == null) {
        // Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-001', errorMessage: '', errorParam: ['Class Description'] }])
        // return false;
        mandatoryCheckError = true
        stateObject.state.errorField.push('field2')
      }
      if (stateObject.state.dataModel.planID == '' || stateObject.state.dataModel.planID == null) {
        // Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-001', errorMessage: '', errorParam: ['Class Description'] }])
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
        <DiaryPlannerGeneral
          stateObject={stateObject}
        />
      </View>
    }
    {stateObject.state.currentStep == 2 &&
    <View>
         {/* <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[1]}</Subheading> */}
        <DiaryPlannerDetail
          stateObject={stateObject}
        />
     </View>   
    }
     {/* {stateObject.state.currentStep == 3 &&
        <NotificationConfiguration
          stateObject={stateObject}
        />
    }  */}
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