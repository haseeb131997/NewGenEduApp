

import React from "react";
import { View, Text } from "react-native";
import TabScreen from '../../../components/TabScreen';
import AuditDetail from './../../../components/AuditDetail';
import StudentEcircularGeneral from './StudentEcircularGeneral';
import StudentEcircularContent from './StudentEcircularContent';
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

  if (stateObject.state.dataModel.circularID == '' || stateObject.state.dataModel.circularID == null) {
    mandatoryCheckError = true
    stateObject.state.errorField.push('field1')
  }
  if (stateObject.state.dataModel.circularDescription == '' || stateObject.state.dataModel.circularDescription == null) {
    mandatoryCheckError = true
    stateObject.state.errorField.push('field2')
  }

  if (stateObject.state.dataModel.groupID == '' || stateObject.state.dataModel.groupID == null) {
    mandatoryCheckError = true
    stateObject.state.errorField.push('field3')
  }

  if (stateObject.state.dataModel.circularDate == '' || stateObject.state.dataModel.circularDate == null) {
    mandatoryCheckError = true
    stateObject.state.errorField.push('field4')
  }
  if (stateObject.state.dataModel.contentPath == '' || stateObject.state.dataModel.contentPath == null) {
    Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-110', errorMessage: '', errorParam: [''] }])
    return false;
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
      <StudentEcircularGeneral
        stateObject={stateObject}
      />
    </View>


    <Divider style={AppStyles.marginTop_3} />
    <View style={AppStyles.marginTop_2}>
      <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[1]}</Subheading>
      <StudentEcircularContent
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
        <StudentEcircularContent
          stateObject={stateObject}
        />
    </View>
    </View>} */}

  </View>)

}


module.exports = {
  functions: EditTemplate
}