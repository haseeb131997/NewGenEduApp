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

/* * * Change Tag:NEW3.01
Change Desc:  Mobile :- and new navigation code 
Changed By : Shashank
Date:17-09-2021 
*/

/* * * Change Tag:NEW3.02
Change Desc:  Mobile :- get the index from array
Changed By : Shashank
Date:25-09-2021 
*/

/* * * Change Tag:NEW3.03
Change Desc:  Mobile :-  _getRandomColor for Vertical line
Changed By : Shashank
Date:26-09-2021 
*/

/* * * Change Tag:NEW3.04
Change Desc:  Mobile :-  for change the serchType  and handling the search and show more
Changed By : Shashank
Date:30-09-2021 
*/

/* * * Change Tag:NEW3.05
Change Desc:  Mobile :-  for get validation error massage
Changed By : Shashank
Date:08-10-2021 
*/

/* * * Change Tag:NEW3.06
Change Desc:  Mobile :-  for  get profile image path 
Changed By : Shashank
Date:08-10-2021 
*/

/* * * Change Tag:3.0 UI/UX
Change Desc:  Mobile :-  change case for create default
Changed By : Shashank
Date:10-10-2021 
*/






import { Platform } from 'react-native';

import AsyncStorage from "@react-native-async-storage/async-storage";
import Exception from '../utils/Exception'
import moment from "moment";
// import { Actions } from "react-native-router-flux";
import apiCall from "../ApiCall/ActionApi";
import SelectListUtils from "../utils/SelectListUtils";
import cloneDeep from 'lodash/cloneDeep';

import { UiColor } from "../theme";
// import NewOperation from "../utils/NewOperation";
import Validator from '../utils/Validator'
import ExceptionArray from '../utils/Exception.json'
import { httpUtils } from '../utils/HttpUtils';
import { CommonActions ,StackActions} from '@react-navigation/native';
import CustomCacheMemory from "../utils/CustomCacheMemory";




class GeneralUtils { }


// drawerList

GeneralUtils.logOut = false
GeneralUtils.ChangeInstitute = false
GeneralUtils.prevParent = {}
GeneralUtils.goToStripe = false
GeneralUtils.goToCart = false
GeneralUtils.subscribtionLoaded = false
//  start  NEAI2-68
GeneralUtils.selectedOperation = "Default"
//  end  NEAI2-68
// starts 
GeneralUtils.video_classroom_vendor_config = "Whereby"
GeneralUtils.video_meeting_vendor_config = "Whereby"

// ends
// starts NEW3.03
// GeneralUtils.bgColor = [UiColor.LIGHT_SKYBLUE,UiColor.LIGHT_SUCCESS_COLOR,UiColor.LIGHT_ERROR_COLOR,UiColor.LIGHT_WARNING_COLOR]
GeneralUtils.bgColor = [UiColor.SKYBLUE, UiColor.SUCCESS_COLOR, UiColor.WARNING_COLOR, UiColor.VOILET_COLOR]
// ends NEW3.03

GeneralUtils.summaryError = false
// starts 3.0 UI/UX
GeneralUtils.drawerList = []
GeneralUtils.version_in_API = '3'

GeneralUtils.deleteInProgress = false
GeneralUtils.contentPath = ''
// GeneralUtils.showParticipationTab = null
GeneralUtils.showCompletion = false
GeneralUtils.uploadEventImage = false
GeneralUtils.globalHeadarData = {
  instituteName:'',
  logoImagePath:'',
  token1:'',
  userID:'',
  instituteID:'',
  token0:'',
  profileImagePath:'',
  userName:'',
  emailId:''
}

GeneralUtils.unSaveBtnStatus = false
GeneralUtils.drawerStatObject = null



// ends 3.0 UI/UX


GeneralUtils.numberOfSteps = [
  {
    operation: 'Default',
    numberOfSteps: 3
  },
  {
    operation: 'Create',
    numberOfSteps: 3
  },
  {
    operation: 'Query',
    numberOfSteps: 4
  },
  {
    operation: 'Modification',
    numberOfSteps: 4
  },
  {
    operation: 'Deletion',
    numberOfSteps: 4
  },
  {
    operation: 'Authorisation',
    numberOfSteps: 4
  },
  {
    operation: 'Report',
    numberOfSteps: 2
  },
  {
    operation: 'ReadOnly',
    numberOfSteps: 2
  },
  {
    operation: 'ReadOnlyWithDatatable',
    numberOfSteps: 3
  },
  // start NEAI2-68
  {
    operation: 'CreateWithQuery',
    numberOfSteps: 3
  },
  // end NEAI2-68
  // start SHA030921
  {
    operation: 'startClassroom',
    numberOfSteps: 2
  },
  {
    operation: 'joinClassroom',
    numberOfSteps: 2
  },
  // end SHA030921
]

GeneralUtils.Default = [
  {
    operation: 'Default',
    step: 0,
    InstructionHeading: "Step1: Select Operation",
    instructionText: [
      {
        text: "Please select the operation which you want to perform on student profile"
      },
    ]
  },
]

GeneralUtils.setNumberOfSteps = function (operation, numberOfSteps) {
  for (let value of GeneralUtils.numberOfSteps) {
    if (value.operation == operation) {
      value.numberOfSteps = numberOfSteps
    }
  }
}
GeneralUtils.getNumberOfSteps = function (operation) {
  for (let value of GeneralUtils.numberOfSteps) {
    if (value.operation == operation) {
      return value.numberOfSteps
    }
  }

}
GeneralUtils.getYouTubeCode = (url) => {
  //  var url = 'https://www.youtube.com/watch?v=liJVSwOiiwg'
  var link = ''
  if (url != undefined) {
    if (url.includes('embed')) {
      link = url.substr(url.indexOf('embed/') + 6)
    }
    if (url.includes('watch')) {
      link = url.substr(url.indexOf('=') + 1)
    }
    if (url.includes('youtu.be')) {
      link = url.substr(url.lastIndexOf('/') + 1)
    }
  }


  return link


}

