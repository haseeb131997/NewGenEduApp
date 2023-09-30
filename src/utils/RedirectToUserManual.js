import {  Linking} from "react-native";

class RedirectToUserManual {}


var userManualBaseUrl = "";

var TEST = "NO";

if( TEST == "NO" ){
    userManualBaseUrl = "https://newgeneducationapp.com/userManual.html";
}
else{
    userManualBaseUrl = "https://test.newgeneducationapp.com/testPortal/userManual.html";
}

var ManualList = [
    {
       screenName: "Admin-Signup.html",
       userType: 'A',
       serviceName: 'SignUpService'
    },
    {
       screenName: 'Admin-Dashboard.html',
       userType: 'A',
       serviceName: 'DashBoardService'
    },
    {
       screenName: "Admin-GeneralConfig.html",
       userType: 'A',
       serviceName: 'GeneralLevelConfiguration'
    },
    {
       screenName: "Academic-year-config.html",
       userType: 'A',
       serviceName: 'EducationPeriodConfiguration'
    },
     {
       screenName: "Admin-Holiday-Maintenance.html",
       userType: 'A',
       serviceName: 'HolidayMaintenance'
    },
    {
       screenName: "Admin-Assignee-Group.html",
       userType: 'A',
       serviceName: 'GroupMapping'
    },
    {
       screenName: "Admin-Staff-Profile.html",
       userType: 'A',
       serviceName: 'TeacherProfile'
    },
    {
       screenName: "Student-Profile.html",
       userType: 'A',
       serviceName: 'StudentProfile'
    },
    {
       screenName: "Class-Configuration.html",
       userType: 'A',
       serviceName: 'ClassLevelConfiguration'
    },
    {
       screenName: "Class-TimeTable.html",
       userType: 'A',
       serviceName: 'ClassTimeTable'
    },
    {
       screenName: "Class-Student-Register.html",
       userType: 'A',
       serviceName: 'ClassStudentRegister'
    },
    {
       screenName: "Class-Attendance.html",
       userType: 'A',
       serviceName: 'ClassAttendance'
    },
    {
       screenName: "Admin-Assignment.html",
       userType: 'A',
       serviceName: 'ClassAssignment'
    },
     {
       screenName: "Admin-Assignment-Assessment.html",
       userType: 'A',
       serviceName: 'ClassAssignmentAssessment'
    },
     {
       screenName: "Admin-Exam-Configuration.html",
       userType: 'A',
       serviceName: 'ClassExamSchedule'
    },
    {
       screenName: "Admin-Exam-Assessment.html",
       userType: 'A',
       serviceName: 'ClassMark'
    },
    {
       screenName: "Admin-SoftSkill-Assessment.html",
       userType: 'A',
       serviceName: 'ClassSoftSkill'
    },
    {
       screenName: "Admin-Video-Lesson.html",
       userType: 'A',
       serviceName: 'InstituteAssignment'
    },
    {
       screenName: "Admin-Study-Material.html",
       userType: 'A',
       serviceName: 'StudyMaterial'
    },
    {
       screenName: "Admin-Fee-Management.html",
       userType: 'A',
       serviceName: 'InstituteFeeManagement'
    },
    {
       screenName: "Admin-Payment-Gateway.html",
       userType: 'A',
       serviceName: 'PaymentGateway'
    },
    {
       screenName: "Admin-Fee-Payment.html",
       userType: 'A',
       serviceName: 'InstitutePayment'
    },
    {
       screenName: "Admin-Staff-LessonPlan.html",
       userType: 'A',
       serviceName: 'TeacherLessonPlannerService'
    },
    {
       screenName: "Admin-Staff-Notes.html",
       userType: 'A',
       serviceName: 'TeacherNotesService'
    },
    {
       screenName: "AdminStaff-Leave-Management.html",
       userType: 'A',
       serviceName: 'TeacherLeaveManagement'
    },
    {
       screenName: "Student-Leave-Management.html",
       userType: 'A',
       serviceName: 'StudentLeaveManagement'
    },
    {
       screenName: "Admin-eCircular.html",
       userType: 'A',
       serviceName: 'ECircular'
    },
    {
       screenName: "Admin-Event-Planner.html",
       userType: 'A',
       serviceName: 'InstituteOtherActivity'
    },
    {
       screenName: "Admin-Notification-Template.html",
       userType: 'A',
       serviceName: 'NotificationTemplate'
    },
    {
       screenName: "Admin-Instant-Notification.html",
       userType: 'A',
       serviceName: 'Notification'
    },
    {
       screenName: "Admin-Blog.html",
       userType: 'A',
       serviceName: 'BlogService'
    },
    {
       screenName: "User-Profile.html",
       userType: 'A',
       serviceName: 'UserProfile'
    },
    {
       screenName: "User-Role.html",
       userType: 'A',
       serviceName: 'UserRole'
    },
    {
       screenName: "Student-Report.html",
       userType: 'A',
       serviceName: 'Student360DegreeReport'
    },
    {
       screenName: "Staff-Report.html",
       userType: 'A',
       serviceName: 'Teacher360DegreeReport'
    },
    {
       screenName: "Class-Report.html",
       userType: 'A',
       serviceName: 'Class360DegreeReport'
    },
    {
       screenName: "Institute-Performance-Report.html",
       userType: 'A',
       serviceName: 'GradeComparison'
    },
    {
       screenName: "Staff-Availability-Report.html",
       userType: 'A',
       serviceName: 'SubstituteReport'
    },
    {
       screenName: "Student-Register-Report.html",
       userType: 'A',
       serviceName: 'StudentDetailsReport'
    },
    {
       screenName: "Fee-Report.html",
       userType: 'A',
       serviceName: 'FeeBusinessReport'
    },
    {
       screenName: "Fee-Payment-Report.html",
       userType: 'A',
       serviceName: 'PaymentBusinessReport'
    },
    {
       screenName: "Notification-Report.html",
       userType: 'A',
       serviceName: 'NotificationBusinessReport'
    },
    {
       screenName: "Report-Teacher-Lesson-Planner.html",
       userType: 'A',
       serviceName: 'TeacherLessonPlannerReport'
    },
    {
       screenName: "Report-Class-lesson-Plan.html",
       userType: 'A',
       serviceName: 'ClassLessonPlannerReport'
    },
    {
       screenName: "Report-Student-Lesson-Planner.html",
       userType: 'A',
       serviceName: 'StudentLessonPlannerReport'
    },
    {
       screenName: "Student-Notification.html",
       userType: 'A',
       serviceName: 'StudentNotification'
    },
    {
       screenName: "Admin-StudentLessonPlan.html",
       userType: 'A',
       serviceName: 'StudentLessonPlannerService'
    },
    //end of Admin User Manual
 
    // start Teacher User Manual
    {
       screenName: "Staff-Dashboard.html",
       userType: 'T',
       serviceName: 'TeacherDashBoard'
    },
    {
       screenName: "Teacher-Profile.html",
       userType: 'T',
       serviceName: 'TeacherProfile'
    },
    {
       screenName: "Teacher-Student-Profile.html",
       userType: 'T',
       serviceName: 'StudentProfile'
    },
    {
       screenName: "Teacher-Class-Configuration.html",
       userType: 'T',
       serviceName: 'ClassLevelConfiguration'
    },
    {
       screenName: "Teacher-Class-TimeTable.html",
       userType: 'T',
       serviceName: 'ClassTimeTable'
    },
    {
       screenName: "Teacher-Class-Student-Register.html",
       userType: 'T',
       serviceName: 'ClassStudentRegister'
    },
    {
       screenName: "Teacher-Institute-AcademicYear.html",
       userType: 'T',
       serviceName: 'EducationPeriodConfiguration'
    },
     {
       screenName: "Teacher-Holiday-Maintenance.html",
       userType: 'T',
       serviceName: 'HolidayMaintenance'
    },
    {
       screenName: "Teacher-Class-Attendance.html",
       userType: 'T',
       serviceName: 'ClassAttendance'
    },
    {
       screenName: "Teacher-Assignment.html",
       userType: 'T',
       serviceName: 'ClassAssignment'
    },
    {
       screenName: "Teacher-Assignment-Assessment.html",
       userType: 'T',
       serviceName: 'ClassAssignmentAssessment'
    },
    {
       screenName: "Teacher-Exam-Configuration.html",
       userType: 'T',
       serviceName: 'ClassExamSchedule'
    },
    {
       screenName: "Teacher-Exam-Assessment.html",
       userType: 'T',
       serviceName: 'ClassMark'
    },
    {
       screenName: "Teacher-SoftSkill-Assessment.html",
       userType: 'T',
       serviceName: 'ClassSoftSkill'
    },
    {
       screenName: "Teacher-Video-Lesson.html",
       userType: 'T',
       serviceName: 'InstituteAssignment'
    },
    {
       screenName: "Teacher-Study-Material.html",
       userType: 'T',
       serviceName: 'StudyMaterial'
    },
    {
       screenName: "Teacher-Staff-Lesson-Planner.html",
       userType: 'T',
       serviceName: 'TeacherLessonPlannerService'
    },
    {
       screenName: "Teacher-Staff-Notes.html",
       userType: 'T',
       serviceName: 'TeacherNotesService'
    },
    {
       screenName: "Teacher-Leave-Management.html",
       userType: 'T',
       serviceName: 'TeacherLeaveManagement'
    },
    {
       screenName: "Teacher-StudentLeave-Management.html",
       userType: 'T',
       serviceName: 'StudentLeaveManagement'
    },
    {
       screenName: "Teacher-eCircular.html",
       userType: 'T',
       serviceName: 'ECircular'
    },
    {
       screenName: "Teacher-Event-Planner.html",
       userType: 'T',
       serviceName: 'InstituteOtherActivity'
    },
    {
       screenName: "Teacher-Instant-Notification.html",
       userType: 'T',
       serviceName: 'Notification'
    },
    {
       screenName: "Teacher-Blog.html",
       userType: 'T',
       serviceName: 'BlogService'
    },
    {
       screenName: "Teacher-Student-Report.html",
       userType: 'T',
       serviceName: 'Student360DegreeReport'
    },
    {
       screenName: "Teacher-Staff-Report.html",
       userType: 'T',
       serviceName: 'Teacher360DegreeReport'
    },
    {
       screenName: "Teacher-Class-Report.html",
       userType: 'T',
       serviceName: 'Class360DegreeReport'
    },
     {
       screenName: "Teacher-Student-Register-Report.html",
       userType: 'T',
       serviceName: 'StudentDetailsReport'
    },
    {
       screenName: "Teacher-Teacher-Lesson-Planner-Report.html",
       userType: 'T',
       serviceName: 'TeacherLessonPlannerReport'
    },
    {
       screenName: "Teacher-Student-Lesson-Planner-Report.html",
       userType: 'T',
       serviceName: 'StudentLessonPlannerReport'
    },
    {
       screenName: "Teacher-Class-lesson-Plan-Report.html",
       userType: 'T',
       serviceName: ''
    },
    {
       screenName: "Teacher-Student-Notification.html",
       userType: 'T',
       serviceName: ''
    },
    {
       screenName: "Teacher-Student-Lesson-Planner.html",
       userType: 'T',
       serviceName: 'StudentLessonPlannerReport'
    },
    // end Teacher User Manual
 
    // start other Staff user manual
    {
       screenName: "Other-Staff-Dashboard.html",
       userType: 'O',
       serviceName: 'TeacherDashBoard'
    },
    {
       screenName: "OtherStaff-GeneralConfig.html",
       userType: 'O',
       serviceName: 'GeneralLevelConfiguration'
    },
    {
       screenName: "OtherStaff-Academic-year-config.html",
       userType: 'O',
       serviceName: 'EducationPeriodConfiguration'
    },
    {
       screenName: "OtherStaff-Holiday-Maintenance.html",
       userType: 'O',
       serviceName: 'HolidayMaintenance'
    },
    {
       screenName: "OtherStaff-Assignee-Group.html",
       userType: 'O',
       serviceName: 'GroupMapping'
    },
    {
       screenName: "OtherStaff-Profile.html",
       userType: 'O',
       serviceName: 'TeacherProfile'
    },
    {
       screenName: "OtherStaff-Student-Profile.html",
       userType: 'O',
       serviceName: 'StudentProfile'
    },
    {
       screenName: "OtherStaff-Class-Configuration.html",
       userType: 'O',
       serviceName: 'ClassLevelConfiguration'
    },
    {
       screenName: "OtherStaff-Class-TimeTable.html",
       userType: 'O',
       serviceName: 'ClassTimeTable'
    },
    {
       screenName: "OtherStaff-Class-Student-Register.html",
       userType: 'O',
       serviceName: 'ClassStudentRegister'
    },
    {
       screenName: "OtherStaff-Exam-Configuration.html",
       userType: 'O',
       serviceName: 'ClassExamSchedule'
    },
    {
       screenName: "OtherStaff-Fee-Management.html",
       userType: 'O',
       serviceName: 'InstituteFeeManagement'
    },
    {
       screenName: "OtherStaff-Payment-Gateway.html",
       userType: 'O',
       serviceName: 'PaymentGateway'
    },
    {
       screenName: "OtherStaff-Fee-Payment.html",
       userType: 'O',
       serviceName: 'InstitutePayment'
    },
    {
       screenName: "OtherStaff-Leave-Management.html",
       userType: 'O',
       serviceName: 'TeacherLeaveManagement'
    },
    {
       screenName: "OtherStaff-eCircular.html",
       userType: 'O',
       serviceName: 'ECircular'
    },
    {
       screenName: "OtherStaff-Event-Planner.html",
       userType: 'O',
       serviceName: 'InstituteOtherActivity'
    },
    {
       screenName: "OtherStaff-Notification-Template.html",
       userType: 'O',
       serviceName: 'NotificationTemplate'
    },
    {
       screenName: "OtherStaff-Instant-Notification.html",
       userType: 'O',
       serviceName: 'Notification'
    },
    {
        screenName: "OtherStaff-Student-Register-Report.html",
        userType: 'O',
        serviceName: 'StudentDetailsReport'
    },
    {
       screenName: "OtherStaff-Fee-Report.html",
       userType: 'O',
       serviceName: 'FeeBusinessReport'
    },
    {
       screenName: "OtherStaff-FeePayment-Report.html",
       userType: 'O',
       serviceName: 'PaymentBusinessReport'
    },
    {
       screenName: "OtherStaff-Student-Notification.html",
       userType: 'O',
       serviceName: 'StudentNotification'
    },
    {
       screenName: "OtherStaff-User-Profile.html",
       userType: 'O',
       serviceName: 'UserProfile'
    },
    // end other Staff user manual
    // start parent  user manual
    {
       screenName: "Parent-Dashboard.html",
       userType: 'P',
       serviceName: 'ParentDashBoard'
    },
    {
       screenName: "Parent-Student-Profile.html",
       userType: 'P',
       serviceName: 'StudentProfile'
    },
    {
       screenName: "Parent-Student-Notification.html",
       userType: 'P',
       serviceName: 'StudentNotification'
    },
    {
       screenName: "Parent-eCircular.html",
       userType: 'P',
       serviceName: 'StudentECircular'
    },
    {
       screenName: "Parent-Institute-Holiday.html",
       userType: 'P',
       serviceName: 'HolidayMaintenance'
    },
    {
       screenName: "Parent-TimeTable.html",
       userType: 'P',
       serviceName: 'StudentTimeTable'
    },
    {
       screenName: "Parent-Attendance.html",
       userType: 'P',
       serviceName: 'StudentAttendance'
    },
    {
       screenName: "Parent-Studemt-Leave-Management.html",
       userType: 'P',
       serviceName: 'StudentLeaveManagement'
    },
    {
       screenName: "Parent-Extra-Curricular.html",
       userType: 'P',
       serviceName: 'StudentOtherActivity'
    },
    {
       screenName: "Parent-Exam-Schedule.html",
       userType: 'P',
       serviceName: 'StudentExamSchedule'
    },
    {
       screenName: "Parent-Progress-Card.html",
       userType: 'P',
       serviceName: 'StudentProgressCard'
    },
    {
       screenName: "Parent-Soft-Skill.html",
       userType: 'P',
       serviceName: 'StudentSoftSkill'
    },
    {
       screenName: "Parent-Fee.html",
       userType: 'P',
       serviceName: 'StudentFeeManagement'
    },
    {
       screenName: "Parent-Payment-Receipt.html",
       userType: 'P',
       serviceName: 'StudentPayment'
    },
    {
       screenName: "Parent-Student-Lesson-plan.html",
       userType: 'P',
       serviceName: 'StudentLessonPlannerService'
    },
    {
       screenName: "Parent-Study-Material.html",
       userType: 'P',
       serviceName: 'StudentStudyMaterial'
    },
    {
       screenName: "Parent-Student-Notes.html",
       userType: 'P',
       serviceName: 'StudentNotesService'
    },
    {
       screenName: "Parent-Student-Blogs.html",
       userType: 'P',
       serviceName: 'BlogService'
    },
    {
       screenName: "Parent-Assignment.html",
       userType: 'P',
       serviceName: 'NewStudentAssignment'
    },
    {
       screenName: "Parent-Video-Lesson.html",
       userType: 'P',
       serviceName: 'StudentAssignment'
    },    
    {
       screenName: "Parent-Student-Report.html",
       userType: 'P',
       serviceName: 'Student360DegreeReport'
    },
    {
       screenName: "Parent-Report-Student-Lesson-Plan.html",
       userType: 'P',
       serviceName: 'StudentLessonPlannerReport'
    },
    // end parent  user manual
 
    // start student  user manual
    {
        screenName: "Student-Dashboard.html",
        userType: 'S',
        serviceName: 'ParentDashBoard'
    },
    {
        screenName: "Student-Student-Profile.html",
        userType: 'S',
        serviceName: 'StudentProfile'
    },
    {
        screenName: "Student-Student-Notification.html",
        userType: 'S',
        serviceName: 'StudentNotification'
    },
    {
        screenName: "Student-eCircular.html",
        userType: 'S',
        serviceName: 'StudentECircular'
    },
    {
        screenName: "Student-Institute-Holiday.html",
        userType: 'S',
        serviceName: 'HolidayMaintenance'
    },
    {
        screenName: "Student-TimeTable.html",
        userType: 'S',
        serviceName: 'StudentTimeTable'
    },
    {
        screenName: "Student-Attendance.html",
        userType: 'S',
        serviceName: 'StudentAttendance'
    },
    {
        screenName: "Student-Student-Leave-Management.html",
        userType: 'S',
        serviceName: 'StudentLeaveManagement'
    },
    {
        screenName: "Student-Extra-Curricular.html",
        userType: 'S',
        serviceName: 'StudentOtherActivity'
    },
    {
        screenName: "Student-Exam-Schedule.html",
        userType: 'S',
        serviceName: 'StudentExamSchedule'
    },
    {
        screenName: "Student-Progress-Card.html",
        userType: 'S',
        serviceName: 'StudentProgressCard'
    },
    {
        screenName: "Student-Soft-Skill.html",
        userType: 'S',
        serviceName: 'StudentSoftSkill'
    },
    {
        screenName: "Student-Fee.html",
        userType: 'S',
        serviceName: 'StudentFeeManagement'
    },
    {
        screenName: "Student-Payment-Receipt.html",
        userType: 'S',
        serviceName: 'StudentPayment'
    },
    {
        screenName: "Student-Student-Lesson-Plan.html",
        userType: 'S',
        serviceName: 'StudentLessonPlannerService'
    },
    {
        screenName: "Student-Study-Material.html",
        userType: 'S',
        serviceName: 'StudentStudyMaterial'
    },
    {
        screenName: "Student-Student-Notes.html",
        userType: 'S',
        serviceName: 'StudentNotesService'
    },
    {
        screenName: "Student-Blogs.html",
        userType: 'S',
        serviceName: 'BlogService'
    },
    {
        screenName: "Student-Assignment.html",
        userType: 'S',
        serviceName: 'NewStudentAssignment'
    },
    {
        screenName: "Student-Video-Lesson.html",
        userType: 'S',
        serviceName: 'StudentAssignment'
    },
    {
        screenName: "Student-Student-Report.html",
        userType: 'S',
        serviceName: 'Student360DegreeReport'
    },
    {
        screenName: "Student-Lesson-Plan-Report.html",
        userType: 'S',
        serviceName: 'StudentLessonPlannerReport'
    }
    // end student  user manual
 ];



 RedirectToUserManual.redirectToUserManualLink = async function(userType, serviceName){

    var target = "";
    for(var i=0; i<ManualList.length; i++){
        if(ManualList[i].userType == userType && ManualList[i].serviceName == serviceName){
            target = ManualList[i].screenName;
            break;
        }
    }
   //  window.open(userManualBaseUrl+"?manual=webApp&reqUser="+userType+"&reqManual="+target);
   Linking.openURL(userManualBaseUrl+"?manual=webApp&reqUser="+userType+"&reqManual="+target)
 }



//  $(document).on("click", ".redirectToUserManual", function(){
//     var $scope = getSubScreenScope();
//     redirectToUserManualLink($scope.userType, $scope.subScreenScope.serviceName);
// });


module.exports = {  
   functions:RedirectToUserManual
 };