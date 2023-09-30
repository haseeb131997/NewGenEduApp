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

/* * * Change Tag:3.0 UI/UX
Change Desc: vesrion 3 changes 
Changed By : Shashank
Date:17-09-2021 StudentAssignment
*/

import React from "react";
import { Animated } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Provider} from 'react-native-paper';
import ScreenLoad from "../../../utils/ScreenLoad";
import GeneralUtils from "../../../utils/GeneralUtils";
import CreateTemplate from "./CreateTemplate";
import QueryTemplate from "./QueryTemplate";
import EditTemplate from "./EditTemplate";
import ViewTemplate from "./ViewTemplate";
import ViewTemplateFilterList from "./ViewTemplateFilterList";
import AuthTemplate from "./AuthTemplate";
import NewOperation from "../../../utils/NewOperation";
import apiCall from "../../../ApiCall/ActionApi";
import axios from 'axios';
import cloneDeep from 'lodash/cloneDeep';
import FilterListView from './FilterListView';
import ScreenTemplate from './../../../components/ScreenTemplate';
import ScreenUtils from "../../../utils/ScreenUtils";
import { UiColor } from "../../../theme";
// import SelectListUtils from '../../../utils/SelectListUtils'
// import CalendarModal from './../../../components/CalendarModal';
// import ClassAssessmentCalendar from "./ClassAssessmentCalendar";
import ChildRecordListModal from './../../../components/ChildRecordListModal';
import ChildRecordListView from './ChildRecordListView';

import FilterScreenTemplate from './../../../components/FilterScreenTemplate';
import SearchUtils from "../../../utils/SearchUtils";
import CustomCacheMemory from "../../../utils/CustomCacheMemory";
import SubScreenUtils from "../../../utils/SubScreenUtils";




const Instruction = [
  {
    text:'There are no assignments evaluated yet.',
    color:UiColor.ERROR_COLOR
  },
  {
    text:'Click "Assess Assignments" to evaluate an assignment for a class.',
    color:UiColor.DRAK_GRAY_COLOR
  },
  {
    text:"Assignment Assessment is an evaluation of a completed assignment based on which marks and feedback are given to the students.",
    color:UiColor.DRAK_GRAY_COLOR
  },
  {
    text:'You can track the assignments submitted by the student of a particular class/subject and assess them by providing marks and feedback to each student.',
    color:UiColor.DRAK_GRAY_COLOR
  },

  
]



var classDesc = ''


class StudentAssignment extends React.Component {
  constructor(props) {
    super(props);
    //console.log(props,"props")
    this.state = {
      // stepper state configuration
      currentStep: 1,
      currentOperation: 'SummaryQuery',
      heading: 'Assignment',

   // questionsEmptyrecord  paggination state configuration
   questionsEmptyrecord: null,

    // questionsEmptyrecord  paggination state configuration
    worksheetsEmptyrecord: null,


       

      // summaryDataModel state configuration
      summaryDataModel: null,
      emptySummaryDataModel:null,
    
       // auditDataModel  state configuration
      auditDataModel:null,
      emptyAuditDataModel:null,

      // data model  state configuration
      dataModel: null,
      emptyDataModel: null,

      editable: false,
      primaryKeyEditable: false,

      // tab state configuration
      selectedTabIndex: 0,

      // search state configuration
      seachVisible: false,
      searchFieldName: '',
      searchText: '',
      searchIsLoading: false,

      // summaryResult state configuration
      summaryResult: [],
      // SummaryResultselectedrecord:'',
      primaryKeyCols: ['assignmentID', 'studentID', 'classID', 'type'],

      // alert state configuration
      errorType: "",
      error: [{ errorCode: '', errorMessage: '', errorParam: '' }],
      showAlert: false,

      serviceName: 'NewStudentAssignment',
      serviceType: 'Student',
      summaryService: 'NewStudentAssignmentSummary',
      summaryServiceType: 'StudentSummaryEntity',
      // loading state ----
      isLoading: false,

      //remarks state ----
      remarks: '',
   
       unMount:false,

      //  CreateDefaultDataModel:{assignmentID:''},
      nekot: '',
      ivas: '',
      uhtuliak: '',

      // starts 3.0 UI/UX
      intialFetching: false,
      createStepsHeading: ['Assignment','Remarks', 'Completed'],
      summaryResultByFilter: [],
      errorField: [],
      breadcrumb:'Menu / Studnt Level Tracking / Assignment',//N0U-105
      viewDetail:null,
      showComplete:false,
      summaryResultIndex:0,
      userType:'',
      secondModalVisible:false,
      twoLevelModalVisible:false,
      enableScrollViewScroll:true,
      animatedStartValue: new Animated.Value(0),
      showAnimationRefreshBtn:true,
      welComeTitle:'Assignment',
      welcomeInstruction:Instruction,
      childViewDetails:null,
      calendarIsOpen:false,
      showFullViewDoc:false,
      calendarLoaditems:{},
      calendarRefresh:true,
      calendarEmptyRefresh:false,
      userID:"",
      storedDataModel:null,
      showAnswer:false,
      showTooltipModal:false,
      displayContent: 'summaryDataModel'
      // ends 3.0 UI/UX
  
    };
    this.parentStateChange = this.parentStateChange.bind(this)
    this.mandatoryCheck = this.mandatoryCheck.bind(this)
    this.setUnmount = this.setUnmount.bind(this)
    this.setMount = this.setMount.bind(this)
  }


