
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
import {Animated } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Provider } from 'react-native-paper';
import ScreenLoad from "../../../utils/ScreenLoad";
// import GeneralUtils from "../../../utils/GeneralUtils";
import CreateTemplate from "./CreateTemplate";
import QueryTemplate from "./QueryTemplate";
import EditTemplate from "./EditTemplate";
import ViewTemplate from "./ViewTemplate";
import ViewTemplateFilterList from "./ViewTemplateFilterList";
import AuthTemplate from "./AuthTemplate";
import MeetingAttendance from "./MeetingAttendance";
import NewOperation from "../../../utils/NewOperation";
import apiCall from "../../../ApiCall/ActionApi";
import axios from 'axios';
import cloneDeep from 'lodash/cloneDeep';
import FilterListView from './FilterListView';
import ScreenTemplate from '../../../components/ScreenTemplate';
import FilterScreenTemplate from '../../../components/FilterScreenTemplate';
import ViewModel from '../../../components/ViewModel';
import ScreenUtils from "../../../utils/ScreenUtils";
import { UiColor } from "../../../theme";
import SubScreenUtils from "../../../utils/SubScreenUtils";
import SearchUtils from "../../../utils/SearchUtils";






const Instruction = [
  {
    text:'There is no Meeting or online class rooms configured yet',
    color:UiColor.ERROR_COLOR
  },
  {
    text:'Please schedule meetings or online class rooms through corresponding screens',
    color:UiColor.DRAK_GRAY_COLOR
  },
  /*{
    text:'Academic year is an annual period of an institution during which the students attend classes. For example, \n Year : 2020 \n Start Date : 01 Sep 2020 \n End Date : 24 July 2021 ',
    color:UiColor.DRAK_GRAY_COLOR
  },
  {
    text:'You can configure an academic year by simply mentioning the start date and end date of an academic year.',
    color:UiColor.DRAK_GRAY_COLOR
  }*/
]



class ViewMeetingAttendance extends React.Component {
  // static onEnter() {
  //   //console.log('onEnter', Actions.refs.InstituteYearConfiguration)
  //   const c = Actions.refs.InstituteYearConfiguration; c.setMount(false);
  // }

