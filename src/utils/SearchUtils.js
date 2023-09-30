

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

/* * * Change Tag:SHA01
 Change Desc: make a StandardSearchService for institute report
 Changed By : Shashank
 Date:07-12-2020 
 */

      /* * * Change Tag: SHA090921
 Change Desc: new suggestion add "QuestionPaperSearchService"
 Changed By : Shashank
 Date:09-09-2021 
 */

import apiCall from "../ApiCall/ActionApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Keyboard } from 'react-native';
import SelectListUtils from "../utils/SelectListUtils";



class SearchUtils { }

SearchUtils.SearchPosition;
  

SearchUtils.notRequiredModal = ["StudentTimeTable","StudentOtherActivity","StudentExamSchedule","StudentProgressCard","StudentSoftSkill","StudentFeeManagement","StudentStudyMaterial","StudentAssignment","StudentNotification","StudentPayment","StudentLeaveManagement","StudentECircular","StudentNotesService","StudentLessonPlannerService",'OnlineClassroomService','OnlineClassroomService','NewStudentAssignment','StudentProfile','OnlineMeetingAttendanceService']

SearchUtils.searchModal = false

SearchUtils.clearSearchResult = function (stateObject) {
  ////console.log('clearSearchResult')
  apiCall.functions.searchDataModel = {
    searchFilter: "",
    searchResults: []
  }
  stateObject.parentStateChange({
    seachVisible: false,
    // searchText:searchText,
    // searchFieldName:searchFieldName
  })


}










SearchUtils.setContainerPosition = function (element) {

  element.measure((x, y, width, height, pageX, pageY) => {
    SearchUtils.SearchPosition.containerPosition = pageY;
    // SearchUtils.SearchPosition.elementPositions=[];
    // ,elementPositions:[{}]}
    //console.log(SearchUtils.SearchPosition,'containe inside measure')
    //console.log(pageY,'main container')
  })

}

SearchUtils.setElementPosition = function (element, elementName) {
  //SearchUtils.SearchPosition={};
  var protoType = { containerPosition: '', elementPositions: [] }
  if (SearchUtils.SearchPosition == undefined) {
    SearchUtils.SearchPosition = Object.create(protoType);
    SearchUtils.SearchPosition.containerPosition = ''
    SearchUtils.SearchPosition.elementPositions = [];
  }



  element.measure((x, y, width, height, pageX, pageY) => {

    var eletype = { Name: '', position: '', height: '' }
    var elePosition = Object.create(eletype)
    var elePosition = { Name: elementName, position: pageY, height: height }

    SearchUtils.SearchPosition.elementPositions.push(elePosition);

    //console.log(SearchUtils.SearchPosition,'setElemnetposition inside measure ');
  })
  //console.log(SearchUtils.SearchPosition,'setElementPosition');
}



SearchUtils.getContainerPosition = function () {
  if (SearchUtils.SearchPosition != undefined)
    return SearchUtils.SearchPosition.containerPosition;
  else return undefined
}


SearchUtils.getElementPosition = function (elementName) {
  if (SearchUtils.getElementPosition != undefined) {
    //console.log(elementName,'elementName in getElementPosition')
    //console.log(SearchUtils.SearchPosition.elementPositions,'in getElementPosition  func')
    for (let item of SearchUtils.SearchPosition.elementPositions) {
      if (item.Name == elementName) {
        return item.position
      }
    }
  }
  else {

  }

}

SearchUtils.getElementHeight = function (elementName) {
  if (SearchUtils.getElementHeight != undefined) {
    for (let item of SearchUtils.SearchPosition.elementPositions) {
      if (item.Name == elementName) {
        return item.height
      }
    }
  }
  else {
    return undefined
  }

}


