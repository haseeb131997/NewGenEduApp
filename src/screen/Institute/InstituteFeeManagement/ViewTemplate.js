
import React from "react";
import { View } from 'react-native';
import CustomTabScreen from '../../../components/CustomTabScreen';
import { UiColor } from "../../../theme";
import AppStyles from "../../../AppStyles/AppStyles";
import AuditDetail from '../../../components/AuditDetail';
import InstituteFeeManagementView from './InstituteFeeManagementView';
import InstituteFeeManagementBreakup from './InstituteFeeManagementBreakup';
import NotificationConfiguration from './../../../components/NotificationConfiguration';
import { Divider, Subheading } from "react-native-paper";







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
      tabHeading={['Basic Info', 'Breakup Details']}
      otherTabHeading={['Notification','Audit']}
      stateObject={stateObject}
      stateValue={'selectedTabIndex'}
      selectedStateValue={stateObject.state.selectedTabIndex}
      barColor={UiColor.WHITE}
    />
    {/* <Divider/> */}

    {stateObject.state.selectedTabIndex == 0 &&
     <View style={AppStyles.marginTop_2}>
        <InstituteFeeManagementView stateObject={stateObject} />
     </View>
    }
    {stateObject.state.selectedTabIndex == 1 &&
       <InstituteFeeManagementBreakup 
       stateObject={stateObject}
     />}
      {stateObject.state.selectedTabIndex == 2 &&
       <NotificationConfiguration 
       stateObject={stateObject}
     />}
    {stateObject.state.selectedTabIndex == 3 &&

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