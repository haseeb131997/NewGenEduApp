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

 /* * * Change Tag:NEAI-182
  Change Desc: set None value if value null from backend in dropDown
  Changed By : Shashank
  Date:21-05-2021 
  */


   /* * * Change Tag:NEAI-286
  Change Desc: add other tab in general configuration.
  Changed By : Shashank
  Date:10-06-2021 
  */


   /* * * Change Tag: NEAI-302
  Change Desc: Add a new feature "Teacher Lesson Planner"
  Changed By : Shashank
  Date:14-06-2021 
  */

     /* * * Change Tag: NEAI2-197
  Change Desc: Add new services and remove summary and search from service name select box
  Changed By : Shashank
  Date:26-07-2021 
  */

       /* * * Change Tag: NEAI2-229
  Change Desc: User role-->remove summary--> change the functionID like web
  Changed By : Shashank
  Date:26-07-2021 
  */

   /* * * Change Tag: NEAI2-233
  Change Desc: Mobile-->User Role-->Remove New Student Assignment
  Changed By : Shashank
  Date:26-07-2021 
  */

   /* * * Change Tag: SHA030921
  Change Desc: add new array of online class room type. 
  Changed By : Shashank
  Date:03-09-2021 
  */

     /* * * Change Tag: NEW3.01
  Change Desc: change array list according to new dropdwon
  Changed By : Shashank
  Date:29-09-2021 
  */

       /* * * Change Tag: NEW3.02
  Change Desc: get Selected Value  
  Changed By : Shashank
  Date:29-09-2021 
  */


 /* * * Change Tag: 3.0 UI/UX
  Change Desc: change for dropdown version 3.0 
  Changed By : Shashank
  Date:20-10-2021 
  */




import AsyncStorage from "@react-native-async-storage/async-storage";
import { httpUtils } from '../utils/HttpUtils';
import apiCall from "../ApiCall/ActionApi";


class SelectListUtils { }

SelectListUtils.abortController = '';


// starts 3.0 UI/UX 
// SelectListUtils.getSelectedValue = (master, value) => {
//     //console.log(value,'in getSelectedValue')
//     for (let item of master) {
//         if (value == item.id) {
//             if (item.id != null && item.id != '') {
//                 return item.value
//             }

//         }
//     }
 
//     return ''
 

// }

SelectListUtils.getSelectedValue = (master, value) => {
  
    for (let item of master) {
        if (value == item.value) {
            if (item.value != null && item.value != '') {
                return item.label
            }
        }
    }
 
    return ''

}

// ends 3.0 UI/UX 

// starts NEW3.02
SelectListUtils.getSelectedValueNew = (master, value) => {

    for (let item of master) {
        if (value == item.value) {
            if (item.value != null && item.value != '') {
                return item.label
            }

        }
    }
 
    return ''
 

}
// endss NEW3.02


