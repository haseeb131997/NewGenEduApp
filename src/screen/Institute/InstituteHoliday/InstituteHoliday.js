
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
import moment from "moment";
import { UiColor } from "../../../theme";




const Instruction = [
  {
    text:'There are no holidays maintained yet.',
    color:UiColor.ERROR_COLOR
  },
  {
    text:'Click "Create Holiday Maintenance" to maintain holiday either for a particular class/all classes of an institute.',
    color:UiColor.DRAK_GRAY_COLOR
  },
  {
    text:'Holiday maintenance is used to maintain the working and non-working days of an institute. Holidays are maintained for all classes of an institute. If you want to maintain holiday for a specific class , then you can simply mention the particular class.',
    color:UiColor.DRAK_GRAY_COLOR
  }
]







class InstituteHoliday extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // stepper state configuration
      currentStep: 1,
      currentOperation: 'SummaryQuery',
      heading: 'Institute Calendar',

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
      primaryKeyCols: ['instituteID', 'month', 'year', 'classCode'],

      // alert state configuration
      errorType: "",
      error: [{ errorCode: '', errorMessage: '', errorParam: '' }],
      showAlert: false,

      serviceName: 'HolidayMaintenance',
      serviceType: 'Institute',
      summaryService: 'HolidayMaintenanceSummary',
      summaryServiceType: 'InstituteSummaryEntity',
      // loading state ----
      isLoading: false,

      //remarks state ----
      remarks: '',
      // header orientation
      // orientationValue: false,
      unMount: false,

      // starts 3.0 UI/UX
      intialFetching: false,
      createStepsHeading: ['Basic Info', 'Calendar', 'Remarks', 'Completed'],
      summaryResultByFilter: [],
      errorField: [],
      breadcrumb: 'Menu / Configuration / Institute Calendar',
      viewDetail: null,
      showComplete: false,
      summaryResultIndex: 0,
      userType: '',
      animatedStartValue: new Animated.Value(0),
      showAnimationRefreshBtn: true,
      welComeTitle:'Institute Calendar',
      welcomeInstruction:Instruction,
      showTooltipModal:false,
      selectOption:'',
      // ends 3.0 UI/UX

      // calender state config
      customDatesStyles: [],
      selectedDateColor: '#000',
      selectedDateindex: 0,


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

   await apiCall.functions.cancelToken.cancel('Holiday maint. api is being canceled');

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

    // if(isUnMountDone){

    apiCall.functions.cancelToken = axios.CancelToken.source()
    const { currentOperation, heading, serviceName, } = this.state
    ScreenLoad.functions.onLoad(heading, serviceName, currentOperation)

    // emptyDataModel empty record
    var emptyDataModel = {
      instituteID: "",
      instituteName: "",
      month: "",
      year: "",
      classCode: 'ALL',
      classDesc:"",
      holiday: "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW"
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
        year: "",
        month: "",
        authStat: "",
        instituteID: ""

      },
      // SummaryResult: [{
      // instituteID: "",
      // year: "",
      // month: "",
      // holiday: "",
      // makerID: "",
      // checkerID: "",
      // makerDateStamp: "",
      // checkerDateStamp: "",
      // recordStatus: "",
      // authStatus: "",
      // versionNumber: "",
      // makerRemarks: "",
      // checkerRemarks: ""
      // }]
      SummaryResult: []
      // SummaryResult: dummySummaryResult

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

    var breadcrumb
    if(globalData.userType == 'A' || globalData.userType == 'O'){
      breadcrumb = 'Menu / Configuration / Institute Calendar'
    }
    else if (globalData.userType == 'T'){
      breadcrumb = 'Menu / Academic Calendar / Institute Calendar'
    }
    else if (globalData.userType == 'P' ||globalData.userType == 'S' ){
      breadcrumb = 'Menu / General / Institute Calendar'
    }


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
    //intialFetching: false,
      userType: globalData.userType,
      breadcrumb: breadcrumb,
    })

    apiCall.functions.fromLoading = true

    NewOperation.functions.screenEventHandler(this)
  // }
  }


  getColor = (code) => {
    var colorCode
    switch (code) {
      case 'H':
        colorCode = UiColor.ERROR_COLOR
        break
      case 'W':
        colorCode = UiColor.SUCCESS_COLOR
        break
      case 'F':
        colorCode = UiColor.WARNING_COLOR
        break
      case 'A':
        colorCode = UiColor.SKYBLUE
        break
    }
    return colorCode
  }

  setHolidays = () => {
    const { dataModel, editable } = this.state
    var startDate = moment(`${dataModel.year}-${dataModel.month}-1`, 'YYYY-MM-DD')
    var endOfmonth = startDate.clone().endOf('month')
    var hol = dataModel.holiday;
    String.prototype.replaceAt = function (index, replacement) {
      return this.substr(0, index) + replacement + this.substr(index + replacement.length);
    }
    var customDatesStyles = [];
    for (let i = 1; i <= endOfmonth.date(); i++) {
      var date = moment(`${dataModel.year}-${dataModel.month}-${i}`, 'YYYY-MM-DD');
      var day = date.day();
      if (day == 0 || day == 6) {
        hol = hol.replaceAt(date.date() - 1, "H");
        customDatesStyles.push({
          date: date.clone(),
          style: { backgroundColor: UiColor.ERROR_COLOR },
          textStyle: { color: '#fff' }, // sets the font color
          containerStyle: [], // extra styling for day container
        });
      }
      else {
        hol = hol.replaceAt(date.date() - 1, "W");
        // hol = hol.replaceAt(date.getDate() - 1, "W");
        customDatesStyles.push({
          date: date.clone(),
          style: { backgroundColor: UiColor.SUCCESS_COLOR },
          textStyle: { color: '#fff' }, // sets the font color
          containerStyle: [], // extra styling for day container
        });
      }
    }

    dataModel.holiday = hol
    this.setState({
      dataModel: dataModel,
      customDatesStyles: customDatesStyles
    })

  }


  setDataModel = () => {
    const { dataModel, editable } = this.state
    var startDate = moment(`${dataModel.year}-${dataModel.month}-1`, 'YYYY-MM-DD')
    var endOfmonth = startDate.clone().endOf('month')
    var hol = dataModel.holiday;
    var customDatesStyles = [];
    for (let i = 1; i <= endOfmonth.date(); i++) {
      var date = moment(`${dataModel.year}-${dataModel.month}-${i}`, 'YYYY-MM-DD');
      var item = hol.substr(date.date() - 1, 1)
      customDatesStyles.push({
        // key:i.toString(),
        date: date.clone(),
        style: { backgroundColor: this.getColor(item) },
        textStyle: { color: '#fff' }, // sets the font color
        containerStyle: [], // extra styling for day container
      });
    }
    dataModel.holiday = hol
    this.setState({
      dataModel: dataModel,
      customDatesStyles: customDatesStyles
    })

  }







  async beforeApicall(Operation, currentStep, apiObject) {
    var globalData = JSON.parse(await AsyncStorage.getItem('GLOBAL'));
    const { dataModel, auditDataModel } = this.state

    switch (Operation) {
      case 'Create':
        switch (currentStep) {
          case 1:
            this.setHolidays()
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
    console.log(Operation, "Operation afterApiCall")
    switch (Operation) {
      case 'Create':
        switch (currentStep) {
          case 1:
        }
        break
      case 'Query':
        this.setDataModel()
        break
      case 'ModificationStep1':
        this.setDataModel()
        break
      case 'AuthorisationStep1':
        this.setDataModel()
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
          CreateTemplate={CreateTemplate.functions.CreateConfig(this)}
          QueryTemplate={QueryTemplate.functions.QueryConfig(this)}
          EditTemplate={EditTemplate.functions.ModificationConfig(this)}
          ViewTemplate={ViewTemplate.functions.QueryConfig(this)}
          viewHeading={`${dataModel.year}`}
          AuthTemplate={AuthTemplate.functions.AuthorisationConfig(this)}
          FilterTemplate={<FilterListView
            stateObject={this}
            stateArray={summaryDataModel.SummaryResult}
          />}
        />
      </Provider>
    ) : null
  }
}

export default InstituteHoliday;
