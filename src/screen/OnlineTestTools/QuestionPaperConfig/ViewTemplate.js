
import React from "react";
import { View } from 'react-native';
import CustomTabScreen from '../../../components/CustomTabScreen';
import { UiColor } from "../../../theme";
import AppStyles from "../../../AppStyles/AppStyles";
import AuditDetail from '../../../components/AuditDetail';
import QuestionPaperConfigView from './QuestionPaperConfigView';
import QuestionPaperConfigInstructions from './QuestionPaperConfigInstructions';
import QuestionPaperConfigSection from './QuestionPaperConfigSection';
import { Divider, Subheading } from "react-native-paper";

import NotificationConfiguration from './../../../components/NotificationConfiguration';






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
      tabHeading={['Basic Info', 'Schedule']}
      otherTabHeading={['Participant','Notification','Audit']}
      stateObject={stateObject}
      stateValue={'selectedTabIndex'}
      selectedStateValue={stateObject.state.selectedTabIndex}
      barColor={UiColor.WHITE}
    />
    {/* <Divider/> */}

    {stateObject.state.selectedTabIndex == 0 &&
     <View style={AppStyles.marginTop_2}>
        <QuestionPaperConfigView stateObject={stateObject} />
     </View>
    }
    {stateObject.state.selectedTabIndex == 1 &&
       <QuestionPaperConfigInstructions 
       stateObject={stateObject}
     />}
      {stateObject.state.selectedTabIndex == 2 &&
       <QuestionPaperConfigSection 
       stateObject={stateObject}
     />}

     {stateObject.state.selectedTabIndex == 3 &&
      <NotificationConfiguration
        stateObject={stateObject}
      />}
    {stateObject.state.selectedTabIndex == 4 &&
       <View>
         <Subheading style={[AppStyles.bold_600]}>Audit Details</Subheading>
         <AuditDetail
       stateObject={stateObject}
     /></View>
     }

  </View>
}


module.exports = {
  functions: ViewTemplate
}