SelectListUtils.selectMaster = {
    ClassMaster: [],
    // starts NEW3.01
    // AuthStatusMaster: [{ value: "None", id: "" }, { value: "Authorised", id: "A" }, { value: "Unauthorised", id: "U" }, { value: "Rejected", id: "R" }],
    AuthStatusMaster: [{ label: "Approved", value: "A" }, { label: "Pending for Approval", value: "U" }, { label: "Rejected", value: "R" }],
    // ends NEW3.01
    RecStatusMaster: [{ name: "Select option", value: "" }, { name: "Open", value: "O" }, { name: "Deleted", value: "D" }],
    // PayMentMaster: [{ value: "Cash", id: "C" }, { value: "Cheque", id: "Q" }, { value: "NetBanking", id: "N" }, { value: "Stripe Payment Gateway", id: "S" },{ value: "Others", id: "O" }],
    PayMentMaster: [{ label: "Cash", value: "C" }, { label: "Cheque", value: "Q" }],
    // MediaCommunication: [{ value: "None", id: "" },{ value: "Mail", id: "E" }, { value: "SMS", id: "S" }],
    MediaCommunication: [{ label: "Mail", value: "E" }, { label: "SMS", value: "S" }],
    DayMaster: [{ name: "Monday", value: "Mon" }, { name: "Tuesday", value: "Tue" }, { name: "Wednesday", value: "Wed" }, { name: "Thursday", value: "Thu" }, { name: "Friday", value: "Fri" }, { name: "Saturday", value: "Sat" }, { name: "Sunday", value: "Sun" }],

    // MonthMaster: [{ value: "None", id: "" },{ value: "January", id: "01" }, { value: "February", id: "02" }, { value: "March", id: "03" }, { value: "April", id: "04" }, { value: "May", id: "05" }, { value: "June", id: "06" }, { value: "July", id: "07" }, { value: "August", id: "08" }, { value: "September", id: "09" }, { value: "October", id: "10" }, { value: "November", id: "11" }, { value: "December", id: "12" }],
    MonthMaster: [{ label: "January", value: "01" }, { label: "February", value: "02" }, { label: "March", value: "03" }, { label: "April", value: "04" }, { label: "May", value: "05" }, { label: "June", value: "06" }, { label: "July", value: "07" }, { label: "August", value: "08" }, { label: "September", value: "09" }, { label: "October", value: "10" }, { label: "November", value: "11" }, { label: "December", value: "12" }],

    // starts NEAI2-229
    //	FeatureMaster: ["Select option","ClassTimeTable", "TeacherTimeTable", "TeacherProfile", "StudentProfile", "ClassAttendance", "TeacherAttendance", "StudentAttendance", "StudentAssignment", "ClassAssignment", "StudentCalender", "TeacherCalender", "ExamSchedule", "StudentProgressCard", "StudentProgressCardEntry", "StudentLeaveManagement", "TeacherLeaveManagement", "ClassFeeManagement", "StudentFeeManagement", "PaySlip", "Transport", "Notification", "Statistics", "OtherActivity", "Administration"],
    // FeatureMaster: [
    //     { value: "Select option", id: '' },
    //     { value: "ALL", id: 'ALL' },
    //     { value: "ClassAttendance", id: 'ClassAttendance' },
    //     { value: "ClassExamSchedule", id: 'ClassExamSchedule' },
    //     { value: "ClassMark", id: 'ClassMark' },
    //     { value: "ClassStudentMapping", id: 'ClassStudentMapping' },
    //     { value: "ClassTimeTable", id: 'ClassTimeTable' },
    //     { value: "ClassExamScheduleSummary", id: 'ClassExamScheduleSummary' },
    //     { value: "ClassMarkSummary", id: 'ClassMarkSummary' },
    //     { value: "ClassTimeTableSummary", id: 'ClassTimeTableSummary' },
    //     { value: "ClassLevelConfiguration", id: 'ClassLevelConfiguration' },
    //     { value: "ECircular", id: 'ECircular' },
    //     { value: "GeneralLevelConfiguration", id: 'GeneralLevelConfiguration' },
    //     { value: "GroupMapping", id: 'GroupMapping' },
    //     { value: "HolidayMaintenance", id: 'HolidayMaintenance' },
    //     { value: "InstituteAssignment", id: 'InstituteAssignment' },
    //     { value: "InstituteFeeManagement", id: 'InstituteFeeManagement' },
    //     { value: "InstituteOtherActivity", id: 'InstituteOtherActivity' },
    //     { value: "InstitutePayment", id: 'InstitutePayment' },
    //     { value: "ManagementDashBoard", id: 'ManagementDashBoard' },
    //     { value: "Notification", id: 'Notification' },
    //     { value: "AssigneeSearchService", id: 'AssigneeSearchService' },
    //     { value: "AssignmentSearchService", id: 'AssignmentSearchService' },
    //     { value: "BatchSearchService", id: 'BatchSearchService' },
    //     { value: "FeeSearchService", id: 'FeeSearchService' },
    //     { value: "InstituteSearchService", id: 'InstituteSearchService' },
    //     { value: "NotificationSearchService", id: 'NotificationSearchService' },
    //     { value: "OtherActivitySearchService", id: 'OtherActivitySearchService' },
    //     { value: "PaymentSearchService", id: 'PaymentSearchService' },
    //     { value: "UserRoleSearchService", id: 'UserRoleSearchService' },
    //     { value: "StudentSearchService", id: 'StudentSearchService' },
    //     { value: "TeacherSearchService", id: 'TeacherSearchService' },
    //     { value: "UserSearchService", id: 'UserSearchService' },
    //     { value: "SelectBoxMaster", id: 'SelectBoxMaster' },
    //     { value: "StudentMaster", id: 'StudentMaster' },
    //     { value: "InstituteAssignmentSummary", id: 'InstituteAssignmentSummary' },
    //     { value: "InstituteOtherActivitySummary", id: 'InstituteOtherActivitySummary' },
    //     { value: "InstituteFeeManagementSummary", id: 'InstituteFeeManagementSummary' },
    //     { value: "InstitutePaymentSummary", id: 'InstitutePaymentSummary' },
    //     { value: "GroupMappingSummary", id: 'GroupMappingSummary' },
    //     { value: "HolidayMaintenanceSummary", id: 'HolidayMaintenanceSummary' },
    //     { value: "NotificationSummary", id: 'NotificationSummary' },
    //     { value: "TeacherMaster", id: 'TeacherMaster' },
    //     { value: "ParentDashBoard", id: 'ParentDashBoard' },
    //     { value: "StudentECircular", id: 'StudentECircular' },
    //     { value: "StudentAssignment", id: 'StudentAssignment' },
    //     { value: "StudentAttendance", id: 'StudentAttendance' },
    //     { value: "StudentCalender", id: 'StudentCalender' },
    //     { value: "StudentExamSchedule", id: 'StudentExamSchedule' },
    //     { value: "StudentFeeManagement", id: 'StudentFeeManagement' },
    //     { value: "StudentLeaveManagement", id: 'StudentLeaveManagement' },
    //     { value: "StudentNotification", id: 'StudentNotification' },
    //     { value: "StudentOtherActivity", id: 'StudentOtherActivity' },
    //     { value: "StudentPayment", id: 'StudentPayment' },
    //     { value: "StudentProfile", id: 'StudentProfile' },
    //     { value: "StudentProgressCard", id: 'StudentProgressCard' },
    //     { value: "StudentTimeTable", id: 'StudentTimeTable' },
    //     { value: "StudentAssignmentSummary", id: 'StudentAssignmentSummary' },
    //     { value: "StudentAttendanceSummary", id: 'StudentAttendanceSummary' },
    //     { value: "StudentExamScheduleSummary", id: 'StudentExamScheduleSummary' },
    //     { value: "StudentFeeManagementSummary", id: 'StudentFeeManagementSummary' },
    //     { value: "StudentLeaveManagementSummary", id: 'StudentLeaveManagementSummary' },
    //     { value: "StudentPaymentManagementSummary", id: 'StudentPaymentManagementSummary' },
    //     { value: "StudentOtherActivitySummary", id: 'StudentOtherActivitySummary' },
    //     { value: "StudentPaymentSummary", id: 'StudentPaymentSummary' },
    //     { value: "StudentProfileSummary", id: 'StudentProfileSummary' },
    //     { value: "StudentProgressCardSummary", id: 'StudentProgressCardSummary' },
    //     { value: "StudentTimeTableSummary", id: 'StudentTimeTableSummary' },
    //     { value: "Payroll", id: 'Payroll' },
    //     { value: "TeacherAttendance", id: 'TeacherAttendance' },
    //     { value: "TeacherDashBoard", id: 'TeacherDashBoard' },
    //     { value: "TeacherCalender", id: 'TeacherCalender' },
    //     { value: "TeacherLeaveManagement", id: 'TeacherLeaveManagement' },
    //     { value: "TeacherProfile", id: 'TeacherProfile' },
    //     { value: "TeacherTimeTable", id: 'TeacherTimeTable' },
    //     { value: "TeacherAttendanceSummary", id: 'TeacherAttendanceSummary' },
    //     { value: "TeacherLeaveManagementSummary", id: 'TeacherLeaveManagementSummary' },
    //     { value: "TeacherProfileSummary", id: 'TeacherProfileSummary' },
    //     { value: "TeacherTimeTableSummary", id: 'TeacherTimeTableSummary' },
    //     { value: "UserProfileSummary", id: 'UserProfileSummary' },
    //     { value: "UserRoleSummary", id: 'UserRoleSummary' },
    //     { value: "UserRole", id: 'UserRole' },
    //     { value: "UserProfile", id: 'UserProfile' },
    //     { value: "StudentSoftSkill", id: 'StudentSoftSkill' },
    //     { value: "TeacherECircular", id: 'TeacherECircular' },
    //     // start NEAI2-197
    //     {
    //         value: "TeacherNotesService",
    //         id: "TeacherNotesService"
    //     }, {
    //         value: "TeacherLessonPlannerService",
    //         id: "TeacherLessonPlannerService"
    //     }, {
    //         value: "NewStudentAssignment",
    //         id: "NewStudentAssignment"
    //     }, {
    //         value: "StudyMaterial",
    //         id: "StudyMaterial"
    //     }, {
    //         value: "BlogRepliesService",
    //         id: "BlogRepliesService"
    //     }, {
    //         value: "StudentStudyMaterial",
    //         id: "StudentStudyMaterial"
    //     }, {
    //         value: "ClassAssignment",
    //         id: "ClassAssignment"
    //     }, {
    //         value: "StudentLessonPlannerService",
    //         id: "StudentLessonPlannerService"
    //     }, {
    //         value: "BlogCommentService",
    //         id: "BlogCommentService"
    //     }, {
    //         value: "BlogService",
    //         id: "BlogService"
    //     }, {
    //         value: "ClassAssignmentAssessment",
    //         id: "ClassAssignmentAssessment"
    //     }, {
    //         value: "StudentOnlineExamService",
    //         id: "StudentOnlineExamService"
    //     }, {
    //         value: "StudentNotesService",
    //         id: "StudentNotesService"
    //     }
    //      // end NEAI2-197
    // ],

    // FeatureMaster: [
    //     {
    //         value: "Select option",
    //         id: ""
    //     }, {
    //         value: "ALL",
    //         id: "ALL"
    //     }, {
    //         value: "ClassAttendance",
    //         id: "ClassAttendance"
    //     }, {
    //         value: "ClassExamSchedule",
    //         id: "ClassExamSchedule"
    //     }, {
    //         value: "ClassMark",
    //         id: "ClassMark"
    //     }, {
    //         value: "ClassTimeTable",
    //         id: "ClassTimeTable"
    //     }, {
    //         value: "ClassLevelConfiguration",
    //         id: "ClassLevelConfiguration"
    //     }, {
    //         value: "ECircular",
    //         id: "ECircular"
    //     }, {
    //         value: "GeneralLevelConfiguration",
    //         id: "GeneralLevelConfiguration"
    //     }, {
    //         value: "GroupMapping",
    //         id: "GroupMapping"
    //     }, {
    //         value: "HolidayMaintenance",
    //         id: "HolidayMaintenance"
    //     }, {
    //         value: "InstituteAssignment",
    //         id: "InstituteAssignment"
    //     }, {
    //         value: "InstituteFeeManagement",
    //         id: "InstituteFeeManagement"
    //     }, {
    //         value: "InstituteOtherActivity",
    //         id: "InstituteOtherActivity"
    //     }, {
    //         value: "InstitutePayment",
    //         id: "InstitutePayment"
    //     }, {
    //         value: "Notification",
    //         id: "Notification"
    //     }, {
    //         value: "FeeIDSearchService",
    //         id: "FeeIDSearchService"
    //     }, {
    //         value: "StudentECircular",
    //         id: "StudentECircular"
    //     },
    //     // starts NEAI2-233
    //     //  {
    //     //     value: "StudentAssignment",
    //     //     id: "StudentAssignment"
    //     // },
    //     {
    //         value: "StudentAssignment",
    //         id: "StudentAssignment"
    //     },
    //     // ends NEAI2-233
    //      {
    //         value: "StudentAttendance",
    //         id: "StudentAttendance"
    //     }, {
    //         value: "StudentExamSchedule",
    //         id: "StudentExamSchedule"
    //     }, {
    //         value: "StudentFeeManagement",
    //         id: "StudentFeeManagement"
    //     }, {
    //         value: "StudentLeaveManagement",
    //         id: "StudentLeaveManagement"
    //     }, {
    //         value: "StudentNotification",
    //         id: "StudentNotification"
    //     }, {
    //         value: "StudentOtherActivity",
    //         id: "StudentOtherActivity"
    //     }, {
    //         value: "StudentPayment",
    //         id: "StudentPayment"
    //     }, {
    //         value: "StudentProfile",
    //         id: "StudentProfile"
    //     }, {
    //         value: "StudentProgressCard",
    //         id: "StudentProgressCard"
    //     }, {
    //         value: "StudentTimeTable",
    //         id: "StudentTimeTable"
    //     }, {
    //         value: "TeacherLeaveManagement",
    //         id: "TeacherLeaveManagement"
    //     }, {
    //         value: "TeacherProfile",
    //         id: "TeacherProfile"
    //     }, {
    //         value: "TeacherTimeTable",
    //         id: "TeacherTimeTable"
    //     }, {
    //         value: "UserRole",
    //         id: "UserRole"
    //     }, {
    //         value: "UserProfile",
    //         id: "UserProfile"
    //     }, {
    //         value: "StudentSoftSkill",
    //         id: "StudentSoftSkill"
    //     }, {
    //         value: "TeacherECircular",
    //         id: "TeacherECircular"
    //     }, {
    //         value: "TeacherNotesService",
    //         id: "TeacherNotesService"
    //     }, {
    //         value: "TeacherLessonPlannerService",
    //         id: "TeacherLessonPlannerService"
    //     }, 
    //     // starts NEAI2-233
    //     // {
    //     //     value: "NewStudentAssignment",
    //     //     id: "NewStudentAssignment"
    //     // }, 
    //     {
    //         value: "Student Assignment",
    //         id: "StudentAssignment"
    //     },
    //     // ends NEAI2-233
    //     {
    //         value: "StudyMaterial",
    //         id: "StudyMaterial"
    //     }, {
    //         value: "BlogRepliesService",
    //         id: "BlogRepliesService"
    //     }, {
    //         value: "StudentStudyMaterial",
    //         id: "StudentStudyMaterial"
    //     }, {
    //         value: "ClassAssignment",
    //         id: "ClassAssignment"
    //     }, {
    //         value: "StudentLessonPlannerService",
    //         id: "StudentLessonPlannerService"
    //     }, {
    //         value: "BlogCommentService",
    //         id: "BlogCommentService"
    //     }, {
    //         value: "BlogService",
    //         id: "BlogService"
    //     }, {
    //         value: "ClassAssignmentAssessment",
    //         id: "ClassAssignmentAssessment"
    //     }, {
    //         value: "StudentOnlineExamService",
    //         id: "StudentOnlineExamService"
    //     }, {
    //         value: "StudentNotesService",
    //         id: "StudentNotesService"
    //     }
    // ],

    // label: value,
    // value: subInd,

    // FeatureMaster: [{value:"Select option",id:""},{value:"ALL",id:"ALL"},{value:"Class Attendance",id:"ClassAttendance"},{value:"Class Exam Configuration",id:"ClassExamSchedule"},{value:"Class Exam Assessment",id:"ClassMark"},{value:"Class TimeTable",id:"ClassTimeTable"},{value:"Class Configuration",id:"ClassLevelConfiguration"},{value:"Institute ECircular",id:"ECircular"},{value:"General Configuration",id:"GeneralLevelConfiguration"},{value:"Assignee Group",id:"GroupMapping"},{value:"Holiday Maintenance",id:"HolidayMaintenance"},{value:"Class Video Lesson",id:"InstituteAssignment"},{value:"Institute Fee Management",id:"InstituteFeeManagement"},{value:"Institute Event Planner",id:"InstituteOtherActivity"},{value:"Institute Fee Payment",id:"InstitutePayment"},{value:"Institute Notification",id:"Notification"},{value:"Student ECircular",id:"StudentECircular"},{value:"Student Leave Management",id:"StudentLeaveManagement"},{value:"Student Extra Curricular Activity",id:"StudentOtherActivity"},{value:"Student Profile",id:"StudentProfile"},{value:"Student Progress Card",id:"StudentProgressCard"},{value:"Staff Leave",id:"TeacherLeaveManagement"},{value:"Staff Profile",id:"TeacherProfile"},{value:"User Role",id:"UserRole"},{value:"User Profile",id:"UserProfile"},{value:"Student SoftSkill",id:"StudentSoftSkill"},{value:"Staff ECircular",id:"TeacherECircular"},{value:"Staff Notes",id:"TeacherNotesService"},{value:"Staff Lesson Planner",id:"TeacherLessonPlannerService"},{value:"Student Assignment",id:"NewStudentAssignment"},{value:"Study Material",id:"StudyMaterial"},{value:"Blog Replies",id:"BlogRepliesService"},{value:"Class Assignment",id:"ClassAssignment"},{value:"Student Lesson Planner",id:"StudentLessonPlannerService"},{value:"Blog Comments",id:"BlogCommentService"},{value:"Knowledge Sharing Blogs",id:"BlogService"},{value:"Class Assignment Assessment",id:"ClassAssignmentAssessment"},{value:"Online Exam",id:"StudentOnlineExamService"},{value:"Student Notes",id:"StudentNotesService"}],
    FeatureMaster: [{label:"Select option",value:""},{label:"ALL",value:"ALL"},{label:"Class Attendance",value:"ClassAttendance"},{label:"Class Exam Configuration",value:"ClassExamSchedule"},{label:"Class Exam Assessment",value:"ClassMark"},{label:"Class TimeTable",value:"ClassTimeTable"},{label:"Class Configuration",value:"ClassLevelConfiguration"},{label:"Institute ECircular",value:"ECircular"},{label:"General Configuration",value:"GeneralLevelConfiguration"},{label:"Assignee Group",value:"GroupMapping"},{label:"Holiday Maintenance",value:"HolidayMaintenance"},{label:"Class Video Lesson",value:"InstituteAssignment"},{label:"Institute Fee Management",value:"InstituteFeeManagement"},{label:"Institute Event Planner",value:"InstituteOtherActivity"},{label:"Institute Fee Payment",value:"InstitutePayment"},{label:"Institute Notification",value:"Notification"},{label:"Student ECircular",value:"StudentECircular"},{label:"Student Leave Management",value:"StudentLeaveManagement"},{label:"Student Extra Curricular Activity",value:"StudentOtherActivity"},{label:"Student Profile",value:"StudentProfile"},{label:"Student Progress Card",value:"StudentProgressCard"},{label:"Staff Leave",value:"TeacherLeaveManagement"},{label:"Staff Profile",value:"TeacherProfile"},{label:"User Role",value:"UserRole"},{label:"User Profile",value:"UserProfile"},{label:"Student SoftSkill",value:"StudentSoftSkill"},{label:"Staff ECircular",value:"TeacherECircular"},{label:"Staff Notes",value:"TeacherNotesService"},{label:"Staff Lesson Planner",value:"TeacherLessonPlannerService"},{label:"Student Assignment",value:"NewStudentAssignment"},{label:"Study Material",value:"StudyMaterial"},{label:"Blog Replies",value:"BlogRepliesService"},{label:"Class Assignment",value:"ClassAssignment"},{label:"Student Lesson Planner",value:"StudentLessonPlannerService"},{label:"Blog Comments",value:"BlogCommentService"},{label:"Knowledge Sharing Blogs",value:"BlogService"},{label:"Class Assignment Assessment",value:"ClassAssignmentAssessment"},{label:"Online Exam",value:"StudentOnlineExamService"},{label:"Student Notes",value:"StudentNotesService"}],
     // ends NEAI2-229
    // ProfileStatusMaster: [{ value: "Enable", id: "E" }, { value: "Disable", id: "D" }],
    ProfileStatusMaster: [{ label: "Enable", value: "E" }, { label: "Disable", value: "D" }],
    StatusMaster: [{ name: "Completed", value: "C" }, { name: "Incomplete", value: "I" }],
    // FeeStatus: [{ value: "None", id: "" }, { value: "Pending", id: "P" }, { value: "OverDue", id: "O" }, { value: "Paid", id: "C" }],
    FeeStatus: [ { label: "Pending", value: "P" }, { label: "OverDue", value: "O" }, { label: "Paid", value: "C" }],
    HourMaster: [{ value: "Hour" }, { value: "00" }, { value: "01" }, { value: "02" }, { value: "03" }, { value: "04" }, { value: "05" }, { value: "06" }, { value: "07" }, { value: "08" }, { value: "09" }, { value: "10" }, { value: "11" }, { value: "12" }, { value: "13" }, { value: "14" }, { value: "15" }, { value: "16" }, { value: "17" }, { value: "18" }, { value: "19" }, { value: "20" }, { value: "21" }, { value: "22" }, { value: "23" }],

    // MinMaster: [{ value: "Min" }, { value: "00" }, { value: "01" }, { value: "02" }, { value: "03" }, { value: "04" }, { value: "05" }, { value: "06" }, { value: "07" }, { value: "08" }, { value: "09" }, { value: "10" }, { value: "11" }, { value: "12" }, { value: "13" }, { value: "14" }, { value: "15" }, { value: "16" }, { value: "17" }, { value: "18" }, { value: "19" }, { value: "20" }, { value: "21" }, { value: "22" }, { value: "23" }, { value: "24" }, { value: "25" }, { value: "26" }, { value: "27" }, { value: "28" }, { value: "29" }, { value: "30" }, { value: "31" }, { value: "32" }, { value: "33" }, { value: "34" }, { value: "35" }, { value: "36" }, { value: "37" }, { value: "38" }, { value: "39" }, { value: "40" }, { value: "41" }, { value: "42" }, { value: "43" }, { value: "44" }, { value: "45" }, { value: "46" }, { value: "47" }, { value: "48" }, { value: "49" }, { value: "50" }, { value: "51" }, { value: "52" }, { value: "53" }, { value: "54" }, { value: "55" }, { value: "56" }, { value: "57" }, { value: "58" }, { value: "59" }],
    MinMaster: [{ label: "00", value: "00" }, { label: "01", value: "01" }, { label: "02", value: "02" }, { label: "03", value: "03" }, { label: "04", value: "04" }, { label: "05", value: "05" }, { label: "06", value: "06" }, { label: "07", value: "07" }, { label: "08", value: "08" }, { label: "09", value: "09" }, { label: "10", value: "10" }, { label: "11", value: "11" }, { label: "12", value: "12" }, { label: "13", value: "13" }, { label: "14", value: "14" }, { label: "15", value: "15" }, { label: "16", value: "16" }, { label: "17", value: "17" }, { label: "18", value: "18" }, { label: "19", value: "19" }, { label: "20", value: "20" }, { label: "21", value: "21" }, { label: "22", value: "22" }, { label: "23", value: "23" }, { label: "24", value: "24" }, { label: "25", value: "25" }, { label: "26", value: "26" }, { label: "27", value: "27" }, { label: "28", value: "28" }, { label: "29", value: "29" }, { label: "30", value: "30" }, { label: "31", value: "31" }, { label: "32", value: "32" }, { label: "33", value: "33" }, { label: "34", value: "34" }, { label: "35", value: "35" }, { label: "36", value: "36" }, { label: "37", value: "37" }, { label: "38", value: "38" }, { label: "39", value: "39" }, { label: "40", value: "40" }, { label: "41", value: "41" }, { label: "42", value: "42" }, { label: "43", value: "43" }, { label: "44", value: "44" }, { label: "45", value: "45" }, { label: "46", value: "46" }, { label: "47", value: "47" }, { label: "48", value: "48" }, { label: "49", value: "49" }, { label: "50", value: "50" }, { label: "51", value: "51" }, { label: "52", value: "52" }, { label: "53", value: "53" }, { label: "54", value: "54" }, { label: "55", value: "55" }, { label: "56", value: "56" }, { label: "57", value: "57" }, { label: "58", value: "58" }, { label: "59", value: "59" }],
    AssignmentTypeMaster: [{ value: "Homework", id: "H" }, { value: "Term/Exam", id: "T" }, { value: "Punishment", id: "P" }, { value: "Improvement", id: "I" }],
    // OtherActivityLevelMaster: [{ value: "None", id: "" },{ value: "State", id: "S" }, { value: "District", id: "D" }, { value: "International", id: "I" }, { value: "Internal", id: "E" }, { value: "University", id: "U" },{ value: "Board", id: "B" },{ value: "College", id: "C" },{ value: "School", id: "L" },{ value: "Others", id: "O" }],
    OtherActivityLevelMaster: [{ label: "State", value: "S" }, { label: "District", value: "D" }, { label: "International", value: "I" }, { label: "Internal", value: "E" }, { label: "University", value: "U" },{ label: "Board", value: "B" },{ label: "College", value: "C" },{ label: "School", value: "L" },{ label: "Others", value: "O" }],
    // YearMaster: [{ value: "None", id: "" },{ value: "2017", id: "2017" }, { value: "2018", id: "2018" }, { value: "2019", id: "2019" }, { value: "2020", id: "2020" }, { value: "2021", id: "2021" }, { value: "2022", id: "2022" }, { value: "2023", id: "2023" }, { value: "2024", id: "2024" }, { value: "2025", id: "2025" }, { value: "2026", id: "2026" }, { value: "2027", id: "2027" }, { value: "2028", id: "2028" }, { value: "2029", id: "2029" }, { value: "2030", id: "2030" }, { value: "2031", id: "2031" }, { value: "2032", id: "2032" }, { value: "2033", id: "2033" }, { value: "2034", id: "2034" }, { value: "2034", id: "2034" }, { value: "2035", id: "2035" }, { value: "2036", id: "2036" }, { value: "2037", id: "2037" }, { value: "2038", id: "2038" }, { value: "2039", id: "2039" }, { value: "2040", id: "2040" }, { value: "2041", id: "2041" }, { value: "2042", id: "2042" }, { value: "2043", id: "2043" }, { value: "2044", id: "2044" }, { value: "2045", id: "2045" }, { value: "2046", id: "2046" }, { value: "2047", id: "2047" }, { value: "2048", id: "2048" }, { value: "2049", id: "2049" }, { value: "2050", id: "2050" }],
    YearMaster: [{ label: "2017", value: "2017" }, { label: "2018", value: "2018" }, { label: "2019", value: "2019" }, { label: "2020", value: "2020" }, { label: "2021", value: "2021" }, { label: "2022", value: "2022" }, { label: "2023", value: "2023" }, { label: "2024", value: "2024" }, { label: "2025", value: "2025" }, { label: "2026", value: "2026" }, { label: "2027", value: "2027" }, { label: "2028", value: "2028" }, { label: "2029", value: "2029" }, { label: "2030", value: "2030" }, { label: "2031", value: "2031" }, { label: "2032", value: "2032" }, { label: "2033", value: "2033" }, { label: "2034", value: "2034" },{ label: "2035", value: "2035" }, { label: "2036", value: "2036" }, { label: "2037", value: "2037" }, { label: "2038", value: "2038" }, { label: "2039", value: "2039" }, { label: "2040", value: "2040" }, { label: "2041", value: "2041" }, { label: "2042", value: "2042" }, { label: "2043", value: "2043" }, { label: "2044", value: "2044" }, { label: "2045", value: "2045" }, { label: "2046", value: "2046" }, { label: "2047", value: "2047" }, { label: "2048", value: "2048" }, { label: "2049", value: "2049" }, { label: "2050", value: "2050" }],
   
    NotificationFrequency: [{ value: "Daily", id: "D" }, { value: "Weekly", id: "W" }, { value: "FortNightly", id: "F" }, { value: "Monthly", id: "M" }, { value: "Quarterly", id: "Q" }, { value: "Instant", id: "I" }],
    // NoonMaster: [{ value: "None", id: "" },{ value: "HalfDay-ForeNoon-Leave", id: "F" }, { value: "HalfDay-AfterNoon-Leave", id: "A" }, { value: "FullDay", id: "D" }],
    NoonMaster: [{ label: "ForeNoon-Leave", value: "F" }, { label: "AfterNoon-Leave", value: "A" }, 
    // { label: "FullDay", value: "D" }
  ],
    ParticipateMaster: [{ value: "Yes", id: "Y" }, { value: "No", id: "N" }],
    // SignMasterMaster: [{ value: "None", id: "" }, { value: "Signed", id: "Y" }, { value: "Not Signed", id: "N" }],
    SignMasterMaster: [{ label: "Signed", value: "Y" }, { label: "Not Signed", value: "N" }],
    // EnrollMaster: [{ value: "None", id: "" }, { value: "Enrolled", id: "Y" }, { value: "Not Enrolled", id: "N" }],
    EnrollMaster: [{ label: "Enrolled", value: "Y" }, { label: "Not Enrolled", value: "N" }],
    BatchMaster: [{ name: "Select option", value: "" }, { name: "Database", value: "D" }, { name: "Bussiness", value: "B" }, { name: "Report", value: "R" }],
    // LeaveMaster: [{ value: "Sick", id: "S" }, { value: "Planned", id: "P" }, { value: "Casual", id: "C" }],
    LeaveMaster: [{ label: "Sick", value: "S" }, { label: "Planned", value: "P" }, { label: "Casual", value: "C" }],

    StudentLeaveMaster: [{ value: "Sick", id: "S" }, { value: "Planned", id: "P" }, { value: "Others", id: "C" }],
    // LeaveMasterStatus: [{ value: "Pending", id: "U" }, { value: "Approved", id: "A" }, { value: "Rejected", id: "R" }],
    LeaveMasterStatus: [{ label: "Pending", value: "U" }, { label: "Approved", value: "A" }, { label: "Rejected", value: "R" }],
    // UserTypeMaster: [{ value: "None", id: "" },{ value: "Management", id: "A" }, { value: "Other Staff", id: "O" }, { value: "Parent", id: "P" }, { value: "Student", id: "S" }, { value: "Teacher", id: "T" },],
    UserTypeMaster: [{ label: "Management/Admin", value: "A" }, { label: "Other Staff", value: "O" }, { label: "Parent", value: "P" }, { label: "Student", value: "S" }, { label: "Teacher", value: "T" },],
    // StaffTypeMaster: [{ value: "Management/Admin", id: "A" }, { value: "Other Staff", id: "O" }, { value: "Teacher", id: "T" },],
    StaffTypeMaster: [{ label: "Management/Admin", value: "A" }, { label: "Other Staff", value: "O" }, { label: "Teacher", value: "T" },],
    DateMaster: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"],
    FeeMaster: [],
    PeriodMaster: ["Select option", "1", "2", "3", "4", "5", "6", "7", "8"],
    // NotificationMaster: [{
    //     value: "None",
    //     id: ""
    // }, {
    //     value: "Video Assignment",
    //     id: "VideoAssignment"
    // }, {
    //     value: "ECircular",
    //     id: "ECircular"
    // }, {
    //     value: "Exam Schedule",
    //     id: "ExamSchedule"
    // }, {
    //     value: "Attendance",
    //     id: "Attendance"
    // }, {
    //     value: "Soft Skill",
    //     id: "SoftSkill"
    // }, {
    //     value: "Exam Assessment",
    //     id: "ExamAssessment"
    // }, {
    //     value: "Fee Notification",
    //     id: "FeeNotification"
    // }, {
    //     value: "Extra Curricular Activity/Events",
    //     id: "OtherActivity"
    // }, {
    //     value: "Homework",
    //     id: "I1"
    // }, {
    //     value: "Disciplinary Action",
    //     id: "I2"
    // }, {
    //     value: "Emergency",
    //     id: "I3"
    // }, {
    //     value: "Holiday Declaration",
    //     id: "I4"
    // }, {
    //     value: "Appreciation",
    //     id: "I5"
    // }, {
    //     value: "Other Instant Messages",
    //     id: "I6"
    // }],
    NotificationMaster: [ {
      label: "Video Assignment",
      value: "VideoAssignment"
  }, {
      label: "ECircular",
      value: "ECircular"
  }, {
      label: "Exam Schedule",
      value: "ExamSchedule"
  }, {
      label: "Attendance",
      value: "Attendance"
  }, {
      label: "Soft Skill",
      value: "SoftSkill"
  }, {
      label: "Exam Assessment",
      value: "ExamAssessment"
  }, {
      label: "Fee Notification",
      value: "FeeNotification"
  }, {
      label: "Extra Curricular Activity/Events",
      value: "OtherActivity"
  }, {
      label: "Homework",
      value: "I1"
  }, {
      label: "Disciplinary Action",
      value: "I2"
  }, {
      label: "Emergency",
      value: "I3"
  }, {
      label: "Holiday Declaration",
      value: "I4"
  }, {
      label: "Appreciation",
      value: "I5"
  }, {
      label: "Other Instant Messages",
      value: "I6"
  }],
    SubjectMaster: [],
    StandardMaster: [],
    ExamMaster: [],
    // ActivityTypeMaster: [{ value: "None", id: "" },{ value: "Sports", id: "S" }, { value: "Culturals", id: "C" },{ value: "Club events", id: "L" },{ value: "Special coaching classes", id: "P" }],
    ActivityTypeMaster: [{ label: "Sports", value: "S" }, { label: "Culturals", value: "C" },{ label: "Club events", value: "L" },{ label: "Special coaching classes", value: "P" }],
// starts 3.0 UI/UX
    // AttendanceNoonMaster: [{ value: "None", id: "" },{ value: "Forenoon", id: "F" }, { value: "AfterNoon", id: "A" }],
    AttendanceNoonMaster: [{ label: "Forenoon", value: "F" }, { label: "AfterNoon", value: "A" }],

    // AttendanceMaster: [{ value: "Period wise", id: "P" }, { value: "Day wise", id: "D" }, { value: "Noon wise", id: "N" }],
    AttendanceMaster: [{ label: "Period wise", value: "P" }, { label: "Day wise", value: "D" }, { label: "Noon wise", value: "N" }],
// ends 3.0 UI/UX
    // GenderMaster: [{ value: "Male", id: "M" }, { value: "Female", id: "F" }, { value: "Others", id: "O" }],

    GenderMaster: [{ label: "Male", value: "M" }, { label: "Female", value: "F" }, { label: "Others", value: "O" }],

    // LanguageMaster: [{ value: "English", id: "E" }, { value: "Local language", id: "O" }],
    LanguageMaster: [{ label: "English", value: "E" }, { label: "Local language", value: "O" }],

    SkillMaster: [{ value: "Communication", id: "1" }, { value: "Leadership", id: "2" }, { value: "Food Habit", id: "3" }, { value: "Being Social", id: "4" }, { value: "Team Work", id: "5" }, { value: "Discipline", id: "6" }, { value: "Dressing", id: "7" }],

    // CategoryMaster: [{ value: "None", id: "" },{ value: "Outstanding", id: "O" }, { value: "Good", id: "G" }, { value: "Improvement Required", id: "I" },{ value: "Very Good", id: "V" },{ value: "Below Target", id: "B" },{ value: "Above Target", id: "A" },{ value: "Target Met", id: "T" },{ value: "Poor", id: "R" },{ value: "Excellent", id: "X" },{ value: "Average", id: "E" }],

    CategoryMaster: [{ label: "Outstanding", value: "O" }, { label: "Good", value: "G" }, { label: "Improvement Required", value: "I" },{ label: "Very Good", value: "V" },{ label: "Below Target", value: "B" },{ label: "Above Target", value: "A" },{ label: "Target Met", value: "T" },{ label: "Poor", value: "R" },{ label: "Excellent", value: "X" },{ label: "Average", value: "E" }],

    CircularTypeMaster: [{ value: "Student", id: "S" }, { value: "Staff", id: "T" }],

    StudentStatusMaster: [{ value: "None", id: "" }, { value: "Studying", id: "O" }, { value: "Studied", id: "D" }],

    // RelationshipMaster: [{ value: "Father", id: "Father" }, { value: "Mother", id: "Mother" }, { value: "Grand Father", id: "Grand Father" }, { value: "Grand Mother", id: "Grand Mother" }, { value: "Guardian", id: "Guardian" }],

    RelationshipMaster: [{ label: "Father", value: "Father" }, { label: "Mother", value: "Mother" }, { label: "Grand Father", value: "Grand Father" }, { label: "Grand Mother", value: "Grand Mother" }, { label: "Guardian", value: "Guardian" }],


    StaffRelationshipMaster: [{ value: "Father", id: "Father" }, { value: "Mother", id: "Mother" }, { value: "Grand Father", id: "Grand Father" }, { value: "Grand Mother", id: "Grand Mother" }, { value: "Guardian", id: "Guardian" }, { value: "Husband", id: "Husband" }, { value: "Spouse", id: "Spouse" }],

    // BloodGroupMaster: [{ value: "A+", id: "A+" }, { value: "A-", id: "A-" }, { value: "B+", id: "B+" }, { value: "B-", id: "B-" }, { value: "O+", id: "O+" }, { value: "O-", id: "O-" }, { value: "AB+", id: "AB+" }, { value: "AB-", id: "AB-" }, { value: "A1B+", id: "A1B+" }, { value: "Others", id: "Others" }],

    BloodGroupMaster: [{ label: "A+", value: "A+" }, { label: "A-", value: "A-" }, { label: "B+", value: "B+" }, { label: "B-", value: "B-" }, { label: "O+", value: "O+" }, { label: "O-", value: "O-" }, { label: "AB+", value: "AB+" }, { label: "AB-", value: "AB-" }, { label: "A1B+", value: "A1B+" }, { label: "Others", value: "Others" }],

//     ResultMaster: [{
//         value: "None",
//         id: ""
//     }, {
//         value: "Winner",
//         id: "W"
//     }, {
//         value: "Runner",
//         id: "R"
//     }, {
//         value: "Gold Medal",
//         id: "G"
//     }, {
//         value: "Silver Medal",
//         id: "S"
//     }, {
//         value: "Bronze medal",
//         id: "B"
//     }, {
//         value: "First",
//         id: "F"
//     }, {
//         value: "Second",
//         id: "E"
//     }, {
//         value: "Third",
//         id: "T"
//     }, {
//         value: "Participation Award",
//         id: "P"
//     }, {
//         value: "No Result",
//         id: "O"
//     },
//     // start NEAI-195
//     {
//         value: "Not Applicable",
//         id: "N"
//     },
//     {
//         value: "Not Declared",
//         id: "D"
//     }
//       // end NEAI-195
    
// ],

ResultMaster: [{
  label: "Winner",
  value: "W"
}, {
  label: "Runner",
  value: "R"
}, {
  label: "Gold Medal",
  value: "G"
}, {
  label: "Silver Medal",
  value: "S"
}, {
  label: "Bronze medal",
  value: "B"
}, {
  label: "First",
  value: "F"
}, {
  label: "Second",
  value: "E"
}, {
  label: "Third",
  value: "T"
}, {
  label: "Participation Award",
  value: "P"
}, {
  label: "No Result",
  value: "O"
},
// start NEAI-195
{
  label: "Not Applicable",
  value: "N"
},
{
  label: "Not Declared",
  value: "D"
}
// end NEAI-195

],
    // NotificationStatusMaster: [{ value: "None", id: "" },{ value: "Success", id: "S" },{ value: "Failed", id: "F" }],

    NotificationStatusMaster: [{ label: "Success", value: "S" },{ label: "Failed", value: "F" }],
    // starts NEAI-286
  //  TimeZoneMaster: [{
  //       value: "None",
  //       id: ""
  //   }, {
  //       id: "Etc/GMT+12",
  //       value: "Etc/GMT+12 (UTC-12:00)"
  //   }, {
  //       id: "Pacific/Pago_Pago",
  //       value: "Pacific/Pago_Pago (UTC-11:00)"
  //   }, {
  //       id: "Pacific/Samoa",
  //       value: "Pacific/Samoa (UTC-11:00)"
  //   }, {
  //       id: "Pacific/Niue",
  //       value: "Pacific/Niue (UTC-11:00)"
  //   }, {
  //       id: "US/Samoa",
  //       value: "US/Samoa (UTC-11:00)"
  //   }, {
  //       id: "Etc/GMT+11",
  //       value: "Etc/GMT+11 (UTC-11:00)"
  //   }, {
  //       id: "Pacific/Midway",
  //       value: "Pacific/Midway (UTC-11:00)"
  //   }, {
  //       id: "Pacific/Honolulu",
  //       value: "Pacific/Honolulu (UTC-10:00)"
  //   }, {
  //       id: "Pacific/Rarotonga",
  //       value: "Pacific/Rarotonga (UTC-10:00)"
  //   }, {
  //       id: "Pacific/Tahiti",
  //       value: "Pacific/Tahiti (UTC-10:00)"
  //   }, {
  //       id: "Pacific/Johnston",
  //       value: "Pacific/Johnston (UTC-10:00)"
  //   }, {
  //       id: "US/Hawaii",
  //       value: "US/Hawaii (UTC-10:00)"
  //   }, {
  //       id: "SystemV/HST10",
  //       value: "SystemV/HST10 (UTC-10:00)"
  //   }, {
  //       id: "Etc/GMT+10",
  //       value: "Etc/GMT+10 (UTC-10:00)"
  //   }, {
  //       id: "Pacific/Marquesas",
  //       value: "Pacific/Marquesas (UTC-09:30)"
  //   }, {
  //       id: "Etc/GMT+9",
  //       value: "Etc/GMT+9 (UTC-09:00)"
  //   }, {
  //       id: "Pacific/Gambier",
  //       value: "Pacific/Gambier (UTC-09:00)"
  //   }, {
  //       id: "America/Atka",
  //       value: "America/Atka (UTC-09:00)"
  //   }, {
  //       id: "SystemV/YST9",
  //       value: "SystemV/YST9 (UTC-09:00)"
  //   }, {
  //       id: "America/Adak",
  //       value: "America/Adak (UTC-09:00)"
  //   }, {
  //       id: "US/Aleutian",
  //       value: "US/Aleutian (UTC-09:00)"
  //   }, {
  //       id: "Etc/GMT+8",
  //       value: "Etc/GMT+8 (UTC-08:00)"
  //   }, {
  //       id: "US/Alaska",
  //       value: "US/Alaska (UTC-08:00)"
  //   }, {
  //       id: "America/Juneau",
  //       value: "America/Juneau (UTC-08:00)"
  //   }, {
  //       id: "America/Metlakatla",
  //       value: "America/Metlakatla (UTC-08:00)"
  //   }, {
  //       id: "America/Yakutat",
  //       value: "America/Yakutat (UTC-08:00)"
  //   }, {
  //       id: "Pacific/Pitcairn",
  //       value: "Pacific/Pitcairn (UTC-08:00)"
  //   }, {
  //       id: "America/Sitka",
  //       value: "America/Sitka (UTC-08:00)"
  //   }, {
  //       id: "America/Anchorage",
  //       value: "America/Anchorage (UTC-08:00)"
  //   }, {
  //       id: "SystemV/PST8",
  //       value: "SystemV/PST8 (UTC-08:00)"
  //   }, {
  //       id: "America/Nome",
  //       value: "America/Nome (UTC-08:00)"
  //   }, {
  //       id: "SystemV/YST9YDT",
  //       value: "SystemV/YST9YDT (UTC-08:00)"
  //   }, {
  //       id: "Canada/Yukon",
  //       value: "Canada/Yukon (UTC-07:00)"
  //   }, {
  //       id: "US/Pacific-New",
  //       value: "US/Pacific-New (UTC-07:00)"
  //   }, {
  //       id: "Etc/GMT+7",
  //       value: "Etc/GMT+7 (UTC-07:00)"
  //   }, {
  //       id: "US/Arizona",
  //       value: "US/Arizona (UTC-07:00)"
  //   }, {
  //       id: "America/Dawson_Creek",
  //       value: "America/Dawson_Creek (UTC-07:00)"
  //   }, {
  //       id: "Canada/Pacific",
  //       value: "Canada/Pacific (UTC-07:00)"
  //   }, {
  //       id: "PST8PDT",
  //       value: "PST8PDT (UTC-07:00)"
  //   }, {
  //       id: "SystemV/MST7",
  //       value: "SystemV/MST7 (UTC-07:00)"
  //   }, {
  //       id: "America/Dawson",
  //       value: "America/Dawson (UTC-07:00)"
  //   }, {
  //       id: "Mexico/BajaNorte",
  //       value: "Mexico/BajaNorte (UTC-07:00)"
  //   }, {
  //       id: "America/Tijuana",
  //       value: "America/Tijuana (UTC-07:00)"
  //   }, {
  //       id: "America/Creston",
  //       value: "America/Creston (UTC-07:00)"
  //   }, {
  //       id: "America/Hermosillo",
  //       value: "America/Hermosillo (UTC-07:00)"
  //   }, {
  //       id: "America/Santa_Isabel",
  //       value: "America/Santa_Isabel (UTC-07:00)"
  //   }, {
  //       id: "America/Vancouver",
  //       value: "America/Vancouver (UTC-07:00)"
  //   }, {
  //       id: "America/Ensenada",
  //       value: "America/Ensenada (UTC-07:00)"
  //   }, {
  //       id: "America/Phoenix",
  //       value: "America/Phoenix (UTC-07:00)"
  //   }, {
  //       id: "America/Whitehorse",
  //       value: "America/Whitehorse (UTC-07:00)"
  //   }, {
  //       id: "America/Fort_Nelson",
  //       value: "America/Fort_Nelson (UTC-07:00)"
  //   }, {
  //       id: "SystemV/PST8PDT",
  //       value: "SystemV/PST8PDT (UTC-07:00)"
  //   }, {
  //       id: "America/Los_Angeles",
  //       value: "America/Los_Angeles (UTC-07:00)"
  //   }, {
  //       id: "US/Pacific",
  //       value: "US/Pacific (UTC-07:00)"
  //   }, {
  //       id: "America/El_Salvador",
  //       value: "America/El_Salvador (UTC-06:00)"
  //   }, {
  //       id: "America/Guatemala",
  //       value: "America/Guatemala (UTC-06:00)"
  //   }, {
  //       id: "America/Belize",
  //       value: "America/Belize (UTC-06:00)"
  //   }, {
  //       id: "America/Managua",
  //       value: "America/Managua (UTC-06:00)"
  //   }, {
  //       id: "America/Tegucigalpa",
  //       value: "America/Tegucigalpa (UTC-06:00)"
  //   }, {
  //       id: "Etc/GMT+6",
  //       value: "Etc/GMT+6 (UTC-06:00)"
  //   }, {
  //       id: "Pacific/Easter",
  //       value: "Pacific/Easter (UTC-06:00)"
  //   }, {
  //       id: "Mexico/BajaSur",
  //       value: "Mexico/BajaSur (UTC-06:00)"
  //   }, {
  //       id: "America/Regina",
  //       value: "America/Regina (UTC-06:00)"
  //   }, {
  //       id: "America/Denver",
  //       value: "America/Denver (UTC-06:00)"
  //   }, {
  //       id: "Pacific/Galapagos",
  //       value: "Pacific/Galapagos (UTC-06:00)"
  //   }, {
  //       id: "America/Yellowknife",
  //       value: "America/Yellowknife (UTC-06:00)"
  //   }, {
  //       id: "America/Swift_Current",
  //       value: "America/Swift_Current (UTC-06:00)"
  //   }, {
  //       id: "America/Inuvik",
  //       value: "America/Inuvik (UTC-06:00)"
  //   }, {
  //       id: "America/Mazatlan",
  //       value: "America/Mazatlan (UTC-06:00)"
  //   }, {
  //       id: "America/Boise",
  //       value: "America/Boise (UTC-06:00)"
  //   }, {
  //       id: "America/Costa_Rica",
  //       value: "America/Costa_Rica (UTC-06:00)"
  //   }, {
  //       id: "MST7MDT",
  //       value: "MST7MDT (UTC-06:00)"
  //   }, {
  //       id: "SystemV/CST6",
  //       value: "SystemV/CST6 (UTC-06:00)"
  //   }, {
  //       id: "America/Chihuahua",
  //       value: "America/Chihuahua (UTC-06:00)"
  //   }, {
  //       id: "America/Ojinaga",
  //       value: "America/Ojinaga (UTC-06:00)"
  //   }, {
  //       id: "Chile/EasterIsland",
  //       value: "Chile/EasterIsland (UTC-06:00)"
  //   }, {
  //       id: "US/Mountain",
  //       value: "US/Mountain (UTC-06:00)"
  //   }, {
  //       id: "America/Edmonton",
  //       value: "America/Edmonton (UTC-06:00)"
  //   }, {
  //       id: "Canada/Mountain",
  //       value: "Canada/Mountain (UTC-06:00)"
  //   }, {
  //       id: "America/Cambridge_Bay",
  //       value: "America/Cambridge_Bay (UTC-06:00)"
  //   }, {
  //       id: "Navajo",
  //       value: "Navajo (UTC-06:00)"
  //   }, {
  //       id: "SystemV/MST7MDT",
  //       value: "SystemV/MST7MDT (UTC-06:00)"
  //   }, {
  //       id: "Canada/Saskatchewan",
  //       value: "Canada/Saskatchewan (UTC-06:00)"
  //   }, {
  //       id: "America/Shiprock",
  //       value: "America/Shiprock (UTC-06:00)"
  //   }, {
  //       id: "America/Panama",
  //       value: "America/Panama (UTC-05:00)"
  //   }, {
  //       id: "America/Chicago",
  //       value: "America/Chicago (UTC-05:00)"
  //   }, {
  //       id: "America/Eirunepe",
  //       value: "America/Eirunepe (UTC-05:00)"
  //   }, {
  //       id: "Etc/GMT+5",
  //       value: "Etc/GMT+5 (UTC-05:00)"
  //   }, {
  //       id: "Mexico/General",
  //       value: "Mexico/General (UTC-05:00)"
  //   }, {
  //       id: "America/Porto_Acre",
  //       value: "America/Porto_Acre (UTC-05:00)"
  //   }, {
  //       id: "America/Guayaquil",
  //       value: "America/Guayaquil (UTC-05:00)"
  //   }, {
  //       id: "America/Rankin_Inlet",
  //       value: "America/Rankin_Inlet (UTC-05:00)"
  //   }, {
  //       id: "US/Central",
  //       value: "US/Central (UTC-05:00)"
  //   }, {
  //       id: "America/Rainy_River",
  //       value: "America/Rainy_River (UTC-05:00)"
  //   }, {
  //       id: "America/Indiana/Knox",
  //       value: "America/Indiana/Knox (UTC-05:00)"
  //   }, {
  //       id: "America/North_Dakota/Beulah",
  //       value: "America/North_Dakota/Beulah (UTC-05:00)"
  //   }, {
  //       id: "America/Monterrey",
  //       value: "America/Monterrey (UTC-05:00)"
  //   }, {
  //       id: "America/Jamaica",
  //       value: "America/Jamaica (UTC-05:00)"
  //   }, {
  //       id: "America/Atikokan",
  //       value: "America/Atikokan (UTC-05:00)"
  //   }, {
  //       id: "America/Coral_Harbour",
  //       value: "America/Coral_Harbour (UTC-05:00)"
  //   }, {
  //       id: "America/North_Dakota/Center",
  //       value: "America/North_Dakota/Center (UTC-05:00)"
  //   }, {
  //       id: "America/Cayman",
  //       value: "America/Cayman (UTC-05:00)"
  //   }, {
  //       id: "America/Indiana/Tell_City",
  //       value: "America/Indiana/Tell_City (UTC-05:00)"
  //   }, {
  //       id: "America/Mexico_City",
  //       value: "America/Mexico_City (UTC-05:00)"
  //   }, {
  //       id: "America/Matamoros",
  //       value: "America/Matamoros (UTC-05:00)"
  //   }, {
  //       id: "CST6CDT",
  //       value: "CST6CDT (UTC-05:00)"
  //   }, {
  //       id: "America/Knox_IN",
  //       value: "America/Knox_IN (UTC-05:00)"
  //   }, {
  //       id: "America/Bogota",
  //       value: "America/Bogota (UTC-05:00)"
  //   }, {
  //       id: "America/Menominee",
  //       value: "America/Menominee (UTC-05:00)"
  //   }, {
  //       id: "America/Resolute",
  //       value: "America/Resolute (UTC-05:00)"
  //   }, {
  //       id: "SystemV/EST5",
  //       value: "SystemV/EST5 (UTC-05:00)"
  //   }, {
  //       id: "Canada/Central",
  //       value: "Canada/Central (UTC-05:00)"
  //   }, {
  //       id: "Brazil/Acre",
  //       value: "Brazil/Acre (UTC-05:00)"
  //   }, {
  //       id: "America/Cancun",
  //       value: "America/Cancun (UTC-05:00)"
  //   }, {
  //       id: "America/Lima",
  //       value: "America/Lima (UTC-05:00)"
  //   }, {
  //       id: "America/Bahia_Banderas",
  //       value: "America/Bahia_Banderas (UTC-05:00)"
  //   }, {
  //       id: "US/Indiana-Starke",
  //       value: "US/Indiana-Starke (UTC-05:00)"
  //   }, {
  //       id: "America/Rio_Branco",
  //       value: "America/Rio_Branco (UTC-05:00)"
  //   }, {
  //       id: "SystemV/CST6CDT",
  //       value: "SystemV/CST6CDT (UTC-05:00)"
  //   }, {
  //       id: "Jamaica",
  //       value: "Jamaica (UTC-05:00)"
  //   }, {
  //       id: "America/Merida",
  //       value: "America/Merida (UTC-05:00)"
  //   }, {
  //       id: "America/North_Dakota/New_Salem",
  //       value: "America/North_Dakota/New_Salem (UTC-05:00)"
  //   }, {
  //       id: "America/Winnipeg",
  //       value: "America/Winnipeg (UTC-05:00)"
  //   }, {
  //       id: "America/Cuiaba",
  //       value: "America/Cuiaba (UTC-04:00)"
  //   }, {
  //       id: "America/Marigot",
  //       value: "America/Marigot (UTC-04:00)"
  //   }, {
  //       id: "America/Indiana/Petersburg",
  //       value: "America/Indiana/Petersburg (UTC-04:00)"
  //   }, {
  //       id: "Chile/Continental",
  //       value: "Chile/Continental (UTC-04:00)"
  //   }, {
  //       id: "America/Grand_Turk",
  //       value: "America/Grand_Turk (UTC-04:00)"
  //   }, {
  //       id: "Cuba",
  //       value: "Cuba (UTC-04:00)"
  //   }, {
  //       id: "Etc/GMT+4",
  //       value: "Etc/GMT+4 (UTC-04:00)"
  //   }, {
  //       id: "America/Manaus",
  //       value: "America/Manaus (UTC-04:00)"
  //   }, {
  //       id: "America/Fort_Wayne",
  //       value: "America/Fort_Wayne (UTC-04:00)"
  //   }, {
  //       id: "America/St_Thomas",
  //       value: "America/St_Thomas (UTC-04:00)"
  //   }, {
  //       id: "America/Anguilla",
  //       value: "America/Anguilla (UTC-04:00)"
  //   }, {
  //       id: "America/Havana",
  //       value: "America/Havana (UTC-04:00)"
  //   }, {
  //       id: "US/Michigan",
  //       value: "US/Michigan (UTC-04:00)"
  //   }, {
  //       id: "America/Barbados",
  //       value: "America/Barbados (UTC-04:00)"
  //   }, {
  //       id: "America/Louisville",
  //       value: "America/Louisville (UTC-04:00)"
  //   }, {
  //       id: "America/Curacao",
  //       value: "America/Curacao (UTC-04:00)"
  //   }, {
  //       id: "America/Guyana",
  //       value: "America/Guyana (UTC-04:00)"
  //   }, {
  //       id: "America/Martinique",
  //       value: "America/Martinique (UTC-04:00)"
  //   }, {
  //       id: "America/Puerto_Rico",
  //       value: "America/Puerto_Rico (UTC-04:00)"
  //   }, {
  //       id: "America/Port_of_Spain",
  //       value: "America/Port_of_Spain (UTC-04:00)"
  //   }, {
  //       id: "SystemV/AST4",
  //       value: "SystemV/AST4 (UTC-04:00)"
  //   }, {
  //       id: "America/Indiana/Vevay",
  //       value: "America/Indiana/Vevay (UTC-04:00)"
  //   }, {
  //       id: "America/Indiana/Vincennes",
  //       value: "America/Indiana/Vincennes (UTC-04:00)"
  //   }, {
  //       id: "America/Kralendijk",
  //       value: "America/Kralendijk (UTC-04:00)"
  //   }, {
  //       id: "America/Antigua",
  //       value: "America/Antigua (UTC-04:00)"
  //   }, {
  //       id: "America/Indianapolis",
  //       value: "America/Indianapolis (UTC-04:00)"
  //   }, {
  //       id: "America/Iqaluit",
  //       value: "America/Iqaluit (UTC-04:00)"
  //   }, {
  //       id: "America/St_Vincent",
  //       value: "America/St_Vincent (UTC-04:00)"
  //   }, {
  //       id: "America/Kentucky/Louisville",
  //       value: "America/Kentucky/Louisville (UTC-04:00)"
  //   }, {
  //       id: "America/Dominica",
  //       value: "America/Dominica (UTC-04:00)"
  //   }, {
  //       id: "America/Asuncion",
  //       value: "America/Asuncion (UTC-04:00)"
  //   }, {
  //       id: "EST5EDT",
  //       value: "EST5EDT (UTC-04:00)"
  //   }, {
  //       id: "America/Nassau",
  //       value: "America/Nassau (UTC-04:00)"
  //   }, {
  //       id: "America/Kentucky/Monticello",
  //       value: "America/Kentucky/Monticello (UTC-04:00)"
  //   }, {
  //       id: "Brazil/West",
  //       value: "Brazil/West (UTC-04:00)"
  //   }, {
  //       id: "America/Aruba",
  //       value: "America/Aruba (UTC-04:00)"
  //   }, {
  //       id: "America/Indiana/Indianapolis",
  //       value: "America/Indiana/Indianapolis (UTC-04:00)"
  //   }, {
  //       id: "America/Santiago",
  //       value: "America/Santiago (UTC-04:00)"
  //   }, {
  //       id: "America/La_Paz",
  //       value: "America/La_Paz (UTC-04:00)"
  //   }, {
  //       id: "America/Thunder_Bay",
  //       value: "America/Thunder_Bay (UTC-04:00)"
  //   }, {
  //       id: "America/Indiana/Marengo",
  //       value: "America/Indiana/Marengo (UTC-04:00)"
  //   }, {
  //       id: "America/Blanc-Sablon",
  //       value: "America/Blanc-Sablon (UTC-04:00)"
  //   }, {
  //       id: "America/Santo_Domingo",
  //       value: "America/Santo_Domingo (UTC-04:00)"
  //   }, {
  //       id: "US/Eastern",
  //       value: "US/Eastern (UTC-04:00)"
  //   }, {
  //       id: "Canada/Eastern",
  //       value: "Canada/Eastern (UTC-04:00)"
  //   }, {
  //       id: "America/Port-au-Prince",
  //       value: "America/Port-au-Prince (UTC-04:00)"
  //   }, {
  //       id: "America/St_Barthelemy",
  //       value: "America/St_Barthelemy (UTC-04:00)"
  //   }, {
  //       id: "America/Nipigon",
  //       value: "America/Nipigon (UTC-04:00)"
  //   }, {
  //       id: "US/East-Indiana",
  //       value: "US/East-Indiana (UTC-04:00)"
  //   }, {
  //       id: "America/St_Lucia",
  //       value: "America/St_Lucia (UTC-04:00)"
  //   }, {
  //       id: "America/Montserrat",
  //       value: "America/Montserrat (UTC-04:00)"
  //   }, {
  //       id: "America/Lower_Princes",
  //       value: "America/Lower_Princes (UTC-04:00)"
  //   }, {
  //       id: "America/Detroit",
  //       value: "America/Detroit (UTC-04:00)"
  //   }, {
  //       id: "America/Tortola",
  //       value: "America/Tortola (UTC-04:00)"
  //   }, {
  //       id: "America/Porto_Velho",
  //       value: "America/Porto_Velho (UTC-04:00)"
  //   }, {
  //       id: "America/Campo_Grande",
  //       value: "America/Campo_Grande (UTC-04:00)"
  //   }, {
  //       id: "America/Virgin",
  //       value: "America/Virgin (UTC-04:00)"
  //   }, {
  //       id: "America/Pangnirtung",
  //       value: "America/Pangnirtung (UTC-04:00)"
  //   }, {
  //       id: "America/Montreal",
  //       value: "America/Montreal (UTC-04:00)"
  //   }, {
  //       id: "America/Indiana/Winamac",
  //       value: "America/Indiana/Winamac (UTC-04:00)"
  //   }, {
  //       id: "America/Boa_Vista",
  //       value: "America/Boa_Vista (UTC-04:00)"
  //   }, {
  //       id: "America/Grenada",
  //       value: "America/Grenada (UTC-04:00)"
  //   }, {
  //       id: "America/New_York",
  //       value: "America/New_York (UTC-04:00)"
  //   }, {
  //       id: "America/St_Kitts",
  //       value: "America/St_Kitts (UTC-04:00)"
  //   }, {
  //       id: "America/Caracas",
  //       value: "America/Caracas (UTC-04:00)"
  //   }, {
  //       id: "America/Guadeloupe",
  //       value: "America/Guadeloupe (UTC-04:00)"
  //   }, {
  //       id: "America/Toronto",
  //       value: "America/Toronto (UTC-04:00)"
  //   }, {
  //       id: "SystemV/EST5EDT",
  //       value: "SystemV/EST5EDT (UTC-04:00)"
  //   }, {
  //       id: "America/Argentina/Catamarca",
  //       value: "America/Argentina/Catamarca (UTC-03:00)"
  //   }, {
  //       id: "Canada/Atlantic",
  //       value: "Canada/Atlantic (UTC-03:00)"
  //   }, {
  //       id: "America/Argentina/Cordoba",
  //       value: "America/Argentina/Cordoba (UTC-03:00)"
  //   }, {
  //       id: "America/Araguaina",
  //       value: "America/Araguaina (UTC-03:00)"
  //   }, {
  //       id: "America/Argentina/Salta",
  //       value: "America/Argentina/Salta (UTC-03:00)"
  //   }, {
  //       id: "Etc/GMT+3",
  //       value: "Etc/GMT+3 (UTC-03:00)"
  //   }, {
  //       id: "America/Montevideo",
  //       value: "America/Montevideo (UTC-03:00)"
  //   }, {
  //       id: "Brazil/East",
  //       value: "Brazil/East (UTC-03:00)"
  //   }, {
  //       id: "America/Argentina/Mendoza",
  //       value: "America/Argentina/Mendoza (UTC-03:00)"
  //   }, {
  //       id: "America/Argentina/Rio_Gallegos",
  //       value: "America/Argentina/Rio_Gallegos (UTC-03:00)"
  //   }, {
  //       id: "America/Catamarca",
  //       value: "America/Catamarca (UTC-03:00)"
  //   }, {
  //       id: "America/Cordoba",
  //       value: "America/Cordoba (UTC-03:00)"
  //   }, {
  //       id: "America/Sao_Paulo",
  //       value: "America/Sao_Paulo (UTC-03:00)"
  //   }, {
  //       id: "America/Argentina/Jujuy",
  //       value: "America/Argentina/Jujuy (UTC-03:00)"
  //   }, {
  //       id: "America/Cayenne",
  //       value: "America/Cayenne (UTC-03:00)"
  //   }, {
  //       id: "America/Recife",
  //       value: "America/Recife (UTC-03:00)"
  //   }, {
  //       id: "America/Buenos_Aires",
  //       value: "America/Buenos_Aires (UTC-03:00)"
  //   }, {
  //       id: "America/Paramaribo",
  //       value: "America/Paramaribo (UTC-03:00)"
  //   }, {
  //       id: "America/Moncton",
  //       value: "America/Moncton (UTC-03:00)"
  //   }, {
  //       id: "America/Mendoza",
  //       value: "America/Mendoza (UTC-03:00)"
  //   }, {
  //       id: "America/Santarem",
  //       value: "America/Santarem (UTC-03:00)"
  //   }, {
  //       id: "Atlantic/Bermuda",
  //       value: "Atlantic/Bermuda (UTC-03:00)"
  //   }, {
  //       id: "America/Maceio",
  //       value: "America/Maceio (UTC-03:00)"
  //   }, {
  //       id: "Atlantic/Stanley",
  //       value: "Atlantic/Stanley (UTC-03:00)"
  //   }, {
  //       id: "America/Halifax",
  //       value: "America/Halifax (UTC-03:00)"
  //   }, {
  //       id: "Antarctica/Rothera",
  //       value: "Antarctica/Rothera (UTC-03:00)"
  //   }, {
  //       id: "America/Argentina/San_Luis",
  //       value: "America/Argentina/San_Luis (UTC-03:00)"
  //   }, {
  //       id: "America/Argentina/Ushuaia",
  //       value: "America/Argentina/Ushuaia (UTC-03:00)"
  //   }, {
  //       id: "Antarctica/Palmer",
  //       value: "Antarctica/Palmer (UTC-03:00)"
  //   }, {
  //       id: "America/Punta_Arenas",
  //       value: "America/Punta_Arenas (UTC-03:00)"
  //   }, {
  //       id: "America/Glace_Bay",
  //       value: "America/Glace_Bay (UTC-03:00)"
  //   }, {
  //       id: "America/Fortaleza",
  //       value: "America/Fortaleza (UTC-03:00)"
  //   }, {
  //       id: "America/Thule",
  //       value: "America/Thule (UTC-03:00)"
  //   }, {
  //       id: "America/Argentina/La_Rioja",
  //       value: "America/Argentina/La_Rioja (UTC-03:00)"
  //   }, {
  //       id: "America/Belem",
  //       value: "America/Belem (UTC-03:00)"
  //   }, {
  //       id: "America/Jujuy",
  //       value: "America/Jujuy (UTC-03:00)"
  //   }, {
  //       id: "America/Bahia",
  //       value: "America/Bahia (UTC-03:00)"
  //   }, {
  //       id: "America/Goose_Bay",
  //       value: "America/Goose_Bay (UTC-03:00)"
  //   }, {
  //       id: "America/Argentina/San_Juan",
  //       value: "America/Argentina/San_Juan (UTC-03:00)"
  //   }, {
  //       id: "America/Argentina/ComodRivadavia",
  //       value: "America/Argentina/ComodRivadavia (UTC-03:00)"
  //   }, {
  //       id: "America/Argentina/Tucuman",
  //       value: "America/Argentina/Tucuman (UTC-03:00)"
  //   }, {
  //       id: "America/Rosario",
  //       value: "America/Rosario (UTC-03:00)"
  //   }, {
  //       id: "SystemV/AST4ADT",
  //       value: "SystemV/AST4ADT (UTC-03:00)"
  //   }, {
  //       id: "America/Argentina/Buenos_Aires",
  //       value: "America/Argentina/Buenos_Aires (UTC-03:00)"
  //   }, {
  //       id: "America/St_Johns",
  //       value: "America/St_Johns (UTC-02:30)"
  //   }, {
  //       id: "Canada/Newfoundland",
  //       value: "Canada/Newfoundland (UTC-02:30)"
  //   }, {
  //       id: "America/Miquelon",
  //       value: "America/Miquelon (UTC-02:00)"
  //   }, {
  //       id: "Etc/GMT+2",
  //       value: "Etc/GMT+2 (UTC-02:00)"
  //   }, {
  //       id: "America/Godthab",
  //       value: "America/Godthab (UTC-02:00)"
  //   }, {
  //       id: "America/Noronha",
  //       value: "America/Noronha (UTC-02:00)"
  //   }, {
  //       id: "Brazil/DeNoronha",
  //       value: "Brazil/DeNoronha (UTC-02:00)"
  //   }, {
  //       id: "Atlantic/South_Georgia",
  //       value: "Atlantic/South_Georgia (UTC-02:00)"
  //   }, {
  //       id: "Etc/GMT+1",
  //       value: "Etc/GMT+1 (UTC-01:00)"
  //   }, {
  //       id: "Atlantic/Cape_Verde",
  //       value: "Atlantic/Cape_Verde (UTC-01:00)"
  //   }, {
  //       id: "Pacific/Kiritimati",
  //       value: "Pacific/Kiritimati (UTC+14:00)"
  //   }, {
  //       id: "Etc/GMT-14",
  //       value: "Etc/GMT-14 (UTC+14:00)"
  //   }, {
  //       id: "Pacific/Fakaofo",
  //       value: "Pacific/Fakaofo (UTC+13:00)"
  //   }, {
  //       id: "Pacific/Enderbury",
  //       value: "Pacific/Enderbury (UTC+13:00)"
  //   }, {
  //       id: "Pacific/Apia",
  //       value: "Pacific/Apia (UTC+13:00)"
  //   }, {
  //       id: "Pacific/Tongatapu",
  //       value: "Pacific/Tongatapu (UTC+13:00)"
  //   }, {
  //       id: "Etc/GMT-13",
  //       value: "Etc/GMT-13 (UTC+13:00)"
  //   }, {
  //       id: "NZ-CHAT",
  //       value: "NZ-CHAT (UTC+12:45)"
  //   }, {
  //       id: "Pacific/Chatham",
  //       value: "Pacific/Chatham (UTC+12:45)"
  //   }, {
  //       id: "Pacific/Kwajalein",
  //       value: "Pacific/Kwajalein (UTC+12:00)"
  //   }, {
  //       id: "Antarctica/McMurdo",
  //       value: "Antarctica/McMurdo (UTC+12:00)"
  //   }, {
  //       id: "Pacific/Wallis",
  //       value: "Pacific/Wallis (UTC+12:00)"
  //   }, {
  //       id: "Pacific/Fiji",
  //       value: "Pacific/Fiji (UTC+12:00)"
  //   }, {
  //       id: "Pacific/Funafuti",
  //       value: "Pacific/Funafuti (UTC+12:00)"
  //   }, {
  //       id: "Pacific/Nauru",
  //       value: "Pacific/Nauru (UTC+12:00)"
  //   }, {
  //       id: "Kwajalein",
  //       value: "Kwajalein (UTC+12:00)"
  //   }, {
  //       id: "NZ",
  //       value: "NZ (UTC+12:00)"
  //   }, {
  //       id: "Pacific/Wake",
  //       value: "Pacific/Wake (UTC+12:00)"
  //   }, {
  //       id: "Antarctica/South_Pole",
  //       value: "Antarctica/South_Pole (UTC+12:00)"
  //   }, {
  //       id: "Pacific/Tarawa",
  //       value: "Pacific/Tarawa (UTC+12:00)"
  //   }, {
  //       id: "Pacific/Auckland",
  //       value: "Pacific/Auckland (UTC+12:00)"
  //   }, {
  //       id: "Asia/Kamchatka",
  //       value: "Asia/Kamchatka (UTC+12:00)"
  //   }, {
  //       id: "Etc/GMT-12",
  //       value: "Etc/GMT-12 (UTC+12:00)"
  //   }, {
  //       id: "Asia/Anadyr",
  //       value: "Asia/Anadyr (UTC+12:00)"
  //   }, {
  //       id: "Pacific/Majuro",
  //       value: "Pacific/Majuro (UTC+12:00)"
  //   }, {
  //       id: "Pacific/Ponape",
  //       value: "Pacific/Ponape (UTC+11:00)"
  //   }, {
  //       id: "Pacific/Bougainville",
  //       value: "Pacific/Bougainville (UTC+11:00)"
  //   }, {
  //       id: "Antarctica/Macquarie",
  //       value: "Antarctica/Macquarie (UTC+11:00)"
  //   }, {
  //       id: "Pacific/Pohnpei",
  //       value: "Pacific/Pohnpei (UTC+11:00)"
  //   }, {
  //       id: "Pacific/Efate",
  //       value: "Pacific/Efate (UTC+11:00)"
  //   }, {
  //       id: "Pacific/Norfolk",
  //       value: "Pacific/Norfolk (UTC+11:00)"
  //   }, {
  //       id: "Asia/Magadan",
  //       value: "Asia/Magadan (UTC+11:00)"
  //   }, {
  //       id: "Pacific/Kosrae",
  //       value: "Pacific/Kosrae (UTC+11:00)"
  //   }, {
  //       id: "Asia/Sakhalin",
  //       value: "Asia/Sakhalin (UTC+11:00)"
  //   }, {
  //       id: "Pacific/Noumea",
  //       value: "Pacific/Noumea (UTC+11:00)"
  //   }, {
  //       id: "Etc/GMT-11",
  //       value: "Etc/GMT-11 (UTC+11:00)"
  //   }, {
  //       id: "Asia/Srednekolymsk",
  //       value: "Asia/Srednekolymsk (UTC+11:00)"
  //   }, {
  //       id: "Pacific/Guadalcanal",
  //       value: "Pacific/Guadalcanal (UTC+11:00)"
  //   }, {
  //       id: "Australia/Lord_Howe",
  //       value: "Australia/Lord_Howe (UTC+10:30)"
  //   }, {
  //       id: "Australia/LHI",
  //       value: "Australia/LHI (UTC+10:30)"
  //   }, {
  //       id: "Australia/Hobart",
  //       value: "Australia/Hobart (UTC+10:00)"
  //   }, {
  //       id: "Pacific/Yap",
  //       value: "Pacific/Yap (UTC+10:00)"
  //   }, {
  //       id: "Australia/Tasmania",
  //       value: "Australia/Tasmania (UTC+10:00)"
  //   }, {
  //       id: "Pacific/Port_Moresby",
  //       value: "Pacific/Port_Moresby (UTC+10:00)"
  //   }, {
  //       id: "Australia/ACT",
  //       value: "Australia/ACT (UTC+10:00)"
  //   }, {
  //       id: "Australia/Victoria",
  //       value: "Australia/Victoria (UTC+10:00)"
  //   }, {
  //       id: "Pacific/Chuuk",
  //       value: "Pacific/Chuuk (UTC+10:00)"
  //   }, {
  //       id: "Australia/Queensland",
  //       value: "Australia/Queensland (UTC+10:00)"
  //   }, {
  //       id: "Australia/Canberra",
  //       value: "Australia/Canberra (UTC+10:00)"
  //   }, {
  //       id: "Australia/Currie",
  //       value: "Australia/Currie (UTC+10:00)"
  //   }, {
  //       id: "Pacific/Guam",
  //       value: "Pacific/Guam (UTC+10:00)"
  //   }, {
  //       id: "Pacific/Truk",
  //       value: "Pacific/Truk (UTC+10:00)"
  //   }, {
  //       id: "Australia/NSW",
  //       value: "Australia/NSW (UTC+10:00)"
  //   }, {
  //       id: "Asia/Vladivostok",
  //       value: "Asia/Vladivostok (UTC+10:00)"
  //   }, {
  //       id: "Pacific/Saipan",
  //       value: "Pacific/Saipan (UTC+10:00)"
  //   }, {
  //       id: "Antarctica/DumontDUrville",
  //       value: "Antarctica/DumontDUrville (UTC+10:00)"
  //   }, {
  //       id: "Australia/Sydney",
  //       value: "Australia/Sydney (UTC+10:00)"
  //   }, {
  //       id: "Australia/Brisbane",
  //       value: "Australia/Brisbane (UTC+10:00)"
  //   }, {
  //       id: "Etc/GMT-10",
  //       value: "Etc/GMT-10 (UTC+10:00)"
  //   }, {
  //       id: "Asia/Ust-Nera",
  //       value: "Asia/Ust-Nera (UTC+10:00)"
  //   }, {
  //       id: "Australia/Melbourne",
  //       value: "Australia/Melbourne (UTC+10:00)"
  //   }, {
  //       id: "Australia/Lindeman",
  //       value: "Australia/Lindeman (UTC+10:00)"
  //   }, {
  //       id: "Australia/North",
  //       value: "Australia/North (UTC+09:30)"
  //   }, {
  //       id: "Australia/Yancowinna",
  //       value: "Australia/Yancowinna (UTC+09:30)"
  //   }, {
  //       id: "Australia/Adelaide",
  //       value: "Australia/Adelaide (UTC+09:30)"
  //   }, {
  //       id: "Australia/Broken_Hill",
  //       value: "Australia/Broken_Hill (UTC+09:30)"
  //   }, {
  //       id: "Australia/South",
  //       value: "Australia/South (UTC+09:30)"
  //   }, {
  //       id: "Australia/Darwin",
  //       value: "Australia/Darwin (UTC+09:30)"
  //   }, {
  //       id: "Etc/GMT-9",
  //       value: "Etc/GMT-9 (UTC+09:00)"
  //   }, {
  //       id: "Pacific/Palau",
  //       value: "Pacific/Palau (UTC+09:00)"
  //   }, {
  //       id: "Asia/Chita",
  //       value: "Asia/Chita (UTC+09:00)"
  //   }, {
  //       id: "Asia/Dili",
  //       value: "Asia/Dili (UTC+09:00)"
  //   }, {
  //       id: "Asia/Jayapura",
  //       value: "Asia/Jayapura (UTC+09:00)"
  //   }, {
  //       id: "Asia/Yakutsk",
  //       value: "Asia/Yakutsk (UTC+09:00)"
  //   }, {
  //       id: "Asia/Pyongyang",
  //       value: "Asia/Pyongyang (UTC+09:00)"
  //   }, {
  //       id: "ROK",
  //       value: "ROK (UTC+09:00)"
  //   }, {
  //       id: "Asia/Seoul",
  //       value: "Asia/Seoul (UTC+09:00)"
  //   }, {
  //       id: "Asia/Khandyga",
  //       value: "Asia/Khandyga (UTC+09:00)"
  //   }, {
  //       id: "Japan",
  //       value: "Japan (UTC+09:00)"
  //   }, {
  //       id: "Asia/Tokyo",
  //       value: "Asia/Tokyo (UTC+09:00)"
  //   }, {
  //       id: "Australia/Eucla",
  //       value: "Australia/Eucla (UTC+08:45)"
  //   }, {
  //       id: "Asia/Kuching",
  //       value: "Asia/Kuching (UTC+08:00)"
  //   }, {
  //       id: "Asia/Chungking",
  //       value: "Asia/Chungking (UTC+08:00)"
  //   }, {
  //       id: "Etc/GMT-8",
  //       value: "Etc/GMT-8 (UTC+08:00)"
  //   }, {
  //       id: "Australia/Perth",
  //       value: "Australia/Perth (UTC+08:00)"
  //   }, {
  //       id: "Asia/Macao",
  //       value: "Asia/Macao (UTC+08:00)"
  //   }, {
  //       id: "Asia/Macau",
  //       value: "Asia/Macau (UTC+08:00)"
  //   }, {
  //       id: "Asia/Choibalsan",
  //       value: "Asia/Choibalsan (UTC+08:00)"
  //   }, {
  //       id: "Asia/Shanghai",
  //       value: "Asia/Shanghai (UTC+08:00)"
  //   }, {
  //       id: "Antarctica/Casey",
  //       value: "Antarctica/Casey (UTC+08:00)"
  //   }, {
  //       id: "Asia/Ulan_Bator",
  //       value: "Asia/Ulan_Bator (UTC+08:00)"
  //   }, {
  //       id: "Asia/Chongqing",
  //       value: "Asia/Chongqing (UTC+08:00)"
  //   }, {
  //       id: "Asia/Ulaanbaatar",
  //       value: "Asia/Ulaanbaatar (UTC+08:00)"
  //   }, {
  //       id: "Asia/Taipei",
  //       value: "Asia/Taipei (UTC+08:00)"
  //   }, {
  //       id: "Asia/Manila",
  //       value: "Asia/Manila (UTC+08:00)"
  //   }, {
  //       id: "PRC",
  //       value: "PRC (UTC+08:00)"
  //   }, {
  //       id: "Asia/Ujung_Pandang",
  //       value: "Asia/Ujung_Pandang (UTC+08:00)"
  //   }, {
  //       id: "Asia/Harbin",
  //       value: "Asia/Harbin (UTC+08:00)"
  //   }, {
  //       id: "Singapore",
  //       value: "Singapore (UTC+08:00)"
  //   }, {
  //       id: "Asia/Brunei",
  //       value: "Asia/Brunei (UTC+08:00)"
  //   }, {
  //       id: "Australia/West",
  //       value: "Australia/West (UTC+08:00)"
  //   }, {
  //       id: "Asia/Hong_Kong",
  //       value: "Asia/Hong_Kong (UTC+08:00)"
  //   }, {
  //       id: "Asia/Makassar",
  //       value: "Asia/Makassar (UTC+08:00)"
  //   }, {
  //       id: "Hongkong",
  //       value: "Hongkong (UTC+08:00)"
  //   }, {
  //       id: "Asia/Kuala_Lumpur",
  //       value: "Asia/Kuala_Lumpur (UTC+08:00)"
  //   }, {
  //       id: "Asia/Irkutsk",
  //       value: "Asia/Irkutsk (UTC+08:00)"
  //   }, {
  //       id: "Asia/Singapore",
  //       value: "Asia/Singapore (UTC+08:00)"
  //   }, {
  //       id: "Asia/Pontianak",
  //       value: "Asia/Pontianak (UTC+07:00)"
  //   }, {
  //       id: "Etc/GMT-7",
  //       value: "Etc/GMT-7 (UTC+07:00)"
  //   }, {
  //       id: "Asia/Phnom_Penh",
  //       value: "Asia/Phnom_Penh (UTC+07:00)"
  //   }, {
  //       id: "Asia/Novosibirsk",
  //       value: "Asia/Novosibirsk (UTC+07:00)"
  //   }, {
  //       id: "Antarctica/Davis",
  //       value: "Antarctica/Davis (UTC+07:00)"
  //   }, {
  //       id: "Asia/Tomsk",
  //       value: "Asia/Tomsk (UTC+07:00)"
  //   }, {
  //       id: "Asia/Jakarta",
  //       value: "Asia/Jakarta (UTC+07:00)"
  //   }, {
  //       id: "Asia/Barnaul",
  //       value: "Asia/Barnaul (UTC+07:00)"
  //   }, {
  //       id: "Indian/Christmas",
  //       value: "Indian/Christmas (UTC+07:00)"
  //   }, {
  //       id: "Asia/Ho_Chi_Minh",
  //       value: "Asia/Ho_Chi_Minh (UTC+07:00)"
  //   }, {
  //       id: "Asia/Hovd",
  //       value: "Asia/Hovd (UTC+07:00)"
  //   }, {
  //       id: "Asia/Bangkok",
  //       value: "Asia/Bangkok (UTC+07:00)"
  //   }, {
  //       id: "Asia/Vientiane",
  //       value: "Asia/Vientiane (UTC+07:00)"
  //   }, {
  //       id: "Asia/Novokuznetsk",
  //       value: "Asia/Novokuznetsk (UTC+07:00)"
  //   }, {
  //       id: "Asia/Krasnoyarsk",
  //       value: "Asia/Krasnoyarsk (UTC+07:00)"
  //   }, {
  //       id: "Asia/Saigon",
  //       value: "Asia/Saigon (UTC+07:00)"
  //   }, {
  //       id: "Asia/Yangon",
  //       value: "Asia/Yangon (UTC+06:30)"
  //   }, {
  //       id: "Asia/Rangoon",
  //       value: "Asia/Rangoon (UTC+06:30)"
  //   }, {
  //       id: "Indian/Cocos",
  //       value: "Indian/Cocos (UTC+06:30)"
  //   }, {
  //       id: "Asia/Kashgar",
  //       value: "Asia/Kashgar (UTC+06:00)"
  //   }, {
  //       id: "Etc/GMT-6",
  //       value: "Etc/GMT-6 (UTC+06:00)"
  //   }, {
  //       id: "Asia/Almaty",
  //       value: "Asia/Almaty (UTC+06:00)"
  //   }, {
  //       id: "Asia/Dacca",
  //       value: "Asia/Dacca (UTC+06:00)"
  //   }, {
  //       id: "Asia/Omsk",
  //       value: "Asia/Omsk (UTC+06:00)"
  //   }, {
  //       id: "Asia/Dhaka",
  //       value: "Asia/Dhaka (UTC+06:00)"
  //   }, {
  //       id: "Indian/Chagos",
  //       value: "Indian/Chagos (UTC+06:00)"
  //   }, {
  //       id: "Asia/Qyzylorda",
  //       value: "Asia/Qyzylorda (UTC+06:00)"
  //   }, {
  //       id: "Asia/Bishkek",
  //       value: "Asia/Bishkek (UTC+06:00)"
  //   }, {
  //       id: "Antarctica/Vostok",
  //       value: "Antarctica/Vostok (UTC+06:00)"
  //   }, {
  //       id: "Asia/Urumqi",
  //       value: "Asia/Urumqi (UTC+06:00)"
  //   }, {
  //       id: "Asia/Thimbu",
  //       value: "Asia/Thimbu (UTC+06:00)"
  //   }, {
  //       id: "Asia/Thimphu",
  //       value: "Asia/Thimphu (UTC+06:00)"
  //   }, {
  //       id: "Asia/Kathmandu",
  //       value: "Asia/Kathmandu (UTC+05:45)"
  //   }, {
  //       id: "Asia/Katmandu",
  //       value: "Asia/Katmandu (UTC+05:45)"
  //   }, {
  //       id: "Asia/Kolkata",
  //       value: "Asia/Kolkata (UTC+05:30)"
  //   }, {
  //       id: "Asia/Colombo",
  //       value: "Asia/Colombo (UTC+05:30)"
  //   }, {
  //       id: "Asia/Calcutta",
  //       value: "Asia/Calcutta (UTC+05:30)"
  //   }, {
  //       id: "Asia/Aqtau",
  //       value: "Asia/Aqtau (UTC+05:00)"
  //   }, {
  //       id: "Etc/GMT-5",
  //       value: "Etc/GMT-5 (UTC+05:00)"
  //   }, {
  //       id: "Asia/Samarkand",
  //       value: "Asia/Samarkand (UTC+05:00)"
  //   }, {
  //       id: "Asia/Karachi",
  //       value: "Asia/Karachi (UTC+05:00)"
  //   }, {
  //       id: "Asia/Yekaterinburg",
  //       value: "Asia/Yekaterinburg (UTC+05:00)"
  //   }, {
  //       id: "Asia/Dushanbe",
  //       value: "Asia/Dushanbe (UTC+05:00)"
  //   }, {
  //       id: "Indian/Maldives",
  //       value: "Indian/Maldives (UTC+05:00)"
  //   }, {
  //       id: "Asia/Oral",
  //       value: "Asia/Oral (UTC+05:00)"
  //   }, {
  //       id: "Asia/Tashkent",
  //       value: "Asia/Tashkent (UTC+05:00)"
  //   }, {
  //       id: "Antarctica/Mawson",
  //       value: "Antarctica/Mawson (UTC+05:00)"
  //   }, {
  //       id: "Asia/Aqtobe",
  //       value: "Asia/Aqtobe (UTC+05:00)"
  //   }, {
  //       id: "Asia/Ashkhabad",
  //       value: "Asia/Ashkhabad (UTC+05:00)"
  //   }, {
  //       id: "Asia/Ashgabat",
  //       value: "Asia/Ashgabat (UTC+05:00)"
  //   }, {
  //       id: "Asia/Atyrau",
  //       value: "Asia/Atyrau (UTC+05:00)"
  //   }, {
  //       id: "Indian/Kerguelen",
  //       value: "Indian/Kerguelen (UTC+05:00)"
  //   }, {
  //       id: "Iran",
  //       value: "Iran (UTC+04:30)"
  //   }, {
  //       id: "Asia/Tehran",
  //       value: "Asia/Tehran (UTC+04:30)"
  //   }, {
  //       id: "Asia/Kabul",
  //       value: "Asia/Kabul (UTC+04:30)"
  //   }, {
  //       id: "Asia/Yerevan",
  //       value: "Asia/Yerevan (UTC+04:00)"
  //   }, {
  //       id: "Etc/GMT-4",
  //       value: "Etc/GMT-4 (UTC+04:00)"
  //   }, {
  //       id: "Asia/Dubai",
  //       value: "Asia/Dubai (UTC+04:00)"
  //   }, {
  //       id: "Indian/Reunion",
  //       value: "Indian/Reunion (UTC+04:00)"
  //   }, {
  //       id: "Indian/Mauritius",
  //       value: "Indian/Mauritius (UTC+04:00)"
  //   }, {
  //       id: "Europe/Saratov",
  //       value: "Europe/Saratov (UTC+04:00)"
  //   }, {
  //       id: "Europe/Samara",
  //       value: "Europe/Samara (UTC+04:00)"
  //   }, {
  //       id: "Indian/Mahe",
  //       value: "Indian/Mahe (UTC+04:00)"
  //   }, {
  //       id: "Asia/Baku",
  //       value: "Asia/Baku (UTC+04:00)"
  //   }, {
  //       id: "Asia/Muscat",
  //       value: "Asia/Muscat (UTC+04:00)"
  //   }, {
  //       id: "Europe/Volgograd",
  //       value: "Europe/Volgograd (UTC+04:00)"
  //   }, {
  //       id: "Europe/Astrakhan",
  //       value: "Europe/Astrakhan (UTC+04:00)"
  //   }, {
  //       id: "Asia/Tbilisi",
  //       value: "Asia/Tbilisi (UTC+04:00)"
  //   }, {
  //       id: "Europe/Ulyanovsk",
  //       value: "Europe/Ulyanovsk (UTC+04:00)"
  //   }, {
  //       id: "Asia/Aden",
  //       value: "Asia/Aden (UTC+03:00)"
  //   }, {
  //       id: "Africa/Nairobi",
  //       value: "Africa/Nairobi (UTC+03:00)"
  //   }, {
  //       id: "Europe/Istanbul",
  //       value: "Europe/Istanbul (UTC+03:00)"
  //   }, {
  //       id: "Etc/GMT-3",
  //       value: "Etc/GMT-3 (UTC+03:00)"
  //   }, {
  //       id: "Europe/Zaporozhye",
  //       value: "Europe/Zaporozhye (UTC+03:00)"
  //   }, {
  //       id: "Israel",
  //       value: "Israel (UTC+03:00)"
  //   }, {
  //       id: "Indian/Comoro",
  //       value: "Indian/Comoro (UTC+03:00)"
  //   }, {
  //       id: "Antarctica/Syowa",
  //       value: "Antarctica/Syowa (UTC+03:00)"
  //   }, {
  //       id: "Africa/Mogadishu",
  //       value: "Africa/Mogadishu (UTC+03:00)"
  //   }, {
  //       id: "Europe/Bucharest",
  //       value: "Europe/Bucharest (UTC+03:00)"
  //   }, {
  //       id: "Africa/Asmera",
  //       value: "Africa/Asmera (UTC+03:00)"
  //   }, {
  //       id: "Europe/Mariehamn",
  //       value: "Europe/Mariehamn (UTC+03:00)"
  //   }, {
  //       id: "Asia/Istanbul",
  //       value: "Asia/Istanbul (UTC+03:00)"
  //   }, {
  //       id: "Europe/Tiraspol",
  //       value: "Europe/Tiraspol (UTC+03:00)"
  //   }, {
  //       id: "Europe/Moscow",
  //       value: "Europe/Moscow (UTC+03:00)"
  //   }, {
  //       id: "Europe/Chisinau",
  //       value: "Europe/Chisinau (UTC+03:00)"
  //   }, {
  //       id: "Europe/Helsinki",
  //       value: "Europe/Helsinki (UTC+03:00)"
  //   }, {
  //       id: "Asia/Beirut",
  //       value: "Asia/Beirut (UTC+03:00)"
  //   }, {
  //       id: "Asia/Tel_Aviv",
  //       value: "Asia/Tel_Aviv (UTC+03:00)"
  //   }, {
  //       id: "Africa/Djibouti",
  //       value: "Africa/Djibouti (UTC+03:00)"
  //   }, {
  //       id: "Europe/Simferopol",
  //       value: "Europe/Simferopol (UTC+03:00)"
  //   }, {
  //       id: "Europe/Sofia",
  //       value: "Europe/Sofia (UTC+03:00)"
  //   }, {
  //       id: "Asia/Gaza",
  //       value: "Asia/Gaza (UTC+03:00)"
  //   }, {
  //       id: "Africa/Asmara",
  //       value: "Africa/Asmara (UTC+03:00)"
  //   }, {
  //       id: "Europe/Riga",
  //       value: "Europe/Riga (UTC+03:00)"
  //   }, {
  //       id: "Asia/Baghdad",
  //       value: "Asia/Baghdad (UTC+03:00)"
  //   }, {
  //       id: "Asia/Damascus",
  //       value: "Asia/Damascus (UTC+03:00)"
  //   }, {
  //       id: "Africa/Dar_es_Salaam",
  //       value: "Africa/Dar_es_Salaam (UTC+03:00)"
  //   }, {
  //       id: "Africa/Addis_Ababa",
  //       value: "Africa/Addis_Ababa (UTC+03:00)"
  //   }, {
  //       id: "Europe/Uzhgorod",
  //       value: "Europe/Uzhgorod (UTC+03:00)"
  //   }, {
  //       id: "Asia/Jerusalem",
  //       value: "Asia/Jerusalem (UTC+03:00)"
  //   }, {
  //       id: "Asia/Riyadh",
  //       value: "Asia/Riyadh (UTC+03:00)"
  //   }, {
  //       id: "Asia/Kuwait",
  //       value: "Asia/Kuwait (UTC+03:00)"
  //   }, {
  //       id: "Europe/Kirov",
  //       value: "Europe/Kirov (UTC+03:00)"
  //   }, {
  //       id: "Africa/Kampala",
  //       value: "Africa/Kampala (UTC+03:00)"
  //   }, {
  //       id: "Europe/Minsk",
  //       value: "Europe/Minsk (UTC+03:00)"
  //   }, {
  //       id: "Asia/Qatar",
  //       value: "Asia/Qatar (UTC+03:00)"
  //   }, {
  //       id: "Europe/Kiev",
  //       value: "Europe/Kiev (UTC+03:00)"
  //   }, {
  //       id: "Asia/Bahrain",
  //       value: "Asia/Bahrain (UTC+03:00)"
  //   }, {
  //       id: "Europe/Vilnius",
  //       value: "Europe/Vilnius (UTC+03:00)"
  //   }, {
  //       id: "Indian/Antananarivo",
  //       value: "Indian/Antananarivo (UTC+03:00)"
  //   }, {
  //       id: "Indian/Mayotte",
  //       value: "Indian/Mayotte (UTC+03:00)"
  //   }, {
  //       id: "Europe/Tallinn",
  //       value: "Europe/Tallinn (UTC+03:00)"
  //   }, {
  //       id: "Turkey",
  //       value: "Turkey (UTC+03:00)"
  //   }, {
  //       id: "Africa/Juba",
  //       value: "Africa/Juba (UTC+03:00)"
  //   }, {
  //       id: "Asia/Nicosia",
  //       value: "Asia/Nicosia (UTC+03:00)"
  //   }, {
  //       id: "Asia/Famagusta",
  //       value: "Asia/Famagusta (UTC+03:00)"
  //   }, {
  //       id: "W-SU",
  //       value: "W-SU (UTC+03:00)"
  //   }, {
  //       id: "EET",
  //       value: "EET (UTC+03:00)"
  //   }, {
  //       id: "Asia/Hebron",
  //       value: "Asia/Hebron (UTC+03:00)"
  //   }, {
  //       id: "Asia/Amman",
  //       value: "Asia/Amman (UTC+03:00)"
  //   }, {
  //       id: "Europe/Nicosia",
  //       value: "Europe/Nicosia (UTC+03:00)"
  //   }, {
  //       id: "Europe/Athens",
  //       value: "Europe/Athens (UTC+03:00)"
  //   }, {
  //       id: "Africa/Cairo",
  //       value: "Africa/Cairo (UTC+02:00)"
  //   }, {
  //       id: "Africa/Mbabane",
  //       value: "Africa/Mbabane (UTC+02:00)"
  //   }, {
  //       id: "Europe/Brussels",
  //       value: "Europe/Brussels (UTC+02:00)"
  //   }, {
  //       id: "Europe/Warsaw",
  //       value: "Europe/Warsaw (UTC+02:00)"
  //   }, {
  //       id: "CET",
  //       value: "CET (UTC+02:00)"
  //   }, {
  //       id: "Europe/Luxembourg",
  //       value: "Europe/Luxembourg (UTC+02:00)"
  //   }, {
  //       id: "Etc/GMT-2",
  //       value: "Etc/GMT-2 (UTC+02:00)"
  //   }, {
  //       id: "Libya",
  //       value: "Libya (UTC+02:00)"
  //   }, {
  //       id: "Africa/Kigali",
  //       value: "Africa/Kigali (UTC+02:00)"
  //   }, {
  //       id: "Africa/Tripoli",
  //       value: "Africa/Tripoli (UTC+02:00)"
  //   }, {
  //       id: "Europe/Kaliningrad",
  //       value: "Europe/Kaliningrad (UTC+02:00)"
  //   }, {
  //       id: "Africa/Windhoek",
  //       value: "Africa/Windhoek (UTC+02:00)"
  //   }, {
  //       id: "Europe/Malta",
  //       value: "Europe/Malta (UTC+02:00)"
  //   }, {
  //       id: "Europe/Busingen",
  //       value: "Europe/Busingen (UTC+02:00)"
  //   }, {
  //       id: "Europe/Skopje",
  //       value: "Europe/Skopje (UTC+02:00)"
  //   }, {
  //       id: "Europe/Sarajevo",
  //       value: "Europe/Sarajevo (UTC+02:00)"
  //   }, {
  //       id: "Europe/Rome",
  //       value: "Europe/Rome (UTC+02:00)"
  //   }, {
  //       id: "Europe/Zurich",
  //       value: "Europe/Zurich (UTC+02:00)"
  //   }, {
  //       id: "Europe/Gibraltar",
  //       value: "Europe/Gibraltar (UTC+02:00)"
  //   }, {
  //       id: "Africa/Lubumbashi",
  //       value: "Africa/Lubumbashi (UTC+02:00)"
  //   }, {
  //       id: "Europe/Vaduz",
  //       value: "Europe/Vaduz (UTC+02:00)"
  //   }, {
  //       id: "Europe/Ljubljana",
  //       value: "Europe/Ljubljana (UTC+02:00)"
  //   }, {
  //       id: "Europe/Berlin",
  //       value: "Europe/Berlin (UTC+02:00)"
  //   }, {
  //       id: "Europe/Stockholm",
  //       value: "Europe/Stockholm (UTC+02:00)"
  //   }, {
  //       id: "Europe/Budapest",
  //       value: "Europe/Budapest (UTC+02:00)"
  //   }, {
  //       id: "Europe/Zagreb",
  //       value: "Europe/Zagreb (UTC+02:00)"
  //   }, {
  //       id: "Europe/Paris",
  //       value: "Europe/Paris (UTC+02:00)"
  //   }, {
  //       id: "Africa/Ceuta",
  //       value: "Africa/Ceuta (UTC+02:00)"
  //   }, {
  //       id: "Europe/Prague",
  //       value: "Europe/Prague (UTC+02:00)"
  //   }, {
  //       id: "Antarctica/Troll",
  //       value: "Antarctica/Troll (UTC+02:00)"
  //   }, {
  //       id: "Africa/Gaborone",
  //       value: "Africa/Gaborone (UTC+02:00)"
  //   }, {
  //       id: "Europe/Copenhagen",
  //       value: "Europe/Copenhagen (UTC+02:00)"
  //   }, {
  //       id: "Europe/Vienna",
  //       value: "Europe/Vienna (UTC+02:00)"
  //   }, {
  //       id: "Europe/Tirane",
  //       value: "Europe/Tirane (UTC+02:00)"
  //   }, {
  //       id: "MET",
  //       value: "MET (UTC+02:00)"
  //   }, {
  //       id: "Europe/Amsterdam",
  //       value: "Europe/Amsterdam (UTC+02:00)"
  //   }, {
  //       id: "Africa/Maputo",
  //       value: "Africa/Maputo (UTC+02:00)"
  //   }, {
  //       id: "Europe/San_Marino",
  //       value: "Europe/San_Marino (UTC+02:00)"
  //   }, {
  //       id: "Poland",
  //       value: "Poland (UTC+02:00)"
  //   }, {
  //       id: "Europe/Andorra",
  //       value: "Europe/Andorra (UTC+02:00)"
  //   }, {
  //       id: "Europe/Oslo",
  //       value: "Europe/Oslo (UTC+02:00)"
  //   }, {
  //       id: "Europe/Podgorica",
  //       value: "Europe/Podgorica (UTC+02:00)"
  //   }, {
  //       id: "Africa/Bujumbura",
  //       value: "Africa/Bujumbura (UTC+02:00)"
  //   }, {
  //       id: "Atlantic/Jan_Mayen",
  //       value: "Atlantic/Jan_Mayen (UTC+02:00)"
  //   }, {
  //       id: "Africa/Maseru",
  //       value: "Africa/Maseru (UTC+02:00)"
  //   }, {
  //       id: "Europe/Madrid",
  //       value: "Europe/Madrid (UTC+02:00)"
  //   }, {
  //       id: "Africa/Blantyre",
  //       value: "Africa/Blantyre (UTC+02:00)"
  //   }, {
  //       id: "Africa/Lusaka",
  //       value: "Africa/Lusaka (UTC+02:00)"
  //   }, {
  //       id: "Africa/Harare",
  //       value: "Africa/Harare (UTC+02:00)"
  //   }, {
  //       id: "Africa/Khartoum",
  //       value: "Africa/Khartoum (UTC+02:00)"
  //   }, {
  //       id: "Africa/Johannesburg",
  //       value: "Africa/Johannesburg (UTC+02:00)"
  //   }, {
  //       id: "Europe/Belgrade",
  //       value: "Europe/Belgrade (UTC+02:00)"
  //   }, {
  //       id: "Europe/Bratislava",
  //       value: "Europe/Bratislava (UTC+02:00)"
  //   }, {
  //       id: "Arctic/Longyearbyen",
  //       value: "Arctic/Longyearbyen (UTC+02:00)"
  //   }, {
  //       id: "Egypt",
  //       value: "Egypt (UTC+02:00)"
  //   }, {
  //       id: "Europe/Vatican",
  //       value: "Europe/Vatican (UTC+02:00)"
  //   }, {
  //       id: "Europe/Monaco",
  //       value: "Europe/Monaco (UTC+02:00)"
  //   }, {
  //       id: "Europe/London",
  //       value: "Europe/London (UTC+01:00)"
  //   }, {
  //       id: "Etc/GMT-1",
  //       value: "Etc/GMT-1 (UTC+01:00)"
  //   }, {
  //       id: "Europe/Jersey",
  //       value: "Europe/Jersey (UTC+01:00)"
  //   }, {
  //       id: "Europe/Guernsey",
  //       value: "Europe/Guernsey (UTC+01:00)"
  //   }, {
  //       id: "Europe/Isle_of_Man",
  //       value: "Europe/Isle_of_Man (UTC+01:00)"
  //   }, {
  //       id: "Africa/Tunis",
  //       value: "Africa/Tunis (UTC+01:00)"
  //   }, {
  //       id: "Africa/Malabo",
  //       value: "Africa/Malabo (UTC+01:00)"
  //   }, {
  //       id: "GB-Eire",
  //       value: "GB-Eire (UTC+01:00)"
  //   }, {
  //       id: "Africa/Lagos",
  //       value: "Africa/Lagos (UTC+01:00)"
  //   }, {
  //       id: "Africa/Algiers",
  //       value: "Africa/Algiers (UTC+01:00)"
  //   }, {
  //       id: "GB",
  //       value: "GB (UTC+01:00)"
  //   }, {
  //       id: "Portugal",
  //       value: "Portugal (UTC+01:00)"
  //   }, {
  //       id: "Africa/Sao_Tome",
  //       value: "Africa/Sao_Tome (UTC+01:00)"
  //   }, {
  //       id: "Africa/Ndjamena",
  //       value: "Africa/Ndjamena (UTC+01:00)"
  //   }, {
  //       id: "Atlantic/Faeroe",
  //       value: "Atlantic/Faeroe (UTC+01:00)"
  //   }, {
  //       id: "Eire",
  //       value: "Eire (UTC+01:00)"
  //   }, {
  //       id: "Atlantic/Faroe",
  //       value: "Atlantic/Faroe (UTC+01:00)"
  //   }, {
  //       id: "Europe/Dublin",
  //       value: "Europe/Dublin (UTC+01:00)"
  //   }, {
  //       id: "Africa/Libreville",
  //       value: "Africa/Libreville (UTC+01:00)"
  //   }, {
  //       id: "Africa/El_Aaiun",
  //       value: "Africa/El_Aaiun (UTC+01:00)"
  //   }, {
  //       id: "Africa/Douala",
  //       value: "Africa/Douala (UTC+01:00)"
  //   }, {
  //       id: "Africa/Brazzaville",
  //       value: "Africa/Brazzaville (UTC+01:00)"
  //   }, {
  //       id: "Africa/Porto-Novo",
  //       value: "Africa/Porto-Novo (UTC+01:00)"
  //   }, {
  //       id: "Atlantic/Madeira",
  //       value: "Atlantic/Madeira (UTC+01:00)"
  //   }, {
  //       id: "Europe/Lisbon",
  //       value: "Europe/Lisbon (UTC+01:00)"
  //   }, {
  //       id: "Atlantic/Canary",
  //       value: "Atlantic/Canary (UTC+01:00)"
  //   }, {
  //       id: "Africa/Casablanca",
  //       value: "Africa/Casablanca (UTC+01:00)"
  //   }, {
  //       id: "Europe/Belfast",
  //       value: "Europe/Belfast (UTC+01:00)"
  //   }, {
  //       id: "Africa/Luanda",
  //       value: "Africa/Luanda (UTC+01:00)"
  //   }, {
  //       id: "Africa/Kinshasa",
  //       value: "Africa/Kinshasa (UTC+01:00)"
  //   }, {
  //       id: "Africa/Bangui",
  //       value: "Africa/Bangui (UTC+01:00)"
  //   }, {
  //       id: "WET",
  //       value: "WET (UTC+01:00)"
  //   }, {
  //       id: "Africa/Niamey",
  //       value: "Africa/Niamey (UTC+01:00)"
  //   }, {
  //       id: "GMT",
  //       value: "GMT (UTC+00:00)"
  //   }, {
  //       id: "Etc/GMT-0",
  //       value: "Etc/GMT-0 (UTC+00:00)"
  //   }, {
  //       id: "Atlantic/St_Helena",
  //       value: "Atlantic/St_Helena (UTC+00:00)"
  //   }, {
  //       id: "Etc/GMT+0",
  //       value: "Etc/GMT+0 (UTC+00:00)"
  //   }, {
  //       id: "Africa/Banjul",
  //       value: "Africa/Banjul (UTC+00:00)"
  //   }, {
  //       id: "Etc/GMT",
  //       value: "Etc/GMT (UTC+00:00)"
  //   }, {
  //       id: "Africa/Freetown",
  //       value: "Africa/Freetown (UTC+00:00)"
  //   }, {
  //       id: "Africa/Bamako",
  //       value: "Africa/Bamako (UTC+00:00)"
  //   }, {
  //       id: "Africa/Conakry",
  //       value: "Africa/Conakry (UTC+00:00)"
  //   }, {
  //       id: "Universal",
  //       value: "Universal (UTC+00:00)"
  //   }, {
  //       id: "Africa/Nouakchott",
  //       value: "Africa/Nouakchott (UTC+00:00)"
  //   }, {
  //       id: "UTC",
  //       value: "UTC (UTC+00:00)"
  //   }, {
  //       id: "Etc/Universal",
  //       value: "Etc/Universal (UTC+00:00)"
  //   }, {
  //       id: "Atlantic/Azores",
  //       value: "Atlantic/Azores (UTC+00:00)"
  //   }, {
  //       id: "Africa/Abidjan",
  //       value: "Africa/Abidjan (UTC+00:00)"
  //   }, {
  //       id: "Africa/Accra",
  //       value: "Africa/Accra (UTC+00:00)"
  //   }, {
  //       id: "Etc/UCT",
  //       value: "Etc/UCT (UTC+00:00)"
  //   }, {
  //       id: "GMT0",
  //       value: "GMT0 (UTC+00:00)"
  //   }, {
  //       id: "Zulu",
  //       value: "Zulu (UTC+00:00)"
  //   }, {
  //       id: "Africa/Ouagadougou",
  //       value: "Africa/Ouagadougou (UTC+00:00)"
  //   }, {
  //       id: "Atlantic/Reykjavik",
  //       value: "Atlantic/Reykjavik (UTC+00:00)"
  //   }, {
  //       id: "Etc/Zulu",
  //       value: "Etc/Zulu (UTC+00:00)"
  //   }, {
  //       id: "Iceland",
  //       value: "Iceland (UTC+00:00)"
  //   }, {
  //       id: "Africa/Lome",
  //       value: "Africa/Lome (UTC+00:00)"
  //   }, {
  //       id: "Greenwich",
  //       value: "Greenwich (UTC+00:00)"
  //   }, {
  //       id: "Etc/GMT0",
  //       value: "Etc/GMT0 (UTC+00:00)"
  //   }, {
  //       id: "America/Danmarkshavn",
  //       value: "America/Danmarkshavn (UTC+00:00)"
  //   }, {
  //       id: "Africa/Dakar",
  //       value: "Africa/Dakar (UTC+00:00)"
  //   }, {
  //       id: "America/Scoresbysund",
  //       value: "America/Scoresbysund (UTC+00:00)"
  //   }, {
  //       id: "Africa/Bissau",
  //       value: "Africa/Bissau (UTC+00:00)"
  //   }, {
  //       id: "Etc/Greenwich",
  //       value: "Etc/Greenwich (UTC+00:00)"
  //   }, {
  //       id: "Africa/Timbuktu",
  //       value: "Africa/Timbuktu (UTC+00:00)"
  //   }, {
  //       id: "UCT",
  //       value: "UCT (UTC+00:00)"
  //   }, {
  //       id: "Africa/Monrovia",
  //       value: "Africa/Monrovia (UTC+00:00)"
  //   }, {
  //       id: "Etc/UTC",
  //       value: "Etc/UTC (UTC+00:00)"
  //   }],  
  
  
  TimeZoneMaster: [{
    value: "Etc/GMT+12",
    label: "Etc/GMT+12 (UTC-12:00)"
  }, {
    value: "Pacific/Pago_Pago",
    label: "Pacific/Pago_Pago (UTC-11:00)"
  }, {
    value: "Pacific/Samoa",
    label: "Pacific/Samoa (UTC-11:00)"
  }, {
    value: "Pacific/Niue",
    label: "Pacific/Niue (UTC-11:00)"
  }, {
    value: "US/Samoa",
    label: "US/Samoa (UTC-11:00)"
  }, {
    value: "Etc/GMT+11",
    label: "Etc/GMT+11 (UTC-11:00)"
  }, {
    value: "Pacific/Midway",
    label: "Pacific/Midway (UTC-11:00)"
  }, {
    value: "Pacific/Honolulu",
    label: "Pacific/Honolulu (UTC-10:00)"
  }, {
    value: "Pacific/Rarotonga",
    label: "Pacific/Rarotonga (UTC-10:00)"
  }, {
    value: "Pacific/Tahiti",
    label: "Pacific/Tahiti (UTC-10:00)"
  }, {
    value: "Pacific/Johnston",
    label: "Pacific/Johnston (UTC-10:00)"
  }, {
    value: "US/Hawaii",
    label: "US/Hawaii (UTC-10:00)"
  }, {
    value: "SystemV/HST10",
    label: "SystemV/HST10 (UTC-10:00)"
  }, {
    value: "Etc/GMT+10",
    label: "Etc/GMT+10 (UTC-10:00)"
  }, {
    value: "Pacific/Marquesas",
    label: "Pacific/Marquesas (UTC-09:30)"
  }, {
    value: "Etc/GMT+9",
    label: "Etc/GMT+9 (UTC-09:00)"
  }, {
    value: "Pacific/Gambier",
    label: "Pacific/Gambier (UTC-09:00)"
  }, {
    value: "America/Atka",
    label: "America/Atka (UTC-09:00)"
  }, {
    value: "SystemV/YST9",
    label: "SystemV/YST9 (UTC-09:00)"
  }, {
    value: "America/Adak",
    label: "America/Adak (UTC-09:00)"
  }, {
    value: "US/Aleutian",
    label: "US/Aleutian (UTC-09:00)"
  }, {
    value: "Etc/GMT+8",
    label: "Etc/GMT+8 (UTC-08:00)"
  }, {
    value: "US/Alaska",
    label: "US/Alaska (UTC-08:00)"
  }, {
    value: "America/Juneau",
    label: "America/Juneau (UTC-08:00)"
  }, {
    value: "America/Metlakatla",
    label: "America/Metlakatla (UTC-08:00)"
  }, {
    value: "America/Yakutat",
    label: "America/Yakutat (UTC-08:00)"
  }, {
    value: "Pacific/Pitcairn",
    label: "Pacific/Pitcairn (UTC-08:00)"
  }, {
    value: "America/Sitka",
    label: "America/Sitka (UTC-08:00)"
  }, {
    value: "America/Anchorage",
    label: "America/Anchorage (UTC-08:00)"
  }, {
    value: "SystemV/PST8",
    label: "SystemV/PST8 (UTC-08:00)"
  }, {
    value: "America/Nome",
    label: "America/Nome (UTC-08:00)"
  }, {
    value: "SystemV/YST9YDT",
    label: "SystemV/YST9YDT (UTC-08:00)"
  }, {
    value: "Canada/Yukon",
    label: "Canada/Yukon (UTC-07:00)"
  }, {
    value: "US/Pacific-New",
    label: "US/Pacific-New (UTC-07:00)"
  }, {
    value: "Etc/GMT+7",
    label: "Etc/GMT+7 (UTC-07:00)"
  }, {
    value: "US/Arizona",
    label: "US/Arizona (UTC-07:00)"
  }, {
    value: "America/Dawson_Creek",
    label: "America/Dawson_Creek (UTC-07:00)"
  }, {
    value: "Canada/Pacific",
    label: "Canada/Pacific (UTC-07:00)"
  }, {
    value: "PST8PDT",
    label: "PST8PDT (UTC-07:00)"
  }, {
    value: "SystemV/MST7",
    label: "SystemV/MST7 (UTC-07:00)"
  }, {
    value: "America/Dawson",
    label: "America/Dawson (UTC-07:00)"
  }, {
    value: "Mexico/BajaNorte",
    label: "Mexico/BajaNorte (UTC-07:00)"
  }, {
    value: "America/Tijuana",
    label: "America/Tijuana (UTC-07:00)"
  }, {
    value: "America/Creston",
    label: "America/Creston (UTC-07:00)"
  }, {
    value: "America/Hermosillo",
    label: "America/Hermosillo (UTC-07:00)"
  }, {
    value: "America/Santa_Isabel",
    label: "America/Santa_Isabel (UTC-07:00)"
  }, {
    value: "America/Vancouver",
    label: "America/Vancouver (UTC-07:00)"
  }, {
    value: "America/Ensenada",
    label: "America/Ensenada (UTC-07:00)"
  }, {
    value: "America/Phoenix",
    label: "America/Phoenix (UTC-07:00)"
  }, {
    value: "America/Whitehorse",
    label: "America/Whitehorse (UTC-07:00)"
  }, {
    value: "America/Fort_Nelson",
    label: "America/Fort_Nelson (UTC-07:00)"
  }, {
    value: "SystemV/PST8PDT",
    label: "SystemV/PST8PDT (UTC-07:00)"
  }, {
    value: "America/Los_Angeles",
    label: "America/Los_Angeles (UTC-07:00)"
  }, {
    value: "US/Pacific",
    label: "US/Pacific (UTC-07:00)"
  }, {
    value: "America/El_Salvador",
    label: "America/El_Salvador (UTC-06:00)"
  }, {
    value: "America/Guatemala",
    label: "America/Guatemala (UTC-06:00)"
  }, {
    value: "America/Belize",
    label: "America/Belize (UTC-06:00)"
  }, {
    value: "America/Managua",
    label: "America/Managua (UTC-06:00)"
  }, {
    value: "America/Tegucigalpa",
    label: "America/Tegucigalpa (UTC-06:00)"
  }, {
    value: "Etc/GMT+6",
    label: "Etc/GMT+6 (UTC-06:00)"
  }, {
    value: "Pacific/Easter",
    label: "Pacific/Easter (UTC-06:00)"
  }, {
    value: "Mexico/BajaSur",
    label: "Mexico/BajaSur (UTC-06:00)"
  }, {
    value: "America/Regina",
    label: "America/Regina (UTC-06:00)"
  }, {
    value: "America/Denver",
    label: "America/Denver (UTC-06:00)"
  }, {
    value: "Pacific/Galapagos",
    label: "Pacific/Galapagos (UTC-06:00)"
  }, {
    value: "America/Yellowknife",
    label: "America/Yellowknife (UTC-06:00)"
  }, {
    value: "America/Swift_Current",
    label: "America/Swift_Current (UTC-06:00)"
  }, {
    value: "America/Inuvik",
    label: "America/Inuvik (UTC-06:00)"
  }, {
    value: "America/Mazatlan",
    label: "America/Mazatlan (UTC-06:00)"
  }, {
    value: "America/Boise",
    label: "America/Boise (UTC-06:00)"
  }, {
    value: "America/Costa_Rica",
    label: "America/Costa_Rica (UTC-06:00)"
  }, {
    value: "MST7MDT",
    label: "MST7MDT (UTC-06:00)"
  }, {
    value: "SystemV/CST6",
    label: "SystemV/CST6 (UTC-06:00)"
  }, {
    value: "America/Chihuahua",
    label: "America/Chihuahua (UTC-06:00)"
  }, {
    value: "America/Ojinaga",
    label: "America/Ojinaga (UTC-06:00)"
  }, {
    value: "Chile/EasterIsland",
    label: "Chile/EasterIsland (UTC-06:00)"
  }, {
    value: "US/Mountain",
    label: "US/Mountain (UTC-06:00)"
  }, {
    value: "America/Edmonton",
    label: "America/Edmonton (UTC-06:00)"
  }, {
    value: "Canada/Mountain",
    label: "Canada/Mountain (UTC-06:00)"
  }, {
    value: "America/Cambridge_Bay",
    label: "America/Cambridge_Bay (UTC-06:00)"
  }, {
    value: "Navajo",
    label: "Navajo (UTC-06:00)"
  }, {
    value: "SystemV/MST7MDT",
    label: "SystemV/MST7MDT (UTC-06:00)"
  }, {
    value: "Canada/Saskatchewan",
    label: "Canada/Saskatchewan (UTC-06:00)"
  }, {
    value: "America/Shiprock",
    label: "America/Shiprock (UTC-06:00)"
  }, {
    value: "America/Panama",
    label: "America/Panama (UTC-05:00)"
  }, {
    value: "America/Chicago",
    label: "America/Chicago (UTC-05:00)"
  }, {
    value: "America/Eirunepe",
    label: "America/Eirunepe (UTC-05:00)"
  }, {
    value: "Etc/GMT+5",
    label: "Etc/GMT+5 (UTC-05:00)"
  }, {
    value: "Mexico/General",
    label: "Mexico/General (UTC-05:00)"
  }, {
    value: "America/Porto_Acre",
    label: "America/Porto_Acre (UTC-05:00)"
  }, {
    value: "America/Guayaquil",
    label: "America/Guayaquil (UTC-05:00)"
  }, {
    value: "America/Rankin_Inlet",
    label: "America/Rankin_Inlet (UTC-05:00)"
  }, {
    value: "US/Central",
    label: "US/Central (UTC-05:00)"
  }, {
    value: "America/Rainy_River",
    label: "America/Rainy_River (UTC-05:00)"
  }, {
    value: "America/Indiana/Knox",
    label: "America/Indiana/Knox (UTC-05:00)"
  }, {
    value: "America/North_Dakota/Beulah",
    label: "America/North_Dakota/Beulah (UTC-05:00)"
  }, {
    value: "America/Monterrey",
    label: "America/Monterrey (UTC-05:00)"
  }, {
    value: "America/Jamaica",
    label: "America/Jamaica (UTC-05:00)"
  }, {
    value: "America/Atikokan",
    label: "America/Atikokan (UTC-05:00)"
  }, {
    value: "America/Coral_Harbour",
    label: "America/Coral_Harbour (UTC-05:00)"
  }, {
    value: "America/North_Dakota/Center",
    label: "America/North_Dakota/Center (UTC-05:00)"
  }, {
    value: "America/Cayman",
    label: "America/Cayman (UTC-05:00)"
  }, {
    value: "America/Indiana/Tell_City",
    label: "America/Indiana/Tell_City (UTC-05:00)"
  }, {
    value: "America/Mexico_City",
    label: "America/Mexico_City (UTC-05:00)"
  }, {
    value: "America/Matamoros",
    label: "America/Matamoros (UTC-05:00)"
  }, {
    value: "CST6CDT",
    label: "CST6CDT (UTC-05:00)"
  }, {
    value: "America/Knox_IN",
    label: "America/Knox_IN (UTC-05:00)"
  }, {
    value: "America/Bogota",
    label: "America/Bogota (UTC-05:00)"
  }, {
    value: "America/Menominee",
    label: "America/Menominee (UTC-05:00)"
  }, {
    value: "America/Resolute",
    label: "America/Resolute (UTC-05:00)"
  }, {
    value: "SystemV/EST5",
    label: "SystemV/EST5 (UTC-05:00)"
  }, {
    value: "Canada/Central",
    label: "Canada/Central (UTC-05:00)"
  }, {
    value: "Brazil/Acre",
    label: "Brazil/Acre (UTC-05:00)"
  }, {
    value: "America/Cancun",
    label: "America/Cancun (UTC-05:00)"
  }, {
    value: "America/Lima",
    label: "America/Lima (UTC-05:00)"
  }, {
    value: "America/Bahia_Banderas",
    label: "America/Bahia_Banderas (UTC-05:00)"
  }, {
    value: "US/Indiana-Starke",
    label: "US/Indiana-Starke (UTC-05:00)"
  }, {
    value: "America/Rio_Branco",
    label: "America/Rio_Branco (UTC-05:00)"
  }, {
    value: "SystemV/CST6CDT",
    label: "SystemV/CST6CDT (UTC-05:00)"
  }, {
    value: "Jamaica",
    label: "Jamaica (UTC-05:00)"
  }, {
    value: "America/Merida",
    label: "America/Merida (UTC-05:00)"
  }, {
    value: "America/North_Dakota/New_Salem",
    label: "America/North_Dakota/New_Salem (UTC-05:00)"
  }, {
    value: "America/Winnipeg",
    label: "America/Winnipeg (UTC-05:00)"
  }, {
    value: "America/Cuiaba",
    label: "America/Cuiaba (UTC-04:00)"
  }, {
    value: "America/Marigot",
    label: "America/Marigot (UTC-04:00)"
  }, {
    value: "America/Indiana/Petersburg",
    label: "America/Indiana/Petersburg (UTC-04:00)"
  }, {
    value: "Chile/Continental",
    label: "Chile/Continental (UTC-04:00)"
  }, {
    value: "America/Grand_Turk",
    label: "America/Grand_Turk (UTC-04:00)"
  }, {
    value: "Cuba",
    label: "Cuba (UTC-04:00)"
  }, {
    value: "Etc/GMT+4",
    label: "Etc/GMT+4 (UTC-04:00)"
  }, {
    value: "America/Manaus",
    label: "America/Manaus (UTC-04:00)"
  }, {
    value: "America/Fort_Wayne",
    label: "America/Fort_Wayne (UTC-04:00)"
  }, {
    value: "America/St_Thomas",
    label: "America/St_Thomas (UTC-04:00)"
  }, {
    value: "America/Anguilla",
    label: "America/Anguilla (UTC-04:00)"
  }, {
    value: "America/Havana",
    label: "America/Havana (UTC-04:00)"
  }, {
    value: "US/Michigan",
    label: "US/Michigan (UTC-04:00)"
  }, {
    value: "America/Barbados",
    label: "America/Barbados (UTC-04:00)"
  }, {
    value: "America/Louisville",
    label: "America/Louisville (UTC-04:00)"
  }, {
    value: "America/Curacao",
    label: "America/Curacao (UTC-04:00)"
  }, {
    value: "America/Guyana",
    label: "America/Guyana (UTC-04:00)"
  }, {
    value: "America/Martinique",
    label: "America/Martinique (UTC-04:00)"
  }, {
    value: "America/Puerto_Rico",
    label: "America/Puerto_Rico (UTC-04:00)"
  }, {
    value: "America/Port_of_Spain",
    label: "America/Port_of_Spain (UTC-04:00)"
  }, {
    value: "SystemV/AST4",
    label: "SystemV/AST4 (UTC-04:00)"
  }, {
    value: "America/Indiana/Vevay",
    label: "America/Indiana/Vevay (UTC-04:00)"
  }, {
    value: "America/Indiana/Vincennes",
    label: "America/Indiana/Vincennes (UTC-04:00)"
  }, {
    value: "America/Kralendijk",
    label: "America/Kralendijk (UTC-04:00)"
  }, {
    value: "America/Antigua",
    label: "America/Antigua (UTC-04:00)"
  }, {
    value: "America/Indianapolis",
    label: "America/Indianapolis (UTC-04:00)"
  }, {
    value: "America/Iqaluit",
    label: "America/Iqaluit (UTC-04:00)"
  }, {
    value: "America/St_Vincent",
    label: "America/St_Vincent (UTC-04:00)"
  }, {
    value: "America/Kentucky/Louisville",
    label: "America/Kentucky/Louisville (UTC-04:00)"
  }, {
    value: "America/Dominica",
    label: "America/Dominica (UTC-04:00)"
  }, {
    value: "America/Asuncion",
    label: "America/Asuncion (UTC-04:00)"
  }, {
    value: "EST5EDT",
    label: "EST5EDT (UTC-04:00)"
  }, {
    value: "America/Nassau",
    label: "America/Nassau (UTC-04:00)"
  }, {
    value: "America/Kentucky/Monticello",
    label: "America/Kentucky/Monticello (UTC-04:00)"
  }, {
    value: "Brazil/West",
    label: "Brazil/West (UTC-04:00)"
  }, {
    value: "America/Aruba",
    label: "America/Aruba (UTC-04:00)"
  }, {
    value: "America/Indiana/Indianapolis",
    label: "America/Indiana/Indianapolis (UTC-04:00)"
  }, {
    value: "America/Santiago",
    label: "America/Santiago (UTC-04:00)"
  }, {
    value: "America/La_Paz",
    label: "America/La_Paz (UTC-04:00)"
  }, {
    value: "America/Thunder_Bay",
    label: "America/Thunder_Bay (UTC-04:00)"
  }, {
    value: "America/Indiana/Marengo",
    label: "America/Indiana/Marengo (UTC-04:00)"
  }, {
    value: "America/Blanc-Sablon",
    label: "America/Blanc-Sablon (UTC-04:00)"
  }, {
    value: "America/Santo_Domingo",
    label: "America/Santo_Domingo (UTC-04:00)"
  }, {
    value: "US/Eastern",
    label: "US/Eastern (UTC-04:00)"
  }, {
    value: "Canada/Eastern",
    label: "Canada/Eastern (UTC-04:00)"
  }, {
    value: "America/Port-au-Prince",
    label: "America/Port-au-Prince (UTC-04:00)"
  }, {
    value: "America/St_Barthelemy",
    label: "America/St_Barthelemy (UTC-04:00)"
  }, {
    value: "America/Nipigon",
    label: "America/Nipigon (UTC-04:00)"
  }, {
    value: "US/East-Indiana",
    label: "US/East-Indiana (UTC-04:00)"
  }, {
    value: "America/St_Lucia",
    label: "America/St_Lucia (UTC-04:00)"
  }, {
    value: "America/Montserrat",
    label: "America/Montserrat (UTC-04:00)"
  }, {
    value: "America/Lower_Princes",
    label: "America/Lower_Princes (UTC-04:00)"
  }, {
    value: "America/Detroit",
    label: "America/Detroit (UTC-04:00)"
  }, {
    value: "America/Tortola",
    label: "America/Tortola (UTC-04:00)"
  }, {
    value: "America/Porto_Velho",
    label: "America/Porto_Velho (UTC-04:00)"
  }, {
    value: "America/Campo_Grande",
    label: "America/Campo_Grande (UTC-04:00)"
  }, {
    value: "America/Virgin",
    label: "America/Virgin (UTC-04:00)"
  }, {
    value: "America/Pangnirtung",
    label: "America/Pangnirtung (UTC-04:00)"
  }, {
    value: "America/Montreal",
    label: "America/Montreal (UTC-04:00)"
  }, {
    value: "America/Indiana/Winamac",
    label: "America/Indiana/Winamac (UTC-04:00)"
  }, {
    value: "America/Boa_Vista",
    label: "America/Boa_Vista (UTC-04:00)"
  }, {
    value: "America/Grenada",
    label: "America/Grenada (UTC-04:00)"
  }, {
    value: "America/New_York",
    label: "America/New_York (UTC-04:00)"
  }, {
    value: "America/St_Kitts",
    label: "America/St_Kitts (UTC-04:00)"
  }, {
    value: "America/Caracas",
    label: "America/Caracas (UTC-04:00)"
  }, {
    value: "America/Guadeloupe",
    label: "America/Guadeloupe (UTC-04:00)"
  }, {
    value: "America/Toronto",
    label: "America/Toronto (UTC-04:00)"
  }, {
    value: "SystemV/EST5EDT",
    label: "SystemV/EST5EDT (UTC-04:00)"
  }, {
    value: "America/Argentina/Catamarca",
    label: "America/Argentina/Catamarca (UTC-03:00)"
  }, {
    value: "Canada/Atlantic",
    label: "Canada/Atlantic (UTC-03:00)"
  }, {
    value: "America/Argentina/Cordoba",
    label: "America/Argentina/Cordoba (UTC-03:00)"
  }, {
    value: "America/Araguaina",
    label: "America/Araguaina (UTC-03:00)"
  }, {
    value: "America/Argentina/Salta",
    label: "America/Argentina/Salta (UTC-03:00)"
  }, {
    value: "Etc/GMT+3",
    label: "Etc/GMT+3 (UTC-03:00)"
  }, {
    value: "America/Montevideo",
    label: "America/Montevideo (UTC-03:00)"
  }, {
    value: "Brazil/East",
    label: "Brazil/East (UTC-03:00)"
  }, {
    value: "America/Argentina/Mendoza",
    label: "America/Argentina/Mendoza (UTC-03:00)"
  }, {
    value: "America/Argentina/Rio_Gallegos",
    label: "America/Argentina/Rio_Gallegos (UTC-03:00)"
  }, {
    value: "America/Catamarca",
    label: "America/Catamarca (UTC-03:00)"
  }, {
    value: "America/Cordoba",
    label: "America/Cordoba (UTC-03:00)"
  }, {
    value: "America/Sao_Paulo",
    label: "America/Sao_Paulo (UTC-03:00)"
  }, {
    value: "America/Argentina/Jujuy",
    label: "America/Argentina/Jujuy (UTC-03:00)"
  }, {
    value: "America/Cayenne",
    label: "America/Cayenne (UTC-03:00)"
  }, {
    value: "America/Recife",
    label: "America/Recife (UTC-03:00)"
  }, {
    value: "America/Buenos_Aires",
    label: "America/Buenos_Aires (UTC-03:00)"
  }, {
    value: "America/Paramaribo",
    label: "America/Paramaribo (UTC-03:00)"
  }, {
    value: "America/Moncton",
    label: "America/Moncton (UTC-03:00)"
  }, {
    value: "America/Mendoza",
    label: "America/Mendoza (UTC-03:00)"
  }, {
    value: "America/Santarem",
    label: "America/Santarem (UTC-03:00)"
  }, {
    value: "Atlantic/Bermuda",
    label: "Atlantic/Bermuda (UTC-03:00)"
  }, {
    value: "America/Maceio",
    label: "America/Maceio (UTC-03:00)"
  }, {
    value: "Atlantic/Stanley",
    label: "Atlantic/Stanley (UTC-03:00)"
  }, {
    value: "America/Halifax",
    label: "America/Halifax (UTC-03:00)"
  }, {
    value: "Antarctica/Rothera",
    label: "Antarctica/Rothera (UTC-03:00)"
  }, {
    value: "America/Argentina/San_Luis",
    label: "America/Argentina/San_Luis (UTC-03:00)"
  }, {
    value: "America/Argentina/Ushuaia",
    label: "America/Argentina/Ushuaia (UTC-03:00)"
  }, {
    value: "Antarctica/Palmer",
    label: "Antarctica/Palmer (UTC-03:00)"
  }, {
    value: "America/Punta_Arenas",
    label: "America/Punta_Arenas (UTC-03:00)"
  }, {
    value: "America/Glace_Bay",
    label: "America/Glace_Bay (UTC-03:00)"
  }, {
    value: "America/Fortaleza",
    label: "America/Fortaleza (UTC-03:00)"
  }, {
    value: "America/Thule",
    label: "America/Thule (UTC-03:00)"
  }, {
    value: "America/Argentina/La_Rioja",
    label: "America/Argentina/La_Rioja (UTC-03:00)"
  }, {
    value: "America/Belem",
    label: "America/Belem (UTC-03:00)"
  }, {
    value: "America/Jujuy",
    label: "America/Jujuy (UTC-03:00)"
  }, {
    value: "America/Bahia",
    label: "America/Bahia (UTC-03:00)"
  }, {
    value: "America/Goose_Bay",
    label: "America/Goose_Bay (UTC-03:00)"
  }, {
    value: "America/Argentina/San_Juan",
    label: "America/Argentina/San_Juan (UTC-03:00)"
  }, {
    value: "America/Argentina/ComodRivadavia",
    label: "America/Argentina/ComodRivadavia (UTC-03:00)"
  }, {
    value: "America/Argentina/Tucuman",
    label: "America/Argentina/Tucuman (UTC-03:00)"
  }, {
    value: "America/Rosario",
    label: "America/Rosario (UTC-03:00)"
  }, {
    value: "SystemV/AST4ADT",
    label: "SystemV/AST4ADT (UTC-03:00)"
  }, {
    value: "America/Argentina/Buenos_Aires",
    label: "America/Argentina/Buenos_Aires (UTC-03:00)"
  }, {
    value: "America/St_Johns",
    label: "America/St_Johns (UTC-02:30)"
  }, {
    value: "Canada/Newfoundland",
    label: "Canada/Newfoundland (UTC-02:30)"
  }, {
    value: "America/Miquelon",
    label: "America/Miquelon (UTC-02:00)"
  }, {
    value: "Etc/GMT+2",
    label: "Etc/GMT+2 (UTC-02:00)"
  }, {
    value: "America/Godthab",
    label: "America/Godthab (UTC-02:00)"
  }, {
    value: "America/Noronha",
    label: "America/Noronha (UTC-02:00)"
  }, {
    value: "Brazil/DeNoronha",
    label: "Brazil/DeNoronha (UTC-02:00)"
  }, {
    value: "Atlantic/South_Georgia",
    label: "Atlantic/South_Georgia (UTC-02:00)"
  }, {
    value: "Etc/GMT+1",
    label: "Etc/GMT+1 (UTC-01:00)"
  }, {
    value: "Atlantic/Cape_Verde",
    label: "Atlantic/Cape_Verde (UTC-01:00)"
  }, {
    value: "Pacific/Kiritimati",
    label: "Pacific/Kiritimati (UTC+14:00)"
  }, {
    value: "Etc/GMT-14",
    label: "Etc/GMT-14 (UTC+14:00)"
  }, {
    value: "Pacific/Fakaofo",
    label: "Pacific/Fakaofo (UTC+13:00)"
  }, {
    value: "Pacific/Enderbury",
    label: "Pacific/Enderbury (UTC+13:00)"
  }, {
    value: "Pacific/Apia",
    label: "Pacific/Apia (UTC+13:00)"
  }, {
    value: "Pacific/Tongatapu",
    label: "Pacific/Tongatapu (UTC+13:00)"
  }, {
    value: "Etc/GMT-13",
    label: "Etc/GMT-13 (UTC+13:00)"
  }, {
    value: "NZ-CHAT",
    label: "NZ-CHAT (UTC+12:45)"
  }, {
    value: "Pacific/Chatham",
    label: "Pacific/Chatham (UTC+12:45)"
  }, {
    value: "Pacific/Kwajalein",
    label: "Pacific/Kwajalein (UTC+12:00)"
  }, {
    value: "Antarctica/McMurdo",
    label: "Antarctica/McMurdo (UTC+12:00)"
  }, {
    value: "Pacific/Wallis",
    label: "Pacific/Wallis (UTC+12:00)"
  }, {
    value: "Pacific/Fiji",
    label: "Pacific/Fiji (UTC+12:00)"
  }, {
    value: "Pacific/Funafuti",
    label: "Pacific/Funafuti (UTC+12:00)"
  }, {
    value: "Pacific/Nauru",
    label: "Pacific/Nauru (UTC+12:00)"
  }, {
    value: "Kwajalein",
    label: "Kwajalein (UTC+12:00)"
  }, {
    value: "NZ",
    label: "NZ (UTC+12:00)"
  }, {
    value: "Pacific/Wake",
    label: "Pacific/Wake (UTC+12:00)"
  }, {
    value: "Antarctica/South_Pole",
    label: "Antarctica/South_Pole (UTC+12:00)"
  }, {
    value: "Pacific/Tarawa",
    label: "Pacific/Tarawa (UTC+12:00)"
  }, {
    value: "Pacific/Auckland",
    label: "Pacific/Auckland (UTC+12:00)"
  }, {
    value: "Asia/Kamchatka",
    label: "Asia/Kamchatka (UTC+12:00)"
  }, {
    value: "Etc/GMT-12",
    label: "Etc/GMT-12 (UTC+12:00)"
  }, {
    value: "Asia/Anadyr",
    label: "Asia/Anadyr (UTC+12:00)"
  }, {
    value: "Pacific/Majuro",
    label: "Pacific/Majuro (UTC+12:00)"
  }, {
    value: "Pacific/Ponape",
    label: "Pacific/Ponape (UTC+11:00)"
  }, {
    value: "Pacific/Bougainville",
    label: "Pacific/Bougainville (UTC+11:00)"
  }, {
    value: "Antarctica/Macquarie",
    label: "Antarctica/Macquarie (UTC+11:00)"
  }, {
    value: "Pacific/Pohnpei",
    label: "Pacific/Pohnpei (UTC+11:00)"
  }, {
    value: "Pacific/Efate",
    label: "Pacific/Efate (UTC+11:00)"
  }, {
    value: "Pacific/Norfolk",
    label: "Pacific/Norfolk (UTC+11:00)"
  }, {
    value: "Asia/Magadan",
    label: "Asia/Magadan (UTC+11:00)"
  }, {
    value: "Pacific/Kosrae",
    label: "Pacific/Kosrae (UTC+11:00)"
  }, {
    value: "Asia/Sakhalin",
    label: "Asia/Sakhalin (UTC+11:00)"
  }, {
    value: "Pacific/Noumea",
    label: "Pacific/Noumea (UTC+11:00)"
  }, {
    value: "Etc/GMT-11",
    label: "Etc/GMT-11 (UTC+11:00)"
  }, {
    value: "Asia/Srednekolymsk",
    label: "Asia/Srednekolymsk (UTC+11:00)"
  }, {
    value: "Pacific/Guadalcanal",
    label: "Pacific/Guadalcanal (UTC+11:00)"
  }, {
    value: "Australia/Lord_Howe",
    label: "Australia/Lord_Howe (UTC+10:30)"
  }, {
    value: "Australia/LHI",
    label: "Australia/LHI (UTC+10:30)"
  }, {
    value: "Australia/Hobart",
    label: "Australia/Hobart (UTC+10:00)"
  }, {
    value: "Pacific/Yap",
    label: "Pacific/Yap (UTC+10:00)"
  }, {
    value: "Australia/Tasmania",
    label: "Australia/Tasmania (UTC+10:00)"
  }, {
    value: "Pacific/Port_Moresby",
    label: "Pacific/Port_Moresby (UTC+10:00)"
  }, {
    value: "Australia/ACT",
    label: "Australia/ACT (UTC+10:00)"
  }, {
    value: "Australia/Victoria",
    label: "Australia/Victoria (UTC+10:00)"
  }, {
    value: "Pacific/Chuuk",
    label: "Pacific/Chuuk (UTC+10:00)"
  }, {
    value: "Australia/Queensland",
    label: "Australia/Queensland (UTC+10:00)"
  }, {
    value: "Australia/Canberra",
    label: "Australia/Canberra (UTC+10:00)"
  }, {
    value: "Australia/Currie",
    label: "Australia/Currie (UTC+10:00)"
  }, {
    value: "Pacific/Guam",
    label: "Pacific/Guam (UTC+10:00)"
  }, {
    value: "Pacific/Truk",
    label: "Pacific/Truk (UTC+10:00)"
  }, {
    value: "Australia/NSW",
    label: "Australia/NSW (UTC+10:00)"
  }, {
    value: "Asia/Vladivostok",
    label: "Asia/Vladivostok (UTC+10:00)"
  }, {
    value: "Pacific/Saipan",
    label: "Pacific/Saipan (UTC+10:00)"
  }, {
    value: "Antarctica/DumontDUrville",
    label: "Antarctica/DumontDUrville (UTC+10:00)"
  }, {
    value: "Australia/Sydney",
    label: "Australia/Sydney (UTC+10:00)"
  }, {
    value: "Australia/Brisbane",
    label: "Australia/Brisbane (UTC+10:00)"
  }, {
    value: "Etc/GMT-10",
    label: "Etc/GMT-10 (UTC+10:00)"
  }, {
    value: "Asia/Ust-Nera",
    label: "Asia/Ust-Nera (UTC+10:00)"
  }, {
    value: "Australia/Melbourne",
    label: "Australia/Melbourne (UTC+10:00)"
  }, {
    value: "Australia/Lindeman",
    label: "Australia/Lindeman (UTC+10:00)"
  }, {
    value: "Australia/North",
    label: "Australia/North (UTC+09:30)"
  }, {
    value: "Australia/Yancowinna",
    label: "Australia/Yancowinna (UTC+09:30)"
  }, {
    value: "Australia/Adelaide",
    label: "Australia/Adelaide (UTC+09:30)"
  }, {
    value: "Australia/Broken_Hill",
    label: "Australia/Broken_Hill (UTC+09:30)"
  }, {
    value: "Australia/South",
    label: "Australia/South (UTC+09:30)"
  }, {
    value: "Australia/Darwin",
    label: "Australia/Darwin (UTC+09:30)"
  }, {
    value: "Etc/GMT-9",
    label: "Etc/GMT-9 (UTC+09:00)"
  }, {
    value: "Pacific/Palau",
    label: "Pacific/Palau (UTC+09:00)"
  }, {
    value: "Asia/Chita",
    label: "Asia/Chita (UTC+09:00)"
  }, {
    value: "Asia/Dili",
    label: "Asia/Dili (UTC+09:00)"
  }, {
    value: "Asia/Jayapura",
    label: "Asia/Jayapura (UTC+09:00)"
  }, {
    value: "Asia/Yakutsk",
    label: "Asia/Yakutsk (UTC+09:00)"
  }, {
    value: "Asia/Pyongyang",
    label: "Asia/Pyongyang (UTC+09:00)"
  }, {
    value: "ROK",
    label: "ROK (UTC+09:00)"
  }, {
    value: "Asia/Seoul",
    label: "Asia/Seoul (UTC+09:00)"
  }, {
    value: "Asia/Khandyga",
    label: "Asia/Khandyga (UTC+09:00)"
  }, {
    value: "Japan",
    label: "Japan (UTC+09:00)"
  }, {
    value: "Asia/Tokyo",
    label: "Asia/Tokyo (UTC+09:00)"
  }, {
    value: "Australia/Eucla",
    label: "Australia/Eucla (UTC+08:45)"
  }, {
    value: "Asia/Kuching",
    label: "Asia/Kuching (UTC+08:00)"
  }, {
    value: "Asia/Chungking",
    label: "Asia/Chungking (UTC+08:00)"
  }, {
    value: "Etc/GMT-8",
    label: "Etc/GMT-8 (UTC+08:00)"
  }, {
    value: "Australia/Perth",
    label: "Australia/Perth (UTC+08:00)"
  }, {
    value: "Asia/Macao",
    label: "Asia/Macao (UTC+08:00)"
  }, {
    value: "Asia/Macau",
    label: "Asia/Macau (UTC+08:00)"
  }, {
    value: "Asia/Choibalsan",
    label: "Asia/Choibalsan (UTC+08:00)"
  }, {
    value: "Asia/Shanghai",
    label: "Asia/Shanghai (UTC+08:00)"
  }, {
    value: "Antarctica/Casey",
    label: "Antarctica/Casey (UTC+08:00)"
  }, {
    value: "Asia/Ulan_Bator",
    label: "Asia/Ulan_Bator (UTC+08:00)"
  }, {
    value: "Asia/Chongqing",
    label: "Asia/Chongqing (UTC+08:00)"
  }, {
    value: "Asia/Ulaanbaatar",
    label: "Asia/Ulaanbaatar (UTC+08:00)"
  }, {
    value: "Asia/Taipei",
    label: "Asia/Taipei (UTC+08:00)"
  }, {
    value: "Asia/Manila",
    label: "Asia/Manila (UTC+08:00)"
  }, {
    value: "PRC",
    label: "PRC (UTC+08:00)"
  }, {
    value: "Asia/Ujung_Pandang",
    label: "Asia/Ujung_Pandang (UTC+08:00)"
  }, {
    value: "Asia/Harbin",
    label: "Asia/Harbin (UTC+08:00)"
  }, {
    value: "Singapore",
    label: "Singapore (UTC+08:00)"
  }, {
    value: "Asia/Brunei",
    label: "Asia/Brunei (UTC+08:00)"
  }, {
    value: "Australia/West",
    label: "Australia/West (UTC+08:00)"
  }, {
    value: "Asia/Hong_Kong",
    label: "Asia/Hong_Kong (UTC+08:00)"
  }, {
    value: "Asia/Makassar",
    label: "Asia/Makassar (UTC+08:00)"
  }, {
    value: "Hongkong",
    label: "Hongkong (UTC+08:00)"
  }, {
    value: "Asia/Kuala_Lumpur",
    label: "Asia/Kuala_Lumpur (UTC+08:00)"
  }, {
    value: "Asia/Irkutsk",
    label: "Asia/Irkutsk (UTC+08:00)"
  }, {
    value: "Asia/Singapore",
    label: "Asia/Singapore (UTC+08:00)"
  }, {
    value: "Asia/Pontianak",
    label: "Asia/Pontianak (UTC+07:00)"
  }, {
    value: "Etc/GMT-7",
    label: "Etc/GMT-7 (UTC+07:00)"
  }, {
    value: "Asia/Phnom_Penh",
    label: "Asia/Phnom_Penh (UTC+07:00)"
  }, {
    value: "Asia/Novosibirsk",
    label: "Asia/Novosibirsk (UTC+07:00)"
  }, {
    value: "Antarctica/Davis",
    label: "Antarctica/Davis (UTC+07:00)"
  }, {
    value: "Asia/Tomsk",
    label: "Asia/Tomsk (UTC+07:00)"
  }, {
    value: "Asia/Jakarta",
    label: "Asia/Jakarta (UTC+07:00)"
  }, {
    value: "Asia/Barnaul",
    label: "Asia/Barnaul (UTC+07:00)"
  }, {
    value: "Indian/Christmas",
    label: "Indian/Christmas (UTC+07:00)"
  }, {
    value: "Asia/Ho_Chi_Minh",
    label: "Asia/Ho_Chi_Minh (UTC+07:00)"
  }, {
    value: "Asia/Hovd",
    label: "Asia/Hovd (UTC+07:00)"
  }, {
    value: "Asia/Bangkok",
    label: "Asia/Bangkok (UTC+07:00)"
  }, {
    value: "Asia/Vientiane",
    label: "Asia/Vientiane (UTC+07:00)"
  }, {
    value: "Asia/Novokuznetsk",
    label: "Asia/Novokuznetsk (UTC+07:00)"
  }, {
    value: "Asia/Krasnoyarsk",
    label: "Asia/Krasnoyarsk (UTC+07:00)"
  }, {
    value: "Asia/Saigon",
    label: "Asia/Saigon (UTC+07:00)"
  }, {
    value: "Asia/Yangon",
    label: "Asia/Yangon (UTC+06:30)"
  }, {
    value: "Asia/Rangoon",
    label: "Asia/Rangoon (UTC+06:30)"
  }, {
    value: "Indian/Cocos",
    label: "Indian/Cocos (UTC+06:30)"
  }, {
    value: "Asia/Kashgar",
    label: "Asia/Kashgar (UTC+06:00)"
  }, {
    value: "Etc/GMT-6",
    label: "Etc/GMT-6 (UTC+06:00)"
  }, {
    value: "Asia/Almaty",
    label: "Asia/Almaty (UTC+06:00)"
  }, {
    value: "Asia/Dacca",
    label: "Asia/Dacca (UTC+06:00)"
  }, {
    value: "Asia/Omsk",
    label: "Asia/Omsk (UTC+06:00)"
  }, {
    value: "Asia/Dhaka",
    label: "Asia/Dhaka (UTC+06:00)"
  }, {
    value: "Indian/Chagos",
    label: "Indian/Chagos (UTC+06:00)"
  }, {
    value: "Asia/Qyzylorda",
    label: "Asia/Qyzylorda (UTC+06:00)"
  }, {
    value: "Asia/Bishkek",
    label: "Asia/Bishkek (UTC+06:00)"
  }, {
    value: "Antarctica/Vostok",
    label: "Antarctica/Vostok (UTC+06:00)"
  }, {
    value: "Asia/Urumqi",
    label: "Asia/Urumqi (UTC+06:00)"
  }, {
    value: "Asia/Thimbu",
    label: "Asia/Thimbu (UTC+06:00)"
  }, {
    value: "Asia/Thimphu",
    label: "Asia/Thimphu (UTC+06:00)"
  }, {
    value: "Asia/Kathmandu",
    label: "Asia/Kathmandu (UTC+05:45)"
  }, {
    value: "Asia/Katmandu",
    label: "Asia/Katmandu (UTC+05:45)"
  }, {
    value: "Asia/Kolkata",
    label: "Asia/Kolkata (UTC+05:30)"
  }, {
    value: "Asia/Colombo",
    label: "Asia/Colombo (UTC+05:30)"
  }, {
    value: "Asia/Calcutta",
    label: "Asia/Calcutta (UTC+05:30)"
  }, {
    value: "Asia/Aqtau",
    label: "Asia/Aqtau (UTC+05:00)"
  }, {
    value: "Etc/GMT-5",
    label: "Etc/GMT-5 (UTC+05:00)"
  }, {
    value: "Asia/Samarkand",
    label: "Asia/Samarkand (UTC+05:00)"
  }, {
    value: "Asia/Karachi",
    label: "Asia/Karachi (UTC+05:00)"
  }, {
    value: "Asia/Yekaterinburg",
    label: "Asia/Yekaterinburg (UTC+05:00)"
  }, {
    value: "Asia/Dushanbe",
    label: "Asia/Dushanbe (UTC+05:00)"
  }, {
    value: "Indian/Maldives",
    label: "Indian/Maldives (UTC+05:00)"
  }, {
    value: "Asia/Oral",
    label: "Asia/Oral (UTC+05:00)"
  }, {
    value: "Asia/Tashkent",
    label: "Asia/Tashkent (UTC+05:00)"
  }, {
    value: "Antarctica/Mawson",
    label: "Antarctica/Mawson (UTC+05:00)"
  }, {
    value: "Asia/Aqtobe",
    label: "Asia/Aqtobe (UTC+05:00)"
  }, {
    value: "Asia/Ashkhabad",
    label: "Asia/Ashkhabad (UTC+05:00)"
  }, {
    value: "Asia/Ashgabat",
    label: "Asia/Ashgabat (UTC+05:00)"
  }, {
    value: "Asia/Atyrau",
    label: "Asia/Atyrau (UTC+05:00)"
  }, {
    value: "Indian/Kerguelen",
    label: "Indian/Kerguelen (UTC+05:00)"
  }, {
    value: "Iran",
    label: "Iran (UTC+04:30)"
  }, {
    value: "Asia/Tehran",
    label: "Asia/Tehran (UTC+04:30)"
  }, {
    value: "Asia/Kabul",
    label: "Asia/Kabul (UTC+04:30)"
  }, {
    value: "Asia/Yerevan",
    label: "Asia/Yerevan (UTC+04:00)"
  }, {
    value: "Etc/GMT-4",
    label: "Etc/GMT-4 (UTC+04:00)"
  }, {
    value: "Asia/Dubai",
    label: "Asia/Dubai (UTC+04:00)"
  }, {
    value: "Indian/Reunion",
    label: "Indian/Reunion (UTC+04:00)"
  }, {
    value: "Indian/Mauritius",
    label: "Indian/Mauritius (UTC+04:00)"
  }, {
    value: "Europe/Saratov",
    label: "Europe/Saratov (UTC+04:00)"
  }, {
    value: "Europe/Samara",
    label: "Europe/Samara (UTC+04:00)"
  }, {
    value: "Indian/Mahe",
    label: "Indian/Mahe (UTC+04:00)"
  }, {
    value: "Asia/Baku",
    label: "Asia/Baku (UTC+04:00)"
  }, {
    value: "Asia/Muscat",
    label: "Asia/Muscat (UTC+04:00)"
  }, {
    value: "Europe/Volgograd",
    label: "Europe/Volgograd (UTC+04:00)"
  }, {
    value: "Europe/Astrakhan",
    label: "Europe/Astrakhan (UTC+04:00)"
  }, {
    value: "Asia/Tbilisi",
    label: "Asia/Tbilisi (UTC+04:00)"
  }, {
    value: "Europe/Ulyanovsk",
    label: "Europe/Ulyanovsk (UTC+04:00)"
  }, {
    value: "Asia/Aden",
    label: "Asia/Aden (UTC+03:00)"
  }, {
    value: "Africa/Nairobi",
    label: "Africa/Nairobi (UTC+03:00)"
  }, {
    value: "Europe/Istanbul",
    label: "Europe/Istanbul (UTC+03:00)"
  }, {
    value: "Etc/GMT-3",
    label: "Etc/GMT-3 (UTC+03:00)"
  }, {
    value: "Europe/Zaporozhye",
    label: "Europe/Zaporozhye (UTC+03:00)"
  }, {
    value: "Israel",
    label: "Israel (UTC+03:00)"
  }, {
    value: "Indian/Comoro",
    label: "Indian/Comoro (UTC+03:00)"
  }, {
    value: "Antarctica/Syowa",
    label: "Antarctica/Syowa (UTC+03:00)"
  }, {
    value: "Africa/Mogadishu",
    label: "Africa/Mogadishu (UTC+03:00)"
  }, {
    value: "Europe/Bucharest",
    label: "Europe/Bucharest (UTC+03:00)"
  }, {
    value: "Africa/Asmera",
    label: "Africa/Asmera (UTC+03:00)"
  }, {
    value: "Europe/Mariehamn",
    label: "Europe/Mariehamn (UTC+03:00)"
  }, {
    value: "Asia/Istanbul",
    label: "Asia/Istanbul (UTC+03:00)"
  }, {
    value: "Europe/Tiraspol",
    label: "Europe/Tiraspol (UTC+03:00)"
  }, {
    value: "Europe/Moscow",
    label: "Europe/Moscow (UTC+03:00)"
  }, {
    value: "Europe/Chisinau",
    label: "Europe/Chisinau (UTC+03:00)"
  }, {
    value: "Europe/Helsinki",
    label: "Europe/Helsinki (UTC+03:00)"
  }, {
    value: "Asia/Beirut",
    label: "Asia/Beirut (UTC+03:00)"
  }, {
    value: "Asia/Tel_Aviv",
    label: "Asia/Tel_Aviv (UTC+03:00)"
  }, {
    value: "Africa/Djibouti",
    label: "Africa/Djibouti (UTC+03:00)"
  }, {
    value: "Europe/Simferopol",
    label: "Europe/Simferopol (UTC+03:00)"
  }, {
    value: "Europe/Sofia",
    label: "Europe/Sofia (UTC+03:00)"
  }, {
    value: "Asia/Gaza",
    label: "Asia/Gaza (UTC+03:00)"
  }, {
    value: "Africa/Asmara",
    label: "Africa/Asmara (UTC+03:00)"
  }, {
    value: "Europe/Riga",
    label: "Europe/Riga (UTC+03:00)"
  }, {
    value: "Asia/Baghdad",
    label: "Asia/Baghdad (UTC+03:00)"
  }, {
    value: "Asia/Damascus",
    label: "Asia/Damascus (UTC+03:00)"
  }, {
    value: "Africa/Dar_es_Salaam",
    label: "Africa/Dar_es_Salaam (UTC+03:00)"
  }, {
    value: "Africa/Addis_Ababa",
    label: "Africa/Addis_Ababa (UTC+03:00)"
  }, {
    value: "Europe/Uzhgorod",
    label: "Europe/Uzhgorod (UTC+03:00)"
  }, {
    value: "Asia/Jerusalem",
    label: "Asia/Jerusalem (UTC+03:00)"
  }, {
    value: "Asia/Riyadh",
    label: "Asia/Riyadh (UTC+03:00)"
  }, {
    value: "Asia/Kuwait",
    label: "Asia/Kuwait (UTC+03:00)"
  }, {
    value: "Europe/Kirov",
    label: "Europe/Kirov (UTC+03:00)"
  }, {
    value: "Africa/Kampala",
    label: "Africa/Kampala (UTC+03:00)"
  }, {
    value: "Europe/Minsk",
    label: "Europe/Minsk (UTC+03:00)"
  }, {
    value: "Asia/Qatar",
    label: "Asia/Qatar (UTC+03:00)"
  }, {
    value: "Europe/Kiev",
    label: "Europe/Kiev (UTC+03:00)"
  }, {
    value: "Asia/Bahrain",
    label: "Asia/Bahrain (UTC+03:00)"
  }, {
    value: "Europe/Vilnius",
    label: "Europe/Vilnius (UTC+03:00)"
  }, {
    value: "Indian/Antananarivo",
    label: "Indian/Antananarivo (UTC+03:00)"
  }, {
    value: "Indian/Mayotte",
    label: "Indian/Mayotte (UTC+03:00)"
  }, {
    value: "Europe/Tallinn",
    label: "Europe/Tallinn (UTC+03:00)"
  }, {
    value: "Turkey",
    label: "Turkey (UTC+03:00)"
  }, {
    value: "Africa/Juba",
    label: "Africa/Juba (UTC+03:00)"
  }, {
    value: "Asia/Nicosia",
    label: "Asia/Nicosia (UTC+03:00)"
  }, {
    value: "Asia/Famagusta",
    label: "Asia/Famagusta (UTC+03:00)"
  }, {
    value: "W-SU",
    label: "W-SU (UTC+03:00)"
  }, {
    value: "EET",
    label: "EET (UTC+03:00)"
  }, {
    value: "Asia/Hebron",
    label: "Asia/Hebron (UTC+03:00)"
  }, {
    value: "Asia/Amman",
    label: "Asia/Amman (UTC+03:00)"
  }, {
    value: "Europe/Nicosia",
    label: "Europe/Nicosia (UTC+03:00)"
  }, {
    value: "Europe/Athens",
    label: "Europe/Athens (UTC+03:00)"
  }, {
    value: "Africa/Cairo",
    label: "Africa/Cairo (UTC+02:00)"
  }, {
    value: "Africa/Mbabane",
    label: "Africa/Mbabane (UTC+02:00)"
  }, {
    value: "Europe/Brussels",
    label: "Europe/Brussels (UTC+02:00)"
  }, {
    value: "Europe/Warsaw",
    label: "Europe/Warsaw (UTC+02:00)"
  }, {
    value: "CET",
    label: "CET (UTC+02:00)"
  }, {
    value: "Europe/Luxembourg",
    label: "Europe/Luxembourg (UTC+02:00)"
  }, {
    value: "Etc/GMT-2",
    label: "Etc/GMT-2 (UTC+02:00)"
  }, {
    value: "Libya",
    label: "Libya (UTC+02:00)"
  }, {
    value: "Africa/Kigali",
    label: "Africa/Kigali (UTC+02:00)"
  }, {
    value: "Africa/Tripoli",
    label: "Africa/Tripoli (UTC+02:00)"
  }, {
    value: "Europe/Kaliningrad",
    label: "Europe/Kaliningrad (UTC+02:00)"
  }, {
    value: "Africa/Windhoek",
    label: "Africa/Windhoek (UTC+02:00)"
  }, {
    value: "Europe/Malta",
    label: "Europe/Malta (UTC+02:00)"
  }, {
    value: "Europe/Busingen",
    label: "Europe/Busingen (UTC+02:00)"
  }, {
    value: "Europe/Skopje",
    label: "Europe/Skopje (UTC+02:00)"
  }, {
    value: "Europe/Sarajevo",
    label: "Europe/Sarajevo (UTC+02:00)"
  }, {
    value: "Europe/Rome",
    label: "Europe/Rome (UTC+02:00)"
  }, {
    value: "Europe/Zurich",
    label: "Europe/Zurich (UTC+02:00)"
  }, {
    value: "Europe/Gibraltar",
    label: "Europe/Gibraltar (UTC+02:00)"
  }, {
    value: "Africa/Lubumbashi",
    label: "Africa/Lubumbashi (UTC+02:00)"
  }, {
    value: "Europe/Vaduz",
    label: "Europe/Vaduz (UTC+02:00)"
  }, {
    value: "Europe/Ljubljana",
    label: "Europe/Ljubljana (UTC+02:00)"
  }, {
    value: "Europe/Berlin",
    label: "Europe/Berlin (UTC+02:00)"
  }, {
    value: "Europe/Stockholm",
    label: "Europe/Stockholm (UTC+02:00)"
  }, {
    value: "Europe/Budapest",
    label: "Europe/Budapest (UTC+02:00)"
  }, {
    value: "Europe/Zagreb",
    label: "Europe/Zagreb (UTC+02:00)"
  }, {
    value: "Europe/Paris",
    label: "Europe/Paris (UTC+02:00)"
  }, {
    value: "Africa/Ceuta",
    label: "Africa/Ceuta (UTC+02:00)"
  }, {
    value: "Europe/Prague",
    label: "Europe/Prague (UTC+02:00)"
  }, {
    value: "Antarctica/Troll",
    label: "Antarctica/Troll (UTC+02:00)"
  }, {
    value: "Africa/Gaborone",
    label: "Africa/Gaborone (UTC+02:00)"
  }, {
    value: "Europe/Copenhagen",
    label: "Europe/Copenhagen (UTC+02:00)"
  }, {
    value: "Europe/Vienna",
    label: "Europe/Vienna (UTC+02:00)"
  }, {
    value: "Europe/Tirane",
    label: "Europe/Tirane (UTC+02:00)"
  }, {
    value: "MET",
    label: "MET (UTC+02:00)"
  }, {
    value: "Europe/Amsterdam",
    label: "Europe/Amsterdam (UTC+02:00)"
  }, {
    value: "Africa/Maputo",
    label: "Africa/Maputo (UTC+02:00)"
  }, {
    value: "Europe/San_Marino",
    label: "Europe/San_Marino (UTC+02:00)"
  }, {
    value: "Poland",
    label: "Poland (UTC+02:00)"
  }, {
    value: "Europe/Andorra",
    label: "Europe/Andorra (UTC+02:00)"
  }, {
    value: "Europe/Oslo",
    label: "Europe/Oslo (UTC+02:00)"
  }, {
    value: "Europe/Podgorica",
    label: "Europe/Podgorica (UTC+02:00)"
  }, {
    value: "Africa/Bujumbura",
    label: "Africa/Bujumbura (UTC+02:00)"
  }, {
    value: "Atlantic/Jan_Mayen",
    label: "Atlantic/Jan_Mayen (UTC+02:00)"
  }, {
    value: "Africa/Maseru",
    label: "Africa/Maseru (UTC+02:00)"
  }, {
    value: "Europe/Madrid",
    label: "Europe/Madrid (UTC+02:00)"
  }, {
    value: "Africa/Blantyre",
    label: "Africa/Blantyre (UTC+02:00)"
  }, {
    value: "Africa/Lusaka",
    label: "Africa/Lusaka (UTC+02:00)"
  }, {
    value: "Africa/Harare",
    label: "Africa/Harare (UTC+02:00)"
  }, {
    value: "Africa/Khartoum",
    label: "Africa/Khartoum (UTC+02:00)"
  }, {
    value: "Africa/Johannesburg",
    label: "Africa/Johannesburg (UTC+02:00)"
  }, {
    value: "Europe/Belgrade",
    label: "Europe/Belgrade (UTC+02:00)"
  }, {
    value: "Europe/Bratislava",
    label: "Europe/Bratislava (UTC+02:00)"
  }, {
    value: "Arctic/Longyearbyen",
    label: "Arctic/Longyearbyen (UTC+02:00)"
  }, {
    value: "Egypt",
    label: "Egypt (UTC+02:00)"
  }, {
    value: "Europe/Vatican",
    label: "Europe/Vatican (UTC+02:00)"
  }, {
    value: "Europe/Monaco",
    label: "Europe/Monaco (UTC+02:00)"
  }, {
    value: "Europe/London",
    label: "Europe/London (UTC+01:00)"
  }, {
    value: "Etc/GMT-1",
    label: "Etc/GMT-1 (UTC+01:00)"
  }, {
    value: "Europe/Jersey",
    label: "Europe/Jersey (UTC+01:00)"
  }, {
    value: "Europe/Guernsey",
    label: "Europe/Guernsey (UTC+01:00)"
  }, {
    value: "Europe/Isle_of_Man",
    label: "Europe/Isle_of_Man (UTC+01:00)"
  }, {
    value: "Africa/Tunis",
    label: "Africa/Tunis (UTC+01:00)"
  }, {
    value: "Africa/Malabo",
    label: "Africa/Malabo (UTC+01:00)"
  }, {
    value: "GB-Eire",
    label: "GB-Eire (UTC+01:00)"
  }, {
    value: "Africa/Lagos",
    label: "Africa/Lagos (UTC+01:00)"
  }, {
    value: "Africa/Algiers",
    label: "Africa/Algiers (UTC+01:00)"
  }, {
    value: "GB",
    label: "GB (UTC+01:00)"
  }, {
    value: "Portugal",
    label: "Portugal (UTC+01:00)"
  }, {
    value: "Africa/Sao_Tome",
    label: "Africa/Sao_Tome (UTC+01:00)"
  }, {
    value: "Africa/Ndjamena",
    label: "Africa/Ndjamena (UTC+01:00)"
  }, {
    value: "Atlantic/Faeroe",
    label: "Atlantic/Faeroe (UTC+01:00)"
  }, {
    value: "Eire",
    label: "Eire (UTC+01:00)"
  }, {
    value: "Atlantic/Faroe",
    label: "Atlantic/Faroe (UTC+01:00)"
  }, {
    value: "Europe/Dublin",
    label: "Europe/Dublin (UTC+01:00)"
  }, {
    value: "Africa/Libreville",
    label: "Africa/Libreville (UTC+01:00)"
  }, {
    value: "Africa/El_Aaiun",
    label: "Africa/El_Aaiun (UTC+01:00)"
  }, {
    value: "Africa/Douala",
    label: "Africa/Douala (UTC+01:00)"
  }, {
    value: "Africa/Brazzaville",
    label: "Africa/Brazzaville (UTC+01:00)"
  }, {
    value: "Africa/Porto-Novo",
    label: "Africa/Porto-Novo (UTC+01:00)"
  }, {
    value: "Atlantic/Madeira",
    label: "Atlantic/Madeira (UTC+01:00)"
  }, {
    value: "Europe/Lisbon",
    label: "Europe/Lisbon (UTC+01:00)"
  }, {
    value: "Atlantic/Canary",
    label: "Atlantic/Canary (UTC+01:00)"
  }, {
    value: "Africa/Casablanca",
    label: "Africa/Casablanca (UTC+01:00)"
  }, {
    value: "Europe/Belfast",
    label: "Europe/Belfast (UTC+01:00)"
  }, {
    value: "Africa/Luanda",
    label: "Africa/Luanda (UTC+01:00)"
  }, {
    value: "Africa/Kinshasa",
    label: "Africa/Kinshasa (UTC+01:00)"
  }, {
    value: "Africa/Bangui",
    label: "Africa/Bangui (UTC+01:00)"
  }, {
    value: "WET",
    label: "WET (UTC+01:00)"
  }, {
    value: "Africa/Niamey",
    label: "Africa/Niamey (UTC+01:00)"
  }, {
    value: "GMT",
    label: "GMT (UTC+00:00)"
  }, {
    value: "Etc/GMT-0",
    label: "Etc/GMT-0 (UTC+00:00)"
  }, {
    value: "Atlantic/St_Helena",
    label: "Atlantic/St_Helena (UTC+00:00)"
  }, {
    value: "Etc/GMT+0",
    label: "Etc/GMT+0 (UTC+00:00)"
  }, {
    value: "Africa/Banjul",
    label: "Africa/Banjul (UTC+00:00)"
  }, {
    value: "Etc/GMT",
    label: "Etc/GMT (UTC+00:00)"
  }, {
    value: "Africa/Freetown",
    label: "Africa/Freetown (UTC+00:00)"
  }, {
    value: "Africa/Bamako",
    label: "Africa/Bamako (UTC+00:00)"
  }, {
    value: "Africa/Conakry",
    label: "Africa/Conakry (UTC+00:00)"
  }, {
    value: "Universal",
    label: "Universal (UTC+00:00)"
  }, {
    value: "Africa/Nouakchott",
    label: "Africa/Nouakchott (UTC+00:00)"
  }, {
    value: "UTC",
    label: "UTC (UTC+00:00)"
  }, {
    value: "Etc/Universal",
    label: "Etc/Universal (UTC+00:00)"
  }, {
    value: "Atlantic/Azores",
    label: "Atlantic/Azores (UTC+00:00)"
  }, {
    value: "Africa/Abidjan",
    label: "Africa/Abidjan (UTC+00:00)"
  }, {
    value: "Africa/Accra",
    label: "Africa/Accra (UTC+00:00)"
  }, {
    value: "Etc/UCT",
    label: "Etc/UCT (UTC+00:00)"
  }, {
    value: "GMT0",
    label: "GMT0 (UTC+00:00)"
  }, {
    value: "Zulu",
    label: "Zulu (UTC+00:00)"
  }, {
    value: "Africa/Ouagadougou",
    label: "Africa/Ouagadougou (UTC+00:00)"
  }, {
    value: "Atlantic/Reykjavik",
    label: "Atlantic/Reykjavik (UTC+00:00)"
  }, {
    value: "Etc/Zulu",
    label: "Etc/Zulu (UTC+00:00)"
  }, {
    value: "Iceland",
    label: "Iceland (UTC+00:00)"
  }, {
    value: "Africa/Lome",
    label: "Africa/Lome (UTC+00:00)"
  }, {
    value: "Greenwich",
    label: "Greenwich (UTC+00:00)"
  }, {
    value: "Etc/GMT0",
    label: "Etc/GMT0 (UTC+00:00)"
  }, {
    value: "America/Danmarkshavn",
    label: "America/Danmarkshavn (UTC+00:00)"
  }, {
    value: "Africa/Dakar",
    label: "Africa/Dakar (UTC+00:00)"
  }, {
    value: "America/Scoresbysund",
    label: "America/Scoresbysund (UTC+00:00)"
  }, {
    value: "Africa/Bissau",
    label: "Africa/Bissau (UTC+00:00)"
  }, {
    value: "Etc/Greenwich",
    label: "Etc/Greenwich (UTC+00:00)"
  }, {
    value: "Africa/Timbuktu",
    label: "Africa/Timbuktu (UTC+00:00)"
  }, {
    value: "UCT",
    label: "UCT (UTC+00:00)"
  }, {
    value: "Africa/Monrovia",
    label: "Africa/Monrovia (UTC+00:00)"
  }, {
    value: "Etc/UTC",
    label: "Etc/UTC (UTC+00:00)"
  }], 

    // LanguageCodeMaster: [{
    //     value: "None",
    //     id: ""
    // }, {
    //     id: "AF",
    //     value: "Afrikaans"
    // }, {
    //     id: "SQ",
    //     value: "Albanian"
    // }, {
    //     id: "AR",
    //     value: "Arabic"
    // }, {
    //     id: "HY",
    //     value: "Armenian"
    // }, {
    //     id: "EU",
    //     value: "Basque"
    // }, {
    //     id: "BN",
    //     value: "Bengali"
    // }, {
    //     id: "BG",
    //     value: "Bulgarian"
    // }, {
    //     id: "CA",
    //     value: "Catalan"
    // }, {
    //     id: "KM",
    //     value: "Cambodian"
    // }, {
    //     id: "ZH",
    //     value: "Chinese (Mandarin)"
    // }, {
    //     id: "HR",
    //     value: "Croatian"
    // }, {
    //     id: "CS",
    //     value: "Czech"
    // }, {
    //     id: "DA",
    //     value: "Danish"
    // }, {
    //     id: "NL",
    //     value: "Dutch"
    // }, {
    //     id: "EN",
    //     value: "English"
    // }, {
    //     id: "ET",
    //     value: "Estonian"
    // }, {
    //     id: "FJ",
    //     value: "Fiji"
    // }, {
    //     id: "FI",
    //     value: "Finnish"
    // }, {
    //     id: "FR",
    //     value: "French"
    // }, {
    //     id: "KA",
    //     value: "Georgian"
    // }, {
    //     id: "DE",
    //     value: "German"
    // }, {
    //     id: "EL",
    //     value: "Greek"
    // }, {
    //     id: "GU",
    //     value: "Gujarati"
    // }, {
    //     id: "HE",
    //     value: "Hebrew"
    // }, {
    //     id: "HI",
    //     value: "Hindi"
    // }, {
    //     id: "HU",
    //     value: "Hungarian"
    // }, {
    //     id: "IS",
    //     value: "Icelandic"
    // }, {
    //     id: "ID",
    //     value: "Indonesian"
    // }, {
    //     id: "GA",
    //     value: "Irish"
    // }, {
    //     id: "IT",
    //     value: "Italian"
    // }, {
    //     id: "JA",
    //     value: "Japanese"
    // }, {
    //     id: "JW",
    //     value: "Javanese"
    // }, {
    //     id: "KO",
    //     value: "Korean"
    // }, {
    //     id: "LA",
    //     value: "Latin"
    // }, {
    //     id: "LV",
    //     value: "Latvian"
    // }, {
    //     id: "LT",
    //     value: "Lithuanian"
    // }, {
    //     id: "MK",
    //     value: "Macedonian"
    // }, {
    //     id: "MS",
    //     value: "Malay"
    // }, {
    //     id: "ML",
    //     value: "Malayalam"
    // }, {
    //     id: "MT",
    //     value: "Maltese"
    // }, {
    //     id: "MI",
    //     value: "Maori"
    // }, {
    //     id: "MR",
    //     value: "Marathi"
    // }, {
    //     id: "MN",
    //     value: "Mongolian"
    // }, {
    //     id: "NE",
    //     value: "Nepali"
    // }, {
    //     id: "NO",
    //     value: "Norwegian"
    // }, {
    //     id: "FA",
    //     value: "Persian"
    // }, {
    //     id: "PL",
    //     value: "Polish"
    // }, {
    //     id: "PT",
    //     value: "Portuguese"
    // }, {
    //     id: "PA",
    //     value: "Punjabi"
    // }, {
    //     id: "QU",
    //     value: "Quechua"
    // }, {
    //     id: "RO",
    //     value: "Romanian"
    // }, {
    //     id: "RU",
    //     value: "Russian"
    // }, {
    //     id: "SM",
    //     value: "Samoan"
    // }, {
    //     id: "SR",
    //     value: "Serbian"
    // }, {
    //     id: "SK",
    //     value: "Slovak"
    // }, {
    //     id: "SL",
    //     value: "Slovenian"
    // }, {
    //     id: "ES",
    //     value: "Spanish"
    // }, {
    //     id: "SW",
    //     value: "Swahili"
    // }, {
    //     id: "SV",
    //     value: "Swedish "
    // }, {
    //     id: "TA",
    //     value: "Tamil"
    // }, {
    //     id: "TT",
    //     value: "Tatar"
    // }, {
    //     id: "TE",
    //     value: "Telugu"
    // }, {
    //     id: "TH",
    //     value: "Thai"
    // }, {
    //     id: "BO",
    //     value: "Tibetan"
    // }, {
    //     id: "TO",
    //     value: "Tonga"
    // }, {
    //     id: "TR",
    //     value: "Turkish"
    // }, {
    //     id: "UK",
    //     value: "Ukrainian"
    // }, {
    //     id: "UR",
    //     value: "Urdu"
    // }, {
    //     id: "UZ",
    //     value: "Uzbek"
    // }, {
    //     id: "VI",
    //     value: "Vietnamese"
    // }, {
    //     id: "CY",
    //     value: "Welsh"
    // }, {
    //     id: "XH",
    //     value: "Xhosa"
    // }], 

    // LanguageCodeMaster: [{
    //     value: "None",
    //     id: ""
    // }, {
    //     id: "E",
    //     value: "English"
    // }, {
    //     id: "O",
    //     value: "Local language"
    // }, {
    //     id: "B",
    //     value: "Both"
    // }], 

    LanguageCodeMaster: [{
        value: "E",
        label: "English"
    }, {
        value: "O",
        label: "Local language"
    }, {
        value: "B",
        label: "Both"
    }], 

    // CountryCodeMaster: [{
    //     value: "None",
    //     id: ""
    // }, {
    //     id: "AF",
    //     value: "Afghanistan"
    // }, {
    //     id: "AX",
    //     value: "Åland Islands"
    // }, {
    //     id: "AL",
    //     value: "Albania"
    // }, {
    //     id: "DZ",
    //     value: "Algeria"
    // }, {
    //     id: "AS",
    //     value: "American Samoa"
    // }, {
    //     id: "AD",
    //     value: "Andorra"
    // }, {
    //     id: "AO",
    //     value: "Angola"
    // }, {
    //     id: "AI",
    //     value: "Anguilla"
    // }, {
    //     id: "AQ",
    //     value: "Antarctica"
    // }, {
    //     id: "AG",
    //     value: "Antigua and Barbuda"
    // }, {
    //     id: "AR",
    //     value: "Argentina"
    // }, {
    //     id: "AM",
    //     value: "Armenia"
    // }, {
    //     id: "AW",
    //     value: "Aruba"
    // }, {
    //     id: "AU",
    //     value: "Australia"
    // }, {
    //     id: "AT",
    //     value: "Austria"
    // }, {
    //     id: "AZ",
    //     value: "Azerbaijan"
    // }, {
    //     id: "BS",
    //     value: "Bahamas"
    // }, {
    //     id: "BH",
    //     value: "Bahrain"
    // }, {
    //     id: "BD",
    //     value: "Bangladesh"
    // }, {
    //     id: "BB",
    //     value: "Barbados"
    // }, {
    //     id: "BY",
    //     value: "Belarus"
    // }, {
    //     id: "BE",
    //     value: "Belgium"
    // }, {
    //     id: "BZ",
    //     value: "Belize"
    // }, {
    //     id: "BJ",
    //     value: "Benin"
    // }, {
    //     id: "BM",
    //     value: "Bermuda"
    // }, {
    //     id: "BT",
    //     value: "Bhutan"
    // }, {
    //     id: "BO",
    //     value: "Bolivia"
    // }, {
    //     id: "BA",
    //     value: "Bosnia and Herzegovina"
    // }, {
    //     id: "BW",
    //     value: "Botswana"
    // }, {
    //     id: "BV",
    //     value: "Bouvet Island"
    // }, {
    //     id: "BR",
    //     value: "Brazil"
    // }, {
    //     id: "IO",
    //     value: "British Indian Ocean Territory"
    // }, {
    //     id: "BN",
    //     value: "Brunei Darussalam"
    // }, {
    //     id: "BG",
    //     value: "Bulgaria"
    // }, {
    //     id: "BF",
    //     value: "Burkina Faso"
    // }, {
    //     id: "BI",
    //     value: "Burundi"
    // }, {
    //     id: "KH",
    //     value: "Cambodia"
    // }, {
    //     id: "CM",
    //     value: "Cameroon"
    // }, {
    //     id: "CA",
    //     value: "Canada"
    // }, {
    //     id: "CV",
    //     value: "Cape Verde"
    // }, {
    //     id: "KY",
    //     value: "Cayman Islands"
    // }, {
    //     id: "CF",
    //     value: "Central African Republic"
    // }, {
    //     id: "TD",
    //     value: "Chad"
    // }, {
    //     id: "CL",
    //     value: "Chile"
    // }, {
    //     id: "CN",
    //     value: "China"
    // }, {
    //     id: "CX",
    //     value: "Christmas Island"
    // }, {
    //     id: "CC",
    //     value: "Cocos (Keeling) Islands"
    // }, {
    //     id: "CO",
    //     value: "Colombia"
    // }, {
    //     id: "KM",
    //     value: "Comoros"
    // }, {
    //     id: "CG",
    //     value: "Congo"
    // }, {
    //     id: "CD",
    //     value: "Congo, The Democratic Republic of the"
    // }, {
    //     id: "CK",
    //     value: "Cook Islands"
    // }, {
    //     id: "CR",
    //     value: "Costa Rica"
    // }, {
    //     id: "CI",
    //     value: "Cote D'Ivoire"
    // }, {
    //     id: "HR",
    //     value: "Croatia"
    // }, {
    //     id: "CU",
    //     value: "Cuba"
    // }, {
    //     id: "CY",
    //     value: "Cyprus"
    // }, {
    //     id: "CZ",
    //     value: "Czech Republic"
    // }, {
    //     id: "DK",
    //     value: "Denmark"
    // }, {
    //     id: "DJ",
    //     value: "Djibouti"
    // }, {
    //     id: "DM",
    //     value: "Dominica"
    // }, {
    //     id: "DO",
    //     value: "Dominican Republic"
    // }, {
    //     id: "EC",
    //     value: "Ecuador"
    // }, {
    //     id: "EG",
    //     value: "Egypt"
    // }, {
    //     id: "SV",
    //     value: "El Salvador"
    // }, {
    //     id: "GQ",
    //     value: "Equatorial Guinea"
    // }, {
    //     id: "ER",
    //     value: "Eritrea"
    // }, {
    //     id: "EE",
    //     value: "Estonia"
    // }, {
    //     id: "ET",
    //     value: "Ethiopia"
    // }, {
    //     id: "FK",
    //     value: "Falkland Islands (Malvinas)"
    // }, {
    //     id: "FO",
    //     value: "Faroe Islands"
    // }, {
    //     id: "FJ",
    //     value: "Fiji"
    // }, {
    //     id: "FI",
    //     value: "Finland"
    // }, {
    //     id: "FR",
    //     value: "France"
    // }, {
    //     id: "GF",
    //     value: "French Guiana"
    // }, {
    //     id: "PF",
    //     value: "French Polynesia"
    // }, {
    //     id: "TF",
    //     value: "French Southern Territories"
    // }, {
    //     id: "GA",
    //     value: "Gabon"
    // }, {
    //     id: "GM",
    //     value: "Gambia"
    // }, {
    //     id: "GE",
    //     value: "Georgia"
    // }, {
    //     id: "DE",
    //     value: "Germany"
    // }, {
    //     id: "GH",
    //     value: "Ghana"
    // }, {
    //     id: "GI",
    //     value: "Gibraltar"
    // }, {
    //     id: "GR",
    //     value: "Greece"
    // }, {
    //     id: "GL",
    //     value: "Greenland"
    // }, {
    //     id: "GD",
    //     value: "Grenada"
    // }, {
    //     id: "GP",
    //     value: "Guadeloupe"
    // }, {
    //     id: "GU",
    //     value: "Guam"
    // }, {
    //     id: "GT",
    //     value: "Guatemala"
    // }, {
    //     id: "GG",
    //     value: "Guernsey"
    // }, {
    //     id: "GN",
    //     value: "Guinea"
    // }, {
    //     id: "GW",
    //     value: "Guinea-Bissau"
    // }, {
    //     id: "GY",
    //     value: "Guyana"
    // }, {
    //     id: "HT",
    //     value: "Haiti"
    // }, {
    //     id: "HM",
    //     value: "Heard Island and Mcdonald Islands"
    // }, {
    //     id: "VA",
    //     value: "Holy See (Vatican City State)"
    // }, {
    //     id: "HN",
    //     value: "Honduras"
    // }, {
    //     id: "HK",
    //     value: "Hong Kong"
    // }, {
    //     id: "HU",
    //     value: "Hungary"
    // }, {
    //     id: "IS",
    //     value: "Iceland"
    // }, {
    //     id: "IN",
    //     value: "India"
    // }, {
    //     id: "ID",
    //     value: "Indonesia"
    // }, {
    //     id: "IR",
    //     value: "Iran, Islamic Republic Of"
    // }, {
    //     id: "IQ",
    //     value: "Iraq"
    // }, {
    //     id: "IE",
    //     value: "Ireland"
    // }, {
    //     id: "IM",
    //     value: "Isle of Man"
    // }, {
    //     id: "IL",
    //     value: "Israel"
    // }, {
    //     id: "IT",
    //     value: "Italy"
    // }, {
    //     id: "JM",
    //     value: "Jamaica"
    // }, {
    //     id: "JP",
    //     value: "Japan"
    // }, {
    //     id: "JE",
    //     value: "Jersey"
    // }, {
    //     id: "JO",
    //     value: "Jordan"
    // }, {
    //     id: "KZ",
    //     value: "Kazakhstan"
    // }, {
    //     id: "KE",
    //     value: "Kenya"
    // }, {
    //     id: "KI",
    //     value: "Kiribati"
    // }, {
    //     id: "KP",
    //     value: "Korea, Democratic People'S Republic of"
    // }, {
    //     id: "KR",
    //     value: "Korea, Republic of"
    // }, {
    //     id: "KW",
    //     value: "Kuwait"
    // }, {
    //     id: "KG",
    //     value: "Kyrgyzstan"
    // }, {
    //     id: "LA",
    //     value: "Lao People'S Democratic Republic"
    // }, {
    //     id: "LV",
    //     value: "Latvia"
    // }, {
    //     id: "LB",
    //     value: "Lebanon"
    // }, {
    //     id: "LS",
    //     value: "Lesotho"
    // }, {
    //     id: "LR",
    //     value: "Liberia"
    // }, {
    //     id: "LY",
    //     value: "Libyan Arab Jamahiriya"
    // }, {
    //     id: "LI",
    //     value: "Liechtenstein"
    // }, {
    //     id: "LT",
    //     value: "Lithuania"
    // }, {
    //     id: "LU",
    //     value: "Luxembourg"
    // }, {
    //     id: "MO",
    //     value: "Macao"
    // }, {
    //     id: "MK",
    //     value: "Macedonia, The Former Yugoslav Republic of"
    // }, {
    //     id: "MG",
    //     value: "Madagascar"
    // }, {
    //     id: "MW",
    //     value: "Malawi"
    // }, {
    //     id: "MY",
    //     value: "Malaysia"
    // }, {
    //     id: "MV",
    //     value: "Maldives"
    // }, {
    //     id: "ML",
    //     value: "Mali"
    // }, {
    //     id: "MT",
    //     value: "Malta"
    // }, {
    //     id: "MH",
    //     value: "Marshall Islands"
    // }, {
    //     id: "MQ",
    //     value: "Martinique"
    // }, {
    //     id: "MR",
    //     value: "Mauritania"
    // }, {
    //     id: "MU",
    //     value: "Mauritius"
    // }, {
    //     id: "YT",
    //     value: "Mayotte"
    // }, {
    //     id: "MX",
    //     value: "Mexico"
    // }, {
    //     id: "FM",
    //     value: "Micronesia, Federated States of"
    // }, {
    //     id: "MD",
    //     value: "Moldova, Republic of"
    // }, {
    //     id: "MC",
    //     value: "Monaco"
    // }, {
    //     id: "MN",
    //     value: "Mongolia"
    // }, {
    //     id: "MS",
    //     value: "Montserrat"
    // }, {
    //     id: "MA",
    //     value: "Morocco"
    // }, {
    //     id: "MZ",
    //     value: "Mozambique"
    // }, {
    //     id: "MM",
    //     value: "Myanmar"
    // }, {
    //     id: "NA",
    //     value: "Namibia"
    // }, {
    //     id: "NR",
    //     value: "Nauru"
    // }, {
    //     id: "NP",
    //     value: "Nepal"
    // }, {
    //     id: "NL",
    //     value: "Netherlands"
    // }, {
    //     id: "AN",
    //     value: "Netherlands Antilles"
    // }, {
    //     id: "NC",
    //     value: "New Caledonia"
    // }, {
    //     id: "NZ",
    //     value: "New Zealand"
    // }, {
    //     id: "NI",
    //     value: "Nicaragua"
    // }, {
    //     id: "NE",
    //     value: "Niger"
    // }, {
    //     id: "NG",
    //     value: "Nigeria"
    // }, {
    //     id: "NU",
    //     value: "Niue"
    // }, {
    //     id: "NF",
    //     value: "Norfolk Island"
    // }, {
    //     id: "MP",
    //     value: "Northern Mariana Islands"
    // }, {
    //     id: "NO",
    //     value: "Norway"
    // }, {
    //     id: "OM",
    //     value: "Oman"
    // }, {
    //     id: "PK",
    //     value: "Pakistan"
    // }, {
    //     id: "PW",
    //     value: "Palau"
    // }, {
    //     id: "PS",
    //     value: "Palestinian Territory, Occupied"
    // }, {
    //     id: "PA",
    //     value: "Panama"
    // }, {
    //     id: "PG",
    //     value: "Papua New Guinea"
    // }, {
    //     id: "PY",
    //     value: "Paraguay"
    // }, {
    //     id: "PE",
    //     value: "Peru"
    // }, {
    //     id: "PH",
    //     value: "Philippines"
    // }, {
    //     id: "PN",
    //     value: "Pitcairn"
    // }, {
    //     id: "PL",
    //     value: "Poland"
    // }, {
    //     id: "PT",
    //     value: "Portugal"
    // }, {
    //     id: "PR",
    //     value: "Puerto Rico"
    // }, {
    //     id: "QA",
    //     value: "Qatar"
    // }, {
    //     id: "RE",
    //     value: "Reunion"
    // }, {
    //     id: "RO",
    //     value: "Romania"
    // }, {
    //     id: "RU",
    //     value: "Russian Federation"
    // }, {
    //     id: "RW",
    //     value: "RWANDA"
    // }, {
    //     id: "SH",
    //     value: "Saint Helena"
    // }, {
    //     id: "KN",
    //     value: "Saint Kitts and Nevis"
    // }, {
    //     id: "LC",
    //     value: "Saint Lucia"
    // }, {
    //     id: "PM",
    //     value: "Saint Pierre and Miquelon"
    // }, {
    //     id: "VC",
    //     value: "Saint Vincent and the Grenadines"
    // }, {
    //     id: "WS",
    //     value: "Samoa"
    // }, {
    //     id: "SM",
    //     value: "San Marino"
    // }, {
    //     id: "ST",
    //     value: "Sao Tome and Principe"
    // }, {
    //     id: "SA",
    //     value: "Saudi Arabia"
    // }, {
    //     id: "SN",
    //     value: "Senegal"
    // }, {
    //     id: "RS",
    //     value: "Serbia"
    // }, {
    //     id: "ME",
    //     value: "Montenegro"
    // }, {
    //     id: "SC",
    //     value: "Seychelles"
    // }, {
    //     id: "SL",
    //     value: "Sierra Leone"
    // }, {
    //     id: "SG",
    //     value: "Singapore"
    // }, {
    //     id: "SK",
    //     value: "Slovakia"
    // }, {
    //     id: "SI",
    //     value: "Slovenia"
    // }, {
    //     id: "SB",
    //     value: "Solomon Islands"
    // }, {
    //     id: "SO",
    //     value: "Somalia"
    // }, {
    //     id: "ZA",
    //     value: "South Africa"
    // }, {
    //     id: "GS",
    //     value: "South Georgia and the South Sandwich Islands"
    // }, {
    //     id: "ES",
    //     value: "Spain"
    // }, {
    //     id: "LK",
    //     value: "Sri Lanka"
    // }, {
    //     id: "SD",
    //     value: "Sudan"
    // }, {
    //     id: "SR",
    //     value: "Suriname"
    // }, {
    //     id: "SJ",
    //     value: "Svalbard and Jan Mayen"
    // }, {
    //     id: "SZ",
    //     value: "Swaziland"
    // }, {
    //     id: "SE",
    //     value: "Sweden"
    // }, {
    //     id: "CH",
    //     value: "Switzerland"
    // }, {
    //     id: "SY",
    //     value: "Syrian Arab Republic"
    // }, {
    //     id: "TW",
    //     value: "Taiwan, Province of China"
    // }, {
    //     id: "TJ",
    //     value: "Tajikistan"
    // }, {
    //     id: "TZ",
    //     value: "Tanzania, United Republic of"
    // }, {
    //     id: "TH",
    //     value: "Thailand"
    // }, {
    //     id: "TL",
    //     value: "Timor-Leste"
    // }, {
    //     id: "TG",
    //     value: "Togo"
    // }, {
    //     id: "TK",
    //     value: "Tokelau"
    // }, {
    //     id: "TO",
    //     value: "Tonga"
    // }, {
    //     id: "TT",
    //     value: "Trinidad and Tobago"
    // }, {
    //     id: "TN",
    //     value: "Tunisia"
    // }, {
    //     id: "TR",
    //     value: "Turkey"
    // }, {
    //     id: "TM",
    //     value: "Turkmenistan"
    // }, {
    //     id: "TC",
    //     value: "Turks and Caicos Islands"
    // }, {
    //     id: "TV",
    //     value: "Tuvalu"
    // }, {
    //     id: "UG",
    //     value: "Uganda"
    // }, {
    //     id: "UA",
    //     value: "Ukraine"
    // }, {
    //     id: "AE",
    //     value: "United Arab Emirates"
    // }, {
    //     id: "GB",
    //     value: "United Kingdom"
    // }, {
    //     id: "US",
    //     value: "United States"
    // }, {
    //     id: "UM",
    //     value: "United States Minor Outlying Islands"
    // }, {
    //     id: "UY",
    //     value: "Uruguay"
    // }, {
    //     id: "UZ",
    //     value: "Uzbekistan"
    // }, {
    //     id: "VU",
    //     value: "Vanuatu"
    // }, {
    //     id: "VE",
    //     value: "Venezuela"
    // }, {
    //     id: "VN",
    //     value: "Viet Nam"
    // }, {
    //     id: "VG",
    //     value: "Virgin Islands, British"
    // }, {
    //     id: "VI",
    //     value: "Virgin Islands, U.S."
    // }, {
    //     id: "WF",
    //     value: "Wallis and Futuna"
    // }, {
    //     id: "EH",
    //     value: "Western Sahara"
    // }, {
    //     id: "YE",
    //     value: "Yemen"
    // }, {
    //     id: "ZM",
    //     value: "Zambia"
    // }, {
    //     id: "ZW",
    //     value: "Zimbabwe"
    // }],

    CountryCodeMaster: [{
        value: "AF",
        label: "Afghanistan"
      }, {
        value: "AX",
        label: "Åland Islands"
      }, {
        value: "AL",
        label: "Albania"
      }, {
        value: "DZ",
        label: "Algeria"
      }, {
        value: "AS",
        label: "American Samoa"
      }, {
        value: "AD",
        label: "Andorra"
      }, {
        value: "AO",
        label: "Angola"
      }, {
        value: "AI",
        label: "Anguilla"
      }, {
        value: "AQ",
        label: "Antarctica"
      }, {
        value: "AG",
        label: "Antigua and Barbuda"
      }, {
        value: "AR",
        label: "Argentina"
      }, {
        value: "AM",
        label: "Armenia"
      }, {
        value: "AW",
        label: "Aruba"
      }, {
        value: "AU",
        label: "Australia"
      }, {
        value: "AT",
        label: "Austria"
      }, {
        value: "AZ",
        label: "Azerbaijan"
      }, {
        value: "BS",
        label: "Bahamas"
      }, {
        value: "BH",
        label: "Bahrain"
      }, {
        value: "BD",
        label: "Bangladesh"
      }, {
        value: "BB",
        label: "Barbados"
      }, {
        value: "BY",
        label: "Belarus"
      }, {
        value: "BE",
        label: "Belgium"
      }, {
        value: "BZ",
        label: "Belize"
      }, {
        value: "BJ",
        label: "Benin"
      }, {
        value: "BM",
        label: "Bermuda"
      }, {
        value: "BT",
        label: "Bhutan"
      }, {
        value: "BO",
        label: "Bolivia"
      }, {
        value: "BA",
        label: "Bosnia and Herzegovina"
      }, {
        value: "BW",
        label: "Botswana"
      }, {
        value: "BV",
        label: "Bouvet Island"
      }, {
        value: "BR",
        label: "Brazil"
      }, {
        value: "IO",
        label: "British Indian Ocean Territory"
      }, {
        value: "BN",
        label: "Brunei Darussalam"
      }, {
        value: "BG",
        label: "Bulgaria"
      }, {
        value: "BF",
        label: "Burkina Faso"
      }, {
        value: "BI",
        label: "Burundi"
      }, {
        value: "KH",
        label: "Cambodia"
      }, {
        value: "CM",
        label: "Cameroon"
      }, {
        value: "CA",
        label: "Canada"
      }, {
        value: "CV",
        label: "Cape Verde"
      }, {
        value: "KY",
        label: "Cayman Islands"
      }, {
        value: "CF",
        label: "Central African Republic"
      }, {
        value: "TD",
        label: "Chad"
      }, {
        value: "CL",
        label: "Chile"
      }, {
        value: "CN",
        label: "China"
      }, {
        value: "CX",
        label: "Christmas Island"
      }, {
        value: "CC",
        label: "Cocos (Keeling) Islands"
      }, {
        value: "CO",
        label: "Colombia"
      }, {
        value: "KM",
        label: "Comoros"
      }, {
        value: "CG",
        label: "Congo"
      }, {
        value: "CD",
        label: "Congo, The Democratic Republic of the"
      }, {
        value: "CK",
        label: "Cook Islands"
      }, {
        value: "CR",
        label: "Costa Rica"
      }, {
        value: "CI",
        label: "Cote D'Ivoire"
      }, {
        value: "HR",
        label: "Croatia"
      }, {
        value: "CU",
        label: "Cuba"
      }, {
        value: "CY",
        label: "Cyprus"
      }, {
        value: "CZ",
        label: "Czech Republic"
      }, {
        value: "DK",
        label: "Denmark"
      }, {
        value: "DJ",
        label: "Djibouti"
      }, {
        value: "DM",
        label: "Dominica"
      }, {
        value: "DO",
        label: "Dominican Republic"
      }, {
        value: "EC",
        label: "Ecuador"
      }, {
        value: "EG",
        label: "Egypt"
      }, {
        value: "SV",
        label: "El Salvador"
      }, {
        value: "GQ",
        label: "Equatorial Guinea"
      }, {
        value: "ER",
        label: "Eritrea"
      }, {
        value: "EE",
        label: "Estonia"
      }, {
        value: "ET",
        label: "Ethiopia"
      }, {
        value: "FK",
        label: "Falkland Islands (Malvinas)"
      }, {
        value: "FO",
        label: "Faroe Islands"
      }, {
        value: "FJ",
        label: "Fiji"
      }, {
        value: "FI",
        label: "Finland"
      }, {
        value: "FR",
        label: "France"
      }, {
        value: "GF",
        label: "French Guiana"
      }, {
        value: "PF",
        label: "French Polynesia"
      }, {
        value: "TF",
        label: "French Southern Territories"
      }, {
        value: "GA",
        label: "Gabon"
      }, {
        value: "GM",
        label: "Gambia"
      }, {
        value: "GE",
        label: "Georgia"
      }, {
        value: "DE",
        label: "Germany"
      }, {
        value: "GH",
        label: "Ghana"
      }, {
        value: "GI",
        label: "Gibraltar"
      }, {
        value: "GR",
        label: "Greece"
      }, {
        value: "GL",
        label: "Greenland"
      }, {
        value: "GD",
        label: "Grenada"
      }, {
        value: "GP",
        label: "Guadeloupe"
      }, {
        value: "GU",
        label: "Guam"
      }, {
        value: "GT",
        label: "Guatemala"
      }, {
        value: "GG",
        label: "Guernsey"
      }, {
        value: "GN",
        label: "Guinea"
      }, {
        value: "GW",
        label: "Guinea-Bissau"
      }, {
        value: "GY",
        label: "Guyana"
      }, {
        value: "HT",
        label: "Haiti"
      }, {
        value: "HM",
        label: "Heard Island and Mcdonald Islands"
      }, {
        value: "VA",
        label: "Holy See (Vatican City State)"
      }, {
        value: "HN",
        label: "Honduras"
      }, {
        value: "HK",
        label: "Hong Kong"
      }, {
        value: "HU",
        label: "Hungary"
      }, {
        value: "IS",
        label: "Iceland"
      }, {
        value: "IN",
        label: "India"
      }, {
        value: "ID",
        label: "Indonesia"
      }, {
        value: "IR",
        label: "Iran, Islamic Republic Of"
      }, {
        value: "IQ",
        label: "Iraq"
      }, {
        value: "IE",
        label: "Ireland"
      }, {
        value: "IM",
        label: "Isle of Man"
      }, {
        value: "IL",
        label: "Israel"
      }, {
        value: "IT",
        label: "Italy"
      }, {
        value: "JM",
        label: "Jamaica"
      }, {
        value: "JP",
        label: "Japan"
      }, {
        value: "JE",
        label: "Jersey"
      }, {
        value: "JO",
        label: "Jordan"
      }, {
        value: "KZ",
        label: "Kazakhstan"
      }, {
        value: "KE",
        label: "Kenya"
      }, {
        value: "KI",
        label: "Kiribati"
      }, {
        value: "KP",
        label: "Korea, Democratic People'S Republic of"
      }, {
        value: "KR",
        label: "Korea, Republic of"
      }, {
        value: "KW",
        label: "Kuwait"
      }, {
        value: "KG",
        label: "Kyrgyzstan"
      }, {
        value: "LA",
        label: "Lao People'S Democratic Republic"
      }, {
        value: "LV",
        label: "Latvia"
      }, {
        value: "LB",
        label: "Lebanon"
      }, {
        value: "LS",
        label: "Lesotho"
      }, {
        value: "LR",
        label: "Liberia"
      }, {
        value: "LY",
        label: "Libyan Arab Jamahiriya"
      }, {
        value: "LI",
        label: "Liechtenstein"
      }, {
        value: "LT",
        label: "Lithuania"
      }, {
        value: "LU",
        label: "Luxembourg"
      }, {
        value: "MO",
        label: "Macao"
      }, {
        value: "MK",
        label: "Macedonia, The Former Yugoslav Republic of"
      }, {
        value: "MG",
        label: "Madagascar"
      }, {
        value: "MW",
        label: "Malawi"
      }, {
        value: "MY",
        label: "Malaysia"
      }, {
        value: "MV",
        label: "Maldives"
      }, {
        value: "ML",
        label: "Mali"
      }, {
        value: "MT",
        label: "Malta"
      }, {
        value: "MH",
        label: "Marshall Islands"
      }, {
        value: "MQ",
        label: "Martinique"
      }, {
        value: "MR",
        label: "Mauritania"
      }, {
        value: "MU",
        label: "Mauritius"
      }, {
        value: "YT",
        label: "Mayotte"
      }, {
        value: "MX",
        label: "Mexico"
      }, {
        value: "FM",
        label: "Micronesia, Federated States of"
      }, {
        value: "MD",
        label: "Moldova, Republic of"
      }, {
        value: "MC",
        label: "Monaco"
      }, {
        value: "MN",
        label: "Mongolia"
      }, {
        value: "MS",
        label: "Montserrat"
      }, {
        value: "MA",
        label: "Morocco"
      }, {
        value: "MZ",
        label: "Mozambique"
      }, {
        value: "MM",
        label: "Myanmar"
      }, {
        value: "NA",
        label: "Namibia"
      }, {
        value: "NR",
        label: "Nauru"
      }, {
        value: "NP",
        label: "Nepal"
      }, {
        value: "NL",
        label: "Netherlands"
      }, {
        value: "AN",
        label: "Netherlands Antilles"
      }, {
        value: "NC",
        label: "New Caledonia"
      }, {
        value: "NZ",
        label: "New Zealand"
      }, {
        value: "NI",
        label: "Nicaragua"
      }, {
        value: "NE",
        label: "Niger"
      }, {
        value: "NG",
        label: "Nigeria"
      }, {
        value: "NU",
        label: "Niue"
      }, {
        value: "NF",
        label: "Norfolk Island"
      }, {
        value: "MP",
        label: "Northern Mariana Islands"
      }, {
        value: "NO",
        label: "Norway"
      }, {
        value: "OM",
        label: "Oman"
      }, {
        value: "PK",
        label: "Pakistan"
      }, {
        value: "PW",
        label: "Palau"
      }, {
        value: "PS",
        label: "Palestinian Territory, Occupied"
      }, {
        value: "PA",
        label: "Panama"
      }, {
        value: "PG",
        label: "Papua New Guinea"
      }, {
        value: "PY",
        label: "Paraguay"
      }, {
        value: "PE",
        label: "Peru"
      }, {
        value: "PH",
        label: "Philippines"
      }, {
        value: "PN",
        label: "Pitcairn"
      }, {
        value: "PL",
        label: "Poland"
      }, {
        value: "PT",
        label: "Portugal"
      }, {
        value: "PR",
        label: "Puerto Rico"
      }, {
        value: "QA",
        label: "Qatar"
      }, {
        value: "RE",
        label: "Reunion"
      }, {
        value: "RO",
        label: "Romania"
      }, {
        value: "RU",
        label: "Russian Federation"
      }, {
        value: "RW",
        label: "RWANDA"
      }, {
        value: "SH",
        label: "Saint Helena"
      }, {
        value: "KN",
        label: "Saint Kitts and Nevis"
      }, {
        value: "LC",
        label: "Saint Lucia"
      }, {
        value: "PM",
        label: "Saint Pierre and Miquelon"
      }, {
        value: "VC",
        label: "Saint Vincent and the Grenadines"
      }, {
        value: "WS",
        label: "Samoa"
      }, {
        value: "SM",
        label: "San Marino"
      }, {
        value: "ST",
        label: "Sao Tome and Principe"
      }, {
        value: "SA",
        label: "Saudi Arabia"
      }, {
        value: "SN",
        label: "Senegal"
      }, {
        value: "RS",
        label: "Serbia"
      }, {
        value: "ME",
        label: "Montenegro"
      }, {
        value: "SC",
        label: "Seychelles"
      }, {
        value: "SL",
        label: "Sierra Leone"
      }, {
        value: "SG",
        label: "Singapore"
      }, {
        value: "SK",
        label: "Slovakia"
      }, {
        value: "SI",
        label: "Slovenia"
      }, {
        value: "SB",
        label: "Solomon Islands"
      }, {
        value: "SO",
        label: "Somalia"
      }, {
        value: "ZA",
        label: "South Africa"
      }, {
        value: "GS",
        label: "South Georgia and the South Sandwich Islands"
      }, {
        value: "ES",
        label: "Spain"
      }, {
        value: "LK",
        label: "Sri Lanka"
      }, {
        value: "SD",
        label: "Sudan"
      }, {
        value: "SR",
        label: "Suriname"
      }, {
        value: "SJ",
        label: "Svalbard and Jan Mayen"
      }, {
        value: "SZ",
        label: "Swaziland"
      }, {
        value: "SE",
        label: "Sweden"
      }, {
        value: "CH",
        label: "Switzerland"
      }, {
        value: "SY",
        label: "Syrian Arab Republic"
      }, {
        value: "TW",
        label: "Taiwan, Province of China"
      }, {
        value: "TJ",
        label: "Tajikistan"
      }, {
        value: "TZ",
        label: "Tanzania, United Republic of"
      }, {
        value: "TH",
        label: "Thailand"
      }, {
        value: "TL",
        label: "Timor-Leste"
      }, {
        value: "TG",
        label: "Togo"
      }, {
        value: "TK",
        label: "Tokelau"
      }, {
        value: "TO",
        label: "Tonga"
      }, {
        value: "TT",
        label: "Trinidad and Tobago"
      }, {
        value: "TN",
        label: "Tunisia"
      }, {
        value: "TR",
        label: "Turkey"
      }, {
        value: "TM",
        label: "Turkmenistan"
      }, {
        value: "TC",
        label: "Turks and Caicos Islands"
      }, {
        value: "TV",
        label: "Tuvalu"
      }, {
        value: "UG",
        label: "Uganda"
      }, {
        value: "UA",
        label: "Ukraine"
      }, {
        value: "AE",
        label: "United Arab Emirates"
      }, {
        value: "GB",
        label: "United Kingdom"
      }, {
        value: "US",
        label: "United States"
      }, {
        value: "UM",
        label: "United States Minor Outlying Islands"
      }, {
        value: "UY",
        label: "Uruguay"
      }, {
        value: "UZ",
        label: "Uzbekistan"
      }, {
        value: "VU",
        label: "Vanuatu"
      }, {
        value: "VE",
        label: "Venezuela"
      }, {
        value: "VN",
        label: "Viet Nam"
      }, {
        value: "VG",
        label: "Virgin Islands, British"
      }, {
        value: "VI",
        label: "Virgin Islands, U.S."
      }, {
        value: "WF",
        label: "Wallis and Futuna"
      }, {
        value: "EH",
        label: "Western Sahara"
      }, {
        value: "YE",
        label: "Yemen"
      }, {
        value: "ZM",
        label: "Zambia"
      }, {
        value: "ZW",
        label: "Zimbabwe"
      }],
      
    // CurrenceCodeMaster: [{
    //     value: "None",
    //     id: ""
    // }, {
    //     id: "AED",
    //     value: "United Arab Emirates dirham"
    // }, {
    //     id: "AFN",
    //     value: "Afghan afghani"
    // }, {
    //     id: "ALL",
    //     value: "Albanian lek"
    // }, {
    //     id: "AMD",
    //     value: "Armenian dram"
    // }, {
    //     id: "AOA",
    //     value: "Angolan kwanza"
    // }, {
    //     id: "ARS",
    //     value: "Argentine peso"
    // }, {
    //     id: "AUD",
    //     value: "Australian dollar"
    // }, {
    //     id: "AWG",
    //     value: "Aruban florin"
    // }, {
    //     id: "AZN",
    //     value: "Azerbaijani manat"
    // }, {
    //     id: "BAM",
    //     value: "Bosnia and Herzegovina convertible mark"
    // }, {
    //     id: "BBD",
    //     value: "Barbadian dollar"
    // }, {
    //     id: "BDT",
    //     value: "Bangladeshi taka"
    // }, {
    //     id: "BGN",
    //     value: "Bulgarian lev"
    // }, {
    //     id: "BHD",
    //     value: "Bahraini dinar"
    // }, {
    //     id: "BIF",
    //     value: "Burundian franc"
    // }, {
    //     id: "BMD",
    //     value: "Bermudian dollar"
    // }, {
    //     id: "BND",
    //     value: "Brunei dollar"
    // }, {
    //     id: "BOB",
    //     value: "Bolivian boliviano"
    // }, {
    //     id: "BRL",
    //     value: "Brazilian real"
    // }, {
    //     id: "BSD",
    //     value: "Bahamian dollar"
    // }, {
    //     id: "BTN",
    //     value: "Bhutanese ngultrum"
    // }, {
    //     id: "BWP",
    //     value: "Botswana pula"
    // }, {
    //     id: "BYR",
    //     value: "Belarusian ruble"
    // }, {
    //     id: "BZD",
    //     value: "Belize dollar"
    // }, {
    //     id: "CAD",
    //     value: "Canadian dollar"
    // }, {
    //     id: "CDF",
    //     value: "Congolese franc"
    // }, {
    //     id: "CHF",
    //     value: "Swiss franc"
    // }, {
    //     id: "CLP",
    //     value: "Chilean peso"
    // }, {
    //     id: "CNY",
    //     value: "Chinese yuan"
    // }, {
    //     id: "COP",
    //     value: "Colombian peso"
    // }, {
    //     id: "CRC",
    //     value: "Costa Rican colón"
    // }, {
    //     id: "CUP",
    //     value: "Cuban convertible peso"
    // }, {
    //     id: "CVE",
    //     value: "Cape Verdean escudo"
    // }, {
    //     id: "CZK",
    //     value: "Czech koruna"
    // }, {
    //     id: "DJF",
    //     value: "Djiboutian franc"
    // }, {
    //     id: "DKK",
    //     value: "Danish krone"
    // }, {
    //     id: "DOP",
    //     value: "Dominican peso"
    // }, {
    //     id: "DZD",
    //     value: "Algerian dinar"
    // }, {
    //     id: "EGP",
    //     value: "Egyptian pound"
    // }, {
    //     id: "ERN",
    //     value: "Eritrean nakfa"
    // }, {
    //     id: "ETB",
    //     value: "Ethiopian birr"
    // }, {
    //     id: "EUR",
    //     value: "Euro"
    // }, {
    //     id: "FJD",
    //     value: "Fijian dollar"
    // }, {
    //     id: "FKP",
    //     value: "Falkland Islands pound"
    // }, {
    //     id: "GBP",
    //     value: "British pound"
    // }, {
    //     id: "GEL",
    //     value: "Georgian lari"
    // }, {
    //     id: "GHS",
    //     value: "Ghana cedi"
    // }, {
    //     id: "GMD",
    //     value: "Gambian dalasi"
    // }, {
    //     id: "GNF",
    //     value: "Guinean franc"
    // }, {
    //     id: "GTQ",
    //     value: "Guatemalan quetzal"
    // }, {
    //     id: "GYD",
    //     value: "Guyanese dollar"
    // }, {
    //     id: "HKD",
    //     value: "Hong Kong dollar"
    // }, {
    //     id: "HNL",
    //     value: "Honduran lempira"
    // }, {
    //     id: "HRK",
    //     value: "Croatian kuna"
    // }, {
    //     id: "HTG",
    //     value: "Haitian gourde"
    // }, {
    //     id: "HUF",
    //     value: "Hungarian forint"
    // }, {
    //     id: "IDR",
    //     value: "Indonesian rupiah"
    // }, {
    //     id: "ILS",
    //     value: "Israeli new shekel"
    // }, {
    //     id: "IMP",
    //     value: "Manx pound"
    // }, {
    //     id: "INR",
    //     value: "Indian rupee"
    // }, {
    //     id: "IQD",
    //     value: "Iraqi dinar"
    // }, {
    //     id: "IRR",
    //     value: "Iranian rial"
    // }, {
    //     id: "ISK",
    //     value: "Icelandic króna"
    // }, {
    //     id: "JEP",
    //     value: "Jersey pound"
    // }, {
    //     id: "JMD",
    //     value: "Jamaican dollar"
    // }, {
    //     id: "JOD",
    //     value: "Jordanian dinar"
    // }, {
    //     id: "JPY",
    //     value: "Japanese yen"
    // }, {
    //     id: "KES",
    //     value: "Kenyan shilling"
    // }, {
    //     id: "KGS",
    //     value: "Kyrgyzstani som"
    // }, {
    //     id: "KHR",
    //     value: "Cambodian riel"
    // }, {
    //     id: "KMF",
    //     value: "Comorian franc"
    // }, {
    //     id: "KPW",
    //     value: "North Korean won"
    // }, {
    //     id: "KRW",
    //     value: "South Korean won"
    // }, {
    //     id: "KWD",
    //     value: "Kuwaiti dinar"
    // }, {
    //     id: "KYD",
    //     value: "Cayman Islands dollar"
    // }, {
    //     id: "KZT",
    //     value: "Kazakhstani tenge"
    // }, {
    //     id: "LAK",
    //     value: "Lao kip"
    // }, {
    //     id: "LBP",
    //     value: "Lebanese pound"
    // }, {
    //     id: "LKR",
    //     value: "Sri Lankan rupee"
    // }, {
    //     id: "LRD",
    //     value: "Liberian dollar"
    // }, {
    //     id: "LSL",
    //     value: "Lesotho loti"
    // }, {
    //     id: "LTL",
    //     value: "Lithuanian litas"
    // }, {
    //     id: "LVL",
    //     value: "Latvian lats"
    // }, {
    //     id: "LYD",
    //     value: "Libyan dinar"
    // }, {
    //     id: "MAD",
    //     value: "Moroccan dirham"
    // }, {
    //     id: "MDL",
    //     value: "Moldovan leu"
    // }, {
    //     id: "MGA",
    //     value: "Malagasy ariary"
    // }, {
    //     id: "MKD",
    //     value: "Macedonian denar"
    // }, {
    //     id: "MMK",
    //     value: "Burmese kyat"
    // }, {
    //     id: "MNT",
    //     value: "Mongolian tögrög"
    // }, {
    //     id: "MOP",
    //     value: "Macanese pataca"
    // }, {
    //     id: "MRO",
    //     value: "Mauritanian ouguiya"
    // }, {
    //     id: "MUR",
    //     value: "Mauritian rupee"
    // }, {
    //     id: "MVR",
    //     value: "Maldivian rufiyaa"
    // }, {
    //     id: "MWK",
    //     value: "Malawian kwacha"
    // }, {
    //     id: "MXN",
    //     value: "Mexican peso"
    // }, {
    //     id: "MYR",
    //     value: "Malaysian ringgit"
    // }, {
    //     id: "MZN",
    //     value: "Mozambican metical"
    // }, {
    //     id: "NAD",
    //     value: "Namibian dollar"
    // }, {
    //     id: "NGN",
    //     value: "Nigerian naira"
    // }, {
    //     id: "NIO",
    //     value: "Nicaraguan córdoba"
    // }, {
    //     id: "NOK",
    //     value: "Norwegian krone"
    // }, {
    //     id: "NPR",
    //     value: "Nepalese rupee"
    // }, {
    //     id: "NZD",
    //     value: "New Zealand dollar"
    // }, {
    //     id: "OMR",
    //     value: "Omani rial"
    // }, {
    //     id: "PAB",
    //     value: "Panamanian balboa"
    // }, {
    //     id: "PEN",
    //     value: "Peruvian nuevo sol"
    // }, {
    //     id: "PGK",
    //     value: "Papua New Guinean kina"
    // }, {
    //     id: "PHP",
    //     value: "Philippine peso"
    // }, {
    //     id: "PKR",
    //     value: "Pakistani rupee"
    // }, {
    //     id: "PLN",
    //     value: "Polish złoty"
    // }, {
    //     id: "PRB",
    //     value: "Transnistrian ruble"
    // }, {
    //     id: "PYG",
    //     value: "Paraguayan guaraní"
    // }, {
    //     id: "QAR",
    //     value: "Qatari riyal"
    // }, {
    //     id: "RON",
    //     value: "Romanian leu"
    // }, {
    //     id: "RSD",
    //     value: "Serbian dinar"
    // }, {
    //     id: "RUB",
    //     value: "Russian ruble"
    // }, {
    //     id: "RWF",
    //     value: "Rwandan franc"
    // }, {
    //     id: "SAR",
    //     value: "Saudi riyal"
    // }, {
    //     id: "SBD",
    //     value: "Solomon Islands dollar"
    // }, {
    //     id: "SCR",
    //     value: "Seychellois rupee"
    // }, {
    //     id: "SDG",
    //     value: "Singapore dollar"
    // }, {
    //     id: "SEK",
    //     value: "Swedish krona"
    // }, {
    //     id: "SGD",
    //     value: "Singapore dollar"
    // }, {
    //     id: "SHP",
    //     value: "Saint Helena pound"
    // }, {
    //     id: "SLL",
    //     value: "Sierra Leonean leone"
    // }, {
    //     id: "SOS",
    //     value: "Somali shilling"
    // }, {
    //     id: "SRD",
    //     value: "Surinamese dollar"
    // }, {
    //     id: "SSP",
    //     value: "South Sudanese pound"
    // }, {
    //     id: "STD",
    //     value: "São Tomé and Príncipe dobra"
    // }, {
    //     id: "SVC",
    //     value: "Salvadoran colón"
    // }, {
    //     id: "SYP",
    //     value: "Syrian pound"
    // }, {
    //     id: "SZL",
    //     value: "Swazi lilangeni"
    // }, {
    //     id: "THB",
    //     value: "Thai baht"
    // }, {
    //     id: "TJS",
    //     value: "Tajikistani somoni"
    // }, {
    //     id: "TMT",
    //     value: "Turkmenistan manat"
    // }, {
    //     id: "TND",
    //     value: "Tunisian dinar"
    // }, {
    //     id: "TOP",
    //     value: "Tongan paʻanga"
    // }, {
    //     id: "TRY",
    //     value: "Turkish lira"
    // }, {
    //     id: "TTD",
    //     value: "Trinidad and Tobago dollar"
    // }, {
    //     id: "TWD",
    //     value: "New Taiwan dollar"
    // }, {
    //     id: "TZS",
    //     value: "Tanzanian shilling"
    // }, {
    //     id: "UAH",
    //     value: "Ukrainian hryvnia"
    // }, {
    //     id: "UGX",
    //     value: "Ugandan shilling"
    // }, {
    //     id: "USD",
    //     value: "United States dollar"
    // }, {
    //     id: "UYU",
    //     value: "Uruguayan peso"
    // }, {
    //     id: "UZS",
    //     value: "Uzbekistani som"
    // }, {
    //     id: "VEF",
    //     value: "Venezuelan bolívar"
    // }, {
    //     id: "VND",
    //     value: "Vietnamese đồng"
    // }, {
    //     id: "VUV",
    //     value: "Vanuatu vatu"
    // }, {
    //     id: "WST",
    //     value: "Samoan tālā"
    // }, {
    //     id: "XAF",
    //     value: "Central African CFA franc"
    // }, {
    //     id: "XCD",
    //     value: "East Caribbean dollar"
    // }, {
    //     id: "XOF",
    //     value: "West African CFA franc"
    // }, {
    //     id: "XPF",
    //     value: "CFP franc"
    // }, {
    //     id: "YER",
    //     value: "Yemeni rial"
    // }, {
    //     id: "ZAR",
    //     value: "South African rand"
    // }, {
    //     id: "ZMW",
    //     value: "Zambian kwacha"
    // }, {
    //     id: "ZWL",
    //     value: "Zimbabwean dollar"
    // }],
    // ends NEAI-286 

    // starts NEAI-302
   
    CurrenceCodeMaster: [{
        value: "AED",
        label: "United Arab Emirates dirham"
      }, {
        value: "AFN",
        label: "Afghan afghani"
      }, {
        value: "ALL",
        label: "Albanian lek"
      }, {
        value: "AMD",
        label: "Armenian dram"
      }, {
        value: "AOA",
        label: "Angolan kwanza"
      }, {
        value: "ARS",
        label: "Argentine peso"
      }, {
        value: "AUD",
        label: "Australian dollar"
      }, {
        value: "AWG",
        label: "Aruban florin"
      }, {
        value: "AZN",
        label: "Azerbaijani manat"
      }, {
        value: "BAM",
        label: "Bosnia and Herzegovina convertible mark"
      }, {
        value: "BBD",
        label: "Barbadian dollar"
      }, {
        value: "BDT",
        label: "Bangladeshi taka"
      }, {
        value: "BGN",
        label: "Bulgarian lev"
      }, {
        value: "BHD",
        label: "Bahraini dinar"
      }, {
        value: "BIF",
        label: "Burundian franc"
      }, {
        value: "BMD",
        label: "Bermudian dollar"
      }, {
        value: "BND",
        label: "Brunei dollar"
      }, {
        value: "BOB",
        label: "Bolivian boliviano"
      }, {
        value: "BRL",
        label: "Brazilian real"
      }, {
        value: "BSD",
        label: "Bahamian dollar"
      }, {
        value: "BTN",
        label: "Bhutanese ngultrum"
      }, {
        value: "BWP",
        label: "Botswana pula"
      }, {
        value: "BYR",
        label: "Belarusian ruble"
      }, {
        value: "BZD",
        label: "Belize dollar"
      }, {
        value: "CAD",
        label: "Canadian dollar"
      }, {
        value: "CDF",
        label: "Congolese franc"
      }, {
        value: "CHF",
        label: "Swiss franc"
      }, {
        value: "CLP",
        label: "Chilean peso"
      }, {
        value: "CNY",
        label: "Chinese yuan"
      }, {
        value: "COP",
        label: "Colombian peso"
      }, {
        value: "CRC",
        label: "Costa Rican colón"
      }, {
        value: "CUP",
        label: "Cuban convertible peso"
      }, {
        value: "CVE",
        label: "Cape Verdean escudo"
      }, {
        value: "CZK",
        label: "Czech koruna"
      }, {
        value: "DJF",
        label: "Djiboutian franc"
      }, {
        value: "DKK",
        label: "Danish krone"
      }, {
        value: "DOP",
        label: "Dominican peso"
      }, {
        value: "DZD",
        label: "Algerian dinar"
      }, {
        value: "EGP",
        label: "Egyptian pound"
      }, {
        value: "ERN",
        label: "Eritrean nakfa"
      }, {
        value: "ETB",
        label: "Ethiopian birr"
      }, {
        value: "EUR",
        label: "Euro"
      }, {
        value: "FJD",
        label: "Fijian dollar"
      }, {
        value: "FKP",
        label: "Falkland Islands pound"
      }, {
        value: "GBP",
        label: "British pound"
      }, {
        value: "GEL",
        label: "Georgian lari"
      }, {
        value: "GHS",
        label: "Ghana cedi"
      }, {
        value: "GMD",
        label: "Gambian dalasi"
      }, {
        value: "GNF",
        label: "Guinean franc"
      }, {
        value: "GTQ",
        label: "Guatemalan quetzal"
      }, {
        value: "GYD",
        label: "Guyanese dollar"
      }, {
        value: "HKD",
        label: "Hong Kong dollar"
      }, {
        value: "HNL",
        label: "Honduran lempira"
      }, {
        value: "HRK",
        label: "Croatian kuna"
      }, {
        value: "HTG",
        label: "Haitian gourde"
      }, {
        value: "HUF",
        label: "Hungarian forint"
      }, {
        value: "IDR",
        label: "Indonesian rupiah"
      }, {
        value: "ILS",
        label: "Israeli new shekel"
      }, {
        value: "IMP",
        label: "Manx pound"
      }, {
        value: "INR",
        label: "Indian rupee"
      }, {
        value: "IQD",
        label: "Iraqi dinar"
      }, {
        value: "IRR",
        label: "Iranian rial"
      }, {
        value: "ISK",
        label: "Icelandic króna"
      }, {
        value: "JEP",
        label: "Jersey pound"
      }, {
        value: "JMD",
        label: "Jamaican dollar"
      }, {
        value: "JOD",
        label: "Jordanian dinar"
      }, {
        value: "JPY",
        label: "Japanese yen"
      }, {
        value: "KES",
        label: "Kenyan shilling"
      }, {
        value: "KGS",
        label: "Kyrgyzstani som"
      }, {
        value: "KHR",
        label: "Cambodian riel"
      }, {
        value: "KMF",
        label: "Comorian franc"
      }, {
        value: "KPW",
        label: "North Korean won"
      }, {
        value: "KRW",
        label: "South Korean won"
      }, {
        value: "KWD",
        label: "Kuwaiti dinar"
      }, {
        value: "KYD",
        label: "Cayman Islands dollar"
      }, {
        value: "KZT",
        label: "Kazakhstani tenge"
      }, {
        value: "LAK",
        label: "Lao kip"
      }, {
        value: "LBP",
        label: "Lebanese pound"
      }, {
        value: "LKR",
        label: "Sri Lankan rupee"
      }, {
        value: "LRD",
        label: "Liberian dollar"
      }, {
        value: "LSL",
        label: "Lesotho loti"
      }, {
        value: "LTL",
        label: "Lithuanian litas"
      }, {
        value: "LVL",
        label: "Latvian lats"
      }, {
        value: "LYD",
        label: "Libyan dinar"
      }, {
        value: "MAD",
        label: "Moroccan dirham"
      }, {
        value: "MDL",
        label: "Moldovan leu"
      }, {
        value: "MGA",
        label: "Malagasy ariary"
      }, {
        value: "MKD",
        label: "Macedonian denar"
      }, {
        value: "MMK",
        label: "Burmese kyat"
      }, {
        value: "MNT",
        label: "Mongolian tögrög"
      }, {
        value: "MOP",
        label: "Macanese pataca"
      }, {
        value: "MRO",
        label: "Mauritanian ouguiya"
      }, {
        value: "MUR",
        label: "Mauritian rupee"
      }, {
        value: "MVR",
        label: "Maldivian rufiyaa"
      }, {
        value: "MWK",
        label: "Malawian kwacha"
      }, {
        value: "MXN",
        label: "Mexican peso"
      }, {
        value: "MYR",
        label: "Malaysian ringgit"
      }, {
        value: "MZN",
        label: "Mozambican metical"
      }, {
        value: "NAD",
        label: "Namibian dollar"
      }, {
        value: "NGN",
        label: "Nigerian naira"
      }, {
        value: "NIO",
        label: "Nicaraguan córdoba"
      }, {
        value: "NOK",
        label: "Norwegian krone"
      }, {
        value: "NPR",
        label: "Nepalese rupee"
      }, {
        value: "NZD",
        label: "New Zealand dollar"
      }, {
        value: "OMR",
        label: "Omani rial"
      }, {
        value: "PAB",
        label: "Panamanian balboa"
      }, {
        value: "PEN",
        label: "Peruvian nuevo sol"
      }, {
        value: "PGK",
        label: "Papua New Guinean kina"
      }, {
        value: "PHP",
        label: "Philippine peso"
      }, {
        value: "PKR",
        label: "Pakistani rupee"
      }, {
        value: "PLN",
        label: "Polish złoty"
      }, {
        value: "PRB",
        label: "Transnistrian ruble"
      }, {
        value: "PYG",
        label: "Paraguayan guaraní"
      }, {
        value: "QAR",
        label: "Qatari riyal"
      }, {
        value: "RON",
        label: "Romanian leu"
      }, {
        value: "RSD",
        label: "Serbian dinar"
      }, {
        value: "RUB",
        label: "Russian ruble"
      }, {
        value: "RWF",
        label: "Rwandan franc"
      }, {
        value: "SAR",
        label: "Saudi riyal"
      }, {
        value: "SBD",
        label: "Solomon Islands dollar"
      }, {
        value: "SCR",
        label: "Seychellois rupee"
      }, {
        value: "SDG",
        label: "Singapore dollar"
      }, {
        value: "SEK",
        label: "Swedish krona"
      }, {
        value: "SGD",
        label: "Singapore dollar"
      }, {
        value: "SHP",
        label: "Saint Helena pound"
      }, {
        value: "SLL",
        label: "Sierra Leonean leone"
      }, {
        value: "SOS",
        label: "Somali shilling"
      }, {
        value: "SRD",
        label: "Surinamese dollar"
      }, {
        value: "SSP",
        label: "South Sudanese pound"
      }, {
        value: "STD",
        label: "São Tomé and Príncipe dobra"
      }, {
        value: "SVC",
        label: "Salvadoran colón"
      }, {
        value: "SYP",
        label: "Syrian pound"
      }, {
        value: "SZL",
        label: "Swazi lilangeni"
      }, {
        value: "THB",
        label: "Thai baht"
      }, {
        value: "TJS",
        label: "Tajikistani somoni"
      }, {
        value: "TMT",
        label: "Turkmenistan manat"
      }, {
        value: "TND",
        label: "Tunisian dinar"
      }, {
        value: "TOP",
        label: "Tongan paʻanga"
      }, {
        value: "TRY",
        label: "Turkish lira"
      }, {
        value: "TTD",
        label: "Trinidad and Tobago dollar"
      }, {
        value: "TWD",
        label: "New Taiwan dollar"
      }, {
        value: "TZS",
        label: "Tanzanian shilling"
      }, {
        value: "UAH",
        label: "Ukrainian hryvnia"
      }, {
        value: "UGX",
        label: "Ugandan shilling"
      }, {
        value: "USD",
        label: "United States dollar"
      }, {
        value: "UYU",
        label: "Uruguayan peso"
      }, {
        value: "UZS",
        label: "Uzbekistani som"
      }, {
        value: "VEF",
        label: "Venezuelan bolívar"
      }, {
        value: "VND",
        label: "Vietnamese đồng"
      }, {
        value: "VUV",
        label: "Vanuatu vatu"
      }, {
        value: "WST",
        label: "Samoan tālā"
      }, {
        value: "XAF",
        label: "Central African CFA franc"
      }, {
        value: "XCD",
        label: "East Caribbean dollar"
      }, {
        value: "XOF",
        label: "West African CFA franc"
      }, {
        value: "XPF",
        label: "CFP franc"
      }, {
        value: "YER",
        label: "Yemeni rial"
      }, {
        value: "ZAR",
        label: "South African rand"
      }, {
        value: "ZMW",
        label: "Zambian kwacha"
      }, {
        value: "ZWL",
        label: "Zimbabwean dollar"
      }],
      
   
    // PlanStatusMaster: [{
    //     value: "None",
    //     id: ""
    // }, {
    //     value: "Not Completed",
    //     id: "N"
    // }, {
    //     value: "Completed",
    //     id: "C"
    // }],
    PlanStatusMaster: [{
      label: "Not Completed",
      value: "N"
  }, {
      label: "Completed",
      value: "C"
  }],
    // AssignmentTypesMaster: [{
    //     value: "None",
    //     id: ""
    // }, {
    //     value: "Question and Answer",
    //     id: "Q"
    // }, {
    //     value: "Worksheet",
    //     id: "W"
    // }],
    AssignmentTypesMaster: [{
      label: "Question and Answer",
      value: "Q"
  }, {
      label: "Worksheet",
      value: "W"
  }],
    AnswerStatusMaster: [{
        value: "None",
        id: ""
    }, {
        value: "Answered",
        id: "A"
    }, {
        value: "Not Answered",
        id: "N"
    }],
     // ends NEAI-302

   // SHA030921 starts
   OnlineClassRoomTypeMaster: [{value: "None", id: ""},{value: "1-to-1 classroom", id: "1"},{value: "Group classroom", id: "G"}],
   OnlineStaffMeetingTypeMaster: [{value: "None", id: ""},{value: "1-to-1 meeting", id: "1"},{value: "Teachers meeting", id: "T"},{value: "Non-Teaching staffs meeting", id: "N"},{value: "All staffs meeting", id: "S"}],
  //  MeetingScreenTypeMaster: [{value: "None", id: ""},{value: "Online Video Classroom", id: "O"},{value: "Online Staff Meeting", id: "S"},{value: "Online Parent/Student Meeting", id: "P"}],
  MeetingScreenTypeMaster: [{label: "None", value: ""},{label: "Online Video Classroom", value: "O"},{label: "Online Staff Meeting", value: "S"},{label: "Online Parent/Student Meeting", value: "P"}],
   // SHA030921 ends
   QuestionType: [{
    label: "Simple  Questions",
    value: "S"
}, {
    label: "Comprehension",
    value: "C"
}],

NotificationMasterWithOutEvent: [{
  label: "Homework",
  value: "I1"
}, {
  label: "Disciplinary Action",
  value: "I2"
}, {
  label: "Emergency",
  value: "I3"
}, {
  label: "Holiday Declaration",
  value: "I4"
}, {
  label: "Appreciation",
  value: "I5"
}, {
  label: "Other Instant Messages",
  value: "I6"
}],

FeeStatusMaster: [{
  label: "Not Paid",
  value: "N"
}, {
  label: "Paid",
  value: "P"
}, ]



};
// SelectListUtils.selectBackendMaster = ['class', 'feeType', 'notificationTypes', 'subject', 'examType']
//SelectListUtils.selectBackendMaster = ['feeType','subject', 'examType']
SelectListUtils.selectBackendMaster = ['feeType','subject']



