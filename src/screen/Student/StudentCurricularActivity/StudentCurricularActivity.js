
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
import { View, Text, Platform, KeyboardAvoidingView, Image, Animated } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Provider } from 'react-native-paper';
import ScreenLoad from "../../../utils/ScreenLoad";
// import GeneralUtils from "../../../utils/GeneralUtils";
// import CreateTemplate from "./CreateTemplate";
import QueryTemplate from "./QueryTemplate";
// import EditTemplate from "./EditTemplate";
import ViewTemplate from "./ViewTemplate";
// import AuthTemplate from "./AuthTemplate";
//import NewOperation from "../../../utils/NewOperation";
import apiCall from "../../../ApiCall/ActionApi";
import axios from 'axios';
import cloneDeep from 'lodash/cloneDeep';
import FilterListView from './FilterListView';
import FilterScreenTemplate from './../../../components/FilterScreenTemplate';
import ScreenUtils from "../../../utils/ScreenUtils";
import { UiColor } from "../../../theme";
import SearchUtils from "../../../utils/SearchUtils";

//import CustomCacheMemory from "../../../utils/CustomCacheMemory";

import SubScreenUtils from "../../../utils/SubScreenUtils";
import ViewModel from '../../../components/ViewModel';

import Gallery from './Gallery';



const Instruction = [
]



class StudentCurricularActivity extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      viewModelVisible : false,
      imagesList:[],
      showFullViewDoc:false,
      showWebView:false,
      // stepper state configuration
      currentStep: 1,
      currentOperation: 'SummaryQuery',
      heading: 'Extra Curricular Activity',

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
      primaryKeyCols: ['studentID', 'activityID'],

      // alert state configuration
      errorType: "",
      error: [{ errorCode: '', errorMessage: '', errorParam: '' }],
      showAlert: false,

      serviceName: 'StudentOtherActivity',
      serviceType: 'Student',
      summaryService: 'StudentOtherActivitySummary',
      summaryServiceType: 'StudentSummaryEntity',
      // loading state ----
      isLoading: false,

      //remarks state ----
      remarks: '',
      // header orientation
      // orientationValue: false,
      unMount: false,

      // starts 3.0 UI/UX
      intialFetching: false,
      createStepsHeading: ['Details', 'Remarks', 'Completed'],
      summaryResultByFilter: [],
      errorField: [],
      breadcrumb: 'Menu / Student Level Tracking / Extra Curricular Activity',
      viewDetail: null,
      showComplete: false,
      summaryResultIndex: 0,
      userType: '',
      animatedStartValue: new Animated.Value(0),
      showAnimationRefreshBtn: true,
      welComeTitle: 'Extra Curricular Activity',
      welcomeInstruction: Instruction,
      showTooltipModal: false,
      displayContent:'summaryDataModel',
      currencyCode:''

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

    await apiCall.functions.cancelToken.cancel('Student Extra Curricular Activity api is being canceled');

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
      errorField: [],
      displayContent:'summaryDataModel'
    })

  }

  async setMount(unMount) {

    apiCall.functions.cancelToken = axios.CancelToken.source()
    const { currentOperation, heading, serviceName, } = this.state
    ScreenLoad.functions.onLoad(heading, serviceName, currentOperation)

    // emptyDataModel empty record
    var emptyDataModel = {
      studentID: "",
      studentName: "",
      activityID: "",
      activityName: "",
      activityType: "",
      level: "",
      venue: "",
      date: "",
      dueDate: "",
      confirmationDate: "",
      result: "",
      participate: false,
      comments: "",
      enroll: false,
      maxEnroll: "",
      maxParticipation: "",
      remarks: ""
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
        reqAsOf: '',
        refreshRequired: false
      },
      filter: {
        activityID: "",
        activityType: "",
        authStat: "",
        class: "",
        enroll_status: "",
        fromDate: "",
        studentID: "",
        studentName: "",
        toDate: ""
      },
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
      currentStep: 1,
      currentOperation: 'SummaryQuery',
      // intialFetching: true,
      userType: globalData.userType,
      currencyCode :globalData.currencyCode,
      breadcrumb: (globalData.userType == 'P' || globalData.userType == 'S') ? 'Menu / Academic / Extra Curricular Activity' : 'Menu / Student Level Tracking / Extra Curricular Activity'
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
        // NewOperation.functions.search(this)
        SubScreenUtils.functions.parentSummaryData(this)
      })
      SearchUtils.functions.searchModal =  false
    }

    // apiCall.functions.fromLoading = true
    // NewOperation.functions.screenEventHandler(this)
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
    const { dataModel, emptyDataModel } = this.state
    switch (Operation) {
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
      /*  if(this.state.userType == 'P' || this.state.userType == 'S'){
        CustomCacheMemory.functions.putStudentSearchResultInCache(this.state.summaryDataModel.filter.studentID, this.state.summaryService, this.state.summaryResultByFilter.SummaryResult);
        }*/
        break
    }
    return true
  }




  parentStateChange(object) {
    this.setState(
      object
    );

  }





  mandatoryCheck = () => {
    if (!QueryTemplate.functions.QueryMandatory(this)) {
      return false;
    }
    else {
      return true
    }

  }









  render() {
    const {
      unMount,
      dataModel,
      summaryDataModel
    } = this.state

    return (unMount == false && dataModel != null) ? (
      <Provider>
        <FilterScreenTemplate
          stateObject={this}
          //  CreateTemplate ={CreateTemplate.functions.CreateConfig(this)}
          QueryTemplate={QueryTemplate.functions.QueryConfig(this)}
          //  EditTemplate ={EditTemplate.functions.ModificationConfig(this)}
          ViewTemplate={ViewTemplate.functions.QueryConfig(this)}
          viewHeading={`${"You can search a student's Extra Curricular Activity by mentioning student's name."}`}
          //  AuthTemplate ={AuthTemplate.functions.AuthorisationConfig(this)}
          FilterTemplate={<FilterListView
            stateObject={this}
            stateArray={summaryDataModel.SummaryResult}
          />}
        />
        <ViewModel
          templates={<Gallery stateObject={this} imagesList={this.state.imagesList}></Gallery>}
          stateObject={this}
          title={'Event Gallery'}
          //subTitle={}
          //onSubmit={() => this.onSubmit()}
        />
      </Provider>
    ) : null
  }
}

export default StudentCurricularActivity;
