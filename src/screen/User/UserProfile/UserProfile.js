
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
    text:'There is no academic year configured yet.',
    color:UiColor.ERROR_COLOR
  },
  {
    text:'Click "Create Academic Year" to configure a new academic year. ',
    color:UiColor.DRAK_GRAY_COLOR
  },
  {
    text:'Academic year is an annual period of an institution during which the students attend classes. For example, \n Year : 2020 \n Start Date : 01 Sep 2020 \n End Date : 24 July 2021 ',
    color:UiColor.DRAK_GRAY_COLOR
  },
  {
    text:'You can configure an academic year by simply mentioning the start date and end date of an academic year.',
    color:UiColor.DRAK_GRAY_COLOR
  }
]



class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // stepper state configuration
      currentStep: 1,
      currentOperation: 'SummaryQuery',
      heading: 'User Profile',


     //  parent detail paggination state configuration
     parentEmptyrecord: null,

     //  class detail paggination state configuration
     classEmptyrecord: null,

     //  teacher detail paggination state configuration
     teacherEmptyrecord: null,


     //  institute detail paggination state configuration
     instituteEmptyrecord: null,
    
     

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
      primaryKeyCols: ['userID'],

      // alert state configuration
      errorType: "",
      error: [{ errorCode: '', errorMessage: '', errorParam: '' }],
      showAlert: false,

      serviceName: 'UserProfile',
      serviceType: 'User',
      summaryService: 'UserProfileSummary',
      summaryServiceType: 'UserSummaryEntity',
      // loading state ----
      isLoading: false,

      //remarks state ----
      remarks: '',
      // header orientation
      // orientationValue: false,
      unMount: false,

      CreateDefaultDataModel:{userID:''},

      // starts 3.0 UI/UX
      intialFetching: false,
      createStepsHeading: ['Basic Info','Class','Parent','Staff','Institute','Remarks', 'Completed'],
      summaryResultByFilter: [],
      errorField: [],
      breadcrumb:'Menu / User Management / Profile',
      viewDetail:null,
      showComplete:false,
      summaryResultIndex:0,
      userType:'',
      animatedStartValue: new Animated.Value(0),
      showAnimationRefreshBtn:true,
      welComeTitle:'User Profile',
      welcomeInstruction:Instruction,
      instituteID: '',
      instituteName: '',
      showTooltipModal:false
      
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

   await apiCall.functions.cancelToken.cancel('User profile api is being canceled');

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
      functionsEmptyrecord:null
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
      userName: "",
      userID: "",
      instituteName: "",
      instituteID: "",
      emailID: "",
      mobileNo: "",
      password: "",
      expiryDate: "",
      userType: "",
      teacherID: "",
      teacherName: "",
      studentID: "",
      studentName: "",
      status: "",
      parentRoleMapping: [{
        roleID: "",
        studentName: "",
        studentID: "",
        instituteName: "",
        instituteID: "",
        idx: ""
      }],
      studentClassRoleMapping: [{
        idx: "",
        roleID: "",
        class: "",
        instituteName: "",
        instituteID: ""
      }],
      teacherRoleMapping: [{
        idx: "",
        roleID: "",
        instituteID: "",
        instituteName: "",
        teacherID: "",
        teacherName: ""
      }],
      instituteRoleMapping: [{
        idx: "",
        roleID: "",
        instituteID: "",
        instituteName: ""
      }]
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
        userID: "",
        userName: "",
        userType:"",
        authStat: ""
      },
      // SummaryResult: [{
      //   year: "",
      //   startDate: "",
      //   endDate: "",
      //   makerID: "",
      //   checkerID: "",
      //   makerDateStamp: "",
      //   checkerDateStamp: "",
      //   recordStatus: "",
      //   authStatus: "",
      //   versionNumber: "",
      //   makerRemarks: "",
      //   checkerRemarks: ""
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

 //  parent detail paggination state configuration
 
 var  parentEmptyrecord = {
  roleID: "",
  studentName: "",
  studentID: "",
  instituteName: "",
  instituteID: "",
  idx: ""
}
//  class detail paggination state configuration

var classEmptyrecord = {
  idx: "",
  roleID: "",
  class: "",
  instituteName: "",
  instituteID: ""
}

//  teacher detail paggination state configuration

var teacherEmptyrecord ={
  idx: "",
  roleID: "",
  instituteID: "",
  instituteName: "",
  teacherID: "",
  teacherName: ""
}

//  institute detail paggination state configuration
var instituteEmptyrecord = {
  idx: "",
  roleID: "",
  instituteID: "",
  instituteName: ""
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
      parentEmptyrecord:parentEmptyrecord,
      classEmptyrecord:classEmptyrecord,
      teacherEmptyrecord:teacherEmptyrecord,
      instituteEmptyrecord:instituteEmptyrecord,
      currentStep: 1,
      currentOperation: 'SummaryQuery',
      intialFetching: true,
      userType: globalData.userType,
      instituteID: globalData.instituteID,
      instituteName: globalData.instituteName,

    })

    apiCall.functions.fromLoading = true

    NewOperation.functions.screenEventHandler(this)
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
      case 'Create-Default':
        switch(currentStep){
          case 0 : 
          var dummyModel = cloneDeep(emptyDataModel)  
          dummyModel.userID = CreateDefaultDataModel.userID
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
           CreateTemplate ={CreateTemplate.functions.CreateConfig(this)}
           QueryTemplate ={QueryTemplate.functions.QueryConfig(this)}
           EditTemplate ={EditTemplate.functions.ModificationConfig(this)}
           ViewTemplate ={ViewTemplate.functions.QueryConfig(this)}
           viewHeading ={`${dataModel.userName}`}
           AuthTemplate ={AuthTemplate.functions.AuthorisationConfig(this)}
           FilterTemplate ={<FilterListView
            stateObject={this}
            stateArray={summaryDataModel.SummaryResult}
          />}
        />
      </Provider>
    ) : null
  }
}

export default UserProfile;
