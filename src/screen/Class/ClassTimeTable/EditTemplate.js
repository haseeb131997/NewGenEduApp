

import React from "react";
import { View, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import ClassTimeTableGeneral from './ClassTimeTableGeneral';
import ClassTimeTableDetails from './ClassTimeTableDetails';
import GeneralUtils from "../../../utils/GeneralUtils";
import AppStyles from "../../../AppStyles/AppStyles";
import Exception from '../../../utils/Exception'
import Remarks from './../../../components/Remarks';
import { Caption, Divider, Subheading, Title } from 'react-native-paper';
import { w, h } from "../../../utils/Dimensions";










class EditTemplate { }



EditTemplate.ModificationMandatory = function (stateObject) {
  stateObject.state.errorField = []
  var mandatoryCheckError = false;
    //  if (stateObject.state.dataModel.year == '' || stateObject.state.dataModel.year == null) {
    //     // Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-001', errorMessage: '', errorParam: ['Year'] }])
    //     mandatoryCheckError = true
    //     stateObject.state.errorField.push('field1')
    //     // return false;
    //   }
    //   if (stateObject.state.dataModel.startDate == '' || stateObject.state.dataModel.startDate == null) {
    //     // Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-001', errorMessage: '', errorParam: ['Start Date'] }])
    //     mandatoryCheckError = true
    //     stateObject.state.errorField.push('field2')
    //     // return false;
    //   }
    //   if (stateObject.state.dataModel.endDate == '' || stateObject.state.dataModel.endDate == null) {
    //     // Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-001', errorMessage: '', errorParam: ['End Date'] }])
    //     mandatoryCheckError = true
    //     stateObject.state.errorField.push('field3')
    //     // return false;
    //   }
    //   if (mandatoryCheckError) {
    //     Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-080', errorMessage: '', errorParam: '' }])
    //     return false
    //   }
    //   else {
    //     return true
    //   }  
  return true;
}


EditTemplate.ModificationConfig = function (stateObject) {
  return (<View>
  <View>
      <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[0]}</Subheading>
      {/* <Divider style={AppStyles.marginTop_1} /> */}
        <ClassTimeTableGeneral
          stateObject={stateObject}
        />
    </View>
    <Divider style={AppStyles.marginTop_3} />
    <View style={AppStyles.marginTop_2}>
      <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[1]}</Subheading>
      {/* <Divider style={AppStyles.marginTop_1} /> */}
        <ClassTimeTableDetails
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