
import React from "react";
import { View } from 'react-native';
import CustomTabScreen from '../../../components/CustomTabScreen';
import { UiColor } from "../../../theme";
import AppStyles from "../../../AppStyles/AppStyles";
import AuditDetail from '../../../components/AuditDetail';
import ExamAssessmentGeneralView from './ExamAssessmentGeneralView';
import TeacherLessonPlannerClassDetail from './TeacherLessonPlannerClassDetail';
import NotificationConfiguration from './../../../components/NotificationConfiguration';
import { Divider, Subheading } from "react-native-paper";







class ViewTemplate { }

ViewTemplate.QueryConfig = function (stateObject) {
  return <View>
  
  <Subheading style={AppStyles.bold_600}>{stateObject.state.createStepsHeading[1]}</Subheading>
   
       <TeacherLessonPlannerClassDetail 
       stateObject={stateObject}
       />
 

  </View>
}


module.exports = {
  functions: ViewTemplate
}