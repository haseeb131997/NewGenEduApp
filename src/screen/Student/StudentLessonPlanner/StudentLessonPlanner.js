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
import AuthTemplate from "./AuthTemplate";
import NewOperation from "../../../utils/NewOperation";
import apiCall from "../../../ApiCall/ActionApi";
import axios from 'axios';
import cloneDeep from 'lodash/cloneDeep';
import FilterListView from './FilterListView';
import ScreenTemplate from './../../../components/ScreenTemplate';
import ScreenUtils from "../../../utils/ScreenUtils";
import { UiColor } from "../../../theme";
import CalendarModal from './../../../components/CalendarModal';
import LessonPlannerCalendar from "./LessonPlannerCalendar";
import FilterScreenTemplate from './../../../components/FilterScreenTemplate';
import CustomCacheMemory from "../../../utils/CustomCacheMemory";
import SubScreenUtils from "../../../utils/SubScreenUtils";
import SearchUtils from "../../../utils/SearchUtils";




const Instruction = [
  {
    text: 'There is no lesson plan created yet.',
    color: UiColor.ERROR_COLOR
  },
  {
    text: 'Click "Create Lesson Planner" to create a lesson plan.',
    color: UiColor.DRAK_GRAY_COLOR
  },
  {
    text: "A lesson plan refers to a teacher's plan for a particular lesson to be taught in the classroom. It will help teacher to plan, prepare and handle the lessons smoothly. ",
    color: UiColor.DRAK_GRAY_COLOR
  },
  {
    text: 'You can create lesson planner by specifying details like date and teacher name. Timetable details of the teacher for the given date appears by default where lesson plan can be added for particular period.',
    color: UiColor.DRAK_GRAY_COLOR
  },


]



var classDesc = ''





class StudentLessonPlanner extends React.Component {
  constructor(props) {
    super(props);
    //console.log(props,"props")
    this.state = {
      // stepper state configuration
      currentStep: 1,
      currentOperation: 'SummaryQuery',
      heading: 'Lesson Plan',


     

      // planDetail  paggination state configuration
      //  planDetailsSelectedIndex: 1,
      planDetailEmptyrecord: null,


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
      primaryKeyCols: ['planID', 'studentID', 'date'],

      // alert state configuration
      errorType: "",
      error: [{ errorCode: '', errorMessage: '', errorParam: '' }],
      showAlert: false,

      serviceName: 'StudentLessonPlannerService',
      serviceType: 'Student',
      summaryService: 'StudentLessonPlannerSummary',
      summaryServiceType: 'StudentSummaryEntity',
      // loading state ----
      isLoading: false,

      //remarks state ----
      remarks: '',

      unMount: false,

      CreateDefaultDataModel: { planID: '' },

      // starts 3.0 UI/UX
      intialFetching: false,
      createStepsHeading: ['Basic Info', 'Plan Details', 'Remarks', 'Completed'],
      summaryResultByFilter: [],
      errorField: [],
      breadcrumb: 'Menu / Student Level Tracking / Lesson Planner',
      viewDetail: null,
      showComplete: false,
      summaryResultIndex: 0,
      userType: '',
      userID: "",
      secondModalVisible: false,
      twoLevelModalVisible: false,
      enableScrollViewScroll: true,
      animatedStartValue: new Animated.Value(0),
      showAnimationRefreshBtn: true,
      welComeTitle: 'Lesson Planner',
      welcomeInstruction: Instruction,
      calendarIsOpen: false,
      childViewDetails: null,
      storedDataModel: null,
      calendarLoaditems: {},
      calendarRefresh: true,
      calendarEmptyRefresh: false,
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

    await apiCall.functions.cancelToken.cancel('Lesson planner api is being canceled');

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
      planDetailEmptyrecord: null,
      storedDataModel: null,
      displayContent: 'summaryDataModel'


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
      planID: "",
      studentID: "",
      studentName: "",
      date: "",
      planDetails: [
      //   {
      //     subjectID: "Eng",
      //     lesson: "Lesson 1",
      //     heading: "Histroy",
      //     subHeading: "Histroy of india",
      //     status: "",
      //     percentageOfCompletion: "",
      //     remarks: ""
      // }
    ]
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
        studentName: "",
        fromDate: "",
        toDate: "",
        authStat: "",
        status: "",
        year: "",
        month: ""
      },
      // version:"3",
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


    //  planDetailEmptyrecord detail paggination empty record

    var planDetailEmptyrecord = {
         subjectID: "",
          lesson: "",
          heading: "",
          subHeading: "",
          status: "",
          percentageOfCompletion: "",
          remarks: ""
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
      planDetailEmptyrecord: planDetailEmptyrecord,
      currentStep: 1,
      currentOperation: 'SummaryQuery',
      intialFetching: true,
      userType: globalData.userType,
      userID: globalData.userID,
      breadcrumb: (globalData.userType == 'A' || globalData.userType == 'T' || globalData.userType == 'O') ? 'Menu / Student Level Tracking / Lesson Planner' : 'Menu / Learning Managemnent System / Lesson Planner',
    })

