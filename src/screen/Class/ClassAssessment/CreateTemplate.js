
import React from "react";
import { View,  } from "react-native";
import ClassAssignmentGeneral from './ClassAssignmentGeneral';
import ClassAssessmentStudentList from './ClassAssessmentStudentList';

import Exception from '../../../utils/Exception'
import AppStyles from "../../../AppStyles/AppStyles";
import Remarks from './../../../components/Remarks';
import CreateCompleted from './../../../components/CreateCompleted';

import {  Subheading } from 'react-native-paper';




class CreateTemplate { }





CreateTemplate.CreateMandatory = function (stateObject) {
  stateObject.state.errorField = []
  var mandatoryCheckError = false;

  switch (stateObject.state.currentStep) {
    case 1:
      // if (stateObject.state.dataModel.assignmentID == '' || stateObject.state.dataModel.assignmentID == null) {
      //   mandatoryCheckError = true
      //   stateObject.state.errorField.push('field1')
      // }
      // if (stateObject.state.dataModel.assignmentDescription == '' || stateObject.state.dataModel.assignmentDescription == null) {
      //   mandatoryCheckError = true
      //   stateObject.state.errorField.push('field2')
      // }
      // if (stateObject.state.dataModel.classID == '' || stateObject.state.dataModel.classID == null) {
      //   mandatoryCheckError = true
      //   stateObject.state.errorField.push('field3')
      // }
      // if (stateObject.state.dataModel.subjectID == '' || stateObject.state.dataModel.subjectID == null) {
      //   mandatoryCheckError = true
      //   stateObject.state.errorField.push('field4')
      // }

      // if (stateObject.state.dataModel.type == '' || stateObject.state.dataModel.type == null) {
      //   mandatoryCheckError = true
      //   stateObject.state.errorField.push('field5')
      // }
      // if (stateObject.state.dataModel.dueDate == '' || stateObject.state.dataModel.dueDate == null) {
      //   mandatoryCheckError = true
      //   stateObject.state.errorField.push('field6')
      // }


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
        <ClassAssignmentGeneral
          stateObject={stateObject}
        />
      </View>
    }
    {stateObject.state.currentStep == 2 &&
      <View>
        {//N0U-106
          <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[1]}</Subheading>}       
        <ClassAssessmentStudentList
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