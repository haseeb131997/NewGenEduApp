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
import SelectListUtils from '../../../utils/SelectListUtils'
import ChildRecordListModal from './../../../components/ChildRecordListModal';
import ChildRecordListView from './ChildRecordListView';
import SubScreenUtils from "../../../utils/SubScreenUtils";







const Instruction = [
  {
    text:'There are no study materials uploaded yet.',
    color:UiColor.ERROR_COLOR
  },
  {
    text:'Click "Create Study Material" to upload study materials for a year/standard.',
    color:UiColor.DRAK_GRAY_COLOR
  },
  {
    text:"Study Materials are learning materials to elaborate on a particular topic that assist the students in their learning process. It can be Model question papers, any referral document, any use case scenarios, special notes or important content of the book.",
    color:UiColor.DRAK_GRAY_COLOR
  },
  {
    text:'You can upload study materials by simply mentioning details like year/standard,  subject and lesson details like lesson number, heading and its subheading. It should be uploaded in any of the following formats: .jpeg, .jpg, .png, .txt, .pdf, .doc, .docx, .ppt, .pptx, .xls, .xlsx & .mp4.',
    color:UiColor.DRAK_GRAY_COLOR
  }
  
]



var classDesc = ''


class StudyMaterial extends React.Component {
  constructor(props) {
    super(props);
    //console.log(props,"props")
    this.state = {
      // stepper state configuration
      currentStep: 1,
      currentOperation: 'SummaryQuery',
      heading: 'Study Material',

     //  assessment  detail paggination state configuration
      assessmentEmptyRecord: null,

       

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
      primaryKeyCols: ['materialID'],

      // alert state configuration
      errorType: "",
      error: [{ errorCode: '', errorMessage: '', errorParam: '' }],
      showAlert: false,

      serviceName: 'StudyMaterial',
      serviceType: 'Institute',
      summaryService: 'StudyMaterialSummary',
      summaryServiceType: 'InstituteSummaryEntity',
      // loading state ----
      isLoading: false,

      //remarks state ----
      remarks: '',
   
       unMount:false,

       CreateDefaultDataModel:{materialID:''},

         // document state configuration
         nekot: '',
         ivas: '',
         uhtuliak: '',

      // starts 3.0 UI/UX
      intialFetching: false,
      createStepsHeading: ['Basic Info','Upload Material','Remarks', 'Completed'],
      summaryResultByFilter: [],
      errorField: [],
      breadcrumb:'Menu / Classroom Activities / Study Material',
      viewDetail:null,
      showComplete:false,
      summaryResultIndex:0,
      userType:'',
      secondModalVisible:false,
      twoLevelModalVisible:false,
      enableScrollViewScroll:true,
      animatedStartValue: new Animated.Value(0),
      showAnimationRefreshBtn:true,
      welComeTitle:'Study Material',
      welcomeInstruction:Instruction,
      isChildRecordShow:false,
      childViewDetails:null ,
      showFullViewDoc:false,
      storedDataModel:null,
      customLoadMore:true,
      showTooltipModal:false,
      downLoadDocument:false
  
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

    await apiCall.functions.cancelToken.cancel('Soft Skill Assessment api is being canceled');

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
      storedDataModel:null
      // assessmentEmptyRecord:null
    
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
        materialID: "",
        materialDescription: "",
        standard: "",
        subjectID: "",
        subjectName: "",
        lesson: "",
        heading: "",
        subHeading: "",
        contentPath: ""
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
            standard: "",
            subjectID: "",
            authStat: ""
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
  
      // var assessmentEmptyRecord = {
      //   studentID: "",
      //   studentName: "",
      //   skills: [{
      //     skillName: "",
      //     category: "",
      //     teacherFeedback: ""
      //   }]
      // }
       
  
  
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
        // assessmentEmptyRecord:assessmentEmptyRecord,
        currentStep: 1,
        currentOperation: 'SummaryQuery',
        intialFetching: true,
        userType: globalData.userType,
        nekot:`${globalData.userID}~${globalData.instituteID}`,
        ivas: globalData.token1,
        uhtuliak:globalData.token0 
      })
  
      apiCall.functions.fromLoading = true
  
      NewOperation.functions.screenEventHandler(this)
       
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
    const { dataModel,emptyDataModel,CreateDefaultDataModel } = this.state

    switch (Operation) {
      case 'Create-Default':
        switch(currentStep){
          case 0 : 
          // var dummyModel = cloneDeep(emptyDataModel)  
          // dummyModel.materialID = CreateDefaultDataModel.materialID
          // this.setState({
          //  dataModel:dummyModel
          // })
          if(!SubScreenUtils.functions.copyAction){
            var dummyModel = cloneDeep(emptyDataModel)  
            dummyModel.materialID = CreateDefaultDataModel.materialID
            this.setState({
             dataModel:dummyModel
            })
          }else{
            dataModel.materialID = CreateDefaultDataModel.materialID
            this.setState({
             dataModel:dataModel
            })
            SubScreenUtils.functions.copyAction = false
          }
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
           viewHeading ={dataModel.materialDescription}
           AuthTemplate ={AuthTemplate.functions.AuthorisationConfig(this)}
           FilterTemplate ={<FilterListView
            stateObject={this}
            stateArray={summaryDataModel.SummaryResult}
          />} 
        />
        <ChildRecordListModal
          stateObject={this}
          templates={<ChildRecordListView
            stateObject={this}
          />}
          title={`Year/Standard: ${childViewDetails != null && childViewDetails.standard}` }
          viewHeading={ childViewDetails != null && `${childViewDetails.subjectName}`}
          CreateTemplate ={CreateTemplate.functions.CreateConfig(this)}
          EditTemplate ={EditTemplate.functions.ModificationConfig(this)}
           ViewTemplate ={ViewTemplate.functions.QueryConfig(this)}
           queryTitle={this.state.dataModel.materialDescription}
           querySubTitle={this.state.dataModel.materialID}

        />


        
      </Provider>
    ) : null;
  }
}

export default StudyMaterial;
