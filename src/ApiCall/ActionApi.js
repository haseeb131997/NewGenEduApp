

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
Change Desc: for intialFetching data rendering 
Changed By : Shashank
Date:30-09-2021 
*/

/* * * Change Tag:NEW3.02
Change Desc: add pageDetails in summary response
Changed By : Shashank
Date:30-09-2021 
*/


/* * * Change Tag:NEW3.03
Change Desc: handle the more concept and and summaryResultByFilter 
Changed By : Shashank
Date:03-10-2021 
*/

/* * * Change Tag:3.0 UI/UX
Change Desc:  Mobile :-  remove bottomTabClick case , because its is not used
Changed By : Shashank
Date:16-10-2021 
*/


import React, { Component } from "react";
import {
  ToastAndroid
} from "react-native";
import { httpUtils } from '../utils/HttpUtils';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Exception from '../utils/Exception'
import isEmpty from 'lodash/isEmpty';
import ScreenUtils from '../utils/ScreenUtils'





class apiCall { }
apiCall.resToken;

apiCall.callRequestTokenResponse;
apiCall.request;
apiCall.apiCallRequired = false
apiCall.apiError = false
apiCall.apiDashboardError = false
apiCall.bottomTabClick = ''
apiCall.cancelToken = ''
apiCall.dashboardCancelToken = ''
apiCall.loginCancelToken = ''
apiCall.isDashBoardProgress = false
apiCall.tempArray = new Map()
apiCall.subscriptionDataModel = null
// start NEAI-176
apiCall.selectMasterCancelToken = ''

// starts 3.0 UI/UX
apiCall.fromLoading = false
// ends  3.0 UI/UX


// end  NEAI-176

// apiCall.parentSignatureMessage = ['StudentProgressCard','StudentSoftSkill','StudentECircular']

// start NEAI-302
apiCall.CreateDefaultScreen = ["InstituteAssignment", "ECircular", "InstituteOtherActivity", "Notification", "InstitutePayment", "InstituteFeeManagement", "GroupMapping", "StudentProfile", "TeacherProfile", "UserProfile", "GeneralLevelConfiguration", "TeacherLeaveManagement", "StudentLeaveManagement", "NotificationTemplate", "ClassStudentRegister", "TeacherLessonPlannerService", "StudentLessonPlannerService", "StudyMaterial", "TeacherNotesService", "StudentNotesService", "ClassAssignment", "ClassAssignmentAssessment", "BlogService", "OnlineClassroomService", "QuestionPaperConfiguration", "ClassExamSchedule","ClassLessonPlannerService"]

apiCall.secondLevelLoadMoreScreen = ["InstitutePaymentSummary","TeacherNotesSummary","StudentNotesSummary","OnlineClassroomSummary"]

// end NEAI-302


apiCall.searchDataModel = {
  searchFilter: "",
  searchResults: []
},

  // start NEAI-176
  apiCall.getApiCancelToken = function (service) {
    // var token
    if (service.includes('LoginAuthenticate')) {
      return apiCall.loginCancelToken.token
    }
    else if (service.includes('DashBoard')) {
      return apiCall.dashboardCancelToken.token
    }
    else if (service.includes('SelectBoxMaster')) {
      return apiCall.selectMasterCancelToken.token
    }
    else {
      return apiCall.cancelToken.token
    }

  }
// end NEAI-176


apiCall.setRequestToken = async function (response, serviceName) {

  //console.log(serviceName, "in setRequestToken")
  if (JSON.parse(await AsyncStorage.getItem('Rst')) != null) {
    var tempRst = JSON.parse(await AsyncStorage.getItem('Rst'));
  }
  else {
    var tempRst = [];
  }

  //console.log(tempRst, "tempRst in setRequestToken ")

  var serviceExist = false;
  if (tempRst != null && tempRst.lenghth != 0) {
    for (let item of tempRst) {
      //console.log(item, "item")
      if (item.service == serviceName) {
        serviceExist = true
        if (response.status == 'success') {
          item.value = response.resourceToken;
        }
        else {
          item.value = null
        }
        break;
        // item.value = response.resourceToken
      }

    }
  }
  //console.log(serviceExist, "serviceExist")
  if (!serviceExist) {
    if (response.status == 'success') {
      var serviceObj = { service: serviceName, value: response.resourceToken }
    }
    else {
      var serviceObj = { service: serviceName, value: null }

    }
    if (tempRst != null && tempRst.lenghth != 0)
      tempRst.push(serviceObj)
    else {
      tempRst = [];
      tempRst.push(serviceObj)
    }
  }

  await AsyncStorage.setItem('Rst', JSON.stringify(tempRst));
  // if (response.status == 'success') {
  //   await AsyncStorage.setItem(serviceName, response.resourceToken);
  // }
  // else {
  //   await AsyncStorage.setItem(serviceName, '');
  // }
}

