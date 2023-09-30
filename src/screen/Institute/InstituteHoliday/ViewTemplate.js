
import React from "react";
import { View } from 'react-native';
import InstituteHolidayView from './InstituteHolidayView';
import InstituteHolidayCalendar from './InstituteHolidayCalendar';

import Exception from '../../../utils/Exception'
// import Submit from './../../../components/Submit';
import TabScreen from '../../../components/TabScreen';
import { UiColor } from "../../../theme";
import AppStyles from "../../../AppStyles/AppStyles";
import AuditDetail from '../../../components/AuditDetail';








class ViewTemplate { }

ViewTemplate.QueryConfig = function (stateObject) {
  return  (stateObject.state.userType == "A" || stateObject.state.userType == "O" || stateObject.state.userType == "T") ? <View>
    <TabScreen
      tabHeading={['Calendar','Audit']}
      stateObject={stateObject}
      stateValue={'selectedTabIndex'}
      selectedStateValue={stateObject.state.selectedTabIndex}
      barColor={UiColor.WHITE}

    />
    {stateObject.state.selectedTabIndex == 0 &&
     <View>
        <InstituteHolidayView stateObject={stateObject} />
        <View style={AppStyles.marginTop_2}>
        <InstituteHolidayCalendar stateObject={stateObject} />
        </View>
     </View>
    }
    {stateObject.state.selectedTabIndex == 1 &&
       <AuditDetail
       stateObject={stateObject}
     />}
  </View> : <View>

        <InstituteHolidayView stateObject={stateObject} />
        <View style={AppStyles.marginTop_2}>
        <InstituteHolidayCalendar stateObject={stateObject} />
        </View> 
  </View>

}


module.exports = {
  functions: ViewTemplate
}