GeneralUtils.frameYoutubeURL = (actualURL) => {
  if (actualURL.toLowerCase().includes("youtube") || actualURL.toLowerCase().includes("youtu.be")) {
    if (actualURL.toLowerCase().includes("="))
      var startPosofID = actualURL.lastIndexOf("=");
    else
      var startPosofID = actualURL.lastIndexOf("/");
    var ID = actualURL.substr(startPosofID + 1, actualURL.length - startPosofID);
    var dummy = "https://www.youtube.com/embed/";
    var youtubeURL = dummy.concat(ID);
    return youtubeURL;
  }
  return actualURL;
}





GeneralUtils.getInstruction = function (operation, step, InstructionList) {
  var i = 0

  for (let item of InstructionList) {
    if (item.step == step && item.operation == operation) {
      return item.instructionText
    }
    i = i++
  }
  return ''
}

GeneralUtils.getInstructionHeading = function (operation, step, InstructionList) {
  var i = 0
  for (let item of InstructionList) {
    if (item.step == step && item.operation == operation) {
      return item.InstructionHeading
    }
    i = i++
  }
  return ''
}

GeneralUtils.getScreenheading = function (stateObject) {


  switch (stateObject.state.currentOperation) {
    case 'Create': return stateObject.state.heading + ' ' + 'Creation'
      break
    case 'Query': return stateObject.state.heading + ' ' + 'View'
      break
    case 'Modification': return stateObject.state.heading + ' ' + 'Edit'

      break

    case 'Deletion': return stateObject.state.heading + ' ' + 'Delete'

      break
    case 'Authorisation': return stateObject.state.heading + ' ' + 'Authorize'

      break
    case 'Report': return stateObject.state.heading

      break
    case 'ReadOnly': return stateObject.state.heading

      break
    case 'ReadOnlyWithDatatable': return stateObject.state.heading

      break
    // start NEAI2-68
    case 'CreateWithQuery': return stateObject.state.heading + ' ' + 'Creation'
      // end NEAI-68
      break
    // starts SHA030921
    case 'startClassroom': return stateObject.state.heading
      break
    case 'joinClassroom': return stateObject.state.heading
      break
    // ends SHA030921

    case 'Default': return stateObject.state.heading


  }
}

GeneralUtils.getMonthName = function (month) {

  switch (month) {
    case '1': return 'Jan'
      break
    case '2': return 'Feb'
      break
    case '3': return 'Mar'

      break

    case '4': return 'Apr'

      break
    case '5': return 'May'

      break
    case '6': return 'Jun'

      break
    case '7': return 'Jul'

      break
    case '8': return 'Aug'

      break
    case '9': return 'Sep'

      break
    case '10': return 'Oct'

      break
    case '11': return 'Nov'

      break
    case '12': return 'Dec'
      break

    case 'Default': return ''
  }
}


GeneralUtils.getMonthFullName = function (month) {

  switch (month) {
    case '1': return 'January'
      break
    case '2': return 'February'
      break
    case '3': return 'March'

      break

    case '4': return 'April'

      break
    case '5': return 'May'

      break
    case '6': return 'June'

      break
    case '7': return 'July'

      break
    case '8': return 'August'

      break
    case '9': return 'September'

      break
    case '10': return 'October'

      break
    case '11': return 'November'

      break
    case '12': return 'December'
      break

    case 'Default': return ''
  }
}

GeneralUtils.getDayName = function (date) {
  var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  var d = new Date(moment(date, 'DD-MM-YYYY'));
  var dayName = days[d.getDay()];
  return dayName
}


GeneralUtils.getDayName = function (date) {
  var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  var d = new Date(moment(date, 'DD-MM-YYYY'));
  var dayName = days[d.getDay()];
  return dayName
}

GeneralUtils.goToDashboardScreen = function (userType, stateObject) {
  console.log(userType, "userType")
  switch (userType) {
    case 'A':
      // starts NEW3.01
      // Actions.Dashboard();
      stateObject.props.navigation.navigate('Dashboard')
      // ends NEW3.01
      break
    case 'O':
      // starts NEW3.01
      // Actions.TeacherDashboard();
      stateObject.props.navigation.navigate('TeacherDashboard')
      // ends NEW3.01
      break
    case 'T':
      // starts NEW3.01
      // Actions.TeacherDashboard();
      stateObject.props.navigation.navigate('TeacherDashboard')
      // ends NEW3.01
      break
    case 'S':
      // Actions.StudentDashboard();
      stateObject.props.navigation.navigate('StudentDashboard')
      break
    case 'P':
      // Actions.StudentDashboard();
      stateObject.props.navigation.navigate('StudentDashboard')
      break
  }
}

// GeneralUtils.errerScreen = function () {
//   Actions.ErrorScreen()
// }

GeneralUtils.setLogout = async function () {
  GeneralUtils.logOut = true
}


