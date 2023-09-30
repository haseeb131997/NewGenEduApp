
import React from "react";
import { View, Text } from "react-native";
import InstituteActivityEventGeneral from './InstituteActivityEventGeneral';
import InstituteActivityEventFeeDetails from './InstituteActivityEventFeeDetails';
import InstituteActivityEventDetails from './InstituteActivityEventDetails';
import InstituteActivityEventImages from './InstituteActivityEventImages';

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
      if (stateObject.state.dataModel.activityID == '' || stateObject.state.dataModel.activityID == null) {
        mandatoryCheckError = true
        stateObject.state.errorField.push('field1')
      }
      if (stateObject.state.dataModel.activityName == '' || stateObject.state.dataModel.activityName == null) {
        mandatoryCheckError = true
        stateObject.state.errorField.push('field2')
      }
      if (stateObject.state.dataModel.activityType == '' || stateObject.state.dataModel.activityType == null) {
        mandatoryCheckError = true
        stateObject.state.errorField.push('field3')
      }
      if (stateObject.state.dataModel.groupID == '' || stateObject.state.dataModel.groupID == null) {
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
    // case 2:
    //   if (stateObject.state.dataModel.feeDescription == '' || stateObject.state.dataModel.feeDescription == null) {
    //     mandatoryCheckError = true
    //     stateObject.state.errorField.push('field5')
    //   }

    //   if (mandatoryCheckError) {
    //     Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-080', errorMessage: '', errorParam: '' }])
    //     return false
    //   }
    //   else {
    //     return true
    //   }

    //   break
    case 3:
      if (stateObject.state.dataModel.date == '' || stateObject.state.dataModel.date == null) {
        mandatoryCheckError = true
        stateObject.state.errorField.push('field6')
      }
      if (stateObject.state.dataModel.venue == '' || stateObject.state.dataModel.venue == null) {
        mandatoryCheckError = true
        stateObject.state.errorField.push('field7')
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
        <InstituteActivityEventGeneral
          stateObject={stateObject}
        />
      </View>
    }
    {stateObject.state.currentStep == 2 &&
      <View>
        <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[1]}</Subheading>
        <InstituteActivityEventFeeDetails
          stateObject={stateObject}
        />
      </View>
    }
    {stateObject.state.currentStep == 3 &&
      <View>
        <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[2]}</Subheading>
        <InstituteActivityEventDetails
          stateObject={stateObject}
        />
      </View>
    }
    {stateObject.state.currentStep == 4 &&
      <View>
        {/* <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[3]}</Subheading> */}
        <InstituteActivityEventImages
          stateObject={stateObject}
        />
      </View>
    }
    {stateObject.state.currentStep == 5 &&
      <View>
        <NotificationConfiguration
          stateObject={stateObject}
        />
      </View>
    }
    {stateObject.state.currentStep == 6 &&
      <Remarks
        stateObject={stateObject}
      />
    }
    {stateObject.state.currentStep == 7 &&
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