
import React from "react";
import { View, Text } from "react-native";
import Exception from '../../../utils/Exception'
import AppStyles from "../../../AppStyles/AppStyles";
import UserRoleGeneral from './UserRoleGeneral';
import UserRoleContent from './UserRoleContent';
import Remarks from './../../../components/Remarks';
import CreateCompleted from './../../../components/CreateCompleted';

import { Divider, Subheading, Title } from 'react-native-paper';




class CreateTemplate { }







CreateTemplate.CreateMandatory = function (stateObject) {
  stateObject.state.errorField = []
  var mandatoryCheckError = false;
  switch (stateObject.state.currentStep) {
    case 1: 
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

      break
  }
  return true;
}


CreateTemplate.CreateConfig = function (stateObject) {
  return (<View>
    {stateObject.state.currentStep == 1 &&
      <View>
        <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[0]}</Subheading>
        {/* <Divider style={AppStyles.marginTop_1}/> */}
       <View style={AppStyles.marginTop_1}>
       <UserRoleGeneral
          stateObject={stateObject}
        />
       </View>
      </View>
    }
     {stateObject.state.currentStep == 2 &&
      <View>
        <UserRoleContent
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