import cloneDeep from 'lodash/cloneDeep';
import CustomCacheMemory from "./CustomCacheMemory";
import Toast from 'react-native-toast-message';
import { Animated } from 'react-native';
import { Easing } from 'react-native-reanimated';
import AsyncStorage from "@react-native-async-storage/async-storage";




class ScreenUtils { }




ScreenUtils.showAnimationRefreshBtn = true

ScreenUtils.unMountDone = false

ScreenUtils.paymentAmount = 0

ScreenUtils.checkForCorrectDataModal = ['TeacherProfile', 'TeacherLessonPlannerService', 'TeacherLeaveManagement']

ScreenUtils.discardSearch = function (stateObject) {
    stateObject.parentStateChange({
        currentOperation: 'SummaryQuery',
        displayContent: 'summaryDataModel',
        summaryResultByFilter: []
    })
}


ScreenUtils.isUnMountDone = function () {
    while (!ScreenUtils.unMountDone) {
        console.log(ScreenUtils.unMountDone, 'inside while loop')
        //  break
    }
    ScreenUtils.unMountDone = false
    return true
}









ScreenUtils.setCorrectDataModal = function (serviceName, stateObject) {
    switch (serviceName) {
        case 'TeacherProfile':
            stateObject.state.dataModel.qualification = stateObject.state.dataModel.general.qualification
            stateObject.state.dataModel.contactNo = stateObject.state.dataModel.general.contactNo
            stateObject.state.dataModel.emailID = stateObject.state.dataModel.general.emailID
            break;
        case 'TeacherLeaveManagement':
            var dummyModal = cloneDeep(stateObject.state.dataModel)
            dummyModal.leaveStatus = 'Pending'
            stateObject.state.dataModel = dummyModal
            break;
        case 'StudentLeaveManagement':
            var dummyModal = cloneDeep(stateObject.state.dataModel)
            dummyModal.leaveStatus = 'Pending'
            stateObject.state.dataModel = dummyModal
            break;
        default:
            break;
    }
}










ScreenUtils.getContentType =  function (stateObject) {
    
if(stateObject.state.displayContent ==  'summaryDataModel'){
    return 'summaryDataModel'
}
else{
    return 'summaryResultByFilter'
}





}