  // static onExit() {
  //   const c = Actions.refs.InstituteYearConfiguration; c.setUnmount(true);
  // }
  constructor(props) {
    super(props);
    this.state = {
      viewModelVisible : false,
      speedDialRequired:true,
      meetingData:{},
      // stepper state configuration
      currentStep: 1,
      currentOperation: 'SummaryQuery',
      heading: 'Meeting Attendance',
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
      primaryKeyCols: ['classroomID', 'studentID'],

      // alert state configuration

      errorType: "",
      error: [{ errorCode: '', errorMessage: '', errorParam: '' }],
      showAlert: false,

      serviceName: 'OnlineMeetingAttendanceService',
      serviceType: 'ClassEntity',
      summaryService: 'OnlineMeetingAttendanceSummary',
      summaryServiceType: 'ClassSummaryEnity',
   
      // loading state ----
      isLoading: false,

      //remarks state ----
      remarks: '',
      // header orientation
      // orientationValue: false,
      unMount: false,

      // starts 3.0 UI/UX
      intialFetching: false,
      createStepsHeading: [],
      summaryResultByFilter: [],
      errorField: [],
      breadcrumb:'Menu / Online Video Rooms / Meeting Attendance',
      viewDetail:null,
      showComplete:false,
      summaryResultIndex:0,
      userType:'',
      animatedStartValue: new Animated.Value(0),
      showAnimationRefreshBtn:true,
      welComeTitle:'Meeting Attendance',
      welcomeInstruction:Instruction,
      showTooltipModal:false,
      dropdownVisible:false,
      autoAuthEnabled:false
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

   await apiCall.functions.cancelToken.cancel('Meeting Attendance is being canceled');

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
      studentID: "",
classroomID: "",
type: "",
topic: "",
description: "",
date: "",
attendanceDetails: [{
studentID: "",
studentName: "",
joinTime: "",
leftTime: ""
      }]
    }

    // emptySummaryDataModel empty record
    var emptySummaryDataModel ={
    filter: {
      year: "",
      month: "",
      meetingScreenType: "",
      fromDate: "",
      toDate: "",
      studentName: "",
      studentID: ""
  },
  SummaryResult: [{
      applicableFor: "",
      attendanceDetails: [{
      attenderID: "",
      attenderName: "",
      joinTime: "",
      leftTime: "",
      }],
      attendedCount: 0,
      classroomID: "",
      date: "",
      description: "",
      duration: "",
      heading: "",
      meetingType: "",
      startTime: "",
      totalCount: 0                   
  }],
  //3.0 UI/UX change starts
  pageDetails: {
      pageNumber: 0,
      recordStartingNumber: 0,
      recordEndingNumber: 0,
      searchType: 'Initial',
      totalRecords: 0,
      totalPages: 0,
      moreRecExists: false,
      reqAsOf: '',
      refreshRequired: false
  },
  summaryResultByFilter: []
  //3.0 UI/UX change ends
};
   

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
      userType: globalData.userType 
    })

    //apiCall.functions.fromLoading = true
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
      // case 'Deletion':
      //   switch (currentStep) {
      //     case 0: return true
      //       break
      //     default:
      //       if (!Query.functions.QueryMandatory(this))
      //         return false;
      //   }
      //   break
      // case 'Authorisation':
      //   switch (currentStep) {
      //     case 0: return true
      //       break
      //     default:
      //       if (!Query.functions.QueryMandatory(this))
      //         return false;
      //   }
      //   break
    }

    return true
  }



  // renderSwitch(Operation) {
  //   switch (Operation) {
  //     case 'Default':
  //       return <Step1General
  //         stateObject={this}
  //         InstructionList={GeneralUtils.functions.getInstruction('Default', this.state.currentStep, GeneralUtils.functions.Default)}
  //         InstructionHeading={GeneralUtils.functions.getInstructionHeading('Default', this.state.currentStep, GeneralUtils.functions.Default)}
  //         heading={this.state.heading}
  //       />
  //       break;
  //     case 'Create': return Create.functions.CreateConfig(this)
  //       break
  //     case 'Query': return Query.functions.QueryConfig(this)

  //       break
  //     case 'Modification': return Modification.functions.ModificationConfig(this)

  //       break

  //     case 'Deletion': return Deletion.functions.DeletionConfig(this)

  //       break
  //     case 'Authorisation': return Authorisation.functions.AuthorisationConfig(this)

  //       break
  //   }
  // }






  render() {
    const {
      unMount,
      dataModel,
      summaryDataModel
    } = this.state
    // console.log(summaryDataModel,"summaryDataModel")
    // console.log(this.state.summaryResultByFilter,"summaryResultByFilter")
    // console.log(this.state.currentOperation,"summaryResultByFilter")
    return (unMount == false && dataModel != null) ? (
      <Provider>
       {(this.state.userType == 'A' || this.state.userType == 'T' || this.state.userType == 'O') ? 
        (<ScreenTemplate
          stateObject={this}
           CreateTemplate ={CreateTemplate.functions.CreateConfig(this)}
           QueryTemplate ={QueryTemplate.functions.QueryConfig(this)}
           EditTemplate ={EditTemplate.functions.ModificationConfig(this)}
           ViewTemplate ={ViewTemplate.functions.QueryConfig(this)}
           viewHeading ={`${dataModel.year}`}
           AuthTemplate ={AuthTemplate.functions.AuthorisationConfig(this)}
           FilterTemplate ={<FilterListView
            stateObject={this}
            stateArray={summaryDataModel.SummaryResult}
          />}
        />):
        
        <FilterScreenTemplate
        stateObject={this}
        //  CreateTemplate ={CreateTemplate.functions.CreateConfig(this)}
        QueryTemplate={QueryTemplate.functions.QueryConfig(this)}
        //  EditTemplate ={EditTemplate.functions.ModificationConfig(this)}
        ViewTemplate={ViewTemplateFilterList.functions.QueryConfig(this)}
        viewHeading={`${"You can search meeting attendance by mentioning any one of the below filters"}`}
        //  AuthTemplate ={AuthTemplate.functions.AuthorisationConfig(this)}
        FilterTemplate={<FilterListView
          stateObject={this}
        />}
      />
        
        }
        <ViewModel
          templates={<MeetingAttendance stateObject={this} />}
          stateObject={this}
          title={'Meeting Attendance'}
          //subTitle={}
          //onSubmit={() => this.onSubmit()}
        />
      </Provider>
    ) : null
  }
}

export default ViewMeetingAttendance;
