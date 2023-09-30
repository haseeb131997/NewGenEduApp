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
Date:17-09-2021 
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
import AuthTemplate from "./AuthTemplate";
import NewOperation from "../../../utils/NewOperation";
import apiCall from "../../../ApiCall/ActionApi";
import axios from 'axios';
import cloneDeep from 'lodash/cloneDeep';
import FilterListView from './FilterListView';
import ScreenTemplate from './../../../components/ScreenTemplate';
import ScreenUtils from "../../../utils/ScreenUtils";
import { UiColor } from "../../../theme";
//import SelectListUtils from '../../../utils/SelectListUtils'
import CalendarModal from './../../../components/CalendarModal';
import LessonPlannerCalendar from "./LessonPlannerCalendar";






const Instruction = [
  {
    text:'There is no lesson plan created yet.',
    color:UiColor.ERROR_COLOR
  },
  {
    text:'Click "Create Lesson Planner" to create a lesson plan.',
    color:UiColor.DRAK_GRAY_COLOR
  },
  {
    text:"A lesson plan refers to a teacher's plan for a particular lesson to be taught in the classroom. It will help teacher to plan, prepare and handle the lessons smoothly. ",
    color:UiColor.DRAK_GRAY_COLOR
  },
  {
    text:'You can create lesson planner by specifying details like date and teacher name. Timetable details of the teacher for the given date appears by default where lesson plan can be added for particular period.',
    color:UiColor.DRAK_GRAY_COLOR
  },

  
]



var classDesc = ''





class TeacherLessonPlanner extends React.Component {
  constructor(props) {
    super(props);
    //console.log(props,"props")
    this.state = {
      // stepper state configuration
      currentStep: 1,
      currentOperation: 'SummaryQuery',
      heading: 'Lesson Planner',


 // classAndSubjectDetails  paggination state configuration
//  classAndSubjectDetailsSelectedIndex: 1,
 classAndSubjectDetailssemptyrecord: null,

 // planDetail  paggination state configuration
//  planDetailsSelectedIndex: 1,
 planDetailEmptyrecord: null,
       

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
      primaryKeyCols: ['planID','teacherID','date'],

      // alert state configuration
      errorType: "",
      error: [{ errorCode: '', errorMessage: '', errorParam: '' }],
      showAlert: false,

      serviceName: 'TeacherLessonPlannerService',
      serviceType: 'Teacher',
      summaryService: 'TeacherLessonPlannerSummary',
      summaryServiceType: 'TeacherSummaryEntity',
      // loading state ----
      isLoading: false,

      //remarks state ----
      remarks: '',
   
       unMount:false,

       CreateDefaultDataModel:{planID:''},

      // starts 3.0 UI/UX
      intialFetching: false,
      createStepsHeading: ['Basic Info','Plan Details','Notification','Remarks', 'Completed'],
      summaryResultByFilter: [],
      errorField: [],
      breadcrumb:'Menu / Staff Details / Lesson Planner',
      viewDetail:null,
      showComplete:false,
      summaryResultIndex:0,
      userType:'',
      userID:"",
      secondModalVisible:false,
      twoLevelModalVisible:false,
      enableScrollViewScroll:true,
      animatedStartValue: new Animated.Value(0),
      showAnimationRefreshBtn:true,
      welComeTitle:'Lesson Planner',
      welcomeInstruction:Instruction,
      calendarIsOpen:false,
       childViewDetails:null,
       storedDataModel:null,
      calendarLoaditems:{},
      calendarRefresh:true,
      calendarEmptyRefresh:false,
      showTooltipModal:false
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

    await apiCall.functions.cancelToken.cancel('Lesson planner api is being canceled');

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
      planDetailEmptyrecord: null,
      storedDataModel:null
  
    
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
        planID: "",
        teacherID: "",
        teacherName: "",
        date: "",
        month:"",
        year:"",
        classAndSubjectDetails: [{
            classID: "",
            classDescription: "",
            periodNo: "",
            subjectID: "",
            startTime: "",
            endTime: "",
            planDetails: []
        }],
        smsNotification: false,
        emailNotification: false,
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
            teacherID: "",
            teacherName: "",
            fromDate: "",
            toDate: "",
            authStat: "",
            status: "",
            year:"",
            month:""
          },
          // version:"3",
          SummaryResult:[]
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
  
    
         //  planDetailEmptyrecord detail paggination empty record

    var planDetailEmptyrecord = {
      lesson: "",
      heading: "",
      subHeading: "",
      status: "",
      percentageOfCompletion: "",
      remarks: "",
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
        planDetailEmptyrecord: planDetailEmptyrecord,
        currentStep: 1,
        currentOperation: 'SummaryQuery',
        intialFetching: true,
        userType: globalData.userType ,
        userID: globalData.userID 
      })
  
      apiCall.functions.fromLoading = true
  
      NewOperation.functions.screenEventHandler(this)
       
