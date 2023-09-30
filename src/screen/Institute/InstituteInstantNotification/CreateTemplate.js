
import React from "react";
import { View, Text } from "react-native";
import InstantNotificationGeneral from './InstantNotificationGeneral';
import NotificationTemplateContent from './NotificationTemplateContent';
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
      if (stateObject.state.dataModel.notificationID == '' || stateObject.state.dataModel.notificationID == null) {
        mandatoryCheckError = true
        stateObject.state.errorField.push('field1')

      }
      if (stateObject.state.dataModel.receiverType == '' || stateObject.state.dataModel.receiverType == null) {
        mandatoryCheckError = true
        stateObject.state.errorField.push('field11')

      }
      if (stateObject.state.dataModel.receiverType == 'S') {

        if (stateObject.state.dataModel.studentID == '' || stateObject.state.dataModel.studentID == null) {
          mandatoryCheckError = true
          stateObject.state.errorField.push('field12')
  
        }
      
      }
      else{ 
      if (stateObject.state.dataModel.assignee == '' || stateObject.state.dataModel.assignee == null) {
        mandatoryCheckError = true
        stateObject.state.errorField.push('field2')
      }
    }
      if (stateObject.state.dataModel.instant == '' || stateObject.state.dataModel.instant == null) {
        mandatoryCheckError = true
        stateObject.state.errorField.push('field3')
      }
      if (stateObject.state.dataModel.messageType == '' || stateObject.state.dataModel.messageType == null) {
        mandatoryCheckError = true
        stateObject.state.errorField.push('field4')
      }
      if (stateObject.state.dataModel.channel == '' || stateObject.state.dataModel.channel == null) {
        mandatoryCheckError = true
        stateObject.state.errorField.push('field5')
      }
      if (stateObject.state.dataModel.language == '' || stateObject.state.dataModel.language == null) {
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
        if (stateObject.state.dataModel.subjectTemplate == '' || stateObject.state.dataModel.subjectTemplate == null) {
          mandatoryCheckError = true
          stateObject.state.errorField.push('field7')
        }
        if (stateObject.state.dataModel.greetingTemplate == '' || stateObject.state.dataModel.greetingTemplate == null) {
          mandatoryCheckError = true
          stateObject.state.errorField.push('field8')
        }
        if (stateObject.state.dataModel.bodyTemplate == '' || stateObject.state.dataModel.bodyTemplate == null) {
          mandatoryCheckError = true
          stateObject.state.errorField.push('field9')
        }
        if (stateObject.state.dataModel.footerTemplate == '' || stateObject.state.dataModel.footerTemplate == null) {
          mandatoryCheckError = true
          stateObject.state.errorField.push('field10')
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
        <InstantNotificationGeneral
          stateObject={stateObject}
        />
      </View>
    }
    {stateObject.state.currentStep == 2 &&
        <NotificationTemplateContent
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