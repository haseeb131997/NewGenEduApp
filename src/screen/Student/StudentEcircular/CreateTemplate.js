
import React from "react";
import { View, Text } from "react-native";
import StudentEcircularGeneral from './StudentEcircularGeneral';
import StudentEcircularContent from './StudentEcircularContent';
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
      if (stateObject.state.dataModel.circularID == '' || stateObject.state.dataModel.circularID == null) {
        mandatoryCheckError = true
        stateObject.state.errorField.push('field1')
      }
      if (stateObject.state.dataModel.circularDescription == '' || stateObject.state.dataModel.circularDescription == null) {
        mandatoryCheckError = true
        stateObject.state.errorField.push('field2')
      }

      if (stateObject.state.dataModel.groupID == '' || stateObject.state.dataModel.groupID == null) {
        mandatoryCheckError = true
        stateObject.state.errorField.push('field3')
      }

      if (stateObject.state.dataModel.circularDate == '' || stateObject.state.dataModel.circularDate == null) {
        mandatoryCheckError = true
        stateObject.state.errorField.push('field4')
      }
      if (stateObject.state.dataModel.contentPath == '' || stateObject.state.dataModel.contentPath == null) {
        Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-110', errorMessage: '', errorParam: [''] }])
        return false;
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
        <StudentEcircularGeneral
          stateObject={stateObject}
        />
      </View>
    }
    {stateObject.state.currentStep == 2 &&
    <View>
        <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[1]}</Subheading>
        <StudentEcircularContent
          stateObject={stateObject}
        />
     </View>   
    }
    {stateObject.state.currentStep == 3 && 
    <View >
        <NotificationConfiguration
          stateObject={stateObject}
        />
    </View>}
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