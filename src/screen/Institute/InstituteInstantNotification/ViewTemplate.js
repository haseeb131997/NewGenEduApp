
import React from "react";
import { View } from 'react-native';
import TabScreen from '../../../components/TabScreen';
import { UiColor } from "../../../theme";
import AppStyles from "../../../AppStyles/AppStyles";
import AuditDetail from '../../../components/AuditDetail';
import InstantNotificationView from './InstantNotificationView';
import { Divider, Subheading } from "react-native-paper";
import NotificationTemplateContent from './NotificationTemplateContent';






class ViewTemplate { }

ViewTemplate.QueryConfig = function (stateObject) {
  return <View>
    <TabScreen
      tabHeading={['Basic Info','Message','Audit']}
      stateObject={stateObject}
      stateValue={'selectedTabIndex'}
      selectedStateValue={stateObject.state.selectedTabIndex}
      barColor={UiColor.WHITE}
    />

    {stateObject.state.selectedTabIndex == 0 &&
     <View style={AppStyles.marginTop_2}>
        <InstantNotificationView stateObject={stateObject} />
     </View>
    }
   {stateObject.state.selectedTabIndex == 1 &&
       <View>
         <Subheading style={[AppStyles.bold_600]}>Message Details</Subheading>
         
         <NotificationTemplateContent
        stateObject={stateObject}
         />
         </View>
     }
    {stateObject.state.selectedTabIndex == 2 &&
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