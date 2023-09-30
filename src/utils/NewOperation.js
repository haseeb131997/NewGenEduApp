
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




import AsyncStorage from "@react-native-async-storage/async-storage";
import GeneralUtils from "../utils/GeneralUtils";
import apiCall from "../ApiCall/ActionApi";
import Exception from './Exception'
import cloneDeep from 'lodash/cloneDeep';
import ScreenUtils from "../utils/ScreenUtils";
import CustomCacheMemory from "./CustomCacheMemory";




class NewOperation { }

NewOperation.isRequiredVersion_in_API = ['TeacherLessonPlannerSummary','StudyMaterialSummary','ClassAssignmentSummary','ClassAssignmentAssessmentSummary','InstituteAssignmentSummary','InstituteFeeManagementSummary','TeacherLeaveManagementSummary','StudentLeaveManagementSummary','ECircularSummary','InstituteOtherActivitySummary']


// NewOperation.checkCalendar  = null

NewOperation.screenEventHandler = async function (stateObject) {
  try {

    var globalData = JSON.parse(await AsyncStorage.getItem('GLOBAL'));
    apiCall.functions.apiCallRequired = false;
    // var operation = await AsyncStorage.getItem('CurrentOperation');
    // var apiObject;

    // var emptyDataModel = cloneDeep(stateObject.state.emptyDataModel)
    // var emptyAuditDataModel = cloneDeep(stateObject.state.emptyAuditDataModel)
    // var emptySummaryDataModel = cloneDeep(stateObject.state.emptySummaryDataModel)
  

    if (stateObject.state.currentOperation !== null) {
      switch (stateObject.state.currentOperation) {
        case 'Create':
          console.log('stateObject.state.currentStep inside create',stateObject.state.currentStep);
          if(stateObject.state.currentStep==1 && stateObject.state.serviceName=='Notification') 
              {
                stateObject.setState({
                  //currentOperation: 'Create-Default',
                  //currentStep: stateObject.state.currentStep + 1,
                  // dataModel: dummyDataModel,
                  // auditDataModel: dummyAuditDataModel,
                  //dataModel: SubScreenUtils.copyAction ? stateObject.state.dataModel : dummyDataModel,
                  //auditDataModel: SubScreenUtils.copyAction ? stateObject.state.auditDataModel : dummyAuditDataModel,
                  editable: false,
                  errorField: [],
                  //remarks: '',
                  editable: false,
                  primaryKeyEditable: false,
                }, () => {      
                  NewOperation.createDefault(stateObject)
                })

              }
              else
       await NewOperation.create(stateObject)
          break;
        case 'Create-Default':
          await NewOperation.createDefault(stateObject)
          break;

        case 'Query':
          await NewOperation.view(stateObject)
          break;
        case 'SummaryQuery':

          await NewOperation.summaryQuery(stateObject)
          break;
        // case 'SearchInFilter':
        //   await NewOperation.search(stateObject)
        //   break;
        case 'Search':
          await NewOperation.search(stateObject)
          break;
        // case 'Modification':
        //   await NewOperation.view(stateObject)
        //   break;
        case 'ModificationStep1':
          await NewOperation.view(stateObject)
          break;
        case 'Deletion':
          break;
        // case 'Authorisation':singleRecordView
        //   break;
        case 'AuthorisationStep1':
          await NewOperation.view(stateObject)
          break;
        case 'singleRecordView':

          await NewOperation.singleRecordView(stateObject)

          break;
        case 'SecondLevel':
          await NewOperation.SecondLevel(stateObject);
          break
        case 'startClassroom':
          break;
        case 'joinClassroom':

          break;

        case 'Report':

          break;
        case 'ReadOnly':

          break;
        case 'ReadOnlyWithDatatable':

          break;
        // start NEAI2-68
        case 'CreateWithQuery':

          break;
        // end NEAI2-68

      }
    }
    // Operation.nextClickProgress = false
  }
  catch (error) {
    // Operation.nextClickProgress = false
    throw error
  }
}

NewOperation.screenBackEventHandler = async function (stateObject) {
  try {
    // if (Operation.previousClickProgress == false) {
    //   Operation.previousClickProgress = true
    // }
    // else {
    //   Operation.previousClickProgress = false
    // }
    //  start NEAI2-145
    var emptyDataModel = cloneDeep(stateObject.state.emptyDataModel)
    //  ends NEAI2-145

    console.log(stateObject.state.currentOperation,"currentOperation in ")

    if (stateObject.state.currentOperation !== null) {
      console.log('stateObject.state.currentStep inside create handler',stateObject.state.currentStep);
      //console.log(operation)
      switch (stateObject.state.currentOperation) {
        
        case 'Create':
          switch (stateObject.state.currentStep) {
            case 1:
              stateObject.parentStateChange({
                currentStep: stateObject.state.currentStep - 1,
                currentOperation: 'Create',
                editable: false,
                primaryKeyEditable: false
              })
              break
            default:
              
              {
              stateObject.parentStateChange({
                currentStep: stateObject.state.currentStep - 1,
                currentOperation: 'Create',
                editable: false,
                primaryKeyEditable: false
              })
            }
              // await NewOperation.DefaultStep('Create', stateObject)
              break;
          }
          break
        case 'CreatDefault':

          break
        case 'Query':

          break
        case 'Modification':

          break
        case 'Deletion':

          break
        case 'Authorisation':

          break

          break
        case 'joinClassroom':


        case 'Report':

          break

        case 'ReadOnly':

          break

        case 'ReadOnlyWithDatatable':

          break

        case 'CreateWithQuery':

          break

      }

    }
    // Operation.previousClickProgress = false
  }
  catch (error) {
    // Operation.previousClickProgress = false
    throw error
  }
}


NewOperation.createDefault = async function (stateObject,) {
  var apiObject
  var operation = 'Create-Default'
  var emptyAuditDataModel = cloneDeep(stateObject.state.emptyAuditDataModel)

  apiObject = {
    serviceName: stateObject.state.serviceName,
    serviceType: stateObject.state.serviceType,
    datamodel: stateObject.state.dataModel,
    operation: 'Create-Default',
    businessEntity: [],
    audit: stateObject.state.auditDataModel
  }

  apiCall.functions.apiCallRequired = true


  if (await stateObject.beforeApicall(operation, stateObject.state.currentStep, apiObject)) {
    if (apiCall.functions.apiCallRequired) {
      var businessEntity = []
      var i = 0
      for (let value of stateObject.state.primaryKeyCols) {
        businessEntity[i] =
        {
          entityName: value,
          entityValue: stateObject.state.dataModel[value]
        }
        i++
      }
      apiObject.businessEntity = businessEntity
      if (await GeneralUtils.functions.fnDefaultandValidateAudit(stateObject)) {
        // apiCall.functions.bottomTabClick = ''
        await apiCall.functions.callApi(apiObject, null, stateObject.parentStateChange)
      }
      else {
        // Operation.nextClickProgress = false
        return true
      }
      if (apiCall.functions.apiError) {
        // Operation.nextClickProgress = false
        return true
      }
      if (await stateObject.afterApiCall(operation, stateObject.state.currentStep,)) {
        stateObject.parentStateChange({
          currentStep: stateObject.state.currentStep + 1,
          currentOperation: 'Create',
          auditDataModel: emptyAuditDataModel,
          editable: false,
          primaryKeyEditable: false,
        })
        // Operation.nextClickProgress = false
        return true
      }

    }
  }
  return true
}

