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
//import SelectListUtils from '../../../utils/SelectListUtils'
import ChildRecordListModal from './../../../components/ChildRecordListModal';
import ChildRecordListView from './ChildRecordListView';
//import SubScreenUtils from "../../../utils/SubScreenUtils";
import WebViewScreen from './WebViewScreen';
import { httpUtils } from '../../../utils/HttpUtils';







const Instruction = [
  {
    text: 'There are no staff meetings created/scheduled yet.',
    color: UiColor.ERROR_COLOR
  },
  {
    text: 'Click "Create / Schedule meeting" to schedule an online meeting for the staff.',
    color: UiColor.DRAK_GRAY_COLOR
  },
  {
    text: "Online Staff Meeting is a virtual meeting attended by the staff members to discuss various topics or issues related to an institution, Syllabus discussions, Result analysis, Staff Conferences, etc.",
    color: UiColor.DRAK_GRAY_COLOR
  },
  {
    text: 'You can schedule an online staff meeting(like 1 to 1 meeting, all teaching staff or non-teaching staff meeting) by simply mentioning details like topic/objective of meeting, date, time, duration and by pasting the meeting link of the Zoom or Microsoft Teams.',
    color: UiColor.DRAK_GRAY_COLOR
  },

]






class OnlineStaffMeeting extends React.Component {
  constructor(props) {
    super(props);
    //console.log(props,"props")
    this.state = {
      // stepper state configuration
      currentStep: 1,
      currentOperation: 'SummaryQuery',
      heading: 'Online Staff Meeting',

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
      primaryKeyCols: ['classroomID'],

      // alert state configuration
      errorType: "",
      error: [{ errorCode: '', errorMessage: '', errorParam: '' }],
      showAlert: false,

      serviceName: 'OnlineClassroomService',
      serviceType: 'ClassEntity',
      summaryService: 'OnlineClassroomSummary',
      summaryServiceType: 'ClassSummaryEnity',
      // loading state ----
      isLoading: false,

      //remarks state ----
      remarks: '',

      unMount: false,

      nekot: '',
      ivas: '',
      uhtuliak: '',
      CreateDefaultDataModel: { classroomID: '' },

      // starts 3.0 UI/UX
      intialFetching: false,
      createStepsHeading: ['Basic Info', 'Schedule Details','Notification','Remarks', 'Completed'],
      summaryResultByFilter: [],
      errorField: [],
      breadcrumb: 'Menu / Online Video Rooms / Online Staff Meetings',
      viewDetail: null,
      showComplete: false,
      summaryResultIndex: 0,
      userType: '',
      secondModalVisible: false,
      twoLevelModalVisible: false,
      enableScrollViewScroll: true,
      animatedStartValue: new Animated.Value(0),
      showAnimationRefreshBtn: true,
      welComeTitle: 'Online Staff Meetings',
      welcomeInstruction: Instruction,
      childViewDetails: {
        roomDetails:[]
      },
      youtubeOption: false,
      deviceOption: false,
      isChildRecordShow: false,
      showFullViewDoc: false,
      storedDataModel: null,
      currencyCode:'',
      showTooltipModal:false,
      secondLevelPageDetails:null,
        // starts
        showWebview: false,
        meetingUrl:'',
        // ends

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

    await apiCall.functions.cancelToken.cancel('online class room Configuration api is being canceled');

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
      classroomID: "",
      type: "",
      subject: "",
      unitNo: "",
      heading: "",
      subheading: "",
      description: "",
      date: "",
      startTimeHour: "",
      startTimeMin: "",
      endTimeHour: "",//N0U-108
      endTimeMin: "",//N0U-108
      duration: "",
      studentName: "",
      studentID: "",
      class: "",
      // sendNotification: false,
      meetingScreenType: "S",
      isZoomTeams: true,
      zoomTeamsLink: "",
      smsNotification:false,
      emailNotification:false
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
        classroomType: "",
        subject: "",
        date: '',
        studentName: '',
        studentID: '',
        class: '',
        authStat: "",
        meetingScreenType: "S",
        year:"",
        month:"",
        subjectName:"",
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
      currencyCode :globalData.currencyCode
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
      case 'Create':

        var day = apiObject.datamodel.date.split('-')[0];
        var month = apiObject.datamodel.date.split('-')[1];
        var year = apiObject.datamodel.date.split('-')[2];
        var startDateObj = new Date(year, month, day,apiObject.datamodel.startTimeHour, apiObject.datamodel.startTimeMin);
        var endDateObj = new Date(year, month, day,apiObject.datamodel.endTimeHour, apiObject.datamodel.endTimeMin);
        var difference = endDateObj - startDateObj;
        apiObject.datamodel.duration = (difference/(1000*60)).toString()
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
        var day = apiObject.datamodel.date.split('-')[0];
var month = apiObject.datamodel.date.split('-')[1];
var year = apiObject.datamodel.date.split('-')[2];
var startDateObj = new Date(year, month, day,apiObject.datamodel.startTimeHour, apiObject.datamodel.startTimeMin);
var endDateObj = new Date(year, month, day,apiObject.datamodel.endTimeHour, apiObject.datamodel.endTimeMin);
var difference = endDateObj - startDateObj;
apiObject.datamodel.duration = (difference/(1000*60)).toString()

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
            dummyModel.classroomID = CreateDefaultDataModel.classroomID
            this.setState({
              dataModel: dummyModel
            })
            // if(!SubScreenUtils.functions.copyAction){
            //   var dummyModel = cloneDeep(emptyDataModel)  
            //   dummyModel.feeID = CreateDefaultDataModel.feeID
            //   this.setState({
            //    dataModel:dummyModel
            //   })
            // }else{
            //   dataModel.feeID = CreateDefaultDataModel.feeID
            //   this.setState({
            //    dataModel:dataModel
            //   })
            //   SubScreenUtils.functions.copyAction = false
            // }
            break
        }
        break
      case 'Query':

        break
      case 'ModificationStep1':
        var day = dataModel.date.split('-')[0];
        var month = dataModel.date.split('-')[1];
        var year = dataModel.date.split('-')[2];
        var startDateObj = new Date(year, month, day,dataModel.startTimeHour, dataModel.startTimeMin);
        var duration = dataModel.duration;
       // var startDate = new Date(2022, 02, 11, 13, 40);
         var endDate = new Date( startDateObj.getTime() + (duration*60000) );


console.log(endDate);
dataModel.endTimeHour = endDate.getHours();
dataModel.endTimeMin=endDate.getMinutes();
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



    // starts
    joinClassroom_action(classroomID) {
      this.joinClassroomProcessing(classroomID, "", false)
    }
  
    async joinClassroomProcessing(classroomID, token, fromStart) {
  
      var globalData = JSON.parse(await AsyncStorage.getItem('GLOBAL'));
      var resToken = "";
      await apiCall.functions.getServiceToken(this.state.serviceName).then(
        async (values) => {
          if (values == null) {
            await apiCall.functions.callRequestToken(globalData, this.state.serviceName)
            await apiCall.functions.getServiceToken(this.state.serviceName).then((token) => {
              resToken = token;
              return
            })
          }
          else {
            resToken = values;
          }
        });
  
      var participantID = "";
      participantID = globalData.userID;
      var request = {
        body: {
          token: resToken,
          userID: globalData.userID,
          instituteID: globalData.instituteID,
          service: this.state.serviceName,
          classroomID: classroomID,
          participantID: participantID,
          userType: globalData.userType,
          meetingScreenType: this.state.dataModel.meetingScreenType
        }
      };
      this.parentStateChange({
        isLoading: true
      })
      // OnlineClassroomService
      await axios({
        method: "put",
        url: httpUtils.getURL('joinClassroom', this.state.serviceName),
        headers: {
          'Content-Type': 'application/json'
        },
  
        data: request,
  
      },
      )
        .then(response => {
          console.log(response, 'joinClassroomProcessing response')
          // this.parentStateChange({
          //   isLoading: false
          // })
          if (response.data.header.status == "success") {
  
            if (typeof response.data.body.isZoomTeamRoom != "undefined" && response.data.body.isZoomTeamRoom) {
              var url = response.data.body.URL;
              // window.parent.loadZoomTeamsMeet(url)
              this.parentStateChange({
                isLoading: false,
                meetingUrl:url,
                showWebview:true
              })
  
            } else if ((this.state.dataModel.meetingScreenType == "O" &&  GeneralUtils.functions.video_classroom_vendor_config == "Agora") || ((this.state.dataModel.meetingScreenType == "S" || this.state.dataModel.meetingScreenType == "P") && GeneralUtils.functions.video_meeting_vendor_config == "Agora")) {
              // window.parent.fn_hide_parentspinner();
              var classroomName = response.data.body.classroomName;
              var roomType = response.data.body.roomType;
              var duration = response.data.body.duration;
              var agoraToken = response.data.body.dailyOwnertoken;
              var startTime = response.data.body.joinDateStamp;
              // window.parent.loadAgoraClassroom(resToken, globalData.userID, globalData.userName, globalData.instituteID, this.state.serviceName, classroomID, true, classroomName, roomType, duration, participantID, this.state.dataModel.meetingScreenType, agoraToken, startTime)
              this.parentStateChange({
                isLoading: false
              })
            } else if ((this.state.dataModel.meetingScreenType == "O" &&  GeneralUtils.functions.video_classroom_vendor_config == "Daily") || ((this.state.dataModel.meetingScreenType == "S" || this.state.dataModel.meetingScreenType == "P") && GeneralUtils.functions.video_meeting_vendor_config == "Daily")) {
              var url = response.data.body.URL;
              var startTime = response.data.body.joinDateStamp;
              token = response.data.body.dailyOwnertoken;
              // window.parent.fn_hide_parentspinner();
              // window.parent.loadOnlineClass(resToken, globalData.userID, globalData.instituteID, this.state.serviceName, classroomID, participantID, url, startTime, token, this.state.dataModel.meetingScreenType)
              this.parentStateChange({
                isLoading: false
              })
            } else if ((this.state.dataModel.meetingScreenType == "O" &&  GeneralUtils.functions.video_classroom_vendor_config == "Whereby") || ((this.state.dataModel.meetingScreenType == "S" || this.state.dataModel.meetingScreenType == "P") && GeneralUtils.functions.video_meeting_vendor_config == "Whereby")) {
              // window.parent.fn_hide_parentspinner();
              var classroomName = response.data.body.classroomName;
              var roomType = response.data.body.roomType;
              var duration = response.data.body.duration;
              var agoraToken = response.data.body.dailyOwnertoken;
              var URL = response.data.body.URL;
              var startTime = response.data.body.joinDateStamp;
              // window.parent.loadWherebyClassroom(resToken, globalData.userID, globalData.userName, globalData.instituteID, this.state.serviceName, classroomID, fromStart, classroomName, roomType, duration, participantID, this.state.dataModel.meetingScreenType, URL, startTime)
              this.parentStateChange({
                isLoading: false
              })
            } else if (typeof response.data.body.roomType != "undefined" && response.data.body.roomType == "Z") {
              var URL = response.data.body.URL;
              // window.parent.loadZoomTeamsMeet(URL)
              this.parentStateChange({
                isLoading: false,
                meetingUrl:URL,
                showWebview:true
              })
            }
          } else {
            var error = [{
              errorCode: response.data.error[0].errorCode,
              errorMessage: response.data.error[0].errorMessage
            }];
            // window.parent.fn_hide_parentspinner();
            console.log("error response from joinClassroom resource");
            // fn_show_backend_exception(error);
            this.parentStateChange({
              isLoading: false,
              error: error,
              errorType: 'BE',
              showAlert: true
            })
            // returnValue = false;
            return false
          }
        })
        .catch(function (err) {
          console.log(err, 'joinClassroomProcessing error')
  
          var error = [{
            errorCode: "",
            errorMessage: "Please try after sometime"
          }];
          this.parentStateChange({
            isLoading: false,
            error: error,
            errorType: 'BE',
            showAlert: true
          })
  
          return false
        });
  
  
  
  
  
  
  
    }
  
  
    async startClassroom_action(classroomID) {
  
      // var classroomID = this.id;
      var globalData = JSON.parse(await AsyncStorage.getItem('GLOBAL'));
      var resToken = "";
      await apiCall.functions.getServiceToken(this.state.serviceName).then(
        async (values) => {
          if (values == null) {
            await apiCall.functions.callRequestToken(globalData, this.state.serviceName)
            await apiCall.functions.getServiceToken(this.state.serviceName).then((token) => {
              resToken = token;
              return
            })
          }
          else {
            resToken = values;
          }
        });
      var request = {
        body: {
          token: resToken,
          userID: globalData.userID,
          instituteID: globalData.instituteID,
          service: this.state.serviceName,
          classroomID: classroomID,
          meetingScreenType: this.state.dataModel.meetingScreenType
        }
      };
  
      this.parentStateChange({
        isLoading: true,
      })
      await axios({
        method: "put",
        url: httpUtils.getURL('OnlineClassroom', this.state.serviceName),
        headers: {
          'Content-Type': 'application/json'
        },
        data: request,
      },
      )
        .then(response => {
          console.log(response, 'startClassroom_action response')
          this.parentStateChange({
            isLoading: false
          })
          if (response.data.header.status == "success") {
            if (response.data.body.isZoomTeams) {
              // window.parent.fn_hide_parentspinner();
              this.joinClassroomProcessing(classroomID, "", true)
            } else if ((this.state.dataModel.meetingScreenType == "O" &&  GeneralUtils.functions.video_classroom_vendor_config == "Agora") || ((this.state.dataModel.meetingScreenType == "S" || this.state.dataModel.meetingScreenType == "P") && GeneralUtils.functions.video_meeting_vendor_config == "Agora")) {
              // window.parent.fn_hide_parentspinner();
              this.joinClassroomProcessing(classroomID, "", true)
            } else if ((this.state.dataModel.meetingScreenType == "O" &&  GeneralUtils.functions.video_classroom_vendor_config == "Daily") || ((this.state.dataModel.meetingScreenType == "S" || this.state.dataModel.meetingScreenType == "P") && GeneralUtils.functions.video_meeting_vendor_config == "Daily")) {
              var url = response.data.body.URL;
              // window.parent.fn_hide_parentspinner();
              var token = response.data.body.token;
              this.joinClassroomProcessing(classroomID, token, true)
            } else if ((this.state.dataModel.meetingScreenType == "O" &&  GeneralUtils.functions.video_classroom_vendor_config == "Whereby") || ((this.state.dataModel.meetingScreenType == "S" || this.state.dataModel.meetingScreenType == "P") && GeneralUtils.functions.video_meeting_vendor_config == "Whereby")) {
              // window.parent.fn_hide_parentspinner();
              this.joinClassroomProcessing(classroomID, "", true)
            }
          } else {
            var error = [{
              errorCode: response.data.error[0].errorCode,
              errorMessage: response.data.error[0].errorMessage
            }];
            // window.parent.fn_hide_parentspinner();
            console.log("error response from startClassroom resource");
            // fn_show_backend_exception(error);
            this.parentStateChange({
              isLoading: false,
              error: error,
              errorType: 'BE',
              showAlert: true
            })
            // returnValue = false;
            return false
          }
        })
        .catch(function (err) {
          console.log(err, 'startClassroom error')
  
          var error = [{
            errorCode: "",
            errorMessage: "Please try after sometime"
          }];
          this.parentStateChange({
            isLoading: false,
            error: error,
            errorType: 'BE',
            showAlert: true
          })
  
          return false
        });
  
  
  
    };
  
  
    // ends 



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
          viewHeading={dataModel.date}
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
          // title={ childViewDetails != null && `${GeneralUtils.functions.getMonthName(childViewDetails.month)}-${childViewDetails.year}`}
          viewHeading={ childViewDetails != null && `${GeneralUtils.functions.getMonthName(childViewDetails.month)}-${childViewDetails.year} Staff Meetings`}
          CreateTemplate ={CreateTemplate.functions.CreateConfig(this)}
          EditTemplate={EditTemplate.functions.ModificationConfig(this)}
          ViewTemplate={ViewTemplate.functions.QueryConfig(this)}
          AuthTemplate={AuthTemplate.functions.AuthorisationConfig(this)}
          queryTitle={dataModel.date}
          querySubTitle={`${'Date'}`}
        />

          <WebViewScreen
            stateObject={this}
            URL={this.state.meetingUrl}
            />

      </Provider>
    ) : null;
  }
}

export default OnlineStaffMeeting;
