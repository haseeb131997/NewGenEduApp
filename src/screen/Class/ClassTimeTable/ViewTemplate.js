
import React from "react";
import { View } from 'react-native';
import ClassTimeTableView from './ClassTimeTableView';
import Exception from '../../../utils/Exception'
// import Submit from './../../../components/Submit';
import TabScreen from '../../../components/TabScreen';
import { UiColor } from "../../../theme";
import AppStyles from "../../../AppStyles/AppStyles";
import AuditDetail from '../../../components/AuditDetail';








class ViewTemplate { }

ViewTemplate.QueryConfig = function (stateObject) {
  return <View>
    <TabScreen
      tabHeading={['Timetable', 'Audit']}
      stateObject={stateObject}
      stateValue={'selectedTabIndex'}
      selectedStateValue={stateObject.state.selectedTabIndex}
      barColor={UiColor.WHITE}

    />
    {stateObject.state.selectedTabIndex == 0 &&
     <View style={AppStyles.marginTop_2}>
        <ClassTimeTableView stateObject={stateObject} />
     </View>
    }
    {stateObject.state.selectedTabIndex == 1 &&
       <AuditDetail
       stateObject={stateObject}
     />}
  </View>

}


module.exports = {
  functions: ViewTemplate
}