NewOperation.paymentCreateDefault = async function (stateObject,) {
  var apiObject
  var operation = 'Payment-Default'
  var emptyAuditDataModel = cloneDeep(stateObject.state.emptyAuditDataModel)

  apiObject = {
    serviceName: stateObject.state.serviceName,
    serviceType: stateObject.state.serviceType,
    datamodel: stateObject.state.dataModel,
    operation: 'Payment-Default',
    businessEntity: [],
    audit: stateObject.state.auditDataModel
  }

  apiCall.functions.apiCallRequired = true


  if (await stateObject.beforeApicall(operation, stateObject.state.currentStep, apiObject)) {
    if (apiCall.functions.apiCallRequired) {
      var businessEntity = []
      var i = 0
      for (let value of stateObject.state.primaryKeyCols) {
        businessEntity[i] =
        {
          entityName: value,
          entityValue: stateObject.state.dataModel[value]
        }
        i++
      }
      apiObject.businessEntity = businessEntity
      if (await GeneralUtils.functions.fnDefaultandValidateAudit(stateObject)) {
        // apiCall.functions.bottomTabClick = ''
        await apiCall.functions.callApi(apiObject, null, stateObject.parentStateChange)
      }
      else {
        // Operation.nextClickProgress = false
        return true
      }
      if (apiCall.functions.apiError) {
        // Operation.nextClickProgress = false
        return true
      }
      if (await stateObject.afterApiCall(operation, stateObject.state.currentStep,)) {
        stateObject.parentStateChange({
          currentStep: stateObject.state.currentStep + 1,
          currentOperation: 'Create',
          auditDataModel: emptyAuditDataModel,
          editable: false,
          primaryKeyEditable: false,
        })
        // Operation.nextClickProgress = false
        return true
      }

    }
  }
  return true
}


NewOperation.create = async function (stateObject) {


  apiCall.functions.apiCallRequired = false

  var apiObject
  var operation = 'Create'


  apiObject = {
    serviceName: stateObject.state.serviceName,
    serviceType: stateObject.state.serviceType,
    datamodel: stateObject.state.dataModel,
    operation: 'Create',
    businessEntity: [],
    audit: stateObject.state.auditDataModel
  }



  if ((stateObject.state.createStepsHeading.length - 1) == stateObject.state.currentStep) {
    apiCall.functions.apiCallRequired = true
  }

  if (await stateObject.mandatoryCheck(operation, stateObject.state.currentStep)) {
    var businessEntity = []
    var i = 0
    for (let value of stateObject.state.primaryKeyCols) {
      if (stateObject.state.dataModel[value] != null && stateObject.state.dataModel[value] != undefined) {
        businessEntity[i] =
        {
          entityName: value,
          entityValue: stateObject.state.dataModel[value]
        }
      }
      else {
        businessEntity[i] =
        {
          entityName: value,
          entityValue: ''
        }
      }
      i++
    }

    if (await stateObject.beforeApicall(operation, stateObject.state.currentStep, apiObject)) {

      if (apiCall.functions.apiCallRequired) {
        var businessEntity = []
        var i = 0
        for (let value of stateObject.state.primaryKeyCols) {
          businessEntity[i] =
          {
            entityName: value,
            entityValue: stateObject.state.dataModel[value]
          }
          i++
        }
        apiObject.businessEntity = businessEntity

        if (await GeneralUtils.functions.fnDefaultandValidateAudit(stateObject)) {
          await apiCall.functions.callApi(apiObject, null, stateObject.parentStateChange)
        }
        else {
          return true
        }
        if (apiCall.functions.apiError) {
          return true
        }
        if (await stateObject.afterApiCall(operation, stateObject.state.currentStep,)) {

          await  ScreenUtils.functions.updateSummaryResult(operation, stateObject)
          if ((stateObject.state.createStepsHeading.length - 1) == stateObject.state.currentStep) {
            // var secondLevel
            //   try{
            //     secondLevel = stateObject.state.childViewDetails
            //   }
            // catch(err){
            //     secondLevel = false
            // }

              // if(secondLevel != undefined && !secondLevel) {
              //     stateObject.parentStateChange({
              //       currentStep: stateObject.state.currentStep + 1,
              //       auditDataModel: stateObject.state.auditDataModel,
              //       dataModel: stateObject.state.dataModel,
              //       summaryDataModel: stateObject.state.summaryDataModel,
              //       currentOperation: 'Create',
              //       editable: false,
              //       primaryKeyEditable: false,
              //       childViewDetails:stateObject.state.childViewDetails,
              //       calendarRefresh:stateObject.state.calendarRefresh,
              //       calendarEmptyRefresh:stateObject.state.calendarEmptyRefresh,
              //     })
              // }
              // else{
                stateObject.parentStateChange({
                    currentStep: stateObject.state.currentStep + 1,
                    auditDataModel: stateObject.state.auditDataModel,
                    dataModel: stateObject.state.dataModel,
                    summaryDataModel: stateObject.state.summaryDataModel,
                    summaryResultByFilter: stateObject.state.summaryResultByFilter,
                    currentOperation: 'Create',
                    editable: false,
                    primaryKeyEditable: false,
                  })
              // }
           
          }
          else {
            stateObject.parentStateChange({
              currentStep: stateObject.state.currentStep + 1,
              auditDataModel: stateObject.state.auditDataModel,
              dataModel: stateObject.state.dataModel,
              summaryDataModel: stateObject.state.summaryDataModel,
              summaryResultByFilter: stateObject.state.summaryResultByFilter,
              editable: false,
              primaryKeyEditable: false
            })
          }

          return
        }

      }
      else {
        stateObject.parentStateChange({
          currentStep: stateObject.state.currentStep + 1,
          editable: false,
          primaryKeyEditable: false
        })
      }
    }
  }


}



