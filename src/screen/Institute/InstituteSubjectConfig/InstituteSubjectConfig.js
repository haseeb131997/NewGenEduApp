
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
import GeneralUtils from "../../../utils/GeneralUtils";
import NewOperation from "../../../utils/NewOperation";
import apiCall from "../../../ApiCall/ActionApi";
import axios from 'axios';
import cloneDeep from 'lodash/cloneDeep';
import InstituteScreenTemplate from './../../../components/InstituteScreenTemplate';
import { UiColor } from "../../../theme";
import InstituteGeneralConfigSubject from "./InstituteGeneralConfigSubject";
import Paggination from "../../../utils/Paggination";








const Instruction = [
  {
    text: 'There is no academic year configured yet',
    color: UiColor.ERROR_COLOR
  },
  {
    text: 'Click "Create Academic year" to configure a new academic year',
    color: UiColor.DRAK_GRAY_COLOR
  },
  {
    text: 'Academic year is a period of time during which the students attend classes. You can configure an academic year by simply mentioning the start and end dates of an academic year',
    color: UiColor.DRAK_GRAY_COLOR
  }
]



class InstituteSubjectConfig extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // stepper state configuration
      currentStep: 1,
      currentOperation: 'singleRecordView',
      heading: 'Subjects Configuration',


      //  SubjectMaster detail paggination state configuration
      SubjectMasterEmptyrecord: null,

      //  FeeTypeMaster detail paggination state configuration
      FeeTypeMasterEmptyrecord: null,

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
      primaryKeyCols: ['instituteID'],

      // alert state configuration
      errorType: "",
      error: [{ errorCode: '', errorMessage: '', errorParam: '' }],
      showAlert: false,

      serviceName: 'GeneralLevelConfiguration',
      serviceType: 'Institute',
      // summaryService: 'EducationPeriodConfigurationSummary',
      // summaryServiceType: 'InstituteSummaryEntity',
      // loading state ----
      isLoading: false,

      //remarks state ----
      remarks: '',
      // header orientation
      // orientationValue: false,
      unMount: false,

      // default instituteID detail data model
      // CreateDefaultDataModel: { instituteID: '' },

      nekot: '',
      ivas: '',
      uhtuliak:'',

      // starts 3.0 UI/UX
      intialFetching: false,
      createStepsHeading: ['Subjects', 'Fee Types','Institute Logo','Other Configurations'],
      summaryResultByFilter: [],
      errorField: [],
      breadcrumb: 'Menu / Configuration / Institute General Configuration / Subjects',
      viewDetail: null,
      showComplete: false,
      summaryResultIndex: 0,
      userType: '',
      animatedStartValue: new Animated.Value(0),
      showAnimationRefreshBtn: true,
      welComeTitle: 'Academic year configuration',
      welcomeInstruction: Instruction,
      secondModalVisible:false,
      auditModalVisible:false,
      logoModalVisible:false,
      showTooltipModal:false,
      screenType:'subject'

      // ends 3.0 UI/UX




    };
    this.parentStateChange = this.parentStateChange.bind(this)
    // this.mandatoryCheck = this.mandatoryCheck.bind(this)
    this.setUnmount = this.setUnmount.bind(this)
    this.setMount = this.setMount.bind(this)
    this.callbackend = this.callbackend.bind(this)
  }


  // starts NEW3.01

  componentDidMount() {
    console.log('tesing in')
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.setMount(false)
    });
    this._unsubscribe = this.props.navigation.addListener('blur', () => {
      this.setUnmount(true)
    });
  }

  componentWillUnmount() {
    console.log('tesing out')
    this._unsubscribe();
  }
  // ends NEW3.01




  async setUnmount(unMount) {
    // ScreenUtils.functions.unMountScreen(this)
    await apiCall.functions.cancelToken.cancel('Institute config api is being canceled');

    //  ScreenUtils.functions.unMountDone =  true

    // apiCall.functions.fromLoading = false
  
    this.setState({
      unMount: unMount,
      dataModel: null,
      emptyDataModel: null,
      // summaryDataModel: null,
      // emptySummaryDataModel: null,
      auditDataModel: null,
      emptyAuditDataModel: null,
      FeeTypeMasterEmptyrecord: null,
      SubjectMasterEmptyrecord: null,
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
      profileImgPath: "",
      SubjectMaster: [{
        subjectID: "",
        otherLangDescription: "",
        subjectName: ""
      }],
      GradeMaster: [{
        grade: "",
        from: "",
        to: ""
      }],
      ExamMaster: [{
        examType: "",
        otherLangDescription: "",
        description: ""
      }],
      NotificationMaster: [{
        notificationType: "",
        otherLangDescription: "",
        description: ""
      }],
      FeeTypeMaster: [{
        feeType: "",
        otherLangDescription: "",
        feeDescription: ""
      }],
      // start NEAI-286
      contactMail: "",
      contactNo: "",
      timezone: "",
      communicationMode: "",
      communicationLanguage: "",
      countryCode: "",
      currencyCode: "",
      ISDcode: "",
      parentAccess: false,
      studentAccess: false,
      instituteBuy: false,
      parentBuy: false,
      feeNotificationDays: "",
      studentLoginAge: ""

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

    //  SubjectMasterEmptyrecord detail paggination empty record
    var SubjectMasterEmptyrecord = {
      subjectID: "",
      otherLangDescription: "",
      subjectName: ""
    }


    //  FeeTypeMasterEmptyrecord detail paggination empty record
    var FeeTypeMasterEmptyrecord = {
      feeType: "",
      otherLangDescription: "",
      feeDescription: ""
    }


    var globalData = JSON.parse(await AsyncStorage.getItem('GLOBAL'));
    var dummyDataModel = cloneDeep(emptyDataModel)
    var dummyAuditDataModel = cloneDeep(emptyAuditDataModel)

    dummyDataModel.instituteID = globalData.instituteID
    emptyDataModel.instituteID = globalData.instituteID


    this.setState({
      unMount: unMount,
      dataModel: dummyDataModel,
      // dataModel: testTingModel,
      emptyDataModel: emptyDataModel,
      auditDataModel: dummyAuditDataModel,
      emptyAuditDataModel: emptyAuditDataModel,
      SubjectMasterEmptyrecord: SubjectMasterEmptyrecord,
      FeeTypeMasterEmptyrecord: FeeTypeMasterEmptyrecord,
      currentStep: 1,
      currentOperation: 'singleRecordView',
      intialFetching: true,
      userType: globalData.userType,
      nekot: `${globalData.userID}~${globalData.instituteID}`,
      ivas: globalData.token1,
      uhtuliak: globalData.token0
    })

    apiCall.functions.fromLoading = true

    NewOperation.functions.screenEventHandler(this)
    // }
  }




 async callbackend(operationtype,index){
    var businessEntity = []
    var i = 0
    for (let value of this.state.primaryKeyCols) {
      if (this.state.dataModel[value] != null && this.state.dataModel[value] != undefined) {
        businessEntity[i] =
        {
          entityName: value,
          entityValue: this.state.dataModel[value]
        }
      }
      else {
        businessEntity[i] =
        {
          entityName: value,
          entityValue: ''
        }
      }
      i++
    }

    var dummyDataModel = cloneDeep(this.state.dataModel)
    var apiObject = {
      serviceName: this.state.serviceName,
      serviceType: this.state.serviceType,
      datamodel: dummyDataModel,
      operation: 'Modify',
      businessEntity: businessEntity,
      audit: this.state.auditDataModel
    }

      if(operationtype == 'editSubject'){
       if(index != null){
        apiObject.datamodel.SubjectMaster[index] = this.state.SubjectMasterEmptyrecord
       }
       else{
        apiObject.datamodel.SubjectMaster.push(this.state.SubjectMasterEmptyrecord)
       }
  
     }
     else if(operationtype == 'deleteSubject'){
       apiObject.datamodel.SubjectMaster.splice(index, 1);
     }
    else if(operationtype == 'editFeeType'){
      if(index != null){
       apiObject.datamodel.FeeTypeMaster[index] = this.state.FeeTypeMasterEmptyrecord
      }
      else{
       apiObject.datamodel.FeeTypeMaster.push(this.state.FeeTypeMasterEmptyrecord)
      }
 
    }
    else if(operationtype == 'deleteFeeType'){
      apiObject.datamodel.FeeTypeMaster.splice(index, 1);
    }
  

    var defaultValidate = true;
    
    this.state.currentOperation = 'Modification'

    await GeneralUtils.functions.fnDefaultandValidateAudit(this).then((val) => { defaultValidate = val })
    if (defaultValidate) {
      await apiCall.functions.callApi(apiObject, null, this.parentStateChange)
    }
    else {
      return true
    }
    if (apiCall.functions.apiError) {
      return true
    }
    else{
      // Paggination.functions.selectedIndex = null
      this.setState({
        showComplete:true,
        // dataModel:this.state.dataModel
      })
    

//---- after success logic ---
    //  if(operationtype == 'editSubject'){
    //    if(index != null){
    //     this.state.dataModel.SubjectMaster[index] = this.state.SubjectMasterEmptyrecord
    //    }
    //    else{
    //     this.state.dataModel.SubjectMaster.push(this.state.SubjectMasterEmptyrecord)
    //    }
    //    this.setState({
    //     showComplete:true,
    //     dataModel:this.state.dataModel
    //   })
    //  }
    //  else if(operationtype == 'deleteSubject'){
    //   this.state.dataModel.SubjectMaster.splice(index, 1);
    //  }
  
    }
 


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
      case 'singleRecordView':
        if (globalData != null) {
          apiObject.datamodel.instituteID = globalData.instituteID
          for (let item of apiObject.businessEntity) {
            if (item.entityName == "instituteID") {
              item.entityValue = globalData.instituteID
            }
          }
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




  parentStateChange(object) {
    this.setState(
      object
    );

  }









  render() {
    const {
      unMount,
      dataModel,
      summaryDataModel
    } = this.state
    return (unMount == false && dataModel != null) ? (
      <Provider>
        <InstituteScreenTemplate
          screenType={'subject'}
          title={this.state.heading}
          stateObject={this}
          subject={<InstituteGeneralConfigSubject stateObject={this} />}
      
        />
      </Provider>
    ) : null
  }
}

export default InstituteSubjectConfig;
