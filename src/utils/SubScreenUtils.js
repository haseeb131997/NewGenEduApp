import NewOperation from "./NewOperation"
import apiCall from "./../ApiCall/ActionApi";
import cloneDeep from 'lodash/cloneDeep';
import { split } from "lodash";
import Paggination from "./Paggination"
import { httpUtils } from '../utils/HttpUtils';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import CustomCacheMemory from "../utils/CustomCacheMemory";

class SubScreenUtils { }
SubScreenUtils.removeCreateBtn = ['ClassAssignmentAssessment','HolidayMaintenance','OnlineMeetingAttendanceService','UserProfile','NotificationTemplate']
SubScreenUtils.ObjectStorageServiceName = "ObjectStorage"
SubScreenUtils.oracleURL = ""
SubScreenUtils.HOST = "https://objectstorage.uk-london-1.oraclecloud.com"
SubScreenUtils.getOracleURIStatus= true;

SubScreenUtils.copyAction = false
SubScreenUtils.parentScreenType = ['StudentTimeTable','StudentOtherActivity','StudentExamSchedule','StudentProgressCard','StudentSoftSkill','StudentFeeManagement','StudentStudyMaterial','StudentAssignment','StudentNotification','StudentPayment','StudentLeaveManagement','StudentECircular','StudentNotesService','StudentLessonPlannerService','OnlineClassroomService','OnlineClassroomService','NewStudentAssignment','StudentProfile','OnlineMeetingAttendanceService']
SubScreenUtils.parentTransactionScreens=['StudentLeaveManagement','StudentNotesService','StudentLessonPlannerService']

SubScreenUtils.createNew = function (stateObject) {

  console.log(SubScreenUtils.copyAction,"SubScreenUtils.copyAction")
  var dummyDataModel = cloneDeep(stateObject.state.emptyDataModel)
  var dummyAuditDataModel = cloneDeep(stateObject.state.emptyAuditDataModel)


  console.log(dummyDataModel,"dummyDataModel")

  if (apiCall.functions.CreateDefaultScreen.includes(stateObject.state.serviceName)) {
    stateObject.setState({
      currentOperation: 'Create-Default',
      currentStep: 0,
      // dataModel: dummyDataModel,
      // auditDataModel: dummyAuditDataModel,
      dataModel: SubScreenUtils.copyAction ? stateObject.state.dataModel : dummyDataModel,
      auditDataModel: SubScreenUtils.copyAction ? stateObject.state.auditDataModel : dummyAuditDataModel,
      editable: false,
      errorField: [],
      remarks: '',
      editable: false,
      primaryKeyEditable: false,
    }, () => {      
      NewOperation.functions.screenEventHandler(stateObject)
    })

  }
  else {
    stateObject.setState({
      currentOperation: 'Create',
      currentStep: 1, // for reset to 1st  form
      // dataModel: dummyDataModel,
      // auditDataModel: dummyAuditDataModel,
      dataModel: SubScreenUtils.copyAction ? stateObject.state.dataModel : dummyDataModel,
      auditDataModel: SubScreenUtils.copyAction ? stateObject.state.auditDataModel : dummyAuditDataModel,
      editable: false,
      errorField: [],
      remarks: '',
      editable: false,
      primaryKeyEditable: false,

    }, () => {
      if (stateObject.state.currentStep != 1) {
        NewOperation.functions.screenEventHandler(stateObject)
      }
    })

    SubScreenUtils.copyAction = false
  }



}


SubScreenUtils.search = function (stateObject) {
  stateObject.parentStateChange({
    currentOperation: 'Search',
    summaryResultByFilter: []
  })
}


