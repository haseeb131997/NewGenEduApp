
import React from "react";
import { View, Text } from "react-native";
import StudyMaterialGeneral from './StudyMaterialGeneral';
import StudyMaterialContent from './StudyMaterialContent';
import Exception from '../../../utils/Exception'
import AppStyles from "../../../AppStyles/AppStyles";
import Remarks from './../../../components/Remarks';
import CreateCompleted from './../../../components/CreateCompleted';
import NotificationConfiguration from './../../../components/NotificationConfiguration';

import { Divider, Subheading, Title,Caption } from 'react-native-paper';
import { w, h } from "../../..//utils/Dimensions";
import { UiColor } from "../../../theme";

import { Tooltip } from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';



class CreateTemplate { }

 



CreateTemplate.CreateMandatory = function (stateObject) {
  stateObject.state.errorField = []
  var mandatoryCheckError = false;

  switch (stateObject.state.currentStep) {
    case 1:
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
        break;
    
    case 2:
      
        if(stateObject.state.dataModel.contentPath =='' || stateObject.state.dataModel.contentPath ==null)
        {
           Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-106', errorMessage: '', errorParam: '' }])
           return false
        }
      break
  }
  return true;  
}


// CreateTemplate.Mandatory = function (stateObject) {
 
//   const { periodTimingsEmptyrecord } = stateObject.state
//   stateObject.state.errorField = []
//   var mandatoryCheckError = false;
//       if (periodTimingsEmptyrecord.periodNumber == '' || periodTimingsEmptyrecord.periodNumber == null) {
//         mandatoryCheckError = true
//         stateObject.state.errorField.push('field7')
//       }
//       if (periodTimingsEmptyrecord.noon == '' || periodTimingsEmptyrecord.noon == null) {
  
//         mandatoryCheckError = true
//         stateObject.state.errorField.push('field8')
//       }
//       if ((periodTimingsEmptyrecord.startTime.hour == '' || periodTimingsEmptyrecord.startTime.hour == null) && (periodTimingsEmptyrecord.startTime.min == '' || periodTimingsEmptyrecord.startTime.min == null)) {
  
//         mandatoryCheckError = true
//         stateObject.state.errorField.push('field9')
//       }
  
//       if ((periodTimingsEmptyrecord.endTime.hour == '' || periodTimingsEmptyrecord.endTime.hour == null) && (periodTimingsEmptyrecord.endTime.min == '' || periodTimingsEmptyrecord.endTime.min == null)) {
  
//         mandatoryCheckError = true
//         stateObject.state.errorField.push('field10')
//       }
//       if (mandatoryCheckError) {
//         Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-080', errorMessage: '', errorParam: '' }])
//         return false
//       }
//       else {
//         return true
//       }
// }




CreateTemplate.CreateConfig = function (stateObject) {
  return(<View>
    {stateObject.state.currentStep == 1 &&
      <View>
        <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[0]}</Subheading>
        {/* <Divider style={AppStyles.marginTop_1}/> */}
        <StudyMaterialGeneral
          stateObject={stateObject}
        />
      </View>
    }
    {stateObject.state.currentStep == 2 &&
    <View>
         <View style={[AppStyles.flexDirectionRow,AppStyles.alignItems]}>
    <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[1]} <Text style={AppStyles.requiredStyle}>* </Text></Subheading>
      {<Tooltip
       overlayColor={UiColor.TRANSPARENT}
       containerStyle={[AppStyles.tooltipContainer,AppStyles.projection,AppStyles.materialTootip]}
       popover={<Caption>{'Upload the study material documents in the any of the following formats: .jpeg, .jpg, .png, .txt, .pdf, .doc, .docx, .ppt, .pptx, .xls, .xlsx & .mp4.'}</Caption>}>
        <AntDesign  name="questioncircle" size={AppStyles.tooltipIcn.height} color={UiColor.LIGHT_TEXT_COLOR} />
        </Tooltip>}
       </View>
        <StudyMaterialContent
          stateObject={stateObject}
        />
     </View>   
    }

     {stateObject.state.currentStep == 3 &&
        <Remarks
          stateObject={stateObject}
        />
    }
     {stateObject.state.currentStep == 4 &&
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