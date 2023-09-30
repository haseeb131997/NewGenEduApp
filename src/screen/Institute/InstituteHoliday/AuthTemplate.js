
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
import { Divider, Subheading, Title } from 'react-native-paper';
import Remarks from './../../../components/Remarks';










class AuthTemplate {}

AuthTemplate.AuthorisationConfig = function (stateObject) {
  return (<View>
       <View>
      <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[0]}</Subheading>
      {/* <Divider style={AppStyles.marginTop_1} /> */}
        <InstituteHolidayView
          stateObject={stateObject}
        />
    </View>
    <Divider style={AppStyles.marginTop_3} />
    <View style={AppStyles.marginTop_2}>
      <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[1]}</Subheading>
      {/* <Divider style={AppStyles.marginTop_1} /> */}
        <InstituteHolidayCalendar
          stateObject={stateObject}
        />
    </View>
    <Divider style={AppStyles.marginTop_3} />
    <View style={AppStyles.marginTop_2}>
      <Remarks
        stateObject={stateObject}
      />
    </View>
  </View>)

}




module.exports = {
    functions:AuthTemplate
}