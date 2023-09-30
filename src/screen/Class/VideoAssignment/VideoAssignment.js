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
    text:'There are no video lessons uploaded yet.',
    color:UiColor.ERROR_COLOR
  },
  {
    text:'Click "Create Video Lesson" to upload video lessons for a class/group.',
    color:UiColor.DRAK_GRAY_COLOR
  },
  {
    text:"Video Lesson is a video which represents educational material for a topic which is to be learned.",
    color:UiColor.DRAK_GRAY_COLOR
  },
  {
    text:' You can upload video lessons by simply mentioning details like assignee group and subject.You can either upload a video from your device storage or can provide a youtube link of a video.',
    color:UiColor.DRAK_GRAY_COLOR
  },
  {
    text:'You can assess the soft-skills for a particular exam/term by simply providing assessment rating and feedback for each student.',
    color:UiColor.DRAK_GRAY_COLOR
  }
  
]






class VideoAssignment extends React.Component {
  constructor(props) {
    super(props);
    //console.log(props,"props")
    this.state = {
      // stepper state configuration
      currentStep: 1,
      currentOperation: 'SummaryQuery',
      heading: 'Video Lesson',

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
      primaryKeyCols: ['instituteID','assignmentID'],

      // alert state configuration
      errorType: "",
      error: [{ errorCode: '', errorMessage: '', errorParam: '' }],
      showAlert: false,

      serviceName: 'InstituteAssignment',
      serviceType: 'Institute',
      summaryService: 'InstituteAssignmentSummary',
      summaryServiceType: 'InstituteSummaryEntity',
      // loading state ----
      isLoading: false,

      //remarks state ----
      remarks: '',
   
       unMount:false,

       nekot:'',
       ivas: '',
       uhtuliak:'',
       CreateDefaultDataModel:{assignmentID:''},

      // starts 3.0 UI/UX
      intialFetching: false,
      createStepsHeading: ['Basic Info','Upload','Notification','Remarks', 'Completed'],
      summaryResultByFilter: [],
      errorField: [],
      breadcrumb:'Menu / Classroom Activities / Video Lesson',
      viewDetail:null,
      showComplete:false,
      summaryResultIndex:0,
      userType:'',
      secondModalVisible:false,
      twoLevelModalVisible:false,
      enableScrollViewScroll:true,
      animatedStartValue: new Animated.Value(0),
      showAnimationRefreshBtn:true,
      welComeTitle:'Video Lesson',
      welcomeInstruction:Instruction,
      childViewDetails:null,
      youtubeOption:false,
      deviceOption:false,
      isChildRecordShow:false,
      showFullViewDoc:false,
      storedDataModel:null,
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

    await apiCall.functions.cancelToken.cancel('Video Lesson api is being canceled');

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
        URL: "",
        assignmentDescription: "",
        assignmentID: "",
        assignmentType: "",
        contenturl: "",
        dueDate: "",
        groupID: "",
        groupDesc:"",
        instituteID: "",
        instituteName: "",
        subjectID: "",
        subjectName:"",
        teacherComments: "",
        smsNotification:false,
        emailNotification:false,
        notes:'',
        vidPath: "",
        oracleURL:"",
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
            assignee: "",
            assigneedesc: "",
            assignmentID: "",
            assignmentType: "",
            authStat: "",
            dueDate: "",
            instituteID: "",
            subjectID: "",
            groupDesc:""
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
        currentStep: 1,
        currentOperation: 'SummaryQuery',
        intialFetching: true,
        userType: globalData.userType ,
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
          // dummyModel.assignmentID = CreateDefaultDataModel.assignmentID
          // this.setState({
          //  dataModel:dummyModel
          // })
          if(!SubScreenUtils.functions.copyAction){
            var dummyModel = cloneDeep(emptyDataModel)  
            dummyModel.assignmentID = CreateDefaultDataModel.assignmentID
            this.setState({
             dataModel:dummyModel,
             youtubeOption:false
            })
          }else{
            dataModel.assignmentID = CreateDefaultDataModel.assignmentID
            this.setState({
             dataModel:dataModel,
             youtubeOption:false
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
           EditTemplate ={EditTemplate.functions.ModificationConfig(this)}
           ViewTemplate ={ViewTemplate.functions.QueryConfig(this)}
           viewHeading ={SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.SubjectMaster,dataModel.subjectID)}
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
          title={`${childViewDetails != null && childViewDetails.groupDesc}` }
          viewHeading={ childViewDetails != null && `${SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.SubjectMaster,childViewDetails.subjectID)}`}
          CreateTemplate ={CreateTemplate.functions.CreateConfig(this)}
          EditTemplate ={EditTemplate.functions.ModificationConfig(this)}
           ViewTemplate ={ViewTemplate.functions.QueryConfig(this)}
           AuthTemplate ={AuthTemplate.functions.AuthorisationConfig(this)}
           queryTitle={SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.SubjectMaster,dataModel.subjectID)}
           querySubTitle={`${dataModel.groupDesc}`}
        />

      </Provider>
    ) : null;
  }
}

export default VideoAssignment;
