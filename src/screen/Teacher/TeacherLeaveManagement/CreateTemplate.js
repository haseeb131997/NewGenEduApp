
import React from "react";
import { View, Text } from "react-native";
import TeacherLeaveManagementGenral from './TeacherLeaveManagementGenral';
import TeacherLeaveManagemenDetails from './TeacherLeaveManagemenDetails';
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
      if (stateObject.state.dataModel.referenceId == '' || stateObject.state.dataModel.referenceId == null) {
        mandatoryCheckError = true
        stateObject.state.errorField.push('field1')
      }
      if (stateObject.state.dataModel.teacherName == '' || stateObject.state.dataModel.teacherName == null) {
        mandatoryCheckError = true
        stateObject.state.errorField.push('field2')
      }

      if (stateObject.state.selectOption == '' || stateObject.state.selectOption == null) {
        mandatoryCheckError = true
        stateObject.state.errorField.push('field3')
      }

       

        if(stateObject.state.selectOption == 'fullDay'){
          if (stateObject.state.dataModel.from == '' || stateObject.state.dataModel.from == null) {
            mandatoryCheckError = true
            stateObject.state.errorField.push('field4')
          }

          if (stateObject.state.dataModel.to == '' || stateObject.state.dataModel.to == null) {
            mandatoryCheckError = true
            stateObject.state.errorField.push('field5')
          }
        }


        if(stateObject.state.selectOption == 'halfDay'){
          if ((stateObject.state.dataModel.from == '' || stateObject.state.dataModel.from == null) && stateObject.state.dataModel.to == '' || stateObject.state.dataModel.to == null) {
            mandatoryCheckError = true
            stateObject.state.errorField.push('field6')
          }

          if ((stateObject.state.dataModel.fromNoon == '' || stateObject.state.dataModel.fromNoon == null) && stateObject.state.dataModel.toNoon == '' || stateObject.state.dataModel.toNoon == null) {
            mandatoryCheckError = true
            stateObject.state.errorField.push('field7')
          }
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
        if (stateObject.state.dataModel.type == '' || stateObject.state.dataModel.type == null) {
          mandatoryCheckError = true
          stateObject.state.errorField.push('field8')
        }
        if (stateObject.state.dataModel.reason == '' || stateObject.state.dataModel.reason == null) {
          mandatoryCheckError = true
          stateObject.state.errorField.push('field9')
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
        <TeacherLeaveManagementGenral
          stateObject={stateObject}
        />
      </View>
    }
    {stateObject.state.currentStep == 2 &&
    <View>
        <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[1]}</Subheading>
        <TeacherLeaveManagemenDetails
          stateObject={stateObject}
        />
     </View>   
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