GeneralUtils.logOutBtn = async function (stateObject) {
  try {
    CustomCacheMemory.functions.storeCacheToLocalStorage()
    // NEAI-229
    AsyncStorage.removeItem('GLOBAL')
    AsyncStorage.removeItem('Rst')
    AsyncStorage.removeItem('selectBox')
    await AsyncStorage.getAllKeys()
      .then(keys => {
        for (let item of keys) {
          // start NEAI-276
          // if (!item.includes('DashboardModel')) {
          //   AsyncStorage.removeItem(item)
          // }

          if (!item.includes('DashboardModel') && !item.includes('userID')) {
            AsyncStorage.removeItem(item)
          }
          // end NEAI-276
        }
      }
      )

      // const logOutPress = () => {
      //   try {
      //     auth()
      //       .signOut()
      //       .then(() => {
      //         const resetAction = StackActions.reset({
      //           index: 0,
      //           actions: [NavigationActions.navigate({ routeName: "Login" })],
      //         });
      //         navigation.dispatch(resetAction);
      //         alert("You have signed out");
      //       });
      //   } catch (error) {
      //     console.log("err", error);
      //   }
      // };

    await GeneralUtils.setLogout().then(() => {
      apiCall.functions.dashboardCancelToken.cancel('DashBoard Api is being canceled');
      SelectListUtils.functions.abortController.abort()
      // start NEAI-171
      apiCall.functions.cancelToken.cancel('Api is being canceled');
      // end NEAI-171
      // start  NEAI-176
      apiCall.functions.selectMasterCancelToken.cancel('selectMasterCancelToken is being canceled');
      // end  NEAI-176
      // starts NEW3.01
      // Actions.Login()
      // stateObject.props.navigation.navigate('Login')
      stateObject.navigation.dispatch(
        StackActions.reset({
          index: 0,
          routes: [
            { name: 'Login' }
          ],
        })
      );
      // ends NEW3.01
    })
  }
  // start  NEAI-229
  catch (err) {
    // starts NEW3.01      
    // Actions.Login()
    stateObject.props.navigation.navigate('Login')
    // ends NEW3.01
  }
  // end  NEAI-229
}

GeneralUtils.deepComparison = function (object1, object2) {
  return isEqual(object1, object2)
}

GeneralUtils.deepEqual = function (object1, object2) {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  if (keys1.length !== keys2.length) {
    return false;
  }
  for (const key of keys1) {
    const val1 = object1[key];
    const val2 = object2[key];
    const areObjects = GeneralUtils.isObject(val1) && GeneralUtils.isObject(val2);
    if (
      areObjects && !GeneralUtils.deepEqual(val1, val2) || !areObjects && val1 !== val2
    ) {
      return false;
    }
  }
  return true;
}
GeneralUtils.isObject = function (object) {
  return object != null && typeof object === 'object';
}


GeneralUtils.getPrevParent = function () {
  return GeneralUtils.prevParent
}

GeneralUtils.setPrevParent = function (object) {
  // var dummyObject = cloneDeep(object)
  GeneralUtils.prevParent = object
}



GeneralUtils.checkSelectMaster = function (stateObject) {

  if (stateObject.state.serviceName == 'InstituteFeeManagement' && SelectListUtils.functions.selectMaster.FeeMaster.length == 0) {
    stateObject.parentStateChange({
      isLoading: true
    })
    setTimeout(() => {
      stateObject.parentStateChange({
        isLoading: false
      })
      if (SelectListUtils.functions.selectMaster.FeeMaster.length == 0) {
        Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-048', errorMessage: '', errorParam: '' }])
        return false
      }

    }, 30000);
  }
  else if (stateObject.state.serviceName == 'StudentFeeManagement' && SelectListUtils.functions.selectMaster.FeeMaster.length == 0) {
    stateObject.parentStateChange({
      isLoading: true
    })
    setTimeout(() => {
      stateObject.parentStateChange({
        isLoading: false
      })
      if (SelectListUtils.functions.selectMaster.FeeMaster.length == 0) {
        Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-048', errorMessage: '', errorParam: '' }])
        return false
      }
    }, 30000);


  }
  else if (stateObject.state.serviceName == 'ClassMark' && (SelectListUtils.functions.selectMaster.SubjectMaster.length == 0 || SelectListUtils.functions.selectMaster.ExamMaster.length == 0)) {
    stateObject.parentStateChange({
      isLoading: true
    })
    setTimeout(() => {
      stateObject.parentStateChange({
        isLoading: false
      })
      if (SelectListUtils.functions.selectMaster.SubjectMaster.length == 0 || SelectListUtils.functions.selectMaster.ExamMaster.length == 0) {
        Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-048', errorMessage: '', errorParam: '' }])
        return false
      }
    }, 30000);
  }
  else if (stateObject.state.serviceName == 'InstituteAssignment' && SelectListUtils.functions.selectMaster.SubjectMaster.length == 0) {
    stateObject.parentStateChange({
      isLoading: true
    })
    setTimeout(() => {
      stateObject.parentStateChange({
        isLoading: false
      })
      if (SelectListUtils.functions.selectMaster.SubjectMaster.length == 0) {
        Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-048', errorMessage: '', errorParam: '' }])
        return false
      }
    }, 30000);
  }

  else if (stateObject.state.serviceName == 'StudentProgressCard' && (SelectListUtils.functions.selectMaster.SubjectMaster.length == 0 || SelectListUtils.functions.selectMaster.ExamMaster.length == 0)) {
    stateObject.parentStateChange({
      isLoading: true
    })
    setTimeout(() => {
      stateObject.parentStateChange({
        isLoading: false
      })
      if (SelectListUtils.functions.selectMaster.SubjectMaster.length == 0 || SelectListUtils.functions.selectMaster.ExamMaster.length == 0) {
        Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-048', errorMessage: '', errorParam: '' }])
        return false
      }
    }, 30000);
  }
  else if (stateObject.state.serviceName == 'StudentAssignment' && SelectListUtils.functions.selectMaster.SubjectMaster.length == 0) {
    stateObject.parentStateChange({
      isLoading: true
    })
    setTimeout(() => {
      stateObject.parentStateChange({
        isLoading: false
      })
      if (SelectListUtils.functions.selectMaster.SubjectMaster.length == 0) {
        Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-048', errorMessage: '', errorParam: '' }])
        return false
      }
    }, 30000);
  }


  else if (stateObject.state.serviceName == 'ClassExamSchedule' && (SelectListUtils.functions.selectMaster.SubjectMaster.length == 0 || SelectListUtils.functions.selectMaster.ExamMaster.length == 0)) {
    stateObject.parentStateChange({
      isLoading: true
    })
    setTimeout(() => {
      stateObject.parentStateChange({
        isLoading: false
      })
      if (SelectListUtils.functions.selectMaster.SubjectMaster.length == 0 || SelectListUtils.functions.selectMaster.ExamMaster.length == 0) {
        Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-048', errorMessage: '', errorParam: '' }])
        return false
      }
    }, 30000);
  }

  else if (stateObject.state.serviceName == 'ClassTimeTable' && SelectListUtils.functions.selectMaster.SubjectMaster.length == 0) {
    stateObject.parentStateChange({
      isLoading: true
    })
    setTimeout(() => {
      stateObject.parentStateChange({
        isLoading: false
      })
      if (SelectListUtils.functions.selectMaster.SubjectMaster.length == 0) {
        Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-048', errorMessage: '', errorParam: '' }])
        return false
      }
    }, 30000);
  }

  else if (stateObject.state.serviceName == 'ClassSoftSkill' && SelectListUtils.functions.selectMaster.ExamMaster.length == 0) {
    stateObject.parentStateChange({
      isLoading: true
    })
    setTimeout(() => {
      stateObject.parentStateChange({
        isLoading: false
      })
      if (SelectListUtils.functions.selectMaster.ExamMaster.length == 0) {
        Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-048', errorMessage: '', errorParam: '' }])
        return false
      }

    }, 30000);
  }

  else if (stateObject.state.serviceName == 'StudentExamSchedule' && SelectListUtils.functions.selectMaster.ExamMaster.length == 0) {
    stateObject.parentStateChange({
      isLoading: true
    })
    setTimeout(() => {
      stateObject.parentStateChange({
        isLoading: false
      })
      if (SelectListUtils.functions.selectMaster.ExamMaster.length == 0) {
        Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-048', errorMessage: '', errorParam: '' }])
        return false
      }
    }, 30000);
  }

  else if (stateObject.state.serviceName == 'StudentSoftSkill' && SelectListUtils.functions.selectMaster.ExamMaster.length == 0) {
    stateObject.parentStateChange({
      isLoading: true
    })
    setTimeout(() => {
      stateObject.parentStateChange({
        isLoading: false
      })
      if (SelectListUtils.functions.selectMaster.ExamMaster.length == 0) {
        Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-048', errorMessage: '', errorParam: '' }])
        return false
      }
    }, 30000);
  }

}




