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
// import GeneralUtils from "../../../utils/GeneralUtils";
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
import SubScreenUtils from "../../../utils/SubScreenUtils";





const Instruction = [
  {
    text:'There is no exam configured yet. ',
    color:UiColor.ERROR_COLOR
  },
  {
    text:'Click "Create Exam Configuration" to configure an exam for a class',
    color:UiColor.DRAK_GRAY_COLOR
  },
  {
    text:"An exam is a test of student's knowledge or skill in a particular subject.",
    color:UiColor.DRAK_GRAY_COLOR
  },
  {
    text:'You can configure an exam by mentioning details like class, subject, exam date, exam starting - ending time, exam hall, syllabus,maximum mark and grade details.',
    color:UiColor.DRAK_GRAY_COLOR
  }
]






class ClassExamSchedule extends React.Component {
  constructor(props) {
    super(props);
    //console.log(props,"props")
    this.state = {
      // stepper state configuration
      currentStep: 1,
      currentOperation: 'SummaryQuery',
      heading: 'Exam Configuration',

     //  subject schedules  detail paggination state configuration
    //  periodTimingsSelectedIndex: 1,
     Subjectschedulesemptyrecord: null,

        // Grade detail paggination state configuration
        // gradeDetailsSelectedIndex: 1,
        GradeDetailsemptyrecord:null,

      softSkillsEmptyrecord:null,


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
      primaryKeyCols: ['class', 'exam'],

      // alert state configuration
      errorType: "",
      error: [{ errorCode: '', errorMessage: '', errorParam: '' }],
      showAlert: false,

      serviceName: 'ClassExamSchedule',
      serviceType: 'ClassEntity',
      summaryService: 'ClassExamScheduleSummary',
      summaryServiceType: 'ClassSummaryEnity',
      // loading state ----
      isLoading: false,

      //remarks state ----
      remarks: '',
   
       unMount:false,

       CreateDefaultDataModel:{exam:''},

      // starts 3.0 UI/UX
      intialFetching: false,
      createStepsHeading: ['Basic Info','Exam Schedule','Notification','Soft Skills','Remarks', 'Completed'],
      summaryResultByFilter: [],
      errorField: [],
      breadcrumb:'Menu / Classroom Activities / Exam Configuration',
      viewDetail:null,
      showComplete:false,
      summaryResultIndex:0,
      userType:'',
      secondModalVisible:false,
      twoLevelModalVisible:false,
      enableScrollViewScroll:true,
      animatedStartValue: new Animated.Value(0),
      showAnimationRefreshBtn:true,
      welComeTitle:'Exam configuration',
      welcomeInstruction:Instruction,
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

    await apiCall.functions.cancelToken.cancel('Exam config api is being canceled');

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
      Subjectschedulesemptyrecord: null,
      GradeDetailsemptyrecord:null,
      softSkillsEmptyrecord:null
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
        exam: "",
        examDescription: "",
        class: "",
        classDesc:"",
        startDate:"",
        endDate:"",
        standard:"",
        section:"",

        smsNotification:false,
        emailNotification:false,
        // Subjectschedules: [{
        //   idx: '',
        //   subjectID: "",
        //   date: "",
        //   startTime: {
        //     hour: "",
        //     min: ""
        //   },
        //   endTime: {
        //     hour: "",
        //     min: ""
        //   },
        //   hall: "",
        //   maxMark: '',
        //   syllabus: '',
        //   gradeDetails: [{
        //     idx: "",
        //     subjectID: "",
        //     grade: "",
        //     from: "",
        //     to: ""
        //   }]
        // }],
        Subjectschedules: [],
        // gradeDetails: [{
        //   idx: "",
        //   subjectID: "",
        //   grade: "",
        //   from: "",
        //   to: ""
        // }],
        gradeDetails: [],
        softSkillRequired:false,
        softSkills:[],
        // starts NEAI2-153
          examType: "",
          feeID: "",
          amount: "",
          feeDescription: "",
          feeDueDate:"",
          allowStudents: false,
          automaticResult: false,
          onlineExam: false
         // ends NEAI2-153  
        
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
            class: "",
            authStat: "",
            exam: "",
            classDesc:"",
            examDescription:"",
            onlineExam: false
          },
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
  
         //  subject detail paggination state configuration
        
         var Subjectschedulesemptyrecord = {
          idx: '',
             subjectID: "",
             date: "",
             startTime: {
               hour: "",
               min: ""
             },
             endTime: {
               hour: "",
               min: ""
             },
             hall: "",
             maxMark: '',
             syllabus: '',
            gradeDetails:[{
              idx: "",
              subjectID: "",
              grade: "",
              from: "",
              to: ""
            }]
         }

         var GradeDetailsemptyrecord = {
          idx: "",
          subjectID: "",
          grade: "",
          from: "",
          to: ""
        }

        var softSkillsEmptyrecord ={
          check:false,
            softSkillName:""
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
        Subjectschedulesemptyrecord: Subjectschedulesemptyrecord,
        GradeDetailsemptyrecord:GradeDetailsemptyrecord,
        softSkillsEmptyrecord:softSkillsEmptyrecord,
        currentStep: 1,
        currentOperation: 'SummaryQuery',
        intialFetching: true,
        userType: globalData.userType 
      })
  
