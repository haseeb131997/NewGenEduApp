

import React from "react";
import { View, Text } from "react-native";
import TabScreen from '../../../components/TabScreen';
import AuditDetail from './../../../components/AuditDetail';
import QuestionPaperConfigGeneral from './QuestionPaperConfigGeneral';
import QuestionPaperConfigInstructions from './QuestionPaperConfigInstructions';
import AppStyles from "../../../AppStyles/AppStyles";
import Exception from '../../../utils/Exception'
import { Caption, Divider, Subheading, Title } from 'react-native-paper';
import Remarks from './../../../components/Remarks';
import QuestionPaperConfigSection from './QuestionPaperConfigSection';
import NotificationConfiguration from './../../../components/NotificationConfiguration';











class EditTemplate { }



EditTemplate.ModificationMandatory = function (stateObject) {
  stateObject.state.errorField = []
  var mandatoryCheckError = false;

  if (stateObject.state.dataModel.questionPaperId == '' || stateObject.state.dataModel.questionPaperId == null) {
    mandatoryCheckError = true
    stateObject.state.errorField.push('field1')
  }
  if (stateObject.state.dataModel.description == '' || stateObject.state.dataModel.description == null) {
    mandatoryCheckError = true
    stateObject.state.errorField.push('field2')
  }
  if (stateObject.state.dataModel.standard == '' || stateObject.state.dataModel.standard == null) {
    mandatoryCheckError = true
    stateObject.state.errorField.push('field3')
  }
  if (stateObject.state.dataModel.subjectID == '' || stateObject.state.dataModel.subjectID == null) {
    mandatoryCheckError = true
    stateObject.state.errorField.push('field4')
  }

  if (stateObject.state.dataModel.questionPaperInstruction == '' || stateObject.state.dataModel.questionPaperInstruction == null) {
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
      <QuestionPaperConfigGeneral
        stateObject={stateObject}
      />
    </View>


    <Divider style={AppStyles.marginTop_3} />
    <View style={AppStyles.marginTop_2}>
      <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[1]}</Subheading>
      <QuestionPaperConfigInstructions
        stateObject={stateObject}
      />
    </View>

    <Divider style={AppStyles.marginTop_3} />
    <View style={AppStyles.marginTop_2}>
    <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[2]}</Subheading>
      <QuestionPaperConfigSection
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

  </View>)

}


module.exports = {
  functions: EditTemplate
}