GeneralUtils.fnDefaultandValidateAudit = async function (stateObject) {
  var globalData = JSON.parse(await AsyncStorage.getItem('GLOBAL'));
  const { auditDataModel } = stateObject.state
  var selectedOperation
  if (stateObject.state.currentOperation == "Authorisation") {
    if (apiCall.functions.bottomTabClick == 'Auth') {
      selectedOperation = stateObject.state.currentOperation
    }
    else {
      selectedOperation = 'Reject'
    }
  }
  else {
    selectedOperation = stateObject.state.currentOperation
  }


  console.log("fnDefaultandValidateAudit",stateObject.state.currentOperation)
  console.log("fnDefaultandValidateAudit" ,selectedOperation)
  switch (selectedOperation) {
    case 'Query':
      //return true;
      break;
    case 'Create':
      ////console.log('defaul audit')
      //if (auditDataModel ==null) 
      //auditDataModel = new Object();
      auditDataModel.MakerID = globalData.userID;
      auditDataModel.AuthStat = 'Unauthorised';
      if (stateObject.state.remarks != null && stateObject.state.remarks != '') {
        auditDataModel.MakerRemarks = stateObject.state.remarks;
      }
      // auditDataModel.MakerRemarks = '';
      auditDataModel.CheckerRemarks = '';
      auditDataModel.MakerDtStamp = '';
      auditDataModel.CheckerDtStamp = '';
      auditDataModel.CheckerID = '';
      auditDataModel.Version = "1";
      auditDataModel.RecordStat = 'Open';
      ////console.log('return true')
      return true;
      break;

    // starts 3.0 UI/UX
    // case 'Default':
    case 'Create-Default':
      // ends 3.0 UI/UX
      //if (auditDataModel ==null) 
      //auditDataModel = new Object();
      auditDataModel.MakerID = globalData.userID;
      auditDataModel.AuthStat = 'Unauthorised';
      auditDataModel.MakerRemarks = '';
      auditDataModel.CheckerRemarks = '';
      auditDataModel.MakerDtStamp = '';
      auditDataModel.CheckerDtStamp = '';
      auditDataModel.CheckerID = '';
      auditDataModel.Version = "1";
      auditDataModel.RecordStat = 'Open';
      return true;
      break;

    case 'Modification':
      if (auditDataModel.RecordStat != 'Open') {
        Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-008', errorMessage: '', errorParam: '' }])
        // fn_Show_Exception('FE-VAL-008');
        return false;
      }

      if (auditDataModel.AuthStat == 'Unauthorised') {
        if (auditDataModel.MakerID != globalData.userID) {
          Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-007', errorMessage: '', errorParam: '' }])
          // fn_Show_Exception('FE-VAL-007');
          return false;
        }
        else if (auditDataModel.RecordStat == 'Open') {
          //auditDataModel.Version=audit.Version;
          //auditDataModel.MakerID=audit.MakerID;
          auditDataModel.AuthStat = 'Unauthorised';
          if (stateObject.state.remarks != null && stateObject.state.remarks != '') {
            auditDataModel.MakerRemarks = stateObject.state.remarks;
          }

          auditDataModel.CheckerRemarks = '';
          auditDataModel.MakerDtStamp = '';
          auditDataModel.CheckerDtStamp = '';
          auditDataModel.CheckerID = '';

          //audit.MakerRemarks=MakerRemarks;
          auditDataModel.RecordStat = 'Open';
          return true;
        }

      }
      else {
        auditDataModel.Version = (parseInt(auditDataModel.Version) + 1).toString();//Integration change
        auditDataModel.MakerID = globalData.userID;
        auditDataModel.AuthStat = 'Unauthorised';
        if (stateObject.state.remarks != null && stateObject.state.remarks != '') {
          auditDataModel.MakerRemarks = stateObject.state.remarks;
        }
        // auditDataModel.MakerRemarks = '';
        auditDataModel.CheckerRemarks = '';
        auditDataModel.MakerDtStamp = '';
        auditDataModel.CheckerDtStamp = '';
        auditDataModel.CheckerID = '';

        //audit.MakerRemarks=MakerRemarks;
        auditDataModel.RecordStat = 'Open';
        return true;
      }

      break;


    case 'ReadOnlyWithDatatable':
      if (auditDataModel.RecordStat != 'Open') {
        Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-008', errorMessage: '', errorParam: '' }])
        // fn_Show_Exception('FE-VAL-008');
        return false;
      }

      if (auditDataModel.AuthStat == 'Unauthorised') {
        if (auditDataModel.MakerID != globalData.userID) {
          Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-007', errorMessage: '', errorParam: '' }])
          // fn_Show_Exception('FE-VAL-007');
          return false;
        }
        else if (auditDataModel.RecordStat == 'Open') {
          //auditDataModel.Version=audit.Version;
          //auditDataModel.MakerID=audit.MakerID;
          auditDataModel.AuthStat = 'Unauthorised';
          if (stateObject.state.remarks != null && stateObject.state.remarks != '') {
            auditDataModel.MakerRemarks = stateObject.state.remarks;
          }

          auditDataModel.CheckerRemarks = '';
          auditDataModel.MakerDtStamp = '';
          auditDataModel.CheckerDtStamp = '';
          auditDataModel.CheckerID = '';

          //audit.MakerRemarks=MakerRemarks;
          auditDataModel.RecordStat = 'Open';
          return true;
        }

      }
      else {
        auditDataModel.Version = (parseInt(auditDataModel.Version) + 1).toString();//Integration change
        auditDataModel.MakerID = globalData.userID;
        auditDataModel.AuthStat = 'Unauthorised';
        if (stateObject.state.remarks != null && stateObject.state.remarks != '') {
          auditDataModel.MakerRemarks = stateObject.state.remarks;
        }
        // auditDataModel.MakerRemarks = '';
        auditDataModel.CheckerRemarks = '';
        auditDataModel.MakerDtStamp = '';
        auditDataModel.CheckerDtStamp = '';
        auditDataModel.CheckerID = '';

        //audit.MakerRemarks=MakerRemarks;
        auditDataModel.RecordStat = 'Open';
        return true;
      }

      break;
    case 'Deletion':
      if (auditDataModel.RecordStat == 'Deleted') {
        // fn_Show_Exception('FE-VAL-008');
        Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-008', errorMessage: '', errorParam: '' }])
        return false;
      }

      if (auditDataModel.AuthStat == 'Unauthorised') {
        if (auditDataModel.MakerID != globalData.userID) {
          // fn_Show_Exception('FE-VAL-009');
          Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-009', errorMessage: '', errorParam: '' }])
          return false;
        }
        else {
          //auditDataModel.Version=audit.Version;
          //auditDataModel.MakerID=audit.MakerID;
          previousAuditScope = Object.assign({}, auditDataModel);

          auditDataModel.AuthStat = 'Unauthorised';
          //auditDataModel.MakerRemarks='';
          auditDataModel.CheckerRemarks = '';
          //auditDataModel.MakerDtStamp='';
          auditDataModel.CheckerDtStamp = '';
          auditDataModel.CheckerID = '';

          //audit.MakerRemarks=MakerRemarks;
          auditDataModel.RecordStat = 'Deleted';
          if (stateObject.state.remarks != null && stateObject.state.remarks != '') {
            auditDataModel.MakerRemarks = stateObject.state.remarks;
          }

          return true;
        }

      }
      else {
        // previousAuditScope = Object.assign({}, auditDataModel);
        auditDataModel.Version = (parseInt(auditDataModel.Version) + 1).toString();
        auditDataModel.MakerID = globalData.userID;
        auditDataModel.AuthStat = 'Unauthorised';
        //audit.MakerRemarks=MakerRemarks;
        auditDataModel.RecordStat = 'Deleted';
        if (stateObject.state.remarks != null && stateObject.state.remarks != '') {
          auditDataModel.MakerRemarks = stateObject.state.remarks;
        }
        auditDataModel.CheckerRemarks = '';
        auditDataModel.MakerDtStamp = '';
        auditDataModel.CheckerDtStamp = '';
        auditDataModel.CheckerID = '';

        return true;
      }

      break;

    case 'Authorisation':
      /* if (audit.RecordStat=='D')
     { 		 
       fn_Show_Exception('FE-VAL-008');
       return false;
     } */

      if (auditDataModel.AuthStat != 'Unauthorised' && !apiCall.functions.apiError) {
        // fn_Show_Exception('FE-VAL-011');
        Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-011', errorMessage: '', errorParam: '' }])
        return false;
      }
      if (auditDataModel.MakerID == globalData.userID) {
        // fn_Show_Exception('FE-VAL-020');
        Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-020', errorMessage: '', errorParam: '' }])
        return false;
      }
      previousAuditScope = Object.assign({}, auditDataModel);
      auditDataModel.CheckerID = globalData.userID;
      //auditDataModel.MakerRemarks='';
      //auditDataModel.MakerRemarks=dialogRemarks;
      if (stateObject.state.remarks != null && stateObject.state.remarks != '') {
        auditDataModel.CheckerRemarks = stateObject.state.remarks;
      }
      // auditDataModel.CheckerRemarks = dialogRemarks;
      //auditDataModel.MakerDtStamp='';
      auditDataModel.CheckerDtStamp = '';
      //auditDataModel.CheckerID='';

      auditDataModel.AuthStat = 'Authorised';
      break;
    case 'Reject':

      if (auditDataModel.AuthStat != 'Unauthorised' && !apiCall.functions.apiError) {
        // fn_Show_Exception('FE-VAL-011');
        Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-011', errorMessage: '', errorParam: '' }])
        return false;
      }
      if (auditDataModel.MakerID == globalData.userID) {
        Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-026', errorMessage: '', errorParam: '' }])
        // fn_Show_Exception('FE-VAL-026');
        return false;
      }
      // previousAuditScope = Object.assign({}, auditDataModel);
      auditDataModel.CheckerID = globalData.userID;
      auditDataModel.AuthStat = 'Rejected';
      //auditDataModel.MakerRemarks='';
      if (stateObject.state.remarks != null && stateObject.state.remarks != '') {
        auditDataModel.CheckerRemarks = stateObject.state.remarks;
      }
      // auditDataModel.CheckerRemarks = dialogRemarks;
      //auditDataModel.MakerDtStamp='';
      auditDataModel.CheckerDtStamp = '';
      //auditDataModel.CheckerID='';

      break;

    // start NEAI2-68
    case 'CreateWithQuery':
      ////console.log('defaul audit')
      //if (auditDataModel ==null) 
      //auditDataModel = new Object();
      auditDataModel.MakerID = globalData.userID;
      auditDataModel.AuthStat = 'Unauthorised';
      if (stateObject.state.remarks != null && stateObject.state.remarks != '') {
        auditDataModel.MakerRemarks = stateObject.state.remarks;
      }
      // auditDataModel.MakerRemarks = '';
      auditDataModel.CheckerRemarks = '';
      auditDataModel.MakerDtStamp = '';
      auditDataModel.CheckerDtStamp = '';
      auditDataModel.CheckerID = '';
      auditDataModel.Version = "1";
      auditDataModel.RecordStat = 'Open';
      ////console.log('return true')
      return true;
      break;
    // end NEAI2-68


  }
  //$scope1.$apply();		  
  return true;

}





