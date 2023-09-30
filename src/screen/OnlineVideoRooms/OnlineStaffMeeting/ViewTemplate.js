
import React from "react";
import { View } from 'react-native';
import CustomTabScreen from '../../../components/CustomTabScreen';
import { UiColor } from "../../../theme";
import AppStyles from "../../../AppStyles/AppStyles";
import AuditDetail from '../../../components/AuditDetail';
import OnlineStaffMeetingView from './OnlineStaffMeetingView';
import OnlineStaffMeetingTiming from './OnlineStaffMeetingTiming';
//import OnlineVideoClassRoomAttendance from './OnlineVideoClassRoomAttendance';
//import { Divider, Subheading } from "react-native-paper";
import NotificationConfiguration from './../../../components/NotificationConfiguration';







class ViewTemplate { }

ViewTemplate.QueryConfig = function (stateObject) {
  return <View>
    {/* <TabScreen
      tabHeading={['Basic Info','Schedule','Audit']}
      stateObject={stateObject}
      stateValue={'selectedTabIndex'}
      selectedStateValue={stateObject.state.selectedTabIndex}
      barColor={UiColor.WHITE}
    /> */}
     <CustomTabScreen
      tabHeading={['Basic Info', 'Schedule']}
      otherTabHeading={['Notification','Audit']}
      stateObject={stateObject}
      stateValue={'selectedTabIndex'}
      selectedStateValue={stateObject.state.selectedTabIndex}
      barColor={UiColor.WHITE}
    />
    {/* <Divider/> */}

    {stateObject.state.selectedTabIndex == 0 &&
     <View style={AppStyles.marginTop_2}>
        <OnlineStaffMeetingView stateObject={stateObject} />
     </View>
    }
    {stateObject.state.selectedTabIndex == 1 &&
       <OnlineStaffMeetingTiming 
       stateObject={stateObject}
     />}
      {stateObject.state.selectedTabIndex == 2 &&
      <NotificationConfiguration
        stateObject={stateObject}
      />}
    {stateObject.state.selectedTabIndex == 3 &&
       <View>
         <AuditDetail
       stateObject={stateObject}
     /></View>
     }

  </View>
}


module.exports = {
  functions: ViewTemplate
}