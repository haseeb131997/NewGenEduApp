

import React from "react";
import { View, Text } from "react-native";
import TabScreen from '../../../components/TabScreen';
import AuditDetail from './../../../components/AuditDetail';
import ClassExamScheduleGeneral from './ClassExamScheduleGeneral';
import ClassExamScheduleDetails from './ClassExamScheduleDetails';
import ClassExamScheduleSoftSkill from './ClassExamScheduleSoftSkill';
import GeneralUtils from "../../../utils/GeneralUtils";
import AppStyles from "../../../AppStyles/AppStyles";
import Exception from '../../../utils/Exception'
import { Caption, Divider, Subheading, Title } from 'react-native-paper';
import Remarks from './../../../components/Remarks';
import NotificationConfiguration from './../../../components/NotificationConfiguration';











class EditTemplate { }



EditTemplate.ModificationMandatory = function (stateObject) {
  stateObject.state.errorField = []
  var mandatoryCheckError = false;
  
  if (stateObject.state.dataModel.exam == '' || stateObject.state.dataModel.exam == null) {
    // Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-001', errorMessage: '', errorParam: ['Class Code'] }])
    // return false;
    mandatoryCheckError = true
    stateObject.state.errorField.push('field1')
  }
  if (stateObject.state.dataModel.examDescription == '' || stateObject.state.dataModel.examDescription == null) {
    // Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-001', errorMessage: '', errorParam: ['Class Description'] }])
    // return false;
    mandatoryCheckError = true
    stateObject.state.errorField.push('field2')
  }
  if (stateObject.state.dataModel.class == '' || stateObject.state.dataModel.class == null) {
    // Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-001', errorMessage: '', errorParam: ['Year/Standard'] }])
    // return false;
    mandatoryCheckError = true
    stateObject.state.errorField.push('field3')
  }


  if (stateObject.state.dataModel.Subjectschedules.length == 0 || stateObject.state.dataModel.Subjectschedules == null) {
    Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-087', errorMessage: '', errorParam: ['Exam schedule'] }])
    return false;
  }

  if (stateObject.state.dataModel.softSkillRequired && (stateObject.state.dataModel.softSkills.length == 0 || stateObject.state.dataModel.softSkills == null)) {
    Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-090', errorMessage: '', errorParam: '' }])
    return false;
  }

  if (mandatoryCheckError) {
    Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-080', errorMessage: '', errorParam: '' }])
    return false
  }
  else {
    return true
  }
    
      // if (stateObject.state.dataModel.periodTimings.length == 0 || stateObject.state.dataModel.periodTimings == null) {
      //   Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-001', errorMessage: '', errorParam: ['Period Timings'] }])
      //   return false;
      // }
  return true;
}


EditTemplate.ModificationConfig = function (stateObject) {
  return (<View>
    <View>
      <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[0]}</Subheading>
      {/* <Divider style={AppStyles.marginTop_1} /> */}
        <ClassExamScheduleGeneral
          stateObject={stateObject}
        />
    </View>
    <Divider style={AppStyles.marginTop_1} />
    <View style={AppStyles.marginTop_2}>
      <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[1]}</Subheading>
      {/* <Divider style={AppStyles.marginTop_1} /> */}
        <ClassExamScheduleDetails
          stateObject={stateObject}
        />
    </View>
    <Divider style={AppStyles.marginTop_3} />
    <View style={AppStyles.marginTop_2}>
      {/* <Subheading style={AppStyles.bold_600}></Subheading> */}
      {/* <Divider style={AppStyles.marginTop_1} /> */}
        <NotificationConfiguration
          stateObject={stateObject}
        />
    </View>
    <Divider style={AppStyles.marginTop_3} />
    <View style={AppStyles.marginTop_2}>
      {/* <Subheading style={AppStyles.bold_600}></Subheading> */}
      {/* <Divider style={AppStyles.marginTop_1} /> */}
        <ClassExamScheduleSoftSkill
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