GeneralUtils.pay = async function (stateObject, paymentDatamodel) {
  // var $scope = getSubScreenScope();
  const { dataModel } = stateObject.state
  var businessEntity = [];
  var i = 0;
  if (stateObject.state.primaryKeyCols != undefined) {
    for (let value of stateObject.state.primaryKeyCols) {
      businessEntity[i] = {
        entityName: value,
        entityValue: dataModel[value]
      };
      i++
    }
  }

  if (stateObject.state.serviceName == "SubscriptionService") {
    businessEntity = [{
      entityName: "subscription",
      entityValue: "Y"
    }];
  }

  var paymentSessionDetails = new Object();
  paymentSessionDetails.tokenOne = ' ';
  paymentSessionDetails.screenName = ' ';
  paymentSessionDetails.currentStep = ' ';
  paymentSessionDetails.currentOperation = ' ';
  var sessionStorageArray = [];
  // for (var i = 0; i < Object.keys(sessionStorage).length; i++) {
  //     var key = Object.keys(sessionStorage)[i];
  //     var value = sessionStorage.getItem(key);
  //     var sessionObj = {
  //         key: "",
  //         value: ""
  //     };
  //     sessionObj.key = key;
  //     sessionObj.value = value;
  //     sessionStorageArray.push(sessionObj)
  // }
  var localStorageArray = [];
  // for (var i = 0; i < Object.keys(localStorage).length; i++) {
  //     var key = Object.keys(localStorage)[i];
  //     var value = localStorage.getItem(key);
  //     var localObj = {
  //         key: "",
  //         value: ""
  //     };
  //     localObj.key = key;
  //     localObj.value = value;
  //     localStorageArray.push(localObj)
  // }
  var localObj = {
    key: "",
    value: ""
  };
  //  localObj.key = "SummaryResult";
  //  localObj.value = cloneDeep(stateObject.state.summaryDataModel);
  localStorageArray.push(localObj);
  //  var localObj = {
  //      key: "",
  //      value: ""
  //  };
  //  localObj.key = "detailScreenDataModel";
  //  localObj.value = cloneDeep(dataModel);
  //  localStorageArray.push(localObj);
  //  paymentSessionDetails.sessionStorage = JSON.stringify(sessionStorageArray);
  //  paymentSessionDetails.localStorage = JSON.stringify(localStorageArray);
  paymentDatamodel.paymentSessionDetails = paymentSessionDetails;
  var apiObject = {
    serviceName: "StripePayment",
    serviceType: "Payment",
    datamodel: paymentDatamodel,
    operation: "Create",
    businessEntity: businessEntity,
    audit: stateObject.state.auditDataModel
  };
  await apiCall.functions.callApi(apiObject, null, stateObject.parentStateChange).catch(function (e) {
    apiCall.functions.apiError = true
  });
  if (!apiCall.functions.apiError) {
    //  fn_Show_Exception_With_Param('FE-VAL-063', '')
    Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-063', errorMessage: '', errorParam: '' }])
  }
}