apiCall.getRequestToken = async function (serviceName) {

  // console.log(serviceName, 'serviceName in getres')
  var tempRst
  try {
    tempRst = JSON.parse(await AsyncStorage.getItem('Rst'));
  } catch (err) {
    tempRst = null
  }


  // console.log(tempRst, 'tempRst getRequestToken')

  var serviceExist = false;
  if (tempRst != null) {


    for (let item of tempRst) {
      if (item.service == serviceName) {
        apiCall.resToken = item.value
        serviceExist = true
        break
      }

    }
  }
  if (!serviceExist)
    apiCall.resToken = null;


  // console.log(apiCall.resToken, "in  getRequestToken")


  //  return resToken
}
apiCall.callRequestToken = async function (global, service) {

  // console.log(service, "get service name inside callRequestToken")
  // console.log(apiCall.cancelToken, "apiCall.cancelToken in callReq")




  var request = {
    userID: global.userID,
    instituteID: global.instituteID,
    service: service,
    token: global.token0,
    secKey: global.token1
  }
  console.log('Resource token req',request)
  apiCall.clearServiceToken(service)
  await axios({
    method: "put",
    url: httpUtils.getURL('App', 'ResourceToken'),
    data: request,
    // start NEAI-176
    // cancelToken: service.includes('LoginAuthenticate') ? apiCall.loginCancelToken.token : (service.includes('DashBoard') ? apiCall.dashboardCancelToken.token : apiCall.cancelToken.token),
    cancelToken: apiCall.getApiCancelToken(service),
    // end NEAI-176

    // start NEAI-172
    // timeout: 60000 * 5
    timeout: 30000
    // end NEAI-172
  },
  )
    .then(res => {
      console.log(res.data, 'resource token response')
      //apiCall.setRequestToken(res.data,service)
      apiCall.callRequestTokenResponse = res.data;
    })
    .catch(function (error) {
      console.log(error, 'call request error')
      //console.log(error.code, 'call request error code')

      if (error != null && typeof error != 'undefined') {
        if (axios.isCancel(error)) {
          apiCall.callRequestTokenResponse = {
            status: 'error',
            error: [{
              errorCode: 'axios cancel',
              errorMessage: 'Axios cancel'
            }]
          }
          //console.log('Request canceled', error.message);
        } else {
          if (typeof error.response == 'undefined') {
            if (error.code == 'ECONNABORTED') {
              apiCall.callRequestTokenResponse = {
                status: 'error',
                error: [{
                  errorCode: 'network error!',
                  errorMessage: 'Network error! Time Out happened Please Retry'
                }]
              }
            }
            else {
              apiCall.callRequestTokenResponse = {
                status: 'error',
                error: [{
                  errorCode: 'network error!',
                  errorMessage: 'Network error! Please Retry'
                }]
              }
            }

          }
          else if (error.response != null && typeof error.response != 'undefined') {
            apiCall.callRequestTokenResponse = {
              status: 'error',
              error: [{
                errorCode: error.response.status,
                errorMessage: error.response.data.replace(/(<([^>]+)>)/ig, '')
              }]
            }
          }
          else {
            apiCall.callRequestTokenResponse = {
              status: 'error',
              error: [{
                errorCode: 'network error!',
                errorMessage: 'Network error! Please Retry'
              }]
            }
          }
          // else{
          //   apiCall.callRequestTokenResponse = {
          //     status: 'error',
          //     error: [{
          //       errorCode: error.response.status,
          //       errorMessage: error.response.data.replace(/(<([^>]+)>)/ig, '')
          //     }]
          //   }
          // }
        }
      }



    });

  await apiCall.setRequestToken(apiCall.callRequestTokenResponse, service);
}

apiCall.framRequest = async function (apiObject) {
  var globalData = JSON.parse(await AsyncStorage.getItem('GLOBAL'));

  // console.log('framRequest', apiObject)
  await apiCall.getRequestToken(apiObject.serviceName)
  if (apiCall.resToken == null || apiCall.resToken == '') {
    //console.log('framRequest in if lool for restoken')
    // console.log(apiCall.resToken, 'before calling the resource token')
    await apiCall.callRequestToken(globalData, apiObject.serviceName);
    await apiCall.getRequestToken(apiObject.serviceName)
  }

  //console.log(apiCall.callRequestTokenResponse, 'callReqtokResponse')
  if (apiCall.resToken == null) {
    apiCall.request = null
  }
  else {
    var header = {
      msgID: "",
      version:httpUtils.VERSION(),
      build:httpUtils.BUILD(), 
      source: 'NewGenEducationMobile',
      service: apiObject.serviceName,
      operation: apiObject.operation,
      businessEntity: apiObject.businessEntity,
      status: "",
      key: "",
      instituteID: globalData.instituteID,
      userID: globalData.userID,
      token: apiCall.resToken,

    }
    var request = {
      header: header,
      body: apiObject.datamodel,
      error: null,
      audit: apiObject.audit,
    }
    apiCall.request = request
  }
}

// ---------api call -----------

