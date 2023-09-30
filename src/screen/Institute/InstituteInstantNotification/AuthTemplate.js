
import React from "react";
import { View } from "react-native";
import AppStyles from "../../../AppStyles/AppStyles";
import InstantNotificationView from './InstantNotificationView';
import { Divider,Subheading} from 'react-native-paper';
import Remarks from './../../../components/Remarks';
import NotificationTemplateContent from './NotificationTemplateContent';















class AuthTemplate { }

AuthTemplate.AuthorisationConfig = function (stateObject) {


  return (<View>

 


  <View>
  <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[0]}</Subheading>
        <InstantNotificationView
          stateObject={stateObject}
        />
    </View>

    <Divider style={AppStyles.marginTop_3} />
    <View>
    <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[1]}</Subheading>
      <NotificationTemplateContent
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
  functions: AuthTemplate
}