

import React from "react";
import { View, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import NotificationTemplateGeneral from './NotificationTemplateGeneral';
import NotificationTemplateContent from './NotificationTemplateContent';
import GeneralUtils from "../../../utils/GeneralUtils";
import AppStyles from "../../../AppStyles/AppStyles";
import Exception from '../../../utils/Exception'
import Remarks from './../../../components/Remarks';
import { Caption, Divider, Subheading, Title } from 'react-native-paper';
import { w, h } from "../../../utils/Dimensions";










class EditTemplate { }



EditTemplate.ModificationMandatory = function (stateObject) {
  stateObject.state.errorField = []
  var mandatoryCheckError = false;
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
  return true;
}


EditTemplate.ModificationConfig = function (stateObject) {
  return (<View>
  <View>
      <Subheading style={AppStyles.bold_600}>Basic Info</Subheading>
        <NotificationTemplateGeneral
          stateObject={stateObject}
        />
    </View>

    <View>
    <Divider style={AppStyles.marginTop_2}/>
      <Subheading style={[AppStyles.bold_600,AppStyles.marginTop_1]}>{stateObject.state.createStepsHeading[1]}</Subheading>
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
 

  




  </View>)

}



module.exports = {
  functions: EditTemplate
}