apiCall.callApi = async function (apiObject, responseDispatch, parentStateChange, previousStateObject = null) {


  // console.log(apiObject, "inside callApi")
  //console.log(apiCall.cancelToken, 'apiCall.cancelToken in callApi')
  // if (apiObject.serviceName.includes('SearchService')) {
  //   parentStateChange({
  //     searchIsLoading: true
  //   })
  // }
  // else {
  try {
    if (apiObject.serviceName.includes('DashBoard')) {
      apiCall.isDashBoardProgress = true
    }
    parentStateChange({
      isLoading: true
    })
    // }
    apiCall.apiError = false
    apiCall.apiDashboardError = false
    apiCall.callRequestTokenResponse = null
    apiCall.request = null
    var request

    if (apiObject.serviceName != "LoginAuthenticate") {
      await apiCall.framRequest(apiObject).then(res => {
        request = apiCall.request
      })
        .catch(function (error) {
          //console.log(error.toJSON(),"Json");
          request = null;
          //console.log(error.response, 'error res')
        });

    }
    else {
      request = apiObject.datamodel;
    }
    console.log(JSON.stringify(request), "api call request")
    if (request != null) {
      await axios({
        method: "put",
        url: httpUtils.getURL(apiObject.serviceType, apiObject.serviceName),
        data: request,
        // start NEAI-176
        // cancelToken: apiObject.serviceName.includes('LoginAuthenticate') ? apiCall.loginCancelToken.token : (apiObject.serviceName.includes('DashBoard') ? apiCall.dashboardCancelToken.token : apiCall.cancelToken.token),
        cancelToken: apiCall.getApiCancelToken(apiObject.serviceName),
        // end NEAI-176
        // start NEAI-172
        // timeout: 60000 * 5
        timeout: (apiObject.serviceName.includes('DashBoard') || apiObject.serviceName.includes('Report')) ? 60000 * 3 : 30000
        // end NEAI-172

      })
        .then(async (response) => {
          console.log(JSON.stringify(response.data), "response of api")
          if (apiObject.serviceName == "LoginAuthenticate") {
            if (response.data.status == 'success') {
              await responseDispatch(response.data)
            }
            else {
              //console.log('else for login')
              apiCall.apiError = true
              parentStateChange({
                isLoading: false,
                error: response.data.error,
                errorType: 'BE',
                showAlert: true
              })
            }
          }
          else {
            if (response.data.header.status == 'success') {
              
              if (apiObject.serviceName.includes('DashBoard')) {
                await responseDispatch(response.data)
                apiCall.isDashBoardProgress = false
              }
              else {
                var standardService = []
                if (apiObject.serviceName.includes('SearchService')) {
                  // start SHA01
                  if (apiObject.serviceName != "NotificationTemplateSearchService") {
                    await AsyncStorage.setItem(apiObject.serviceName, JSON.stringify(response.data.body))
                  }
                  // end SHA01
                  apiCall.searchDataModel = response.data.body
                  parentStateChange({
                    isLoading: false
                  })
                }
                else if (apiObject.serviceName.includes('Summary')) {
                  var responsefilter = request.body.filter
                  // [...this.state.data, newly_added_data]
                  var responseResult = response.data.body.SummaryResult
                  // starts NEW3.02
                  var responsePageDetails = response.data.body.pageDetails
                  // ends NEW3.02
                  // var response =
                  var newResponse =
                  {
                    filter: responsefilter,
                    SummaryResult: responseResult,
                    // starts NEW3.02
                    pageDetails: responsePageDetails
                    // ends NEW3.02
                  }
                  // starts NEW3.03
                  // parentStateChange({
                  //   summaryDataModel: response,
                  //   isLoading: false,
                  //   // starts NEW3.01
                  //   intialFetching:false,
                  //   // ends NEW3.01
                  //   summaryResultByFilter:response
                  // })

                  if(response.data.header.service == 'StudentECircularSummary'){
                    response.data.body.pageDetails = {}
                  }

                 
                   if (!response.data.body.hasOwnProperty('pageDetails') || 
                        (response.data.body.hasOwnProperty('pageDetails') && Object.keys(response.data.body.pageDetails).length === 0)
                   ) {

                    //SecondLevel -> View scenario starts

                    if (previousStateObject.state.currentOperation == "SecondLevel") {
                      parentStateChange({
                        isLoading: false,
                        intialFetching: false,
                        childViewDetails: response.data.body.SummaryResult[0]
                      })

                    }
                    else {
                      parentStateChange({
                        // summaryDataModel: previousStateObject.summaryDataModel,
                        isLoading: false,
                        // starts NEW3.01
                        intialFetching: false,
                        // ends NEW3.01
                        summaryResultByFilter: newResponse
                      })
                    }


                  }
                  //IsRefreshRequired response handling starts

                  //jeron - 2nd level load more scenario starts
                  else if (apiCall.secondLevelLoadMoreScreen.includes(response.data.header.service)  && response.data.body.pageDetails.searchType == "SecondLevel"){

             

              if (previousStateObject.state.currentOperation == "SecondLevel") {
                // console.log(response.data.body.SummaryResult[0],"InstitutePaymentSummary response.data.body.SummaryResult[0]")
                
                apiCall.secondLevelLoadMore(previousStateObject,response)

               
                parentStateChange({
                  isLoading: false,
                  intialFetching: false,
                  // childViewDetails: response.data.body.SummaryResult[0],
                  childViewDetails: previousStateObject.state.childViewDetails,
                  secondLevelPageDetails:response.data.body.pageDetails
                })

              }
              // [...this.state.food, ...this.state.sports]
              else {
                parentStateChange({
                  // summaryDataModel: previousStateObject.summaryDataModel,
                  isLoading: false,
                  // starts NEW3.01
                  intialFetching: false,
                  // ends NEW3.01
                  summaryResultByFilter: newResponse
                })
              }


            }
                  
                  //jeron - 2nd level load more scenario ends

                  // else if( Object.keys(response.data.body.pageDetails).length == 1 && Object.keys(response.data.body.pageDetails)[0] == "refreshRequired" ){
                    else if( response.data.body.pageDetails.hasOwnProperty('autoAuthEnabled') ){
                    if( response.data.body.pageDetails.refreshRequired == true ){
                        ScreenUtils.functions.openToast(previousStateObject)
                        ScreenUtils.functions.startAnimatedRefreshBtn(previousStateObject)
                        parentStateChange({
                          isLoading: false,
                          intialFetching: false,
                          showAnimationRefreshBtn: false,
                          autoAuthEnabled:response.data.body.pageDetails.autoAuthEnabled //Rajfix001 changes 
                        })
                    }
                    else{
                      parentStateChange({
                        isLoading: false,
                        intialFetching: false,
                        showAnimationRefreshBtn: true,
                        autoAuthEnabled:response.data.body.pageDetails.autoAuthEnabled
                      })
                    }

                    
                }
                //jeron 20-01-2022 starts
                // parent side refresh required call response handling :: only refreshrequired will come inside the pagedetails
                 else if( Object.keys(response.data.body.pageDetails).length == 1 && Object.keys(response.data.body.pageDetails)[0] == "refreshRequired" ){
                  
                    if( response.data.body.pageDetails.refreshRequired == true ){
                        //ScreenUtils.functions.openToast(previousStateObject)
                        //ScreenUtils.functions.startAnimatedRefreshBtn(previousStateObject)
                        parentStateChange({
                          isLoading: false,
                          intialFetching: false,
                          showAnimationRefreshBtn: false, 
                        })
                    }
                    else{
                      parentStateChange({
                        isLoading: false,
                        intialFetching: false,
                        showAnimationRefreshBtn: true 
                      })
                    }
                  }
                //jeron 20-01-20211 ends
                else if (response.data.body.pageDetails.searchType == "More") {
                  if (previousStateObject != null) {
                    if (response.data.body.SummaryResult != undefined && response.data.body.SummaryResult != null && response.data.body.SummaryResult.length != 0) {
                      for (let i = 0; i < response.data.body.SummaryResult.length; i++) {

                        if (!apiCall.checkAlreadyExistsInSummaryResult(previousStateObject, response.data.body.SummaryResult[i])) {
                          previousStateObject.state.summaryDataModel.SummaryResult.push(response.data.body.SummaryResult[i])
                        }
                      }
                    }

                    previousStateObject.state.summaryDataModel.pageDetails = response.data.body.pageDetails;

                
               

                    parentStateChange({
                      summaryDataModel: previousStateObject.state.summaryDataModel,
                      isLoading: false,
                      // starts NEW3.01
                      intialFetching: false,
                      // ends NEW3.01
                      summaryResultByFilter: [],
                      showAnimationRefreshBtn: false
                    })
                    if (previousStateObject.state.summaryDataModel.pageDetails.refreshRequired) {
                      ScreenUtils.functions.openToast(previousStateObject)
                      ScreenUtils.functions.startAnimatedRefreshBtn(previousStateObject)
                      // ScreenUtils.functions.showAnimationRefreshBtn = false
                    }


                  }
                  else {
                    parentStateChange({
                      isLoading: false,
                    })
                  }
                }

                //IsRefreshRequired response handling ends
                  else {

                    // initial calling
                    ScreenUtils.functions.stopAnimatedRefreshBtn(previousStateObject)
                    parentStateChange({
                      summaryDataModel: newResponse,
                      isLoading: false,
                      // starts NEW3.01
                      intialFetching: false,
                      // ends NEW3.01
                      summaryResultByFilter: [],
                      showAnimationRefreshBtn: true

                    })

                  }
                  // ends NEW3.03
                  // starts 3.0 UI/UX
                  apiCall.fromLoading = false
                  // ends 3.0 UI/UX

                }
                else {
                  if (response.data.header.service == "SubscriptionService" && response.data.header.operation == "GetPricing") {

                    parentStateChange({
                      isLoading: false,
                      pricingDataModel: response.data.body,
                      goToCart: true
                    })
                  }
                  else {
                    //  start SHA02
                    // await apiCall.successHandler(response, parentStateChange)
                    if (response.data.header.service != "paymentReceipt") {
                      await apiCall.successHandler(response, parentStateChange)
                    }
                    else {
                      // start SHA03
                      parentStateChange({
                        isLoading: false,
                        CreateDefaultReportPath: response.data.body,
                      })
                      // end SHA03
                    }
                    //  end SHA02
                  }



                }
              }
            }
            else {
              if (response.data.header.service == 'ChangePwd') {
                // window.parent.fn_hide_parentspinner();
                apiCall.apiError = true
                parentStateChange({
                  // searchIsLoading: false,
                  isLoading: false,
                  error: response.data.error,
                  errorType: 'BE',
                  showAlert: true
                })
                return
              }

              if (response.data.header.service.includes('DashBoard')) {
                apiCall.apiDashboardError = true
                apiCall.isDashBoardProgress = false
              }
              else {
                apiCall.apiError = true
              }
              for (let item of response.data.error) {
                if (item.errorCode == 'BS_VAL_020') {
                  if (response.data.header.service.includes('SearchService')) {
                    parentStateChange({
                      isLoading: false,
                    })
                  }
                  if (response.data.header.service.includes('DashBoard')) {
                    apiCall.apiDashboardError = false
                    apiCall.isDashBoardProgress = false
                  }
                  else {
                    apiCall.apiError = false
                  }
                  return true
                }
              }
              if (apiObject.serviceName.includes('DashBoard')) {
                await responseDispatch(response.data)
                apiCall.isDashBoardProgress = false
              }
              else {
                // starts 3.0 UI/UX
                // parentStateChange({
                //   // searchIsLoading: false,
                //   dashBoardPaymentIsloading: false,      // SHA05
                //   isLoading: false,
                //   error: response.data.error,
                //   errorType: 'BE',
                //   showAlert: true,
                //   intialFetching:false,
                // })

                // console.log(previousStateObject.state.currentOperation,'currentOperation in api')
                // console.log(apiObject.operation,'apiObject.operation')
                // console.log(apiObject.serviceName,'apiObject.serviceName')
                // console.log(response.data.body.pageDetails.searchType,'response.data.body.pageDetails.searchType')


                if (apiObject.serviceName.includes('Summary') && response.data.body.pageDetails.searchType == "Initial") {
                  for (var num = 0; num < response.data.error.length; num++) {




                    if (response.data.error[num].errorCode == "BS_VAL_212") {
                      // showError = false;
                      apiCall.apiError = false

                      parentStateChange({
                        // searchIsLoading: false,
                        dashBoardPaymentIsloading: false,
                        isLoading: false,
                        error: response.data.error,
                        errorType: 'BE',
                        showAlert: false,
                        intialFetching: false,
                      })
                      apiCall.fromLoading = false
                      break;

                    }

                    else {
                      parentStateChange({
                        // searchIsLoading: false,
                        dashBoardPaymentIsloading: false,
                        isLoading: false,
                        error: response.data.error,
                        errorType: 'BE',
                        showAlert: true,
                        intialFetching: false,
                      })
                    }

                  }


                }
                /* Rajfix001 else if (
                  apiObject.operation == "View" &&
                  apiObject.serviceName == "TeacherLessonPlannerSummary" &&
                  previousStateObject.state.currentOperation == "Create" &&
                  response.data.body.pageDetails.searchType == "Filter") {
                  // showError = false;
                  parentStateChange({
                    // searchIsLoading: false,
                    dashBoardPaymentIsloading: false,
                    isLoading: false,
                    error: response.data.error,
                    errorType: 'BE',
                    showAlert: false,
                    intialFetching: false,
                  })
                  apiCall.fromLoading = false

                }*/
                else {
                  parentStateChange({
                    // searchIsLoading: false,
                    dashBoardPaymentIsloading: false,
                    isLoading: false,
                    error: response.data.error,
                    errorType: 'BE',
                    showAlert: true,
                    intialFetching: false,
                  })
                }

                // ends 3.0 UI/UX 

              }
            }
          }
        })
        .catch(async function (error) {
          console.log(error, "error apicall catch")
          var response = {}


          if (error != null && typeof error != 'undefined') {
            if (axios.isCancel(error)) {
              //console.log('Request canceled', error.message);
            }
            else {
              if (typeof error.response == "undefined") {
                if (error.code == 'ECONNABORTED') {
                  //apiCall.functions.fromLoading = false Rajfix001 
                  response = {
                    status: 'error',
                    error: [{
                      errorCode: 'network error!',
                      errorMessage: 'Network error! Time Out happened Please Retry'
                    }]
                  }
                }
                else {
                  response = {
                    status: 'error',
                    error: [{
                      errorCode: 'network error!',
                      errorMessage: 'Network error! Please Retry'
                    }]
                  }
                }

              }
              else if (error.response != null && typeof error.response != 'undefined') {
                if (error.response.status != null && typeof error.response.status != 'undefined' && error.response.status == 500) {
                  response = {
                    status: 'error',
                    error: [{
                      errorCode: 'server error!',
                      errorMessage: 'Server is not responding please try after sometime.'
                    }]
                  }
                } 
                // start 3.0 UI/UX
                else  if (error.response.status != null && typeof error.response.status != 'undefined' && error.response.status == 404) {
                  response = {
                    status: 'error',
                    error: [{
                      errorCode: 'server error!',
                      errorMessage: 'Server is not responding please try after sometime.'
                    }]
                  }
                }

                // end 3.0 UI/UX
                else {
                  // response = {
                  //   status: 'error',
                  //   error: [{
                  //     errorCode: error.response.status,
                  //     errorMessage: error.response.data.replace(/(<([^>]+)>)/ig, '')
                  //   }]
                  // }
                  response = {
                    status: 'error',
                    error: [{
                      errorCode: 'server error!',
                      errorMessage: 'Server is not responding please try after sometime.'
                    }]
                  }
                }
              }
            }
          }
          else {
            response = {
              status: 'error',
              error: [{
                errorCode: 'network error!',
                errorMessage: 'Network error! Please Retry'
              }]
            }
          }
          if (apiObject.serviceName.includes('DashBoard')) {
            apiCall.apiError = true
            responseDispatch(response)
            apiCall.isDashBoardProgress = false
          }
          else {
            // if(response.error[0].errorCode == 'network error!'){
            //   var globalData = JSON.parse(await AsyncStorage.getItem('GLOBAL'));
            //   if(globalData != null){
            //     AsyncStorage.removeItem('Rst')
            //     GeneralUtils.functions.goToDashboardScreen(globalData.userType)
            //   }
            // }
            apiCall.apiError = true
            parentStateChange({
              // searchIsLoading: false,
              dashBoardPaymentIsloading: false,       // SHA05
              isLoading: false,
              error: response.error,
              errorType: 'BE',
              showAlert: true
            })
          }
          //  responseDispatch(response)//
          //}
          // }

        });
    }
    else {
      apiCall.apiError = true

      if (apiCall.callRequestTokenResponse != null && typeof apiCall.callRequestTokenResponse.error != 'undefined' && apiCall.callRequestTokenResponse.error[0].errorMessage != '' && apiCall.callRequestTokenResponse.error[0].errorMessage != 'Axios cancel') {
        if (apiObject.serviceName.includes('DashBoard')) {
          responseDispatch(apiCall.callRequestTokenResponse)
          apiCall.isDashBoardProgress = false
        }
        else {
          parentStateChange({
            // searchIsLoading: false,
            dashBoardPaymentIsloading: false,         // SHA05
            isLoading: false,
            error: apiCall.callRequestTokenResponse.error,
            errorType: 'BE',
            showAlert: true
          })
        }
      }
      else {
        // start NEAI-169
        if (apiObject.serviceName.includes('DashBoard')) {
          apiCall.isDashBoardProgress = false
        }
        parentStateChange({
          isLoading: false,
          dashBoardPaymentIsloading: false,
          showAlert: true,
          // error:  {"error_code":"FE-VAL-072","error_type":"E","errorMessage":"Please try again"},
          error: [{ errorCode: 'FE-VAL-072', errorMessage: '', errorParam: '' }],
          errorType: 'FE',
        })
      }
      // end NEAI-169

    }
  }
  catch (err) {
    console.log(err, 'callapi err')
    // start NEAI-169
    apiCall.apiError = true
    if (apiObject.serviceName.includes('DashBoard')) {
      apiCall.isDashBoardProgress = false
    }
    parentStateChange({
      isLoading: false,
      dashBoardPaymentIsloading: false,
      showAlert: true,
      error: [{ errorCode: 'FE-VAL-072', errorMessage: '', errorParam: '' }],
      errorType: 'FE',
    })
    // end  NEAI-169
  }

}