ScreenUtils.updateSummaryResult = async function (operation, stateObject) {

    var globalData = JSON.parse(await AsyncStorage.getItem('GLOBAL'));

    var count;
    var temp = {};
    var presentCount = 0;
    var absentCount = 0;


    switch (operation) {
        case 'Create':
             

             if(stateObject.state.serviceName == "StudentProfile"){
                var authStatus = "";
                var dispAuthStat = "";
                var dispAuthStatClassName = "";
                switch(stateObject.state.auditDataModel.AuthStat){
                    case "Authorised":
                        authStatus = "A";
                        dispAuthStat = "Approved";
                        dispAuthStatClassName = "badge-light-success";
                        break;
                    case "Unauthorised":
                        authStatus = "U";
                        dispAuthStat = "Pending for approval";
                        dispAuthStatClassName = "badge-light-warning";
                        break;
                    case "Rejected":
                        authStatus = "R";
                        dispAuthStat = "Rejected";
                        dispAuthStatClassName = "badge-light-danger";
                        break;
                }
                var RecordStat = "";
                switch(stateObject.state.auditDataModel.RecordStat){
                    case "Open":
                        RecordStat = "O";
                        break;
                    case "Deleted":
                        RecordStat = "D";
                        break;
                }
                var summaryResultObj = {
                    addressLine1: stateObject.state.dataModel.general.address.addressLine1,
                    addressLine2: stateObject.state.dataModel.general.address.addressLine2,
                    addressLine3: stateObject.state.dataModel.general.address.addressLine3,
                    addressLine4: stateObject.state.dataModel.general.address.addressLine4,
                    addressLine5: stateObject.state.dataModel.general.address.addressLine5,
                    authStat: authStatus,
                    bloodGroup: stateObject.state.dataModel.general.bloodGroup,
                    checkerDateStamp: "",
                    checkerID: "",
                    checkerRemarks: "",
                    class: "",
                    classDesc: "",
                    dispAuthStat: dispAuthStat,
                    dispAuthStatClassName: dispAuthStatClassName,
                    dob: stateObject.state.dataModel.general.dob,
                    existingMedicalDetail: stateObject.state.dataModel.emergency.existingMedicalDetails,
                    makerDateStamp: "",
                    makerID: stateObject.state.auditDataModel.MakerID,
                    makerRemarks: "",
                    notes: "",
                    profileImgPath: stateObject.state.dataModel.profileImgPath,
                    recordStatus: RecordStat,
                    studentID: stateObject.state.dataModel.studentID,
                    studentName: stateObject.state.dataModel.studentName,
                    versionNumber: stateObject.state.auditDataModel.Version
                };
                stateObject.state.summaryDataModel.SummaryResult.unshift(summaryResultObj);
               //$scope.$apply();
            }
            else if(stateObject.state.serviceName == "TeacherProfile"){
                var authStatus = "";
                var dispAuthStat = "";
                var dispAuthStatClassName = "";
                switch(stateObject.state.auditDataModel.AuthStat){
                    case "Authorised":
                        authStatus = "A";
                        dispAuthStat = "Approved";
                        dispAuthStatClassName = "badge-light-success";
                        break;
                    case "Unauthorised":
                        authStatus = "U";
                        dispAuthStat = "Pending for approval";
                        dispAuthStatClassName = "badge-light-warning";
                        break;
                    case "Rejected":
                        authStatus = "R";
                        dispAuthStat = "Rejected";
                        dispAuthStatClassName = "badge-light-danger";
                        break;
                }
                var RecordStat = "";
                switch(stateObject.state.auditDataModel.RecordStat){
                    case "Open":
                        RecordStat = "O";
                        break;
                    case "Deleted":
                        RecordStat = "D";
                        break;
                }
                var summaryResultObj = {
                    addressLine1: stateObject.state.dataModel.general.addressLine1,
                    addressLine2: stateObject.state.dataModel.general.addressLine2,
                    addressLine3: stateObject.state.dataModel.general.addressLine3,
                    addressLine4: stateObject.state.dataModel.general.addressLine4,
                    addressLine5: stateObject.state.dataModel.general.addressLine5,
                    authStat: authStatus,
                    bloodGroup: stateObject.state.dataModel.general.bloodGroup,
                    classCode: "",
                    classDescription: "",
                    contactNo: stateObject.state.dataModel.general.contactNo,
                    dispAuthStat: dispAuthStat,
                    dispAuthStatClassName: dispAuthStatClassName,
                    dob: stateObject.state.dataModel.general.dob,
                    emailID: stateObject.state.dataModel.general.emailID,
                    existingMedicalDetail: stateObject.state.dataModel.emergency.existingMedicalDetails,
                    makerID: stateObject.state.auditDataModel.MakerID,
                    profileImgPath: stateObject.state.dataModel.profileImgPath,
                    qualification: stateObject.state.dataModel.general.qualification,
                    recordStatus: RecordStat,
                    shortName: "",
                    teacherID: stateObject.state.dataModel.teacherID,
                    teacherName: stateObject.state.dataModel.teacherName,
                    versionNumber: stateObject.state.auditDataModel.Version
                };
                stateObject.state.summaryDataModel.SummaryResult.unshift(summaryResultObj);
                //$scope.$apply();
            }
            


            if (stateObject.state.serviceName == "TeacherLessonPlannerService") {
                temp = {};
                temp.month = stateObject.state.dataModel.date.split('-')[1].replace(/^0+/, '');
                temp.teacherID = stateObject.state.dataModel.teacherID;
                temp.teacherName = stateObject.state.dataModel.teacherName;
                temp.year = stateObject.state.dataModel.date.split('-')[2]
                temp.childResults = [];

                var obj = {
                    authStat: "A",
                    date: stateObject.state.dataModel.date,
                    makerID: stateObject.state.userID,
                    planID: stateObject.state.dataModel.planID,
                    teacherID: stateObject.state.dataModel.teacherID,
                    teacherName: stateObject.state.dataModel.teacherName,
                    versionNumber: "1"
                }
                obj.lessonResults = [];

                for (let i = 0; i < stateObject.state.dataModel.classAndSubjectDetails.length; i++) {
                    for (let j = 0; j < stateObject.state.dataModel.classAndSubjectDetails[i].planDetails.length; j++) {
                        var item = {};
                        var status = "";
                        if (stateObject.state.dataModel.classAndSubjectDetails[i].planDetails[j].status == "C") {
                            status = "Completed";
                        } else {
                            status = "Not completed";
                        }
                        item.classDescription = stateObject.state.dataModel.classAndSubjectDetails[i].classDescription;
                        item.classID = stateObject.state.dataModel.classAndSubjectDetails[i].classID;
                        item.heading = stateObject.state.dataModel.classAndSubjectDetails[i].planDetails[j].heading;
                        item.lesson = stateObject.state.dataModel.classAndSubjectDetails[i].planDetails[j].lesson;
                        item.periodNumber = stateObject.state.dataModel.classAndSubjectDetails[i].periodNo;
                        item.status = status;
                        item.subHeading = stateObject.state.dataModel.classAndSubjectDetails[i].planDetails[j].subHeading;
                        item.subjectID = stateObject.state.dataModel.classAndSubjectDetails[i].subjectID;
                        item.subjectName = stateObject.state.dataModel.classAndSubjectDetails[i].subjectID;

                        obj.lessonResults.push(item);
                    }
                }
                temp.childResults.push(obj);

                var oldDate = stateObject.state.dataModel.date.split('-')
                var newDate = `${oldDate[2]}-${oldDate[1]}-${oldDate[0]}`

                var planCalendarobj = {
                    compPercentage: 0,
                    totalLessonPlans: obj.lessonResults.length,
                    planStatus: true,
                    details: obj,
                    date: newDate,
                    compCount: 0,
                    notCompCount: 0,
                }

                var alreadyExist = -1;
                for (let i = 0; i < stateObject.state.summaryDataModel.SummaryResult.length; i++) {
                    if (stateObject.state.summaryDataModel.SummaryResult[i].year == temp.year
                        && stateObject.state.summaryDataModel.SummaryResult[i].month == temp.month
                        && stateObject.state.summaryDataModel.SummaryResult[i].teacherID == temp.teacherID
                    ) {
                        alreadyExist = i;
                        break;
                    }
                }




                if (alreadyExist != -1) {
                    stateObject.state.summaryDataModel.SummaryResult[alreadyExist].childResults.push(obj);
                    // stateObject.state.childViewDetails.childResults.push(obj);
                    if (stateObject.state.calendarIsOpen) {
                        stateObject.state.calendarLoaditems[newDate] = [planCalendarobj];
                        stateObject.state.calendarRefresh = false
                        stateObject.state.calendarEmptyRefresh = true
                    }
                    else {
                        stateObject.state.summaryDataModel.SummaryResult[alreadyExist].childResults = [];
                    }
                } else {
                    stateObject.state.summaryDataModel.SummaryResult.unshift(temp);
                }


            }
            else if (stateObject.state.serviceName == "StudentLessonPlannerService") {
              
            
                // return
                temp = {};
                temp.month = stateObject.state.dataModel.date.split('-')[1].replace(/^0+/, '');
                temp.year = stateObject.state.dataModel.date.split('-')[2]
                temp.childResults = [];

                var obj = {
                    authStat: "A",
                    date: stateObject.state.dataModel.date,
                    makerID: stateObject.state.userID,
                    planID: stateObject.state.dataModel.planID,
                    sudentID: stateObject.state.dataModel.sudentID,
                    versionNumber: "1"
                }
                obj.lessonResults = [];
                    for (let j = 0; j < stateObject.state.dataModel.planDetails.length; j++) {
                        var item = {};
                        var status = "";
                        if (stateObject.state.dataModel.planDetails[j].status == "C") {
                            status = "Completed";
                        } else {
                            status = "Not completed";
                        }
                        item.heading = stateObject.state.dataModel.planDetails[j].heading;
                        item.lesson = stateObject.state.dataModel.planDetails[j].lesson;
                        item.status = status;
                        item.subHeading = stateObject.state.dataModel.planDetails[j].subHeading;
                        item.subjectID = stateObject.state.dataModel.planDetails[j].subjectID;
                        obj.lessonResults.push(item);
                    }
                
                temp.childResults.push(obj);
                var oldDate = stateObject.state.dataModel.date.split('-')
                var newDate = `${oldDate[2]}-${oldDate[1]}-${oldDate[0]}`

                var planCalendarobj = {
                    compPercentage: 0,
                    totalLessonPlans: obj.lessonResults.length,
                    planStatus: true,
                    details: obj,
                    date: newDate,
                    compCount: 0,
                    notCompCount: 0,
                }

                var alreadyExist = -1;
                for (let i = 0; i < stateObject.state[ScreenUtils.getContentType(stateObject)].SummaryResult.length; i++) {
                    if (stateObject.state[ScreenUtils.getContentType(stateObject)].SummaryResult[i].year == temp.year
                        && stateObject.state[ScreenUtils.getContentType(stateObject)].SummaryResult[i].month == temp.month
                    ) {
                        alreadyExist = i;
                        break;
                    }
                }

                if (alreadyExist != -1) {
                    // stateObject.state[ScreenUtils.getContentType(stateObject)].SummaryResult[alreadyExist].childResults.push(obj);
                    stateObject.state[ScreenUtils.getContentType(stateObject)].SummaryResult[alreadyExist].childResults.push(obj);
                    if (stateObject.state.calendarIsOpen) {
                        stateObject.state.calendarLoaditems[newDate] = [planCalendarobj];
                        stateObject.state.calendarRefresh = false
                        stateObject.state.calendarEmptyRefresh = true
                    }
                    else {
                        stateObject.state[ScreenUtils.getContentType(stateObject)].SummaryResult[alreadyExist].childResults = [];
                    }
                } else {
                    stateObject.state[ScreenUtils.getContentType(stateObject)].SummaryResult.unshift(temp);
                }


            }
            else if (stateObject.state.serviceName == "ClassLessonPlannerService") {
                temp = {};
                temp.month = stateObject.state.dataModel.date.split('-')[1].replace(/^0+/, '');
                temp.year = stateObject.state.dataModel.date.split('-')[2]
                temp.classID = stateObject.state.dataModel.classID
                temp.classDescription = stateObject.state.dataModel.classDescription
                temp.childResults = [];

                 var authStatus = "";
                switch (stateObject.state.auditDataModel.AuthStat) {
                  case "Authorised":
                    authStatus = "A";
                    break;
                  case "Unauthorised":
                    authStatus = "U";
                    break;
                  case "Rejected":
                    authStatus = "R";
                    break;
                }

                var obj = {
                    authStat:authStatus,
                    makerID: stateObject.state.userID,
                    versionNumber: stateObject.state.auditDataModel.Version,
                    date: stateObject.state.dataModel.date,
                    totalStudents:0,
                    completedStudents:0,
                    planID: stateObject.state.dataModel.planID,
                    classID:stateObject.state.dataModel.classID,
                    classDescription:stateObject.state.dataModel.classDescription,
                 
                    
                }
                obj.lessonResults = [];
                    for (let j = 0; j < stateObject.state.dataModel.planDetails.length; j++) {
                        var item = {};
                        // var status = "";
                        // if (stateObject.state.dataModel.planDetails[j].status == "C") {
                        //     status = "Completed";
                        // } else {
                        //     status = "Not completed";
                        // }
                        item.heading = stateObject.state.dataModel.planDetails[j].heading;
                        item.lesson = stateObject.state.dataModel.planDetails[j].lesson;
                        // item.status = status;
                        item.subHeading = stateObject.state.dataModel.planDetails[j].subHeading;
                        item.subjectID = stateObject.state.dataModel.planDetails[j].subjectID;
                        obj.lessonResults.push(item);
                    }
                
                temp.childResults.push(obj);
                var oldDate = stateObject.state.dataModel.date.split('-')
                var newDate = `${oldDate[2]}-${oldDate[1]}-${oldDate[0]}`

                var planCalendarobj = {
                    compPercentage: 0,
                    totalLessonPlans: stateObject.state.dataModel.planDetails.length,
                    planStatus: true,
                    details: obj,
                    date: newDate,
                    compCount: 0,
                    notCompCount: 0,
                }

                var alreadyExist = -1;
                for (let i = 0; i < stateObject.state.summaryDataModel.SummaryResult.length; i++) {
                    if (stateObject.state.summaryDataModel.SummaryResult[i].year == temp.year
                        && stateObject.state.summaryDataModel.SummaryResult[i].month == temp.month
                        && stateObject.state.summaryDataModel.SummaryResult[i].classID == temp.classID
                    ) {
                        alreadyExist = i;
                        break;
                    }
                }

                if (alreadyExist != -1) {
                    // stateObject.state.summaryDataModel.SummaryResult[alreadyExist].childResults.push(obj);
                    stateObject.state.summaryDataModel.SummaryResult[alreadyExist].childResults.push(obj);
                    if (stateObject.state.calendarIsOpen) {
                        stateObject.state.calendarLoaditems[newDate] = [planCalendarobj];
                        stateObject.state.calendarRefresh = false
                        stateObject.state.calendarEmptyRefresh = true
                    }
                    else {
                        stateObject.state.summaryDataModel.SummaryResult[alreadyExist].childResults = [];
                    }
                } else {
                    stateObject.state.summaryDataModel.SummaryResult.unshift(temp);
                }


            }
            else if (stateObject.state.serviceName == "StudyMaterial") {
                temp = {};
                temp.standard = stateObject.state.dataModel.standard;
                temp.subjectID = stateObject.state.dataModel.subjectID;
                temp.subjectName = stateObject.state.dataModel.subjectName;
                temp.materialsForLesson = [];
                //additional info at the first level change starts
                temp.materialCount = 1;
                //additional info at the first level change ends

                // var authStatus = "";
                // switch (stateObject.state.auditDataModel.AuthStat) {
                //   case "Authorised":
                //     authStatus = "A";
                //     break;
                //   case "Unauthorised":
                //     authStatus = "U";
                //     break;
                //   case "Rejected":
                //     authStatus = "R";
                //     break;
                // }

                // var obj = {
                //   authStat: authStatus,
                //   contentPath: stateObject.state.dataModel.contentPath,
                //   dispContentPath: stateObject.state.dataModel.contentPath,
                //   heading: stateObject.state.dataModel.heading,
                //   lesson: stateObject.state.dataModel.lesson,
                //   makerID: stateObject.state.auditDataModel.MakerID,
                //   materialDescription: stateObject.state.dataModel.materialDescription,
                //   materialID: stateObject.state.dataModel.materialID,
                //   subHeading: stateObject.state.dataModel.subHeading,
                //   versionNumber: stateObject.state.auditDataModel.Version,
                // };
                // temp.materialsForLesson.push(obj);

                var alreadyExist = -1;
                for (let i = 0; i < stateObject.state.summaryDataModel.SummaryResult.length; i++) {
                    if (stateObject.state.summaryDataModel.SummaryResult[i].standard == temp.standard
                        && stateObject.state.summaryDataModel.SummaryResult[i].subjectID == temp.subjectID
                    ) {
                        alreadyExist = i;
                        break;
                    }
                }
                if (alreadyExist != -1) {
                    stateObject.state.summaryDataModel.SummaryResult[alreadyExist].materialsForLesson = [];
                    //additional info at the first level change starts
                    stateObject.state.summaryDataModel.SummaryResult[alreadyExist].materialCount = stateObject.state.summaryDataModel.SummaryResult[alreadyExist].materialCount + 1;
                    //additional info at the first level change ends
                } else {
                    stateObject.state.summaryDataModel.SummaryResult.unshift(temp);
                }
            }
            else if (stateObject.state.serviceName == "InstituteAssignment") {
                temp = {};
                temp.assignee = stateObject.state.dataModel.groupID;
                temp.groupDesc = stateObject.state.dataModel.groupDesc;
                temp.subjectID = stateObject.state.dataModel.subjectID;
                temp.subjectName = stateObject.state.dataModel.subjectName;
                temp.lessonDetails = [];

                //additional info at the first level change starts
                temp.lessonCount = 1;
                //additional info at the first level change ends



                var alreadyExist = -1;
                for (let i = 0; i < stateObject.state.summaryDataModel.SummaryResult.length; i++) {
                    if (stateObject.state.summaryDataModel.SummaryResult[i].assignee == temp.assignee
                        && stateObject.state.summaryDataModel.SummaryResult[i].subjectID == temp.subjectID
                    ) {
                        alreadyExist = i;
                        break;
                    }
                }
                if (alreadyExist != -1) {
                    // stateObject.state.summaryDataModel.SummaryResult[alreadyExist].lessonDetails.push(obj);
                    stateObject.state.summaryDataModel.SummaryResult[alreadyExist].lessonDetails = [];
                    //additional info at the first level change starts
                    stateObject.state.summaryDataModel.SummaryResult[alreadyExist].lessonCount = stateObject.state.summaryDataModel.SummaryResult[alreadyExist].lessonCount + 1;
                    //additional info at the first level change ends
                } else {
                    stateObject.state.summaryDataModel.SummaryResult.unshift(temp);
                }
            }
            else if (stateObject.state.serviceName == "ClassAttendance") {
                temp = {};
                temp.month = stateObject.state.dataModel.date.split('-')[1].replace(/^0+/, '');;
                temp.classID = stateObject.state.dataModel.class;
                temp.classDescription = stateObject.state.dataModel.classDescription;
                temp.year = stateObject.state.dataModel.date.split('-')[2]
                temp.attendanceDetails = [];

                for (let i = 0; i < stateObject.state.dataModel.afterNoon.length; i++) {
                    for (let j = 0; j < stateObject.state.dataModel.afterNoon[i].period.length; j++) {
                        if (stateObject.state.dataModel.afterNoon[i].period[j].attendance == 'L' || stateObject.state.dataModel.afterNoon[i].period[j].attendance == 'A') {
                            absentCount++
                        }
                        else {
                            presentCount++
                        }

                    }
                }
                for (let i = 0; i < stateObject.state.dataModel.foreNoon.length; i++) {
                    for (let j = 0; j < stateObject.state.dataModel.foreNoon[i].period.length; j++) {
                        if (stateObject.state.dataModel.foreNoon[i].period[j].attendance == 'L' || stateObject.state.dataModel.foreNoon[i].period[j].attendance == 'A') {
                            absentCount++
                        }
                        else {
                            presentCount++
                        }

                    }
                }

                var authStatus = "";
                switch (stateObject.state.auditDataModel.AuthStat) {
                    case "Authorised":
                        authStatus = "A";
                        break;
                    case "Unauthorised":
                        authStatus = "U";
                        break;
                    case "Rejected":
                        authStatus = "R";
                        break;
                }



                var obj = {
                    authStat: authStatus,
                    date: stateObject.state.dataModel.date,
                    makerID: stateObject.state.userID,
                    absentStudents: absentCount,
                    presentStudents: presentCount,
                    versionNumber: "1"
                }

                var oldDate = stateObject.state.dataModel.date.split('-')
                var newDate = `${oldDate[2]}-${oldDate[1]}-${oldDate[0]}`

                var calendarobj = {
                    status: true,
                    details: obj,
                    date: newDate,
                }
                // stateObject.state.

                temp.attendanceDetails.push(obj);

                var alreadyExist = -1;
                for (let i = 0; i < stateObject.state.summaryDataModel.SummaryResult.length; i++) {
                    if (stateObject.state.summaryDataModel.SummaryResult[i].year == temp.year
                        && stateObject.state.summaryDataModel.SummaryResult[i].month == temp.month
                        && stateObject.state.summaryDataModel.SummaryResult[i].classID == temp.classID
                    ) {
                        alreadyExist = i;
                        break;
                    }
                }
                if (alreadyExist != -1) {
                    // stateObject.state.summaryDataModel.SummaryResult[alreadyExist].attendanceDetails.push(obj);
                    stateObject.state.childViewDetails.attendanceDetails.push(obj);
                    if (stateObject.state.calendarIsOpen) {
                        stateObject.state.calendarLoaditems[newDate] = [calendarobj];
                        stateObject.state.calendarRefresh = false
                        stateObject.state.calendarEmptyRefresh = true
                    }
                    else {
                        stateObject.state.childViewDetails.attendanceDetails = [];
                    }

                } else {
                    stateObject.state.summaryDataModel.SummaryResult.unshift(temp);
                }
            }
            else if (stateObject.state.serviceName == "ClassAssignment") {

                temp = {};
                temp.month = stateObject.state.dataModel.dueDate.split('-')[1].replace(/^0+/, '');
                temp.classID = stateObject.state.dataModel.classID;
                temp.classDescription = stateObject.state.dataModel.classDescription;
                temp.year = stateObject.state.dataModel.dueDate.split('-')[2]
                temp.subjectID = stateObject.state.dataModel.subjectID;
                temp.subjectName = stateObject.state.dataModel.subjectName;
                temp.assignmentDetails = [];
                temp.assignmentCount = 1;

                var authStatus = "";
                switch (stateObject.state.auditDataModel.AuthStat) {
                    case "Authorised":
                        authStatus = "A";
                        break;
                    case "Unauthorised":
                        authStatus = "U";
                        break;
                    case "Rejected":
                        authStatus = "R";
                        break;
                }



                var obj = {
                    authStat: authStatus,
                    dueDate: stateObject.state.dataModel.dueDate,
                    assessmentStatus: 'Not Assessed',
                    assignmentDescription: stateObject.state.dataModel.assignmentDescription,
                    assignmentID: stateObject.state.dataModel.assignmentID,
                    classDescription: stateObject.state.dataModel.classDescription,
                    classID: stateObject.state.dataModel.classID,
                    makerID: stateObject.state.userID,
                    notSubmittedStudentCount: 0,
                    submittedStudentCount: 0,
                    type: stateObject.state.dataModel.type,
                    typeDescription: stateObject.state.dataModel.typeDescription,
                    versionNumber: "1"
                }

                var oldDate = stateObject.state.dataModel.dueDate.split('-')
                var newDate = `${oldDate[2]}-${oldDate[1]}-${oldDate[0]}`

                var calendarobj = {
                    status: true,
                    details: obj,
                    date: newDate,
                }
                // stateObject.state.

                temp.assignmentDetails.push(obj);

                var alreadyExist = -1;




                for (let i = 0; i < stateObject.state.summaryDataModel.SummaryResult.length; i++) {
                    if (stateObject.state.summaryDataModel.SummaryResult[i].year == temp.year
                        && stateObject.state.summaryDataModel.SummaryResult[i].month == temp.month
                        && stateObject.state.summaryDataModel.SummaryResult[i].classID == temp.classID
                        && stateObject.state.summaryDataModel.SummaryResult[i].subjectID == temp.subjectID
                    ) {
                        alreadyExist = i;
                        break;
                    }
                }
                if (alreadyExist != -1) {
                    if (stateObject.state.calendarIsOpen) {
                        stateObject.state.summaryDataModel.SummaryResult[alreadyExist].assignmentCount = stateObject.state.summaryDataModel.SummaryResult[alreadyExist].assignmentCount + 1
                        stateObject.state.summaryDataModel.SummaryResult[alreadyExist].assignmentDetails.push(obj);
                        // stateObject.state.childViewDetails.assignmentDetails.push(obj);
                        stateObject.state.calendarLoaditems[newDate] = [calendarobj];
                        stateObject.state.calendarRefresh = false
                        stateObject.state.calendarEmptyRefresh = true
                    }
                    else {
                        stateObject.state.summaryDataModel.SummaryResult[alreadyExist].assignmentCount = stateObject.state.summaryDataModel.SummaryResult[alreadyExist].assignmentCount + 1
                        stateObject.state.summaryDataModel.SummaryResult[alreadyExist].assignmentDetails = [];
                    }

                } else {
                    stateObject.state.summaryDataModel.SummaryResult.unshift(temp);
                }
            }
            else if (stateObject.state.serviceName == "ClassAssignmentAssessment") {

                console.log('Inside update summary',stateObject.state.dataModel);
                temp = {};
                temp.month = stateObject.state.dataModel.dueDate.split('-')[1].replace(/^0+/, '');
                temp.classID = stateObject.state.dataModel.classID;
                temp.classDescription = stateObject.state.dataModel.classDescription;
                temp.year = stateObject.state.dataModel.dueDate.split('-')[2]
                temp.subjectID = stateObject.state.dataModel.subjectID;
                temp.subjectName = stateObject.state.dataModel.subjectName;
                temp.assessedCount = 0;
                temp.notAssessedCount = 0;
//N0U-106 starts
                temp.assignmentID=stateObject.state.dataModel.assignmentID;
                temp.assignments = [];

                var authStatus = "";
                switch (stateObject.state.auditDataModel.AuthStat) {
                    case "Authorised":
                        authStatus = "A";
                        break;
                    case "Unauthorised":
                        authStatus = "U";
                        break;
                    case "Rejected":
                        authStatus = "R";
                        break;
                }

                var alreadyExist = -1;
                console.log('Inside update summary sumary model ',stateObject.state.summaryDataModel);
                for (let i = 0; i < stateObject.state.summaryDataModel.SummaryResult.length; i++) {
                    if (stateObject.state.summaryDataModel.SummaryResult[i].year == temp.year
                        && stateObject.state.summaryDataModel.SummaryResult[i].month == temp.month
                        && stateObject.state.summaryDataModel.SummaryResult[i].classID == temp.classID
                        && stateObject.state.summaryDataModel.SummaryResult[i].subjectID == temp.subjectID
                    ) {
                        alreadyExist = i;
                        break;
                    }
                }
                if (alreadyExist != -1) {
                  
                    console.log('Inside update summary parent matched');

                    stateObject.state.summaryDataModel.SummaryResult[alreadyExist].assessedCount++;
                    stateObject.state.summaryDataModel.SummaryResult[alreadyExist].notAssessedCount--;

                    var alreadyExist1 = -1;
                    //console.log('Inside update summary child array',stateObject.state.summaryDataModel.SummaryResult[alreadyExist].assignments[i])
                    console.log('Inside update summary child array',stateObject.state.childViewDetails)
                    
                    for (let i = 0; i < stateObject.state.childViewDetails.assignments.length; i++) {
                        //console.log('Inside update summary child array',childViewDetails.assignments[i])
                    
                        if (stateObject.state.childViewDetails.assignments[i].assignmentID == temp.assignmentID)
                           
                         {
                            alreadyExist1 = i;
                            break;
                        }
                    }
                    if (alreadyExist1 != -1) {

                        console.log('Inside update summary child matched');
                    stateObject.state.childViewDetails.assignments[alreadyExist1].assessmentStatus = 'Y';
                    obj.assessmentStatus = "Y";

                    stateObject.state.childViewDetails.assignments[alreadyExist1].authStat = authStatus;

                    stateObject.state.childViewDetails.assignments[alreadyExist1].makerID = stateObject.state.auditDataModel.MakerID;

                    stateObject.state.childViewDetails.assignments[alreadyExist1].versionNumber = stateObject.state.auditDataModel.Version;

                    


                //N0U-106 ends
                } 
            }
            else {
                stateObject.state.summaryDataModel.SummaryResult.unshift(temp);
            }
            }

            else if( stateObject.state.serviceName == 'ClassSoftSkill' ){
                var authStatus = "";
                switch (stateObject.state.auditDataModel.AuthStat) {
                    case "Authorised":
                        authStatus = "A";
                        break;
                    case "Unauthorised":
                        authStatus = "U";
                        break;
                    case "Rejected":
                        authStatus = "R";
                        break;
                }

                var skillsAssessed = [];
                for(let i=0; i<stateObject.state.dataModel.studentSkills.length; i++){
                    for(let j=0; j<stateObject.state.dataModel.studentSkills[i].skills.length; j++){
                        if( !skillsAssessed.includes(stateObject.state.dataModel.studentSkills[i].skills[j].skillName) ){
                            skillsAssessed.push(stateObject.state.dataModel.studentSkills[i].skills[j].skillName);
                        } 
                    }
                }

                temp = {};
                temp.authStat = authStatus;
                temp.class = stateObject.state.dataModel.class;
                temp.classDescription = stateObject.state.dataModel.classDescription;
                temp.exam = stateObject.state.dataModel.exam;
                temp.examDescription = stateObject.state.dataModel.examDesc;
                temp.makerID = stateObject.state.userID;
                temp.section = "";
                temp.standard = "";
                temp.versionNumber = stateObject.state.auditDataModel.Version;
                temp.skillsAssessed = skillsAssessed

                for(let i=0; i<stateObject.state.summaryDataModel.SummaryResult.length; i++){
                    if(
                        stateObject.state.summaryDataModel.SummaryResult[i].class == temp.class 
                        && stateObject.state.summaryDataModel.SummaryResult[i].exam == temp.exam
                    ){
                        stateObject.state.summaryDataModel.SummaryResult[i] = temp;
                    }
                }
               // $scope.$apply();
            }
			
            else if (stateObject.state.serviceName == "InstituteFeeManagement") {
                temp = {};
                temp.groupID = stateObject.state.dataModel.groupID;
                temp.groupDescription = stateObject.state.dataModel.groupDesc;
                temp.feeType = stateObject.state.dataModel.feeType;
                temp.amountCollected = '';
                temp.amountOverDue = '';
                temp.amountPending = '';
                temp.totalFeeAmount = '';
                temp.feeDetails = [];


                var alreadyExist = -1;
                for (let i = 0; i < stateObject.state.summaryDataModel.SummaryResult.length; i++) {
                    if (stateObject.state.summaryDataModel.SummaryResult[i].groupID == temp.groupID
                        && stateObject.state.summaryDataModel.SummaryResult[i].feeType == temp.feeType
                    ) {
                        alreadyExist = i;
                        break;
                    }
                }
                if (alreadyExist != -1) {
                    // stateObject.state.summaryDataModel.SummaryResult[alreadyExist].feeDetails.push(obj);
                    stateObject.state.summaryDataModel.SummaryResult[alreadyExist].feeDetails = [];
                } else {
                    stateObject.state.summaryDataModel.SummaryResult.unshift(temp);
                }
            }
            else if (stateObject.state.serviceName == "TeacherLeaveManagement" && stateObject.state.userType == "A") {
                /*temp = {};
                temp.month = stateObject.state.dataModel.from.split('-')[1].replace(/^0+/, '');
                // temp.teacherID = stateObject.state.dataModel.teacherID;
                // temp.teacherName = stateObject.state.dataModel.teacherName;
                temp.year = stateObject.state.dataModel.from.split('-')[2]
                temp.leaveDetails = [];
                temp.approvedCount = 1
                temp.pendingCount = 0
                temp.rejectedCount = 0


                var alreadyExist = -1;
                for (let i = 0; i < stateObject.state.summaryDataModel.SummaryResult.length; i++) {
                    if (stateObject.state.summaryDataModel.SummaryResult[i].year == temp.year
                        && stateObject.state.summaryDataModel.SummaryResult[i].month == temp.month
                        && stateObject.state.summaryDataModel.SummaryResult[i].teacherID == temp.teacherID
                    ) {
                        alreadyExist = i;
                        break;
                    }
                }
                if (alreadyExist != -1) {
                    // stateObject.state.summaryDataModel.SummaryResult[alreadyExist].leaveDetails.push(obj);
                    stateObject.state.summaryDataModel.SummaryResult[alreadyExist].leaveDetails = [];
                    stateObject.state.summaryDataModel.SummaryResult[alreadyExist].approvedCount = stateObject.state.summaryDataModel.SummaryResult[alreadyExist].approvedCount + 1;
                    stateObject.state.summaryDataModel.SummaryResult[alreadyExist].pendingCount = stateObject.state.summaryDataModel.SummaryResult[alreadyExist].pendingCount;
                    stateObject.state.summaryDataModel.SummaryResult[alreadyExist].rejectedCount = stateObject.state.summaryDataModel.SummaryResult[alreadyExist].rejectedCount;
                } else {
                    stateObject.state.summaryDataModel.SummaryResult.unshift(temp);
                }*/

                var fromYear = stateObject.state.dataModel.from.split('-')[2];
                var toYear = stateObject.state.dataModel.to.split('-')[2];

                var diffInYear = toYear - fromYear;

                for(var yearLoop = 0; yearLoop<=diffInYear; yearLoop++){
                    for(var monthLoop = (parseInt(stateObject.state.dataModel.from.split('-')[1])*(-1)); (parseInt(stateObject.state.dataModel.from.split('-')[1])+monthLoop)<=12; monthLoop++){
                        if( yearLoop == 0 && monthLoop == (parseInt(stateObject.state.dataModel.from.split('-')[1])*(-1)) ){
                            monthLoop = 0;
                        }
                        if( yearLoop == diffInYear && (parseInt(stateObject.statedataModel.from.split('-')[1]) + monthLoop) > stateObject.state.dataModel.to.split('-')[1] ){
                            break;
                        }
                        if( ( parseInt(stateObject.state.dataModel.from.split('-')[1]) + monthLoop ) == 0 ){
                            continue;
                        }

                        temp = {};
                        temp.month = parseInt(stateObject.state.dataModel.from.split('-')[1]) + monthLoop;
                        temp.year = parseInt(stateObject.state.dataModelfrom.split('-')[2]) + yearLoop;
                        temp.approvedCount = 0;
                        temp.pendingCount = 0;
                        temp.rejectedCount = 0;
                        temp.leaveDetails = [];

                        var authStatus = "";
                        switch (stateObject.state.auditDataModel.AuthStat) {
                            case "Authorised":
                                authStatus = "A";
                                break;
                            case "Unauthorised":
                                authStatus = "U";
                                break;
                            case "Rejected":
                                authStatus = "R";
                                break;
                        }

                        var leaveDateCount = 0;

                        if( (stateObject.state.dataModel.from ==stateObject.state.dataModel.to) && (stateObject.state.dataModel.fromNoon != "D" )){
                            leaveDateCount = 0.5;
                        }
                        else{
                            var date1 = new Date(stateObject.state.dataModel.from.split('-')[2], stateObject.state.dataModel.from.split('-')[1], stateObject.state.dataModel.from.split('-')[0] );
                            var date2 = new Date(stateObject.state.dataModel.to.split('-')[2], stateObject.state.dataModel.to.split('-')[1], stateObject.state.dataModel.to.split('-')[0] );

                            var Difference_In_Time = date2.getTime() - date1.getTime();
                            var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

                            leaveDateCount = Difference_In_Days + 1;
                        }

                        var obj = {
                            authStat: authStatus,
                            from: stateObject.state.dataModel.from,
                            fromNoon: stateObject.state.dataModel.fromNoon,
                            leaveDateCount: leaveDateCount,
                            leaveStatus: stateObject.state.dataModel.leaveStatus,
                            makerID: stateObject.state.userID,
                            referenceId: stateObject.state.dataModel.referenceId,
                            teacherID: stateObject.state.dataModel.teacherID,
                            teacherName: stateObject.state.dataModel.teacherName,
                            to: stateObject.state.dataModel.to,
                            toNoon: stateObject.state.dataModel.toNoon,
                            type: stateObject.state.dataModel.type,
                            versionNumber: "1"
                        }
                        temp.leaveDetails.push(obj);

                        var alreadyExist = -1;
                        for (let i = 0; i < stateObject.state.summaryDataModel.SummaryResult.length; i++) {
                            if (stateObject.state.summaryDataModel.SummaryResult[i].month == temp.month
                                && stateObject.state.summaryDataModel.SummaryResult[i].year == temp.year
                            ) {
                                alreadyExist = i;
                                break;
                            }
                        }
                        if (alreadyExist != -1) {
                            stateObject.state.summaryDataModel.SummaryResult[alreadyExist].leaveDetails.push(obj);
                            stateObject.state.summaryDataModel.SummaryResult[alreadyExist].approvedCount = 0;
                            stateObject.state.summaryDataModel.SummaryResult[alreadyExist].pendingCount = 0;
                            stateObject.state.summaryDataModel.SummaryResult[alreadyExist].rejectedCount = 0;
                        } else {
                            stateObject.state.summaryDataModel.SummaryResult.unshift(temp);
                        }
                       // $scope.$apply();
                    }
                }








            }
            else if (stateObject.state.serviceName == "StudentLeaveManagement" && (stateObject.state.userType == "A" || stateObject.state.userType == "T" || stateObject.state.userType == "O")) {
                /*temp = {};
                temp.month = stateObject.state.dataModel.from.split('-')[1].replace(/^0+/, '');
                // temp.studentID = stateObject.state.dataModel.studentID;
                // temp.studentName = stateObject.state.dataModel.studentName;
                temp.year = stateObject.state.dataModel.from.split('-')[2]
                temp.leaveDetails = [];

                temp.approvedCount =  1 
                 temp.pendingCount =  0
                temp.rejectedCount = 0


                var alreadyExist = -1;
                for (let i = 0; i < stateObject.state.summaryDataModel.SummaryResult.length; i++) {
                    if (stateObject.state.summaryDataModel.SummaryResult[i].year == temp.year
                        && stateObject.state.summaryDataModel.SummaryResult[i].month == temp.month
                        && stateObject.state.summaryDataModel.SummaryResult[i].studentID == temp.studentID
                    ) {
                        alreadyExist = i;
                        break;
                    }
                }
                if (alreadyExist != -1) {
                    // stateObject.state.summaryDataModel.SummaryResult[alreadyExist].leaveDetails.push(obj);
                    stateObject.state.summaryDataModel.SummaryResult[alreadyExist].leaveDetails = [];
                 
                        stateObject.state.summaryDataModel.SummaryResult[alreadyExist].approvedCount = stateObject.state.summaryDataModel.SummaryResult[alreadyExist].approvedCount;
                
                        stateObject.state.summaryDataModel.SummaryResult[alreadyExist].pendingCount = stateObject.state.summaryDataModel.SummaryResult[alreadyExist].pendingCount;
                 
                    stateObject.state.summaryDataModel.SummaryResult[alreadyExist].rejectedCount = stateObject.state.summaryDataModel.SummaryResult[alreadyExist].rejectedCount;
                } else {
                    stateObject.state.summaryDataModel.SummaryResult.unshift(temp);
                } */
                var fromYear = stateObject.state.dataModel.from.split('-')[2];
                var toYear = stateObject.state.dataModel.to.split('-')[2];

                var diffInYear = toYear - fromYear;

                for(var yearLoop = 0; yearLoop<=diffInYear; yearLoop++){
                    for(var monthLoop = (parseInt(stateObject.state.dataModel.from.split('-')[1])*(-1)); (parseInt(stateObject.state.dataModel.from.split('-')[1])+monthLoop)<=12; monthLoop++){
                        if( yearLoop == 0 && monthLoop == (parseInt(stateObject.state.dataModel.from.split('-')[1])*(-1)) ){
                            monthLoop = 0;
                        }
                        if( yearLoop == diffInYear && (parseInt(stateObject.state.dataModel.from.split('-')[1]) + monthLoop) > stateObject.state.dataModel.to.split('-')[1] ){
                            break;
                        }
                        if( ( parseInt(stateObject.state.dataModel.from.split('-')[1]) + monthLoop ) == 0 ){
                            continue;
                        }

                        temp = {};
                        temp.month = parseInt(stateObject.state.dataModel.from.split('-')[1]) + monthLoop;
                        temp.year = parseInt(stateObject.state.dataModel.from.split('-')[2]) + yearLoop;
                        temp.approvedCount = 0;
                        temp.pendingCount = 0;
                        temp.rejectedCount = 0;
                        temp.leaveDetails = [];

                        var authStatus = "";
                        switch (stateObject.state.auditDataModel.AuthStat) {
                            case "Authorised":
                                authStatus = "A";
                                break;
                            case "Unauthorised":
                                authStatus = "U";
                                break;
                            case "Rejected":
                                authStatus = "R";
                                break;
                        }

                        var leaveDateCount = 0;

                        if( stateObject.state.dataModel.from == stateObject.state.dataModel.to && stateObject.state.dataModel.fromNoon != "D" ){
                            leaveDateCount = 0.5;
                        }
                        else{
                            var date1 = new Date(stateObject.state.dataModel.from.split('-')[2], stateObject.state.dataModel.from.split('-')[1], stateObject.state.dataModel.from.split('-')[0] );
                            var date2 = new Date(stateObject.state.dataModel.to.split('-')[2], stateObject.state.dataModel.to.split('-')[1], stateObject.state.dataModel.to.split('-')[0] );

                            var Difference_In_Time = date2.getTime() - date1.getTime();
                            var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

                            leaveDateCount = Difference_In_Days + 1;
                        }

                        var obj = {
                            authStat: authStatus,
                            from: stateObject.state.dataModel.from,
                            fromNoon: stateObject.state.dataModel.fromNoon,
                            leaveDateCount: leaveDateCount,
                            leaveStatus: stateObject.state.dataModel.leaveStatus,
                            makerID: stateObject.state.userID,
                            referenceId: stateObject.state.dataModel.referenceId,
                            studentID: stateObject.state.dataModel.studentID,
                            studentName: stateObject.state.dataModel.studentName,
                            to: stateObject.state.dataModel.to,
                            toNoon: stateObject.state.dataModel.toNoon,
                            type: stateObject.state.dataModel.type,
                            versionNumber: "1"
                        }
                        temp.leaveDetails.push(obj);

                        var alreadyExist = -1;
                        for (let i = 0; i < stateObject.state.summaryDataModel.SummaryResult.length; i++) {
                            if (stateObject.state.summaryDataModel.SummaryResult[i].month == temp.month
                                && stateObject.state.summaryDataModel.SummaryResult[i].year == temp.year
                            ) {
                                alreadyExist = i;
                                break;
                            }
                        }
                        if (alreadyExist != -1) {
                            stateObject.state.summaryDataModel.SummaryResult[alreadyExist].leaveDetails.push(obj);
                            stateObject.state.summaryDataModel.SummaryResult[alreadyExist].approvedCount = 0;
                            stateObject.state.summaryDataModel.SummaryResult[alreadyExist].pendingCount = 0;
                            stateObject.state.summaryDataModel.SummaryResult[alreadyExist].rejectedCount = 0;
                        } else {
                            stateObject.state.summaryDataModel.SummaryResult.unshift(temp);
                        }
                        //$scope.$apply();
                    }
                }
            }

            else if( stateObject.state.serviceName == 'StudentLeaveManagement' && (stateObject.state.userType == "P" || stateObject.state.userType == "S") ){
                var authStatus = "";
                var dispAuthStat = "";
                var dispAuthStatClassName = "";
                var leaveStatus = "";
                switch(stateObject.state.auditDataModel.AuthStat){
                    case "Authorised":
                        authStatus = "A";
                        //dispAuthStat = "Approved";
                        //dispAuthStatClassName = "badge-light-success";
                        leaveStatus = "Approved";
                        break;
                    case "Unauthorised":
                        authStatus = "U";
                        //dispAuthStat = "Pending for approval";
                        //dispAuthStatClassName = "badge-light-warning";
                        leaveStatus = "Pending";
                        break;
                    case "Rejected":
                        authStatus = "R";
                        //dispAuthStat = "Rejected";
                        //dispAuthStatClassName = "badge-light-danger";
                        leaveStatus = "Rejected";
                        break;
                }
                var RecordStat = "";
                switch(stateObject.state.auditDataModel.RecordStat){
                    case "Open":
                        RecordStat = "O";
                        break;
                    case "Deleted":
                        RecordStat = "D";
                        break;
                }
                var typeDesc = "";
                switch(stateObject.state.dataModel.type){
                    case "S":
                        typeDesc = "Sick";
                        break;
                    case "P":
                        typeDesc = "Planned";
                        break;
                    case "C":
                        typeDesc = "Casual";
                        break;
                }

                var leaveDateCount = 0;

                if( stateObject.state.dataModel.from == stateObject.state.dataModel.to && stateObject.state.dataModel.fromNoon != "D" ){
                    leaveDateCount = 0.5;
                }
                else{
                    var date1 = new Date(stateObject.state.dataModel.from.split('-')[2], stateObject.state.dataModel.from.split('-')[1], stateObject.state.dataModel.from.split('-')[0] );
                    var date2 = new Date(stateObject.state.dataModel.to.split('-')[2], stateObject.state.dataModel.to.split('-')[1], stateObject.state.dataModel.to.split('-')[0] );

                    var Difference_In_Time = date2.getTime() - date1.getTime();
                    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

                    leaveDateCount = Difference_In_Days + 1;
                }

                var summaryResultObj = {
                    authStat: authStatus,
                    dispAuthStat: dispAuthStat,
                    dispAuthStatClassName: dispAuthStatClassName,
                    from: stateObject.state.dataModel.from,
                    fromNoon: stateObject.state.dataModel.fromNoon,
                    leaveDateCount: leaveDateCount,
                    leaveStatus: stateObject.state.dataModel.leaveStatus,
                    makerID: stateObject.state.auditDataModel.MakerID,
                    referenceId: stateObject.state.dataModel.referenceId,
                    studentID: stateObject.state.dataModel.studentID,
                    studentName: stateObject.state.dataModel.studentName,
                    to: stateObject.state.dataModel.to,
                    toNoon: stateObject.state.dataModel.toNoon,
                    type: typeDesc,
                    versionNumber: stateObject.state.auditDataModel.Version
                };
                stateObject.state.summaryDataModel.SummaryResult.unshift(summaryResultObj);
                //$scope.$apply();
            }

            else if (stateObject.state.serviceName == "ECircular") {
                temp = {};
                temp.month = stateObject.state.dataModel.circularDate.split('-')[1].replace(/^0+/, '');
                temp.groupID = stateObject.state.dataModel.groupID;
                temp.groupDesc = stateObject.state.dataModel.groupDesc;
                temp.year = stateObject.state.dataModel.circularDate.split('-')[2]
                temp.circularDetails = [];


                var alreadyExist = -1;
                for (let i = 0; i < stateObject.state.summaryDataModel.SummaryResult.length; i++) {
                    if (stateObject.state.summaryDataModel.SummaryResult[i].year == temp.year
                        && stateObject.state.summaryDataModel.SummaryResult[i].month == temp.month
                        // && stateObject.state.summaryDataModel.SummaryResult[i].studentID == temp.studentID
                    ) {
                        alreadyExist = i;
                        break;
                    }
                }
                if (alreadyExist != -1) {
                    stateObject.state.summaryDataModel.SummaryResult[stateObject.state.summaryResultIndex].circularCount=stateObject.state.summaryDataModel.SummaryResult[stateObject.state.summaryResultIndex].circularCount+1;

                    // stateObject.state.summaryDataModel.SummaryResult[alreadyExist].leaveDetails.push(obj);
                    stateObject.state.summaryDataModel.SummaryResult[alreadyExist].circularDetails = [];
                } else {
                    stateObject.state.summaryDataModel.SummaryResult.unshift(temp);
                }
            }
            else if (stateObject.state.serviceName == "InstituteOtherActivity") {
                temp = {};
                temp.activityType = stateObject.state.dataModel.activityType;
                temp.activityTypeDescription = stateObject.state.dataModel.activityName;
                temp.groupID = stateObject.state.dataModel.groupID;
                temp.groupDescription = stateObject.state.dataModel.groupDesc
                temp.activityDetails = [];


                var alreadyExist = -1;
                for (let i = 0; i < stateObject.state.summaryDataModel.SummaryResult.length; i++) {
                    if (stateObject.state.summaryDataModel.SummaryResult[i].activityType == temp.activityType
                        && stateObject.state.summaryDataModel.SummaryResult[i].groupID == temp.groupID
                        // && stateObject.state.summaryDataModel.SummaryResult[i].studentID == temp.studentID
                    ) {
                        alreadyExist = i;
                        break;
                    }
                }
                if (alreadyExist != -1) {
                    console.log('stateObject.state.summaryDataModel.SummaryResult[alreadyExist]',stateObject.state.summaryDataModel.SummaryResult[alreadyExist])
                    // stateObject.state.summaryDataModel.SummaryResult[alreadyExist].leaveDetails.push(obj);
                    stateObject.state.summaryDataModel.SummaryResult[alreadyExist].activityDetails = [];
                    stateObject.state.summaryDataModel.SummaryResult[alreadyExist].activityCount = stateObject.state.summaryDataModel.SummaryResult[alreadyExist].activityCount + 1;
                } else {
                    stateObject.state.summaryDataModel.SummaryResult.unshift(temp);
                }
            }
            else if (stateObject.state.serviceName == "InstitutePayment") {
                temp = {};
                temp.paymentDate = stateObject.state.dataModel.paymentDate;
                temp.amountCollected = stateObject.state.dataModel.paymentPaid;
                temp.paymentDetails = [];

                var alreadyExist = -1;
                for (let i = 0; i < stateObject.state.summaryDataModel.SummaryResult.length; i++) {
                    if (stateObject.state.summaryDataModel.SummaryResult[i].paymentDate == temp.paymentDate
                        // && stateObject.state.summaryDataModel.SummaryResult[i].studentID == temp.studentID
                    ) {
                        alreadyExist = i;
                        break;
                    }
                }
                if (alreadyExist != -1) {
                    // stateObject.state.summaryDataModel.SummaryResult[alreadyExist].leaveDetails.push(obj);


                    stateObject.state.summaryDataModel.SummaryResult[alreadyExist].amountCollected = String(Number(stateObject.state.summaryDataModel.SummaryResult[alreadyExist].amountCollected.replace(/\,/g, '')) + Number(stateObject.state.dataModel.paymentPaid.replace(/\,/g, '')));

                    stateObject.state.summaryDataModel.SummaryResult[alreadyExist].paymentDetails = [];
                } else {
                    stateObject.state.summaryDataModel.SummaryResult.unshift(temp);
                }
            }
            else if (stateObject.state.serviceName == "TeacherNotesService") {
                temp = {};
                temp.standard = stateObject.state.dataModel.standard;
                temp.subjectID = stateObject.state.dataModel.subjectID;
                temp.subjectName = stateObject.state.dataModel.subjectName;
                temp.notesDetails = [];

                temp.notesCount = 0;

                var alreadyExist = -1;
                for (let i = 0; i < stateObject.state.summaryDataModel.SummaryResult.length; i++) {
                    if (stateObject.state.summaryDataModel.SummaryResult[i].subjectID == temp.subjectID
                        && stateObject.state.summaryDataModel.SummaryResult[i].standard == temp.standard
                    ) {
                        alreadyExist = i;
                        break;
                    }
                }
                if (alreadyExist != -1) {
                    // stateObject.state.summaryDataModel.SummaryResult[alreadyExist].leaveDetails.push(obj);
                    if (globalData.userType == "A") {
                        stateObject.state.summaryDataModel.SummaryResult[alreadyExist].notesCount = stateObject.state.summaryDataModel.SummaryResult[alreadyExist].notesCount + 1;
                    }
                    else if (globalData.userType == "T" && globalData.staffID == stateObject.state.dataModel.teacherID) {
                        stateObject.state.summaryDataModel.SummaryResult[alreadyExist].notesCount = stateObject.state.summaryDataModel.SummaryResult[alreadyExist].notesCount + 1;

                    }
                    stateObject.state.summaryDataModel.SummaryResult[alreadyExist].notesDetails = [];
                } else {
                    if (globalData.userType == "A") {
                        stateObject.state.summaryDataModel.SummaryResult.unshift(temp);
                    }
                    else if (globalData.userType == "T" && globalData.staffID == stateObject.state.dataModel.teacherID) {
                        stateObject.state.summaryDataModel.SummaryResult.unshift(temp);
                    }

                }
            }
            else if (stateObject.state.serviceName == "Notification") {
                temp = {};
                temp.month = stateObject.state.dataModel.instant.split('-')[1].replace(/^0+/, '');
                temp.year = stateObject.state.dataModel.instant.split('-')[2]
                temp.notificationType = stateObject.state.dataModel.messageType;
                temp.notificationTypeDescription = stateObject.state.dataModel.messageTypeDescription;
                temp.notificationCount = 1;
                temp.notificationDetails = [];


                var alreadyExist = -1;
                for (let i = 0; i < stateObject.state.summaryDataModel.SummaryResult.length; i++) {
                    if (stateObject.state.summaryDataModel.SummaryResult[i].month == temp.month
                        && stateObject.state.summaryDataModel.SummaryResult[i].year == temp.year
                        && stateObject.state.summaryDataModel.SummaryResult[i].notificationType == temp.notificationType
                    ) {
                        alreadyExist = i;
                        break;
                    }
                }
                if (alreadyExist != -1) {
                    // stateObject.state.summaryDataModel.SummaryResult[alreadyExist].notificationDetails.push(obj);
                    stateObject.state.summaryDataModel.SummaryResult[alreadyExist].notificationCount = stateObject.state.summaryDataModel.SummaryResult[alreadyExist].notificationCount + 1;
                    stateObject.state.summaryDataModel.SummaryResult[alreadyExist].notificationDetails = [];
                } else {
                    stateObject.state.summaryDataModel.SummaryResult.unshift(temp);
                }
            }
            else if (stateObject.state.serviceName == "StudentNotesService") {
                temp = {};
                // temp.standard = stateObject.state.dataModel.standard;
                temp.subjectID = stateObject.state.dataModel.subjectID;
                temp.subjectName = stateObject.state.dataModel.subjectName;
                temp.notesDetails = [];

                temp.notesCount = 1;

                var alreadyExist = -1;
                for (let i = 0; i < stateObject.state.summaryDataModel.SummaryResult.length; i++) {
                    if (stateObject.state.userType=='P' || stateObject.state.userType=='S')
                    {
                        if (stateObject.state.summaryDataModel.SummaryResult[i].subjectID == temp.subjectID
                        // && stateObject.state[ScreenUtils.getContentType(stateObject)].SummaryResult[i].standard == temp.standard
                    ) {
                        alreadyExist = i;
                        break;
                    }  
                    }
                    else if  (stateObject.state[ScreenUtils.getContentType(stateObject)].SummaryResult[i].subjectID == temp.subjectID
                        // && stateObject.state[ScreenUtils.getContentType(stateObject)].SummaryResult[i].standard == temp.standard
                    ) {
                        alreadyExist = i;
                        break;
                    }
                }
                if (alreadyExist != -1) {
                    // stateObject.state[ScreenUtils.getContentType(stateObject)].SummaryResult[alreadyExist].leaveDetails.push(obj);
                    if (stateObject.state.userType=='P' || stateObject.state.userType=='S')
                    {
                        stateObject.state.summaryDataModel.SummaryResult[alreadyExist].notesCount = stateObject.state.summaryDataModel.SummaryResult[alreadyExist].notesCount + 1;


                        stateObject.state.summaryDataModel.SummaryResult[alreadyExist].notesDetails = [];
                    }else{
                    stateObject.state[ScreenUtils.getContentType(stateObject)].SummaryResult[alreadyExist].notesCount = stateObject.state[ScreenUtils.getContentType(stateObject)].SummaryResult[alreadyExist].notesCount + 1;


                    stateObject.state[ScreenUtils.getContentType(stateObject)].SummaryResult[alreadyExist].notesDetails = [];}
                } else {
                    if (stateObject.state.userType=='P' || stateObject.state.userType=='S')
                    {
                        stateObject.state.summaryDataModel.SummaryResult.unshift(temp);
                    }
                    else
                    {stateObject.state[ScreenUtils.getContentType(stateObject)].SummaryResult.unshift(temp);}



                }
            }
            else if (stateObject.state.serviceName == "OnlineClassroomService") {
                temp = {};
                temp.month = stateObject.state.dataModel.date.split('-')[1].replace(/^0+/, '');
                temp.year = stateObject.state.dataModel.date.split('-')[2]
                if (stateObject.state.summaryDataModel.filter.meetingScreenType =='O')
                {
                temp.subjectID = stateObject.state.dataModel.subject;
                temp.subjectName = stateObject.state.dataModel.subjectName;
                }
                else
                {
                    temp.subjectID = ''
                    temp.subjectName=''

                }

                temp.meetingCount = 1;
                temp.roomDetails = [];

                
                var alreadyExist = -1;
                for (let i = 0; i < stateObject.state.summaryDataModel.SummaryResult.length; i++) {

                    if (stateObject.state.summaryDataModel.filter.meetingScreenType =='O')
                    {
                    if (stateObject.state.summaryDataModel.SummaryResult[i].year == temp.year
                        && stateObject.state.summaryDataModel.SummaryResult[i].month == temp.month
                        && stateObject.state.summaryDataModel.SummaryResult[i].subjectID == temp.subjectID
                    ) {
                        alreadyExist = i;
                        break;
                    }
                    }
                    else{
                        if (stateObject.state.summaryDataModel.SummaryResult[i].year == temp.year
                            && stateObject.state.summaryDataModel.SummaryResult[i].month == temp.month
                            
                        ) {
                            alreadyExist = i;
                            break;
                        }


                    }

                }
                if (alreadyExist != -1) {
                    stateObject.state.summaryDataModel.SummaryResult[alreadyExist].meetingCount = stateObject.state.summaryDataModel.SummaryResult[alreadyExist].meetingCount + 1;
                    stateObject.state.summaryDataModel.SummaryResult[alreadyExist].roomDetails = [];
                } else {
                    stateObject.state.summaryDataModel.SummaryResult.unshift(temp);
                }
            }
            else if (stateObject.state.serviceName == "NewStudentAssignment") {
                temp = {};
                temp.month = stateObject.state.dataModel.dueDate.split('-')[1].replace(/^0+/, '');
                temp.year = stateObject.state.dataModel.dueDate.split('-')[2]
                temp.subjectID = stateObject.state.dataModel.subject;
                temp.subjectName = stateObject.state.dataModel.subjectName;
                temp.classID = stateObject.state.dataModel.classID;
                temp.classDescription = stateObject.state.dataModel.classDescription;
                temp.totalCount = 0;
                temp.answeredCount = 0;
                temp.notAnsweredCount = 0;
                temp.assignments = [];

                var authStatus = "";
                switch (stateObject.state.auditDataModel.AuthStat) {
                    case "Authorised":
                        authStatus = "A";
                        break;
                    case "Unauthorised":
                        authStatus = "U";
                        break;
                    case "Rejected":
                        authStatus = "R";
                        break;
                }
                var obj = {
                    authStat: authStatus,
                    makerID: stateObject.state.auditDataModel.MakerID,
                    versionNumber: stateObject.state.auditDataModel.Version,
                    answerStatus: 'A',
                    assignmentDescription: stateObject.state.dataModel.assignmentDescription,
                    assignmentID: stateObject.state.dataModel.assignmentID,
                    classDescription: stateObject.state.dataModel.classDescription,
                    classID:`${stateObject.state.dataModel.classID}`,
                    dueDate: stateObject.state.dataModel.dueDate,
                    studentID: stateObject.state.dataModel.studentID,
                    studentName: stateObject.state.dataModel.studentName,
                    type: stateObject.state.dataModel.type,
                    typeDescription: ''
                };
                temp.assignments.push(obj);
                for (let i = 0; i < stateObject.state.childViewDetails.assignments.length; i++) {
                    var assignmentID = stateObject.state.dataModel.assignmentID;
                    if (
                        assignmentID == stateObject.state.childViewDetails.assignments[i].assignmentID
                    ) {
                        stateObject.state[ScreenUtils.getContentType(stateObject)].SummaryResult[stateObject.state.summaryResultIndex].totalCount = stateObject.state[ScreenUtils.getContentType(stateObject)].SummaryResult[stateObject.state.summaryResultIndex].totalCount;

                        stateObject.state[ScreenUtils.getContentType(stateObject)].SummaryResult[stateObject.state.summaryResultIndex].answeredCount = stateObject.state[ScreenUtils.getContentType(stateObject)].SummaryResult[stateObject.state.summaryResultIndex].answeredCount + 1;

                        stateObject.state[ScreenUtils.getContentType(stateObject)].SummaryResult[stateObject.state.summaryResultIndex].notAnsweredCount = stateObject.state[ScreenUtils.getContentType(stateObject)].SummaryResult[stateObject.state.summaryResultIndex].notAnsweredCount - 1;

                        stateObject.state.childViewDetails.assignments[i] = obj;
                    }
                }

            }
            else {

                if (stateObject.state.summaryDataModel.SummaryResult.length > 0) {

                    for (let prop in stateObject.state.summaryDataModel.SummaryResult[0]) {

                        // strat 
                        if (ScreenUtils.checkForCorrectDataModal.includes(stateObject.state.serviceName)) {
                            ScreenUtils.setCorrectDataModal(stateObject.state.serviceName, stateObject)
                        }
                        // end

                        if (stateObject.state.dataModel.hasOwnProperty(prop)) {

                            temp[prop] = stateObject.state.dataModel[prop]

                        }

                        else if (prop == "versionNumber") {

                            temp[prop] = stateObject.state.auditDataModel.Version

                        }

                        else if (prop == "authStat") {

                            switch (stateObject.state.auditDataModel.AuthStat) {

                                case "Authorised":

                                    temp[prop] = "A";

                                    break;

                                case "Unauthorised":

                                    temp[prop] = "U";

                                    break;

                                case "Rejected":

                                    temp[prop] = "R";

                                    break;

                            }

                        }

                        else if (prop == "makerID") {

                            temp[prop] = stateObject.state.auditDataModel.MakerID

                        }

                    }

                    stateObject.state.summaryDataModel.SummaryResult.unshift(temp);

                }
                else {

                    //if the SummaryResult is empty, then "SummaryQuery" will be called, no need to push in the SummaryResult   

                }
            }

            //additional info at the first level change starts
            if (stateObject.state.serviceName == "HolidayMaintenance") {
                var noOfDays = 0;
                var holidayCount = 0;
                var workingDayCount = 0;

                for (let i = 0; i < stateObject.state.summaryDataModel.SummaryResult.length; i++) {
                    if (
                        stateObject.state.summaryDataModel.SummaryResult[i].month == stateObject.state.dataModel.month &&
                        stateObject.state.summaryDataModel.SummaryResult[i].year == stateObject.state.dataModel.year &&
                        stateObject.state.summaryDataModel.SummaryResult[i].classCode == stateObject.state.dataModel.classCode
                    ) {
                        noOfDays = new Date(stateObject.state.dataModel.year, stateObject.state.dataModel.month, 0).getDate();
                        for (let j = 0; j < noOfDays; j++) {
                            if (stateObject.state.dataModel.holiday.charAt(j) == "W") {
                                workingDayCount++
                            }
                            else if (stateObject.state.dataModel.holiday.charAt(j) == "H") {
                                holidayCount++
                            }
                            else {
                                workingDayCount = workingDayCount + 0.5;
                                holidayCount = holidayCount + 0.5;
                            }
                        }

                        stateObject.state.summaryDataModel.SummaryResult[i].holidayCount = holidayCount.toFixed(1);
                        stateObject.state.summaryDataModel.SummaryResult[i].workingDayCount = workingDayCount.toFixed(1);
                        break;
                    }
                }
            }
            else if (stateObject.state.serviceName == "GroupMapping") {
                var classCount = 0;
                var studentCount = 0;

                for (let i = 0; i < stateObject.state.summaryDataModel.SummaryResult.length; i++) {
                    if (
                        stateObject.state.summaryDataModel.SummaryResult[i].groupID == stateObject.state.dataModel.groupID
                    ) {
                        for (let j = 0; j < stateObject.state.dataModel.group.length; j++) {
                            if (stateObject.state.dataModel.group[j].class != "") {
                                classCount++;
                            }
                            if (stateObject.state.dataModel.group[j].studentID != "") {
                                studentCount++;
                            }
                        }
                        stateObject.state.summaryDataModel.SummaryResult[i].classCount = classCount;
                        stateObject.state.summaryDataModel.SummaryResult[i].studentCount = studentCount;
                        break;
                    }
                }
            }
            else if (stateObject.state.serviceName == "ClassLevelConfiguration") {
                var startTime = 0;
                var endTime = 0;
                var studentCount = 0;
                var periodCount = stateObject.state.dataModel.periodTimings.length;

                var minStartHour = 0;
                var minStartMin = 0;
                var maxEndHour = 0;
                var maxEndMin = 0;

                for (let i = 0; i < stateObject.state.summaryDataModel.SummaryResult.length; i++) {
                    if (
                        stateObject.state.summaryDataModel.SummaryResult[i].Class == stateObject.state.dataModel.Class &&
                        stateObject.state.summaryDataModel.SummaryResult[i].Standard == stateObject.state.dataModel.Standard &&
                        stateObject.state.summaryDataModel.SummaryResult[i].Section == stateObject.state.dataModel.Section
                    ) {
                        for (let j = 0; j < stateObject.state.dataModel.periodTimings.length; j++) {
                            if (j == 0) {
                                minStartHour = stateObject.state.dataModel.periodTimings[j].startTime.hour;
                                minStartMin = stateObject.state.dataModel.periodTimings[j].startTime.min;
                                maxEndHour = stateObject.state.dataModel.periodTimings[j].endTime.hour;
                                maxEndMin = stateObject.state.dataModel.periodTimings[j].endTime.min;
                            }
                            else {
                                if (minStartHour > stateObject.state.dataModel.periodTimings[j].startTime.hour) {
                                    minStartHour = stateObject.state.dataModel.periodTimings[j].startTime.hour;
                                    minStartMin = stateObject.state.dataModel.periodTimings[j].startTime.min;
                                }
                                else if (minStartHour == stateObject.state.dataModel.periodTimings[j].startTime.hour && minStartMin > stateObject.state.dataModel.periodTimings[j].startTime.min) {
                                    minStartHour = stateObject.state.dataModel.periodTimings[j].startTime.hour;
                                    minStartMin = stateObject.state.dataModel.periodTimings[j].startTime.min;
                                }
                                if (maxEndHour < stateObject.state.dataModel.periodTimings[j].endTime.hour) {
                                    maxEndHour = stateObject.state.dataModel.periodTimings[j].endTime.hour;
                                    maxEndMin = stateObject.state.dataModel.periodTimings[j].endTime.min;
                                }
                                else if (maxEndHour == stateObject.state.dataModel.periodTimings[j].endTime.hour && maxEndMin > stateObject.state.dataModel.periodTimings[j].endTime.min) {
                                    maxEndHour = stateObject.state.dataModel.periodTimings[j].endTime.hour;
                                    maxEndMin = stateObject.state.dataModel.periodTimings[j].endTime.min;
                                }
                            }
                        }
                        startTime = minStartHour + " : " + minStartMin;
                        endTime = maxEndHour + " : " + maxEndMin;
                        stateObject.state.summaryDataModel.SummaryResult[i].startTime = startTime;
                        stateObject.state.summaryDataModel.SummaryResult[i].endTime = endTime;
                        stateObject.state.summaryDataModel.SummaryResult[i].studentCount = studentCount;
                        stateObject.state.summaryDataModel.SummaryResult[i].periodCount = periodCount;
                        break;
                    }
                }
            }
            else if (stateObject.state.serviceName == "ClassStudentRegister") {
                var studentCount = stateObject.state.dataModel.students.length;

                for (let i = 0; i < stateObject.state.summaryDataModel.SummaryResult.length; i++) {
                    if (
                        stateObject.state.summaryDataModel.SummaryResult[i].class == stateObject.state.dataModel.class &&
                        stateObject.state.summaryDataModel.SummaryResult[i].registerID == stateObject.state.dataModel.registerID
                    ) {
                        stateObject.state.summaryDataModel.SummaryResult[i].studentCount = studentCount;
                        break;
                    }
                }
            }
            else if( stateObject.state.serviceName == "ClassMark" ){

               var topMark = 0;
                
                 var averageMark = 0;
                
                 var lowMark = 0;
                
                 var totalMarks = 0;
            
                
                 for(let i=0; i<stateObject.state.summaryDataModel.SummaryResult.length; i++){
                  if(
                  stateObject.state.summaryDataModel.SummaryResult[i].class == stateObject.state.dataModel.class &&
                
                  stateObject.state.summaryDataModel.SummaryResult[i].exam == stateObject.state.dataModel.exam &&
                  stateObject.state.summaryDataModel.SummaryResult[i].subjectID == stateObject.state.dataModel.subjectID
                
                  ){
                
                  for(let j=0; j<stateObject.state.dataModel.marks.length; j++){
                
                   if(j == 0){
                
                  topMark = stateObject.state.dataModel.marks[j].mark;
                
                  lowMark = stateObject.state.dataModel.marks[j].mark;
                
                   }
                
                
                
                   var currentMark = stateObject.state.dataModel.marks[j].mark;
                
                
                
                   if( currentMark < lowMark){
                
                  lowMark = currentMark;
                
                   }
                
                   if( currentMark > topMark ){
                
                  topMark = currentMark;
                
                   }
                
                   totalMarks = parseInt(totalMarks) + parseInt(currentMark);
                
                  }
                
                  if( stateObject.state.dataModel.marks.length > 0 ){
                
                   averageMark = totalMarks/stateObject.state.dataModel.marks.length
                
                  }
                
                
                
                  stateObject.state.summaryDataModel.SummaryResult[i].topMark = topMark;
                
                  stateObject.state.summaryDataModel.SummaryResult[i].averageMark = averageMark.toFixed(1);
                
                  stateObject.state.summaryDataModel.SummaryResult[i].lowMark = lowMark;
                
                  
                
                  stateObject.state.summaryDataModel.SummaryResult[i].classDesc = stateObject.state.dataModel.classDescription;
                
                  break;
                
                  }
                
                 }
                
                  }
                  if( stateObject.state.serviceName == "ClassExamSchedule" ){
                    var startDate = "";
                    var endDate = "";
                    
                    for(let i=0; i<stateObject.state.summaryDataModel.SummaryResult.length; i++){
                        if(
                            stateObject.state.summaryDataModel.SummaryResult[i].class == stateObject.state.dataModel.class &&
                            stateObject.state.summaryDataModel.SummaryResult[i].exam == stateObject.state.dataModel.exam
                        ){
                            for(let j=0; j<stateObject.state.dataModel.Subjectschedules.length; j++){
                                if(j == 0){
                                    startDate = stateObject.state.dataModel.Subjectschedules[j].date;
                                    endDate = stateObject.state.dataModel.Subjectschedules[j].date;
                                }
    
                                var sd = Date.parse(startDate);
                                var ed = Date.parse(endDate);
                                var d = Date.parse(stateObject.state.dataModel.Subjectschedules[j].date);
    
                                if( d < sd){
                                    startDate = stateObject.state.dataModel.Subjectschedules[j].date
                                }
                                if( d > ed ){
                                    endDate = stateObject.state.dataModel.Subjectschedules[j].date
                                }
                            }
    
                            stateObject.state.summaryDataModel.SummaryResult[i].startDate = startDate;
                            stateObject.state.summaryDataModel.SummaryResult[i].endDate = endDate;
                            stateObject.state.summaryDataModel.SummaryResult[i].classDesc = stateObject.state.dataModel.classDescription;
                            break;
                        }
                    }
                }     
            //additional info at the first level change ends



            break;
        case 'Authorisation':

        case 'Modification':

            if( stateObject.state.serviceName == 'StudentLeaveManagement' && (stateObject.state.userType == "P" || stateObject.state.userType == "S") ){
                var authStatus = "";
                var dispAuthStat = "";
                var dispAuthStatClassName = "";
                switch(stateObject.state.auditDataModel.AuthStat){
                    case "Authorised":
                        authStatus = "A";
                        dispAuthStat = "Approved";
                        dispAuthStatClassName = "badge-light-success";
                        break;
                    case "Unauthorised":
                        authStatus = "U";
                        dispAuthStat = "Pending for approval";
                        dispAuthStatClassName = "badge-light-warning";
                        break;
                    case "Rejected":
                        authStatus = "R";
                        dispAuthStat = "Rejected";
                        dispAuthStatClassName = "badge-light-danger";
                        break;
                }
                var RecordStat = "";
                switch(stateObject.state.auditDataModel.RecordStat){
                    case "Open":
                        RecordStat = "O";
                        break;
                    case "Deleted":
                        RecordStat = "D";
                        break;
                }

                var typeDesc = "";
                switch(stateObject.state.dataModel.type){
                    case "S":
                        typeDesc = "Sick";
                        break;
                    case "P":
                        typeDesc = "Planned";
                        break;
                    case "C":
                        typeDesc = "Casual";
                        break;
                }

                var leaveDateCount = 0;

                if( stateObject.state.dataModel.from == stateObject.state.dataModel.to && stateObject.state.dataModel.fromNoon != "D" ){
                    leaveDateCount = 0.5;
                }
                else{
                    var date1 = new Date(stateObject.state.dataModel.from.split('-')[2], stateObject.state.dataModel.from.split('-')[1], stateObject.state.dataModel.from.split('-')[0] );
                    var date2 = new Date(stateObject.state.dataModel.to.split('-')[2], stateObject.state.dataModel.to.split('-')[1], stateObject.state.dataModel.to.split('-')[0] );

                    var Difference_In_Time = date2.getTime() - date1.getTime();
                    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

                    leaveDateCount = Difference_In_Days + 1;
                }

                var summaryResultObj = {
                    authStat: authStatus,
                    dispAuthStat: dispAuthStat,
                    dispAuthStatClassName: dispAuthStatClassName,
                    from: stateObject.state.dataModel.from,
                    fromNoon: stateObject.state.dataModel.fromNoon,
                    leaveDateCount: leaveDateCount,
                    leaveStatus: stateObject.state.dataModel.leaveStatus,
                    makerID: stateObject.state.auditDataModel.MakerID,
                    referenceId: stateObject.state.dataModel.referenceId,
                    studentID: stateObject.state.dataModel.studentID,
                    studentName: stateObject.state.dataModel.studentName,
                    to: stateObject.state.dataModel.to,
                    toNoon: stateObject.state.dataModel.toNoon,
                    type: typeDesc,
                    versionNumber: stateObject.state.auditDataModel.Version
                };

                var count;
                for( var i=0; i<stateObject.state.summaryDataModel.SummaryResult.length; i++ ){
                    count = 0;
                    for( var j=0; j<stateObject.state.primaryKeyCols.length; j++ ){
                        if( stateObject.state.dataModel[stateObject.state.primaryKeyCols[j]] == stateObject.state.summaryDataModel.SummaryResult[i][stateObject.state.primaryKeyCols[j]] ){
                            count++;
                        }
                    }
                    if(stateObject.state.primaryKeyCols.length == count){
                        stateObject.state.summaryDataModel.SummaryResult[i] = summaryResultObj;
                        break;
                    }
                }
            }

            //Replace the item in the SummaryResult array - to reflect this recent change
            else if(stateObject.state.serviceName == "StudentProfile"){
                var authStatus = "";
                var dispAuthStat = "";
                var dispAuthStatClassName = "";
                switch(stateObject.state.auditDataModel.AuthStat){
                    case "Authorised":
                        authStatus = "A";
                        dispAuthStat = "Approved";
                        dispAuthStatClassName = "badge-light-success";
                        break;
                    case "Unauthorised":
                        authStatus = "U";
                        dispAuthStat = "Pending for approval";
                        dispAuthStatClassName = "badge-light-warning";
                        break;
                    case "Rejected":
                        authStatus = "R";
                        dispAuthStat = "Rejected";
                        dispAuthStatClassName = "badge-light-danger";
                        break;
                }
                var RecordStat = "";
                switch(stateObject.state.auditDataModel.RecordStat){
                    case "Open":
                        RecordStat = "O";
                        break;
                    case "Deleted":
                        RecordStat = "D";
                        break;
                }
                var summaryResultObj = {
                    addressLine1: stateObject.state.dataModel.general.address.addressLine1,
                    addressLine2: stateObject.state.dataModel.general.address.addressLine2,
                    addressLine3: stateObject.state.dataModel.general.address.addressLine3,
                    addressLine4: stateObject.state.dataModel.general.address.addressLine4,
                    addressLine5: stateObject.state.dataModel.general.address.addressLine5,
                    authStat: authStatus,
                    bloodGroup: stateObject.state.dataModel.general.bloodGroup,
                    checkerDateStamp: "",
                    checkerID: "",
                    checkerRemarks: "",
                    class: "",
                    classDesc: "",
                    dispAuthStat: dispAuthStat,
                    dispAuthStatClassName: dispAuthStatClassName,
                    dob: stateObject.state.dataModel.general.dob,
                    existingMedicalDetail: stateObject.state.dataModel.emergency.existingMedicalDetails,
                    makerDateStamp: "",
                    makerID: stateObject.state.auditDataModel.MakerID,
                    makerRemarks: "",
                    notes: "",
                    profileImgPath: stateObject.state.dataModel.profileImgPath,
                    recordStatus: RecordStat,
                    studentID: stateObject.state.dataModel.studentID,
                    studentName: stateObject.state.dataModel.studentName,
                    versionNumber: stateObject.state.auditDataModel.Version
                };

                var count;
                for( var i=0; i<stateObject.state.summaryDataModel.SummaryResult.length; i++ ){
                    count = 0;
                    for( var j=0; j<stateObject.state.primaryKeyCols.length; j++ ){
                        if( stateObject.state.dataModel[stateObject.state.primaryKeyCols[j]] == stateObject.state.summaryDataModel.SummaryResult[i][stateObject.state.primaryKeyCols[j]] ){
                            count++;
                        }
                    }
                    if(stateObject.state.primaryKeyCols.length == count){
                        stateObject.state.summaryDataModel.SummaryResult[i] = summaryResultObj;
                        break;
                    }
                }
            }
            else if(stateObject.state.serviceName == "TeacherProfile"){
                var authStatus = "";
                var dispAuthStat = "";
                var dispAuthStatClassName = "";
                switch(stateObject.state.auditDataModel.AuthStat){
                    case "Authorised":
                        authStatus = "A";
                        dispAuthStat = "Approved";
                        dispAuthStatClassName = "badge-light-success";
                        break;
                    case "Unauthorised":
                        authStatus = "U";
                        dispAuthStat = "Pending for approval";
                        dispAuthStatClassName = "badge-light-warning";
                        break;
                    case "Rejected":
                        authStatus = "R";
                        dispAuthStat = "Rejected";
                        dispAuthStatClassName = "badge-light-danger";
                        break;
                }
                var RecordStat = "";
                switch(stateObject.state.auditDataModel.RecordStat){
                    case "Open":
                        RecordStat = "O";
                        break;
                    case "Deleted":
                        RecordStat = "D";
                        break;
                }
                var summaryResultObj = {
                    addressLine1: stateObject.state.dataModel.general.addressLine1,
                    addressLine2: stateObject.state.dataModel.general.addressLine2,
                    addressLine3: stateObject.state.dataModel.general.addressLine3,
                    addressLine4: stateObject.state.dataModel.general.addressLine4,
                    addressLine5: stateObject.state.dataModel.general.addressLine5,
                    authStat: authStatus,
                    bloodGroup: stateObject.state.dataModel.general.bloodGroup,
                    classCode: "",
                    classDescription: "",
                    contactNo: stateObject.state.dataModel.general.contactNo,
                    dispAuthStat: dispAuthStat,
                    dispAuthStatClassName: dispAuthStatClassName,
                    dob: stateObject.state.dataModel.general.dob,
                    emailID: stateObject.state.dataModel.general.emailID,
                    existingMedicalDetail: stateObject.state.dataModel.emergency.existingMedicalDetails,
                    makerID: stateObject.state.auditDataModel.MakerID,
                    profileImgPath: stateObject.state.dataModel.profileImgPath,
                    qualification: stateObject.state.dataModel.general.qualification,
                    recordStatus: RecordStat,
                    shortName: "",
                    teacherID: stateObject.state.dataModel.teacherID,
                    teacherName: stateObject.state.dataModel.teacherName,
                    versionNumber: stateObject.state.auditDataModel.Version
                };
                var count;
                for( var i=0; i<stateObject.state.summaryDataModel.SummaryResult.length; i++ ){
                    count = 0;
                    for( var j=0; j<stateObject.state.primaryKeyCols.length; j++ ){
                        if( stateObject.state.dataModel[stateObject.state.primaryKeyCols[j]] == stateObject.state.summaryDataModel.SummaryResult[i][stateObject.state.primaryKeyCols[j]] ){
                            count++;
                        }
                    }
                    if(stateObject.state.primaryKeyCols.length == count){
                        stateObject.state.summaryDataModel.SummaryResult[i] = summaryResultObj;
                        break;
                    }
                }
            }




//N0U-103 parent signature update summary starts
if( stateObject.state.serviceName == "StudentProgressCard" ){
    for(let i=0; i<stateObject.state.summaryResultByFilter.SummaryResult.length; i++){
        if(
            stateObject.state.summaryResultByFilter.SummaryResult[i].class == stateObject.state.dataModel.class &&
            stateObject.state.summaryResultByFilter.SummaryResult[i].exam == stateObject.state.dataModel.exam
        ){
            stateObject.state.summaryResultByFilter.SummaryResult[i].signStatus = "Signed";
        }
    }
}
else if( stateObject.state.serviceName == "StudentSoftSkill" ){
    for(let i=0; i<stateObject.state.summaryResultByFilter.SummaryResult.length; i++){
        if(
            stateObject.state.summaryResultByFilter.SummaryResult[i].class == stateObject.state.dataModel.class &&
            stateObject.state.summaryResultByFilter.SummaryResult[i].exam == stateObject.state.dataModel.exam
        ){
            stateObject.state.summaryResultByFilter.SummaryResult[i].signStatus = "Signed";
        }
    }
}
else if( stateObject.state.serviceName == "StudentECircular" ){
    for(let i=0; i<stateObject.state.summaryResultByFilter.SummaryResult.length; i++){
        if(
            stateObject.state.summaryResultByFilter.SummaryResult[i].circularID == stateObject.state.dataModel.circularID
        ){
            stateObject.state.summaryResultByFilter.SummaryResult[i].signStatus = "Signed";
        }
    }
}
else if( stateObject.state.serviceName == "StudentOtherActivity" ){
    for(let i=0; i<stateObject.state.summaryResultByFilter.SummaryResult.length; i++){
        if(
            stateObject.state.summaryResultByFilter.SummaryResult[i].activityID == stateObject.state.dataModel.activityID
        ){
            stateObject.state.summaryResultByFilter.SummaryResult[i].enroll_status = "Y";
            stateObject.state.summaryResultByFilter.SummaryResult[i].enroll = "true";
            stateObject.state.summaryResultByFilter.SummaryResult[i].enrollDesc = "Enrolled";
            stateObject.state.summaryResultByFilter.SummaryResult[i].enrollParticipationClass = "badge-warning";
        }
    }
}
//N0U-103 parent signature update summary ends


            else if (stateObject.state.serviceName == "TeacherLessonPlannerService") {
                temp = {};
                temp.month = stateObject.state.dataModel.date.split('-')[1].replace(/^0+/, '');
                temp.teacherID = stateObject.state.dataModel.teacherID;
                temp.teacherName = stateObject.state.dataModel.teacherName;
                temp.year = stateObject.state.dataModel.date.split('-')[2]
                temp.childResults = [];

                var obj = {
                    authStat: "A",
                    date: stateObject.state.dataModel.date,
                    makerID: stateObject.state.userID,
                    planID: stateObject.state.dataModel.planID,
                    teacherID: stateObject.state.dataModel.teacherID,
                    teacherName: stateObject.state.dataModel.teacherName,
                    versionNumber: "1"
                }
                obj.lessonResults = [];

                for (let i = 0; i < stateObject.state.dataModel.classAndSubjectDetails.length; i++) {
                    for (let j = 0; j < stateObject.state.dataModel.classAndSubjectDetails[i].planDetails.length; j++) {
                        var item = {};
                        var status = "";
                        if (stateObject.state.dataModel.classAndSubjectDetails[i].planDetails[j].status == "C") {
                            status = "Completed";
                        } else {
                            status = "Not completed";
                        }
                        item.classDescription = stateObject.state.dataModel.classAndSubjectDetails[i].classDescription;
                        item.classID = stateObject.state.dataModel.classAndSubjectDetails[i].classID;
                        item.heading = stateObject.state.dataModel.classAndSubjectDetails[i].planDetails[j].heading;
                        item.lesson = stateObject.state.dataModel.classAndSubjectDetails[i].planDetails[j].lesson;
                        item.periodNumber = stateObject.state.dataModel.classAndSubjectDetails[i].periodNo;
                        item.status = status;
                        item.subHeading = stateObject.state.dataModel.classAndSubjectDetails[i].planDetails[j].subHeading;
                        item.subjectID = stateObject.state.dataModel.classAndSubjectDetails[i].subjectID;
                        item.subjectName = stateObject.state.dataModel.classAndSubjectDetails[i].subjectID;

                        obj.lessonResults.push(item);
                    }
                }

                var oldDate = stateObject.state.dataModel.date.split('-')
                var newDate = `${oldDate[2]}-${oldDate[1]}-${oldDate[0]}`


                var compPercentage = 0;
                var compCount = 0;
                var notCompCount = 0;
                var totalLessonPlans = 0;



                for (let j = 0; j < obj.lessonResults.length; j++) {
                    if (obj.lessonResults[j].status == "Completed") {
                        compCount++;
                    } else {
                        notCompCount++;
                    }
                    totalLessonPlans++;
                }
                if (obj.lessonResults.length != 0) {
                    compPercentage = (compCount / obj.lessonResults.length) * 100;
                }
                else {
                    compPercentage = 0;
                }





                var planCalendarobj = {
                    compPercentage: compPercentage,
                    totalLessonPlans: totalLessonPlans,
                    planStatus: true,
                    details: obj,
                    date: newDate,
                    compCount: compCount,
                    notCompCount: notCompCount,
                }

                temp.childResults.push(obj);

                // for (let i = 0; i < stateObject.state.summaryDataModel.SummaryResult[stateObject.state.summaryResultIndex].childResults.length; i++) {
                for (let i = 0; i < stateObject.state.childViewDetails.childResults.length; i++) {
                    var date = stateObject.state.dataModel.date;
                    if (
                        date == stateObject.state.childViewDetails.childResults[i].date
                        && stateObject.state.dataModel.planID == stateObject.state.childViewDetails.childResults[i].planID
                        && stateObject.state.dataModel.teacherID == stateObject.state.childViewDetails.childResults[i].teacherID
                    ) {
                        stateObject.state.childViewDetails.childResults[i] = obj;

                        if (stateObject.state.calendarIsOpen) {
                            stateObject.state.calendarLoaditems[newDate] = [planCalendarobj];
                            stateObject.state.calendarRefresh = false
                            stateObject.state.calendarEmptyRefresh = true
                        }
                    }
                }
            }
            //N0U-104 starts
            else if( stateObject.state.serviceName == "ClassSoftSkill" ){
                var authStatus = "";
                switch (stateObject.state.auditDataModel.AuthStat) {
                    case "Authorised":
                        authStatus = "A";
                        break;
                    case "Unauthorised":
                        authStatus = "U";
                        break;
                    case "Rejected":
                        authStatus = "R";
                        break;
                }

                var skillsAssessed = [];
                for(let i=0; i<stateObject.state.dataModel.studentSkills.length; i++){
                    for(let j=0; j<stateObject.state.dataModel.studentSkills[i].skills.length; j++){
                        if( !skillsAssessed.includes(stateObject.state.dataModel.studentSkills[i].skills[j].skillName) ){
                            skillsAssessed.push(stateObject.state.dataModel.studentSkills[i].skills[j].skillName);
                        } 
                    }
                }

                temp = {};
                temp.authStat = authStatus;
                temp.class = stateObject.state.dataModel.class;
                temp.classDescription = stateObject.state.dataModel.classDescription;
                temp.exam = stateObject.state.dataModel.exam;
                temp.examDescription = stateObject.state.dataModel.examDesc;
                temp.makerID =stateObject.state.userID;
                temp.section = "";
                temp.standard = "";
                temp.versionNumber = stateObject.state.auditDataModel.Version;
                temp.skillsAssessed = skillsAssessed

                for(let i=0; i<stateObject.state.summaryDataModel.SummaryResult.length; i++){
                    if(
                        stateObject.state.summaryDataModel.SummaryResult[i].class == temp.class 
                        && stateObject.state.summaryDataModel.SummaryResult[i].exam == temp.exam
                    ){
                        stateObject.state.summaryDataModel.SummaryResult[i] = temp;
                    }
                }
                //$scope.$apply();
            }
            else if(stateObject.state.serviceName == "TeacherLessonPlannerService" ){
                temp = {};
                temp.month =stateObject.state.dataModel.date.split('-')[1];
                temp.teacherID =stateObject.state.dataModel.teacherID;
                temp.teacherName =stateObject.state.dataModel.teacherName;
                temp.year =stateObject.state.dataModel.date.split('-')[2]
                temp.childResults = [];
                
                var obj = {
                    authStat: "A",
                    date:stateObject.state.dataModel.date,
                    makerID: stateObject.state.userID,
                    planID:stateObject.state.dataModel.planID,
                    teacherID:stateObject.state.dataModel.teacherID,
                    teacherName:stateObject.state.dataModel.teacherName,
                    versionNumber: "1"
                }
                obj.lessonResults= [];

                for(let i=0; i<stateObject.state.dataModel.classAndSubjectDetails.length; i++ ){
                    for(let j=0; j<stateObject.state.dataModel.classAndSubjectDetails[i].planDetails.length; j++){
                        var item = {};
                        var status = "";
                        if(stateObject.state.dataModel.classAndSubjectDetails[i].planDetails[j].status == "C" ){
                            status = "Completed";
                        }else{
                            status = "Not completed";
                        }
                        item.classDescription =stateObject.state.dataModel.classAndSubjectDetails[i].classDescription;
                        item.classID =stateObject.state.dataModel.classAndSubjectDetails[i].classID;
                        item.heading =stateObject.state.dataModel.classAndSubjectDetails[i].planDetails[j].heading;
                        item.lesson =stateObject.state.dataModel.classAndSubjectDetails[i].planDetails[j].lesson;
                        item.periodNumber =stateObject.state.dataModel.classAndSubjectDetails[i].periodNo;
                        item.status = status;
                        item.subHeading =stateObject.state.dataModel.classAndSubjectDetails[i].planDetails[j].subHeading;
                        item.subjectID =stateObject.state.dataModel.classAndSubjectDetails[i].subjectID;
                        item.subjectName =stateObject.state.dataModel.classAndSubjectDetails[i].subjectID;

                        obj.lessonResults.push(item);
                    }
                }
                temp.childResults.push(obj);

                for(let i=0; i<stateObject.state.summaryDataModel.SummaryResult[stateObject.state.selectedResultIndex].childResults.length; i++){
                    var date =stateObject.state.dataModel.date; //stateObject.state.dataModel.date.split("-")[2]+'-'+stateObject.state.dataModel.date.split("-")[1]+'-'+stateObject.state.dataModel.date.split("-")[0];
                    if(
                        date ==stateObject.state.summaryDataModel.SummaryResult[stateObject.state.selectedResultIndex].childResults[i].date
                        &&stateObject.state.dataModel.planID ==stateObject.state.summaryDataModel.SummaryResult[stateObject.state.selectedResultIndex].childResults[i].planID
                        &&stateObject.state.dataModel.teacherID ==stateObject.state.summaryDataModel.SummaryResult[stateObject.state.selectedResultIndex].childResults[i].teacherID
                    ){
                       stateObject.state.summaryDataModel.SummaryResult[stateObject.state.selectedResultIndex].childResults[i] = obj;
                    }
                }
            }
        
            //N0U-104 ends    
            else if (stateObject.state.serviceName == "StudentLessonPlannerService") {
                temp = {};
                temp.month = stateObject.state.dataModel.date.split('-')[1].replace(/^0+/, '');
                temp.year = stateObject.state.dataModel.date.split('-')[2]
                temp.childResults = [];

                var obj = {
                    authStat: "A",
                    date: stateObject.state.dataModel.date,
                    makerID: stateObject.state.userID,
                    planID: stateObject.state.dataModel.planID,
                    studentID: stateObject.state.dataModel.studentID,
                    studentName: stateObject.state.dataModel.studentName,
                    versionNumber: "1"
                }
                obj.lessonResults = [];

              
                    for (let j = 0; j < stateObject.state.dataModel.planDetails.length; j++) {
                        var item = {};
                        var status = "";
                        if (stateObject.state.dataModel.planDetails[j].status == "C") {
                            status = "Completed";
                        } else {
                            status = "Not completed";
                        }
                        item.heading = stateObject.state.dataModel.planDetails[j].heading;
                        item.lesson = stateObject.state.dataModel.planDetails[j].lesson;
                        item.status = status;
                        item.subHeading = stateObject.state.dataModel.planDetails[j].subHeading;
                        item.subjectID = stateObject.state.dataModel.subjectID;
                
                        obj.lessonResults.push(item);
                    }
            

                var oldDate = stateObject.state.dataModel.date.split('-')
                var newDate = `${oldDate[2]}-${oldDate[1]}-${oldDate[0]}`


                var compPercentage = 0;
                var compCount = 0;
                var notCompCount = 0;
                var totalLessonPlans = 0;



                for (let j = 0; j < obj.lessonResults.length; j++) {
                    if (obj.lessonResults[j].status == "Completed") {
                        compCount++;
                    } else {
                        notCompCount++;
                    }
                    totalLessonPlans++;
                }
                if (obj.lessonResults.length != 0) {
                    compPercentage = (compCount / obj.lessonResults.length) * 100;
                }
                else {
                    compPercentage = 0;
                }





                var planCalendarobj = {
                    compPercentage: compPercentage,
                    totalLessonPlans: totalLessonPlans,
                    planStatus: true,
                    details: obj,
                    date: newDate,
                    compCount: compCount,
                    notCompCount: notCompCount,
                }

                temp.childResults.push(obj);

                // for (let i = 0; i < stateObject.state.summaryDataModel.SummaryResult[stateObject.state.summaryResultIndex].childResults.length; i++) {
                for (let i = 0; i < stateObject.state.childViewDetails.childResults.length; i++) {
                    var date = stateObject.state.dataModel.date;
                    if (
                        date == stateObject.state.childViewDetails.childResults[i].date
                        && stateObject.state.dataModel.planID == stateObject.state.childViewDetails.childResults[i].planID
                    ) {
                        stateObject.state.childViewDetails.childResults[i] = obj;

                        if (stateObject.state.calendarIsOpen) {
                            stateObject.state.calendarLoaditems[newDate] = [planCalendarobj];
                            stateObject.state.calendarRefresh = false
                            stateObject.state.calendarEmptyRefresh = true
                        }
                    }
                }
            }
            else if (stateObject.state.serviceName == "ClassLessonPlannerService") {
                temp = {};
                temp.month = stateObject.state.dataModel.date.split('-')[1].replace(/^0+/, '');
                temp.year = stateObject.state.dataModel.date.split('-')[2]
                temp.classID = stateObject.state.dataModel.classID
                temp.classDescription = stateObject.state.dataModel.classDescription
                temp.childResults = [];

                var authStatus = "";
                switch (stateObject.state.auditDataModel.AuthStat) {
                  case "Authorised":
                    authStatus = "A";
                    break;
                  case "Unauthorised":
                    authStatus = "U";
                    break;
                  case "Rejected":
                    authStatus = "R";
                    break;
                }

                var obj = {
                    authStat:authStatus,
                    makerID: stateObject.state.userID,
                    versionNumber: stateObject.state.auditDataModel.Version,
                    date: stateObject.state.dataModel.date,
                    totalStudents:0,
                    completedStudents:0,
                    planID: stateObject.state.dataModel.planID,
                    classID:stateObject.state.dataModel.classID,
                    classDescription:stateObject.state.dataModel.classDescription,
                }
                obj.lessonResults = [];

              
                    for (let j = 0; j < stateObject.state.dataModel.planDetails.length; j++) {
                        var item = {};
                        // var status = "";
                        // if (stateObject.state.dataModel.planDetails[j].status == "C") {
                        //     status = "Completed";
                        // } else {
                        //     status = "Not completed";
                        // }
                        item.heading = stateObject.state.dataModel.planDetails[j].heading;
                        item.lesson = stateObject.state.dataModel.planDetails[j].lesson;
                        // item.status = status;
                        item.subHeading = stateObject.state.dataModel.planDetails[j].subHeading;
                        item.subjectID = stateObject.state.dataModel.subjectID;
                
                        obj.lessonResults.push(item);
                    }
            

                var oldDate = stateObject.state.dataModel.date.split('-')
                var newDate = `${oldDate[2]}-${oldDate[1]}-${oldDate[0]}`


                var compPercentage = 0;
                var compCount = 0;
                var notCompCount = 0;
                var totalLessonPlans = stateObject.state.dataModel.planDetails.length;



                // for (let j = 0; j < obj.lessonResults.length; j++) {
                //     // if (obj.lessonResults[j].status == "Completed") {
                //     //     compCount++;
                //     // } else {
                //     //     notCompCount++;
                //     // }
                //     totalLessonPlans++;
                // }
                // if (obj.lessonResults.length != 0) {
                //     compPercentage = (compCount / obj.lessonResults.length) * 100;
                // }
                // else {
                //     compPercentage = 0;
                // }





                var planCalendarobj = {
                    compPercentage: compPercentage,
                    totalLessonPlans: totalLessonPlans,
                    planStatus: true,
                    details: obj,
                    date: newDate,
                    compCount: compCount,
                    notCompCount: notCompCount,
                }

                temp.childResults.push(obj);

                // for (let i = 0; i < stateObject.state.summaryDataModel.SummaryResult[stateObject.state.summaryResultIndex].childResults.length; i++) {
                for (let i = 0; i < stateObject.state.childViewDetails.childResults.length; i++) {
                    var date = stateObject.state.dataModel.date;
                    if (
                        //date == stateObject.state.childViewDetails.childResults[i].date
                        //&& stateObject.state.dataModel.planID == stateObject.state.childViewDetails.childResults[i].planID
                        stateObject.state.dataModel.planID == stateObject.state.childViewDetails.childResults[i].planID
                    ) {
                        obj.totalStudents = stateObject.state.childViewDetails.childResults[i].totalStudents
                        obj.completedStudents =  stateObject.state.childViewDetails.childResults[i].completedStudents
                        stateObject.state.childViewDetails.childResults[i] = obj;
                        if (stateObject.state.calendarIsOpen) {
                            stateObject.state.calendarLoaditems[newDate] = [planCalendarobj];
                            stateObject.state.calendarRefresh = false
                            stateObject.state.calendarEmptyRefresh = true
                        }
                    }
                }
            }
            else if (stateObject.state.serviceName == "StudyMaterial") {

                temp = {};

                temp.standard = stateObject.state.dataModel.standard;
                temp.subjectID = stateObject.state.dataModel.subjectID;
                temp.subjectName = stateObject.state.dataModel.subjectName;
                temp.dispMaterialsForLesson = [];

                var authStatus = "";
                switch (stateObject.state.auditDataModel.AuthStat) {
                    case "Authorised":
                        authStatus = "A";
                        break;
                    case "Unauthorised":
                        authStatus = "U";
                        break;
                    case "Rejected":
                        authStatus = "R";
                        break;
                }
                var obj = {
                    authStat: authStatus,
                    contentPath: stateObject.state.dataModel.contentPath,
                    dispContentPath: stateObject.state.dataModel.contentPath,
                    heading: stateObject.state.dataModel.heading,
                    lesson: stateObject.state.dataModel.lesson,
                    makerID: stateObject.state.auditDataModel.MakerID,
                    materialDescription: stateObject.state.dataModel.materialDescription,
                    materialID: stateObject.state.dataModel.materialID,
                    subHeading: stateObject.state.dataModel.subHeading,
                    versionNumber: stateObject.state.auditDataModel.Version,
                };
                temp.dispMaterialsForLesson.push(obj);
                for (let i = 0; i < stateObject.state.childViewDetails.dispMaterialsForLesson.length; i++) {
                    if (
                        stateObject.state.dataModel.materialID == stateObject.state.childViewDetails.dispMaterialsForLesson[i].materialID
                    ) {
                        stateObject.state.childViewDetails.dispMaterialsForLesson[i] = obj;
                    }
                }


            }
            else if (stateObject.state.serviceName == "InstituteAssignment") {

                temp = {};

                temp.assignee = stateObject.state.dataModel.groupID;
                temp.groupDesc = stateObject.state.dataModel.groupDesc;
                temp.subjectID = stateObject.state.dataModel.subjectID;
                temp.subjectName = stateObject.state.dataModel.subjectName;
                temp.lessonDetails = [];
                //additional info at the first level change starts
                temp.lessonCount = 1;
                //additional info at the first level change ends

                var authStatus = "";
                switch (stateObject.state.auditDataModel.AuthStat) {
                    case "Authorised":
                        authStatus = "A";
                        break;
                    case "Unauthorised":
                        authStatus = "U";
                        break;
                    case "Rejected":
                        authStatus = "R";
                        break;
                }
                var obj = {
                    authStat: authStatus,
                    assignmentDescription: stateObject.state.dataModel.assignmentDescription,
                    assignmentID: stateObject.state.dataModel.assignmentID,
                    contentPath: stateObject.state.dataModel.URL,
                    makerID: stateObject.state.auditDataModel.MakerID,
                    versionNumber: stateObject.state.auditDataModel.Version,
                };
                temp.lessonDetails.push(obj);
                // for (let i = 0; i < stateObject.state.summaryDataModel.SummaryResult[stateObject.state.summaryResultIndex].lessonDetails.length; i++) {
                //   if (
                //     stateObject.state.dataModel.assignmentID == stateObject.state.summaryDataModel.SummaryResult[stateObject.state.summaryResultIndex].lessonDetails[i].assignmentID
                //   ) {
                //     stateObject.state.summaryDataModel.SummaryResult[stateObject.state.summaryResultIndex].lessonDetails[i] = obj;
                //   }
                // }
                for (let i = 0; i < stateObject.state.childViewDetails.lessonDetails.length; i++) {
                    if (
                        stateObject.state.dataModel.assignmentID == stateObject.state.childViewDetails.lessonDetails[i].assignmentID
                    ) {
                        stateObject.state.childViewDetails.lessonDetails[i] = obj;
                    }
                }


            }
            else if (stateObject.state.serviceName == "ClassAttendance") {
                temp = {};
                temp.month = stateObject.state.dataModel.date.split('-')[1].replace(/^0+/, '');;
                temp.classID = stateObject.state.dataModel.class;
                temp.classDescription = stateObject.state.dataModel.classDescription;
                temp.year = stateObject.state.dataModel.date.split('-')[2]
                temp.attendanceDetails = [];

                for (let i = 0; i < stateObject.state.dataModel.afterNoon.length; i++) {
                    for (let j = 0; j < stateObject.state.dataModel.afterNoon[i].period.length; j++) {
                        if (stateObject.state.dataModel.afterNoon[i].period[j].attendance == 'L' || stateObject.state.dataModel.afterNoon[i].period[j].attendance == 'A') {
                            absentCount++
                        }
                        else {
                            presentCount++
                        }

                    }
                }
                for (let i = 0; i < stateObject.state.dataModel.foreNoon.length; i++) {
                    for (let j = 0; j < stateObject.state.dataModel.foreNoon[i].period.length; j++) {
                        if (stateObject.state.dataModel.foreNoon[i].period[j].attendance == 'L' || stateObject.state.dataModel.foreNoon[i].period[j].attendance == 'A') {
                            absentCount++
                        }
                        else {
                            presentCount++
                        }

                    }
                }


                var authStatus = "";
                switch (stateObject.state.auditDataModel.AuthStat) {
                    case "Authorised":
                        authStatus = "A";
                        break;
                    case "Unauthorised":
                        authStatus = "U";
                        break;
                    case "Rejected":
                        authStatus = "R";
                        break;
                }


                var obj = {
                    authStat: authStatus,
                    date: stateObject.state.dataModel.date,
                    makerID: stateObject.state.userID,
                    absentStudents: absentCount,
                    presentStudents: presentCount,
                    versionNumber: stateObject.state.auditDataModel.Version
                }

                var oldDate = stateObject.state.dataModel.date.split('-')
                var newDate = `${oldDate[2]}-${oldDate[1]}-${oldDate[0]}`

                var calendarobj = {
                    status: true,
                    details: obj,
                    date: newDate,
                }


                temp.attendanceDetails.push(obj);

                for (let i = 0; i < stateObject.state.childViewDetails.attendanceDetails.length; i++) {
                    var date = stateObject.state.dataModel.date;
                    if (
                        date == stateObject.state.childViewDetails.attendanceDetails[i].date
                    ) {
                        stateObject.state.childViewDetails.attendanceDetails[i] = obj;
                        if (stateObject.state.calendarIsOpen) {
                            stateObject.state.calendarLoaditems[newDate] = [calendarobj];
                            stateObject.state.calendarRefresh = false
                            stateObject.state.calendarEmptyRefresh = true
                        }


                    }
                }
            }
            else if (stateObject.state.serviceName == "ClassAssignment") {
                temp = {};
                temp.month = stateObject.state.dataModel.dueDate.split('-')[1].replace(/^0+/, '');
                temp.classID = stateObject.state.dataModel.classID;
                temp.classDescription = stateObject.state.dataModel.classDescription;
                temp.year = stateObject.state.dataModel.dueDate.split('-')[2]
                temp.subjectID = stateObject.state.dataModel.subjectID;
                temp.subjectName = stateObject.state.dataModel.subjectName;
                temp.assignmentDetails = [];
                temp.assignmentCount = 1;


                var authStatus = "";
                switch (stateObject.state.auditDataModel.AuthStat) {
                    case "Authorised":
                        authStatus = "A";
                        break;
                    case "Unauthorised":
                        authStatus = "U";
                        break;
                    case "Rejected":
                        authStatus = "R";
                        break;
                }


                var obj = {
                    authStat: authStatus,
                    dueDate: stateObject.state.dataModel.dueDate,
                    assessmentStatus: 'Not Assessed',
                    assignmentDescription: stateObject.state.dataModel.assignmentDescription,
                    assignmentID: stateObject.state.dataModel.assignmentID,
                    classDescription: stateObject.state.dataModel.classDescription,
                    classID: stateObject.state.dataModel.classID,
                    makerID: stateObject.state.userID,
                    notSubmittedStudentCount: 0,
                    submittedStudentCount: 0,
                    type: stateObject.state.dataModel.type,
                    typeDescription: stateObject.state.dataModel.typeDescription,
                    versionNumber: stateObject.state.auditDataModel.Version
                }

                var oldDate = stateObject.state.dataModel.dueDate.split('-')
                var newDate = `${oldDate[2]}-${oldDate[1]}-${oldDate[0]}`

                var calendarobj = {
                    status: true,
                    details: obj,
                    date: newDate,
                }


                temp.assignmentDetails.push(obj);

                // for (let i = 0; i < stateObject.state.summaryDataModel.SummaryResult[stateObject.state.summaryResultIndex].assignmentDetails.length; i++) {
                for (let i = 0; i < stateObject.state.childViewDetails.assignmentDetails.length; i++) {
                    var assignmentID = stateObject.state.dataModel.assignmentID;
                    if (
                        assignmentID == stateObject.state.childViewDetails.assignmentDetails[i].assignmentID

                    ) {
                
                        stateObject.state.childViewDetails.assignmentDetails[i] = obj;
                        if (stateObject.state.calendarIsOpen) {
                            stateObject.state.calendarLoaditems[newDate] = [calendarobj];
                            stateObject.state.calendarRefresh = false
                            stateObject.state.calendarEmptyRefresh = true
                        }


                    }
                }
            }
            else if (stateObject.state.serviceName == "ClassAssignmentAssessment") {
                temp = {};
                temp.month = stateObject.state.dataModel.dueDate.split('-')[1].replace(/^0+/, '');
                temp.classID = stateObject.state.dataModel.classID;
                temp.classDescription = stateObject.state.dataModel.classDescription;
                temp.year = stateObject.state.dataModel.dueDate.split('-')[2]
                temp.subjectID = stateObject.state.dataModel.subjectID;
                temp.subjectName = stateObject.state.dataModel.subjectName;
                temp.assessedCount = 0;
                temp.notAssessedCount = 0;
                temp.assignments = [];

                var authStatus = "";
                switch (stateObject.state.auditDataModel.AuthStat) {
                    case "Authorised":
                        authStatus = "A";
                        break;
                    case "Unauthorised":
                        authStatus = "U";
                        break;
                    case "Rejected":
                        authStatus = "R";
                        break;
                }
                var obj = {
                    authStat: authStatus,
                    dueDate: stateObject.state.dataModel.dueDate,
                    assessmentStatus: 'Y',
                    assignmentDescription: stateObject.state.dataModel.assignmentDescription,
                    assignmentID: stateObject.state.dataModel.assignmentID,
                    classDescription: stateObject.state.dataModel.classDescription,
                    classID: stateObject.state.dataModel.classID,
                    makerID: stateObject.state.userID,
                    notSubmittedStudentCount: 0,
                    submittedStudentCount: 0,
                    type: stateObject.state.dataModel.type,
                    typeDescription: stateObject.state.dataModel.typeDescription,
                    versionNumber: stateObject.state.auditDataModel.Version
                };
                temp.assignments.push(obj);
                for (let i = 0; i < stateObject.state.childViewDetails.assignments.length; i++) {
                    var assignmentID = stateObject.state.dataModel.assignmentID;
                    if (
                        assignmentID == stateObject.state.childViewDetails.assignments[i].assignmentID
                    ) {
                        stateObject.state.childViewDetails.assignments[i] = obj;
                    }
                }

            }
            else if (stateObject.state.serviceName == "InstituteFeeManagement") {

                temp = {};

                temp.groupID = stateObject.state.dataModel.groupID;
                temp.groupDescription = stateObject.state.dataModel.groupDesc;
                temp.feeType = stateObject.state.dataModel.feeType;
                temp.amountCollected = '';
                temp.amountOverDue = '';
                temp.amountPending = '';
                temp.totalFeeAmount = '';
                temp.feeDetails = [];

                var authStatus = "";
                switch (stateObject.state.auditDataModel.AuthStat) {
                    case "Authorised":
                        authStatus = "A";
                        break;
                    case "Unauthorised":
                        authStatus = "U";
                        break;
                    case "Rejected":
                        authStatus = "R";
                        break;
                }
                var obj = {
                    authStat: authStatus,
                    amountCollected: "",
                    amountOverDue: "",
                    amountPending: "",
                    dueDate: stateObject.state.dataModel.dueDate,
                    feeDescription: stateObject.state.dataModel.feeDescription,
                    feeID: stateObject.state.dataModel.feeID,
                    feePerStudent: stateObject.state.dataModel.amount,
                    noOfStudents: "",
                    totalFeeAmount: "",
                    makerID: stateObject.state.auditDataModel.MakerID,
                    versionNumber: stateObject.state.auditDataModel.Version,
                };
                temp.feeDetails.push(obj);
                // for (let i = 0; i < stateObject.state.summaryDataModel.SummaryResult[stateObject.state.summaryResultIndex].feeDetails.length; i++) {
                //   if (
                //     stateObject.state.dataModel.assignmentID == stateObject.state.summaryDataModel.SummaryResult[stateObject.state.summaryResultIndex].feeDetails[i].assignmentID
                //   ) {
                //     stateObject.state.summaryDataModel.SummaryResult[stateObject.state.summaryResultIndex].feeDetails[i] = obj;
                //   }
                // }
                for (let i = 0; i < stateObject.state.childViewDetails.feeDetails.length; i++) {
                    if (
                        stateObject.state.dataModel.feeID == stateObject.state.childViewDetails.feeDetails[i].feeID
                    ) {
                        obj.noOfStudents = stateObject.state.childViewDetails.feeDetails[i].noOfStudents
                        // obj.totalFeeAmount = Number(stateObject.state.dataModel.amount) * Number(stateObject.state.childViewDetails.feeDetails[i].noOfStudents)

                        stateObject.state.childViewDetails.feeDetails[i] = obj;
                    }
                }


            }
            else if (stateObject.state.serviceName == "TeacherLeaveManagement" && stateObject.state.userType == "A") {

                temp = {};

                temp.month = stateObject.state.dataModel.from.split('-')[1].replace(/^0+/, '');
                // temp.teacherID = stateObject.state.dataModel.teacherID;
                // temp.teacherName = stateObject.state.dataModel.teacherName;
                temp.year = stateObject.state.dataModel.from.split('-')[2]
                temp.leaveDetails = [];

             

                var authStatus = "";
                switch (stateObject.state.auditDataModel.AuthStat) {
                    case "Authorised":
                        authStatus = "A";
                        break;
                    case "Unauthorised":
                        authStatus = "U";
                        break;
                    case "Rejected":
                        authStatus = "R";
                        break;
                }
               
                var leaveDateCount = 0;
                if( stateObject.state.dataModel.from == stateObject.state.dataModel.to && stateObject.state.dataModel.fromNoon != "D" ){
                leaveDateCount = 0.5;
                }
                else{
                var date1 = new Date(stateObject.state.dataModel.from.split('-')[2], stateObject.state.dataModel.from.split('-')[1], stateObject.state.dataModel.from.split('-')[0] );
                var date2 = new Date(stateObject.state.dataModel.to.split('-')[2], stateObject.state.dataModel.to.split('-')[1], stateObject.state.dataModel.to.split('-')[0] ); var Difference_In_Time = date2.getTime() - date1.getTime();
                var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24); leaveDateCount = Difference_In_Days + 1;
                }
                
                


                var obj = {
                    leaveDateCount:leaveDateCount,
                    authStat: authStatus,
                    from: stateObject.state.dataModel.from,
                    to: stateObject.state.dataModel.to,
                    fromNoon: stateObject.state.dataModel.fromNoon,
                    toNoon: stateObject.state.dataModel.toNoon,
                    leaveStatus: stateObject.state.dataModel.leaveStatus,
                    referenceId: stateObject.state.dataModel.referenceId,
                    teacherName: stateObject.state.dataModel.teacherName,
                    teacherID: stateObject.state.dataModel.teacherID,
                    type: stateObject.state.dataModel.type,
                    makerID: stateObject.state.auditDataModel.MakerID,
                    versionNumber: stateObject.state.auditDataModel.Version,


                };
                temp.leaveDetails.push(obj);
                for (let i = 0; i < stateObject.state.childViewDetails.leaveDetails.length; i++) {
                    var date = stateObject.state.dataModel.from;
                    if (
                        stateObject.state.dataModel.referenceId == stateObject.state.childViewDetails.leaveDetails[i].referenceId
                    ) {
                        stateObject.state.childViewDetails.leaveDetails[i] = obj;
                        if(authStatus=='U')
                        {
                         stateObject.state.summaryDataModel.SummaryResult[summaryResultIndex].pendingCount = stateObject.state.summaryDataModel.SummaryResult[summaryResultIndex].pendingCount+1
                        }
                         else if(authStatus=='A')
                        {
                            stateObject.state.summaryDataModel.SummaryResult[stateObject.state.summaryResultIndex].pendingCount = stateObject.state.summaryDataModel.SummaryResult[stateObject.state.summaryResultIndex].pendingCount-1
                            stateObject.state.summaryDataModel.SummaryResult[stateObject.state.summaryResultIndex].approvedCount = stateObject.state.summaryDataModel.SummaryResult[stateObject.state.summaryResultIndex].approvedCount+1
                        }
                        else if(authStatus=='R')
                        {
                            stateObject.state.summaryDataModel.SummaryResult[stateObject.state.summaryResultIndex].pendingCount = stateObject.state.summaryDataModel.SummaryResult[stateObject.state.summaryResultIndex].pendingCount-1
                            stateObject.state.summaryDataModel.SummaryResult[stateObject.state.summaryResultIndex].rejectedCount = stateObject.state.summaryDataModel.SummaryResult[stateObject.state.summaryResultIndex].rejectedCount+1
                       
                        }  
                    }
                }

            }
            else if (stateObject.state.serviceName == "StudentLeaveManagement" && (stateObject.state.userType == "A" || stateObject.state.userType == "T" || stateObject.state.userType == "O")) {

                temp = {};

                temp.month = stateObject.state.dataModel.from.split('-')[1].replace(/^0+/, '');
                // temp.studentID = stateObject.state.dataModel.studentID;
                // temp.studentName = stateObject.state.dataModel.studentName;
                temp.year = stateObject.state.dataModel.from.split('-')[2]
                temp.leaveDetails = [];
                var leaveDateCount = 0;
                if( stateObject.state.dataModel.from == stateObject.state.dataModel.to && stateObject.state.dataModel.fromNoon != "D" ){
                leaveDateCount = 0.5;
                }
                else{
                var date1 = new Date(stateObject.state.dataModel.from.split('-')[2], stateObject.state.dataModel.from.split('-')[1], stateObject.state.dataModel.from.split('-')[0] );
                var date2 = new Date(stateObject.state.dataModel.to.split('-')[2], stateObject.state.dataModel.to.split('-')[1], stateObject.state.dataModel.to.split('-')[0] ); var Difference_In_Time = date2.getTime() - date1.getTime();
                var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24); leaveDateCount = Difference_In_Days + 1;
                }
                var authStatus = "";
                switch (stateObject.state.auditDataModel.AuthStat) {
                    case "Authorised":
                        authStatus = "A";
                        break;
                    case "Unauthorised":
                        authStatus = "U";
                        break;
                    case "Rejected":
                        authStatus = "R";
                        break;
                }
                var obj = {
                    leaveDateCount:leaveDateCount,
                    authStat: authStatus,
                    from: stateObject.state.dataModel.from,
                    to: stateObject.state.dataModel.to,
                    toNoon: stateObject.state.dataModel.toNoon,

                    fromNoon: stateObject.state.dataModel.fromNoon,
                    leaveStatus: stateObject.state.dataModel.leaveStatus,
                    //leaveStatus: stateObject.state.dataModel.leaveStatus,
                    referenceId: stateObject.state.dataModel.referenceId,
                    reason:stateObject.state.dataModel.reason,
                    studentID: stateObject.state.dataModel.studentID,
                    studentName: stateObject.state.dataModel.studentName,
                    type: stateObject.state.dataModel.type,
                    makerID: stateObject.state.auditDataModel.MakerID,
                    versionNumber: stateObject.state.auditDataModel.Version,
                };
                temp.leaveDetails.push(obj);
                for (let i = 0; i < stateObject.state.childViewDetails.leaveDetails.length; i++) {
                    var date = stateObject.state.dataModel.from;
                    if (

                        stateObject.state.dataModel.referenceId == stateObject.state.childViewDetails.leaveDetails[i].referenceId

                    ) {
                        stateObject.state.childViewDetails.leaveDetails[i] = obj;
                        if(authStatus=='U')
                        {
                         stateObject.state.summaryDataModel.SummaryResult[summaryResultIndex].pendingCount = stateObject.state.summaryDataModel.SummaryResult[summaryResultIndex].pendingCount+1
                        }
                         else if(authStatus=='A')
                        {
                            stateObject.state.summaryDataModel.SummaryResult[stateObject.state.summaryResultIndex].pendingCount = stateObject.state.summaryDataModel.SummaryResult[stateObject.state.summaryResultIndex].pendingCount-1
                            stateObject.state.summaryDataModel.SummaryResult[stateObject.state.summaryResultIndex].approvedCount = stateObject.state.summaryDataModel.SummaryResult[stateObject.state.summaryResultIndex].approvedCount+1
                        }
                        else if(authStatus=='R')
                        {
                            stateObject.state.summaryDataModel.SummaryResult[stateObject.state.summaryResultIndex].pendingCount = stateObject.state.summaryDataModel.SummaryResult[stateObject.state.summaryResultIndex].pendingCount-1
                            stateObject.state.summaryDataModel.SummaryResult[stateObject.state.summaryResultIndex].rejectedCount = stateObject.state.summaryDataModel.SummaryResult[stateObject.state.summaryResultIndex].rejectedCount+1
                       
                        }  
                    }  
                    }
                

            }
            else if (stateObject.state.serviceName == "ECircular") {

                temp = {};

                temp.month = stateObject.state.dataModel.circularDate.split('-')[1].replace(/^0+/, '');
                temp.groupID = stateObject.state.dataModel.groupID;
                temp.groupDesc = stateObject.state.dataModel.groupDesc;
                temp.year = stateObject.state.dataModel.circularDate.split('-')[2]
                temp.dispCircular = [];

                var authStatus = "";
                switch (stateObject.state.auditDataModel.AuthStat) {
                    case "Authorised":
                        authStatus = "A";
                        break;
                    case "Unauthorised":
                        authStatus = "U";
                        break;
                    case "Rejected":
                        authStatus = "R";
                        break;
                }
                var obj = {
                    authStat: authStatus,
                    circularDate: stateObject.state.dataModel.circularDate,
                    circularID: stateObject.state.dataModel.circularID,
                    contentPath: stateObject.state.dataModel.contentPath,
                    description: stateObject.state.dataModel.circularDescription,
                    instituteID: globalData.instituteID,
                    makerID: stateObject.state.auditDataModel.MakerID,
                    versionNumber: stateObject.state.auditDataModel.Version,
                };
                temp.dispCircular.push(obj);
                for (let i = 0; i < stateObject.state.childViewDetails.dispCircular.length; i++) {
                    // var date = stateObject.state.dataModel.circularDate; 
                    if (

                        stateObject.state.dataModel.circularID == stateObject.state.childViewDetails.dispCircular[i].circularID

                    ) {
                        stateObject.state.childViewDetails.dispCircular[i] = obj;
                    }
                }

            }
            else if (stateObject.state.serviceName == "InstituteOtherActivity") {

                temp = {};

                temp.activityType = stateObject.state.dataModel.activityType;
                temp.activityTypeDescription = stateObject.state.dataModel.activityName;
                temp.groupID = stateObject.state.dataModel.groupID;
                temp.groupDescription = stateObject.state.dataModel.groupDesc
                temp.activityDetails = [];

                var authStatus = "";
                switch (stateObject.state.auditDataModel.AuthStat) {
                    case "Authorised":
                        authStatus = "A";
                        break;
                    case "Unauthorised":
                        authStatus = "U";
                        break;
                    case "Rejected":
                        authStatus = "R";
                        break;
                }
                var obj = {
                    authStat: authStatus,
                    activityID: stateObject.state.dataModel.activityID,
                    activityName: stateObject.state.dataModel.activityName,
                    date: stateObject.state.dataModel.date,
                    dueDate: stateObject.state.dataModel.dueDate,
                    level: stateObject.state.dataModel.level,
                    venue: stateObject.state.dataModel.venue,
                    instituteID: globalData.instituteID,
                    makerID: stateObject.state.auditDataModel.MakerID,
                    versionNumber: stateObject.state.auditDataModel.Version,
                    competition: stateObject.state.dataModel.competitionEvent,
                    feeApplicable: stateObject.state.dataModel!=''?true:false
                };
                temp.activityDetails.push(obj);
                for (let i = 0; i < stateObject.state.childViewDetails.activityDetails.length; i++) {
                    // var date = stateObject.state.dataModel.circularDate; 
                    if (

                        stateObject.state.dataModel.activityID == stateObject.state.childViewDetails.activityDetails[i].activityID

                    ) {
                        obj.competition = stateObject.state.childViewDetails.activityDetails[i].competition
                        obj.feeApplicable = stateObject.state.childViewDetails.activityDetails[i].feeApplicable
                        stateObject.state.childViewDetails.activityDetails[i] = obj;
                    }
                }

            }

            else if (stateObject.state.serviceName == "InstitutePayment") {
                temp = {};
                temp.paymentDate = stateObject.state.dataModel.paymentDate;
                temp.amountCollected = stateObject.state.dataModel.paymentPaid;
                temp.paymentDetails = [];

                var authStatus = "";
                switch (stateObject.state.auditDataModel.AuthStat) {
                    case "Authorised":
                        authStatus = "A";
                        break;
                    case "Unauthorised":
                        authStatus = "U";
                        break;
                    case "Rejected":
                        authStatus = "R";
                        break;
                }
                var obj = {
                    authStat: authStatus,
                    amountPaid: stateObject.state.dataModel.paymentPaid,
                    paymentID: stateObject.state.dataModel.paymentID,
                    paymentDate: stateObject.state.dataModel.paymentDate,
                    studentID: stateObject.state.dataModel.studentID,
                    studentName: stateObject.state.dataModel.studentName,
                    makerID: stateObject.state.auditDataModel.MakerID,
                    versionNumber: stateObject.state.auditDataModel.Version,
                };
                temp.paymentDetails.push(obj);
                for (let i = 0; i < stateObject.state.childViewDetails.paymentDetails.length; i++) {
                    // var date = stateObject.state.dataModel.circularDate; 
                    if (
                        stateObject.state.dataModel.paymentID == stateObject.state.childViewDetails.paymentDetails[i].paymentID
                    ) {
                        //stateObject.state.summaryDataModel.SummaryResult[i].amountCollected = String(Number(stateObject.state.summaryDataModel.SummaryResult[i].amountCollected.replace(/\,/g, '')) - Number(ScreenUtils.paymentAmount.replace(/\,/g, '')) + Number(stateObject.state.dataModel.paymentPaid.replace(/\,/g, '')));
                        stateObject.state.summaryDataModel.SummaryResult[i].amountCollected=''
                        stateObject.state.childViewDetails.paymentDetails[i] = obj;
                    }
                }

            }
            else if (stateObject.state.serviceName == "TeacherNotesService") {
                temp = {};
                temp.standard = stateObject.state.dataModel.standard;
                temp.subjectID = stateObject.state.dataModel.subjectID;
                temp.subjectName = stateObject.state.dataModel.subjectName;
                temp.notesDetails = [];

                // temp.notesCount = 0;

                var authStatus = "";
                switch (stateObject.state.auditDataModel.AuthStat) {
                    case "Authorised":
                        authStatus = "A";
                        break;
                    case "Unauthorised":
                        authStatus = "U";
                        break;
                    case "Rejected":
                        authStatus = "R";
                        break;
                }



                var obj = {
                    authStat: authStatus,
                    date: stateObject.state.dataModel.date,
                    notesID: stateObject.state.dataModel.notesID,
                    detailedNotes: stateObject.state.dataModel.notesDetails,
                    teacherID: stateObject.state.dataModel.teacherID,
                    teacherName: stateObject.state.dataModel.teacherName,
                    makerID: stateObject.state.auditDataModel.MakerID,
                    versionNumber: stateObject.state.auditDataModel.Version,
                };
                temp.notesDetails.push(obj);
                for (let i = 0; i < stateObject.state.childViewDetails.notesDetails.length; i++) {
                    // var date = stateObject.state.dataModel.circularDate; 
                    if (
                        stateObject.state.dataModel.notesID == stateObject.state.childViewDetails.notesDetails[i].notesID
                    ) {
                        // stateObject.state.summaryDataModel.SummaryResult[i].notesCount = stateObject.state.summaryDataModel.SummaryResult[i].notesCount
                        stateObject.state.childViewDetails.notesDetails[i] = obj;
                    }
                }

            }
            else if (stateObject.state.serviceName == "StudentNotesService") {
                temp = {};
                // temp.standard = stateObject.state.dataModel.standard;
                temp.subjectID = stateObject.state.dataModel.subjectID;
                temp.subjectName = stateObject.state.dataModel.subjectName;
                temp.notesDetails = [];

                // temp.notesCount = 0;

                var authStatus = "";
                switch (stateObject.state.auditDataModel.AuthStat) {
                    case "Authorised":
                        authStatus = "A";
                        break;
                    case "Unauthorised":
                        authStatus = "U";
                        break;
                    case "Rejected":
                        authStatus = "R";
                        break;
                }



                var obj = {
                    authStat: authStatus,
                    date: stateObject.state.dataModel.date,
                    notesID: stateObject.state.dataModel.notesID,
                    studentID: stateObject.state.dataModel.studentID,
                    studentName: stateObject.state.dataModel.studentName,
                    detailedNotes: stateObject.state.dataModel.notesDetails,
                    makerID: stateObject.state.auditDataModel.MakerID,
                    versionNumber: stateObject.state.auditDataModel.Version,
                };
                temp.notesDetails.push(obj);
                for (let i = 0; i < stateObject.state.childViewDetails.notesDetails.length; i++) {
                    // var date = stateObject.state.dataModel.circularDate; 
                    if (
                        stateObject.state.dataModel.notesID == stateObject.state.childViewDetails.notesDetails[i].notesID
                    ) {
                        // stateObject.state.summaryDataModel.SummaryResult[i].notesCount = stateObject.state.summaryDataModel.SummaryResult[i].notesCount
                        stateObject.state.childViewDetails.notesDetails[i] = obj;
                    }
                }

            }
            else if (stateObject.state.serviceName == "Notification") {

                temp = {};
                temp.month = stateObject.state.dataModel.instant.split('-')[1].replace(/^0+/, '');
                temp.year = stateObject.state.dataModel.instant.split('-')[2]
                temp.notificationType = stateObject.state.dataModel.messageType;
                temp.notificationTypeDescription = stateObject.state.dataModel.messageTypeDescription;
                temp.notificationCount = 1;
                temp.notificationDetails = [];
                //temp.month = stateObject.state.dataModel.instant.split('-')[1].replace(/^0+/, '');
                //temp.year = stateObject.state.dataModel.instant.split('-')[2]
                //temp.notificationType = stateObject.state.dataModel.notificationType;
                //temp.notificationTypeDescription = '';;
                //temp.notificationCount = 0;
                //temp.notificationDetails = [];

                var authStatus = "";
                switch (stateObject.state.auditDataModel.AuthStat) {
                    case "Authorised":
                        authStatus = "A";
                        break;
                    case "Unauthorised":
                        authStatus = "U";
                        break;
                    case "Rejected":
                        authStatus = "R";
                        break;
                }
                var obj = {
                    authStat: authStatus,
                    date: stateObject.state.dataModel.instant,
                    description: stateObject.state.dataModel.templateDescription,
                    notificationID: stateObject.state.dataModel.notificationID,

                    makerID: stateObject.state.auditDataModel.MakerID,
                    versionNumber: stateObject.state.auditDataModel.Version,
                };
                temp.notificationDetails.push(obj);

                for (let i = 0; i < stateObject.state.childViewDetails.notificationDetails.length; i++) {
                    if (
                        stateObject.state.dataModel.notificationID == stateObject.state.childViewDetails.notificationDetails[i].notificationID
                    ) {
                        stateObject.state.childViewDetails.notificationDetails[i] = obj;
                    }
                }


            }
            else if (stateObject.state.serviceName == "OnlineClassroomService") {

                temp = {};
                temp.month = stateObject.state.dataModel.date.split('-')[1].replace(/^0+/, '');
                temp.year = stateObject.state.dataModel.date.split('-')[2]
                if (stateObject.state.summaryDataModel.filter.meetingScreenType =='O')
                {
                temp.subjectID = stateObject.state.dataModel.subject;
                temp.subjectName = stateObject.state.dataModel.subjectName;
                  }
                temp.meetingCount = 0;
                temp.roomDetails = [];

                var authStatus = "";
                switch (stateObject.state.auditDataModel.AuthStat) {
                    case "Authorised":
                        authStatus = "A";
                        break;
                    case "Unauthorised":
                        authStatus = "U";
                        break;
                    case "Rejected":
                        authStatus = "R";
                        break;
                }
                if (stateObject.state.summaryDataModel.filter.meetingScreenType =='O')
                {
                    var obj = {
                        authStat: authStatus,
                        date: stateObject.state.dataModel.date,
                        duration: stateObject.state.dataModel.duration,
                        classroomID: stateObject.state.dataModel.classroomID,
                        heading: stateObject.state.dataModel.heading,
                        startTime:`${stateObject.state.dataModel.startTimeHour}:${stateObject.state.dataModel.startTimeMin}`,
                        makerID: stateObject.state.userID,
                        subheading: stateObject.state.dataModel.subheading,
                        subject: stateObject.state.dataModel.subject,
                        subjectName: stateObject.state.dataModel.subjectName,
                        unitNo: stateObject.state.dataModel.unitNo,
                        url: '',
                        versionNumber: stateObject.state.auditDataModel.Version
                    };

                }
                else{
                var obj = {
                    authStat: authStatus,
                    date: stateObject.state.dataModel.date,
                    duration: stateObject.state.dataModel.duration,
                    classroomID: stateObject.state.dataModel.classroomID,
                    heading: stateObject.state.dataModel.heading,
                    startTime:`${stateObject.state.dataModel.startTimeHour}:${stateObject.state.dataModel.startTimeMin}`,
                    makerID: stateObject.state.userID,
                    subheading: stateObject.state.dataModel.subheading,
                    //subject: stateObject.state.dataModel.subject,
                    //subjectName: stateObject.state.dataModel.subjectName,
                    unitNo: stateObject.state.dataModel.unitNo,
                    url: '',
                    versionNumber: stateObject.state.auditDataModel.Version
                };}
                temp.roomDetails.push(obj);
                for (let i = 0; i < stateObject.state.childViewDetails.roomDetails.length; i++) {
                    var classroomID = stateObject.state.dataModel.classroomID;
                    if (
                        classroomID == stateObject.state.childViewDetails.roomDetails[i].classroomID
                    ) {
                        stateObject.state.childViewDetails.roomDetails[i] = obj;
                    }
                }

            }
            else if (stateObject.state.serviceName == "NewStudentAssignment") {
                temp = {};
                temp.month = stateObject.state.dataModel.dueDate.split('-')[1].replace(/^0+/, '');
                temp.year = stateObject.state.dataModel.dueDate.split('-')[2]
                temp.subjectID = stateObject.state.dataModel.subject;
                temp.subjectName = stateObject.state.dataModel.subjectName;
                temp.classID = stateObject.state.dataModel.classID;
                temp.classDescription = stateObject.state.dataModel.classDescription;
                temp.totalCount = 0;
                temp.answeredCount = 0;
                temp.notAnsweredCount = 0;
                temp.assignments = [];

                var authStatus = "";
                switch (stateObject.state.auditDataModel.AuthStat) {
                    case "Authorised":
                        authStatus = "A";
                        break;
                    case "Unauthorised":
                        authStatus = "U";
                        break;
                    case "Rejected":
                        authStatus = "R";
                        break;
                }
                var obj = {
                    authStat: authStatus,
                    makerID: stateObject.state.auditDataModel.MakerID,
                    versionNumber: stateObject.state.auditDataModel.Version,
                    answerStatus: 'A',
                    assignmentDescription: stateObject.state.dataModel.assignmentDescription,
                    assignmentID: stateObject.state.dataModel.assignmentID,
                    classDescription: stateObject.state.dataModel.classDescription,
                    classID:`${stateObject.state.dataModel.classID}`,
                    dueDate: stateObject.state.dataModel.dueDate,
                    studentID: stateObject.state.dataModel.studentID,
                    studentName: stateObject.state.dataModel.studentName,
                    type: stateObject.state.dataModel.type,
                    typeDescription: ''
                };
                temp.assignments.push(obj);
                for (let i = 0; i < stateObject.state.childViewDetails.assignments.length; i++) {
                    var assignmentID = stateObject.state.dataModel.assignmentID;
                    if (
                        assignmentID == stateObject.state.childViewDetails.assignments[i].assignmentID
                    ) {
                        stateObject.state[ScreenUtils.getContentType(stateObject)].SummaryResult[stateObject.state.summaryResultIndex].totalCount = stateObject.state[ScreenUtils.getContentType(stateObject)].SummaryResult[stateObject.state.summaryResultIndex].totalCount;

                        stateObject.state[ScreenUtils.getContentType(stateObject)].SummaryResult[stateObject.state.summaryResultIndex].answeredCount = stateObject.state[ScreenUtils.getContentType(stateObject)].SummaryResult[stateObject.state.summaryResultIndex].answeredCount;

                        stateObject.state[ScreenUtils.getContentType(stateObject)].SummaryResult[stateObject.state.summaryResultIndex].notAnsweredCount = stateObject.state[ScreenUtils.getContentType(stateObject)].SummaryResult[stateObject.state.summaryResultIndex].notAnsweredCount;
                        
                        stateObject.state.childViewDetails.assignments[i] = obj;
                    }
                }

            }
            else {
                for (var i = 0; i < stateObject.state.summaryDataModel.SummaryResult.length; i++) {

                    count = 0;

                    for (var j = 0; j < stateObject.state.primaryKeyCols.length; j++) {


                        if (stateObject.state.dataModel[stateObject.state.primaryKeyCols[j]] == stateObject.state.summaryDataModel.SummaryResult[i][stateObject.state.primaryKeyCols[j]]) {

                            count++;

                        }

                    }

                    if (stateObject.state.primaryKeyCols.length == count) {
                        //console.log("replace this index "+i );
                        var temp = {};

                        for (let prop in stateObject.state.summaryDataModel.SummaryResult[i]) {

                            // strat 
                            if (ScreenUtils.checkForCorrectDataModal.includes(stateObject.state.serviceName)) {
                                ScreenUtils.setCorrectDataModal(stateObject.state.serviceName, stateObject)
                            }
                            // end


                            if (stateObject.state.dataModel.hasOwnProperty(prop)) {

                                temp[prop] = stateObject.state.dataModel[prop]

                            }

                            else if (prop == "versionNumber") {

                                temp[prop] = stateObject.state.auditDataModel.Version

                            }

                            else if (prop == "authStat") {

                                switch (stateObject.state.auditDataModel.AuthStat) {

                                    case "Authorised":

                                        temp[prop] = "A";

                                        break;

                                    case "Unauthorised":

                                        temp[prop] = "U";

                                        break;

                                    case "Rejected":

                                        temp[prop] = "R";

                                        break;

                                }

                            }

                            else if (prop == "makerID") {
                                temp[prop] = stateObject.state.auditDataModel.MakerID
                            }

                        }

                        stateObject.state.summaryDataModel.SummaryResult[i] = temp;

                        break;

                    }

                }
            }

            //additional info at the first level change starts
            if (stateObject.state.serviceName == "HolidayMaintenance") {
                var noOfDays = 0;
                var holidayCount = 0;
                var workingDayCount = 0;

                for (let i = 0; i < stateObject.state.summaryDataModel.SummaryResult.length; i++) {
                    if (
                        stateObject.state.summaryDataModel.SummaryResult[i].month == stateObject.state.dataModel.month &&
                        stateObject.state.summaryDataModel.SummaryResult[i].year == stateObject.state.dataModel.year &&
                        stateObject.state.summaryDataModel.SummaryResult[i].classCode == stateObject.state.dataModel.classCode
                    ) {
                        noOfDays = new Date(stateObject.state.dataModel.year, stateObject.state.dataModel.month, 0).getDate();
                        for (let j = 0; j < noOfDays; j++) {
                            if (stateObject.state.dataModel.holiday.charAt(j) == "W") {
                                workingDayCount++
                            }
                            else if (stateObject.state.dataModel.holiday.charAt(j) == "H") {
                                holidayCount++
                            }
                            else {
                                workingDayCount = workingDayCount + 0.5;
                                holidayCount = holidayCount + 0.5;
                            }
                        }

                        stateObject.state.summaryDataModel.SummaryResult[i].holidayCount = holidayCount.toFixed(1);
                        stateObject.state.summaryDataModel.SummaryResult[i].workingDayCount = workingDayCount.toFixed(1);
                        break;
                    }
                }
            }
            else if (stateObject.state.serviceName == "GroupMapping") {
                var classCount = 0;
                var studentCount = 0;

                for (let i = 0; i < stateObject.state.summaryDataModel.SummaryResult.length; i++) {
                    if (
                        stateObject.state.summaryDataModel.SummaryResult[i].groupID == stateObject.state.dataModel.groupID
                    ) {
                        for (let j = 0; j < stateObject.state.dataModel.group.length; j++) {
                            if (stateObject.state.dataModel.group[j].class != "") {
                                classCount++;
                            }
                            if (stateObject.state.dataModel.group[j].studentID != "") {
                                studentCount++;
                            }
                        }
                        stateObject.state.summaryDataModel.SummaryResult[i].classCount = classCount;
                        stateObject.state.summaryDataModel.SummaryResult[i].studentCount = studentCount;
                        break;
                    }
                }
            }
            else if (stateObject.state.serviceName == "ClassLevelConfiguration") {
                var startTime = 0;
                var endTime = 0;
                var studentCount = 0;
                var periodCount = stateObject.state.dataModel.periodTimings.length;

                var minStartHour = 0;
                var minStartMin = 0;
                var maxEndHour = 0;
                var maxEndMin = 0;

                for (let i = 0; i < stateObject.state.summaryDataModel.SummaryResult.length; i++) {
                    if (
                        stateObject.state.summaryDataModel.SummaryResult[i].Class == stateObject.state.dataModel.Class &&
                        stateObject.state.summaryDataModel.SummaryResult[i].Standard == stateObject.state.dataModel.Standard &&
                        stateObject.state.summaryDataModel.SummaryResult[i].Section == stateObject.state.dataModel.Section
                    ) {
                        for (let j = 0; j < stateObject.state.dataModel.periodTimings.length; j++) {
                            if (j == 0) {
                                minStartHour = stateObject.state.dataModel.periodTimings[j].startTime.hour;
                                minStartMin = stateObject.state.dataModel.periodTimings[j].startTime.min;
                                maxEndHour = stateObject.state.dataModel.periodTimings[j].endTime.hour;
                                maxEndMin = stateObject.state.dataModel.periodTimings[j].endTime.min;
                            }
                            else {
                                if (minStartHour > stateObject.state.dataModel.periodTimings[j].startTime.hour) {
                                    minStartHour = stateObject.state.dataModel.periodTimings[j].startTime.hour;
                                    minStartMin = stateObject.state.dataModel.periodTimings[j].startTime.min;
                                }
                                else if (minStartHour == stateObject.state.dataModel.periodTimings[j].startTime.hour && minStartMin > stateObject.state.dataModel.periodTimings[j].startTime.min) {
                                    minStartHour = stateObject.state.dataModel.periodTimings[j].startTime.hour;
                                    minStartMin = stateObject.state.dataModel.periodTimings[j].startTime.min;
                                }
                                if (maxEndHour < stateObject.state.dataModel.periodTimings[j].endTime.hour) {
                                    maxEndHour = stateObject.state.dataModel.periodTimings[j].endTime.hour;
                                    maxEndMin = stateObject.state.dataModel.periodTimings[j].endTime.min;
                                }
                                else if (maxEndHour == stateObject.state.dataModel.periodTimings[j].endTime.hour && maxEndMin > stateObject.state.dataModel.periodTimings[j].endTime.min) {
                                    maxEndHour = stateObject.state.dataModel.periodTimings[j].endTime.hour;
                                    maxEndMin = stateObject.state.dataModel.periodTimings[j].endTime.min;
                                }
                            }
                        }
                        startTime = minStartHour + " : " + minStartMin;
                        endTime = maxEndHour + " : " + maxEndMin;
                        stateObject.state.summaryDataModel.SummaryResult[i].startTime = startTime;
                        stateObject.state.summaryDataModel.SummaryResult[i].endTime = endTime;
                        stateObject.state.summaryDataModel.SummaryResult[i].studentCount = studentCount;
                        stateObject.state.summaryDataModel.SummaryResult[i].periodCount = periodCount;
                        break;
                    }
                }
            }
            else if (stateObject.state.serviceName == "ClassStudentRegister") {
                var studentCount = stateObject.state.dataModel.students.length;

                for (let i = 0; i < stateObject.state.summaryDataModel.SummaryResult.length; i++) {
                    if (
                        stateObject.state.summaryDataModel.SummaryResult[i].class == stateObject.state.dataModel.class &&
                        stateObject.state.summaryDataModel.SummaryResult[i].registerID == stateObject.state.dataModel.registerID
                    ) {
                        stateObject.state.summaryDataModel.SummaryResult[i].studentCount = studentCount;
                        break;
                    }
                }
            }
            else if( stateObject.state.serviceName == "ClassMark" ){
                var topMark = 0;
                var averageMark = 0;
                var lowMark = 0;
                var totalMarks = 0;

                for(let i=0; i<stateObject.state.summaryDataModel.SummaryResult.length; i++){
                    if(
                        stateObject.state.summaryDataModel.SummaryResult[i].class == stateObject.state.dataModel.class &&
                        stateObject.state.summaryDataModel.SummaryResult[i].exam == stateObject.state.dataModel.exam &&
                        stateObject.state.summaryDataModel.SummaryResult[i].subjectID == stateObject.state.dataModel.subjectID
                    ){
                        for(let j=0; j<stateObject.state.dataModel.marks.length; j++){
                            if(j == 0){
                                topMark = stateObject.state.dataModel.marks[j].mark;
                                lowMark = stateObject.state.dataModel.marks[j].mark;
                            }

                            var currentMark = stateObject.state.dataModel.marks[j].mark;

                            if( currentMark < lowMark){
                                lowMark = currentMark;
                            }
                            if( currentMark > topMark ){
                                topMark = currentMark;
                            }
                            totalMarks = parseInt(totalMarks) + parseInt(currentMark);
                        }
                        if( stateObject.state.dataModel.marks.length > 0 ){
                            averageMark = totalMarks/stateObject.state.dataModel.marks.length
                        }

                        stateObject.state.summaryDataModel.SummaryResult[i].topMark = topMark;
                        stateObject.state.summaryDataModel.SummaryResult[i].averageMark = averageMark.toFixed(1);
                        stateObject.state.summaryDataModel.SummaryResult[i].lowMark = lowMark;
                        stateObject.state.summaryDataModel.SummaryResult[i].classDesc = stateObject.state.dataModel.classDescription;
                        break;
                    }
                }
            }
            if( stateObject.state.serviceName == "ClassExamSchedule" ){
                var startDate = "";
                var endDate = "";
                
                for(let i=0; i<stateObject.state.summaryDataModel.SummaryResult.length; i++){
                    if(
                        stateObject.state.summaryDataModel.SummaryResult[i].class == stateObject.state.dataModel.class &&
                        stateObject.state.summaryDataModel.SummaryResult[i].exam == stateObject.state.dataModel.exam
                    ){
                        for(let j=0; j<stateObject.state.dataModel.Subjectschedules.length; j++){
                            if(j == 0){
                                startDate = stateObject.state.dataModel.Subjectschedules[j].date;
                                endDate = stateObject.state.dataModel.Subjectschedules[j].date;
                            }

                            var sd = Date.parse(startDate);
                            var ed = Date.parse(endDate);
                            var d = Date.parse(stateObject.state.dataModel.Subjectschedules[j].date);

                            if( d < sd){
                                startDate = stateObject.state.dataModel.Subjectschedules[j].date
                            }
                            if( d > ed ){
                                endDate = stateObject.state.dataModel.Subjectschedules[j].date
                            }
                        }

                        stateObject.state.summaryDataModel.SummaryResult[i].startDate = startDate;
                        stateObject.state.summaryDataModel.SummaryResult[i].endDate = endDate;
                        stateObject.state.summaryDataModel.SummaryResult[i].classDesc = stateObject.state.dataModel.classDescription;
                        break;
                    }
                }
            }   
            //additional info at the first level change ends

            break
        case 'Deletion':
            if (stateObject.state.serviceName == "TeacherLessonPlannerService") {

                var oldDate = stateObject.state.storedDataModel.date.split('-')
                var newDate = `${oldDate[2]}-${oldDate[1]}-${oldDate[0]}`

                var planCalendarobj = {
                    compPercentage: 0,
                    totalLessonPlans: 0,
                    planStatus: false,
                    details: {
                        teacherID:stateObject.state.storedDataModel.teacherID,
                        teacherName:stateObject.state.storedDataModel.teacherName,
                    },
                    date: newDate,
                    compCount: 0,
                    notCompCount: 0,
                }
                for (let i = 0; i < stateObject.state.childViewDetails.childResults.length; i++) {
                    var date = stateObject.state.storedDataModel.date;
                    if (
                        date == stateObject.state.childViewDetails.childResults[i].date
                        && stateObject.state.storedDataModel.planID == stateObject.state.childViewDetails.childResults[i].planID
                        && stateObject.state.storedDataModel.teacherID == stateObject.state.childViewDetails.childResults[i].teacherID
                    ) {

                        stateObject.state.childViewDetails.childResults.splice(i, 1);
                        stateObject.state.calendarLoaditems[newDate] = [planCalendarobj];
                        stateObject.state.calendarRefresh = false
                        stateObject.state.calendarEmptyRefresh = true
                        setTimeout(() => {
                            stateObject.setState({calendarRefresh: true,calendarEmptyRefresh:false})}, 1000)
                        //console.log('childResult spliced');
                        if (stateObject.state.childViewDetails.childResults.length == 0) {
                            stateObject.state.summaryDataModel.SummaryResult.splice(stateObject.state.summaryResultIndex, 1);
                            //console.log('SummaryResult spliced');
                            stateObject.state.calendarIsOpen = false
                        }

                    }
                }
            }
            else if (stateObject.state.serviceName == "StudentLessonPlannerService") {

                var oldDate = stateObject.state.storedDataModel.date.split('-')
                var newDate = `${oldDate[2]}-${oldDate[1]}-${oldDate[0]}`

                var planCalendarobj = {
                    compPercentage: 0,
                    totalLessonPlans: 0,
                    planStatus: false,
                    details: {
                        studentID:stateObject.state.storedDataModel.studentID,
                        studentName:stateObject.state.storedDataModel.studentName,
                    },
                    date: newDate,
                    compCount: 0,
                    notCompCount: 0,
                }

                for (let i = 0; i < stateObject.state.childViewDetails.childResults.length; i++) {
                    var date = stateObject.state.storedDataModel.date;
                    if (
                        date == stateObject.state.childViewDetails.childResults[i].date
                        && stateObject.state.storedDataModel.planID == stateObject.state.childViewDetails.childResults[i].planID
                    ) {
                        stateObject.state.childViewDetails.childResults.splice(i, 1);
                        stateObject.state.calendarLoaditems[newDate] = [planCalendarobj];
                        stateObject.state.calendarRefresh = false
                        stateObject.state.calendarEmptyRefresh = true
                        setTimeout(() => {
                            stateObject.setState({calendarRefresh: true,calendarEmptyRefresh:false})}, 1000)
                        if (stateObject.state.childViewDetails.childResults.length == 0) {
                            stateObject.state[ScreenUtils.getContentType(stateObject)].SummaryResult.splice(stateObject.state.summaryResultIndex, 1);
                            stateObject.state.calendarIsOpen = false
                        }
                    }
                }
            }
            else if (stateObject.state.serviceName == "ClassLessonPlannerService") {
                var oldDate = stateObject.state.storedDataModel.date.split('-')
                var newDate = `${oldDate[2]}-${oldDate[1]}-${oldDate[0]}`
                var planCalendarobj = {
                    compPercentage: 0,
                    totalLessonPlans: 0,
                    planStatus: false,
                    details: {
                        classID:stateObject.state.storedDataModel.classID,
                    },
                    date: newDate,
                    compCount: 0,
                    notCompCount: 0,
                }

                for (let i = 0; i < stateObject.state.childViewDetails.childResults.length; i++) {
                    var date = stateObject.state.storedDataModel.date;
                    if (
                        date == stateObject.state.childViewDetails.childResults[i].date
                        && stateObject.state.storedDataModel.planID == stateObject.state.childViewDetails.childResults[i].planID
                    ) {
                        stateObject.state.childViewDetails.childResults.splice(i, 1);
                        stateObject.state.calendarLoaditems[newDate] = [planCalendarobj];
                        stateObject.state.calendarRefresh = false
                        stateObject.state.calendarEmptyRefresh = true
                        setTimeout(() => {
                            stateObject.setState({calendarRefresh: true,calendarEmptyRefresh:false})}, 1000)
                        if (stateObject.state.childViewDetails.childResults.length == 0) {
                            stateObject.state.summaryDataModel.SummaryResult.splice(stateObject.state.summaryResultIndex, 1);
                            stateObject.state.calendarIsOpen = false
                        }
                    }
                }
            }
            else if (stateObject.state.serviceName == "StudyMaterial") {
                for (let i = 0; i < stateObject.state.childViewDetails.dispMaterialsForLesson.length; i++) {
                    if (
                        stateObject.state.storedDataModel.materialID == stateObject.state.childViewDetails.dispMaterialsForLesson[i].materialID
                    ) {
                        if (stateObject.state.auditDataModel.Version == "1") {
                            stateObject.state.childViewDetails.dispMaterialsForLesson.splice(i, 1);
                            //additional info at the first level change starts
                            stateObject.state.summaryDataModel.SummaryResult[stateObject.state.summaryResultIndex].materialCount = stateObject.state.summaryDataModel.SummaryResult[stateObject.state.summaryResultIndex].materialCount - 1;
                            //additional info at the first level change ends
                            if (stateObject.state.childViewDetails.dispMaterialsForLesson.length == 0) {
                                stateObject.state.summaryDataModel.SummaryResult.splice(stateObject.state.summaryResultIndex, 1);
                                stateObject.state.isChildRecordShow = false
                            }
                        }
                        else {
                            stateObject.state.childViewDetails.dispMaterialsForLesson[i].versionNumber = stateObject.state.auditDataModel.Version;
                            stateObject.state.childViewDetails.dispMaterialsForLesson[i].authStat = "A";
                        }
                    }
                }
            }
            else if (stateObject.state.serviceName == "InstituteAssignment") {
                // for (let i = 0; i < stateObject.state.summaryDataModel.SummaryResult[stateObject.state.summaryResultIndex].lessonDetails.length; i++) {
                for (let i = 0; i < stateObject.state.childViewDetails.lessonDetails.length; i++) {
                    if (
                        stateObject.state.storedDataModel.assignmentID == stateObject.state.childViewDetails.lessonDetails[i].assignmentID
                    ) {

                        if (stateObject.state.auditDataModel.Version == "1") {
                            stateObject.state.childViewDetails.lessonDetails.splice(i, 1);
                            //additional info at the first level change starts
                            stateObject.state.summaryDataModel.SummaryResult[stateObject.state.summaryResultIndex].lessonCount = stateObject.state.summaryDataModel.SummaryResult[stateObject.state.summaryResultIndex].lessonCount - 1;
                            //additional info at the first level change ends
                            // stateObject.state.summaryDataModel.SummaryResult[stateObject.state.summaryResultIndex].lessonDetails.splice(i, 1);

                            if (stateObject.state.childViewDetails.lessonDetails == 0) {
                                stateObject.state.summaryDataModel.SummaryResult.splice(stateObject.state.summaryResultIndex, 1);
                                stateObject.state.isChildRecordShow = false
                            }
                        }
                        else {
                            stateObject.state.childViewDetails.lessonDetails[i].versionNumber = stateObject.state.auditDataModel.Version;
                            stateObject.state.childViewDetails.lessonDetails[i].authStat = "A";
                        }
                    }
                }
            }
            else if (stateObject.state.serviceName == "ClassAttendance") {
                for (let i = 0; i < stateObject.state.childViewDetails.attendanceDetails.length; i++) {
                    if (
                        stateObject.state.storedDataModel.date == stateObject.state.childViewDetails.attendanceDetails[i].date
                    ) {
                        if (stateObject.state.auditDataModel.Version == "1") {
                            stateObject.state.childViewDetails.attendanceDetails.splice(i, 1);
                            if (stateObject.state.childViewDetails.attendanceDetails.length == 0) {
                                stateObject.state.summaryDataModel.SummaryResult.splice(stateObject.state.summaryResultIndex, 1);
                                stateObject.state.calendarIsOpen = false
                            }
                        }
                        else {
                            stateObject.state.childViewDetails.attendanceDetails[i].versionNumber = stateObject.state.auditDataModel.Version;
                            stateObject.state.childViewDetails.attendanceDetails[i].authStat = "A";
                        }
                    }
                }
            }
            else if (stateObject.state.serviceName == "ClassAssignment") {
                // for (let i = 0; i < stateObject.state.summaryDataModel.SummaryResult[stateObject.state.summaryResultIndex].assignmentDetails.length; i++) {
                for (let i = 0; i < stateObject.state.childViewDetails.assignmentDetails.length; i++) {
                    if (
                        stateObject.state.storedDataModel.assignmentID == stateObject.state.childViewDetails.assignmentDetails[i].assignmentID
                    ) {
                        if (stateObject.state.auditDataModel.Version == "1") {
                            stateObject.state.childViewDetails.assignmentDetails.splice(i, 1);
                            stateObject.state.summaryDataModel.SummaryResult[stateObject.state.summaryResultIndex].assignmentCount=stateObject.state.summaryDataModel.SummaryResult[stateObject.state.summaryResultIndex].assignmentCount-1;

                            if (stateObject.state.childViewDetails.assignmentDetails.length == 0) {
                                stateObject.state.summaryDataModel.SummaryResult.splice(stateObject.state.summaryResultIndex, 1);
                                stateObject.state.calendarIsOpen = false
                            }
                        }
                        else {
                            stateObject.state.childViewDetails.assignmentDetails[i].versionNumber = stateObject.state.auditDataModel.Version;
                            stateObject.state.childViewDetails.assignmentDetails[i].authStat = "A";
                        }
                    }
                }
            }
            else if (stateObject.state.serviceName == "ClassAssignmentAssessment") {
                for (let i = 0; i < stateObject.state.childViewDetails.assignments.length; i++) {
                    if (
                        stateObject.state.storedDataModel.assignmentID == stateObject.state.childViewDetails.assignments[i].assignmentID
                    ) {
                        if (stateObject.state.auditDataModel.Version == "1") {

                            stateObject.state.childViewDetails.assignments.splice(i, 1);
                            stateObject.state.summaryDataModel.SummaryResult[stateObject.state.summaryResultIndex].assessedCount=stateObject.state.summaryDataModel.SummaryResult[stateObject.state.summaryResultIndex].assessedCount-1;
                            stateObject.state.summaryDataModel.SummaryResult[stateObject.state.summaryResultIndex].notAssessedCount=stateObject.state.summaryDataModel.SummaryResult[stateObject.state.summaryResultIndex].notAssessedCount+1;

                            if (stateObject.state.childViewDetails.assignments == 0) {
                                stateObject.state.summaryDataModel.SummaryResult.splice(stateObject.state.summaryResultIndex, 1);
                                stateObject.state.isChildRecordShow = false
                            }
                        }
                        else {
                            stateObject.state.childViewDetails.assignments[i].versionNumber = stateObject.state.auditDataModel.Version;
                            stateObject.state.childViewDetails.assignments[i].authStat = "A";
                        }
                    }
                }
            }
            else if (stateObject.state.serviceName == "InstituteFeeManagement") {

                for (let i = 0; i < stateObject.state.childViewDetails.feeDetails.length; i++) {
                    if (
                        stateObject.state.storedDataModel.feeID == stateObject.state.childViewDetails.feeDetails[i].feeID
                    ) {

                        if (stateObject.state.auditDataModel.Version == "2") {
                            stateObject.state.childViewDetails.feeDetails.splice(i, 1);
                            if (stateObject.state.childViewDetails.feeDetails == 0) {
                                stateObject.state.summaryDataModel.SummaryResult.splice(stateObject.state.summaryResultIndex, 1);
                                stateObject.state.isChildRecordShow = false
                            }
                        }
                        else {
                            stateObject.state.childViewDetails.feeDetails[i].versionNumber = stateObject.state.auditDataModel.Version;
                            stateObject.state.childViewDetails.feeDetails[i].authStat = "A";
                        }
                    }
                }
            }
            else if (stateObject.state.serviceName == "TeacherLeaveManagement" && stateObject.state.userType == "A") {
                for (let i = 0; i < stateObject.state.childViewDetails.leaveDetails.length; i++) {
                    if (
                        stateObject.state.storedDataModel.referenceId == stateObject.state.childViewDetails.leaveDetails[i].referenceId
                    ) {

                        if (stateObject.state.auditDataModel.Version == "1") {
                            stateObject.state.childViewDetails.leaveDetails.splice(i, 1);
                            if (stateObject.state.childViewDetails.leaveDetails == 0) {
                                stateObject.state.summaryDataModel.SummaryResult.splice(stateObject.state.summaryResultIndex, 1);
                                stateObject.state.isChildRecordShow = false
                            }
                        }
                        else {
                            stateObject.state.childViewDetails.leaveDetails[i].versionNumber = stateObject.state.auditDataModel.Version;
                            if( stateObject.state.auditDataModel.RecordStat=='Deleted') //N0U-96  starts
                            {    
                               stateObject.state.childViewDetails.leaveDetails[i].leaveStatus = "Canceled"; 
                               stateObject.state.childViewDetails.leaveDetails[i].authStat = "A";
                            }
                            else
                            {
                                stateObject.state.childViewDetails.leaveDetails[i].authStat = "A"; ////N0U-96  ends
                            }
                        }
                    }
                }
            }
            else if (stateObject.state.serviceName == "StudentLeaveManagement" && (stateObject.state.userType == "A" || stateObject.state.userType == "T" || stateObject.state.userType == "O")) {

                for (let i = 0; i < stateObject.state.childViewDetails.leaveDetails.length; i++) {
                    if (
                        stateObject.state.storedDataModel.referenceId == stateObject.state.childViewDetails.leaveDetails[i].referenceId
                    ) { 
                          console.log('stateObject.state.auditDataModel',stateObject.state.auditDataModel);
                        if (stateObject.state.auditDataModel.Version == "1") {
                            stateObject.state.childViewDetails.leaveDetails.splice(i, 1);
                            if (stateObject.state.childViewDetails.leaveDetails == 0) {
                                stateObject.state.summaryDataModel.SummaryResult.splice(stateObject.state.summaryResultIndex, 1);
                                stateObject.state.isChildRecordShow = false
                            }
                        }
                        else {
                            stateObject.state.childViewDetails.leaveDetails[i].versionNumber = stateObject.state.auditDataModel.Version;
                            if( stateObject.state.auditDataModel.RecordStat=='Deleted') ////N0U-96  starts 
                            {    
                               stateObject.state.childViewDetails.leaveDetails[i].leaveStatus = "Canceled";
                               stateObject.state.childViewDetails.leaveDetails[i].authStat = "A";
                            }
                            else
                            {
                                stateObject.state.childViewDetails.leaveDetails[i].authStat = "A"; ////N0U-96  ends
                            }
                        }
                    }
                }
            }
            else if (stateObject.state.serviceName == "ECircular") {



                for (let i = 0; i < stateObject.state.childViewDetails.dispCircular.length; i++) {
                    if (
                        stateObject.state.storedDataModel.circularID == stateObject.state.childViewDetails.dispCircular[i].circularID
                    ) {

                        if (stateObject.state.auditDataModel.Version == "1") {
                            stateObject.state.childViewDetails.dispCircular.splice(i, 1);
                            if (stateObject.state.childViewDetails.dispCircular == 0) {
                                stateObject.state.summaryDataModel.SummaryResult.splice(stateObject.state.summaryResultIndex, 1);
                                
                                
                                stateObject.state.isChildRecordShow = false
                            }
                            if(stateObject.state.summaryDataModel.SummaryResult[stateObject.state.summaryResultIndex].circularCount>0)
                            stateObject.state.summaryDataModel.SummaryResult[stateObject.state.summaryResultIndex].circularCount=stateObject.state.summaryDataModel.SummaryResult[stateObject.state.summaryResultIndex].circularCount-1;


                        }
                        else {
                            stateObject.state.childViewDetails.dispCircular[i].versionNumber = stateObject.state.auditDataModel.Version;
                            stateObject.state.childViewDetails.dispCircular[i].authStat = "A";
                        }
                    }
                }
            }
            else if (stateObject.state.serviceName == "InstituteOtherActivity") {

                for (let i = 0; i < stateObject.state.childViewDetails.activityDetails.length; i++) {
                    if (
                        stateObject.state.storedDataModel.activityID == stateObject.state.childViewDetails.activityDetails[i].activityID
                    ) {

                        if (stateObject.state.auditDataModel.Version == "1") {
                            stateObject.state.childViewDetails.activityDetails.splice(i, 1);
                            stateObject.state.summaryDataModel.SummaryResult[alreadyExist].activityCount = stateObject.state.summaryDataModel.SummaryResult[alreadyExist].activityCount - 1;
                            if (stateObject.state.childViewDetails.activityDetails == 0) {
                                stateObject.state.summaryDataModel.SummaryResult.splice(stateObject.state.summaryResultIndex, 1);
                                stateObject.state.isChildRecordShow = false
                            }
                        }
                        else {
                            stateObject.state.childViewDetails.activityDetails[i].versionNumber = stateObject.state.auditDataModel.Version;
                            stateObject.state.childViewDetails.activityDetails[i].authStat = "A";
                        }
                    }
                }
            }
            else if (stateObject.state.serviceName == "InstitutePayment") {

                for (let i = 0; i < stateObject.state.childViewDetails.paymentDetails.length; i++) {
                    if (
                        stateObject.state.storedDataModel.paymentID == stateObject.state.childViewDetails.paymentDetails[i].paymentID
                    ) {

                        if (stateObject.state.auditDataModel.Version == "1") {
                            stateObject.state.childViewDetails.paymentDetails.splice(i, 1);
                            if (stateObject.state.childViewDetails.paymentDetails == 0) {
                                stateObject.state.summaryDataModel.SummaryResult.splice(stateObject.state.summaryResultIndex, 1);
                                stateObject.state.isChildRecordShow = false
                            }
                        }
                        else {
                            stateObject.state.childViewDetails.paymentDetails[i].versionNumber = stateObject.state.auditDataModel.Version;
                            stateObject.state.childViewDetails.paymentDetails[i].authStat = "A";
                        }
                    }
                }
            }
            else if (stateObject.state.serviceName == "TeacherNotesService") {

                for (let i = 0; i < stateObject.state.childViewDetails.notesDetails.length; i++) {
                    if (
                        stateObject.state.storedDataModel.notesID == stateObject.state.childViewDetails.notesDetails[i].notesID
                    ) {

                        if (stateObject.state.auditDataModel.Version == "1") {
                            stateObject.state.childViewDetails.notesDetails.splice(i, 1);
                            stateObject.state.summaryDataModel.SummaryResult[alreadyExist].notesCount = stateObject.state.summaryDataModel.SummaryResult[alreadyExist].notesCount - 1;
                           
                            if (stateObject.state.childViewDetails.notesDetails == 0) {
                                stateObject.state.summaryDataModel.SummaryResult.splice(stateObject.state.summaryResultIndex, 1);
                                stateObject.state.isChildRecordShow = false
                            }
                        }
                        else {
                            stateObject.state.childViewDetails.notesDetails[i].versionNumber = stateObject.state.auditDataModel.Version;
                            stateObject.state.childViewDetails.notesDetails[i].authStat = "A";
                        }
                    }
                }
            }
            else if (stateObject.state.serviceName == "StudentNotesService") {

                for (let i = 0; i < stateObject.state.childViewDetails.notesDetails.length; i++) {
                    if (
                        stateObject.state.storedDataModel.notesID == stateObject.state.childViewDetails.notesDetails[i].notesID
                    ) {

                        if (stateObject.state.auditDataModel.Version == "2") {
                            stateObject.state.childViewDetails.notesDetails.splice(i, 1);
                            stateObject.state.summaryDataModel.SummaryResult[alreadyExist].notesCount = stateObject.state.summaryDataModel.SummaryResult[alreadyExist].notesCount - 1;
                           
                            if (stateObject.state.childViewDetails.notesDetails == 0) {
                               if(stateObject.state.userType=='P' ||stateObject.state.userType=='S')
                               stateObject.state.summaryDataModel.SummaryResult.splice(stateObject.state.summaryResultIndex, 1);
                               
                               else
                                stateObject.state[ScreenUtils.getContentType(stateObject)].SummaryResult.splice(stateObject.state.summaryResultIndex, 1);
                                stateObject.state.isChildRecordShow = false
                            }
                        }
                        else {
                            stateObject.state.childViewDetails.notesDetails[i].versionNumber = stateObject.state.auditDataModel.Version;
                            stateObject.state.childViewDetails.notesDetails[i].authStat = "A";
                        }
                    }
                }
            }
            else if (stateObject.state.serviceName == "Notification") {

                for (let i = 0; i < stateObject.state.childViewDetails.notificationDetails.length; i++) {
                    if (
                        stateObject.state.storedDataModel.notificationID == stateObject.state.childViewDetails.notificationDetails[i].notificationID
                    ) {

                        if (stateObject.state.auditDataModel.Version == "1") {
                            stateObject.state.summaryDataModel.SummaryResult[alreadyExist].notificationCount = stateObject.state.summaryDataModel.SummaryResult[alreadyExist].notificationCount - 1;
                            stateObject.state.childViewDetails.notificationDetails.splice(i, 1);
                            
                            if (stateObject.state.childViewDetails.notificationDetails == 0) {
                                stateObject.state.summaryDataModel.SummaryResult.splice(stateObject.state.summaryResultIndex, 1);
                                stateObject.state.isChildRecordShow = false
                            }
                        }
                        else {
                            stateObject.state.childViewDetails.notificationDetails[i].versionNumber = stateObject.state.auditDataModel.Version;
                            stateObject.state.childViewDetails.notificationDetails[i].authStat = "A";
                        }
                    }
                }
            }
            else if (stateObject.state.serviceName == "OnlineClassroomService") {
                for (let i = 0; i < stateObject.state.childViewDetails.roomDetails.length; i++) {
                    if (
                        stateObject.state.storedDataModel.classroomID == stateObject.state.childViewDetails.roomDetails[i].classroomID
                    ) {
                        if (stateObject.state.auditDataModel.Version == "2") {
                            stateObject.state.childViewDetails.roomDetails.splice(i, 1);
                            stateObject.state.summaryDataModel.SummaryResult[alreadyExist].meetingCount = stateObject.state.summaryDataModel.SummaryResult[alreadyExist].meetingCount - 1;
                          
                            if (stateObject.state.childViewDetails.roomDetails == 0) {
                                stateObject.state.summaryDataModel.SummaryResult.splice(stateObject.state.summaryResultIndex, 1);
                                stateObject.state.isChildRecordShow = false
                            }
                        }
                        else {
                            stateObject.state.childViewDetails.roomDetails[i].versionNumber = stateObject.state.auditDataModel.Version;
                            stateObject.state.childViewDetails.roomDetails[i].authStat = "A";
                        }
                    }
                }
            }
            else {
                if (stateObject.state.auditDataModel.Version == "2") {
                    stateObject.state.summaryDataModel.SummaryResult.splice(stateObject.state.summaryResultIndex, 1);
                }
                else {
                    stateObject.state.summaryDataModel.SummaryResult[stateObject.state.summaryResultIndex].versionNumber = stateObject.state.auditDataModel.Version;
                    stateObject.state.summaryDataModel.SummaryResult[stateObject.state.summaryResultIndex].authStat = "A";
                }
            }

            break


        default:
            break;
    }
}