    // apiCall.functions.fromLoading = true

    // NewOperation.functions.screenEventHandler(this)

    // }


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


  }















  async beforeApicall(Operation, currentStep, apiObject) {
    var globalData = JSON.parse(await AsyncStorage.getItem('GLOBAL'));
    const { dataModel, auditDataModel, summaryDataModel, calendarIsOpen } = this.state

    console.log(Operation, "Operation beforeApicall")
    switch (Operation) {
      case 'Create-Default':
        switch (currentStep) {
          case 1:

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
        // if(!GeneralUtils.functions.deleteInProgress){
        //   GeneralUtils.functions.deleteInProgress = true
        //    await NewOperation.functions.singleRecordView(this)
        //  }
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
    const { dataModel, emptyDataModel, CreateDefaultDataModel, calendarIsOpen,summaryDataModel } = this.state



    switch (Operation) {
      case 'Create-Default':
        switch (currentStep) {
          case 0:
            var dummyModel = cloneDeep(emptyDataModel)
            dummyModel.planID = CreateDefaultDataModel.planID
            if (calendarIsOpen) {
              dummyModel.studentName = dataModel.studentName
              dummyModel.studentID = dataModel.studentID
              dummyModel.date = dataModel.date
            }
            if (this.state.userType == 'P' || this.state.userType == 'S') {
              dummyModel.studentName = summaryDataModel.filter.studentName
              dummyModel.studentID = summaryDataModel.filter.studentID
            }
            this.setState({
              dataModel: dummyModel
            })
            break
          // case 1:
          //   var dummyModel = cloneDeep(emptyDataModel)
          //   dummyModel = CreateDefaultDataModel
          //   for (let item of dummyModel.classAndSubjectDetails) {
          //     item.planDetails = []
          //   }
          //   this.setState({
          //     dataModel: dummyModel
          //   })
          //   break

        }

        break
      case 'Create':
        switch (currentStep) {
          case 4:

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
       /* if (this.state.userType == 'P' || this.state.userType == 'S') {
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
    if (this.state.userType == 'A' || this.state.userType == 'T' || this.state.userType == 'O') {
      if (!QueryTemplate.functions.QueryMandatory(this)) {
        return false;
      }
      else {
        return true
      }
    }
    else {
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
        {/* <ScreenTemplate
          stateObject={this}
          CreateTemplate={CreateTemplate.functions.CreateConfig(this)}
          QueryTemplate={QueryTemplate.functions.QueryConfig(this)}
          //  EditTemplate ={EditTemplate.functions.ModificationConfig(this)}
          //  ViewTemplate ={ViewTemplate.functions.QueryConfig(this)}
          viewHeading={dataModel.studentName}
          AuthTemplate={AuthTemplate.functions.AuthorisationConfig(this)}
          FilterTemplate={<FilterListView
            stateObject={this}
            stateArray={summaryDataModel.SummaryResult}
          />}
        /> */}

        <FilterScreenTemplate
          stateObject={this}
          CreateTemplate={CreateTemplate.functions.CreateConfig(this)}
          QueryTemplate={QueryTemplate.functions.QueryConfig(this)}
          EditTemplate={EditTemplate.functions.ModificationConfig(this)}
          ViewTemplate={ViewTemplate.functions.QueryConfig(this)}
          ViewDetailsTemplate={ViewDetailsTemplate.functions.QueryConfig(this)}
          viewHeading={`${"You can search a student's lesson plan by mentioning student's name, month and year"}`}
          //  AuthTemplate ={AuthTemplate.functions.AuthorisationConfig(this)}
          FilterTemplate={<FilterListView
            stateObject={this}
          />}
          viewDetailsHeading={`${dataModel.studentName}`}
          viewTitle={`${dataModel.studentID}`}
        />

        <CalendarModal
          stateObject={this}
          templates={<LessonPlannerCalendar stateObject={this} />}
          title={'Lesson Planner'}
          viewHeading={childViewDetails != null && `${GeneralUtils.functions.getMonthName(childViewDetails.month)}-${childViewDetails.year}`}
          CreateTemplate={CreateTemplate.functions.CreateConfig(this)}
          EditTemplate={EditTemplate.functions.ModificationConfig(this)}
          ViewTemplate={ViewDetailsTemplate.functions.QueryConfig(this)}
          queryTitle={dataModel.date}
          querySubTitle={`${dataModel.studentName} (${dataModel.studentID})`}
        />
      </Provider>
    ) : null;
  }
}

export default StudentLessonPlanner;