SubScreenUtils.refreshFilter = function (stateObject) {

  var dummyDataModel = cloneDeep(stateObject.state.emptyDataModel)
  var dummySummaryDataModel = cloneDeep(stateObject.state.emptySummaryDataModel)
  var dummyAuditDataModel = cloneDeep(stateObject.state.emptyAuditDataModel)

  if(stateObject.state.userType == 'P' || stateObject.state.userType == 'S')
  {

    dummySummaryDataModel.filter.studentName = stateObject.state.summaryDataModel.filter.studentName
    dummySummaryDataModel.filter.studentID = stateObject.state.summaryDataModel.filter.studentID
    
    if (SubScreenUtils.parentScreenType.includes(stateObject.state.serviceName) && 
SubScreenUtils.parentTransactionScreens.includes(stateObject.state.serviceName))
 {
  stateObject.setState({
    dataModel: dummyDataModel,
    summaryDataModel: dummySummaryDataModel,
    auditDataModel: dummyAuditDataModel,
    currentOperation: 'SummaryQuery',
    intialFetching: true,
  }, () => {
    NewOperation.functions.ParentTransactionScreenSummaryQuery(stateObject)
  }) 
   }
 else
 {   
    stateObject.setState({
      dataModel: dummyDataModel,
      summaryDataModel: dummySummaryDataModel,
      auditDataModel: dummyAuditDataModel,
      currentOperation: 'SummaryQuery',
      intialFetching: true,
    }, () => {
      NewOperation.functions.search(stateObject)
    })
  }
}
  else
{
  stateObject.setState({
    dataModel: dummyDataModel,
    summaryDataModel: dummySummaryDataModel,
    auditDataModel: dummyAuditDataModel,
    currentOperation: 'SummaryQuery',
    intialFetching: true,
  }, () => {
    NewOperation.functions.refreshScreen(stateObject)
  })
}
}

// SubScreenUtils.getCurrentOperation = function (stateObject){
//  if((stateObject.state.userType == 'P' || stateObject.state.userType == 'S') && stateObject.state.serviceName == 'StudentNotesService' ){
//   return ''
//  }
//  else{

//  }
// }   




SubScreenUtils.closeModal = async function (stateObject) {



 await stateObject.parentStateChange({
    currentOperation: 'SummaryQuery',
    currentStep: 1,
    showComplete: false,
    viewDetail: null,
    calendarRefresh: true,
    calendarEmptyRefresh: false,
    showAlert: false

  })

  Paggination.functions.editModalone = false
  Paggination.functions.editModaltwo = false
  Paggination.functions.editModalThree = false
  Paggination.functions.editModalFour = false

  // if (stateObject.state.summaryDataModel.SummaryResult.length == 0) {
  //   NewOperation.functions.screenEventHandler()
  // }

  // if (stateObject.state.currentOperation == 'Create' && stateObject.state.summaryDataModel.SummaryResult.length == 0) {
  //   NewOperation.functions.screenEventHandler()
  // }


 

}


SubScreenUtils.calendarCloseModal = function (stateObject) {
  stateObject.parentStateChange({
    calendarRefresh: true,
    calendarEmptyRefresh: false,
    calendarLoaditems: {},
    calendarIsOpen: false,
    currentOperation : 'SummaryQuery'
  })
}

SubScreenUtils.instituteCloseModal = function (stateObject) {
  stateObject.parentStateChange({
    showComplete: false,
    secondModalVisible: false,
    logoModalVisible: false

  })

  Paggination.functions.selectedIndex = null
}


SubScreenUtils.getTimeValue = function (hour, min) {
  if (hour != '' && min != '') {
    return `${hour}:${min}`
  }
  else {
    return ''
  }

}


SubScreenUtils.setTimeValue = function (value) {
  var hour = ''
  var min = ''
  var time = value.split(':')
  hour = time[0]
  min = time[1]
  return { hour, min }
}







SubScreenUtils.deleteCall = async (stateObject) => {

  var data = stateObject.state.viewDetail

  for (let value of stateObject.state.primaryKeyCols) {
    stateObject.state.dataModel[value] = data[value];
  }

  switch (data['authStat']) {

    case "A":

      stateObject.state.auditDataModel.AuthStat = "Authorised";

      break;

    case "U":

      stateObject.state.auditDataModel.AuthStat = "Unauthorised";

      break;

    case "R":

      stateObject.state.auditDataModel.AuthStat = "Rejected";

      break;

  }

  stateObject.state.auditDataModel.RecordStat = "Open";

  stateObject.state.auditDataModel.Version = data['versionNumber'];

  stateObject.state.auditDataModel.MakerID = data['makerID'];



  if (stateObject.state.auditDataModel.AuthStat == "Authorised") {

    //         await fullViewCall(stateObject,data, "noModal");

    // await NewOperation.functions.singleRecordView(stateObject)
    await NewOperation.functions.view(stateObject)


    if (!apiCall.functions.apiError) {

      //             await mainsleep(1000);

      stateObject.state.currentOperation = "Deletion";

      NewOperation.functions.delete(stateObject);

    }

  }
  else{
    stateObject.state.currentOperation = "Deletion";

    NewOperation.functions.delete(stateObject);
  }

  /*
 
  stateObject.state.currentOperation = "Delete";
 
  screenEventHandler($scope);
 
  */

}





SubScreenUtils.closeChildListModal = function (stateObject) {
  stateObject.parentStateChange({
    isChildRecordShow: false,
    currentOperation : 'SummaryQuery'
  })
}


