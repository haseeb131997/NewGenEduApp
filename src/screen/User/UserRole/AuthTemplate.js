
import React from "react";
import { View } from 'react-native';
import UserRoleView from './UserRoleView';
import UserRoleContent from './UserRoleContent';
import AppStyles from "../../../AppStyles/AppStyles";
import { Divider, Subheading, Title } from 'react-native-paper';
import Remarks from './../../../components/Remarks';










class AuthTemplate {}


AuthTemplate.AuthorisationConfig = function (stateObject) {
  return (<View>
       <View>
       <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[0]}</Subheading>
      {/* <Divider style={AppStyles.marginTop_1} /> */}
        <UserRoleView
          stateObject={stateObject}
        />
    </View>
    {/* <Divider style={AppStyles.marginTop_3} /> */}
    <View style={AppStyles.marginTop_2}>
      <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[1]}</Subheading>
      <UserRoleContent
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