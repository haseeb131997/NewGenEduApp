
import React from "react";
import { View, Text } from "react-native";
import Exception from '../../../utils/Exception'
import AppStyles from "../../../AppStyles/AppStyles";
import UserProfileGeneral from './UserProfileGeneral';
import UserProfileClass from './UserProfileClass';
import UserProfileParent from './UserProfileParent';
import UserProfileStaff from './UserProfileStaff';
import UserProfileInstitute from './UserProfileInstitute';
import Remarks from './../../../components/Remarks';
import CreateCompleted from './../../../components/CreateCompleted';

import { Divider, Subheading, Title } from 'react-native-paper';




class CreateTemplate { }







CreateTemplate.CreateMandatory = function (stateObject) {
  stateObject.state.errorField = []
  var mandatoryCheckError = false;
  switch (stateObject.state.currentStep) {
    case 1:
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
      if (stateObject.state.dataModel.userType == 'S') {
        if (stateObject.state.dataModel.studentName == '' || stateObject.state.dataModel.studentName == null) {
          mandatoryCheckError = true
          stateObject.state.errorField.push('field5')
        }
      }

      if ((stateObject.state.dataModel.userType == 'T' || stateObject.state.dataModel.userType == 'A' || stateObject.state.dataModel.userType == 'O')) {
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

      break
  }
  return true;
}


CreateTemplate.CreateConfig = function (stateObject) {
  return (<View>
    {stateObject.state.currentStep == 1 &&
      <View>
        <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[0]}</Subheading>
        {/* <Divider style={AppStyles.marginTop_1}/> */}
        <View style={AppStyles.marginTop_1}>
          <UserProfileGeneral
            stateObject={stateObject}
          />
        </View>
      </View>
    }
    {stateObject.state.currentStep == 2 &&
      <View>
        <UserProfileClass
          stateObject={stateObject}
        />
      </View>
    }
    {stateObject.state.currentStep == 3 &&
      <View>
        <UserProfileParent
          stateObject={stateObject}
        />
      </View>
    }
    {stateObject.state.currentStep == 4 &&
      <View>
        <UserProfileStaff
          stateObject={stateObject}
        />
      </View>
    }
    {stateObject.state.currentStep == 5 &&
      <View>
        <UserProfileInstitute
          stateObject={stateObject}
        />
      </View>
    }
    {stateObject.state.currentStep == 6 &&
      <Remarks
        stateObject={stateObject}
      />
    }
    {stateObject.state.currentStep == 7 &&
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