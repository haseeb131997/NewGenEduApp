
import React from "react";
import { View } from 'react-native';
import Exception from '../../../utils/Exception'
import TabScreen from '../../../components/TabScreen';
import { UiColor } from "../../../theme";
import AppStyles from "../../../AppStyles/AppStyles";
import AuditDetail from '../../../components/AuditDetail';
import InstituteGroupView from './InstituteGroupView';
import InstituteGroupDetails from './InstituteGroupDetails';








class ViewTemplate { }

ViewTemplate.QueryConfig = function (stateObject) {
  return <View>
    <TabScreen
      tabHeading={['Target Students/Classes','Audit']}
      stateObject={stateObject}
      stateValue={'selectedTabIndex'}
      selectedStateValue={stateObject.state.selectedTabIndex}
      barColor={UiColor.WHITE}
    />

    {stateObject.state.selectedTabIndex == 0 &&
       <InstituteGroupDetails 
       stateObject={stateObject}
     />}
    {stateObject.state.selectedTabIndex == 1 &&
       <AuditDetail
       stateObject={stateObject}
     />}

  </View>
}


module.exports = {
  functions: ViewTemplate
}