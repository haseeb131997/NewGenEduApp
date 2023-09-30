

import React from "react";
import { View, Text } from "react-native";
import TabScreen from '../../../components/TabScreen';
import AuditDetail from './../../../components/AuditDetail';
import StudyMaterialGeneral from './StudyMaterialGeneral';
import StudyMaterialContent from './StudyMaterialContent';
import AppStyles from "../../../AppStyles/AppStyles";
import Exception from '../../../utils/Exception'
import { Caption, Divider, Subheading, Title } from 'react-native-paper';
import Remarks from './../../../components/Remarks';
import NotificationConfiguration from './../../../components/NotificationConfiguration';
import { UiColor } from "../../../theme";
import { w, h } from "../../..//utils/Dimensions";

import { Tooltip } from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';











class EditTemplate { }



EditTemplate.ModificationMandatory = function (stateObject) {
  stateObject.state.errorField = []
  var mandatoryCheckError = false;
  
  if (stateObject.state.dataModel.materialID == '' || stateObject.state.dataModel.materialID == null) {
    // Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-001', errorMessage: '', errorParam: ['Class Code'] }])
    // return false;
    mandatoryCheckError = true
    stateObject.state.errorField.push('field1')
  }
  if (stateObject.state.dataModel.materialDescription == '' || stateObject.state.dataModel.materialDescription == null) {
    // Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-001', errorMessage: '', errorParam: ['Class Description'] }])
    // return false;
    mandatoryCheckError = true
    stateObject.state.errorField.push('field2')
  }
  if (stateObject.state.dataModel.standard == '' || stateObject.state.dataModel.standard == null) {
    // Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-001', errorMessage: '', errorParam: ['Class Description'] }])
    // return false;
    mandatoryCheckError = true
    stateObject.state.errorField.push('field3')
  }
  if (stateObject.state.dataModel.subjectID == '' || stateObject.state.dataModel.subjectID == null) {
    // Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-001', errorMessage: '', errorParam: ['Class Description'] }])
    // return false;
    mandatoryCheckError = true
    stateObject.state.errorField.push('field4')
  }
  if (stateObject.state.dataModel.lesson == '' || stateObject.state.dataModel.lesson == null) {
    // Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-001', errorMessage: '', errorParam: ['Class Description'] }])
    // return false;
    mandatoryCheckError = true
    stateObject.state.errorField.push('field5')
  }

  if (mandatoryCheckError) {
    Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-080', errorMessage: '', errorParam: '' }])
    return false
  }
  else {

  if(stateObject.state.dataModel.contentPath =='' || stateObject.state.dataModel.contentPath)
  {
    Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-106', errorMessage: '', errorParam: '' }])
    return false   
  
  }
} 

  return true;
}


EditTemplate.ModificationConfig = function (stateObject) {
  return (<View>
  {/* <TabScreen
      tabHeading={['Basic Info','Assessment']}
      stateObject={stateObject}
      stateValue={'selectedTabIndex'}
      selectedStateValue={stateObject.state.selectedTabIndex}
      barColor={UiColor.WHITE}
    /> */}
    {/* <Divider/> */}

  <View>
  <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[0]}</Subheading>
        <StudyMaterialGeneral
          stateObject={stateObject}
        />
    </View>

    <Divider style={AppStyles.marginTop_3} />
    {/* <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[1]} <Text style={AppStyles.requiredStyle}>* </Text></Subheading> */}
    <View style={[AppStyles.flexDirectionRow,AppStyles.alignItems,AppStyles.marginTop_1]}>
    <Subheading style={AppStyles.bold_600}>{'Uploaded Material'} <Text style={AppStyles.requiredStyle}>* </Text></Subheading>
      {<Tooltip
       overlayColor={UiColor.TRANSPARENT}
       containerStyle={[AppStyles.tooltipContainer,AppStyles.projection,AppStyles.materialTootip]}
       popover={<Caption>{'Upload the study material documents in the any of the following formats: .jpeg, .jpg, .png, .txt, .pdf, .doc, .docx, .ppt, .pptx, .xls, .xlsx & .mp4.'}</Caption>}>
        <AntDesign  name="questioncircle" size={AppStyles.tooltipIcn.height} color={UiColor.LIGHT_TEXT_COLOR} />
        </Tooltip>}
       </View>
    <View style={AppStyles.marginTop_2}>
    <StudyMaterialContent
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