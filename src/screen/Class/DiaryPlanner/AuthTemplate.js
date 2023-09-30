
import React from "react";
import { View } from "react-native";
import AppStyles from "../../../AppStyles/AppStyles";
import DiaryPlannerDetail from './DiaryPlannerDetail';
import { Divider, Subheading } from "react-native-paper";















class AuthTemplate { }

AuthTemplate.AuthorisationConfig = function (stateObject) {


  return (<View>
<Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[1]}</Subheading>
   <DiaryPlannerDetail 
   stateObject={stateObject}
   />


  </View>)


}




module.exports = {
  functions: AuthTemplate
}