   // starts 3.0 UI/UX

   componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.setMount(false)
    });
    this._unsubscribe = this.props.navigation.addListener('blur', () => {
      this.setUnmount(true)
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }
  // ends 3.0 UI/UX


  async setUnmount (unMount){
    ScreenUtils.functions.unMountScreen(this)

    await apiCall.functions.cancelToken.cancel('Student Assignment api is being canceled');

    // ScreenUtils.functions.unMountDone =  true

    apiCall.functions.fromLoading = false


    this.setState({
      unMount:unMount,
      dataModel:null,
      emptyDataModel:null,
      summaryDataModel:null,
      emptySummaryDataModel:null,
      auditDataModel:null,
      emptyAuditDataModel:null,
      storedDataModel:null,
      questionsEmptyrecord: null,
      worksheetsEmptyrecord: null,
      showFullViewDoc:false,
      displayContent: 'summaryDataModel'
    
    })

   
  }

 async setMount (unMount){
   
  // var isUnMountDone = await ScreenUtils.functions.isUnMountDone()

  //   if(isUnMountDone){

      apiCall.functions.cancelToken =  axios.CancelToken.source()
      const { currentOperation, heading, serviceName, } = this.state
      ScreenLoad.functions.onLoad(heading, serviceName, currentOperation)
  
      // emptyDataModel empty record
      var emptyDataModel = {
        assignmentID: "",
        assignmentDescription: "",
        studentID: "",
        studentName: "",
        classID: "",
        classDescription: "",
        type: "",
        dueDate: "",
        instructions: "",
        mark: "",
        teacherFeedback: "",
        questions: [{
          questionID: "",
          question: "",
          answer: ""
        }],
        workSheets: [{
          workSheetID: "",
          workSheetDescription: "",
          workSheetPath: "",
          answerPath: ""
        }]
      }
  
       // emptySummaryDataModel empty record
      var emptySummaryDataModel ={
        pageDetails: {
          searchType: "Initial",      //  Initial , More , Filter
          pageNumber: 0,
          recordStartingNumber: 0,
          recordEndingNumber: 0,
          totalRecords: 0,
          totalPages: 0,
          moreRecExists: false,
          reqAsOf:''
        },
          filter:{
            year:"",
            month:"",
            classID:"",
            subjectID:"",
            answerStatus:"",
            type:"",
            fromDate:"",
            toDate:"",
            studentID:"",
            studentName:""
            
          },
          SummaryResult:[],
          version: GeneralUtils.functions.version_in_API
      }
    
       // emptyAuditDataModel empty record
  
      var emptyAuditDataModel = {
        MakerID: "",
        AuthStat: "",
        MakerRemarks: "",
        CheckerRemarks: "",
        MakerDtStamp: "",
        CheckerDtStamp: "",
        CheckerID: "",
        Version: "",
        RecordStat: "Open"
      }
  
       
 //  worksheetsEmptyrecord detail paggination empty record

 var worksheetsEmptyrecord = {
  workSheetID: "",
  workSheetDescription: "",
  workSheetPath: "",
  answerPath: ""
}

//  questionsEmptyrecord detail paggination empty record

var questionsEmptyrecord = {
  questionID: "",
  question: "",
  answer: ""
}
  
  
      
  
       
  
  
      var globalData = JSON.parse(await AsyncStorage.getItem('GLOBAL'));
      var dummyDataModel =   cloneDeep(emptyDataModel)
      var dummySummaryDataModel =  cloneDeep(emptySummaryDataModel)
      var dummyAuditDataModel =   cloneDeep(emptyAuditDataModel)
     
    
      dummyDataModel.instituteID = globalData.instituteID
      emptyDataModel.instituteID = globalData.instituteID

    
      this.setState({
        unMount:unMount,
        dataModel:dummyDataModel,
        emptyDataModel:emptyDataModel,
        summaryDataModel:dummySummaryDataModel,
        emptySummaryDataModel:emptySummaryDataModel,
        auditDataModel:dummyAuditDataModel,
        emptyAuditDataModel:emptyAuditDataModel,
        worksheetsEmptyrecord:worksheetsEmptyrecord,
        questionsEmptyrecord:questionsEmptyrecord,
        currentStep: 1,
        currentOperation: 'SummaryQuery',
        intialFetching: true,
        userType: globalData.userType,
        userID: globalData.userID,
        nekot: `${globalData.userID}~${globalData.instituteID}`,
        ivas: globalData.token1,
        uhtuliak: globalData.token0    
      })
  
      // apiCall.functions.fromLoading = true
  
      // NewOperation.functions.screenEventHandler(this)

      if (globalData.userType == 'P' || globalData.userType == 'S') {
        SearchUtils.functions.searchModal = true
        await SearchUtils.functions.launchSuggestion(this, '', 'studentName')
        //this.state.summaryDataModel.filter.studentName = apiCall.functions.searchDataModel.searchResults[0].StudentName
      //this.state.summaryDataModel.filter.studentID = apiCall.functions.searchDataModel.searchResults[0].StudentId
      dummySummaryDataModel.filter.studentName = apiCall.functions.searchDataModel.searchResults[0].StudentName
      dummySummaryDataModel.filter.studentID = apiCall.functions.searchDataModel.searchResults[0].StudentId
      
      this.setState({
        summaryDataModel: dummySummaryDataModel
        }, () => {
          // NewOperation.functions.search(this)
          SubScreenUtils.functions.parentSummaryData(this)
          // NewOperation.functions.screenEventHandler(this)
        })
        // await  NewOperation.functions.screenEventHandler(this)
        SearchUtils.functions.searchModal = false
      }
       
    // }
  

  }

 











  

  async beforeApicall(Operation, currentStep,apiObject) {

    var globalData = JSON.parse(await AsyncStorage.getItem('GLOBAL'));
    

    const { dataModel, auditDataModel,summaryDataModel } = this.state

 

    switch (Operation) {
      case 'Create-Default':
        classDesc = dataModel.classDescription
        break 
      case 'Create':
        // switch(currentStep){
        //   case 5 :

      
        //     break
        // }
        break
      case 'Query':
        switch(currentStep){
          case 2 :
        break
        }
        break
      case 'Modification':
     
        break
      case 'Deletion':
        this.setState({
          storedDataModel : apiObject.datamodel
        })
        break
      case 'Authorisation':
        switch(currentStep){
          case 2 :
     
        break
        }
        break
    }
    return true;
  }

  afterApiCall(Operation, currentStep) {
    switch (Operation) {
      case 'Create':
        switch(currentStep){
          case 2 : 
         this.setState({
          showAnswer:false
         })
          break
        }
        break
      case 'Query':  
        break
      case 'ModificationStep1':
        break
      case 'Deletion':
        switch(currentStep){
          case 2 :
        break
        }
        break
      case 'AuthorisationStep1':
        break
    }
    return true
  }


  async beforeApiSummarycall(Operation, currentStep, apiObject) {
    var globalData = JSON.parse(await AsyncStorage.getItem('GLOBAL'));
    const { dataModel, auditDataModel, summaryDataModel } = this.state
    switch (Operation) {

      case 'SummaryQuery':

        break
    }
    return true;
  }

  afterApiSummaryCall(Operation, currentStep) {
    const { dataModel, emptyDataModel } = this.state
    switch (Operation) {
      case 'SummaryQuery':

        break
    }
    return true
  }

  async beforeApiSearchcall(Operation, currentStep, apiObject) {
    var globalData = JSON.parse(await AsyncStorage.getItem('GLOBAL'));
    const { dataModel, auditDataModel, summaryDataModel } = this.state
    switch (Operation) {

      case 'Search':

        break
    }
    return true;
  }

  afterApiSearchCall(Operation, currentStep) {
    const { dataModel, emptyDataModel } = this.state
    switch (Operation) {
      case 'Search':

        break
    }
    return true
  }



  parentStateChange(object) {
    this.setState(
      object
    );

  }




  mandatoryCheck = (Operation, currentStep) => {
    switch (Operation) {
      case 'Create':
        switch (currentStep) {
          case 0: return true
            break
          default:
            if (!CreateTemplate.functions.CreateMandatory(this))
              return false;
        }
        break
      case 'Query':
        console.log('Inside Query Mandatory check')
        switch (currentStep) {
          case 0: return true
            break
          default:
            if (!QueryTemplate.functions.QueryMandatory(this))
              return false;
        }
        break
        case 'Search':
          console.log('Inside Query Mandatory check')
          switch (currentStep) {
            case 0: return true
              break
            default:
              if (!QueryTemplate.functions.QueryMandatory(this))
                return false;
          }
          break   
      case 'Modification':
        if (!EditTemplate.functions.ModificationMandatory(this))
          return false;
        break
    }

    return true
  }

 

 


  render() {
    const {
      unMount,
      dataModel,
      summaryDataModel,
      childViewDetails
    } = this.state


 
    return (unMount == false && dataModel != null) ? (
      <Provider>
        {/* <ScreenTemplate
          stateObject={this}
           CreateTemplate ={CreateTemplate.functions.CreateConfig(this)}
           QueryTemplate ={QueryTemplate.functions.QueryConfig(this)}
          //  EditTemplate ={EditTemplate.functions.ModificationConfig(this)}
           ViewTemplate ={ViewTemplate.functions.QueryConfig(this)}
           viewHeading ={dataModel.class}
           AuthTemplate ={AuthTemplate.functions.AuthorisationConfig(this)}
           FilterTemplate ={<FilterListView
            stateObject={this}
            stateArray={summaryDataModel.SummaryResult}
          />}
        /> */}

      <FilterScreenTemplate
          stateObject={this}
          CreateTemplate={CreateTemplate.functions.CreateConfig(this)}
          QueryTemplate={QueryTemplate.functions.QueryConfig(this)}
          EditTemplate={EditTemplate.functions.ModificationConfig(this)}
          ViewTemplate={ViewTemplateFilterList.functions.QueryConfig(this)}
          ViewDetailsTemplate={ViewTemplate.functions.QueryConfig(this)}
          viewHeading={`${"You can search a student's assignment by mentioning student's name, month, year, subject"}`} //N0U-105
          //  AuthTemplate ={AuthTemplate.functions.AuthorisationConfig(this)}
          FilterTemplate={<FilterListView
            stateObject={this}
          />}
          viewDetailsHeading={`${dataModel.studentName}`}
          viewTitle={`${dataModel.studentID}`}
        />


        {/* <CalendarModal
          stateObject={this}
          templates={<ClassAssessmentCalendar stateObject ={this}/>}
          // title={'Assignment'}
          title={ childViewDetails != null && `${GeneralUtils.functions.getMonthName(childViewDetails.month)}-${childViewDetails.year}`}
          viewHeading={ childViewDetails != null && `${childViewDetails.classDescription}`}
          CreateTemplate ={CreateTemplate.functions.CreateConfig(this)}
          EditTemplate ={EditTemplate.functions.ModificationConfig(this)}
           ViewTemplate ={ViewTemplate.functions.QueryConfig(this)}
           queryTitle={dataModel.assignmentDescription}
           querySubTitle={`${'Assignment'}`}
        /> */}
         <ChildRecordListModal
          stateObject={this}
          templates={<ChildRecordListView
            stateObject={this}
          />}
          title={ childViewDetails != null && `Assignments due on ${GeneralUtils.functions.getMonthName(childViewDetails.month)}-${childViewDetails.year}`}
          viewHeading={childViewDetails != null && `${childViewDetails.classDescription}`}
          CreateTemplate ={CreateTemplate.functions.CreateConfig(this)}
          EditTemplate={EditTemplate.functions.ModificationConfig(this)}
          ViewTemplate={ViewTemplate.functions.QueryConfig(this)}
          AuthTemplate={AuthTemplate.functions.AuthorisationConfig(this)}
          queryTitle={dataModel.assignmentDescription}
          querySubTitle={`${'Assignment'}`}
        />

      </Provider>
    ) : null;
  }
}

export default StudentAssignment;
