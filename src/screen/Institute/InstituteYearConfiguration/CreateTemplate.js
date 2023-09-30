
import React from "react";
import { View, Text } from "react-native";
import Exception from '../../../utils/Exception'
import AppStyles from "../../../AppStyles/AppStyles";
import AcademicYearConfigurationGeneral from './AcademicYearConfigurationGeneral';
import Remarks from './../../../components/Remarks';
import CreateCompleted from './../../../components/CreateCompleted';

import { Divider, Subheading, Title } from 'react-native-paper';




class CreateTemplate { }


CreateTemplate.InstructionList = [
  {
    operation: 'Create',
    step: 1,
    InstructionHeading: 'Step2: Enter academic year details',
    instructionText: [
      {
        text: "Academic Year Configuration: Here the Institute can assign a start & end date for the given academic year. The start & end dates determined here applies to all the classes under the current institute. If a class follows different start and end dates, then that specific start & end date can be given for that class in Class->Student Register"
      },
      {
        text: "Mention the academic year and it's start & end dates"
      },
      {
        text: "For example,\n  Year : 2020\n  Start Date : 01 Sep 2020\n  End Date : 24 July 2021"
      },
      {
        text: "Mandatory fields are marked by *. Data must be entered for those fields"
      },
      {
        text: "Audit/Workflow : i) Every record creation/Modification needs one level of authorisation , For example If Staff1 creates the record , it should be authorised by another staff or admin."
      },
      {
        text: "ii)By default Admin has auto authorisation rights , so if any record is created/modified by admin , it does not need authorisation."
      },
      {
        text: "iii) All staff has by default Authorisation access, so that they can authorise any other staff action . However if institute wants to limit the authorisation access , it can be done by admin from User/Role screen , Either You can create the new role without authorisation access for the given feature and assign that role to user by user profile screen or remove the authorisation access for the existing role."
      },
      {
        text: "iv) Class/Attendance screen is exceptional for which auto authorisation is enabled by default for all staffs, however if it is required to be change , Institute can change from User/Role screen."
      },
      {
        text: "v) By default all staff users can access/view all other staffs/class entity records, if it is required to be restricted , you can limit the accessible entities in User/Profile screen."
      },
      {
        text: "vi) Parent users can access/see only their children records."
      },
    ]

  },
  {
    operation: 'Create',
    step: 2,
    InstructionHeading: 'Step3: Submit',
    instructionText: [
      {
        text: "Well done! You successfully completed the steps. Press Save."
      },
      {
        text: "If you get error after save , Please press previous to go back and revisit the steps to do required correction."
      },
    ]

  },

]




CreateTemplate.CreateMandatory = function (stateObject) {
  stateObject.state.errorField = []
  var mandatoryCheckError = false;
  switch (stateObject.state.currentStep) {
    case 1: 
     if (stateObject.state.dataModel.year == '' || stateObject.state.dataModel.year == null) {
        // Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-001', errorMessage: '', errorParam: ['Year'] }])
        mandatoryCheckError = true
        stateObject.state.errorField.push('field1')
        // return false;
      }
      if (stateObject.state.dataModel.startDate == '' || stateObject.state.dataModel.startDate == null) {
        // Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-001', errorMessage: '', errorParam: ['Start Date'] }])
        mandatoryCheckError = true
        stateObject.state.errorField.push('field2')
        // return false;
      }
      if (stateObject.state.dataModel.endDate == '' || stateObject.state.dataModel.endDate == null) {
        // Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-001', errorMessage: '', errorParam: ['End Date'] }])
        mandatoryCheckError = true
        stateObject.state.errorField.push('field3')
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
  }
  return true;
}


CreateTemplate.CreateConfig = function (stateObject) {
  return (<View>
    {stateObject.state.currentStep == 1 &&
      <View>
        <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[0]}</Subheading>
        <Divider style={AppStyles.marginTop_1}/>
        <AcademicYearConfigurationGeneral
          stateObject={stateObject}
        />
      </View>
    }
    {stateObject.state.currentStep == 2 &&
        <Remarks
          stateObject={stateObject}
        />
    }
     {stateObject.state.currentStep == 3 &&
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