NewOperation.summaryQuery = async function (stateObject) {
  console.log('inside summaryQuery  sss');
  var operation = 'SummaryQuery'
  var businessEntity = []
  var i = 0
  for (let value of stateObject.state.primaryKeyCols) {
    console.log('inside summaryQuery  filter verification',stateObject.state.summaryDataModel.filter);
    if (stateObject.state.summaryDataModel.filter[value] != null && stateObject.state.summaryDataModel.filter[value] != undefined) {
      businessEntity[i] =
      {
        entityName: value,
        entityValue: stateObject.state.summaryDataModel.filter[value]
      }
    }
    else {
      businessEntity[i] =
      {
        entityName: value,
        entityValue: ''
      }
    }
    i++
  }
  apiCall.functions.apiCallRequired = true

  var apiObject
  var dummyDataModel

  if (await stateObject.beforeApiSummarycall(operation, stateObject.state.currentStep, apiObject)) {
    if (apiCall.functions.apiCallRequired) {


      if (stateObject.state.summaryDataModel.pageDetails.moreRecExists) {
        dummyDataModel = cloneDeep(stateObject.state.summaryDataModel)
        dummyDataModel.SummaryResult = []
       
        apiObject = {
          serviceName: stateObject.state.summaryService,
          serviceType: stateObject.state.summaryServiceType,
          datamodel: dummyDataModel,
          operation: 'View',
          businessEntity: businessEntity,
          audit: stateObject.state.auditDataModel
        }
        apiObject.datamodel.pageDetails.searchType = 'More'

      } else {

       
        await NewOperation.checkRefreshRequired(stateObject)
       
        stateObject.state.intialFetching = true
          
        
        
        if (CustomCacheMemory.functions.checkSummaryDataModelExistenceInCache(stateObject.state.serviceName,stateObject.state.summaryDataModel)) {
         console.log('Summary query cache is available')
          stateObject.state.summaryDataModel = CustomCacheMemory.functions.getSummaryDataModelFromCache(stateObject.state.serviceName,stateObject.state.summaryDataModel);
            // await NewOperation.checkRefreshRequired(stateObject)
          stateObject.parentStateChange({
            summaryDataModel: stateObject.state.summaryDataModel,
            intialFetching: false,
          })
          apiCall.functions.apiCallRequired = false
          apiCall.functions.fromLoading = false

        }
      
        else {
           //Rajfix001 starts
        if (apiCall.functions.apiError) {
          console.log('referesh check is failed raj');
          apiCall.functions.apiCallRequired = false
          //return false;
         }
         //Rajfix001 fix ends*/
        else{ 
          apiCall.functions.apiCallRequired = true
          apiObject = {
            serviceName: stateObject.state.summaryService,
            serviceType: stateObject.state.summaryServiceType,
            datamodel: stateObject.state.summaryDataModel,
            operation: 'View',
            businessEntity: businessEntity,
            audit: stateObject.state.auditDataModel
          }

          apiObject.datamodel.pageDetails.searchType = 'Initial'
        }
        }
      }

    

      if (apiCall.functions.apiCallRequired) {
        // if (NewOperation.isRequiredVersion_in_API.includes(stateObject.state.summaryService))

          apiObject.datamodel.version = GeneralUtils.functions.version_in_API;

        await apiCall.functions.callApi(apiObject, null, stateObject.parentStateChange, stateObject)
         
        if (apiCall.functions.apiError) {
          console.log('inside apierror true')
          return true
        }
        if (await stateObject.afterApiSummaryCall(operation, stateObject.state.currentStep)) {

          stateObject.parentStateChange({
            // currentOperation: 'SearchShow',
            displayContent: "summaryDataModel"
          })
        }
      }
    }

  }

  // }
}

//Rajfix001 starts


NewOperation.ParentTransactionScreenSummaryQuery = async function (stateObject) {
  console.log('inside summaryQuery  sss');
  var operation = 'SummaryQuery'
  var businessEntity = []
  var i = 0
  for (let value of stateObject.state.primaryKeyCols) {
    console.log('inside summaryQuery  filter verification',stateObject.state.summaryDataModel.filter);
    if (stateObject.state.summaryDataModel.filter[value] != null && stateObject.state.summaryDataModel.filter[value] != undefined) {
      businessEntity[i] =
      {
        entityName: value,
        entityValue: stateObject.state.summaryDataModel.filter[value]
      }
    }
    else {
      businessEntity[i] =
      {
        entityName: value,
        entityValue: ''
      }
    }
    i++
  }
  apiCall.functions.apiCallRequired = true

  var apiObject
  var dummyDataModel

  if (await stateObject.beforeApiSummarycall(operation, stateObject.state.currentStep, apiObject)) {
    if (apiCall.functions.apiCallRequired) {


      if (stateObject.state.summaryDataModel.pageDetails.moreRecExists) {
        dummyDataModel = cloneDeep(stateObject.state.summaryDataModel)
        dummyDataModel.SummaryResult = []
       
        apiObject = {
          serviceName: stateObject.state.summaryService,
          serviceType: stateObject.state.summaryServiceType,
          datamodel: dummyDataModel,
          operation: 'View',
          businessEntity: businessEntity,
          audit: stateObject.state.auditDataModel
        }
        apiObject.datamodel.pageDetails.searchType = 'More'

      } else {

       
        //await NewOperation.checkRefreshRequired(stateObject)
       
        stateObject.state.intialFetching = true
          
        
        
       /* if (CustomCacheMemory.functions.checkSummaryDataModelExistenceInCache(stateObject.state.serviceName,dummyDataModel)) {
          stateObject.state.summaryDataModel = CustomCacheMemory.functions.getSummaryDataModelFromCache(stateObject.state.serviceName,dummyDataModel);
            // await NewOperation.checkRefreshRequired(stateObject)
          stateObject.parentStateChange({
            summaryDataModel: stateObject.state.summaryDataModel,
            intialFetching: false,
          })
          apiCall.functions.apiCallRequired = false
          apiCall.functions.fromLoading = false

        }*/
      
        //else {
           //Rajfix001 starts
       /* if (apiCall.functions.apiError) {
          console.log('referesh check is failed raj');
          apiCall.functions.apiCallRequired = false
          //return false;
         }*/
         //Rajfix001 fix ends*/
        //else{ 
          apiCall.functions.apiCallRequired = true
          apiObject = {
            serviceName: stateObject.state.summaryService,
            serviceType: stateObject.state.summaryServiceType,
            datamodel: stateObject.state.summaryDataModel,
            operation: 'View',
            businessEntity: businessEntity,
            audit: stateObject.state.auditDataModel
          }

          apiObject.datamodel.pageDetails.searchType = 'Initial'
        }
        
      

    

      if (apiCall.functions.apiCallRequired) {
        // if (NewOperation.isRequiredVersion_in_API.includes(stateObject.state.summaryService))

          apiObject.datamodel.version = GeneralUtils.functions.version_in_API;

        await apiCall.functions.callApi(apiObject, null, stateObject.parentStateChange, stateObject)
         
        if (apiCall.functions.apiError) {
          console.log('inside apierror true')
          return true
        }
        if (await stateObject.afterApiSummaryCall(operation, stateObject.state.currentStep)) {

        
            if(stateObject.state.userType == 'P' || stateObject.state.userType == 'S'){
            CustomCacheMemory.functions.putStudentSearchResultInCache(stateObject.state.summaryDataModel.filter.studentID, stateObject.state.summaryService, stateObject.state.summaryDataModel);
            }
          stateObject.parentStateChange({
            // currentOperation: 'SearchShow',
            displayContent: "summaryResultByFilter"
          })
        
        }
      }
    }

  }

  // }
}

