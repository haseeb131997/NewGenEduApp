
import React from "react";
import { View, Text } from "react-native";
import ClassStudentRegisterGeneral from './ClassStudentRegisterGeneral';
import ClassStudentRegisterDetails from './ClassStudentRegisterDetails';
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
      if (stateObject.state.dataModel.registerID  == '' || stateObject.state.dataModel.registerID  == null) {
        // Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-001', errorMessage: '', errorParam: ['Class Code'] }])
        // return false;
        mandatoryCheckError = true
        stateObject.state.errorField.push('field1')
      }
      if (stateObject.state.dataModel.class  == '' || stateObject.state.dataModel.class  == null) {
        // Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-001', errorMessage: '', errorParam: ['Class Code'] }])
        // return false;
        mandatoryCheckError = true
        stateObject.state.errorField.push('field2')
      }
      if (stateObject.state.dataModel.startDate == '' || stateObject.state.dataModel.startDate == null) {
        // Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-001', errorMessage: '', errorParam: ['Class Description'] }])
        // return false;
        mandatoryCheckError = true
        stateObject.state.errorField.push('field3')
      }
      if (stateObject.state.dataModel.endDate == '' || stateObject.state.dataModel.endDate == null) {
        // Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-001', errorMessage: '', errorParam: ['Class Description'] }])
        // return false;
        mandatoryCheckError = true
        stateObject.state.errorField.push('field4')
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







CreateTemplate.CreateConfig = function (stateObject) {
  return(<View>
    {stateObject.state.currentStep == 1 &&
      <View>
        <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[0]}</Subheading>
        {/* <Divider style={AppStyles.marginTop_1}/> */}
        <ClassStudentRegisterGeneral
          stateObject={stateObject}
        />
      </View>
    }
    {stateObject.state.currentStep == 2 &&
        <ClassStudentRegisterDetails
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