
import React from "react";
import { View, Text } from "react-native";
import OnlineVideoClassRoomGeneral from './OnlineVideoClassRoomGeneral';
import OnlineVideoClassRoomTiming from './OnlineVideoClassRoomTiming';
import Exception from '../../../utils/Exception'
import AppStyles from "../../../AppStyles/AppStyles";
import Remarks from './../../../components/Remarks';
import CreateCompleted from './../../../components/CreateCompleted';
import OnlineVideoClassRoomAttendance from './OnlineVideoClassRoomAttendance';
import NotificationConfiguration from './../../../components/NotificationConfiguration';

import { Divider, Subheading, Title } from 'react-native-paper';




class CreateTemplate { }





CreateTemplate.CreateMandatory = function (stateObject) {
  stateObject.state.errorField = []
  var mandatoryCheckError = false;

  switch (stateObject.state.currentStep) {
    case 1:
      if (stateObject.state.dataModel.classroomID == '' || stateObject.state.dataModel.classroomID == null) {
        mandatoryCheckError = true
        stateObject.state.errorField.push('field1')
      }
      if (stateObject.state.dataModel.type == '' || stateObject.state.dataModel.type == null) {
        mandatoryCheckError = true
        stateObject.state.errorField.push('field2')
      }
      if (stateObject.state.dataModel.subject == '' || stateObject.state.dataModel.subject == null) {
        mandatoryCheckError = true
        stateObject.state.errorField.push('field3')
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
      if (stateObject.state.dataModel.date == '' || stateObject.state.dataModel.date == null) {
        mandatoryCheckError = true
        stateObject.state.errorField.push('field4')
      }
      if (stateObject.state.dataModel.startTimeHour == '' || stateObject.state.dataModel.startTimeHour == null) {
        mandatoryCheckError = true
        stateObject.state.errorField.push('field5')
      }
      if (stateObject.state.dataModel.endTimeHour == '' || stateObject.state.dataModel.endTimeHour == null) { //N0U-109
        mandatoryCheckError = true
        stateObject.state.errorField.push('field6')
      }

      if (stateObject.state.dataModel.zoomTeamsLink == '' || stateObject.state.dataModel.zoomTeamsLink == null) {
        mandatoryCheckError = true
        stateObject.state.errorField.push('field7')
      }


      if (mandatoryCheckError) {
        Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-080', errorMessage: '', errorParam: '' }])
        return false
      }
      else {
        return true
      }
      break

    case 3:
      if (stateObject.state.dataModel.type == "1") {
        if (stateObject.state.dataModel.studentName == '' || stateObject.state.dataModel.studentName == null) {
          mandatoryCheckError = true
          stateObject.state.errorField.push('field8')
        }
      }
      else {
        if (stateObject.state.dataModel.class == '' || stateObject.state.dataModel.class == null) {
          mandatoryCheckError = true
          stateObject.state.errorField.push('field9')
        }

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
        <OnlineVideoClassRoomGeneral
          stateObject={stateObject}
        />
      </View>
    }
    {stateObject.state.currentStep == 2 &&
      <View>
        {<Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[1]}</Subheading>}
        <OnlineVideoClassRoomTiming
          stateObject={stateObject}
        />
      </View>
    }
    {stateObject.state.currentStep == 3 &&
      <View>
         {<Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[2]}</Subheading>}
       
        <OnlineVideoClassRoomAttendance
        stateObject={stateObject}
      />
      </View>
    }
    {stateObject.state.currentStep == 4 &&
      <View>
          {/*<Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[3]}</Subheading>*/}
       
        <NotificationConfiguration
          stateObject={stateObject}
        />
      </View>
    }
    {stateObject.state.currentStep == 5 &&
     <View>
    {/*<Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[4]}</Subheading>*/}
       
      <Remarks
        stateObject={stateObject}
      />
      </View>
    }
    
    {stateObject.state.currentStep == 6 &&
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