SearchUtils.launchSuggestion = async function (stateObject, searchText, searchFieldName) {



  var serviceName = ''

  //console.log(searchText,"searchText")

  // if (searchText == '' || searchText == null) {
  apiCall.functions.searchDataModel = {
    searchFilter: "",
    searchResults: []
  }
  // }
  // if (searchText != '') {
  //console.log(apiCall.functions.searchDataModel.searchResults,"api SearchUtils")

  // if (apiCall.functions.searchDataModel.searchResults.length != 0) {
  //   stateObject.parentStateChange({
  //     seachVisible: true,
  //     searchText: searchText,
  //     searchFieldName: searchFieldName,
  //     searchIsLoading: false
  //   })
  // }
  // else {
  // if (searchText.length == 1) {
  ////console.log(searchFieldName, "searchFieldName")



  switch (searchFieldName) {
    case 'studentName':
      serviceName = 'StudentSearchService'
      break
    case 'studentID':
      serviceName = 'StudentSearchService'
      break
    case 'teacherName':
      serviceName = 'TeacherNameSearchService'
      break
    case 'teacherID':
      serviceName = 'TeacherNameSearchService'
      break
    case 'groupId':
      serviceName = 'GroupIDSearchService'
      break
    case 'circularID':
      serviceName = 'ECircularSearchService'
      break
    case 'instituteName':
      serviceName = 'InstituteUserSearchService'
      break
    case 'instituteID':
      serviceName = 'InstituteUserSearchService'
      break
    case 'roleID':
      serviceName = 'UserRoleSearchService'
      break
    case 'userName':
      serviceName = 'UserSearchService'
      break
    case 'userID':
      serviceName = 'UserSearchService'
      break
    case 'class':
      serviceName = 'ClassSearchService'
      break
    case 'feeID':
      serviceName = 'FeeIDSearchService'
      break
    case 'templateID':
      serviceName = 'NotificationTemplateSearchService'
      break
    // start SHA01
    case 'standard':
      serviceName = 'ClassSearchService'
      break
      // end SHA01
    // start SHA090921
    case 'questionPaper':
      serviceName = 'QuestionPaperSearchService'
      break
      // end SHA090921
    case 'ExamSearch':  
    serviceName = 'ExamSearchService'
    break
    

  }

 if(searchFieldName == 'TimeZone'){
  apiCall.functions.searchDataModel.searchResults = SelectListUtils.functions.selectMaster.TimeZoneMaster
 }
 else if(searchFieldName == 'country'){
  apiCall.functions.searchDataModel.searchResults = SelectListUtils.functions.selectMaster.CountryCodeMaster
 }
 else{
  try {
    apiCall.functions.searchDataModel = JSON.parse(await AsyncStorage.getItem(serviceName));
  } catch (err) {
    apiCall.functions.searchDataModel = null
  }

  if (apiCall.functions.searchDataModel == null) {
    apiCall.functions.searchDataModel = {
      searchFilter: "",
      searchResults: []
    }
    var apiObject = {
      serviceName: serviceName,
      serviceType: 'Institute',
      datamodel: apiCall.functions.searchDataModel,
      operation: 'View',
      businessEntity: [{ "entityName": "filter", "entityValue": "" }],
      audit: {},
    }
    // stateObject.parentStateChange({
    //   seachVisible: true,
    // })
    Keyboard.dismiss()
    await apiCall.functions.callApi(apiObject, null, stateObject.parentStateChange)
  }
 }
  apiCall.functions.searchDataModel.searchFilter = searchText

  // stateObject.parentStateChange({
  //   seachVisible: false,
  //   searchText: searchText,
  //   searchFieldName: searchFieldName,
  // })

if((stateObject.state.userType == 'P' || stateObject.state.userType == 'S') && SearchUtils.notRequiredModal.includes(stateObject.state.serviceName) && searchFieldName == 'studentName' && SearchUtils.searchModal ){
  stateObject.parentStateChange({
    seachVisible: false,
    searchText: searchText,
    searchFieldName: searchFieldName,
  })
}
else{
  stateObject.parentStateChange({
    seachVisible: true,
    searchText: searchText,
    searchFieldName: searchFieldName,
  })
}
 

  // }
  // else {
  //   stateObject.parentStateChange({
  //     // seachVisible:true,
  //     searchText: searchText,
  //     searchFieldName: searchFieldName,

  //   })
  // }
  // }


  // }
  // else {
  //   SearchUtils.clearSearchResult(stateObject)
  //   // apiCall.functions.searchDataModel = {
  //   //   searchFilter:"",
  //   //   searchResults:[]
  //   // },
  //   stateObject.parentStateChange({
  //     seachVisible: false,
  //     searchText: searchText,
  //     searchFieldName: searchFieldName

  //   })
  // }

}




















SearchUtils.showSearchModal = function (parentStateChange, searchName) {
  switch (searchName) {
    case 'student':
      parentStateChange({
        searchTitle: 'Student Search',
        seachVisible: true
      })
      break;

    default:
      break;
  }
  // this.setState({ seachVisible: true })
};

SearchUtils.hideSearchModal = function (parentStateChange, searchName) {
  switch (searchName) {
    case 'student':
      parentStateChange({
        searchTitle: 'Student Search',
        seachVisible: false
      })
      break;

    default:
      break;
  }
};

module.exports = {
  functions: SearchUtils
};

