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
import SubScreenUtils from "../../../utils/SubScreenUtils";
import moment from "moment";
import Exception from '../../../utils/Exception'
import { httpUtils } from '../../../utils/HttpUtils';








const Instruction = [
  {
    text: 'There is no fee structure configured yet.',
    color: UiColor.ERROR_COLOR
  },
  {
    text: 'Click "Create Fee" to configure a fee structure for a class/group.',
    color: UiColor.DRAK_GRAY_COLOR
  },
  {
    text: "Fee is an amount collected by an institution for various purposes like tution ,exams,events,transport,coaching , etc.",
    color: UiColor.DRAK_GRAY_COLOR
  },
  {
    text: 'You can configure fee structure easily by mentioning the fee type(like tution,exam,etc.), the amount, due date and the assignee group.',
    color: UiColor.DRAK_GRAY_COLOR
  },

]






class InstituteFeePayment extends React.Component {
  constructor(props) {
    super(props);
    //console.log(props,"props")
    this.state = {
      // stepper state configuration
      currentStep: 1,
      currentOperation: 'SummaryQuery',
      heading: 'Fee Payment',

      // emptyPayments  state configuration
      emptyPayments: null,

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
      primaryKeyCols: ['paymentID', 'paymentDate'],

      // alert state configuration
      errorType: "",
      error: [{ errorCode: '', errorMessage: '', errorParam: '' }],
      showAlert: false,

      serviceName: 'InstitutePayment',
      serviceType: 'Institute',
      summaryService: 'InstitutePaymentSummary',
      summaryServiceType: 'InstituteSummaryEntity',
      reportServiceName: "paymentReceipt",
      reportServiceType: "InstituteReport",
      // loading state ----
      isLoading: false,

      //remarks state ----
      remarks: '',

      unMount: false,

      nekot: '',
      ivas: '',
      uhtuliak: '',
      CreateDefaultDataModel: { paymentID: '' },
      CreateDefaultReportPath: { ReportPath: '', Master: {} },

      // starts 3.0 UI/UX
      intialFetching: false,
      createStepsHeading: ['Basic Info','Payment Amount' ,'Breakup Details', 'Remarks', 'Completed'],
      summaryResultByFilter: [],
      errorField: [],
      breadcrumb: 'Menu / Fee Management / Fee Payment',
      viewDetail: null,
      showComplete: false,
      summaryResultIndex: 0,
      userType: '',
      secondModalVisible: false,
      twoLevelModalVisible: false,
      enableScrollViewScroll: true,
      animatedStartValue: new Animated.Value(0),
      showAnimationRefreshBtn: true,
      welComeTitle: 'Fee Payment',
      welcomeInstruction: Instruction,
      childViewDetails: {amountCollected: "",
      paymentDate: "",
      paymentDetails: []
    },
      youtubeOption: false,
      deviceOption: false,
      isChildRecordShow: false,
      showFullViewDoc: false,
      storedDataModel: null,
      currencyCode: '',
      showTooltipModal: false,
      secondLevelPageDetails:null

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

    await apiCall.functions.cancelToken.cancel('Fee payment api is being canceled');

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
      feeBreakupEmptyrecord: null

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
      instituteName: "",
      instituteID: "",
      paymentID: "",
      paymentDate: moment(new Date).format('DD-MM-YYYY'),
      paymentPaid: "",
      studentName: "",
      studentID: "",
      totalAmount: '',
      Payments: [{
        feeID: "",
        feeDescription: "",
        dueDate: "",
        outStanding: "",
        paymentForFee: "",
        feeAmount: "",
        amountAlreadyPaid: ""
      }],
      paymentMode: "",
      Master: {},
      DataModelForReport: "",
      ReportPath: "",
      balanceAmount: "",
      Breakup: [{
        feeID: "",
        total: "",
        breakupdetail: [{
          componentName: "",
          amount: ""
        }]
      }],
      signatureShow: "",
      totalAmountPaid: "",
      totalAmountToBePaid: "",
      link: ""
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
        paymentDate: "",
        paymentPaid: "",
        authStat: "",
        instituteID: '',
        paymentID: ''
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

    var emptyPayments = {
      feeID: "",
      feeDescription: "",
      dueDate: "",
      outStanding: "",
      paymentForFee: "",
      feeAmount: "",
      amountAlreadyPaid: ""
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
      emptyPayments: emptyPayments,
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

    NewOperation.functions.screenEventHandler(this)

    // }


  }















  async beforeApicall(Operation, currentStep, apiObject) {
    var globalData = JSON.parse(await AsyncStorage.getItem('GLOBAL'));
    const { dataModel, auditDataModel, summaryDataModel } = this.state

   
    switch (Operation) {
      case 'Create-Default':
        classDesc = dataModel.classDescription
        break
      case 'Payment-Default':
        switch (currentStep) {
          case 1:
            dataModel.paymentPaid = "0"
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
            dummyModel.paymentID = CreateDefaultDataModel.paymentID
            this.setState({
              dataModel: dummyModel
            })

            break
        }
        break
      case 'Payment-Default':
        switch (currentStep) {
          case 1:
            dataModel.paymentPaid = ""
            break
        }
        break
      case 'Query':

        break
        case 'ModificationStep1':
          ScreenUtils.functions.paymentAmount  =  dataModel.paymentPaid
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


  async callReport() {
    var globalData = JSON.parse(await AsyncStorage.getItem('GLOBAL'));
    const { dataModel } = this.state
    if (!apiCall.functions.apiError) {
      var businessEntity = [];
      var i = 0;
      for (let value of this.state.primaryKeyCols) {
        businessEntity[i] = {
          entityName: value,
          entityValue: dataModel[value]
        };
        i++
      }
      var apiObject = {
        serviceName: this.state.reportServiceName,
        serviceType: this.state.reportServiceType,
        datamodel: this.state.dataModel,
        operation: "View",
        businessEntity: businessEntity,
        audit: this.state.auditDataModel
      };
      dataModel.Master = {};
      if (globalData.userType == "P" || globalData.userType == "S") {
        dataModel.signatureShow = "Y"
      } else {
        dataModel.signatureShow = "N"
      }
      var link = httpUtils.FILE_URL().indexOf('test');
      if (link == -1) {
        dataModel.link = 'web'
      } else {
        dataModel.link = 'test'
      }
      dataModel.DataModelForReport = JSON.stringify(dataModel);
      await apiCall.functions.callApi(apiObject, null, this.parentStateChange).catch(function (e) {
        apiCall.functions.apiError = true
      });
      if (apiCall.functions.apiError) {
        Exception.functions.showFrontendError(this.parentStateChange, [{ errorCode: 'FE-VAL-060', errorMessage: '', errorParam: '' }])
       
        // Operation.functions.nextStepEventHandler(this)
        return false
      } else {
        GeneralUtils.functions.contentPath = `/CohesiveUpload${this.state.CreateDefaultReportPath.ReportPath}`
    
        this.setState({
          showFullViewDoc:true
        })
        // Exception.functions.showFrontendError(this.parentStateChange, [{ errorCode: 'FE-VAL-061', errorMessage: '', errorParam: '' }])
      }
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
        <ScreenTemplate
          stateObject={this}
          CreateTemplate={CreateTemplate.functions.CreateConfig(this)}
          QueryTemplate={QueryTemplate.functions.QueryConfig(this)}
          EditTemplate={EditTemplate.functions.ModificationConfig(this)}
          ViewTemplate={ViewTemplate.functions.QueryConfig(this)}
          viewHeading={dataModel.studentName}
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
          title={`Payment Date`}
          viewHeading={childViewDetails != null && `${childViewDetails.paymentDate}`}
          CreateTemplate={CreateTemplate.functions.CreateConfig(this)}
          EditTemplate={EditTemplate.functions.ModificationConfig(this)}
          ViewTemplate={ViewTemplate.functions.QueryConfig(this)}
          AuthTemplate={AuthTemplate.functions.AuthorisationConfig(this)}
          queryTitle={dataModel.studentName}
          querySubTitle={`${dataModel.studentID}`}
        />

      </Provider>
    ) : null;
  }
}

export default InstituteFeePayment;
