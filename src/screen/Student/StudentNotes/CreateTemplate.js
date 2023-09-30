
import React from "react";
import { View, Text } from "react-native";
import StudentNotesGeneral from './StudentNotesGeneral';
import StudentNotesDetails from './StudentNotesDetails';
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
      if (stateObject.state.dataModel.notesID == '' || stateObject.state.dataModel.notesID == null) {
        mandatoryCheckError = true
        stateObject.state.errorField.push('field1')
      }
      if (stateObject.state.dataModel.studentName == '' || stateObject.state.dataModel.studentName == null) {
        mandatoryCheckError = true
        stateObject.state.errorField.push('field2')
      }
      if (stateObject.state.dataModel.date == '' || stateObject.state.dataModel.date == null) {
        mandatoryCheckError = true
        stateObject.state.errorField.push('field3')
      }
      if (stateObject.state.dataModel.subjectID == '' || stateObject.state.dataModel.subjectID == null) {
        mandatoryCheckError = true
        stateObject.state.errorField.push('field4')
      }
      // if (stateObject.state.dataModel.standard == '' || stateObject.state.dataModel.standard == null) {
      //   mandatoryCheckError = true
      //   stateObject.state.errorField.push('field5')
      // }

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
      case 2 :
        if (stateObject.state.dataModel.notesDetails.length == 0 || stateObject.state.dataModel.notesDetails == null) {
          Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-087', errorMessage: '', errorParam: ['Notes Details'] }])
          return false;
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
        <StudentNotesGeneral
          stateObject={stateObject}
        />
      </View>
    }
    {stateObject.state.currentStep == 2 &&
    <View>
        {/* <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[1]}</Subheading> */}
        <StudentNotesDetails
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