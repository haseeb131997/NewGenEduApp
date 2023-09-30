
import React from "react";
import { View } from 'react-native';
import TabScreen from '../../../components/TabScreen';
import { UiColor } from "../../../theme";
import AppStyles from "../../../AppStyles/AppStyles";
import AuditDetail from '../../../components/AuditDetail';
import TeacherNotesView from './TeacherNotesView';
import TeacherNotesDetails from './TeacherNotesDetails';
import NotificationConfiguration from './../../../components/NotificationConfiguration';
import { Divider, Subheading } from "react-native-paper";







class ViewTemplate { }

ViewTemplate.QueryConfig = function (stateObject) {
  return <View>
    <TabScreen
      tabHeading={['Basic Info','Notes Details','Audit']}
      stateObject={stateObject}
      stateValue={'selectedTabIndex'}
      selectedStateValue={stateObject.state.selectedTabIndex}
      barColor={UiColor.WHITE}
    />
     {/* <CustomTabScreen
      tabHeading={['Basic Info', 'Leave Details']}
      otherTabHeading={['Audit']}
      stateObject={stateObject}
      stateValue={'selectedTabIndex'}
      selectedStateValue={stateObject.state.selectedTabIndex}
      barColor={UiColor.WHITE}
    /> */}
    {/* <Divider/> */}

    {stateObject.state.selectedTabIndex == 0 &&
     <View style={AppStyles.marginTop_2}>
        <TeacherNotesView stateObject={stateObject} />
     </View>
    }
    {stateObject.state.selectedTabIndex == 1 &&
       <TeacherNotesDetails 
       stateObject={stateObject}
     />}
    {stateObject.state.selectedTabIndex == 2 &&

       <View>
         {/* <Subheading style={[AppStyles.bold_600]}>Audit Details</Subheading> */}
         <AuditDetail
       stateObject={stateObject}
     /></View>
     }

  </View>
}


module.exports = {
  functions: ViewTemplate
}