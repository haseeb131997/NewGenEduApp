
import React from "react";
import { View } from 'react-native';
import Exception from '../../../utils/Exception'
import TabScreen from '../../../components/TabScreen';
import { UiColor } from "../../../theme";
import AppStyles from "../../../AppStyles/AppStyles";
import AuditDetail from '../../../components/AuditDetail';
import InstituteClassConfigView from './InstituteClassConfigView';
import InstituteClassConfigPeriod from './InstituteClassConfigPeriod';








class ViewTemplate { }

ViewTemplate.QueryConfig = function (stateObject) {
  return <View>
    <TabScreen
      tabHeading={['Basic Info','Period','Audit']}
      stateObject={stateObject}
      stateValue={'selectedTabIndex'}
      selectedStateValue={stateObject.state.selectedTabIndex}
      barColor={UiColor.WHITE}
    />

    {stateObject.state.selectedTabIndex == 0 &&
     <View style={AppStyles.marginTop_2}>
        <InstituteClassConfigView stateObject={stateObject} />
     </View>
    }
    {stateObject.state.selectedTabIndex == 1 &&
       <InstituteClassConfigPeriod 
       stateObject={stateObject}
     />}
    {stateObject.state.selectedTabIndex == 2 &&
       <AuditDetail
       stateObject={stateObject}
     />}

  </View>
}


module.exports = {
  functions: ViewTemplate
}