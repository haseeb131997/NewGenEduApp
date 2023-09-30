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





const Instruction = [
  {
    text:'There is no class configured yet.',
    color:UiColor.ERROR_COLOR
  },
  {
    text:'Click "Create Class Configuration" to configure a new class.',
    color:UiColor.DRAK_GRAY_COLOR
  },
  {
    text:'A class is a logical representation of a classroom in an institution (i.e) a body of students meeting regularly to study the same subject.',
    color:UiColor.DRAK_GRAY_COLOR
  },
  {
    text:'You can configure a class by mentioning the class details like year/standard, Section/Department, teacher name for a class and by mentioning the number of periods along with the timing for each period.',
    color:UiColor.DRAK_GRAY_COLOR
  }
]






class InstituteClassConfig extends React.Component {
  constructor(props) {
    super(props);
    //console.log(props,"props")
    this.state = {
      // stepper state configuration
      currentStep: 1,
      currentOperation: 'SummaryQuery',
      heading: 'Class Configuration',

     //  group detail paggination state configuration
     periodTimingsSelectedIndex: 1,
     periodTimingsEmptyrecord: null,
     periodTimingsEmpty:null,

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
      primaryKeyCols: ['Class','Standard','Section'],

      // alert state configuration
      errorType: "",
      error: [{ errorCode: '', errorMessage: '', errorParam: '' }],
      showAlert: false,

      serviceName: 'ClassLevelConfiguration',
      serviceType: 'Institute',
      summaryService: 'ClassSummary',
      summaryServiceType: 'ClassSummaryEnity',
      // loading state ----
      isLoading: false,

      //remarks state ----
      remarks: '',
   
       unMount:false,

      // starts 3.0 UI/UX
      intialFetching: false,
      createStepsHeading: ['Basic Info','Period Details','Remarks', 'Completed'],
      summaryResultByFilter: [],
      errorField: [],
      breadcrumb:'Menu / Configuration / Class',
      viewDetail:null,
      showComplete:false,
      summaryResultIndex:0,
      userType:'',
      secondModalVisible:false,
      enableScrollViewScroll:true,
      animatedStartValue: new Animated.Value(0),
      showAnimationRefreshBtn:true,
      welComeTitle:'Class configuration',
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

    await apiCall.functions.cancelToken.cancel('class config api is being canceled');

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
      periodTimingsEmptyrecord:null,
      periodTimingsEmpty:null
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
        instituteName:"",
        instituteID:"",
        Class:"",
        ClassDesc:"",
        Standard:'',
        Section:'',
        teacherID:"",
        teacherName:"",
        attendance:"",
        // periodTimings:[{
        //   idx:"",
        //   class:"",
        //   periodNumber:"",
        //   noon:"",
        //   startTime:{
        //     hour:"",
        //     min:""
        //   },
        //   endTime:{
        //     hour:"",
        //     min:""
        //   }
        // }]
        periodTimings:[]
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
            Class:"",
            authStat:"",
            instituteID:''
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
  
         //  group detail paggination state configuration
        
        var periodTimingsEmptyrecord = {
         idx:"",
         class:"",
         periodNumber:"",
         noon:"",
         startTime:{
           hour:"",
           min:""
         },
         endTime:{
           hour:"",
           min:""
         }
       }
  
  
      var globalData = JSON.parse(await AsyncStorage.getItem('GLOBAL'));
      var dummyDataModel =   cloneDeep(emptyDataModel)
      var dummySummaryDataModel =  cloneDeep(emptySummaryDataModel)
      var dummyAuditDataModel =   cloneDeep(emptyAuditDataModel)
      var dummyperiodTimingsEmptyrecord =   cloneDeep(periodTimingsEmptyrecord)
    
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
        periodTimingsEmptyrecord:dummyperiodTimingsEmptyrecord,
        periodTimingsEmpty:periodTimingsEmptyrecord,
        periodTimingsSelectedIndex: 1,
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
          case 1 :
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
    const { dataModel,emptyDataModel } = this.state
    switch (Operation) {
        case 'Create':
          switch(currentStep){
            case 1 : 
         
          }
          break
      case 'Query':
        switch(currentStep){
          case 2 :
        break
        }
        break
      case 'Modification':
        switch(currentStep){
          case 2 :
        break
        }
        break
      case 'Deletion':
        switch(currentStep){
          case 2 :
        break
        }
        break
      case 'Authorisation':
        switch(currentStep){
          case 2 :
        break
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
           viewHeading ={`${dataModel.Class}`}
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

export default InstituteClassConfig;