SelectListUtils.fnPostSelectResponse = async (data) => {
    //console.log(data, "fnPostSelectResponse")

    var temp = await AsyncStorage.getItem('selectBox');
    var selectBox
    if (temp != null) {
        selectBox = await JSON.parse(temp);
    }
    else {
        selectBox = null
    }


    //console.log(selectBox, "selectBoxitem")


    if (selectBox == null) {
        selectBox = {
            ClassMaster: [],
            FeeMaster: [],
            NotificationMaster: [],
            PeriodMaster: [],
            SubjectMaster: [],
            ExamMaster: []

        }
    }
    let temData = []

  

    switch (data.body.master) {
        case "class":
            for (let item of data.body.ClassMaster) {
                if (item != 'Select option' && item != '') {
                    temData.push({
                        value: item,
                        id: item
                    })
                }
                else {
                    temData.push({
                        value: 'None',
                        id: ''
                    })
                }
            }
            selectBox.ClassMaster = temData;
            SelectListUtils.selectMaster.ClassMaster = temData
            break;
        case "feeType":
            for (let item of data.body.FeeMaster) {
                if (item != 'Select option' && item != '') {
                    temData.push({
                       // value: item.name,
                        // id: item.id
                        label: item,
                        value: item
                    })
                }
                // else {
                //     temData.push({
                //        // value: 'None',
                //         // id: ''
                //         label: 'None',
                //         value: ''
                //     })
                // }
            }
            selectBox.FeeMaster = temData;
            SelectListUtils.selectMaster.FeeMaster = temData
            break;
        case "notificationTypes":
            for (let item of data.body.NotificationMaster) {
                if (item != 'Select option' && item != '') {
                    temData.push({
                        value: item,
                        id: item
                    })
                }
                else {
                    temData.push({
                        value: 'None',
                        id: ''
                    })
                }
            }
            selectBox.NotificationMaster = temData;
            SelectListUtils.selectMaster.NotificationMaster = temData
            break;
        case "periodNumber":
            for (let item of data.body.PeriodMaster) {
                if (item != 'Select option' && item != '') {
                    temData.push({
                        value: item
                    })
                }
            }
            selectBox.PeriodMaster = temData;
            SelectListUtils.selectMaster.PeriodMaster = temData
            break;
        case "subject":
            for (let item of data.body.SubjectMaster) {
                if (item.name != 'Select option' && item.name != '') {
                    temData.push({
                        // value: item.name,
                        // id: item.id
                        label: item.name,
                        value: item.id

                    })
                }
                // else {
                //     temData.push({
                //         // value: 'None',
                //         // id: ''
                //         label: 'None',
                //         value: ''

                //     })
                // }
            }
            selectBox.SubjectMaster = temData;
            SelectListUtils.selectMaster.SubjectMaster = temData
            break;

        case "examType":
            for (let item of data.body.ExamMaster) {
                if (item.name != 'Select option' && item.name != '') {
                    temData.push({
                        // value: item.name,
                        // id: item.id
                        label: item.name,
                        value: item.id
                    })
                }
                // else {
                //     temData.push({
                //         // value: 'None',
                //         // id: ''
                //         label: 'None',
                //         value: ''
                //     })
                // }
            }
            selectBox.ExamMaster = temData;
            SelectListUtils.selectMaster.ExamMaster = temData
            break;

    }

    await AsyncStorage.setItem('selectBox', JSON.stringify(selectBox));
}




