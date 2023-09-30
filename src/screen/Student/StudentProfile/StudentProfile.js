
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
import { View, Text, Platform, KeyboardAvoidingView, Image,Animated } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Provider } from 'react-native-paper';
import ScreenLoad from "../../../utils/ScreenLoad";
// import GeneralUtils from "../../../utils/GeneralUtils";
import CreateTemplate from "./CreateTemplate";
import QueryTemplate from "./QueryTemplate";
import EditTemplate from "./EditTemplate";
import ViewTemplate from "./ViewTemplate";
import ViewTemplateList from "./ViewTemplateList";
import AuthTemplate from "./AuthTemplate";
import NewOperation from "../../../utils/NewOperation";
import apiCall from "../../../ApiCall/ActionApi";
import axios from 'axios';
import cloneDeep from 'lodash/cloneDeep';
import FilterListView from './FilterListView';
import ScreenTemplate from './../../../components/ScreenTemplate';
import ScreenUtils from "../../../utils/ScreenUtils";
import { UiColor } from "../../../theme";
import moment from 'moment';
import SearchUtils from "../../../utils/SearchUtils";
import FilterScreenTemplate from './../../../components/FilterScreenTemplate';
import CustomCacheMemory from "../../../utils/CustomCacheMemory";
import SubScreenUtils from "../../../utils/SubScreenUtils";







const Instruction = [
  {
    text:'There is no student profile configured yet.',
    color:UiColor.ERROR_COLOR
  },
  {
    text:'Click "Create Student Profile" to configure profile for a student.',
    color:UiColor.DRAK_GRAY_COLOR
  },
  {
    text:'Student profile shows all the required information(like general,family,address,class,etc) about the student.',
    color:UiColor.DRAK_GRAY_COLOR
  },
  {
    text:'You can configure student profile by simply entering the student details like general,family,address and class of a student.',
    color:UiColor.DRAK_GRAY_COLOR
  }
]



class StudentProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // stepper state configuration
      currentStep: 1,
      currentOperation: 'SummaryQuery',
      heading: 'Student Profiles',

        //  family detail paggination state configuration
        familyEmptyrecord: null,
       // student note state configuration
        studentNoteEmptyrecord: null,

      // summaryDataModel state configuration
      summaryDataModel: null,
      emptySummaryDataModel: null,
      // auditDataModel state configuration
      auditDataModel: null,
      emptyAuditDataModel: null,
      // dataModel state configuration
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
      primaryKeyCols: ['studentID'],

      // alert state configuration
      errorType: "",
      error: [{ errorCode: '', errorMessage: '', errorParam: '' }],
      showAlert: false,

      serviceName: 'StudentProfile',
      serviceType: 'Student',
      summaryService: 'StudentProfileSummary',
      summaryServiceType: 'StudentSummaryEntity',
      // loading state ----
      isLoading: false,

      //remarks state ----
      remarks: '',
      // header orientation
      // orientationValue: false,
      unMount: false,

      CreateDefaultDataModel:{studentID:''},

      // starts 3.0 UI/UX
      intialFetching: false,
      createStepsHeading: ['Basic Info', 'Family Info', 'Address', 'Other Details','Institute defined fields' ,'Remarks', 'Completed'],
      summaryResultByFilter: [],
      errorField: [],
      breadcrumb:'Menu / Configuration / Student Profiles',
      viewDetail:null,
      showComplete:false,
      summaryResultIndex:0,
      userType:'',
      animatedStartValue: new Animated.Value(0),
      showAnimationRefreshBtn:true,
      welComeTitle:'Student Profiles',
      welcomeInstruction:Instruction,
      showTooltipModal:false,
      displayContent: 'summaryDataModel'
      
      // ends 3.0 UI/UX


    };
    this.parentStateChange = this.parentStateChange.bind(this)
    this.mandatoryCheck = this.mandatoryCheck.bind(this)
    this.setUnmount = this.setUnmount.bind(this)
    this.setMount = this.setMount.bind(this)
  }


  // starts NEW3.01

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
  // ends NEW3.01




 async setUnmount(unMount) {
   ScreenUtils.functions.unMountScreen(this)

   await apiCall.functions.cancelToken.cancel('Student Profile api is being canceled');

  //  ScreenUtils.functions.unMountDone =  true

  apiCall.functions.fromLoading = false

    this.setState({
      unMount: unMount,
      dataModel: null,
      emptyDataModel: null,
      summaryDataModel: null,
      emptySummaryDataModel: null,
      auditDataModel: null,
      emptyAuditDataModel: null,
      familyEmptyrecord:null,
      studentNoteEmptyrecord:null,
      displayContent: 'summaryDataModel'
    })
      
  }

  async setMount(unMount) {
    // var isUnMountDone = await ScreenUtils.functions.isUnMountDone()

    // if(isUnMountDone){
    apiCall.functions.cancelToken = axios.CancelToken.source()
    const { currentOperation, heading, serviceName, } = this.state
    ScreenLoad.functions.onLoad(heading, serviceName, currentOperation)

    // emptyDataModel empty record
    var emptyDataModel = {
      studentName: "",
        studentID: "",
        profileImgPath: "",
        note: "",
        mobNo: '',
        email: '',
        classes: [
          {
            classId: "",
            classDesc: "",
            startDate: "",
            endDate: ""
          },
        ],
        general: {
          class: "",
          gender: "",
          dob: "",
          bloodGroup: "",
          nationalID: "",
          address: {
            addressLine1: "",
            addressLine2: "",
            addressLine3: "",
            addressLine4: "",
            addressLine5: ""
          }
        },
        emergency:
        {
          existingMedicalDetails: ""
        },
        family: [
          // {
          //   memberName: "",
          //   memberID: "",
          //   memberRelationship: "",
          //   memberOccupation: "",
          //   memberEmailID: "",
          //   memberContactNo: "",
          //   notificationRequired: false,
          //   language: "E",
          //   memberImgPath: ''
          // }
        ],
        studentNotes:[
          {
            date: "",
            notes: "",
          
          }
        ],
        instituteFields:[]
       
    }

    // emptySummaryDataModel empty record
    var emptySummaryDataModel = {
      pageDetails: {
        searchType: "Initial",      //  Initial , More , Filter
        pageNumber: 0,
        recordStartingNumber: 0,
        recordEndingNumber: 0,
        totalRecords: 0,
        totalPages: 0,
        moreRecExists: false,
        reqAsOf:'',
        refreshRequired: false
      },
      filter: {
        studentName: "",
        studentID: "",
        class: "",
        authStat: "",
        recordStat: ""

      },
      // SummaryResult: [{
        // studentID: "",
        // studentName: "",
        // class: "",
        // authStat: "",
        // recordStat: ""
      // }]
      SummaryResult: []
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

    var familyEmptyrecord = {
      memberName: "",
      memberID: "",
      memberRelationship: "",
      memberOccupation: "",
      memberEmailID: "",
      memberContactNo: "",
      notificationRequired: false,
      language: "E",
      memberImgPath: ""
    }

     //  student detail  empty record
 
     var studentNoteEmptyrecord = {
          date: moment(new Date).format('DD-MM-YYYY'),
          notes: "",
          check:false
    }



    var globalData = JSON.parse(await AsyncStorage.getItem('GLOBAL'));
    var dummyDataModel = cloneDeep(emptyDataModel)
    var dummySummaryDataModel = cloneDeep(emptySummaryDataModel)
    var dummyAuditDataModel = cloneDeep(emptyAuditDataModel)

    dummyDataModel.instituteID = globalData.instituteID
    emptyDataModel.instituteID = globalData.instituteID


    this.setState({
      unMount: unMount,
      dataModel: dummyDataModel,
      emptyDataModel: emptyDataModel,
      summaryDataModel: dummySummaryDataModel,
      emptySummaryDataModel: emptySummaryDataModel,
      auditDataModel: dummyAuditDataModel,
      emptyAuditDataModel: emptyAuditDataModel,
      familyEmptyrecord:familyEmptyrecord,
      studentNoteEmptyrecord:studentNoteEmptyrecord,
      currentStep: 1,
      currentOperation: 'SummaryQuery',
      intialFetching: true,
      userType: globalData.userType,
      breadcrumb: globalData.userType == 'P' || globalData.userType == 'S' ? 'Menu / General / Student Profiles' : 'Menu / Configuration / Student Profiles', 
      heading:  globalData.userType == 'P' || globalData.userType == 'S' ? 'Student Profile' : 'Student Profiles' ,
    })

    if(globalData.userType == 'P' || globalData.userType == 'S'){
      SearchUtils.functions.searchModal =  true
      await SearchUtils.functions.launchSuggestion(this, '', 'studentName')
     //this.state.summaryDataModel.filter.studentName = apiCall.functions.searchDataModel.searchResults[0].StudentName
      //this.state.summaryDataModel.filter.studentID = apiCall.functions.searchDataModel.searchResults[0].StudentId
      dummySummaryDataModel.filter.studentName = apiCall.functions.searchDataModel.searchResults[0].StudentName
      dummySummaryDataModel.filter.studentID = apiCall.functions.searchDataModel.searchResults[0].StudentId
      
      this.setState({
        summaryDataModel: dummySummaryDataModel
      },()=>{
        SubScreenUtils.functions.parentSummaryData(this)
      })
      SearchUtils.functions.searchModal =  false
    }
    else{
      apiCall.functions.fromLoading = true
      NewOperation.functions.screenEventHandler(this)
    }

 
  // }
  }



  






  async beforeApicall(Operation, currentStep, apiObject) {
    var globalData = JSON.parse(await AsyncStorage.getItem('GLOBAL'));
    const { dataModel, auditDataModel } = this.state
    switch (Operation) {
      case 'Create':
        switch (currentStep) {
          case 1:
            break
        }
        break
      case 'Query':
        switch (currentStep) {
          case 2:

            break
        }
        break
      case 'Modification':
        switch (currentStep) {
          case 2:
            break
        }
        break
      case 'Deletion':
        switch (currentStep) {
          case 2:


            break
        }
        break
      case 'Authorisation':
        switch (currentStep) {
          case 2:


            break
        }
        break
    }
    return true;
  }

  afterApiCall(Operation, currentStep) {
    const { dataModel, emptyDataModel,CreateDefaultDataModel } = this.state
    switch (Operation) {
      case 'Create-Default':
        switch(currentStep){
          case 0 : 
          var dummyModel = cloneDeep(emptyDataModel)  
          dummyModel.studentID = CreateDefaultDataModel.studentID
          dummyModel.instituteFields = CreateDefaultDataModel.instituteFields
          this.setState({
           dataModel:dummyModel
          })
          break
        }
        break
      case 'Create':
        switch (currentStep) {
          case 1:
        }
        break
      case 'Query':
        switch (currentStep) {
          case 2:
            break
        }
        break
      case 'Modification':
        switch (currentStep) {
          case 2:
            break
        }
        break
      case 'Deletion':
        switch (currentStep) {
          case 2:
            break
        }
        break
      case 'Authorisation':
        switch (currentStep) {
          case 1:
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
       /* if(this.state.userType == 'P' || this.state.userType == 'S'){
          CustomCacheMemory.functions.putStudentSearchResultInCache(this.state.summaryDataModel.filter.studentID, this.state.summaryService, this.state.summaryResultByFilter.SummaryResult);
          } */
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
         {(this.state.userType == 'A' || this.state.userType == 'T' || this.state.userType == 'O') ?   
        <ScreenTemplate
          stateObject={this}
           CreateTemplate ={CreateTemplate.functions.CreateConfig(this)}
           QueryTemplate ={QueryTemplate.functions.QueryConfig(this)}
           EditTemplate ={EditTemplate.functions.ModificationConfig(this)}
           ViewTemplate ={ViewTemplate.functions.QueryConfig(this)}
           viewHeading ={`${dataModel.studentName}`}
           AuthTemplate ={AuthTemplate.functions.AuthorisationConfig(this)}
           FilterTemplate ={<FilterListView
            stateObject={this}
            stateArray={summaryDataModel.SummaryResult}
          />}
        />
       :
       <FilterScreenTemplate
          stateObject={this}
          //  CreateTemplate ={CreateTemplate.functions.CreateConfig(this)}
           QueryTemplate ={QueryTemplate.functions.QueryConfig(this)}
           ViewDetailsTemplate ={ViewTemplate.functions.QueryConfig(this)}
           ViewTemplate ={ViewTemplateList.functions.QueryConfig(this)}
           viewHeading ={`${"You can search a student's profile by mentioning student's name."}`}
          //  AuthTemplate ={AuthTemplate.functions.AuthorisationConfig(this)}
          //  FilterTemplate ={<FilterListView
          //   stateObject={this}
          // />}
          viewTitle={dataModel.studentID}
          viewDetailsHeading={dataModel.studentName}

        />}
      </Provider>
    ) : null
  }
}

export default StudentProfile;