apiCall.getServiceToken = async function (serviceName) {
  var tempRst = JSON.parse(await AsyncStorage.getItem('Rst'));
  if (tempRst != null) {
    for (let item of tempRst) {
      if (item.service == serviceName) {
        return item.value
        // serviceExist = true
        break
      }

    }
  }
  return null;
}
apiCall.clearServiceToken = async function (serviceName) {
  var tempRst = JSON.parse(await AsyncStorage.getItem('Rst'));
  if (tempRst != null) {
    for (let item of tempRst) {
      if (item.service == serviceName) {
        item.value = ''
        // serviceExist = true
        await AsyncStorage.setItem('Rst', JSON.stringify(tempRst));
        break
      }

    }

  }
  return null;
}

apiCall.successHandler = async function (response, parentStateChange) {
  var globalData = JSON.parse(await AsyncStorage.getItem('GLOBAL'));



  if (response.data.header.operation != "Delete") {
    if (response.data.header.service == 'ChangePwd') {
      parentStateChange({
        isLoading: false
      })
      // Exception.functions.showFrontendError(parentStateChange, [{ errorCode: 'FE-VAL-050', errorMessage: '', errorParam: "" }])
      return
    }
  }
  //  starts 3.0 UI/UX
  // switch (apiCall.bottomTabClick) {
  switch (response.data.header.operation) {
    // ends 3.0 UI/UX
    // case 'Save':
    //   if (response.data.header.operation == 'Create') {
    //     if (response.data.header.service != "InstitutePayment") {
    //       parentStateChange({
    //         currentStep: 0,
    //         currentOperation: 'Default',
    //         isLoading: false
    //       })
    //       //  apiCall.bottomTabClick = ''
    //       Exception.functions.showFrontendError(parentStateChange, [{ errorCode: 'FE-VAL-012', errorMessage: '', errorParam: '' }])
    //     }
    //     else {
    //       parentStateChange({
    //         dataModel: response.data.body,
    //         isLoading: false
    //       })
    //     }
    //     //  end SHA02 
    //   }
    //   else if (response.data.header.operation == 'Modify') {

    //     if (response.data.header.service == "StudentProgressCard" && (globalData.userType == 'P' || globalData.userType == 'S')) {
    //       parentStateChange({
    //         currentStep: 0,
    //         currentOperation: 'ReadOnlyWithDatatable',
    //         isLoading: false
    //       })
    //       Exception.functions.showFrontendError(parentStateChange, [{ errorCode: 'FE-VAL-037', errorMessage: '', errorParam: ['Exam progress card'] }])
    //     }
    //     else if (response.data.header.service == "StudentSoftSkill" && (globalData.userType == 'P' || globalData.userType == 'S')) {
    //       parentStateChange({
    //         currentStep: 0,
    //         currentOperation: 'ReadOnlyWithDatatable',
    //         isLoading: false
    //       })
    //       Exception.functions.showFrontendError(parentStateChange, [{ errorCode: 'FE-VAL-037', errorMessage: '', errorParam: ['Soft skill'] }])
    //     }
    //     else if (response.data.header.service == "StudentECircular" && (globalData.userType == 'P' || globalData.userType == 'S')) {
    //       parentStateChange({
    //         currentStep: 0,
    //         currentOperation: 'ReadOnlyWithDatatable',
    //         isLoading: false
    //       })
    //       Exception.functions.showFrontendError(parentStateChange, [{ errorCode: 'FE-VAL-037', errorMessage: '', errorParam: ['eCircular'] }])
    //     }
    //     else if (response.data.header.service == "StudentOtherActivity" && (globalData.userType == 'P' || globalData.userType == 'S')) {
    //       parentStateChange({
    //         currentStep: 0,
    //         currentOperation: 'ReadOnlyWithDatatable',
    //         isLoading: false
    //       })
    //       Exception.functions.showFrontendError(parentStateChange, [{ errorCode: globalData.userType == 'P' ? 'FE-VAL-034' : 'FE-VAL-051', errorMessage: '', errorParam: "" }])
    //     }
    //     //  start SHA02 
    //     else if (response.data.header.service == "InstitutePayment") {
    //       parentStateChange({
    //         dataModel: response.data.body,
    //         isLoading: false
    //       })
    //     }
    //     //  end SHA02 
    //     else {
    //       parentStateChange({
    //         currentStep: 0,
    //         currentOperation: 'Default',
    //         isLoading: false
    //       })

    //       Exception.functions.showFrontendError(parentStateChange, [{ errorCode: 'FE-VAL-013', errorMessage: '', errorParam: '' }])
    //     }
    //   }

    //   break

    case 'Create':
      if (response.data.header.service != "InstitutePayment") {
        if (response.data.header.service == 'StripePayment') {
          parentStateChange({
          payDataModel: response.data.body,
          // auditDataModel: response.data.audit,
          isLoading: false,
          dashBoardPaymentIsloading: false,             // SHA05
        })
      }
      else{
        parentStateChange({
          dataModel: response.data.body,
          auditDataModel: response.data.audit,
          isLoading: false
        })
      }
        // Exception.functions.showFrontendError(parentStateChange, [{ errorCode: 'FE-VAL-012', errorMessage: '', errorParam: '' }])
      }
      else {
        parentStateChange({
          dataModel: response.data.body,
          isLoading: false
        })
      }
      break
    case 'Modify':
      if (response.data.header.service == "StudentProgressCard" && (globalData.userType == 'P' || globalData.userType == 'S')) {
        parentStateChange({
          // starts 3.0 UI/UX
          // currentStep: 0,
          // ends 3.0 UI/UX
          //currentOperation: 'ReadOnlyWithDatatable',
          isLoading: false
        })
        Exception.functions.showFrontendError(parentStateChange, [{ errorCode: 'FE-VAL-037', errorMessage: '', errorParam: ['Exam progress card'] }])
      }
      else if (response.data.header.service == "StudentSoftSkill" && (globalData.userType == 'P' || globalData.userType == 'S')) {
        parentStateChange({
          // starts 3.0 UI/UX
          // currentStep: 0,
          // ends 3.0 UI/UX
         // currentOperation: 'ReadOnlyWithDatatable',
          isLoading: false
        })
        Exception.functions.showFrontendError(parentStateChange, [{ errorCode: 'FE-VAL-037', errorMessage: '', errorParam: ['Soft skill'] }])
      }
      else if (response.data.header.service == "StudentECircular" && (globalData.userType == 'P' || globalData.userType == 'S')) {
        parentStateChange({
          // starts 3.0 UI/UX
          // currentStep: 0,
          // ends 3.0 UI/UX
          //currentOperation: 'ReadOnlyWithDatatable',
          isLoading: false
        })
        Exception.functions.showFrontendError(parentStateChange, [{ errorCode: 'FE-VAL-037', errorMessage: '', errorParam: ['eCircular'] }])
      }
      else if (response.data.header.service == "StudentOtherActivity" && (globalData.userType == 'P' || globalData.userType == 'S')) {
        parentStateChange({
          // starts 3.0 UI/UX
          // currentStep: 0,
          // ends 3.0 UI/UX
          //currentOperation: 'ReadOnlyWithDatatable',
          isLoading: false
        })
        Exception.functions.showFrontendError(parentStateChange, [{ errorCode: globalData.userType == 'P' ? 'FE-VAL-034' : 'FE-VAL-051', errorMessage: '', errorParam: "" }])
      }
      //  start SHA02 
      else if (response.data.header.service == "InstitutePayment") {
        parentStateChange({
          dataModel: response.data.body,
          isLoading: false
        })
      }
      //  end SHA02 
      else {
        parentStateChange({
          // starts 3.0 UI/UX
          // currentStep: 0,
          // currentOperation: 'Default',
          // ends 3.0 UI/UX
          dataModel: response.data.body,
          auditDataModel: response.data.audit,
          isLoading: false
        })

        // Exception.functions.showFrontendError(parentStateChange, [{ errorCode: 'FE-VAL-013', errorMessage: '', errorParam: '' }])
      }
      break

    case 'Delete':
      parentStateChange({
        // starts 3.0 UI/UX
        // currentStep: 0,
        // currentOperation: 'Default',
        // ends 3.0 UI/UX
        // dataModel: response.data.body,
        auditDataModel: response.data.audit,
        isLoading: false
      })
      if (response.data.header.service == "TeacherLeaveManagement" || response.data.header.service == "StudentLeaveManagement")
        Exception.functions.showFrontendError(parentStateChange, [{ errorCode: 'FE-VAL-107', errorMessage: '', errorParam: '' }])
      else 
      Exception.functions.showFrontendError(parentStateChange, [{ errorCode: 'FE-VAL-014', errorMessage: '', errorParam: '' }])
      break
    case 'Reject':
      parentStateChange({
        // starts 3.0 UI/UX
        // currentStep: 0,
        // currentOperation: 'Default',
        // ends 3.0 UI/UX
        dataModel: response.data.body,
        auditDataModel: response.data.audit,
        isLoading: false
      })
      if (response.data.header.service == "TeacherLeaveManagement" || response.data.header.service == "StudentLeaveManagement")
      Exception.functions.showFrontendError(parentStateChange, [{ errorCode: 'FE-VAL-109', errorMessage: '', errorParam: '' }])
      // Exception.functions.showFrontendError(parentStateChange, [{ errorCode: 'FE-VAL-017', errorMessage: '', errorParam: '' }])
      break
    case 'Auth':
      parentStateChange({
        // starts 3.0 UI/UX
        // currentStep: 0,
        // currentOperation: 'Default',
        // ends 3.0 UI/UX
        dataModel: response.data.body,
        auditDataModel: response.data.audit,
        isLoading: false
      })
      if(response.data.header.service == "StudentLeaveManagement")
       Exception.functions.showFrontendError(parentStateChange, [{ errorCode: 'FE-VAL-108', errorMessage: '', errorParam: '' }])
      break
    default:
      if (response.data.header.operation == 'Create-Default') {

        if (apiCall.CreateDefaultScreen.includes(response.data.header.service)) {
          parentStateChange({
            CreateDefaultDataModel: response.data.body,
            auditDataModel: response.data.audit,
            isLoading: false
          })
        }
        else {
          parentStateChange({
            dataModel: response.data.body,
            auditDataModel: response.data.audit,
            isLoading: false
          })
        }
      }
      else if (response.data.header.operation == 'Payment-Default') {
        parentStateChange({
          dataModel: response.data.body,
          auditDataModel: response.data.audit,
          isLoading: false
        })
      }
      // start SHA04
      // else if (response.data.header.service == 'StripePayment') {
      //   console.log('StripePayment',"StripePayment")
      //   parentStateChange({
      //     payDataModel: response.data.body,
      //     // auditDataModel: response.data.audit,
      //     isLoading: false,
      //     dashBoardPaymentIsloading: false,             // SHA05
      //   })
      // }
      // end SHA04
      // starts NEAI2-91
      else if (response.data.header.service == 'BlogCommentService') {
        parentStateChange({
          commentsDataModel: response.data.body,
          isLoading: false,
        })
      }
      else if (response.data.header.service == 'BlogRepliesService') {
        parentStateChange({
          repliesDataModel: response.data.body,
          isLoading: false,
        })
      }
      // ends NEAI2-91
      else {
        parentStateChange({
          dataModel: response.data.body,
          auditDataModel: response.data.audit,
          isLoading: false
        })
      }
      break
  }
}

