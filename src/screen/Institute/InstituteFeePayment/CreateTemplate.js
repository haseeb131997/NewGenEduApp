
import React from "react";
import { View, Text } from "react-native";
import InstituteFeePaymentGeneral from './InstituteFeePaymentGeneral';
import InstituteFeePaymentDetails from './InstituteFeePaymentDetails';
import InstituteFeePaymentBreakupDetails from './InstituteFeePaymentBreakupDetails';
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
      if (stateObject.state.dataModel.paymentID == '' || stateObject.state.dataModel.paymentID == null) {
        mandatoryCheckError = true
        stateObject.state.errorField.push('field1')
      }
      if (stateObject.state.dataModel.paymentDate == '' || stateObject.state.dataModel.paymentDate == null) {
        mandatoryCheckError = true
        stateObject.state.errorField.push('field2')
      }
      if (stateObject.state.dataModel.studentName == '' || stateObject.state.dataModel.studentName == null) {
        mandatoryCheckError = true
        stateObject.state.errorField.push('field3')
      }
      // if (stateObject.state.dataModel.studentID == '' || stateObject.state.dataModel.studentID == null) {
      //   mandatoryCheckError = true
      //   stateObject.state.errorField.push('field4')
      // }
      if (stateObject.state.dataModel.paymentMode == '' || stateObject.state.dataModel.paymentMode == null) {
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
      case 2 :
        if (stateObject.state.dataModel.paymentPaid == '' || stateObject.state.dataModel.paymentPaid == null) {
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
  }
  return true;  
}





CreateTemplate.CreateConfig = function (stateObject) {
  return(<View>
    {stateObject.state.currentStep == 1 &&
      <View>
        <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[0]}</Subheading>
        {/* <Divider style={AppStyles.marginTop_1}/> */}
        <InstituteFeePaymentGeneral
          stateObject={stateObject}
        />
      </View>
    }
    {stateObject.state.currentStep == 2 &&
    <View>
        {/* <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[1]}</Subheading> */}
        <InstituteFeePaymentDetails
          stateObject={stateObject}
        />
     </View>   
    }
     {stateObject.state.currentStep == 3 &&
        <InstituteFeePaymentBreakupDetails
          stateObject={stateObject}
        />
    } 
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