// start NEW3.02
GeneralUtils.getSelectedIndex = function (Array, objectValue, value) {
  var index;
  Array.findIndex(function (entry, i) {
    if (entry[objectValue] == value) {
      index = i;
    }
  });
  return index;
}
// ends NEW3.02

// start NEW3.03
GeneralUtils._getRandomColor = function (index) {
  var item = ''
  var tempIndex
  if (index < GeneralUtils.bgColor.length) {
    item = GeneralUtils.bgColor[index]
  }
  else {
    tempIndex = index % GeneralUtils.bgColor.length

    item = GeneralUtils.bgColor[tempIndex]
  }
  return item
}
// ends NEW3.03
//  starts  NEW3.04
// GeneralUtils.showMore = function (stateObject) {
//   NewOperation.functions.screenEventHandler(stateObject)
// }

// GeneralUtils.onSearch = function (stateObject) {
//   // var dummySummayDataModel = cloneDeep(stateObject.state.summaryDataModel)
//   // dummySummayDataModel.pageDetails.searchType = "Filter"
//   stateObject.parentStateChange({
//     // showViewModal:false,
//     // summaryDataModel:dummySummayDataModel,
//     currentOperation: 'SearchInFilter'
//   })
//   NewOperation.functions.screenEventHandler(stateObject)
// }
//  starts NEW3.04



