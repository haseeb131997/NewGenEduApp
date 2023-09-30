

import React from "react";
import { View, Text } from "react-native";
import TabScreen from '../../../components/TabScreen';
import ClassAssignmentView from './ClassAssignmentView';
import ClassAssignmentQuestion from './ClassAssignmentQuestion';
import ClassAssignmentWorkSheet from './ClassAssignmentWorkSheet';
import ClassAssignmentAssessment from './ClassAssignmentAssessment';
import AppStyles from "../../../AppStyles/AppStyles";
import Exception from '../../../utils/Exception'
import { Caption, Divider, Subheading, Title } from 'react-native-paper';
import Remarks from './../../../components/Remarks';
import { UiColor } from "../../../theme";












class EditTemplate { }



EditTemplate.ModificationMandatory = function (stateObject) {
  stateObject.state.errorField = []
  var mandatoryCheckError = false;

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
  // if (mandatoryCheckError) {
  //   Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-080', errorMessage: '', errorParam: '' }])
  //   return false
  // }
  // else {
  //   return true
  // }
  return true;
}


EditTemplate.ModificationConfig = function (stateObject) {
  return (<View>
    <TabScreen
      tabHeading={['Basic Info', 'Assignment']}
      stateObject={stateObject}
      stateValue={'selectedTabIndex'}
      selectedStateValue={stateObject.state.selectedTabIndex}
      barColor={UiColor.WHITE}
    />
    {/* <Divider/> */}
    {stateObject.state.selectedTabIndex == 0 && <View>
      <View>
        <ClassAssignmentView
          stateObject={stateObject}
        />
      </View>
      <Divider style={AppStyles.marginTop_3} />
    <View style={AppStyles.marginTop_2}>
      <Subheading style={AppStyles.bold_600}>{'Assessment'}</Subheading>
      <ClassAssignmentAssessment
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

    {stateObject.state.selectedTabIndex == 1 && <View>
      <View style={AppStyles.marginTop_2}>
      {stateObject.state.dataModel.type == 'Q' ?  <ClassAssignmentQuestion
          stateObject={stateObject}
        /> : <ClassAssignmentWorkSheet
        stateObject={stateObject}
      />}
      </View>
    </View>}

  </View>)

}


module.exports = {
  functions: EditTemplate
}