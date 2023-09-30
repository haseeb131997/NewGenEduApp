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
import { Provider } from 'react-native-paper';
import ScreenLoad from "../../../utils/ScreenLoad";
import GeneralUtils from "../../../utils/GeneralUtils";
import CreateTemplate from "./CreateTemplate";
import QueryTemplate from "./QueryTemplate";
import EditTemplate from "./EditTemplate";
import ViewTemplate from "./ViewTemplate";
import ViewDetailsTemplate from "./ViewDetailsTemplate";
//import NewOperation from "../../../utils/NewOperation";
import apiCall from "../../../ApiCall/ActionApi";
import axios from 'axios';
import cloneDeep from 'lodash/cloneDeep';
import FilterListView from './FilterListView';
//import ScreenTemplate from './../../../components/ScreenTemplate';
import ScreenUtils from "../../../utils/ScreenUtils";
import { UiColor } from "../../../theme";
//import SelectListUtils from '../../../utils/SelectListUtils'
//import ChildRecordListModal from './../../../components/ChildRecordListModal';
//import ChildRecordListView from './ChildRecordListView';
import SubScreenUtils from "../../../utils/SubScreenUtils";
import SearchUtils from "../../../utils/SearchUtils";
import FilterScreenTemplate from './../../../components/FilterScreenTemplate';

import CustomCacheMemory from "../../../utils/CustomCacheMemory";




const Instruction = [
  {
    text: 'There is no leave applied yet',
    color: UiColor.ERROR_COLOR
  },
  {
    text: 'Click "Apply Student Leave" to apply leave for a student. ',
    color: UiColor.DRAK_GRAY_COLOR
  },
  {
    text: "Student Leave is used to manage holiday requests(like sick,planned,casual leave) from students in order to know when they are going to be away from their classes.",
    color: UiColor.DRAK_GRAY_COLOR
  },
  {
    text: 'You can configure student leave by simply mentioning details like student name,from and to date with the leave options(like fullday leave/halfday leave) and the leave type(like sick,planned,casual leave) with the reason',
    color: UiColor.DRAK_GRAY_COLOR
  },

]