NewOperation.refreshScreen = async function (stateObject) {
  var operation = 'SummaryQuery'
  var businessEntity = []
  var i = 0
  for (let value of stateObject.state.primaryKeyCols) {
    if (stateObject.state.summaryDataModel.filter[value] != null && stateObject.state.summaryDataModel.filter[value] != undefined) {
      businessEntity[i] =
      {
        entityName: value,
        entityValue: stateObject.state.summaryDataModel.filter[value]
      }
    }
    else {
      businessEntity[i] =
      {
        entityName: value,
        entityValue: ''
      }
    }
    i++
  }
  apiCall.functions.apiCallRequired = true

  var apiObject

  if (await stateObject.beforeApiSummarycall(operation, stateObject.state.currentStep, apiObject)) {
    if (apiCall.functions.apiCallRequired) {
          apiCall.functions.apiCallRequired = true
          apiObject = {
            serviceName: stateObject.state.summaryService,
            serviceType: stateObject.state.summaryServiceType,
            datamodel: stateObject.state.summaryDataModel,
            operation: 'View',
            businessEntity: businessEntity,
            audit: stateObject.state.auditDataModel
          }

          apiObject.datamodel.pageDetails.searchType = 'Initial'


      if (apiCall.functions.apiCallRequired) {
        // if (NewOperation.isRequiredVersion_in_API.includes(stateObject.state.summaryService))

          apiObject.datamodel.version = GeneralUtils.functions.version_in_API;

        await apiCall.functions.callApi(apiObject, null, stateObject.parentStateChange, stateObject)

        if (apiCall.functions.apiError) {
          return true
        }
        if (await stateObject.afterApiSummaryCall(operation, stateObject.state.currentStep)) {
          stateObject.parentStateChange({
            displayContent: "summaryDataModel"
          })

        }
      }
    }

  }

  // }
}





NewOperation.search = async function (stateObject) {

  var operation = 'Search'
  var businessEntity = []
  var i = 0
  for (let value of stateObject.state.primaryKeyCols) {
    if (stateObject.state.summaryDataModel.filter[value] != null && stateObject.state.summaryDataModel.filter[value] != undefined) {
      businessEntity[i] =
      {
        entityName: value,
        entityValue: stateObject.state.summaryDataModel.filter[value]
      }
    }
    else {
      businessEntity[i] =
      {
        entityName: value,
        entityValue: ''
      }
    }
    i++
  }

  apiCall.functions.apiCallRequired = true

  var apiObject
  var dummyDataModel

  if (await stateObject.mandatoryCheck(operation, stateObject.state.currentStep)) {
    if (await stateObject.beforeApiSearchcall(operation, stateObject.state.currentStep, apiObject)) {
      if (apiCall.functions.apiCallRequired) {
        dummyDataModel = cloneDeep(stateObject.state.summaryDataModel)
        dummyDataModel.SummaryResult = []
        apiObject = {
          serviceName: stateObject.state.summaryService,
          serviceType: stateObject.state.summaryServiceType,
          datamodel: dummyDataModel,
          operation: 'View',
          businessEntity: businessEntity,
          audit: stateObject.state.auditDataModel
        }

        apiObject.datamodel.pageDetails.searchType = 'Filter'

        // if (NewOperation.isRequiredVersion_in_API.includes(stateObject.state.summaryService))
          apiObject.datamodel.version = GeneralUtils.functions.version_in_API;

        await apiCall.functions.callApi(apiObject, null, stateObject.parentStateChange, stateObject)

        if (apiCall.functions.apiError) {
          return true
        }
        if (await stateObject.afterApiSearchCall(operation, stateObject.state.currentStep)) {
          if (stateObject.state.userType == 'P' || stateObject.state.userType == 'S') {
            CustomCacheMemory.functions.putStudentSearchResultInCache(stateObject.state.summaryDataModel.filter.studentID, stateObject.state.summaryService, stateObject.state.summaryResultByFilter.SummaryResult);
          }
          stateObject.parentStateChange({
            currentOperation: 'SearchShow',
            displayContent: "summaryResultByFilter"
          })
        }
      }

    }

  }
}


