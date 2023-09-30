
import React from "react";
import { View, Text } from "react-native";
import InstituteFeeManagementGeneral from './InstituteFeeManagementGeneral';
import InstituteFeeManagementBreakup from './InstituteFeeManagementBreakup';
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
      if (stateObject.state.dataModel.feeID == '' || stateObject.state.dataModel.feeID == null) {
        mandatoryCheckError = true
        stateObject.state.errorField.push('field1')
      }
      if (stateObject.state.dataModel.feeDescription == '' || stateObject.state.dataModel.feeDescription == null) {
        mandatoryCheckError = true
        stateObject.state.errorField.push('field2')
      }
      if (stateObject.state.dataModel.feeType == '' || stateObject.state.dataModel.feeType == null) {
        mandatoryCheckError = true
        stateObject.state.errorField.push('field3')
      }
      if (stateObject.state.dataModel.amount == '' || stateObject.state.dataModel.amount == null) {
        mandatoryCheckError = true
        stateObject.state.errorField.push('field4')
      }
      if (stateObject.state.dataModel.groupID == '' || stateObject.state.dataModel.groupID == null) {
        mandatoryCheckError = true
        stateObject.state.errorField.push('field5')
      }
      if (stateObject.state.dataModel.dueDate == '' || stateObject.state.dataModel.dueDate == null) {
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
      // case 2 :
      //   if (stateObject.state.dataModel.feeBreakup.length == 0 || stateObject.state.dataModel.feeBreakup == null) {
      //     Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-087', errorMessage: '', errorParam: ['Breakup Details'] }])
      //     return false;
      //   }
      //   break
  }
  return true;  
}





CreateTemplate.CreateConfig = function (stateObject) {
  return(<View>
    {stateObject.state.currentStep == 1 &&
      <View>
        <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[0]}</Subheading>
        {/* <Divider style={AppStyles.marginTop_1}/> */}
        <InstituteFeeManagementGeneral
          stateObject={stateObject}
        />
      </View>
    }
    {stateObject.state.currentStep == 2 &&
    <View>
        {/* <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[1]}</Subheading> */}
        <InstituteFeeManagementBreakup
          stateObject={stateObject}
        />
     </View>   
    }
     {stateObject.state.currentStep == 3 &&
        <NotificationConfiguration
          stateObject={stateObject}
        />
    } 
     {stateObject.state.currentStep == 4 &&
        <Remarks
          stateObject={stateObject}
        />
    }
     {stateObject.state.currentStep == 5 &&
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