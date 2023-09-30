

import React from "react";
import { View, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import UserProfileGeneral from './UserProfileGeneral';
import UserProfileClass from './UserProfileClass';
import UserProfileParent from './UserProfileParent';
import UserProfileStaff from './UserProfileStaff';
import UserProfileInstitute from './UserProfileInstitute';
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
  if (stateObject.state.dataModel.userID == '' || stateObject.state.dataModel.userID == null) {
    mandatoryCheckError = true
    stateObject.state.errorField.push('field1')
  }
  if (stateObject.state.dataModel.userName == '' || stateObject.state.dataModel.userName == null) {
    mandatoryCheckError = true
    stateObject.state.errorField.push('field2')
  }

  if (stateObject.state.dataModel.password == '' || stateObject.state.dataModel.password == null) {
    mandatoryCheckError = true
    stateObject.state.errorField.push('field3')
  }
  if (stateObject.state.dataModel.userType == '' || stateObject.state.dataModel.userType == null) {
    mandatoryCheckError = true
    stateObject.state.errorField.push('field4')
  }
  if (stateObject.state.dataModel.userType == '' || stateObject.state.dataModel.userType == null) {
    mandatoryCheckError = true
    stateObject.state.errorField.push('field4')
  }
  if(stateObject.state.dataModel.userType == 'S'){
    if (stateObject.state.dataModel.studentName == '' || stateObject.state.dataModel.studentName == null) {
      mandatoryCheckError = true
      stateObject.state.errorField.push('field5')
    }
  }

  if((stateObject.state.dataModel.userType == 'T' || stateObject.state.dataModel.userType == 'A' || stateObject.state.dataModel.userType == 'O')){
    if (stateObject.state.dataModel.teacherName == '' || stateObject.state.dataModel.teacherName == null) {
      mandatoryCheckError = true
      stateObject.state.errorField.push('field6')
    }
  }

  if (stateObject.state.dataModel.status == '' || stateObject.state.dataModel.status == null) {
    mandatoryCheckError = true
    stateObject.state.errorField.push('field7')
  }

  if (stateObject.state.dataModel.emailID == '' || stateObject.state.dataModel.emailID == null) {
    mandatoryCheckError = true
    stateObject.state.errorField.push('field8')
  }

  if (stateObject.state.dataModel.mobileNo == '' || stateObject.state.dataModel.mobileNo == null) {
    mandatoryCheckError = true
    stateObject.state.errorField.push('field9')
  }

  if (stateObject.state.dataModel.instituteName == '' || stateObject.state.dataModel.instituteName == null) {
    mandatoryCheckError = true
    stateObject.state.errorField.push('field10')
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
      <UserProfileGeneral
        stateObject={stateObject}
      />
    </View>

    {(stateObject.state.dataModel.userType == 'A' || stateObject.state.dataModel.userType == 'T') && <View>
      <Divider style={AppStyles.marginTop_3} />
      <View style={AppStyles.marginTop_2}>
        <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[1]}</Subheading>
        <UserProfileClass
          stateObject={stateObject}
        />
      </View>
    </View>}

    {(stateObject.state.dataModel.userType == 'P') && <View>
      <Divider style={AppStyles.marginTop_3} />
      <View style={AppStyles.marginTop_2}>
        <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[2]}</Subheading>
        <UserProfileParent
          stateObject={stateObject}
        />
      </View>
    </View>}

    {(stateObject.state.dataModel.userType == 'A' || stateObject.state.dataModel.userType == 'T' || stateObject.state.dataModel.userType == 'O') && <View>
      <Divider style={AppStyles.marginTop_3} />
      <View style={AppStyles.marginTop_2}>
        <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[3]}</Subheading>
        <UserProfileStaff
          stateObject={stateObject}
        />
      </View>
    </View>}

    {(stateObject.state.dataModel.userType == 'A' || stateObject.state.dataModel.userType == 'T' || stateObject.state.dataModel.userType == '0') && <View>
      <Divider style={AppStyles.marginTop_3} />
      <View style={AppStyles.marginTop_2}>
        <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[4]}</Subheading>
        <UserProfileInstitute
          stateObject={stateObject}
        />
      </View>
    </View>}

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