NewOperation.view = async function (stateObject) {

  var emptyDataModel = cloneDeep(stateObject.state.emptyDataModel)
  var emptyAuditDataModel = cloneDeep(stateObject.state.emptyAuditDataModel)

  var operation = stateObject.state.currentOperation

  for (const property in stateObject.state) {
    if (property.includes('SelectedIndex')) {
      stateObject.state[property] = 1
    }
  }

  var businessEntity = []
  var i = 0


  for (let value of stateObject.state.primaryKeyCols) {
    emptyDataModel[value] = stateObject.state.viewDetail[value]
  }
  stateObject.parentStateChange({
    dataModel: emptyDataModel
  })



  for (let value of stateObject.state.primaryKeyCols) {
    //            start SHA070921
    if (stateObject.state.serviceName == "OnlineMeetingAttendanceService" && value == "studentID" && stateObject.state.dataModel.studentID == "") {
      continue;
    }
    //            ends SHA070921
    if (stateObject.state.dataModel[value] == '') {
      Exception.functions.showFrontendError(stateObject.parentStateChange, [{ errorCode: 'FE-VAL-029', errorMessage: '', errorParam: '' }])
      return false;
    }
    if (stateObject.state.dataModel[value] != null && stateObject.state.dataModel[value] != undefined) {
      businessEntity[i] =
      {
        entityName: value,
        entityValue: stateObject.state.dataModel[value]
      }
    }
    else {
      businessEntity[i] =
      {
        entityName: value,
        entityValue: ''
      }
    }
    i++
  }


  var apiObject = {
    serviceName: stateObject.state.serviceName,
    serviceType: stateObject.state.serviceType,
    datamodel: stateObject.state.dataModel,
    operation: 'View',
    businessEntity: businessEntity,
    audit: stateObject.state.auditDataModel
  }

  apiCall.functions.apiCallRequired = true
  if (await stateObject.beforeApicall(operation, stateObject.state.currentStep, apiObject)) {

    if (apiCall.functions.apiCallRequired) {
      stateObject.parentStateChange({
        selectedTabIndex: 0,
        dataModel: emptyDataModel,
        remarks: '',
        auditDataModel: emptyAuditDataModel
      })
      // if (GeneralUtils.functions.fnDefaultandValidateAudit(stateObject))



      await apiCall.functions.callApi(apiObject, null, stateObject.parentStateChange)

      if (apiCall.functions.apiError) {
        return true
      }
      if (await stateObject.afterApiCall(operation, stateObject.state.currentStep)) {

      }
    }
    if(stateObject.state.serviceName == 'NewStudentAssignment' && stateObject.state.showAnswer){
      stateObject.parentStateChange({
        currentOperation: 'Create',
        editable:  false ,
        primaryKeyEditable: true,
        selectedTabIndex: 0,
      })
    }
    else{
      stateObject.parentStateChange({
        currentOperation: NewOperation.openModal(stateObject.state.currentOperation),
        editable: stateObject.state.currentOperation == 'ModificationStep1' ? false : true,
        primaryKeyEditable: stateObject.state.currentOperation == 'ModificationStep1' ? true : false,
        selectedTabIndex: 0,
      })
    }

    
  }
}

NewOperation.singleRecordView = async function (stateObject) {
  
  console.log('apiCall.functions.fromLoading inside singlerecordview',apiCall.functions.fromLoading)

  var operation = 'singleRecordView'

  for (const property in stateObject.state) {
    if (property.includes('SelectedIndex')) {
      stateObject.state[property] = 1
    }
  }

  var businessEntity = []
  var i = 0



  for (let value of stateObject.state.primaryKeyCols) {
    businessEntity[i] =
    {
      entityName: value,
      entityValue: ''
    }
    i++
  }

  var apiObject = {
    serviceName: stateObject.state.serviceName,
    serviceType: stateObject.state.serviceType,
    datamodel: stateObject.state.dataModel,
    operation: 'View',
    businessEntity: businessEntity,
    audit: stateObject.state.auditDataModel
  }

  apiCall.functions.apiCallRequired = true
  if (await stateObject.beforeApicall(operation, stateObject.state.currentStep, apiObject)) {

    if (apiCall.functions.apiCallRequired) {
      console.log('apiCall.functions.fromLoading inside singleRecordView',apiCall.functions.fromLoading)
      await apiCall.functions.callApi(apiObject, null, stateObject.parentStateChange)
      apiCall.functions.fromLoading =false;
      if (apiCall.functions.apiError) {
        return true
      }
      if (await stateObject.afterApiCall(operation, stateObject.state.currentStep)) {
        // intialFetching
        stateObject.parentStateChange({
          intialFetching: false,
          selectedTabIndex: 0,
        })

      }
    }
  }
}
//N0U-103 starts
NewOperation.viewRecordfornextOperation = async function (stateObject) { 
  var operation = 'viewRecord'
  //if (await stateObject.mandatoryCheck(operation, stateObject.state.currentStep)) {
  var businessEntity = []
  var i = 0

  for (let value of stateObject.state.primaryKeyCols) {
    if (stateObject.state.dataModel[value] != null && stateObject.state.dataModel[value] != undefined) {
      businessEntity[i] =
      {
        entityName: value,
        entityValue: stateObject.state.dataModel[value]
      }
    }
    else {
      businessEntity[i] =
      {
        entityName: value,
        entityValue: ''
      }
    }
    i++
  }

  var apiObject = {
    serviceName: stateObject.state.serviceName,
    serviceType: stateObject.state.serviceType,
    datamodel: stateObject.state.dataModel,
    operation: 'View',
    businessEntity: businessEntity,
    audit: stateObject.state.auditDataModel
  }

  apiCall.functions.apiCallRequired = true
  if (await stateObject.beforeApicall(operation, stateObject.state.currentStep, apiObject)) {

    if (apiCall.functions.apiCallRequired) {

      await apiCall.functions.callApi(apiObject, null, stateObject.parentStateChange)

      if (apiCall.functions.apiError) {
        return true
      }
      if (await stateObject.afterApiCall(operation, stateObject.state.currentStep)) {

        /* stateObject.parentStateChange({
            // currentOperation: 'SearchShow',
            displayContent: "summaryResultByFilter"
          }) */
      }
    }
 
  }
//}
}


NewOperation.studentEdit = async function (stateObject) {
  var operation = 'Modification'
  var count;
console.log('Inside studentEdit')
  if (await stateObject.mandatoryCheck(operation, stateObject.state.currentStep)) {
    var businessEntity = []
    var i = 0
    for (let value of stateObject.state.primaryKeyCols) {
      if (stateObject.state.dataModel[value] != null && stateObject.state.dataModel[value] != undefined) {
        businessEntity[i] =
        {
          entityName: value,
          entityValue: stateObject.state.dataModel[value]
        }
      }
      else {
        businessEntity[i] =
        {
          entityName: value,
          entityValue: ''
        }
      }
      i++
    }

    var apiObject = {
      serviceName: stateObject.state.serviceName,
      serviceType: stateObject.state.serviceType,
      datamodel: stateObject.state.dataModel,
      operation: 'Modify',
      businessEntity: businessEntity,
      audit: stateObject.state.auditDataModel
    }
    if (await stateObject.beforeApicall(operation, stateObject.state.currentStep, apiObject)) {

      if (apiCall.functions.apiCallRequired) {
        var defaultValidate = true;
        var temp = stateObject.state.currentOperation;
         stateObject.state.currentOperation ='Modification'
        await GeneralUtils.functions.fnDefaultandValidateAudit(stateObject).then((val) => { defaultValidate = val })
        stateObject.state.currentOperation  = temp;
        if (defaultValidate) {
          await apiCall.functions.callApi(apiObject, null, stateObject.parentStateChange)
        }

        else {
          return true
        }
        if (apiCall.functions.apiError) {
          return true
        }
        if (await stateObject.afterApiCall(operation, stateObject.state.currentStep)) {

       await   ScreenUtils.functions.updateSummaryResult(operation, stateObject)
        }
      }
     /* stateObject.parentStateChange({
        currentOperation: 'Modification',
        editable: false,
        showComplete: true,
        summaryDataModel: stateObject.state.summaryDataModel,
        summaryResultByFilter: stateObject.state.summaryResultByFilter,
        auditDataModel: stateObject.state.auditDataModel,
      })*/

    }
  }
}
//N0U-103 ends


