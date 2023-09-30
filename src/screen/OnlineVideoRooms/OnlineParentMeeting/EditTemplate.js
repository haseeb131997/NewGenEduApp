

import React from "react";
import { View,  } from "react-native";
import OnlineParentMeetingGeneral from './OnlineParentMeetingGeneral';
import OnlineParentMeetingTiming from './OnlineParentMeetingTiming';
import AppStyles from "../../../AppStyles/AppStyles";
import Exception from '../../../utils/Exception'
import { Divider, Subheading, } from 'react-native-paper';
import Remarks from './../../../components/Remarks';
import NotificationConfiguration from './../../../components/NotificationConfiguration';













class EditTemplate { }



EditTemplate.ModificationMandatory = function (stateObject) {
  stateObject.state.errorField = []
  var mandatoryCheckError = false;

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
      stateObject.state.errorField.push('student1')
    }
   }

   if(stateObject.state.dataModel.type == 'G' ){
    if (stateObject.state.dataModel.class == '' || stateObject.state.dataModel.class == null) {
      mandatoryCheckError = true
      stateObject.state.errorField.push('group1')
    }
   }
  

  if (stateObject.state.dataModel.date == '' || stateObject.state.dataModel.date == null) {
    mandatoryCheckError = true
    stateObject.state.errorField.push('field4')
  }
  if (stateObject.state.dataModel.startTimeHour == '' || stateObject.state.dataModel.startTimeHour == null) {
    mandatoryCheckError = true
    stateObject.state.errorField.push('field5')
  }
  /*if (stateObject.state.dataModel.duration == '' || stateObject.state.dataModel.duration == null) {
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


  return true;
}


EditTemplate.ModificationConfig = function (stateObject) {
  return (<View>
    {/* <TabScreen
      tabHeading={['Basic Info', 'Content']}
      stateObject={stateObject}
      stateValue={'selectedTabIndex'}
      selectedStateValue={stateObject.state.selectedTabIndex}
      barColor={UiColor.WHITE}
    />
    <Divider /> */}

    <View>
    <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[0]}</Subheading>
      <OnlineParentMeetingGeneral
        stateObject={stateObject}
      />
    </View>


    <Divider style={AppStyles.marginTop_3} />
    <View style={AppStyles.marginTop_2}>
      <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[1]}</Subheading>
      <OnlineParentMeetingTiming
        stateObject={stateObject}
      />
    </View>

    <Divider style={AppStyles.marginTop_3} />
          <View style={AppStyles.marginTop_2}>
            <NotificationConfiguration
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