
import React from "react";
import { View } from 'react-native';
import Exception from '../../../utils/Exception'
import CustomTabScreen from '../../../components/CustomTabScreen';
import { UiColor } from "../../../theme";
import AppStyles from "../../../AppStyles/AppStyles";
import AuditDetail from '../../../components/AuditDetail';
import ClassExamScheduleView from './ClassExamScheduleView';
import ClassExamScheduleDetails from './ClassExamScheduleDetails';
import NotificationConfiguration from './../../../components/NotificationConfiguration';
import ClassExamScheduleSoftSkill from './ClassExamScheduleSoftSkill';
import { Subheading } from "react-native-paper";







class ViewTemplate { }

ViewTemplate.QueryConfig = function (stateObject) {
  return <View>
    {/* <TabScreen
      tabHeading={['Details','Exam Schedule','Notification','Soft Skill','Audit']}
      stateObject={stateObject}
      stateValue={'selectedTabIndex'}
      selectedStateValue={stateObject.state.selectedTabIndex}
      barColor={UiColor.WHITE}
    /> */}
     <CustomTabScreen
      tabHeading={['Basic Info', 'Exam Schedule']}
      otherTabHeading={['Notification', 'Soft Skill', 'Audit']}
      stateObject={stateObject}
      stateValue={'selectedTabIndex'}
      selectedStateValue={stateObject.state.selectedTabIndex}
      barColor={UiColor.WHITE}
    />

    {stateObject.state.selectedTabIndex == 0 &&
     <View style={AppStyles.marginTop_2}>
        <ClassExamScheduleView stateObject={stateObject} />
     </View>
    }
    {stateObject.state.selectedTabIndex == 1 &&
       <ClassExamScheduleDetails 
       stateObject={stateObject}
     />}
      {stateObject.state.selectedTabIndex == 2 &&
       <NotificationConfiguration 
       stateObject={stateObject}
     />}
     {stateObject.state.selectedTabIndex == 3 &&
       <ClassExamScheduleSoftSkill 
       stateObject={stateObject}
     />}
    {stateObject.state.selectedTabIndex == 4 &&

       <View>
         <Subheading style={[AppStyles.bold_600]}>Audit</Subheading>
         <AuditDetail
       stateObject={stateObject}
     /></View>
     }

  </View>
}


module.exports = {
  functions: ViewTemplate
}