apiCall.checkAlreadyExistsInSummaryResult = function (previousStateObject, SummaryResult) {
  var count;
  var count;
  var parentLevelPkeys = null;

  if(previousStateObject.state.serviceName == "StudyMaterial"){
      parentLevelPkeys = ['standard', 'subjectID'];
  }else if(previousStateObject.state.serviceName == "InstituteAssignment"){
      parentLevelPkeys = ['assignee', 'subjectID'];
  }
  // else if(previousStateObject.state.serviceName == "TeacherLessonPlanner"){
  //     parentLevelPkeys = ['teacherID', 'month', 'year'];
  // }
  else if(previousStateObject.state.serviceName == "InstituteFeeManagement"){
      parentLevelPkeys = ['groupID', 'feeType'];
  }
  else if(previousStateObject.state.serviceName == "ClassAssignment"){
    parentLevelPkeys = ['classID', 'subjectID','month','year'];
   }
   else if(previousStateObject.state.serviceName == "ClassAssignmentAssessment"){
    parentLevelPkeys = ['classID', 'subjectID','month','year'];
   }
   else if(previousStateObject.state.serviceName == "ClassAttendance"){
    parentLevelPkeys = ['classID','month','year'];
   }
   else if(previousStateObject.state.serviceName == "TeacherNotesService"){
    parentLevelPkeys = ['standard','subjectID'];
   }
   else if(previousStateObject.state.serviceName == "TeacherLessonPlannerService"){
    parentLevelPkeys = ['teacherID','year','month'];
   }
   else if(previousStateObject.state.serviceName == "TeacherLessonPlannerService"){
    parentLevelPkeys = ['teacherID','year','month'];
   }
   else if(previousStateObject.state.serviceName == "OnlineClassroomService"){
    parentLevelPkeys = ['subjectID','year','month'];
   }
   else if(previousStateObject.state.serviceName == "InstituteOtherActivity"){
    parentLevelPkeys = ['activityType','groupID'];
   }
   else if(previousStateObject.state.serviceName == "Notification"){
    parentLevelPkeys = ['notificationType','year','month'];
   }
   else if(previousStateObject.state.serviceName == "ECircular"){
     if(previousStateObject.state.summaryDataModel.filter.circularType == 'S'){
      parentLevelPkeys = ['year','month','groupID'];
     }
    else{
      parentLevelPkeys = ['year','month'];
    }
   }
   else if(previousStateObject.state.serviceName == "TeacherLeaveManagement"){
    parentLevelPkeys = ['year','month'];
   }
   else if(previousStateObject.state.serviceName == "StudentLessonPlannerService"){
    parentLevelPkeys = ['year','month'];
   }
   
  if( parentLevelPkeys!=null ){
      for( var i=0; i<previousStateObject.state.summaryDataModel.SummaryResult.length; i++ ){
          count = 0;
          for( var j=0; j<parentLevelPkeys.length; j++ ){
              if( SummaryResult[parentLevelPkeys[j]] == previousStateObject.state.summaryDataModel.SummaryResult[i][parentLevelPkeys[j]] ){
                  count++;
                  //console.log(parentLevelPkeys[j]+" is matching");
              }
          }
          //console.log( parentLevelPkeys.length+" == "+count +" ===>" +(parentLevelPkeys.length == count) );
          if(parentLevelPkeys.length == count){
              return true;
          }
      }
  }
  else{
    for (var i = 0; i < previousStateObject.state.summaryDataModel.SummaryResult.length; i++) {
      count = 0;
      for (var j = 0; j < previousStateObject.state.primaryKeyCols.length; j++) {
  
        if (SummaryResult[previousStateObject.state.primaryKeyCols[j]] == previousStateObject.state.summaryDataModel.SummaryResult[i][previousStateObject.state.primaryKeyCols[j]]) {
          count++;
        }
  
      }
      if (previousStateObject.state.primaryKeyCols.length == count) {
        return true;
      }
    }
  }
 
  return false;
}



