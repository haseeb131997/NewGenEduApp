

import React from "react";
import { View, Text } from "react-native";
import InstantNotificationGeneral from './InstantNotificationGeneral';
import AppStyles from "../../../AppStyles/AppStyles";
import Exception from '../../../utils/Exception'
import { Caption, Divider, Subheading, Title } from 'react-native-paper';
import Remarks from './../../../components/Remarks';
import NotificationTemplateContent from "./NotificationTemplateContent";












class EditTemplate { }



EditTemplate.ModificationMandatory = function (stateObject) {
  stateObject.state.errorField = []
  var mandatoryCheckError = false;

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
  // if (stateObject.state.dataModel.feeBreakup.length == 0 || stateObject.state.dataModel.feeBreakup == null) {
  //   Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-087', errorMessage: '', errorParam: ['Breakup Details'] }])
  //   return false;
  // }
  else {
    return true
  }


  return true;
}


EditTemplate.ModificationConfig = function (stateObject) {
  return (<View>
 

    <View>
    <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[0]}</Subheading>
      <InstantNotificationGeneral
        stateObject={stateObject}
      />
    </View>
    <Divider style={AppStyles.marginTop_3} />
    <View>
    <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[1]}</Subheading>
      <NotificationTemplateContent
        stateObject={stateObject}
      />
    </View>
    <Divider style={AppStyles.marginTop_3} />
    <View style={AppStyles.marginTop_2}>
      <Remarks
        stateObject={stateObject}
      />
    </View>



    {/* {stateObject.state.selectedTabIndex == 1 && <View>

    <View style={AppStyles.marginTop_2}>
        <InstituteFeeManagementBreakup
          stateObject={stateObject}
        />
    </View>
    </View>} */}

  </View>)

}


module.exports = {
  functions: EditTemplate
}