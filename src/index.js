/*
 * * Â© Copyright 2017-2020 IBD Tecnologies Private Limited.
 * *                       3/506 Kannadhsan Street ,ShanmugaNagar,Porur
 * *                       Chennai - 600125.
 * *                       India
 * *
 * * This source is part of the General Framework and is copyrighted by
 * * IBD Technologies Private Limited.
 * *
 * * All rights reserved.  No part of this work may be reproduced, stored in a
 * * retrieval system, adopted or transmitted in any form or by any means,
 * * electronic, mechanical, photographic, graphic, optic recording or otherwise,
 * * translated in any language or computer language, without the prior written
 * * permission of IBD Technologies Private Limited.
 /**/
/**/
/**/




import React from "react";
import { YellowBox, Alert as rnalert, AppState } from "react-native";
import { Dimensions, Platform, BackHandler, ToastAndroid } from "react-native";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Splash from "./screen/Splash"
import Login from "./screen/Login";
import ForgotPassword from "./screen/ForgotPassword";
import Dashboard from "./screen/Dashboard";
import ChangeInstitute from "./screen/ChangeInstitute";
import TeacherDashboard from "./screen/TeacherDashboard";
import StudentDashboard from "./screen/StudentDashboard";

import ChangePassword from "./screen/ChangePassword";
import DrawerContent from "./screen/DrawerContent";

import TeacherProfileDetail from "./screen/Teacher/TeacherProfileDetail";
import TeacherProfile from "./screen/Teacher/TeacherProfile";
import TeacherLessonPlanner from "./screen/Teacher/TeacherLessonPlanner";
import TeacherLeaveManagement from "./screen/Teacher/TeacherLeaveManagement";
import TeacherEcircular from "./screen/Teacher/TeacherEcircular";
import TeacherNotes from "./screen/Teacher/TeacherNotes";
import TeacherTimeTable from "./screen/Teacher/TeacherTimeTable";

import UserProfileDetail from "./screen/User/UserProfileDetail";
import UserRole from "./screen/User/UserRole";
import UserProfile from "./screen/User/UserProfile";

import StudentProfileDetail from "./screen/Student/StudentProfileDetail";
import StudentProfile from "./screen/Student/StudentProfile";
import StudentLeaveManagement from "./screen/Student/StudentLeaveManagement";
import StudentEcircular from "./screen/Student/StudentEcircular";
import StudentTimeTable from "./screen/Student/StudentTimeTable";
import StudentAttendance from "./screen/Student/StudentAttendance";
import StudentVideoAssignment from "./screen/Student/StudentVideoAssignment";
import StudentCurricularActivity from "./screen/Student/StudentCurricularActivity";
import StudentFee from "./screen/Student/StudentFee";
import StudentExamSchedule from "./screen/Student/StudentExamSchedule";
import StudentProgressCard from "./screen/Student/StudentProgressCard";
import StudentSoftSkill from "./screen/Student/StudentSoftSkill";
import StudentStudyMaterial from "./screen/Student/StudentStudyMaterial";
import StudentNotification from "./screen/Student/StudentNotification";
import StudentLevelEcircular from "./screen/Student/StudentLevelEcircular";
import StudentPaymentReceipt from "./screen/Student/StudentPaymentReceipt";
import ParentLeaveManagement from "./screen/Student/ParentLeaveManagement";
import StudentNotes from "./screen/Student/StudentNotes";
import StudentLessonPlanner from "./screen/Student/StudentLessonPlanner";
import StudentAssignment from "./screen/Student/StudentAssignment";


import InstituteGeneralConfig from "./screen/Institute/InstituteGeneralConfig";
import InstituteSubjectConfig from "./screen/Institute/InstituteSubjectConfig";
import InstituteFeeConfig from "./screen/Institute/InstituteFeeConfig";
import InstituteOthersConfig from "./screen/Institute/InstituteOthersConfig";
import InstituteLogoConfig from "./screen/Institute/InstituteLogoConfig";
import InstituteYearConfiguration from "./screen/Institute/InstituteYearConfiguration";
import InstituteClassConfig from "./screen/Institute/InstituteClassConfig";
import InstituteHoliday from "./screen/Institute/InstituteHoliday";
import InstituteGroup from "./screen/Institute/InstituteGroup";
import InstituteFeeManagement from "./screen/Institute/InstituteFeeManagement";
import InstituteActivityEvent from "./screen/Institute/InstituteActivityEvent";
import InstituteAutoApproval from "./screen/Institute/InstituteAutoApproval";
import InstituteFeePayment from "./screen/Institute/InstituteFeePayment";
import InstituteNotificationTemplate from "./screen/Institute/InstituteNotificationTemplate";
import InstituteInstantNotification from "./screen/Institute/InstituteInstantNotification";