ScreenUtils.openToast = function (stateObject) {
    Toast.show({
        type: 'my_custom_type',
        text1: 'NewGenEducationApp',
        text2: `Newly added/modified ${stateObject.state.heading} records are available. Please click refresh button, if you want to see them`,
        visibilityTime: 4000,
    });

}


ScreenUtils.startAnimatedRefreshBtn = function (stateObject) {
    // stateObject.state.animatedStartValue.setValue(0);
    Animated.loop(
        Animated.timing(stateObject.state.animatedStartValue, {
            toValue: 1,
            duration: 2000,
            delay: 500,
            easing: Easing.linear,
            useNativeDriver: false
        })).start()
    // ScreenUtils.showAnimationRefreshBtn = false
}


ScreenUtils.stopAnimatedRefreshBtn = function (stateObject) {
    // ScreenUtils.showAnimationRefreshBtn = true
    stateObject.state.animatedStartValue.stopAnimation()

}




ScreenUtils.unMountScreen = function (stateObject) {
    try {
        
        if (CustomCacheMemory.functions.checkSummaryDataModelExistenceInCache(stateObject.state.serviceName,stateObject.state.summaryDataModel)) {

            CustomCacheMemory.functions.removeSummaryDataModelInCache(stateObject.state.serviceName,stateObject.state.summaryDataModel);
        }
        // CustomCacheMemory.functions.putSummaryDataModelToCache(stateObject.state.serviceName, stateObject.state.summaryDataModel.SummaryResult)
        CustomCacheMemory.functions.putSummaryDataModelToCache(stateObject.state.serviceName, stateObject.state.summaryDataModel)
        ScreenUtils.unMountDone = false
    }


    catch (e) {
        console.log(e, "unMountScreen")
    }
}







module.exports = {
    functions: ScreenUtils
};