NewOperation.edit = async function (stateObject) {
  var operation = 'Modification'
  var count;

  if (await stateObject.mandatoryCheck(operation, stateObject.state.currentStep)) {
    var businessEntity = []
    var i = 0
    for (let value of stateObject.state.primaryKeyCols) {
      if (stateObject.state.dataModel[value] != null && stateObject.state.dataModel[value] != undefined) {
        businessEntity[i] =
        {
          entityName: value,
          entityValue: stateObject.state.dataModel[value]
        }
      }
      else {
        businessEntity[i] =
        {
          entityName: value,
          entityValue: ''
        }
      }
      i++
    }

    var apiObject = {
      serviceName: stateObject.state.serviceName,
      serviceType: stateObject.state.serviceType,
      datamodel: stateObject.state.dataModel,
      operation: 'Modify',
      businessEntity: businessEntity,
      audit: stateObject.state.auditDataModel
    }
    if (await stateObject.beforeApicall(operation, stateObject.state.currentStep, apiObject)) {

      if (apiCall.functions.apiCallRequired) {
        var defaultValidate = true;
        await GeneralUtils.functions.fnDefaultandValidateAudit(stateObject).then((val) => { defaultValidate = val })
        if (defaultValidate) {
          await apiCall.functions.callApi(apiObject, null, stateObject.parentStateChange)
        }

        else {
          return true
        }
        if (apiCall.functions.apiError) {
          return true
        }
        if (await stateObject.afterApiCall(operation, stateObject.state.currentStep)) {

       await   ScreenUtils.functions.updateSummaryResult(operation, stateObject)
        }
      }
      stateObject.parentStateChange({
        currentOperation: 'Modification',
        editable: false,
        showComplete: true,
        summaryDataModel: stateObject.state.summaryDataModel,
        summaryResultByFilter: stateObject.state.summaryResultByFilter,
        auditDataModel: stateObject.state.auditDataModel,
      })

    }
  }
}