// GeneralUtils.getErrorMessage = function (fieldID, fieldValue, errorField, type,errorCode,error_Message) {
//   if (type == 'requiredWithData') {
//     if (fieldValue != ''  && !Validator.functions.emailNumberValidator(fieldValue)) {
//       return error_Message
//     }
//     else if ((errorField.includes(fieldID) && fieldValue == '')) {
//       return ExceptionArray.find(x => x.error_code === errorCode).errorMessage
//     }
//   }
//   else if (type == 'required') {
//     if ((errorField.includes(fieldID) && fieldValue == '')) {
//       return ExceptionArray.find(x => x.error_code === errorCode).errorMessage
//     }
//   }
//   else{
//     return ""
//   }

// }

// starts NEW3.05
GeneralUtils.getErrorMessage = function (fieldID, fieldValue, errorField, Validationtype, lable) {

  /*console.log('errorField-->',errorField)
  console.log('fieldID-->',fieldID)
  console.log('fieldValue-->',fieldValue)
  console.log('lable-->',lable)  */

  if ((errorField.includes(fieldID) && fieldValue == '')) {
   // console.log('message',`${lable} ${ExceptionArray.find(x => x.error_code === 'FE-VAL-084').errorMessage}`)

    // var index = errorField.indexOf(fieldID);
    // if (index > -1) {
    //   errorField.splice(index, 1);
    // }
    return `${lable} ${ExceptionArray.find(x => x.error_code === 'FE-VAL-084').errorMessage}`

  }

  else if (Validationtype.includes('required')) {
    if ((fieldValue == '' || fieldValue == null)) {
      return `${lable} ${ExceptionArray.find(x => x.error_code === 'FE-VAL-084').errorMessage}`
    }
  }

  else if (Validationtype.includes('emailandNumber')) {
    if (fieldValue != '' && !Validator.functions.emailNumberValidator(fieldValue)) {

      return ExceptionArray.find(x => x.error_code === 'FE-VAL-081').errorMessage

    }
  }


  else if (Validationtype.includes('email')) {
    if (fieldValue != '' && !Validator.functions.emailValidator(fieldValue)) {
      return ExceptionArray.find(x => x.error_code === 'FE-VAL-082').errorMessage
    }
  }
  else if (Validationtype.includes('mobileNumber')) {
    if (fieldValue != '' && !Validator.functions.mobileNumberValidator(fieldValue)) {
      return ExceptionArray.find(x => x.error_code === 'FE-VAL-101').errorMessage
    }
  }
  else if (Validationtype.includes('specialcharecter')) {

    if (fieldValue != '' && !Validator.functions.specialCharValidator(fieldValue)) {

      return ExceptionArray.find(x => x.error_code === 'FE-VAL-083').errorMessage

    }
  }
  else if ((errorField.includes(fieldID) && fieldValue == '')) {

    return `${lable} ${ExceptionArray.find(x => x.error_code === 'FE-VAL-084').errorMessage}`

  }
  else if (Validationtype.includes('required')) {
    if ((fieldValue == '' || fieldValue == null)) {
      return `${lable} ${ExceptionArray.find(x => x.error_code === 'FE-VAL-084').errorMessage}`
    }
  }

  else {
    return ""

  }



}
// ends NEW3.05


// starts NEW3.06

GeneralUtils.getImagePath = function (stateObject, imagePath) {
  const { nekot,
    ivas,
    uhtuliak } = stateObject.state

  if (typeof imagePath == 'string' && imagePath.includes('CohesiveUpload')) {
    return { uri: `${httpUtils.FILE_URL()}${imagePath}?ivas=${ivas}&nekot=${nekot}&uhtuliak=${uhtuliak}` }
  }
  else if (typeof imagePath == 'string' && imagePath.includes('objectstorage')) {
    return { uri: imagePath }
  }
  else {
    return httpUtils.DEFAULT_IMAGE_FILE_PATH()
  }
}


GeneralUtils.getSummaryResult = function (stateObject) {
  console.log('stateObject.state.displayContent inside getsummaryResult',stateObject.state.displayContent)
  // return stateObject.state.currentOperation == 'SearchShow' ? ((stateObject.state.summaryResultByFilter.length != 0) ? stateObject.state.summaryResultByFilter.SummaryResult : []) : stateObject.state.summaryDataModel.SummaryResult
  return stateObject.state.displayContent == 'summaryResultByFilter' ? ((stateObject.state.summaryResultByFilter.length != 0) ? stateObject.state.summaryResultByFilter.SummaryResult : []) : stateObject.state.summaryDataModel.SummaryResult
}

