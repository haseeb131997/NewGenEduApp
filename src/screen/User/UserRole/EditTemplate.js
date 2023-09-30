

import React from "react";
import { View, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import UserRoleGeneral from './UserRoleGeneral';
import UserRoleContent from './UserRoleContent';
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
  if (stateObject.state.dataModel.roleID == '' || stateObject.state.dataModel.roleID == null) {
    mandatoryCheckError = true
    stateObject.state.errorField.push('field1')
  }
  if (stateObject.state.dataModel.roleDescription == '' || stateObject.state.dataModel.roleDescription == null) {
    mandatoryCheckError = true
    stateObject.state.errorField.push('field2')
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
      <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[0]}</Subheading>
        <UserRoleGeneral
          stateObject={stateObject}
        />
    </View>
    <Divider style={AppStyles.marginTop_3} />
    <View style={AppStyles.marginTop_2}>
      <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[1]}</Subheading>
      <UserRoleContent
        stateObject={stateObject}
      />
    </View>
    {/* <Divider style={AppStyles.marginTop_3} /> */}
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