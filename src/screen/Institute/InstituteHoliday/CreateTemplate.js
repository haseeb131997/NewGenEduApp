
import React from "react";
import { View, Text } from "react-native";
import Exception from '../../../utils/Exception'
import AppStyles from "../../../AppStyles/AppStyles";
import InstituteHolidayGeneral from './InstituteHolidayGeneral';
import InstituteHolidayCalendar from './InstituteHolidayCalendar';
import Remarks from './../../../components/Remarks';
import CreateCompleted from './../../../components/CreateCompleted';

import { Divider, Subheading, Title } from 'react-native-paper';




class CreateTemplate { }







CreateTemplate.CreateMandatory = function (stateObject) {
  stateObject.state.errorField = []
  var mandatoryCheckError = false;
  switch (stateObject.state.currentStep) {
    case 1: 
    if (stateObject.state.dataModel.month == '' || stateObject.state.dataModel.month == null) {
      // Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-001', errorMessage: '', errorParam: ['Month'] }])
      // return false;
      mandatoryCheckError = true
      stateObject.state.errorField.push('field1')
    }
    if (stateObject.state.dataModel.year == '' || stateObject.state.dataModel.year == null) {
      // Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-001', errorMessage: '', errorParam: ['Year'] }])
      // return false;
      mandatoryCheckError = true
      stateObject.state.errorField.push('field2')
    }

    if (stateObject.state.selectOption == '' || stateObject.state.selectOption == null) {
      // Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-001', errorMessage: '', errorParam: ['Class'] }])
      // return false;
      mandatoryCheckError = true
      stateObject.state.errorField.push('field4')
    }
 
    if (stateObject.state.dataModel.classCode == '' || stateObject.state.dataModel.classCode == null) {
      // Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-001', errorMessage: '', errorParam: ['Class'] }])
      // return false;
      mandatoryCheckError = true
      stateObject.state.errorField.push('field3')
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
        <Divider style={AppStyles.marginTop_1}/>
        <InstituteHolidayGeneral
          stateObject={stateObject}
        />
      </View>
    }
      {stateObject.state.currentStep == 2 &&
      <View>
        <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[1]}</Subheading>
        {/* <Divider style={AppStyles.marginTop_1}/> */}
        <InstituteHolidayCalendar
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