NewOperation.delete = async function (stateObject) {

  apiCall.functions.apiCallRequired = true

  var emptyDataModel = cloneDeep(stateObject.state.emptyDataModel)
  var operation = 'Deletion'
  var businessEntity = []
  var i = 0


  for (let value of stateObject.state.primaryKeyCols) {
    stateObject.state.dataModel[value] = stateObject.state.viewDetail[value];
  }

  for (let value of stateObject.state.primaryKeyCols) {
    if (stateObject.state.dataModel[value] != null && stateObject.state.dataModel[value] != undefined) {
      businessEntity[i] =
      {
        entityName: value,
        entityValue: stateObject.state.dataModel[value]
      }
    }
    else {
      businessEntity[i] =
      {
        entityName: value,
        entityValue: ''
      }
    }
    i++
  }



  // if(stateObject.state.serviceName != "TeacherLessonPlannerService" ){
  switch (stateObject.state.viewDetail.authStat) {
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

  stateObject.state.auditDataModel.Version = stateObject.state.viewDetail.versionNumber;

  stateObject.state.auditDataModel.MakerID = stateObject.state.viewDetail.makerID;
  // }



  var apiObject = {
    serviceName: stateObject.state.serviceName,
    serviceType: stateObject.state.serviceType,
    datamodel: stateObject.state.dataModel,
    operation: 'Delete',
    businessEntity: businessEntity,
    audit: stateObject.state.auditDataModel
  }




  if (await stateObject.beforeApicall(operation, stateObject.state.currentStep, apiObject)) {
    if (apiCall.functions.apiCallRequired) {
      var defaultValidate = true;
      await GeneralUtils.functions.fnDefaultandValidateAudit(stateObject).then((val) => { defaultValidate = val })
      if (defaultValidate) {
        await apiCall.functions.callApi(apiObject, null, stateObject.parentStateChange)
      }

      else {
        return true
      }
      if (apiCall.functions.apiError) {
        return true
      }
      if (await stateObject.afterApiCall(operation, stateObject.state.currentStep)) {

        await   ScreenUtils.functions.updateSummaryResult(operation, stateObject)

      }
    }
    stateObject.parentStateChange({
      currentOperation: 'SummaryQuery',
      summaryDataModel: stateObject.state.summaryDataModel,
      summaryResultByFilter: stateObject.state.summaryResultByFilter,
      editable: false,
      dataModel: emptyDataModel,
      viewDetail: null,
    })

  }
}

NewOperation.DirectAuth = async function (stateObject) {
  var operation = 'Authorisation'
console.log('stateObject.state.currentOperation inside',stateObject.state.currentOperation)
  apiCall.functions.bottomTabClick = 'Auth'
  var businessEntity = []
  var i = 0
  for (let value of stateObject.state.primaryKeyCols) {
    if (stateObject.state.dataModel[value] != null && stateObject.state.dataModel[value] != undefined) {
      businessEntity[i] =
      {
        entityName: value,
        entityValue: stateObject.state.dataModel[value]
      }
    }
    else {
      businessEntity[i] =
      {
        entityName: value,
        entityValue: ''
      }
    }
    i++
  }

  var apiObject = {
    serviceName: stateObject.state.serviceName,
    serviceType: stateObject.state.serviceType,
    datamodel: stateObject.state.dataModel,
    operation: 'Auth',
    businessEntity: businessEntity,
    audit: stateObject.state.auditDataModel
  }
  if (await stateObject.beforeApicall(operation, stateObject.state.currentStep, apiObject)) {
    if (apiCall.functions.apiCallRequired) {
      var defaultValidate = true;
      await GeneralUtils.functions.fnDefaultandValidateAudit(stateObject).then((val) => { defaultValidate = val })
      if (defaultValidate) {
        await apiCall.functions.callApi(apiObject, null, stateObject.parentStateChange)
      }
      else {
        return true
      }
      if (apiCall.functions.apiError) {
        return true
      }
      if (await stateObject.afterApiCall(operation, stateObject.state.currentStep)) {
        await   ScreenUtils.functions.updateSummaryResult(operation, stateObject)
      }
    }
   }
  apiCall.functions.bottomTabClick = ''
}

NewOperation.Auth = async function (stateObject) {
  var operation = 'Authorisation'
console.log('stateObject.state.currentOperation inside',stateObject.state.currentOperation)
  apiCall.functions.bottomTabClick = 'Auth'
  var businessEntity = []
  var i = 0
  for (let value of stateObject.state.primaryKeyCols) {
    if (stateObject.state.dataModel[value] != null && stateObject.state.dataModel[value] != undefined) {
      businessEntity[i] =
      {
        entityName: value,
        entityValue: stateObject.state.dataModel[value]
      }
    }
    else {
      businessEntity[i] =
      {
        entityName: value,
        entityValue: ''
      }
    }
    i++
  }

  var apiObject = {
    serviceName: stateObject.state.serviceName,
    serviceType: stateObject.state.serviceType,
    datamodel: stateObject.state.dataModel,
    operation: 'Auth',
    businessEntity: businessEntity,
    audit: stateObject.state.auditDataModel
  }
  if (await stateObject.beforeApicall(operation, stateObject.state.currentStep, apiObject)) {
    if (apiCall.functions.apiCallRequired) {
      var defaultValidate = true;
      await GeneralUtils.functions.fnDefaultandValidateAudit(stateObject).then((val) => { defaultValidate = val })
      if (defaultValidate) {
        await apiCall.functions.callApi(apiObject, null, stateObject.parentStateChange)
      }
      else {
        return true
      }
      if (apiCall.functions.apiError) {
        return true
      }
      if (await stateObject.afterApiCall(operation, stateObject.state.currentStep)) {
        await   ScreenUtils.functions.updateSummaryResult(operation, stateObject)
      }
    }
    stateObject.parentStateChange({
      currentOperation: 'Authorisation',
      editable: false,
      showComplete: true,
      summaryDataModel: stateObject.state.summaryDataModel,
      auditDataModel: stateObject.state.auditDataModel,
      summaryResultByFilter: stateObject.state.summaryResultByFilter,
    })

  }
  apiCall.functions.bottomTabClick = ''
}
NewOperation.DirectReject = async function (stateObject) {
  var operation = 'Authorisation'
console.log('stateObject.state.currentOperation inside',stateObject.state.currentOperation)
  apiCall.functions.bottomTabClick = 'Reject'
  var businessEntity = []
  var i = 0
  for (let value of stateObject.state.primaryKeyCols) {
    if (stateObject.state.dataModel[value] != null && stateObject.state.dataModel[value] != undefined) {
      businessEntity[i] =
      {
        entityName: value,
        entityValue: stateObject.state.dataModel[value]
      }
    }
    else {
      businessEntity[i] =
      {
        entityName: value,
        entityValue: ''
      }
    }
    i++
  }

  var apiObject = {
    serviceName: stateObject.state.serviceName,
    serviceType: stateObject.state.serviceType,
    datamodel: stateObject.state.dataModel,
    operation: 'Reject',
    businessEntity: businessEntity,
    audit: stateObject.state.auditDataModel
  }
  if (await stateObject.beforeApicall(operation, stateObject.state.currentStep, apiObject)) {
    if (apiCall.functions.apiCallRequired) {
      var defaultValidate = true;
      await GeneralUtils.functions.fnDefaultandValidateAudit(stateObject).then((val) => { defaultValidate = val })
      if (defaultValidate) {
        await apiCall.functions.callApi(apiObject, null, stateObject.parentStateChange)
      }
      else {
        return true
      }
      if (apiCall.functions.apiError) {
        return true
      }
      if (await stateObject.afterApiCall(operation, stateObject.state.currentStep)) {
        await   ScreenUtils.functions.updateSummaryResult(operation, stateObject)
      }
    }
   }
  apiCall.functions.bottomTabClick = ''
}


NewOperation.Reject = async function (stateObject) {
  var operation = 'Authorisation'

  var count;

  apiCall.functions.bottomTabClick = 'Reject'

  var businessEntity = []
  var i = 0
  for (let value of stateObject.state.primaryKeyCols) {
    if (stateObject.state.dataModel[value] != null && stateObject.state.dataModel[value] != undefined) {
      businessEntity[i] =
      {
        entityName: value,
        entityValue: stateObject.state.dataModel[value]
      }
    }
    else {
      businessEntity[i] =
      {
        entityName: value,
        entityValue: ''
      }
    }
    i++
  }

  var apiObject = {
    serviceName: stateObject.state.serviceName,
    serviceType: stateObject.state.serviceType,
    datamodel: stateObject.state.dataModel,
    operation: 'Reject',
    businessEntity: businessEntity,
    audit: stateObject.state.auditDataModel
  }
  if (await stateObject.beforeApicall(operation, stateObject.state.currentStep, apiObject)) {
    if (apiCall.functions.apiCallRequired) {
      var defaultValidate = true;
      await GeneralUtils.functions.fnDefaultandValidateAudit(stateObject).then((val) => { defaultValidate = val })
      if (defaultValidate) {
        await apiCall.functions.callApi(apiObject, null, stateObject.parentStateChange)
      }
      else {
        return true
      }
      if (apiCall.functions.apiError) {
        return true
      }
      if (await stateObject.afterApiCall(operation, stateObject.state.currentStep)) {
        await  ScreenUtils.functions.updateSummaryResult(operation, stateObject)


      }
    }
    stateObject.parentStateChange({
      currentOperation: 'Authorisation',
      summaryDataModel: stateObject.state.summaryDataModel,
      auditDataModel: stateObject.state.auditDataModel,
      summaryResultByFilter: stateObject.state.summaryResultByFilter,
      editable: false,
      showComplete: true,
    })

  }
  apiCall.functions.bottomTabClick = ''
}



NewOperation.SecondLevel = async function (stateObject) {
  var operation = 'SummaryQuery'
  var businessEntity = []
  var i = 0
  for (let value of stateObject.state.primaryKeyCols) {
    if (stateObject.state.summaryDataModel.filter[value] != null && stateObject.state.summaryDataModel.filter[value] != undefined) {
      businessEntity[i] = {
        entityName: value,
        entityValue: stateObject.state.summaryDataModel.filter[value]
      }
    } else {
      businessEntity[i] = {
        entityName: value,
        entityValue: ''
      }
    }
    i++
  }
  apiCall.functions.apiCallRequired = true
  var apiObject
  var dummyDataModel

  if (await stateObject.beforeApiSummarycall(operation, stateObject.state.currentStep, apiObject)) {
    if (apiCall.functions.apiCallRequired) {

      //dummyDataModel = cloneDeep(stateObject.state.summaryDataModel)
      dummyDataModel = {};
      dummyDataModel.filter = cloneDeep(stateObject.state.emptySummaryDataModel.filter);
      var keyset = Object.keys(stateObject.state.childViewDetails);
      for (let i = 0; i < keyset.length; i++) {
        try {
          dummyDataModel.filter[keyset[i]] = cloneDeep(stateObject.state.childViewDetails[keyset[i]]);
        }
        catch (e) { }
      }

      dummyDataModel.SummaryResult = []
      apiObject = {
        serviceName: stateObject.state.summaryService,
        serviceType: stateObject.state.summaryServiceType,
        datamodel: dummyDataModel,
        operation: 'View',
        businessEntity: businessEntity,
        audit: stateObject.state.auditDataModel
      }
      apiObject.datamodel.pageDetails = stateObject.state.summaryDataModel.pageDetails

      apiObject.datamodel.pageDetails.searchType = 'SecondLevel';

      

      // if (NewOperation.isRequiredVersion_in_API.includes(stateObject.state.summaryService))
        apiObject.datamodel.version = GeneralUtils.functions.version_in_API;

      await apiCall.functions.callApi(apiObject, null, stateObject.parentStateChange, stateObject)

      if (apiCall.functions.apiError) {
        return true
      }
      if (await stateObject.afterApiSummaryCall(operation, stateObject.state.currentStep)) {
         

      }
    }

  }
}


NewOperation.checkRefreshRequired = async function (stateObject) {
  var operation = 'IsRefreshRequired'
  var businessEntity = []
  var i = 0
  for (let value of stateObject.state.primaryKeyCols) {
      if ( stateObject.state.summaryDataModel.filter.hasOwnProperty([value]) && stateObject.state.summaryDataModel.filter[value] != null && stateObject.state.summaryDataModel.filter[value] != undefined) {
          businessEntity[i] = {
              entityName: value,
              entityValue: stateObject.state.summaryDataModel.filter[value]
          }
      } else {
          businessEntity[i] = {
              entityName: value,
              entityValue: ''
          }
      }
      i++
  }
  apiCallRequired = true
  var apiObject
  var dummyDataModel

  if (await stateObject.beforeApicall(operation, stateObject.state.currentStep, apiObject)) {
      if (apiCallRequired) {
          dummyDataModel = {};
          // dummyDataModel.filter = cloneDeep(stateObject.state.emptySummaryDataModel.filter);
          dummyDataModel.filter = cloneDeep(stateObject.state.summaryDataModel.filter);

          dummyDataModel.SummaryResult = []
          apiObject = {
              serviceName: stateObject.state.summaryService,
              serviceType: stateObject.state.summaryServiceType,
              datamodel: dummyDataModel,
              operation: 'View',
              businessEntity: businessEntity,
              audit: stateObject.state.auditDataModel
          }
          apiObject.datamodel.pageDetails = stateObject.state.summaryDataModel.pageDetails

          apiObject.datamodel.pageDetails.searchType = 'IsRefreshRequired';
          apiObject.datamodel.pageDetails.serviceName = stateObject.state.serviceName;

          await apiCall.functions.callApi(apiObject, null, stateObject.parentStateChange, stateObject)

          if (apiCall.functions.apiError) {
              //return true
          }

          // stateObject.state.currentOperation = "";

          if (await stateObject.afterApiCall(operation, stateObject.state.currentStep)) {
          }
      }

  }
}




NewOperation.viewRecord = async function (stateObject) { 
  var operation = 'viewRecord'
  if (await stateObject.mandatoryCheck(operation, stateObject.state.currentStep)) {
  var businessEntity = []
  var i = 0

  for (let value of stateObject.state.primaryKeyCols) {
    if (stateObject.state.dataModel[value] != null && stateObject.state.dataModel[value] != undefined) {
      businessEntity[i] =
      {
        entityName: value,
        entityValue: stateObject.state.dataModel[value]
      }
    }
    else {
      businessEntity[i] =
      {
        entityName: value,
        entityValue: ''
      }
    }
    i++
  }

  var apiObject = {
    serviceName: stateObject.state.serviceName,
    serviceType: stateObject.state.serviceType,
    datamodel: stateObject.state.dataModel,
    operation: 'View',
    businessEntity: businessEntity,
    audit: stateObject.state.auditDataModel
  }

  apiCall.functions.apiCallRequired = true
  if (await stateObject.beforeApicall(operation, stateObject.state.currentStep, apiObject)) {

    if (apiCall.functions.apiCallRequired) {

      await apiCall.functions.callApi(apiObject, null, stateObject.parentStateChange)

      if (apiCall.functions.apiError) {
        return true
      }
      if (await stateObject.afterApiCall(operation, stateObject.state.currentStep)) {

         stateObject.parentStateChange({
            // currentOperation: 'SearchShow',
            displayContent: "summaryResultByFilter"
          })
      }
    }
 
  }
}
}

NewOperation.report = async function (stateObject) { 
  var operation = 'Report'
  if (await stateObject.mandatoryCheck(operation, stateObject.state.currentStep)) {
  var businessEntity = []
  var i = 0

  for (let value of stateObject.state.primaryKeyCols) {
    if (stateObject.state.dataModel.Master[value] != null && stateObject.state.dataModel.Master[value] != undefined) {
      businessEntity[i] =
      {
        entityName: value,
        entityValue: stateObject.state.dataModel.Master[value]
      }
    }
    else {
      businessEntity[i] =
      {
        entityName: value,
        entityValue: ''
      }
    }
    i++
  }

  var apiObject = {
    serviceName: stateObject.state.serviceName,
    serviceType: stateObject.state.serviceType,
    datamodel: stateObject.state.dataModel,
    operation: 'View',
    businessEntity: businessEntity,
    audit: stateObject.state.auditDataModel
  }

  apiCall.functions.apiCallRequired = true
  if (await stateObject.beforeApicall(operation, stateObject.state.currentStep, apiObject)) {

    if (apiCall.functions.apiCallRequired) {

      await apiCall.functions.callApi(apiObject, null, stateObject.parentStateChange)

      if (apiCall.functions.apiError) {
        return true
      }
      if (await stateObject.afterApiCall(operation, stateObject.state.currentStep)) {

         stateObject.parentStateChange({
            // currentOperation: 'SearchShow',
            displayContent: "summaryResultByFilter"
          })
      }
    }
 
  }
}
}


NewOperation.openModal = function (currentOperation) {
  switch (currentOperation) {
    case 'Query':
      return "View"
      break;
    case 'ModificationStep1':
      return "Modification"
      break;
    case 'AuthorisationStep1':
      return "Authorisation"
      break;
    default:
      return ""
      break;
  }

}







module.exports = {
  functions: NewOperation
}

