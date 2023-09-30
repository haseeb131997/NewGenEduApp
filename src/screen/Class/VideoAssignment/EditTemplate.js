

import React from "react";
import { View, Text } from "react-native";
import TabScreen from '../../../components/TabScreen';
import AuditDetail from './../../../components/AuditDetail';
import VideoAssignmentGeneral from './VideoAssignmentGeneral';
import VideoAssignmentContent from './VideoAssignmentContent';
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
  
  if (stateObject.state.dataModel.assignmentID == '' || stateObject.state.dataModel.assignmentID == null) {
    mandatoryCheckError = true
    stateObject.state.errorField.push('field1')
  }
  if (stateObject.state.dataModel.assignmentDescription == '' || stateObject.state.dataModel.assignmentDescription == null) {
    mandatoryCheckError = true
    stateObject.state.errorField.push('field2')
  }
  if (stateObject.state.dataModel.subjectID == '' || stateObject.state.dataModel.subjectID == null) {
    mandatoryCheckError = true
    stateObject.state.errorField.push('field3')
  }
  if (stateObject.state.dataModel.groupID == '' || stateObject.state.dataModel.groupID == null) {
    mandatoryCheckError = true
    stateObject.state.errorField.push('field4')
  }

  if (stateObject.state.dataModel.URL == '' || stateObject.state.dataModel.URL == null) {
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
    

  return true;
}


EditTemplate.ModificationConfig = function (stateObject) {
  return (<View>
  <TabScreen
      tabHeading={['Basic Info','Content']}
      stateObject={stateObject}
      stateValue={'selectedTabIndex'}
      selectedStateValue={stateObject.state.selectedTabIndex}
      barColor={UiColor.WHITE}
    />
    {/* <Divider/> */}
{stateObject.state.selectedTabIndex == 0 &&  <View>
  <View>
        <VideoAssignmentGeneral
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

  </View>}

{stateObject.state.selectedTabIndex == 1 && <View>

    <View style={AppStyles.marginTop_2}>
        <VideoAssignmentContent
          stateObject={stateObject}
        />
    </View>
    </View>}

  </View>)

}


module.exports = {
  functions: EditTemplate
}