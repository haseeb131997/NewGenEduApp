
import React from "react";
import { View, Text } from "react-native";
import Exception from '../../../utils/Exception'
import AppStyles from "../../../AppStyles/AppStyles";
import StudentGenralDetail from './StudentGenralDetail';
import StudentFamilyDetail from './StudentFamilyDetail';
import StudentAddressDetail from './StudentAddressDetail';
import StudentOtherDetail from './StudentOtherDetail';
import StudentInstituteFieldDetail from './StudentInstituteFieldDetail';


import Remarks from './../../../components/Remarks';
import CreateCompleted from './../../../components/CreateCompleted';

import { Divider, Subheading, Title } from 'react-native-paper';




class CreateTemplate { }





CreateTemplate.CreateMandatory = function (stateObject) {
  stateObject.state.errorField = []
  var mandatoryCheckError = false;
  switch (stateObject.state.currentStep) {
    case 1:
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
      if (mandatoryCheckError) {
        Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-080', errorMessage: '', errorParam: '' }])
        return false
      }
      else {
        return true
      }
      break
      case 2:
        if (stateObject.state.dataModel.family == null || stateObject.state.dataModel.family.length == 0) {
          Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-087', errorMessage: '', errorParam: ['Family Member Details'] }])
          return false;
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
        {/* <Divider style={AppStyles.marginTop_1} /> */}
        <StudentGenralDetail
          stateObject={stateObject}
        />
      </View>
    }
    {stateObject.state.currentStep == 2 &&
      <View>
        {/* <Subheading style={AppStyles.bold_600}>Family Info</Subheading> */}
        {/* <Divider style={AppStyles.marginTop_1} /> */}
        <StudentFamilyDetail
          stateObject={stateObject}
        />
      </View>
    }
    {stateObject.state.currentStep == 3 &&
      <View>
        <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[2]}</Subheading>
        {/* <Divider style={AppStyles.marginTop_1} /> */}
        <StudentAddressDetail
          stateObject={stateObject}
        />
      </View>
    }
    {stateObject.state.currentStep == 4 &&
      <View>
        <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[3]}</Subheading>
        {/* <Divider style={AppStyles.marginTop_1} /> */}
        <StudentOtherDetail
          stateObject={stateObject}
        />
      </View>
    }
    {stateObject.state.currentStep == 5 &&
      <View>
        <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[4]}</Subheading>
        <StudentInstituteFieldDetail
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