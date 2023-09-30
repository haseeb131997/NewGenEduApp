

import React from "react";
import { View, Text } from "react-native";
import TabScreen from '../../../components/TabScreen';
import AuditDetail from './../../../components/AuditDetail';
import ClassSoftSkillAssessmentGeneral from './ClassSoftSkillAssessmentGeneral';
import ClassSoftSkillAssessmentDetails from './ClassSoftSkillAssessmentDetails';
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
  
  if (stateObject.state.dataModel.class == '' || stateObject.state.dataModel.class == null) {
    // Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-001', errorMessage: '', errorParam: ['Class Code'] }])
    // return false;
    mandatoryCheckError = true
    stateObject.state.errorField.push('field1')
  }
  if (stateObject.state.dataModel.exam == '' || stateObject.state.dataModel.exam == null) {
    // Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-001', errorMessage: '', errorParam: ['Class Description'] }])
    // return false;
    mandatoryCheckError = true
    stateObject.state.errorField.push('field2')
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
      tabHeading={['Basic Info','Assessment']}
      stateObject={stateObject}
      stateValue={'selectedTabIndex'}
      selectedStateValue={stateObject.state.selectedTabIndex}
      barColor={UiColor.WHITE}
    />
    {/* <Divider/> */}
{stateObject.state.selectedTabIndex == 0 &&  <View>
  <View>
        <ClassSoftSkillAssessmentGeneral
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
        <ClassSoftSkillAssessmentDetails
          stateObject={stateObject}
        />
    </View>
    </View>}

  </View>)

}


module.exports = {
  functions: EditTemplate
}