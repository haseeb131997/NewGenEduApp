

import React from "react";
import { View, Text } from "react-native";
import TabScreen from '../../../components/TabScreen';
import AuditDetail from './../../../components/AuditDetail';
import InstituteFeePaymentGeneral from './InstituteFeePaymentGeneral';
import InstituteFeePaymentBreakupDetails from './InstituteFeePaymentBreakupDetails';
import AppStyles from "../../../AppStyles/AppStyles";
import Exception from '../../../utils/Exception'
import { Caption, Divider, Subheading, Title } from 'react-native-paper';
import Remarks from './../../../components/Remarks';
import NotificationConfiguration from './../../../components/NotificationConfiguration';
import { UiColor } from "../../../theme";











class EditTemplate { }



EditTemplate.ModificationMandatory = function (stateObject) {
  stateObject.state.errorField = []
  var mandatoryCheckError = false;

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

  if (stateObject.state.dataModel.paymentPaid == '' || stateObject.state.dataModel.paymentPaid == null) {
    mandatoryCheckError = true
    stateObject.state.errorField.push('field5')
  }

  if (mandatoryCheckError) {
    Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-080', errorMessage: '', errorParam: '' }])
    return false
  }
  // if (stateObject.state.dataModel.feeBreakup.length == 0 || stateObject.state.dataModel.feeBreakup == null) {
  //   Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-087', errorMessage: '', errorParam: ['Breakup Details'] }])
  //   return false;
  // }
  else {
    return true
  }


  return true;
}


EditTemplate.ModificationConfig = function (stateObject) {
  return (<View>
    <TabScreen
      tabHeading={['Basic Info', 'Payment']}
      stateObject={stateObject}
      stateValue={'selectedTabIndex'}
      selectedStateValue={stateObject.state.selectedTabIndex}
      barColor={UiColor.WHITE}
    />
    {/* <Divider /> */}
    {stateObject.state.selectedTabIndex == 0 &&

    <View>
  <View>
    {/* <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[0]}</Subheading> */}
      <InstituteFeePaymentGeneral
        stateObject={stateObject}
      />
    </View>

    <Divider style={AppStyles.marginTop_3} />
    <View style={AppStyles.marginTop_2}>
      <Remarks
        stateObject={stateObject}
      />
    </View>

    </View>}

  
    {stateObject.state.selectedTabIndex == 1 &&
    <View >
      {/* <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[1]}</Subheading> */}
      <InstituteFeePaymentBreakupDetails
        stateObject={stateObject}
      />
    </View>
   }

  



    {/* {stateObject.state.selectedTabIndex == 1 && <View>

    <View style={AppStyles.marginTop_2}>
        <InstituteFeePaymentDetails
          stateObject={stateObject}
        />
    </View>
    </View>} */}

  </View>)

}


module.exports = {
  functions: EditTemplate
}