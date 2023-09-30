
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
import Exception from '../../../utils/Exception'
import SelectListUtils from '../../../utils/SelectListUtils'









const Instruction = [
  {
    text:'There are no notification templates configured yet.',
    color:UiColor.ERROR_COLOR
  },
  {
    text:'Click " Create template" to configure a notification template to send notifications to parents/staff.',
    color:UiColor.DRAK_GRAY_COLOR
  },
  {
    text:'A Template is a message format which is used for sending sms/email notifications to parents.',
    color:UiColor.DRAK_GRAY_COLOR
  },
  {
    text:'There are two types of notifications: Event-triggered notification messages for Exam schedule, Exam Assessment, ECircular, Video lesson, Softskill Assessment, Extra curricular events, Attendance and Fees can be sent on pre-determined schedule that can have only one template. For example, There can be only one template for exam schedule message type that will be used whenever exam schedule is configured in the system.',
    color:UiColor.DRAK_GRAY_COLOR
  },
  {
    text:'Instant notifications messages for Homework, Disciplinary Action, Emergency, Holiday, Appreciation and others can be sent on given delivery date that can have multiple templates. For example, you can have different templates for homework on different dates.',
    color:UiColor.DRAK_GRAY_COLOR
  },
  {
    text:'You can configure notification template by selecting the message type(attendance, exam,etc),the channel(sms/mail) and the language(english/local language).',
    color:UiColor.DRAK_GRAY_COLOR
  }
]



class InstituteNotificationTemplate extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      // stepper state configuration
      currentStep: 1,
      currentOperation: 'SummaryQuery',
      heading: 'Template Configuration',

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
      primaryKeyCols: ['templateID'],

      // alert state configuration
      errorType: "",
      error: [{ errorCode: '', errorMessage: '', errorParam: '' }],
      showAlert: false,

      serviceName: 'NotificationTemplate',
      serviceType: 'Institute',
      summaryService: 'NotificationTemplateSummary',
      summaryServiceType: 'InstituteSummaryEntity',
      // loading state ----
      isLoading: false,

      //remarks state ----
      remarks: '',
      // header orientation
      // orientationValue: false,
      unMount: false,

        // default student detail data model

        CreateDefaultDataModel:{templateID:''},

      // starts 3.0 UI/UX
      intialFetching: false,
      createStepsHeading: ['Basic Info', 'Message Content','Sample Message','Remarks', 'Completed'],
      summaryResultByFilter: [],
      errorField: [],
      breadcrumb:'Menu / Notifications / Template Configuration ',
      viewDetail:null,
      showComplete:false,
      summaryResultIndex:0,
      userType:'',
      animatedStartValue: new Animated.Value(0),
      showAnimationRefreshBtn:true,
      welComeTitle:'Notification Template',
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

   await apiCall.functions.cancelToken.cancel('notification tempplate api is being canceled');

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
      templateID: "",
      messageType: "",
      channel: "",
      language: "",
      templateDescription: "",
      sampleMessage: "",
      tagDetails: [{
          tagID: "",
          tagDescription: ""
      }],
      details: [{
          section: "S",
          content: ""
      }, {
          section: "G",
          content: ""
      }, {
          section: "B",
          content: ""
      }, {
          section: "F",
          content: ""
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
        messageType: "",
        channel: "",
        authStat: ""

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
      intialFetching: true,
      userType: globalData.userType 
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
    const { dataModel, emptyDataModel ,CreateDefaultDataModel} = this.state
    console.log(Operation,"Operation")
    console.log(currentStep,"currentStep")
    switch (Operation) {
      case 'Create-Default':
        switch(currentStep){
          case 0 : 
          var dummyModel = cloneDeep(emptyDataModel)  
          dummyModel.templateID = CreateDefaultDataModel.templateID
          this.setState({
           dataModel:dummyModel
          })
          break
          case 1 : 
          var dummyModel = cloneDeep(CreateDefaultDataModel)  
          this.setState({
           dataModel:dummyModel
          })
          Exception.functions.showFrontendError(this.parentStateChange, [{ errorCode: 'FE-VAL-057', errorMessage: '', errorParam: '' }])
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
           viewHeading ={`${SelectListUtils.functions.getSelectedValue(SelectListUtils.functions.selectMaster.NotificationMaster, dataModel.messageType)}`}
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

export default InstituteNotificationTemplate;
