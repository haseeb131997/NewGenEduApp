

import React from "react";
import { View, Text } from "react-native";
import ClassStudentRegisterGeneral from './ClassStudentRegisterGeneral';
import ClassStudentRegisterDetails from './ClassStudentRegisterDetails';
import AppStyles from "../../../AppStyles/AppStyles";
import Exception from '../../../utils/Exception'
import { Caption, Divider, Subheading, Title } from 'react-native-paper';
import Remarks from './../../../components/Remarks';
import TabScreen from '../../../components/TabScreen';
import { UiColor } from "../../../theme";











class EditTemplate { }



EditTemplate.ModificationMandatory = function (stateObject) {
  stateObject.state.errorField = []
  var mandatoryCheckError = false;
  if (stateObject.state.dataModel.registerID  == '' || stateObject.state.dataModel.registerID  == null) {
    // Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-001', errorMessage: '', errorParam: ['Class Code'] }])
    // return false;
    mandatoryCheckError = true
    stateObject.state.errorField.push('field1')
  }
  if (stateObject.state.dataModel.class  == '' || stateObject.state.dataModel.class  == null) {
    // Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-001', errorMessage: '', errorParam: ['Class Code'] }])
    // return false;
    mandatoryCheckError = true
    stateObject.state.errorField.push('field2')
  }
  if (stateObject.state.dataModel.startDate == '' || stateObject.state.dataModel.startDate == null) {
    // Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-001', errorMessage: '', errorParam: ['Class Description'] }])
    // return false;
    mandatoryCheckError = true
    stateObject.state.errorField.push('field3')
  }
  if (stateObject.state.dataModel.endDate == '' || stateObject.state.dataModel.endDate == null) {
    // Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-001', errorMessage: '', errorParam: ['Class Description'] }])
    // return false;
    mandatoryCheckError = true
    stateObject.state.errorField.push('field4')
  }
  if (mandatoryCheckError) {
    Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-080', errorMessage: '', errorParam: '' }])
    return false
  }
  else {
    return true
  }
  // return true;
}


EditTemplate.ModificationConfig = function (stateObject) {
  return (<View>

  <TabScreen
      tabHeading={['Basic info','Students']}
      stateObject={stateObject}
      stateValue={'selectedTabIndex'}
      selectedStateValue={stateObject.state.selectedTabIndex}
      barColor={UiColor.WHITE}
    />


  {stateObject.state.selectedTabIndex == 0 && <View>
   <View>
      {/* <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[0]}</Subheading> */}
      {/* <Divider style={AppStyles.marginTop_1} /> */}
        <ClassStudentRegisterGeneral
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


   {stateObject.state.selectedTabIndex == 1 &&<View style={AppStyles.marginTop_2}>
      {/* <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[1]}</Subheading> */}
      {/* <Divider style={AppStyles.marginTop_1} /> */}
        <ClassStudentRegisterDetails
          stateObject={stateObject}
        />
    </View>}
    
  </View>)

}


module.exports = {
  functions: EditTemplate
}