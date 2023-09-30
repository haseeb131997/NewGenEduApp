
import React from "react";
import { View, Text } from "react-native";
import ClassAssignmentGeneral from './ClassAssignmentGeneral';
import ClassAssignmentQuestion from './ClassAssignmentQuestion';
import ClassAssignmentWorkSheet from './ClassAssignmentWorkSheet';
import ClassAssignmentInstructions from './ClassAssignmentInstructions';
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
      if (stateObject.state.dataModel.assignmentID == '' || stateObject.state.dataModel.assignmentID == null) {
        mandatoryCheckError = true
        stateObject.state.errorField.push('field1')
      }
      if (stateObject.state.dataModel.assignmentDescription == '' || stateObject.state.dataModel.assignmentDescription == null) {
        mandatoryCheckError = true
        stateObject.state.errorField.push('field2')
      }
      if (stateObject.state.dataModel.classID == '' || stateObject.state.dataModel.classID == null) {
        mandatoryCheckError = true
        stateObject.state.errorField.push('field3')
      }
      if (stateObject.state.dataModel.subjectID == '' || stateObject.state.dataModel.subjectID == null) {
        mandatoryCheckError = true
        stateObject.state.errorField.push('field4')
      }

      if (stateObject.state.dataModel.type == '' || stateObject.state.dataModel.type == null) {
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
      case 2:
        if(stateObject.state.dataModel.type == 'Q'){
          if (stateObject.state.dataModel.questions == null || stateObject.state.dataModel.questions.length == 0) {
            Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-087', errorMessage: '', errorParam: ['Question'] }])
            return false;
          }
        }
        else{
          if (stateObject.state.dataModel.worksheets == null || stateObject.state.dataModel.worksheets.length == 0) {
            Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-087', errorMessage: '', errorParam: ['Worksheet'] }])
            return false;
          }
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
        <ClassAssignmentGeneral
          stateObject={stateObject}
        />
      </View>
    }
    {stateObject.state.currentStep == 2 &&
    <View>
         {/* <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[1]}</Subheading> */}
         <ClassAssignmentInstructions
          stateObject={stateObject}
        />
     {stateObject.state.dataModel.type == 'Q' ? 
        <ClassAssignmentQuestion
          stateObject={stateObject}
        />
         :
          <ClassAssignmentWorkSheet
          stateObject={stateObject}
        />}
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