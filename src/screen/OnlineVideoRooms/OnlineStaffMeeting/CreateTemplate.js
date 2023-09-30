
import React from "react";
import { View, Text } from "react-native";
import OnlineStaffMeetingGeneral from './OnlineStaffMeetingGeneral';
import OnlineStaffMeetingTiming from './OnlineStaffMeetingTiming';
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
      if (stateObject.state.dataModel.heading == '' || stateObject.state.dataModel.heading == null) {
        mandatoryCheckError = true
        stateObject.state.errorField.push('field3')
      }


       if(stateObject.state.dataModel.type == '1' ){
        if (stateObject.state.dataModel.studentName == '' || stateObject.state.dataModel.studentName == null) {
          mandatoryCheckError = true
          stateObject.state.errorField.push('staff1')
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
      case 2 :
        if (stateObject.state.dataModel.date == '' || stateObject.state.dataModel.date == null) {
          mandatoryCheckError = true
          stateObject.state.errorField.push('field4')
        }
        if (stateObject.state.dataModel.startTimeHour == '' || stateObject.state.dataModel.startTimeHour == null) {
          mandatoryCheckError = true
          stateObject.state.errorField.push('field5')
        }
       /* if (stateObject.state.dataModel.duration == '' || stateObject.state.dataModel.duration == null) {
          mandatoryCheckError = true
          stateObject.state.errorField.push('field6')
        }*/
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


  }
  return true;  
}





CreateTemplate.CreateConfig = function (stateObject) {
  return(<View>
    {stateObject.state.currentStep == 1 &&
      <View>
        <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[0]}</Subheading>
        {/* <Divider style={AppStyles.marginTop_1}/> */}
        <OnlineStaffMeetingGeneral
          stateObject={stateObject}
        />
      </View>
    }
    {stateObject.state.currentStep == 2 &&
    <View>
        {<Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[1]}</Subheading> }
        <OnlineStaffMeetingTiming
          stateObject={stateObject}
        />
     </View>   
    }
     {stateObject.state.currentStep == 3 &&
      <View>
        <NotificationConfiguration
          stateObject={stateObject}
        />
      </View>
    }
  
     {stateObject.state.currentStep == 4 &&
        <Remarks
          stateObject={stateObject}
        />
    }
     {stateObject.state.currentStep == 5 &&
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