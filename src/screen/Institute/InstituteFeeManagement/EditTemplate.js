

import React from "react";
import { View, Text } from "react-native";
import TabScreen from '../../../components/TabScreen';
import AuditDetail from './../../../components/AuditDetail';
import InstituteFeeManagementGeneral from './InstituteFeeManagementGeneral';
import InstituteFeeManagementBreakup from './InstituteFeeManagementBreakup';
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

  if (stateObject.state.dataModel.feeID == '' || stateObject.state.dataModel.feeID == null) {
    mandatoryCheckError = true
    stateObject.state.errorField.push('field1')
  }
  if (stateObject.state.dataModel.feeDescription == '' || stateObject.state.dataModel.feeDescription == null) {
    mandatoryCheckError = true
    stateObject.state.errorField.push('field2')
  }
  if (stateObject.state.dataModel.feeType == '' || stateObject.state.dataModel.feeType == null) {
    mandatoryCheckError = true
    stateObject.state.errorField.push('field3')
  }
  if (stateObject.state.dataModel.amount == '' || stateObject.state.dataModel.amount == null) {
    mandatoryCheckError = true
    stateObject.state.errorField.push('field4')
  }
  if (stateObject.state.dataModel.groupID == '' || stateObject.state.dataModel.groupID == null) {
    mandatoryCheckError = true
    stateObject.state.errorField.push('field5')
  }
  if (stateObject.state.dataModel.dueDate == '' || stateObject.state.dataModel.dueDate == null) {
    mandatoryCheckError = true
    stateObject.state.errorField.push('field6')
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
    {/* <TabScreen
      tabHeading={['Basic Info', 'Content']}
      stateObject={stateObject}
      stateValue={'selectedTabIndex'}
      selectedStateValue={stateObject.state.selectedTabIndex}
      barColor={UiColor.WHITE}
    />
    <Divider /> */}

    <View>
    <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[0]}</Subheading>
      <InstituteFeeManagementGeneral
        stateObject={stateObject}
      />
    </View>


    <Divider style={AppStyles.marginTop_3} />
    <View style={AppStyles.marginTop_2}>
      <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[1]}</Subheading>
      <InstituteFeeManagementBreakup
        stateObject={stateObject}
      />
    </View>

    <Divider style={AppStyles.marginTop_3} />
    <View style={AppStyles.marginTop_2}>
      <NotificationConfiguration
        stateObject={stateObject}
      />
    </View>

    <Divider style={AppStyles.marginTop_3} />
    <View style={AppStyles.marginTop_2}>
      <Remarks
        stateObject={stateObject}
      />
    </View>



    {/* {stateObject.state.selectedTabIndex == 1 && <View>

    <View style={AppStyles.marginTop_2}>
        <InstituteFeeManagementBreakup
          stateObject={stateObject}
        />
    </View>
    </View>} */}

  </View>)

}


module.exports = {
  functions: EditTemplate
}