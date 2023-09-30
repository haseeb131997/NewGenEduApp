
import React from "react";
import { View, Text } from "react-native";
import QuestionPaperConfigGeneral from './QuestionPaperConfigGeneral';
import QuestionPaperConfigInstructions from './QuestionPaperConfigInstructions';
import Exception from '../../../utils/Exception'
import AppStyles from "../../../AppStyles/AppStyles";
import Remarks from './../../../components/Remarks';
import CreateCompleted from './../../../components/CreateCompleted';
import QuestionPaperConfigSection from './QuestionPaperConfigSection';
import NotificationConfiguration from './../../../components/NotificationConfiguration';

import { Divider, Subheading, Title } from 'react-native-paper';




class CreateTemplate { }





CreateTemplate.CreateMandatory = function (stateObject) {
  stateObject.state.errorField = []
  var mandatoryCheckError = false;

  switch (stateObject.state.currentStep) {
    case 1:
      if (stateObject.state.dataModel.questionPaperId == '' || stateObject.state.dataModel.questionPaperId == null) {
        mandatoryCheckError = true
        stateObject.state.errorField.push('field1')
      }
      if (stateObject.state.dataModel.description == '' || stateObject.state.dataModel.description == null) {
        mandatoryCheckError = true
        stateObject.state.errorField.push('field2')
      }
      if (stateObject.state.dataModel.standard == '' || stateObject.state.dataModel.standard == null) {
        mandatoryCheckError = true
        stateObject.state.errorField.push('field3')
      }
      if (stateObject.state.dataModel.subjectID == '' || stateObject.state.dataModel.subjectID == null) {
        mandatoryCheckError = true
        stateObject.state.errorField.push('field4')
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
      if (stateObject.state.dataModel.questionPaperInstruction == '' || stateObject.state.dataModel.questionPaperInstruction == null) {
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

    case 3:
      if (stateObject.state.dataModel.type == "1") {
        if (stateObject.state.dataModel.studentName == '' || stateObject.state.dataModel.studentName == null) {
          mandatoryCheckError = true
          stateObject.state.errorField.push('field8')
        }
      }
      else {
        if (stateObject.state.dataModel.class == '' || stateObject.state.dataModel.class == null) {
          mandatoryCheckError = true
          stateObject.state.errorField.push('field9')
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
  }
  return true;
}





CreateTemplate.CreateConfig = function (stateObject) {
  return (<View>
    {stateObject.state.currentStep == 1 &&
      <View>
        <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[0]}</Subheading>
        {/* <Divider style={AppStyles.marginTop_1}/> */}
        <QuestionPaperConfigGeneral
          stateObject={stateObject}
        />
      </View>
    }
    {stateObject.state.currentStep == 2 &&
      <View>
        {/* <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[1]}</Subheading> */}
        <QuestionPaperConfigInstructions
          stateObject={stateObject}
        />
      </View>
    }
    {stateObject.state.currentStep == 3 &&
      <QuestionPaperConfigSection
        stateObject={stateObject}
      />
    }
    {stateObject.state.currentStep == 4 &&
      <View>
        <NotificationConfiguration
          stateObject={stateObject}
        />
      </View>
    }
    {stateObject.state.currentStep == 5 &&
      <Remarks
        stateObject={stateObject}
      />
    }
    {stateObject.state.currentStep == 6 &&
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