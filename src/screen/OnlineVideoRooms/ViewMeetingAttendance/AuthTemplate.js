
import React from "react";
import { View } from 'react-native';
import AcademicYearConfigurationView from './MeetingAttendance';
import Exception from '../../../utils/Exception'
// import Submit from './../../../components/Submit';
import TabScreen from '../../../components/TabScreen';
import { UiColor } from "../../../theme";
import AppStyles from "../../../AppStyles/AppStyles";
import AuditDetail from '../../../components/AuditDetail';
import { Divider, Subheading, Title } from 'react-native-paper';
import Remarks from './../../../components/Remarks';










class AuthTemplate {}


AuthTemplate.AuthorisationConfig = function (stateObject) {
  return (<View>
       <View>
      <Subheading style={AppStyles.bold_600}>Details</Subheading>
      {/* <Divider style={AppStyles.marginTop_1} /> */}
        <AcademicYearConfigurationView
          stateObject={stateObject}
        />
    </View>
    <View style={AppStyles.marginTop_4}>
      <Remarks
        stateObject={stateObject}
      />
    </View>
  </View>)

}




module.exports = {
    functions:AuthTemplate
}