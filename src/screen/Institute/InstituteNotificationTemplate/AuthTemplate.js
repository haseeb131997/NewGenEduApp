
import React from "react";
import { View } from 'react-native';
import NotificationTemplateView from './NotificationTemplateView';
import NotificationTemplateContent from './NotificationTemplateContent';
import Exception from '../../../utils/Exception'
// import Submit from './../../../components/Submit';
import TabScreen from '../../../components/TabScreen';
import { UiColor } from "../../../theme";
import AppStyles from "../../../AppStyles/AppStyles";
import AuditDetail from '../../../components/AuditDetail';
import { Divider, Subheading, Title } from 'react-native-paper';
import Remarks from './../../../components/Remarks';










class AuthTemplate { }


AuthTemplate.AuthorisationConfig = function (stateObject) {
  return (<View>
    <View>
      <Subheading style={AppStyles.bold_600}>Basic Info</Subheading>
      <NotificationTemplateView
        stateObject={stateObject}
      />
    </View>
    <View>
      <Divider style={AppStyles.marginTop_2}/>
      <Subheading style={[AppStyles.bold_600,AppStyles.marginTop_1]}>{stateObject.state.createStepsHeading[1]}</Subheading>
      <NotificationTemplateContent
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
  functions: AuthTemplate
}