GeneralUtils.getParentTransactionSummaryResult = function (stateObject) {
  console.log('stateObject.state.displayContent',stateObject.state.displayContent)
  console.log('stateObject.state inside getParentTransactionSummaryResult',stateObject.state)
  if(typeof stateObject.state.summaryDataModel != 'undefined' && typeof stateObject.state.summaryDataModel.SummaryResult !='undefined')  
  return stateObject.state.summaryDataModel.SummaryResult
  else 
  return (stateObject.state.displayContent == 'summaryResultByFilter' ? (stateObject.state.summaryResultByFilter.length != 0? stateObject.state.summaryResultByFilter.SummaryResult : []):(typeof stateObject.state.summaryDataModel != 'undefined' && stateObject.state.summaryDataModel.SummaryResult!=null) ?stateObject.state.summaryDataModel.SummaryResult:[])
}


GeneralUtils.studentSerachFilter = function (stateObject, summaryResult, mapping, searchQuery) {
  var filterData = []
  var i = 0
  var list
  try {
    list = summaryResult;
  } catch (err) {
    list = null
  }
  if (list != null && list.length != 0) {
    if (searchQuery != '') {
      for (let rowData of list) {
        for (let colkey of mapping) {
          if (rowData[colkey].toLowerCase().includes(searchQuery.toLowerCase())) {
            filterData[i] = rowData;
            i++;
            break;
          }
        }
      }
    }
    else {
      filterData = list
    }
  }
  return filterData
}

// ends NEW3.06





// GeneralUtils.onClickRecord = function (rowData) {

//   const { stateObject } = this.props;

//   var emptyDataModel = cloneDeep(stateObject.state.emptyDataModel)
//   for (let value of stateObject.state.primaryKeyCols) {
//     emptyDataModel[value] = rowData[value]
//   }
//   stateObject.parentStateChange({
//     dataModel: emptyDataModel
//   })

//   Operation.functions.nextStepEventHandler(stateObject)

//   // starts SHA060921
//   // Operation.functions.nextStepEventHandler(stateObject)

//   // if((stateObject.state.currentOperation == "startClassroom" && stateObject.state.serviceName == "OnlineClassroomService" || stateObject.state.currentOperation == "joinClassroom" && stateObject.state.serviceName == "OnlineClassroomService")){
//   // //   skip nextStepEventHandler
//   // }
//   // else if(stateObject.state.serviceName == "OnlineClassroomService" && ( stateObject.state.userType == 'P' || stateObject.state.userType == 'S') && stateObject.state.currentOperation == "Query"){
//   // //   skip nextStepEventHandler
//   // }
//   // else{
//   //   Operation.functions.nextStepEventHandler(stateObject)
//   // }

// }



GeneralUtils.getFileName = function (filePath) {
  var fileName

  if (filePath != '' && (filePath.includes('CohesiveUpload') || filePath.includes('objectstorage'))) {
    return fileName = filePath.substring(filePath.lastIndexOf('/') + 1)
  }
  else {
    return fileName = ''
  }
  // return fileName = filePath
}



GeneralUtils.getFileType = function (filePath) {
  var fileType

  if (filePath != '' && (filePath.includes('CohesiveUpload') || filePath.includes('objectstorage'))) {
    return fileType = filePath.substring(filePath.lastIndexOf('.') + 1)
  }
  else {
    return fileType = ''
  }
}


GeneralUtils.getSource = function (filePath, stateObject) {
  var source = filePath.includes('objectstorage') ? { uri: filePath, cache: false } : { uri: `${httpUtils.FILE_URL()}${filePath}?ivas=${stateObject.state.ivas}&nekot=${stateObject.state.nekot}&uhtuliak=${stateObject.state.uhtuliak}`, cache: false }

  return source
}



GeneralUtils.openDocument = function (stateObject, contentPath) {
  var fileType = contentPath.substring(contentPath.lastIndexOf('.') + 1)
  if (Platform.OS === 'ios') {
    GeneralUtils.contentPath = contentPath
    stateObject.parentStateChange({
      showFullViewDoc: true
    })
  }
  else {
    console.log('fileType',fileType)
    console.log('contentPath',contentPath)
    if (fileType == 'pdf' || fileType == 'png' || fileType == 'PNG' || fileType == 'jpg' || fileType == 'JPG' || fileType == 'jpeg' || fileType == 'JPEG' || fileType == 'mp4') {
      console.log('inside pdf')
      
      GeneralUtils.contentPath = contentPath
      stateObject.parentStateChange({
        showFullViewDoc: true
      })
    }
    else {

      GeneralUtils.contentPath = contentPath
      stateObject.parentStateChange({
        downLoadDocument: true
      })
      setTimeout(function () {
        stateObject.parentStateChange({ downLoadDocument: false })
      }.bind(this), 3000)
    }
  }
}



GeneralUtils.beforeStartMeeting = async function (apiObject) {

  var globalData = JSON.parse(await AsyncStorage.getItem('GLOBAL'));

  var date = new Date();
  var fullyear = date.getFullYear();
  var month = parseInt(date.getMonth()) + 1;
  if (month < 10) {
    month = "0" + month
  }
  var dayOfMonth = date.getDate();
  if (dayOfMonth < 10) {
    dayOfMonth = "0" + dayOfMonth
  }
  var str_date = dayOfMonth + "-" + month + "-" + fullyear;
  apiObject.businessEntity.push({
    entityName: "todaySummary",
    entityValue: str_date
  });
  if (globalData.userType == "A" || globalData.userType == "T" || globalData.userType == "O" || globalData.userType == "P") {
    apiObject.businessEntity.push({
      entityName: "userID",
      entityValue: globalData.userType + "," + globalData.userID
    })
  } else if (globalData.userType == "S") {
    apiObject.businessEntity.push({
      entityName: "userID",
      entityValue: globalData.userType + "," + globalData.studentID
    })
  }

}













module.exports = {
  functions: GeneralUtils
};