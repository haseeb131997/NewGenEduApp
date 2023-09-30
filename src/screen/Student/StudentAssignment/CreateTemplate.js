
import React from "react";
import { View, Text } from "react-native";
import ClassAssignmentQuestion from './ClassAssignmentQuestion';
import ClassAssignmentWorkSheet from './ClassAssignmentWorkSheet';
import Exception from '../../../utils/Exception'
import Remarks from './../../../components/Remarks';
import CreateCompleted from './../../../components/CreateCompleted';





class CreateTemplate { }





CreateTemplate.CreateMandatory = function (stateObject) {
  stateObject.state.errorField = []
  var mandatoryCheckError = false;

  switch (stateObject.state.currentStep) {
    case 1:
      // if (stateObject.state.dataModel.assignmentID == '' || stateObject.state.dataModel.assignmentID == null) {
      //   mandatoryCheckError = true
      //   stateObject.state.errorField.push('field1')
      // }
      // if (stateObject.state.dataModel.assignmentDescription == '' || stateObject.state.dataModel.assignmentDescription == null) {
      //   mandatoryCheckError = true
      //   stateObject.state.errorField.push('field2')
      // }
      // if (stateObject.state.dataModel.classID == '' || stateObject.state.dataModel.classID == null) {
      //   mandatoryCheckError = true
      //   stateObject.state.errorField.push('field3')
      // }
      // if (stateObject.state.dataModel.subjectID == '' || stateObject.state.dataModel.subjectID == null) {
      //   mandatoryCheckError = true
      //   stateObject.state.errorField.push('field4')
      // }

      // if (stateObject.state.dataModel.type == '' || stateObject.state.dataModel.type == null) {
      //   mandatoryCheckError = true
      //   stateObject.state.errorField.push('field5')
      // }
      // if (stateObject.state.dataModel.dueDate == '' || stateObject.state.dataModel.dueDate == null) {
      //   mandatoryCheckError = true
      //   stateObject.state.errorField.push('field6')
      // }


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
  return (<View>
  
    {stateObject.state.currentStep == 1 &&
      <View>
        <View >
      {stateObject.state.dataModel.type == 'Q' ?  <ClassAssignmentQuestion
          stateObject={stateObject}
        /> : <ClassAssignmentWorkSheet
        stateObject={stateObject}
      />}
      </View>
      </View>
    }
    {stateObject.state.currentStep == 2 &&
      <Remarks
        stateObject={stateObject}
      />
    }
    {stateObject.state.currentStep == 3 &&
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