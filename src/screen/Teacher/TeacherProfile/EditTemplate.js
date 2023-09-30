

import React from "react";
import { View, Text } from "react-native";
import TeacherGenralDetail from './TeacherGenralDetail';
import TeacherFamilyDetail from './TeacherFamilyDetail';
import TeacherAddressDetail from './TeacherAddressDetail';
import TeacherInstituteFieldDetail from './TeacherInstituteFieldDetail';
import TeacherOtherDetail from './TeacherOtherDetail';
import AppStyles from "../../../AppStyles/AppStyles";
import Exception from '../../../utils/Exception'
import Remarks from './../../../components/Remarks';
import { Caption, Divider, Subheading, Title } from 'react-native-paper';
import { w, h } from "../../../utils/Dimensions";










class EditTemplate { }



EditTemplate.ModificationMandatory = function (stateObject) {
  stateObject.state.errorField = []
  var mandatoryCheckError = false;
  if (stateObject.state.dataModel.teacherID == '' || stateObject.state.dataModel.teacherID == null) {
    // Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-001', errorMessage: '', errorParam: ['Year'] }])
    mandatoryCheckError = true
    stateObject.state.errorField.push('field1')
    // return false;
  }
  if (stateObject.state.dataModel.teacherName == '' || stateObject.state.dataModel.teacherName == null) {
    // Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-001', errorMessage: '', errorParam: ['Start Date'] }])
    mandatoryCheckError = true
    stateObject.state.errorField.push('field2')
    // return false;
  }
  if (stateObject.state.dataModel.general.emailID  == '' || stateObject.state.dataModel.general.emailID  == null) {
    // Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-001', errorMessage: '', errorParam: ['End Date'] }])
    mandatoryCheckError = true
    stateObject.state.errorField.push('field3')
    // return false;
  }
  if (stateObject.state.dataModel.general.contactNo== '' || stateObject.state.dataModel.general.contactNo== null) {
    // Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-001', errorMessage: '', errorParam: ['End Date'] }])
    mandatoryCheckError = true
    stateObject.state.errorField.push('field4')
    // return false;
  }

  if (stateObject.state.dataModel.emergency.contactPerson == null || stateObject.state.dataModel.emergency.contactPerson.length == 0) {
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
      <TeacherGenralDetail
        stateObject={stateObject}
      />
    </View>
    <Divider style={AppStyles.marginTop_3} />
    <View style={AppStyles.marginTop_2}>
      <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[1]}</Subheading>
      {/* <Divider style={AppStyles.marginTop_1} /> */}
      <TeacherFamilyDetail
        stateObject={stateObject}
      />
    </View>

    <Divider style={AppStyles.marginTop_3} />
    <View style={AppStyles.marginTop_2}>
      <Subheading style={[AppStyles.bold_600, AppStyles.marginTop_2]}>{stateObject.state.createStepsHeading[2]}</Subheading>
      {/* <Divider style={AppStyles.marginTop_1} /> */}
      <TeacherAddressDetail
        stateObject={stateObject}
      />
    </View>

    <Divider style={AppStyles.marginTop_3} />
    <View style={AppStyles.marginTop_2}>
      <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[4]}</Subheading>
      {/* <Divider style={AppStyles.marginTop_1} /> */}
      <TeacherInstituteFieldDetail
        stateObject={stateObject}
      />
    </View>

    <Divider style={AppStyles.marginTop_3} />
    <View style={AppStyles.marginTop_2}>
      <Subheading style={[AppStyles.bold_600, AppStyles.marginTop_2]}>{stateObject.state.createStepsHeading[3]}</Subheading>
      {/* <Divider style={AppStyles.marginTop_1} /> */}
      <TeacherOtherDetail
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