import ClassTimeTable from "./screen/Class/ClassTimeTable";
import ClassStudentRegister from "./screen/Class/ClassStudentRegister";
import ClassExamSchedule from "./screen/Class/ClassExamSchedule";
import ClassExamAssessment from "./screen/Class/ClassExamAssessment";
import ClassSoftSkillAssessment from "./screen/Class/ClassSoftSkillAssessment";
import StudyMaterial from "./screen/Class/StudyMaterial";
import VideoAssignment from "./screen/Class/VideoAssignment";
import ClassAttendance from "./screen/Class/ClassAttendance";
import ClassAssignment from "./screen/Class/ClassAssignment";
import ClassAssessment from "./screen/Class/ClassAssessment";
import ClassProgressCard from "./screen/Class/ClassProgressCard";
import ClassSoftSkill from "./screen/Class/ClassSoftSkill";
import ClassCurricularActivity from "./screen/Class/ClassCurricularActivity";
import DiaryPlanner from "./screen/Class/DiaryPlanner";

import OnlineVideoClassRoom from "./screen/OnlineVideoRooms/OnlineVideoClassRoom";
import OnlineStaffMeeting from "./screen/OnlineVideoRooms/OnlineStaffMeeting";
import OnlineParentMeeting from "./screen/OnlineVideoRooms/OnlineParentMeeting";
import ViewMeetingAttendance from "./screen/OnlineVideoRooms/ViewMeetingAttendance";

import QuestionPaperConfig from "./screen/OnlineTestTools/QuestionPaperConfig";

import StudentReport from "./screen/Report/StudentReport";
import TeacherReport from "./screen/Report/TeacherReport";
import ClassReport from "./screen/Report/ClassReport";
import InstituteReport from "./screen/Report/InstituteReport";
import TeacherSubstituteReport from "./screen/Report/TeacherSubstituteReport";
import StudentRegisterReport from "./screen/Report/StudentRegisterReport ";
import FeesReport from "./screen/Report/FeesReport";
import PaymentReport from "./screen/Report/PaymentReport";
import NotificationReport from "./screen/Report/NotificationReport";
import TeacherLessonPlannerReport from "./screen/Report/TeacherLessonPlannerReport";
import StudentLessonPlannerReport from "./screen/Report/StudentLessonPlannerReport";
import ClassLessonPlannerReport from "./screen/Report/ClassLessonPlannerReport";
import MarkRegisterReport from "./screen/Report/MarkRegisterReport";
import MonthlyAttendanceReport from "./screen/Report/MonthlyAttendanceReport";





import ErrorBoundary from './screen/ErrorBoundary';





const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();


// function AdminDrawerRoot() {
//   return (
//     <Drawer.Navigator
//     screenOptions={{
//       headerShown: false
//     }}
//     >
//       <Drawer.Screen 
//       name="Dashboard" 
//       component={Dashboard} 
//       options={{ title: 'Dashboard' }}
//       />

//     </Drawer.Navigator>
//   );
// }


