
import React from "react";
import { View, Text } from "react-native";
import AppStyles from "../../../AppStyles/AppStyles";
import AuditDetail from '../../../components/AuditDetail';
import InstituteGroupView from './InstituteGroupView';
import InstituteGroupDetails from './InstituteGroupDetails';
import { UiColor } from "../../../theme";
import { Divider, Subheading, Title } from 'react-native-paper';
import Remarks from './../../../components/Remarks';














class AuthTemplate {}

AuthTemplate.AuthorisationConfig = function (stateObject) {
  return (<View>
    <View>
   <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[0]}</Subheading>
   {/* <Divider style={AppStyles.marginTop_1} /> */}
     <InstituteGroupView
       stateObject={stateObject}
     />
 </View>
 <Divider style={AppStyles.marginTop_3} />
    <View style={AppStyles.marginTop_2}>
   <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[1]}</Subheading>
   {/* <Divider style={AppStyles.marginTop_1} /> */}
     <InstituteGroupDetails
       stateObject={stateObject}
     />
 </View>
 {/* <Divider style={AppStyles.marginTop_3} /> */}
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