class ParentLeaveManagement extends React.Component {
  constructor(props) {
    super(props);
    //console.log(props,"props")
    this.state = {
      // stepper state configuration
      currentStep: 1,
      currentOperation: 'SummaryQuery',
      heading: 'Student Leave Management',



      // summaryDataModel state configuration
      summaryDataModel: null,
      emptySummaryDataModel: null,

      // auditDataModel  state configuration
      auditDataModel: null,
      emptyAuditDataModel: null,

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
      primaryKeyCols: ['referenceId', 'studentID'],

      // alert state configuration
      errorType: "",
      error: [{ errorCode: '', errorMessage: '', errorParam: '' }],
      showAlert: false,

      serviceName: 'StudentLeaveManagement',
      serviceType: 'Student',
      summaryService: 'StudentLeaveManagementSummary',
      summaryServiceType: 'StudentSummaryEntity',
      // loading state ----
      isLoading: false,

      //remarks state ----
      remarks: '',

      unMount: false,

      nekot: '',
      ivas: '',
      uhtuliak: '',
      CreateDefaultDataModel: { referenceId: '' },

      // starts 3.0 UI/UX
      intialFetching: false,
      createStepsHeading: ['Basic Info', 'Leave Details', 'Remarks', 'Completed'],
      summaryResultByFilter: [],
      errorField: [],
      breadcrumb: 'Menu / Academic / Leave Management',
      viewDetail: null,
      showComplete: false,
      summaryResultIndex: 0,
      userType: '',
      secondModalVisible: false,
      twoLevelModalVisible: false,
      enableScrollViewScroll: true,
      animatedStartValue: new Animated.Value(0),
      showAnimationRefreshBtn: true,
      welComeTitle: 'Student Leave Management',
      welcomeInstruction: Instruction,
      childViewDetails: null,
      youtubeOption: false,
      deviceOption: false,
      isChildRecordShow: false,
      showFullViewDoc: false,
      storedDataModel: null,
      currencyCode: '',
      selectOption: '',
      showTooltipModal: false,
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


  async setUnmount(unMount) {
    ScreenUtils.functions.unMountScreen(this)

    await apiCall.functions.cancelToken.cancel('Student leave api is being canceled');

    // ScreenUtils.functions.unMountDone =  true

    apiCall.functions.fromLoading = false


    this.setState({
      unMount: unMount,
      dataModel: null,
      emptyDataModel: null,
      summaryDataModel: null,
      emptySummaryDataModel: null,
      auditDataModel: null,
      emptyAuditDataModel: null,


    })


  }

  async setMount(unMount) {

    // var isUnMountDone = await ScreenUtils.functions.isUnMountDone()

    //   if(isUnMountDone){

    apiCall.functions.cancelToken = axios.CancelToken.source()
    const { currentOperation, heading, serviceName, } = this.state
    ScreenLoad.functions.onLoad(heading, serviceName, currentOperation)

    // emptyDataModel empty record
    var emptyDataModel = {
      referenceId: "",
      studentID: "",
      studentName: "",
      from: "",
      to: "",
      fromNoon: "",
      toNoon: "",
      type: "",
      leaveStatus: "",
      reason: ""
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
        reqAsOf: ''
      },
      filter: {
        studentID: "",
        leaveStatus: "",
        authStat: "",
        from: "",
        to: "",
        studentName: "",
        class: "",
        year: "",
        month: ""
      },
      SummaryResult: [],
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
      intialFetching: true,
      userType: globalData.userType,
      nekot: `${globalData.userID}~${globalData.instituteID}`,
      ivas: globalData.token1,
      uhtuliak: globalData.token0,
      currencyCode: globalData.currencyCode
    })

    apiCall.functions.fromLoading = true

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















  async beforeApicall(Operation, currentStep, apiObject) {
    var globalData = JSON.parse(await AsyncStorage.getItem('GLOBAL'));
    const { dataModel, auditDataModel, summaryDataModel } = this.state


    switch (Operation) {
      case 'Create-Default':
        // classDesc = dataModel.classDescription
        break
      case 'Create':
        switch (currentStep) {
          case 3:
            // this.setState({
            //   displayContent: 'summaryDataModel',
            //   // summaryResultByFilter: []
            // })

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

        break
      case 'Deletion':
        this.setState({
          storedDataModel: apiObject.datamodel,
          // displayContent: 'summaryDataModel'
        })
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
    const { dataModel, emptyDataModel, CreateDefaultDataModel, summaryDataModel } = this.state
    console.log(Operation, "Operation")
    console.log(currentStep, "currentStep")
    switch (Operation) {
      case 'Create-Default':
        switch (currentStep) {
          case 0:
            var dummyModel = cloneDeep(emptyDataModel)
            dummyModel.referenceId = CreateDefaultDataModel.referenceId
            dummyModel.studentName = summaryDataModel.filter.studentName
            dummyModel.studentID = summaryDataModel.filter.studentID
            this.setState({
              dataModel: dummyModel,
              selectOption: ''

            })
            break
        }
        break
      case 'Create':
        switch (currentStep) {
          case 3:
            // this.setState({
            //   displayContent: 'summaryResultByFilter'
            // })

            break
        }
        break
      case 'Query':

        break
      case 'ModificationStep1':

        break
      case 'Deletion':
        // this.setState({
        //   displayContent: 'summaryResultByFilter'
        // })

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
       /* if (this.state.userType == 'P' || this.state.userType == 'S') {
          CustomCacheMemory.functions.putStudentSearchResultInCache(this.state.summaryDataModel.filter.studentID, this.state.summaryService, this.state.summaryResultByFilter.SummaryResult);
        }*/
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
      /*  if (this.state.userType == 'P' || this.state.userType == 'S') {
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




  mandatoryCheck = (Operation, currentStep) => {

    console.log('inside mandatory check',Operation||currentStep);
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
   console.log('Student Leave Render',dataModel)
   console.log('Student Leave Render',this.state.displayContent)
   
    return (unMount == false && dataModel != null) ? (
      <Provider>
        {/* <ScreenTemplate
          stateObject={this}
          CreateTemplate={CreateTemplate.functions.CreateConfig(this)}
          QueryTemplate={QueryTemplate.functions.QueryConfig(this)}
          EditTemplate={EditTemplate.functions.ModificationConfig(this)}
          ViewTemplate={ViewTemplate.functions.QueryConfig(this)}
          viewHeading={dataModel.studentName}
          AuthTemplate={AuthTemplate.functions.AuthorisationConfig(this)}
          FilterTemplate={<FilterListView
            stateObject={this}
          />}
        />
        <ChildRecordListModal
          stateObject={this}
          templates={<ChildRecordListView
            stateObject={this}
          />}
         // title={ childViewDetails != null && `${GeneralUtils.functions.getMonthName(childViewDetails.month)}-${childViewDetails.year}`}
         viewHeading={childViewDetails != null && `${GeneralUtils.functions.getMonthName(childViewDetails.month)}-${childViewDetails.year}`}
          // CreateTemplate ={CreateTemplate.functions.CreateConfig(this)}
          EditTemplate={EditTemplate.functions.ModificationConfig(this)}
          ViewTemplate={ViewTemplate.functions.QueryConfig(this)}
          AuthTemplate={AuthTemplate.functions.AuthorisationConfig(this)}
          queryTitle={dataModel.studentName}
          querySubTitle={`${dataModel.studentID}`}
        /> */}

        <FilterScreenTemplate
          stateObject={this}
          CreateTemplate={CreateTemplate.functions.CreateConfig(this)}
          QueryTemplate={QueryTemplate.functions.QueryConfig(this)}
          EditTemplate={EditTemplate.functions.ModificationConfig(this)}
          ViewTemplate={ViewTemplate.functions.QueryConfig(this)}
          ViewDetailsTemplate={ViewDetailsTemplate.functions.QueryConfig(this)}
          viewHeading={`${"You can search a student's Leave by mentioning student's name."}`}
          //  AuthTemplate ={AuthTemplate.functions.AuthorisationConfig(this)}
          FilterTemplate={<FilterListView
            stateObject={this}
            stateArray={summaryDataModel.SummaryResult}
          />}
          viewDetailsHeading={`${dataModel.studentName}`}
          viewTitle={`${dataModel.studentID}`}
        />

      </Provider>
    ) : null;
  }
}


export default ParentLeaveManagement;