class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <ErrorBoundary>
        <NavigationContainer>
          <Drawer.Navigator
            drawerContent={(props) => <DrawerContent {...props} />}
            screenOptions={{
              headerShown: false
            }}
          >
            <Drawer.Screen
              name="Splash"
              component={Splash}
              options={{ title: 'Splash' }}
            />
            <Drawer.Screen
              name="Login"
              component={Login}
              options={{ title: 'Login' }}
            />
            <Drawer.Screen
              name="ForgotPassword"
              component={ForgotPassword}
              options={{ title: 'ForgotPassword' }}
            />
            <Drawer.Screen
              name="Dashboard"
              component={Dashboard}
              options={{ title: 'Dashboard' }}
            />
            <Drawer.Screen
              name="TeacherDashboard"
              component={TeacherDashboard}
              options={{ title: 'TeacherDashboard' }}
            />
            <Drawer.Screen
              name="StudentDashboard"
              component={StudentDashboard}
              options={{ title: 'StudentDashboard' }}
            />
            <Drawer.Screen
              name="ChangeInstitute"
              component={ChangeInstitute}
              options={{ title: 'ChangeInstitute' }}
            />
            <Drawer.Screen
              name="ChangePassword"
              component={ChangePassword}
              options={{ title: 'ChangePassword' }}
            />

            <Drawer.Screen
              name="TeacherProfileDetail"
              component={TeacherProfileDetail}
              options={{ title: 'TeacherProfileDetail' }}
            />
            <Drawer.Screen
              name="TeacherProfile"
              component={TeacherProfile}
              options={{ title: 'TeacherProfile' }}
            />
            <Drawer.Screen
              name="TeacherLessonPlanner"
              component={TeacherLessonPlanner}
              options={{ title: 'TeacherLessonPlanner' }}
            />
            <Drawer.Screen
              name="TeacherLeaveManagement"
              component={TeacherLeaveManagement}
              options={{ title: 'TeacherLeaveManagement' }}
            />
            <Drawer.Screen
              name="TeacherEcircular"
              component={TeacherEcircular}
              options={{ title: 'TeacherEcircular' }}
            />
            <Drawer.Screen
              name="TeacherNotes"
              component={TeacherNotes}
              options={{ title: 'TeacherNotes' }}
            />
            <Drawer.Screen
              name="TeacherTimeTable"
              component={TeacherTimeTable}
              options={{ title: 'TeacherTimeTable' }}
            />
            <Drawer.Screen
              name="UserProfileDetail"
              component={UserProfileDetail}
              options={{ title: 'UserProfileDetail' }}
            />
            <Drawer.Screen
              name="UserRole"
              component={UserRole}
              options={{ title: 'UserRole' }}
            />
            <Drawer.Screen
              name="UserProfile"
              component={UserProfile}
              options={{ title: 'UserProfile' }}
            />
            <Drawer.Screen
              name="StudentProfileDetail"
              component={StudentProfileDetail}
              options={{ title: 'StudentProfileDetail' }}
            />
            <Drawer.Screen
              name="StudentProfile"
              component={StudentProfile}
              options={{ title: 'StudentProfile' }}
            />
            <Drawer.Screen
              name="StudentLeaveManagement"
              component={StudentLeaveManagement}
              options={{ title: 'StudentLeaveManagement' }}
            />
            <Drawer.Screen
              name="StudentEcircular"
              component={StudentEcircular}
              options={{ title: 'StudentEcircular' }}
            />
            <Drawer.Screen
              name="StudentTimeTable"
              component={StudentTimeTable}
              options={{ title: 'StudentTimeTable' }}
            />
            <Drawer.Screen
              name="StudentAttendance"
              component={StudentAttendance}
              options={{ title: 'StudentAttendance' }}
            />
            <Drawer.Screen
              name="StudentVideoAssignment"
              component={StudentVideoAssignment}
              options={{ title: 'StudentVideoAssignment' }}
            />
            <Drawer.Screen
              name="StudentCurricularActivity"
              component={StudentCurricularActivity}
              options={{ title: 'StudentCurricularActivity' }}
            />
            <Drawer.Screen
              name="StudentFee"
              component={StudentFee}
              options={{ title: 'StudentFee' }}
            />
            <Drawer.Screen
              name="StudentExamSchedule"
              component={StudentExamSchedule}
              options={{ title: 'StudentExamSchedule' }}
            />
            <Drawer.Screen
              name="StudentProgressCard"
              component={StudentProgressCard}
              options={{ title: 'StudentProgressCard' }}
            />
            <Drawer.Screen
              name="StudentSoftSkill"
              component={StudentSoftSkill}
              options={{ title: 'StudentSoftSkill' }}
            />
            <Drawer.Screen
              name="StudentStudyMaterial"
              component={StudentStudyMaterial}
              options={{ title: 'StudentStudyMaterial' }}
            />
            <Drawer.Screen
              name="StudentNotification"
              component={StudentNotification}
              options={{ title: 'StudentNotification' }}
            />
            <Drawer.Screen
              name="StudentLevelEcircular"
              component={StudentLevelEcircular}
              options={{ title: 'StudentLevelEcircular' }}
            />
            <Drawer.Screen
              name="StudentPaymentReceipt"
              component={StudentPaymentReceipt}
              options={{ title: 'StudentPaymentReceipt' }}
            />
            <Drawer.Screen
              name="ParentLeaveManagement"
              component={ParentLeaveManagement}
              options={{ title: 'ParentLeaveManagement' }}
            />
             <Drawer.Screen
              name="StudentNotes"
              component={StudentNotes}
              options={{ title: 'StudentNotes' }}
            />
            <Drawer.Screen
              name="StudentLessonPlanner"
              component={StudentLessonPlanner}
              options={{ title: 'StudentLessonPlanner' }}
            />
            <Drawer.Screen
              name="StudentAssignment"
              component={StudentAssignment}
              options={{ title: 'StudentAssignment' }}
            />
            <Drawer.Screen
              name="InstituteGeneralConfig"
              component={InstituteGeneralConfig}
              options={{ title: 'InstituteGeneralConfig' }}
            />
            <Drawer.Screen
              name="InstituteSubjectConfig"
              component={InstituteSubjectConfig}
              options={{ title: 'InstituteSubjectConfig' }}
            />
            <Drawer.Screen
              name="InstituteFeeConfig"
              component={InstituteFeeConfig}
              options={{ title: 'InstituteFeeConfig' }}
            />
            <Drawer.Screen
              name="InstituteOthersConfig"
              component={InstituteOthersConfig}
              options={{ title: 'InstituteOthersConfig' }}
            />
            <Drawer.Screen
              name="InstituteLogoConfig"
              component={InstituteLogoConfig}
              options={{ title: 'InstituteLogoConfig' }}
            />
            <Drawer.Screen
              name="InstituteYearConfiguration"
              component={InstituteYearConfiguration}
              options={{ title: 'InstituteYearConfiguration' }}
            />
            <Drawer.Screen
              name="InstituteClassConfig"
              component={InstituteClassConfig}
              options={{ title: 'InstituteClassConfig' }}
            />
            <Drawer.Screen
              name="InstituteHoliday"
              component={InstituteHoliday}
              options={{ title: 'InstituteHoliday' }}
            />
            <Drawer.Screen
              name="InstituteGroup"
              component={InstituteGroup}
              options={{ title: 'InstituteGroup' }}
            />
            <Drawer.Screen
              name="InstituteFeeManagement"
              component={InstituteFeeManagement}
              options={{ title: 'InstituteFeeManagement' }}
            />
            <Drawer.Screen
              name="InstituteActivityEvent"
              component={InstituteActivityEvent}
              options={{ title: 'InstituteActivityEvent' }}
            />
            <Drawer.Screen
              name="InstituteAutoApproval"
              component={InstituteAutoApproval}
              options={{ title: 'InstituteAutoApproval' }}
            />
            <Drawer.Screen
              name="InstituteFeePayment"
              component={InstituteFeePayment}
              options={{ title: 'InstituteFeePayment' }}
            />
            <Drawer.Screen
              name="InstituteNotificationTemplate"
              component={InstituteNotificationTemplate}
              options={{ title: 'InstituteNotificationTemplate' }}
            />
             <Drawer.Screen
              name="InstituteInstantNotification"
              component={InstituteInstantNotification}
              options={{ title: 'InstituteInstantNotification' }}
            />
            <Drawer.Screen
              name="ClassTimeTable"
              component={ClassTimeTable}
              options={{ title: 'ClassTimeTable' }}
            />
            <Drawer.Screen
              name="ClassStudentRegister"
              component={ClassStudentRegister}
              options={{ title: 'ClassStudentRegister' }}
            />

            <Drawer.Screen
              name="ClassExamSchedule"
              component={ClassExamSchedule}
              options={{ title: 'ClassExamSchedule' }}
            />
            <Drawer.Screen
              name="ClassExamAssessment"
              component={ClassExamAssessment}
              options={{ title: 'ClassExamAssessment' }}
            />
            <Drawer.Screen
              name="ClassSoftSkillAssessment"
              component={ClassSoftSkillAssessment}
              options={{ title: 'ClassSoftSkillAssessment' }}
            />
            <Drawer.Screen
              name="ClassCurricularActivity"
              component={ClassCurricularActivity}
              options={{ title: 'ClassCurricularActivity' }}
            />
            <Drawer.Screen
              name="DiaryPlanner"
              component={DiaryPlanner}
              options={{ title: 'DiaryPlanner' }}
            />
             <Drawer.Screen
              name="OnlineVideoClassRoom"
              component={OnlineVideoClassRoom}
              options={{ title: 'OnlineVideoClassRoom' }}
            />
             <Drawer.Screen
              name="OnlineStaffMeeting"
              component={OnlineStaffMeeting}
              options={{ title: 'OnlineStaffMeeting' }}
            />
             <Drawer.Screen
              name="OnlineParentMeeting"
              component={OnlineParentMeeting}
              options={{ title: 'OnlineParentMeeting' }}
            />
             <Drawer.Screen
              name="ViewMeetingAttendance"
              component={ViewMeetingAttendance}
              options={{ title: 'ViewMeetingAttendance' }}
            />
             <Drawer.Screen
              name="QuestionPaperConfig"
              component={QuestionPaperConfig}
              options={{ title: 'QuestionPaperConfig' }}
            />
            <Drawer.Screen
              name="StudyMaterial"
              component={StudyMaterial}
              options={{ title: 'StudyMaterial' }}
            />
            <Drawer.Screen
              name="VideoAssignment"
              component={VideoAssignment}
              options={{ title: 'VideoAssignment' }}
            />
            <Drawer.Screen
              name="ClassAttendance"
              component={ClassAttendance}
              options={{ title: 'ClassAttendance' }}
            />
            <Drawer.Screen
              name="ClassAssignment"
              component={ClassAssignment}
              options={{ title: 'ClassAssignment' }}
            />
            <Drawer.Screen
              name="ClassAssessment"
              component={ClassAssessment}
              options={{ title: 'ClassAssessment' }}
            />
            <Drawer.Screen
              name="ClassProgressCard"
              component={ClassProgressCard}
              options={{ title: 'ClassProgressCard' }}
            />
            <Drawer.Screen
              name="ClassSoftSkill"
              component={ClassSoftSkill}
              options={{ title: 'ClassSoftSkill' }}
            />


            <Drawer.Screen
              name="StudentReport"
              component={StudentReport}
              options={{ title: 'StudentReport' }}
            />

            <Drawer.Screen
              name="TeacherReport"
              component={TeacherReport}
              options={{ title: 'TeacherReport' }}
            />
            <Drawer.Screen
              name="ClassReport"
              component={ClassReport}
              options={{ title: 'ClassReport' }}
            />
            <Drawer.Screen
              name="InstituteReport"
              component={InstituteReport}
              options={{ title: 'InstituteReport' }}
            />
            <Drawer.Screen
              name="TeacherSubstituteReport"
              component={TeacherSubstituteReport}
              options={{ title: 'TeacherSubstituteReport' }}
            />
            <Drawer.Screen
              name="StudentRegisterReport"
              component={StudentRegisterReport}
              options={{ title: 'StudentRegisterReport' }}
            />
            <Drawer.Screen
              name="FeesReport"
              component={FeesReport}
              options={{ title: 'FeesReport' }}
            />
            <Drawer.Screen
              name="PaymentReport"
              component={PaymentReport}
              options={{ title: 'PaymentReport' }}
            />
            <Drawer.Screen
              name="NotificationReport"
              component={NotificationReport}
              options={{ title: 'NotificationReport' }}
            />
            <Drawer.Screen
              name="TeacherLessonPlannerReport"
              component={TeacherLessonPlannerReport}
              options={{ title: 'TeacherLessonPlannerReport' }}
            />
            <Drawer.Screen
              name="StudentLessonPlannerReport"
              component={StudentLessonPlannerReport}
              options={{ title: 'StudentLessonPlannerReport' }}
            />
            <Drawer.Screen
              name="ClassLessonPlannerReport"
              component={ClassLessonPlannerReport}
              options={{ title: 'ClassLessonPlannerReport' }}
            />
            <Drawer.Screen
              name="MarkRegisterReport"
              component={MarkRegisterReport}
              options={{ title: 'MarkRegisterReport' }}
            />
             <Drawer.Screen
              name="MonthlyAttendanceReport"
              component={MonthlyAttendanceReport}
              options={{ title: 'MonthlyAttendanceReport' }}
            />

          </Drawer.Navigator>
        </NavigationContainer>
      </ErrorBoundary>
    );
  }
}

export default Root
// console.disableYellowBox = true;
// YellowBox.ignoreWarnings([
//   "DrawerLayoutAndroid drawerPosition",
//   "componentWillReceiveProps",
//   "componentWillReceiveProps is deprecated",
//   "DrawerLayoutAndroid.positions"
// ]);
