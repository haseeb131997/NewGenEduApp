

import React from "react";
import { View, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import AcademicYearConfigurationGeneral from './AcademicYearConfigurationGeneral';
import GeneralUtils from "../../../utils/GeneralUtils";
import AppStyles from "../../../AppStyles/AppStyles";
import Exception from '../../../utils/Exception'
import Remarks from './../../../components/Remarks';
import { Caption, Divider, Subheading, Title } from 'react-native-paper';
import { w, h } from "../../../utils/Dimensions";










class EditTemplate { }

EditTemplate.InstructionList = [
  {
    operation: 'Modification',
    step: 1,
    InstructionHeading: 'Step2: Search record',
    instructionText: [
      {
        text: "Select year of the following value, to pick the record to be modified"
      },
    ]

  },
  {
    operation: 'Modification',
    step: 2,
    InstructionHeading: 'Step3: Choose record',
    instructionText: [
      {
        text: "Select or Double click the record to modify its details"
      },
    ]
  },
  {
    operation: 'Modification',
    step: 3,
    InstructionHeading: 'Step4: Modify required Details',
    instructionText: [
      {
        text: "Academic Year Configuration: Here the Institute can assign a start & end date for the given academic year. The start & end dates determined here applies to all the classes under the current institute. If a class follows different start and end dates, then the academic year can be configured for that class in Class->Student Register"
      },

      {
        text: "Switch between the tabs (general & audit) and modify the desired data"
      },
      {
        text: "Under the audit tab the following can be seen:"
      },
      {
        text: "Maker - who created the record"
      },
      {
        text: "Checker - who authorized or verified the record"
      },
      {
        text: "Version - current version number of the record"
      },
      {
        text: "Current status – Open or Deleted"
      },
      {
        text: "Each modification creates a new version in the system. You can see only the latest version in the application. If you want old version, you have to raise the request to support@newgeneducationapp.com"
      },
      {
        text: "Mandatory Fields are marked by * , Value should be entered for these fields"
      },
      {
        text: "Audit/Workflow : i) Every record creation/Modification needs one level of authorisation , For example If Staff1 creates the record , it should be authorised by another staff or admin ."
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
    operation: 'Modification',
    step: 4,
    InstructionHeading: 'Step5: Submit',
    instructionText: [
      {
        text: "Well done! You successfully completed the steps. Press Save."
      },
      {
        text: "If you get error  after save , Please press previous to go back and revisit the steps to do required correction."
      },
    ]

  },

]

EditTemplate.ModificationMandatory = function (stateObject) {
  stateObject.state.errorField = []
  var mandatoryCheckError = false;
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
  return true;
}


EditTemplate.ModificationConfig = function (stateObject) {
  return (<View>
  <View>
      <Subheading style={AppStyles.bold_600}>Details</Subheading>
      {/* <Divider style={AppStyles.marginTop_1} /> */}
        <AcademicYearConfigurationGeneral
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