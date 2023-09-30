
import React from "react";
import { View } from 'react-native';
import AppStyles from "../../../AppStyles/AppStyles";
import StudentLessonPlannerPlanDetail from './StudentLessonPlannerPlanDetail';
import { Divider, Subheading } from "react-native-paper";







class ViewDetailsTemplate { }

ViewDetailsTemplate.QueryConfig = function (stateObject) {
  return <View>
  
  <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[1]}</Subheading>
   
       <StudentLessonPlannerPlanDetail 
       stateObject={stateObject}
       />
 

  </View>
}


module.exports = {
  functions: ViewDetailsTemplate
}