// function checkAlreadyExistsInSummaryResult($scope, SummaryResult){
//   var count;
//   var parentLevelPkeys = null;
//   //teacherless plann -> if no month year, t ID

//   if($scope.subScreenScope.serviceName == "StudyMaterial"){
//       parentLevelPkeys = ['standard', 'subjectID'];
//   }else if($scope.subScreenScope.serviceName == "InstituteAssignment"){
//       parentLevelPkeys = ['assignee', 'subjectID'];
//   }
//   else if($scope.subScreenScope.serviceName == "TeacherLessonPlanner"){
//       parentLevelPkeys = ['teacherID', 'month', 'year'];
//   }
//   else if($scope.subScreenScope.serviceName == "InstitutePayment"){
//       parentLevelPkeys = ['groupID', 'feeType'];
//   }

//   if( parentLevelPkeys!=null ){
//       for( var i=0; i<$scope.subScreenScope.summaryDataModel.SummaryResult.length; i++ ){
//           count = 0;
//           for( var j=0; j<parentLevelPkeys.length; j++ ){
//               if( SummaryResult[parentLevelPkeys[j]] == $scope.subScreenScope.summaryDataModel.SummaryResult[i][parentLevelPkeys[j]] ){
//                   count++;
//                   //console.log(parentLevelPkeys[j]+" is matching");
//               }
//           }
//           //console.log( parentLevelPkeys.length+" == "+count +" ===>" +(parentLevelPkeys.length == count) );
//           if(parentLevelPkeys.length == count){
//               return true;
//           }
//       }
//   }
//   else{
//       for( var i=0; i<$scope.subScreenScope.summaryDataModel.SummaryResult.length; i++ ){
//           count = 0;
//           for( var j=0; j<$scope.subScreenScope.primaryKeyCols.length; j++ ){
//               if( SummaryResult[$scope.subScreenScope.primaryKeyCols[j]] == $scope.subScreenScope.summaryDataModel.SummaryResult[i][$scope.subScreenScope.primaryKeyCols[j]] ){
//                   count++;
//               }
//           }
//           if($scope.subScreenScope.primaryKeyCols.length == count){
//               return true;
//           }
//       }
//   }
//   return false;
// }