SelectListUtils.getSelectMaster = async function () {

    //console.log(SelectListUtils.abortController, 'cancel token select box')


    try {
        var globalData = JSON.parse(await AsyncStorage.getItem('GLOBAL'));
    }
    catch (err) {
        globalData = null
    }

    var temp = await AsyncStorage.getItem('selectBox')
    var selectBox
    if (temp != null) {
        selectBox = JSON.parse(temp);
    }
    else {
        selectBox = null
    }

    for (let value of SelectListUtils.selectBackendMaster) {
        //console.log(value, "selectbox value")
        var selectApiCall = true;
        switch (value) {
            case "class":
                if (selectBox != null && selectBox.ClassMaster.length > 0) {
                    selectApiCall = false
                    SelectListUtils.selectMaster.ClassMaster = selectBox.ClassMaster
                }
                break;
            case "feeType":
                if (selectBox != null && selectBox.FeeMaster.length > 0) {
                    selectApiCall = false
                    SelectListUtils.selectMaster.FeeMaster = selectBox.FeeMaster
                }

                break;
            case "notificationTypes":
                if (selectBox != null && selectBox.NotificationMaster.length > 0) {
                    selectApiCall = false
                    SelectListUtils.selectMaster.NotificationMaster = selectBox.NotificationMaster
                }

                break;
            case "periodNumber":
                if (selectBox != null && selectBox.PeriodMaster.length > 0) {
                    selectApiCall = false
                    SelectListUtils.selectMaster.PeriodMaster = selectBox.PeriodMaster
                }
                break;
            case "subject":
                if (selectBox != null && selectBox.SubjectMaster.length > 0) {
                    selectApiCall = false
                    SelectListUtils.selectMaster.SubjectMaster = selectBox.SubjectMaster
                }

                break;

            case "examType":
                if (selectBox != null && selectBox.ExamMaster.length > 0) {
                    selectApiCall = false
                    SelectListUtils.selectMaster.ExamMaster = selectBox.ExamMaster
                }

                break;
        }

        //console.log(selectApiCall, 'select box api call')


        if (selectApiCall) {
            var resToken
            var tempRst
            var t;
            t = await AsyncStorage.getItem('Rst');
            if (t != null) {
                tempRst = JSON.parse(t)
            }
            else {
                tempRst = null
            }


            if (tempRst != null) {
                for (let item of tempRst) {
                    if (item.service == 'SelectBoxMaster') {
                        resToken = item.value
                    }
                }
            }
            else {
                resToken = null
            }


            if (resToken == null || resToken == '') {

                await apiCall.functions.callRequestToken(globalData, 'SelectBoxMaster')

                tempRst = JSON.parse(await AsyncStorage.getItem('Rst'))

                //console.log(tempRst, 'tempRst in selectlist')

                for (let item of tempRst) {
                    if (item.service == 'SelectBoxMaster') {
                        resToken = item.value
                    }

                }



                //console.log(resToken, 'resToken of SelectBoxMaster')


                // resToken = tempRst['SelectBoxMaster'].value
            }



            if (resToken != null && resToken != '') {

                var msgheader = {
                    msgID: "",
                    version:httpUtils.VERSION(),
                    build:httpUtils.BUILD(), 
                    service: "SelectBoxMaster",
                    operation: "View",
                    instituteID: globalData.instituteID,
                    userID: globalData.userID,
                    key: "",
                    token: resToken,
                    source: "NewGenEducationMobile",
                    businessEntity: [],
                    status: ""


                }

                var request = {
                    header: msgheader,
                    body: {
                        master: value,
                        input: [{ entityName: "instituteID", entityValue: globalData.instituteID }]
                    },
                    audit: {},
                    error: {}
                };




                await fetch(httpUtils.getURL('Institute', 'SelectBoxMasterService'), {
                    signal: SelectListUtils.abortController.signal,
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(request)
                })
                    .then(res => {
                        //console.log(res, "select box response")

                        //console.log(res, "select box api")
                        if (res.status != null && res.status == '200') {
                            res.json().then(async (res) => {
                                //console.log(res, 'json response')
                                if (res.header.status == 'success') {
                                    await SelectListUtils.fnPostSelectResponse(res)
                                }
                            }
                            )
                        }

                    })
                    .catch((e) => {
                        //console.log(e);
                    });
            }
        }
    }
}














module.exports = {
    functions: SelectListUtils
};