SubScreenUtils.viewDetails = async function (stateObject, rowData, index, childArrayName, dispArrayName) {

  var globalData = JSON.parse(await AsyncStorage.getItem('GLOBAL'));

  var filenameArray = []
  stateObject.state.currentOperation = "SecondLevel";
  stateObject.state.childViewDetails = rowData

  await NewOperation.functions.screenEventHandler(stateObject);

  stateObject.state.childViewDetails[dispArrayName] = []


  var iterate = stateObject.state.childViewDetails[childArrayName]

  for (let i = 0; i < iterate.length && i < 10; i++) {
    if (!iterate[i].contentPath.includes("CohesiveUpload")) {
      var filename = iterate[i].contentPath.substr(iterate[i].contentPath.lastIndexOf('/') + 1, iterate[i].contentPath.length);
      var obj = {
        filename: filename
      };
      filenameArray.push(obj);
    }

    stateObject.state.childViewDetails[dispArrayName].push(iterate[i])
  }



  stateObject.parentStateChange({
    isLoading: true,
    isChildRecordShow: true,
  })

  await SubScreenUtils.getOracleUrl_Util(filenameArray, stateObject);

  const result_oracleURI = new Map();


  for (let j = 0; j < SubScreenUtils.oracleURL.length; j++) {
    result_oracleURI.set(SubScreenUtils.oracleURL[j].fileName, SubScreenUtils.HOST + SubScreenUtils.oracleURL[j].URI);

  }

  for (let i = 0; i < iterate.length && i < 10; i++) {
    if (!stateObject.state.childViewDetails[dispArrayName][i].contentPath.includes("CohesiveUpload")) {
      var filename = stateObject.state.childViewDetails[dispArrayName][i].contentPath.substr(stateObject.state.childViewDetails[dispArrayName][i].contentPath.lastIndexOf('/') + 1, stateObject.state.childViewDetails[dispArrayName][i].contentPath.length);
      stateObject.state.childViewDetails[dispArrayName][i].contentPath = result_oracleURI.get(filename);

    }
  }

  if (stateObject.state.serviceName == 'ECircular') {
    for (let i = 0; i < stateObject.state.childViewDetails[dispArrayName].length; i++) {
      stateObject.state.childViewDetails[dispArrayName][i].instituteID = globalData.instituteID
    }
  }


  if (stateObject.state.childViewDetails[childArrayName].length > stateObject.state.childViewDetails[dispArrayName].length) {
    stateObject.state.customLoadMore = true
  }
  else {
    stateObject.state.customLoadMore = false
  }


  console.log(stateObject.state.childViewDetails, "stateObject.state.childViewDetails")


  if (apiCall.functions.apiError) {
    stateObject.parentStateChange({
      isLoading: false,
      isChildRecordShow: false,
    })
  }
  else {
    stateObject.parentStateChange({
      summaryResultIndex: index,
      // isChildRecordShow: true,
      childViewDetails: stateObject.state.childViewDetails,
      isLoading: false,
      currentOperation: '',
      customLoadMore: stateObject.state.customLoadMore
    })
  }
}