      apiCall.functions.fromLoading = true
  
      NewOperation.functions.screenEventHandler(this)
       
    // }
  

  }

 











  

  async beforeApicall(Operation, currentStep,apiObject) {
    var globalData = JSON.parse(await AsyncStorage.getItem('GLOBAL'));
    const { dataModel, auditDataModel,summaryDataModel } = this.state

    switch (Operation) {
      case 'Create':
        switch(currentStep){
          case 5 :

            dataModel.gradeDetails = []

           for(let item of dataModel.Subjectschedules){
              apiObject.datamodel.gradeDetails = [...dataModel.gradeDetails,...item.gradeDetails] 
             }  
       
            break
        }
        break
      case 'Query':
        switch(currentStep){
          case 2 :
            // if(globalData != null){
            //   apiObject.datamodel.instituteID =  globalData.instituteID
            //   for(let item of apiObject.businessEntity){
            //    if(item.entityName == "instituteID"){
            //     item.entityValue = globalData.instituteID 
            //    }
            //   }
            // }
        break
        }
        break
      case 'Modification':
        dataModel.gradeDetails = []
        for(let item of dataModel.Subjectschedules){
           apiObject.datamodel.gradeDetails = [...dataModel.gradeDetails,...item.gradeDetails] 
          }  
        break
      case 'Deletion':
        switch(currentStep){
          case 2 :
            // if(globalData != null){
            //   apiObject.datamodel.instituteID =  globalData.instituteID
            //   for(let item of apiObject.businessEntity){
            //    if(item.entityName == "instituteID"){
            //     item.entityValue = globalData.instituteID 
            //    }
            //   }
            // }
       
        break
        }
        break
      case 'Authorisation':
        switch(currentStep){
          case 2 :
            // if(globalData != null){
            //   apiObject.datamodel.instituteID =  globalData.instituteID
            //   for(let item of apiObject.businessEntity){
            //    if(item.entityName == "instituteID"){
            //     item.entityValue = globalData.instituteID 
            //    }
            //   }
            // }
       
        break
        }
        break
    }
    return true;
  }

  afterApiCall(Operation, currentStep) {
    const { dataModel,emptyDataModel,CreateDefaultDataModel } = this.state

    switch (Operation) {
      case 'Create-Default':
        switch(currentStep){
          case 0 : 
          // var dummyModel = cloneDeep(emptyDataModel)  
          // dummyModel.exam = CreateDefaultDataModel.exam
          // this.setState({
          //  dataModel:dummyModel
          // })
          if(!SubScreenUtils.functions.copyAction){
            var dummyModel = cloneDeep(emptyDataModel)  
            dummyModel.exam = CreateDefaultDataModel.exam
            this.setState({
             dataModel:dummyModel
            })
          }else{
            dataModel.exam = CreateDefaultDataModel.exam
            this.setState({
             dataModel:dataModel
            })
            SubScreenUtils.functions.copyAction = false
          }
          break
        }
        // case 'Create':
        // switch(currentStep){
        //   case 5 :
           
        //     break
        // }
        // break
      case 'Query':  
  
      for(let item of dataModel.Subjectschedules){
        item.gradeDetails = []
        for(let value of dataModel.gradeDetails){
          if(item.subjectID == value.subjectID){  
            item.gradeDetails.push(value)
          }
        }
        }
        console.log(dataModel,"dataModelmmmm")
        break
      case 'ModificationStep1':
        for(let item of dataModel.Subjectschedules){
          item.gradeDetails =[]
          for(let value of dataModel.gradeDetails){
            if(item.subjectID == value.subjectID){
              item.gradeDetails.push(value)
            }
          }
          }
        break
      case 'Deletion':
        switch(currentStep){
          case 2 :
        break
        }
        break
      case 'AuthorisationStep1':
        for(let item of dataModel.Subjectschedules){
          item.gradeDetails =[]
          for(let value of dataModel.gradeDetails){
            if(item.subjectID == value.subjectID){
              item.gradeDetails.push(value)
            }
          }
          }
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
      summaryDataModel
    } = this.state
 

  
 
    return (unMount == false && dataModel != null) ? (
      <Provider>
        <ScreenTemplate
          stateObject={this}
           CreateTemplate ={CreateTemplate.functions.CreateConfig(this)}
           QueryTemplate ={QueryTemplate.functions.QueryConfig(this)}
           EditTemplate ={EditTemplate.functions.ModificationConfig(this)}
           ViewTemplate ={ViewTemplate.functions.QueryConfig(this)}
           viewHeading ={`${dataModel.examDescription}`}
           AuthTemplate ={AuthTemplate.functions.AuthorisationConfig(this)}
           FilterTemplate ={<FilterListView
            stateObject={this}
            stateArray={summaryDataModel.SummaryResult}
          />}
        />
      </Provider>
    ) : null;
  }
}

export default ClassExamSchedule;
