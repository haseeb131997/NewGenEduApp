
import React from "react";
import { View } from 'react-native';
import TabScreen from '../../../components/TabScreen';
import { UiColor } from "../../../theme";
import AppStyles from "../../../AppStyles/AppStyles";
// import AuditDetail from '../../../components/AuditDetail';
import StudentLeaveManagementView from './StudentLeaveManagementView';
import StudentLeaveManagemenDetails from './StudentLeaveManagemenDetails';








class ViewDetailsTemplate { }

ViewDetailsTemplate.QueryConfig = function (stateObject) {
  return <View>
    <TabScreen
      tabHeading={['Basic Info','Leave Details']}
      stateObject={stateObject}
      stateValue={'selectedTabIndex'}
      selectedStateValue={stateObject.state.selectedTabIndex}
      barColor={UiColor.WHITE}
    />
    {stateObject.state.selectedTabIndex == 0 &&
     <View style={AppStyles.marginTop_2}>
        <StudentLeaveManagementView stateObject={stateObject} />
     </View>
    }
    {stateObject.state.selectedTabIndex == 1 &&
       <StudentLeaveManagemenDetails 
       stateObject={stateObject}
     />}

  </View>
}


module.exports = {
  functions: ViewDetailsTemplate
}