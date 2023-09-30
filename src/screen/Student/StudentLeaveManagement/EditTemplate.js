

import React from "react";
import { View, Text } from "react-native";
import TabScreen from '../../../components/TabScreen';
import AuditDetail from './../../../components/AuditDetail';
import StudentLeaveManagementGenral from './StudentLeaveManagementGenral';
import StudentLeaveManagemenDetails from './StudentLeaveManagemenDetails';
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

  if (stateObject.state.dataModel.referenceId == '' || stateObject.state.dataModel.referenceId == null) {
    mandatoryCheckError = true
    stateObject.state.errorField.push('field1')
  }
  if (stateObject.state.dataModel.studentName == '' || stateObject.state.dataModel.studentName == null) {
    mandatoryCheckError = true
    stateObject.state.errorField.push('field2')
  }

  if (stateObject.state.selectOption == '' || stateObject.state.selectOption == null) {
    mandatoryCheckError = true
    stateObject.state.errorField.push('field3')
  }



  if (stateObject.state.selectOption == 'fullDay') {
    if (stateObject.state.dataModel.from == '' || stateObject.state.dataModel.from == null) {
      mandatoryCheckError = true
      stateObject.state.errorField.push('field4')
    }

    if (stateObject.state.dataModel.to == '' || stateObject.state.dataModel.to == null) {
      mandatoryCheckError = true
      stateObject.state.errorField.push('field5')
    }
  }


  if (stateObject.state.selectOption == 'halfDay') {
    if ((stateObject.state.dataModel.from == '' || stateObject.state.dataModel.from == null) && stateObject.state.dataModel.to == '' || stateObject.state.dataModel.to == null) {
      mandatoryCheckError = true
      stateObject.state.errorField.push('field6')
    }

    if ((stateObject.state.dataModel.fromNoon == '' || stateObject.state.dataModel.fromNoon == null) && stateObject.state.dataModel.toNoon == '' || stateObject.state.dataModel.toNoon == null) {
      mandatoryCheckError = true
      stateObject.state.errorField.push('field7')
    }
  }


  if (stateObject.state.dataModel.type == '' || stateObject.state.dataModel.type == null) {
    mandatoryCheckError = true
    stateObject.state.errorField.push('field8')
  }
  if (stateObject.state.dataModel.reason == '' || stateObject.state.dataModel.reason == null) {
    mandatoryCheckError = true
    stateObject.state.errorField.push('field9')
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
      <StudentLeaveManagementGenral
        stateObject={stateObject}
      />
    </View>


    <Divider style={AppStyles.marginTop_3} />
    <View style={AppStyles.marginTop_2}>
      <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[1]}</Subheading>
      <StudentLeaveManagemenDetails
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
        <InstituteFeeManagementDetails
          stateObject={stateObject}
        />
    </View>
    </View>} */}

  </View>)

}


module.exports = {
  functions: EditTemplate
}