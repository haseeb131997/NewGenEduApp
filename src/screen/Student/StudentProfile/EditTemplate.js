

import React from "react";
import { View, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import StudentGenralDetail from './StudentGenralDetail';
import StudentFamilyDetail from './StudentFamilyDetail';
import StudentAddressDetail from './StudentAddressDetail';
import StudentNotesDetailView from './StudentNotesDetailView';
import StudentOtherDetail from './StudentOtherDetail';

import GeneralUtils from "../../../utils/GeneralUtils";
import AppStyles from "../../../AppStyles/AppStyles";
import Exception from '../../../utils/Exception'
import Remarks from './../../../components/Remarks';
import { Caption, Divider, Subheading, Title } from 'react-native-paper';
import { w, h } from "../../../utils/Dimensions";
import StudentInstituteFieldDetail from './StudentInstituteFieldDetail';









class EditTemplate { }



EditTemplate.ModificationMandatory = function (stateObject) {
  stateObject.state.errorField = []
  var mandatoryCheckError = false;
  if (stateObject.state.dataModel.studentID == '' || stateObject.state.dataModel.studentID == null) {
    // Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-001', errorMessage: '', errorParam: ['Year'] }])
    mandatoryCheckError = true
    stateObject.state.errorField.push('field1')
    // return false;
  }
  if (stateObject.state.dataModel.studentName == '' || stateObject.state.dataModel.studentName == null) {
    // Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-001', errorMessage: '', errorParam: ['Start Date'] }])
    mandatoryCheckError = true
    stateObject.state.errorField.push('field2')
    // return false;
  }
  if (stateObject.state.dataModel.general.gender == '' || stateObject.state.dataModel.general.gender == null) {
    // Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-001', errorMessage: '', errorParam: ['End Date'] }])
    mandatoryCheckError = true
    stateObject.state.errorField.push('field3')
    // return false;
  }
  if (stateObject.state.dataModel.general.dob == '' || stateObject.state.dataModel.general.dob == null) {
    // Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-001', errorMessage: '', errorParam: ['End Date'] }])
    mandatoryCheckError = true
    stateObject.state.errorField.push('field4')
    // return false;
  }

  if (stateObject.state.dataModel.family == null || stateObject.state.dataModel.family.length == 0) {
    Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-087', errorMessage: '', errorParam: ['Family Member Details'] }])
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
  <View>
      <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[0]}</Subheading>
      {/* <Divider style={AppStyles.marginTop_1} /> */}
        <StudentGenralDetail
          stateObject={stateObject}
        />
    </View>
    <Divider style={AppStyles.marginTop_3} />
    <View style={AppStyles.marginTop_2}>
      <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[1]}</Subheading>
      {/* <Divider style={AppStyles.marginTop_1} /> */}
        <StudentFamilyDetail
          stateObject={stateObject}
        />
    </View>

    <Divider style={AppStyles.marginTop_3} />
    <View style={AppStyles.marginTop_2}>
      <Subheading style={[AppStyles.bold_600,AppStyles.marginTop_2]}>{stateObject.state.createStepsHeading[2]}</Subheading>
      {/* <Divider style={AppStyles.marginTop_1} /> */}
        <StudentAddressDetail
          stateObject={stateObject}
        />
    </View>

    <Divider style={AppStyles.marginTop_3} />
    <View style={AppStyles.marginTop_2}>
      <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[4]}</Subheading>
      {/* <Divider style={AppStyles.marginTop_1} /> */}
        <StudentInstituteFieldDetail
          stateObject={stateObject}
        />
    </View>

    <Divider style={AppStyles.marginTop_3} />
    <View style={AppStyles.marginTop_2}>
      <Subheading style={[AppStyles.bold_600,AppStyles.marginTop_2]}>{stateObject.state.createStepsHeading[3]}</Subheading>
      {/* <Divider style={AppStyles.marginTop_1} /> */}
        <StudentOtherDetail
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