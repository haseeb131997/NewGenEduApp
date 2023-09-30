
import React from "react";
import { View } from 'react-native';
import MeetingAttendance from './MeetingAttendance';
import Exception from '../../../utils/Exception'
// import Submit from './../../../components/Submit';
import TabScreen from '../../../components/TabScreen';
import { UiColor } from "../../../theme";
import AppStyles from "../../../AppStyles/AppStyles";
import AuditDetail from '../../../components/AuditDetail';








class ViewTemplate { }

ViewTemplate.QueryConfig = function (stateObject) {
  return <View>
    
     <View style={AppStyles.marginTop_2}>
        <MeetingAttendance stateObject={stateObject} />
     </View>
    
    
  </View>

}


module.exports = {
  functions: ViewTemplate
}