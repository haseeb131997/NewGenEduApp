
import React from "react";
import { View } from "react-native";
import TabScreen from '../../../components/TabScreen';
import AppStyles from "../../../AppStyles/AppStyles";
import StudentLessonPlannerPlanDetail from './StudentLessonPlannerPlanDetail';
















class AuthTemplate { }

AuthTemplate.AuthorisationConfig = function (stateObject) {


  return (<View>

<Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[1]}</Subheading>
   <StudentLessonPlannerPlanDetail 
   stateObject={stateObject}
   />


  </View>)


}




module.exports = {
  functions: AuthTemplate
}