SubScreenUtils.getOracleUrl_Util = async function (p_fileNameWithExtension, stateObject) {

  SubScreenUtils.getOracleURIStatus = true;

  // var HOST = "https://objectstorage.uk-london-1.oraclecloud.com";

  var globalData = JSON.parse(await AsyncStorage.getItem('GLOBAL'));

  var resToken = ''
  await apiCall.functions.getServiceToken(SubScreenUtils.ObjectStorageServiceName).then(
    async (values) => {
      if (values == null) {
        await apiCall.functions.callRequestToken(globalData, SubScreenUtils.ObjectStorageServiceName)
        await apiCall.functions.getServiceToken(SubScreenUtils.ObjectStorageServiceName).then((token) => {
          resToken = token;
          return
        })
      }
      // resToken = values;
      else {
        resToken = values;
      }
      //console.log('Then: ',resToken);
    });


  SubScreenUtils.oracleURL = "";
  var data = {
    body: {
      filename: p_fileNameWithExtension,
      instituteID: globalData.instituteID,
      token: resToken,
      userID: globalData.userID,
      service: SubScreenUtils.ObjectStorageServiceName
    }
  };

  try {


    await axios({
      method: "put",
      url: httpUtils.getURL('GetUri', 'GetUri'),
      headers: {
        'Content-Type': 'application/json'
      },
      // data: JSON.stringify(data),
      data: data,
      // cancelToken: apiCall.getApiCancelToken(service),

    },
    )
      .then(response => {
        console.log(response, 'getAuthHeader response')
        // stateObject.parentStateChange({
        //   isLoading: false
        // })
        if (response.data.header.status == "success") {
          SubScreenUtils.getOracleURIStatus = true;
          if (typeof p_fileNameWithExtension == 'string') {
            SubScreenUtils.oracleURL = SubScreenUtils.HOST + response.data.body[0].URI;
          }
          else {
            SubScreenUtils.oracleURL = response.data.body[0].URI;
          }
          // SubScreenUtils.oracleURL = SubScreenUtils.HOST + response.data.body[0].URI;

        } else {
          SubScreenUtils.getOracleURIStatus = false;
          //  changeOnProgress = true;
          //$('#' + elmentName).filestyle('clear');
          var error = [{
            errorCode: response.data.error[0].errorCode,
            errorMessage: response.data.error[0].errorMessage
          }];
          stateObject.parentStateChange({
            // isLoading: false,
            error: error,
            errorType: 'BE',
            showAlert: true
          })
          // returnValue = false;
          return false
        }
        // returnValue = true;
        return true
      })
      .catch(function (error) {
        SubScreenUtils.getOracleURIStatus = false;
        console.log(error, ' error')
        error = [{
          errorCode: "ERR",
          errorMessage: "Please try again"
        }];
        stateObject.parentStateChange({
          // isLoading: false,
          error: error,
          errorType: 'BE',
          showAlert: true
        })
        //console.log(error.code, 'call request error code')
      });



  }
  catch (ex) {
    // returnValue = false;
    return false;
  }
}



SubScreenUtils.parentSummaryData = async function (stateObject) {
  try {
    await NewOperation.functions.checkRefreshRequired(stateObject);
    if(stateObject.state.showAnimationRefreshBtn == false){
        // var StudentSearchResult = JSON.parse(sessionStorage.getItem('StudentSearchService'));
         var StudentSearchResult = JSON.parse(await AsyncStorage.getItem('StudentSearchService'));
        var studentList =StudentSearchResult.searchResults;
        for(let i=0; i<studentList.length; i++){
            var studentID = studentList[i].StudentId;
            CustomCacheMemory.functions.removeStudentSearchResultInCache(studentID, stateObject.state.summaryService);
        }
        
    }
    console.log('stateObject.state.summaryDataModel.filter.studentID',stateObject.state.summaryDataModel.filter.studentID)
    if(CustomCacheMemory.functions.checkStudentExistInCache(stateObject.state.summaryDataModel.filter.studentID,stateObject.state.summaryService)){
      console.log('inside parent cache exsitence')
      if((stateObject.state.userType == 'P' || stateObject.state.userType == 'S') && 
SubScreenUtils.parentScreenType.includes(stateObject.state.serviceName) && 
SubScreenUtils.parentTransactionScreens.includes(stateObject.state.serviceName))
{
  stateObject.state.summaryDataModel = CustomCacheMemory.functions.getStudentSearchResultInCache(stateObject.state.summaryDataModel.filter.studentID, stateObject.state.summaryService);
      stateObject.parentStateChange({ displayContent:"summaryResultByFilter",
      summaryDataModel:stateObject.state.summaryDataModel })
}
else{
      stateObject.state.summaryResultByFilter = {};
      stateObject.state.summaryResultByFilter.SummaryResult = CustomCacheMemory.functions.getStudentSearchResultInCache(stateObject.state.summaryDataModel.filter.studentID, stateObject.state.summaryService);
      stateObject.parentStateChange({ displayContent:"summaryResultByFilter",
      summaryResultByFilter:stateObject.state.summaryResultByFilter })}
  }
  else{
    console.log('inside apicall due to non  cache exsitence')
   // if(stateObject.state.summaryService == 'StudentLeaveManagementSummary'){
if((stateObject.state.userType == 'P' || stateObject.state.userType == 'S') && 
SubScreenUtils.parentScreenType.includes(stateObject.state.serviceName) && 
SubScreenUtils.parentTransactionScreens.includes(stateObject.state.serviceName))
 {
   await  NewOperation.functions.ParentTransactionScreenSummaryQuery(stateObject)
    }
 else   
    {
      await  NewOperation.functions.search(stateObject)
    }
   
      // await screenEventHandler($scope);
  }
}
  catch (e) {
    console.log(e, "error")
  }
}



module.exports = {
  functions: SubScreenUtils
};
