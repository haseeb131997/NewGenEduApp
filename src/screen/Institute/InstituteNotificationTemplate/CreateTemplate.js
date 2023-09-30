
import React from "react";
import { View, Text } from "react-native";
import Exception from '../../../utils/Exception'
import AppStyles from "../../../AppStyles/AppStyles";
import NotificationTemplateGeneral from './NotificationTemplateGeneral';
import NotificationTemplateContent from './NotificationTemplateContent';
import NotificationTemplateSample from './NotificationTemplateSample';
import Remarks from './../../../components/Remarks';
import CreateCompleted from './../../../components/CreateCompleted';

import { Divider, Subheading, Title } from 'react-native-paper';




class CreateTemplate { }






CreateTemplate.CreateMandatory = function (stateObject) {
  stateObject.state.errorField = []
  var mandatoryCheckError = false;
  switch (stateObject.state.currentStep) {
    case 1: 
     if (stateObject.state.dataModel.templateID == '' || stateObject.state.dataModel.templateID == null) {
        mandatoryCheckError = true
        stateObject.state.errorField.push('field1')
      }
      if (stateObject.state.dataModel.templateDescription == '' || stateObject.state.dataModel.templateDescription == null) {
        mandatoryCheckError = true
        stateObject.state.errorField.push('field2')
      }
      if (stateObject.state.dataModel.messageType == '' || stateObject.state.dataModel.messageType == null) {
        mandatoryCheckError = true
        stateObject.state.errorField.push('field3')
      }
      if (stateObject.state.dataModel.channel == '' || stateObject.state.dataModel.channel == null) {
        mandatoryCheckError = true
        stateObject.state.errorField.push('field4')
      }
      if (stateObject.state.dataModel.language == '' || stateObject.state.dataModel.language == null) {
        mandatoryCheckError = true
        stateObject.state.errorField.push('field5')
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
  return (<View>
    {stateObject.state.currentStep == 1 &&
      <View>
        <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[0]}</Subheading>
        <NotificationTemplateGeneral
          stateObject={stateObject}
        />
      </View>
    }
     {stateObject.state.currentStep == 3 &&
      <View>
        <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[1]}</Subheading>
        <NotificationTemplateContent
          stateObject={stateObject}
        />
      </View>
    }
    {stateObject.state.currentStep == 2 &&
      <View>
        <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[2]}</Subheading>
        <NotificationTemplateSample
          stateObject={stateObject}
        />
      </View>
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