    // }
  

  }

 











  

  async beforeApicall(Operation, currentStep,apiObject) {
    var globalData = JSON.parse(await AsyncStorage.getItem('GLOBAL'));
    const { dataModel, auditDataModel,summaryDataModel,calendarIsOpen } = this.state

    console.log(Operation,"Operation beforeApicall")
    switch (Operation) {
      case 'Create-Default':
        switch(currentStep){
          case 1 : 
          //  if(!calendarIsOpen){
          //   var dateArr = this.state.dataModel.date.split("-");
          //   this.state.summaryDataModel.filter.month = dateArr[1];
          //   this.state.summaryDataModel.filter.year = dateArr[2];
          //   this.state.summaryDataModel.filter.teacherName = this.state.dataModel.teacherName;
          //   this.state.summaryDataModel.filter.teacherID = this.state.dataModel.teacherID;
          //   this.state.summaryResultByFilter.SummaryResult = [];
          //   await  NewOperation.functions.search(this);
          //   if( this.state.summaryResultByFilter.SummaryResult.length != 0 ){
          //     Exception.functions.showFrontendError(this.parentStateChange, [{ errorCode: 'FE-VAL-091', errorMessage: '', errorParam: [this.state.dataModel.teacherName, this.state.summaryDataModel.filter.year, GeneralUtils.functions.getMonthName(this.state.summaryDataModel.filter.month),dataModel.date ]}])
          //     return false;
          //   }
          // }
          break
        }
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
        // if(!GeneralUtils.functions.deleteInProgress){
        //   GeneralUtils.functions.deleteInProgress = true
        //    await NewOperation.functions.singleRecordView(this)
        //  }
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
    const {dataModel,emptyDataModel,CreateDefaultDataModel,calendarIsOpen } = this.state


 
    switch (Operation) {
      case 'Create-Default':
        switch(currentStep){
          case 0 : 
          var dummyModel = cloneDeep(emptyDataModel)  
          dummyModel.planID = CreateDefaultDataModel.planID
          if(calendarIsOpen){
            dummyModel.teacherName = dataModel.teacherName
            dummyModel.teacherID = dataModel.teacherID
            dummyModel.date = dataModel.date
          }
          this.setState({
           dataModel:dummyModel
          })
          break
          case 1 :
            var dummyModel = cloneDeep(emptyDataModel)  
            dummyModel = CreateDefaultDataModel
           for(let item of dummyModel.classAndSubjectDetails){
              item.planDetails = []
           }
            this.setState({
             dataModel:dummyModel
            })
          break
          
        }
       
        break
        case 'Create':
          switch (currentStep) {
            case 4 :
              // var date = this.state.dataModel.date.split('-')
              // var month = date[1]
              // var year = date[2]
       
              // var dummyLessonResult = []
       
              //  for (let i = 0; i < this.state.dataModel.classAndSubjectDetails.length; i++) {
              //    for (let j = 0; j < this.state.dataModel.classAndSubjectDetails[i].planDetails.length; j++) {
              //       dummyLessonResult.push({status:"Not completed"})
              //    }
              //   }
              
              // var tempChildObject = {
              //   authStat: this.state.auditDataModel.AuthStat == "Authorised" ? "A" : 'U',
              //   date: this.state.dataModel.date,
              //   lessonResults: dummyLessonResult,
              //    makerID: this.state.auditDataModel.MakerID,
              //    planID: this.state.dataModel.planID,
              //    teacherID: this.state.dataModel.teacherID,
              //    teacherName: this.state.dataModel.teacherName,
              //    versionNumber: this.state.auditDataModel.Version,
              // }
              // if(!this.state.calendarIsOpen){
              //   this.state.dataModel.childObject = []
              //   this.state.dataModel.childObject = tempChildObject
              //  }
              //  if(this.state.calendarIsOpen){
              //   for(let item of this.state.summaryDataModel.SummaryResult){
              //    if(item.month == month && item.year == year && item.teacherID  == this.state.dataModel.teacherID){
              //      item.childResults.push(tempChildObject)
              //    }
              //   }
              //   // this.state.childViewDetails.childResults.push(tempChildObject)
              // }
  
              // console.log(this.state.childViewDetails)
              // this.setState({
              //   dataModel:this.state.dataModel,
              //   childViewDetails:this.state.childViewDetails
              // })   
            break
           
          }
          break
        
      case 'Query':  
     
        break
      case 'ModificationStep1':
     
        break
      case 'Deletion':
      // apiCall.functions.apiCallRequired = false
      // GeneralUtils.functions.deleteInProgress= false
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
        switch (currentStep) {
          case 0: return true
            break
          default:
            if (!QueryTemplate.functions.QueryMandatory(this))
              return false;
        }
        break
        case 'Search':
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
        <ScreenTemplate
          stateObject={this}
           CreateTemplate ={CreateTemplate.functions.CreateConfig(this)}
           QueryTemplate ={QueryTemplate.functions.QueryConfig(this)}
          //  EditTemplate ={EditTemplate.functions.ModificationConfig(this)}
           ViewTemplate ={ViewTemplate.functions.QueryConfig(this)}
           viewHeading ={dataModel.teacherName}
           AuthTemplate ={AuthTemplate.functions.AuthorisationConfig(this)}
           FilterTemplate ={<FilterListView
            stateObject={this}
            stateArray={summaryDataModel.SummaryResult}
          />}
        />

        <CalendarModal
          stateObject={this}
          templates={<LessonPlannerCalendar stateObject ={this}/>}
          title={'Lesson Planner'}
          viewHeading={ childViewDetails != null && `${childViewDetails.teacherName} - ${childViewDetails.year} ${GeneralUtils.functions.getMonthName(childViewDetails.month)}`}
          CreateTemplate ={CreateTemplate.functions.CreateConfig(this)}
          EditTemplate ={EditTemplate.functions.ModificationConfig(this)}
           ViewTemplate ={ViewTemplate.functions.QueryConfig(this)}
           queryTitle={dataModel.date}
           querySubTitle={`${dataModel.teacherName} (${dataModel.teacherID})`}
        />


      </Provider>
    ) : null;
  }
}

export default TeacherLessonPlanner;
