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






const Instruction = [
  {
    text: 'There are no activities/events organized yet. ',
    color: UiColor.ERROR_COLOR
  },
  {
    text: 'Click "Create Activities/events" to organize an event/activity for a specific group of students.',
    color: UiColor.DRAK_GRAY_COLOR
  },
  {
    text: "Event means any activity planned and conducted for the students.",
    color: UiColor.DRAK_GRAY_COLOR
  },
  {
    text: 'For example,Institute can create events like Sports events(such as throwball, Running, etc.) or Cultural events (such as Annual day, Sports day, Christmas celebration,etc.) ',
    color: UiColor.DRAK_GRAY_COLOR
  },
  {
    text: 'You can easily create events by mentioning the assignee group , the event type and the event details.',
    color: UiColor.DRAK_GRAY_COLOR
  },

]






class InstituteActivityEvent extends React.Component {
  constructor(props) {
    super(props);
    //console.log(props,"props")
    this.state = {
      // stepper state configuration
      currentStep: 1,
      currentOperation: 'SummaryQuery',
      heading: 'Activities/Events Planner',
    
// eventImagesEmptyrecord  state configuration
eventImagesEmptyrecord: null,

    // enrollDetailsEmptyrecord detail paggination state configuration

    enrollDetailsEmptyrecord: null,

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
      primaryKeyCols: ['instituteID', 'activityID','type'],

      // alert state configuration
      errorType: "",
      error: [{ errorCode: '', errorMessage: '', errorParam: '' }],
      showAlert: false,

      serviceName: 'InstituteOtherActivity',
      serviceType: 'Institute',
      summaryService: 'InstituteOtherActivitySummary',
      summaryServiceType: 'InstituteSummaryEntity',
      // loading state ----
      isLoading: false,

      //remarks state ----
      remarks: '',

      unMount: false,

      nekot: '',
      ivas: '',
      uhtuliak: '',
      CreateDefaultDataModel: { activityID: '' },

      // starts 3.0 UI/UX
      intialFetching: false,
      createStepsHeading: ['Basic Info','Fee Details', 'Event Details','Event Images' ,'Notification', 'Remarks', 'Completed'],
      summaryResultByFilter: [],
      errorField: [],
      breadcrumb: 'Menu / Activities/Events',
      viewDetail: null,
      showComplete: false,
      summaryResultIndex: 0,
      userType: '',
      secondModalVisible: false,
      twoLevelModalVisible: false,
      enableScrollViewScroll: true,
      animatedStartValue: new Animated.Value(0),
      showAnimationRefreshBtn: true,
      welComeTitle: 'Activities/Events Planner',
      welcomeInstruction: Instruction,
      childViewDetails: null,
      youtubeOption: false,
      deviceOption: false,
      isChildRecordShow: false,
      showFullViewDoc: false,
      storedDataModel: null,
      currencyCode:'',
      showTooltipModal:false,
      type:''
      // selectOption:''

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

    await apiCall.functions.cancelToken.cancel('Activities/Events Planner api is being canceled');

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
      eventImagesEmptyrecord:null,
      enrollDetailsEmptyrecord:null
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
      instituteID: "",
      instituteName: "",
      groupID: "",
      groupDesc: "",
      activityID: "",
      activityName: "",
      activityType: "",
      level: "",
      venue: "",
      date: "",
      dueDate: "",
      remarks: "",
      smsNotification: false,
      emailNotification: false,
      pushNotification: "",
      parentEnroll: false,
      competitionEvent: false,
      maxEnroll: "",
      maxParticipation: "",
      enrollDetails: [],
      eventImages: [
        // {
        //   imageID: "",
        //   imagePath: ""
        // }
      ],
      feeID: "",
      feeDescription: "",
      amount: "",
      feeDueDate: "",
      type:""
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
    
        level: "",
        authStat: "",
       
        activityType: "",
        assignee: "",
        groupDesc:'',
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


    var eventImagesEmptyrecord = {
      imageID: "",
      imagePath: ""
    }

    var enrollDetailsEmptyrecord = {
      studentID: "",
      studentName: "",
      participate: false,
      result: "",
      comments: "",
      enroll: false
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
      eventImagesEmptyrecord:eventImagesEmptyrecord,
      enrollDetailsEmptyrecord:enrollDetailsEmptyrecord,
      nekot: `${globalData.userID}~${globalData.instituteID}`,
      ivas: globalData.token1,
      uhtuliak: globalData.token0,
      currencyCode :globalData.currencyCode
    })

    apiCall.functions.fromLoading = true

    NewOperation.functions.screenEventHandler(this)

    // }


  }















  async beforeApicall(Operation, currentStep, apiObject) {
    var globalData = JSON.parse(await AsyncStorage.getItem('GLOBAL'));
    const { dataModel, auditDataModel, summaryDataModel } = this.state

    /*if(apiObject != undefined){
    console.log('apiObject.datamodel.type',apiObject.datamodel.type)
      this.setState({
        type:apiObject.datamodel.type
      })
    }*/
    switch (Operation) {
      case 'Create-Default':
        // classDesc = dataModel.classDescription
        break
      case 'Create':
        // switch(currentStep){
        //   case 5 :


        //     break
        // }
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
          storedDataModel: apiObject.datamodel
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
    const { dataModel, emptyDataModel, CreateDefaultDataModel } = this.state

    switch (Operation) {
      case 'Create-Default':
        switch (currentStep) {
          case 0:
            var dummyModel = cloneDeep(emptyDataModel)
            dummyModel.activityID = CreateDefaultDataModel.activityID
            this.setState({
              dataModel: dummyModel,
              selectOption: ''

            })
            break
        }
        break
      case 'Query':

        break
      case 'ModificationStep1':

        break
      case 'Deletion':
        switch (currentStep) {
          case 2:
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
          CreateTemplate={CreateTemplate.functions.CreateConfig(this)}
          QueryTemplate={QueryTemplate.functions.QueryConfig(this)}
          EditTemplate={EditTemplate.functions.ModificationConfig(this)}
          ViewTemplate={ViewTemplate.functions.QueryConfig(this)}
          viewHeading={dataModel.activityName}
          AuthTemplate={AuthTemplate.functions.AuthorisationConfig(this)}
          FilterTemplate={<FilterListView
            stateObject={this}
            stateArray={summaryDataModel.SummaryResult}
          />}
        />
        <ChildRecordListModal
          stateObject={this}
          templates={<ChildRecordListView
            stateObject={this}
          />}
          title={childViewDetails != null && `${childViewDetails.groupDescription}`}
          viewHeading={childViewDetails != null && `${SelectListUtils.functions.getSelectedValueNew(SelectListUtils.functions.selectMaster.ActivityTypeMaster,childViewDetails.activityType)}`}
          // CreateTemplate ={CreateTemplate.functions.CreateConfig(this)}
          EditTemplate={EditTemplate.functions.ModificationConfig(this)}
          ViewTemplate={ViewTemplate.functions.QueryConfig(this)}
          AuthTemplate={AuthTemplate.functions.AuthorisationConfig(this)}
          queryTitle={dataModel.activityName}
          querySubTitle={`${this.state.heading}`}
        />

      </Provider>
    ) : null;
  }
}

export default InstituteActivityEvent;