apiCall.secondLevelLoadMore = function (previousStateObject,response) {
if(response.data.header.service == 'InstitutePaymentSummary'){
           previousStateObject.state.childViewDetails.amountCollected = response.data.body.SummaryResult[0].amountCollected
                previousStateObject.state.childViewDetails.paymentDate = response.data.body.SummaryResult[0].paymentDate
                previousStateObject.state.childViewDetails.paymentDetails  =  [...previousStateObject.state.childViewDetails.paymentDetails,...response.data.body.SummaryResult[0].paymentDetails]
}
else if (response.data.header.service == 'TeacherNotesSummary'){
  previousStateObject.state.childViewDetails.notesCount = response.data.body.SummaryResult[0].notesCount
  previousStateObject.state.childViewDetails.standard = response.data.body.SummaryResult[0].standard
  previousStateObject.state.childViewDetails.subjectName = response.data.body.SummaryResult[0].subjectName
  previousStateObject.state.childViewDetails.notesDetails  =  [...previousStateObject.state.childViewDetails.notesDetails,...response.data.body.SummaryResult[0].notesDetails]
}

else if (response.data.header.service == 'StudentNotesSummary'){
  previousStateObject.state.childViewDetails.notesCount = response.data.body.SummaryResult[0].notesCount
  // previousStateObject.state.childViewDetails.standard = response.data.body.SummaryResult[0].standard
  previousStateObject.state.childViewDetails.subjectName = response.data.body.SummaryResult[0].subjectName
  previousStateObject.state.childViewDetails.notesDetails  =  [...previousStateObject.state.childViewDetails.notesDetails,...response.data.body.SummaryResult[0].notesDetails]
}

else if (response.data.header.service == 'OnlineClassroomSummary'){
  // previousStateObject.state.childViewDetails.meetingCount = response.data.body.SummaryResult[0].meetingCount
  // previousStateObject.state.childViewDetails.subjectID = response.data.body.SummaryResult[0].subjectID
  // previousStateObject.state.childViewDetails.subjectName = response.data.body.SummaryResult[0].subjectName
  previousStateObject.state.childViewDetails.roomDetails  =  [...previousStateObject.state.childViewDetails.roomDetails,...response.data.body.SummaryResult[0].roomDetails]
}
 
}


// end 




module.exports = {
  functions: apiCall
};





